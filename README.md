# VeriJob: AI-Powered Fraudulent Job Detection

VeriJob is a full-stack web application designed to help job seekers identify potentially fraudulent job postings using machine learning.

## Tech Stack
- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Recharts, Lucide Icons
- **Backend**: Node.js, Express, Axios
- **ML Server**: Flask, Scikit-learn, Pandas, Joblib

## Features
- **Hero Section**: Professional dark mode landing page.
- **Prediction Dashboard**: Analyze job titles and descriptions for fraud risk.
- **Risk Score & Red Flags**: Instant AI-powered assessment with specific findings.
- **Data Insights**: Interactive EDA charts showing fraud distribution by industry and experience level.

## Getting Started

### 1. ML Server (Flask)
```bash
cd ml_server
pip install -r requirements.txt
python app.py
```

### 2. Backend (Node.js)
```bash
cd backend
npm install
npm start
```

### 3. Frontend (React)
```bash
cd frontend
npm install
npm run dev
```

## How to Export Your Model
To use your actual trained model from the `model.ipynb` notebook:
1. Add the following lines to your notebook after training the model:
   ```python
   import joblib
   joblib.dump(nb_classifier, '../ml_server/model.pkl')
   joblib.dump(count_vectorizer, '../ml_server/vectorizer.pkl')
   ```
2. Ensure the file names match those expected in `ml_server/app.py`.
3. Restart the Flask server.
