import os
import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import nltk
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from nltk.tokenize import word_tokenize

# Download NLTK data if missing
for resource in ['punkt', 'stopwords', 'wordnet', 'omw-1.4']:
    try:
        nltk.data.find(f'tokenizers/{resource}')
    except LookupError:
        nltk.download(resource, quiet=True)

# Clean text in the same way as ml_server/app.py
stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()


def clean_text(text):
    if not isinstance(text, str):
        text = str(text)
    tokens = word_tokenize(text.lower())
    tokens = [t for t in tokens if t.isalpha()]
    tokens = [t for t in tokens if t not in stop_words]
    tokens = [lemmatizer.lemmatize(t) for t in tokens]
    return " ".join(tokens)


ROOT_DIR = os.path.dirname(__file__)
MODEL_PATH = os.path.join(ROOT_DIR, 'nb_classifier.pkl')
VECTORIZER_PATH = os.path.join(ROOT_DIR, 'tfidf_vectorizer.pkl')
DATA_PATH = os.path.join(ROOT_DIR, '..', 'code', 'data', 'fake_job_postings_cleaned.csv')


def load_data():
    if os.path.exists(DATA_PATH):
        df = pd.read_csv(DATA_PATH)
        if 'text' in df.columns and 'fraudulent' in df.columns:
            X = df['text'].astype(str)
            y = df['fraudulent'].astype(int)
            return X, y, 'notebook data'
        if 'description' in df.columns and 'title' in df.columns and 'fraudulent' in df.columns:
            X = (df['title'].fillna('') + ' ' + df['description'].fillna('')).astype(str)
            y = df['fraudulent'].astype(int)
            return X, y, 'notebook data'

    print('Dataset file not found; using synthetic demo data.')
    samples = [
        ('urgent money making job at home', 1),
        ('work from home data entry no experience', 1),
        ('immediate start earn extra cash', 1),
        ('part time cashier position', 1),
        ('remote customer service representative', 0),
        ('software developer full time position', 0),
        ('marketing manager role at leading company', 0),
        ('senior engineer with benefits and growth', 0),
        ('administrative assistant needed for office', 0),
        ('project coordinator role with salary', 0),
    ]
    X = pd.Series([text for text, label in samples])
    y = pd.Series([label for text, label in samples], dtype=int)
    return X, y, 'synthetic demo data'


if __name__ == '__main__':
    X, y, source = load_data()
    cleaned = X.map(clean_text)

    vectorizer = TfidfVectorizer(stop_words='english', max_df=1)
    X_vec = vectorizer.fit_transform(cleaned)

    model = MultinomialNB()
    model.fit(X_vec, y)

    joblib.dump(model, MODEL_PATH)
    joblib.dump(vectorizer, VECTORIZER_PATH)

    print(f"Saved model to {MODEL_PATH}")
    print(f"Saved vectorizer to {VECTORIZER_PATH}")
    print(f"Training data source: {source}")
