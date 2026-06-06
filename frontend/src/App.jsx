import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Insights from './components/Insights';
import Results from './components/Results';
import Guide from './components/Guide';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen text-white selection:bg-primary/30">
        <div className="bg-mesh" />
        <Navbar />
        <main className="container mx-auto px-4 py-8 relative z-10">
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/results" element={<Results />} />
            <Route path="/guide" element={<Guide />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
