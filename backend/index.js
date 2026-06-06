const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 8000;
const ML_SERVER_URL = process.env.ML_SERVER_URL || 'http://localhost:5000';

app.use(cors());
app.use(express.json());

// Routes
app.post('/api/predict', async (req, res) => {
  try {
    const { title, description } = req.body;
    
    // Forward the request to the Flask ML server
    const response = await axios.post(`${ML_SERVER_URL}/predict`, {
      title,
      description
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Error in prediction:', error.message);
    res.status(500).json({ error: 'Failed to get prediction from ML server' });
  }
});

// Mock EDA data for the Data Insights page
app.get('/api/insights', (req, res) => {
  const edaData = {
    scam_dna: [
      { subject: 'Pressure', A: 120, B: 40, fullMark: 150 },
      { subject: 'Low Bar', A: 98, B: 30, fullMark: 150 },
      { subject: 'High Pay', A: 140, B: 50, fullMark: 150 },
      { subject: 'Vague', A: 80, B: 20, fullMark: 150 },
      { subject: 'Chat-Only', A: 130, B: 10, fullMark: 150 },
    ],
    top_regions: [
      { region: 'North America', count: 450, color: '#ef4444' },
      { region: 'Europe', count: 320, color: '#f59e0b' },
      { region: 'Asia', count: 280, color: '#3b82f6' },
      { region: 'Africa', count: 150, color: '#10b981' }
    ],
    monthly_trends: [
      { month: 'Jan', fraud: 45, legit: 400 },
      { month: 'Feb', fraud: 52, legit: 420 },
      { month: 'Mar', fraud: 48, legit: 450 },
      { month: 'Apr', fraud: 61, legit: 430 },
      { month: 'May', fraud: 55, legit: 460 },
      { month: 'Jun', fraud: 67, legit: 480 }
    ],
    top_industries: [
      { name: 'Oil & Energy', fraudulent: 120, legitimate: 800 },
      { name: 'Accounting', fraudulent: 85, legitimate: 1200 },
      { name: 'IT Services', fraudulent: 200, legitimate: 4500 },
      { name: 'Marketing', fraudulent: 150, legitimate: 2200 },
      { name: 'Real Estate', fraudulent: 90, legitimate: 950 }
    ]
  };

  res.json(edaData);
});

app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
