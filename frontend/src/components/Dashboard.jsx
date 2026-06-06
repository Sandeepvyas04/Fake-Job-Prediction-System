import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  AlertCircle, ShieldAlert, History, 
  ChevronRight, Link as LinkIcon, ShieldCheck
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [activeTab, setActiveTab] = useState('text'); // 'text' or 'url'
  
  const navigate = useNavigate();

  useEffect(() => {
    const savedHistory = localStorage.getItem('veriJob_history_guest');
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  const saveToHistory = (scanData) => {
    const newEntry = {
      id: Date.now(),
      timestamp: new Date().toLocaleString(),
      title: scanData.title,
      prediction: scanData.result.prediction,
      is_fraudulent: scanData.result.is_fraudulent,
      confidence_score: scanData.result.confidence_score,
      risk_level: scanData.result.risk_level,
      result: scanData.result
    };
    const updatedHistory = [newEntry, ...history].slice(0, 5); 
    setHistory(updatedHistory);
    localStorage.setItem('veriJob_history_guest', JSON.stringify(updatedHistory));
  };

  const handleScan = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    // Simulate URL scanning delay
    if (activeTab === 'url') {
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    try {
      const response = await axios.post('https://fake-job-backend-pgcq.onrender.com/api/predict', {
        title: activeTab === 'url' ? "Job from URL" : title,
        description: activeTab === 'url' ? `Job Posting URL: ${url}\n\nAnalyzing job content from the provided URL...` : description,
        url: activeTab === 'url' ? url : null
      });
      
      saveToHistory({ 
        title: activeTab === 'url' ? `URL Scan: ${new URL(url).hostname}` : title, 
        result: response.data 
      });
      navigate('/results', { state: { result: response.data } });
    } catch (error) {
      console.error('Scan failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-32 px-6 space-y-32 relative">
      <div className="flex flex-col lg:flex-row gap-20 items-stretch">
        {/* Left Side: Command Input Center */}
        <motion.div 
          initial={{ opacity: 0, x: -40 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="lg:w-3/5 space-y-12"
        >
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <span className="w-12 h-[1px] bg-primary" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-primary">System Interface</span>
            </div>
            <h2 className="text-7xl font-black tracking-tighter leading-[0.85] text-white">
              Scan Intelligence <br/>
              <span className="text-primary/60">Protocol.</span>
            </h2>
          </div>

          <div className="glass-premium p-12 rounded-[60px] relative overflow-hidden group shadow-2xl border border-white/10">
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <ShieldAlert className="w-32 h-32 text-white" />
            </div>
            
            {/* Mode Selector */}
            <div className="flex gap-10 border-b border-white/10 mb-12 pb-4">
              {['text', 'url'].map(mode => (
                <button 
                  key={mode}
                  onClick={() => setActiveTab(mode)}
                  className={`text-[11px] font-black uppercase tracking-[0.3em] transition-all relative ${activeTab === mode ? 'text-white' : 'text-white/40 hover:text-white'}`}
                >
                  {mode === 'text' ? 'Linguistic Data' : 'Digital Footprint'}
                  {activeTab === mode && (
                    <motion.div layoutId="tab" className="absolute -bottom-[17px] left-0 right-0 h-1 bg-primary" />
                  )}
                </button>
              ))}
            </div>

            <form onSubmit={handleScan} className="space-y-12 relative z-10">
              <AnimatePresence mode="wait">
                {activeTab === 'text' ? (
                  <motion.div 
                    key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-10"
                  >
                    <div className="space-y-4">
                      <label className="text-[9px] font-black text-white/60 uppercase tracking-[0.4em] ml-2">Job Designation</label>
                      <input 
                        type="text" value={title} onChange={(e) => setTitle(e.target.value)}
                        placeholder="SOFTWARE ARCHITECT / DATA ANALYST..."
                        className="w-full bg-white/5 border-b border-white/20 px-4 py-4 focus:outline-none focus:border-primary transition-all text-xl font-black text-white placeholder:text-white/20 uppercase tracking-tighter rounded-t-xl"
                        required
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[9px] font-black text-white/60 uppercase tracking-[0.4em] ml-2">Contextual Description</label>
                      <textarea 
                        value={description} onChange={(e) => setDescription(e.target.value)}
                        placeholder="PASTE INTEL HERE..."
                        rows={6}
                        className="w-full bg-white/5 border border-white/10 rounded-[30px] px-8 py-8 focus:outline-none focus:border-primary/50 transition-all text-md font-medium text-white placeholder:text-white/20 resize-none leading-relaxed"
                        required
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="url" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="space-y-10"
                  >
                    <div className="space-y-4">
                      <label className="text-[9px] font-black text-white/60 uppercase tracking-[0.4em] ml-2">Target URL Endpoint</label>
                      <div className="relative">
                        <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                        <input 
                          type="url" value={url} onChange={(e) => setUrl(e.target.value)}
                          placeholder="HTTPS://CAREERS.TARGET.COM/..."
                          className="w-full bg-white/5 border-b border-white/20 pl-14 py-4 focus:outline-none focus:border-primary transition-all text-xl font-black text-white placeholder:text-white/20 uppercase tracking-tighter rounded-t-xl"
                          required
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-primary/90 text-white font-black py-8 rounded-[30px] flex items-center justify-center gap-6 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_20px_50px_-10px_rgba(59,130,246,0.3)] active:scale-95 group relative overflow-hidden uppercase tracking-[0.3em] text-xs"
              >
                {loading ? (
                  <>
                    <div className="scan-line" />
                    <span className="animate-pulse">Analyzing Neural Patterns...</span>
                  </>
                ) : (
                  "Execute Verification"
                )}
              </button>
            </form>
          </div>
        </motion.div>

        {/* Right Side: Archive & Metrics */}
        <motion.div 
          initial={{ opacity: 0, x: 40 }} 
          animate={{ opacity: 1, x: 0 }} 
          className="lg:w-2/5 flex flex-col"
        >
          <div className="glass-premium p-12 rounded-[60px] flex-1 space-y-12 border border-white/10">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-black text-white uppercase tracking-tighter flex items-center gap-4">
                <History className="text-primary w-6 h-6" /> Archive
              </h3>
              {history.length > 0 && (
                <button onClick={() => { setHistory([]); localStorage.removeItem('veriJob_history_guest'); }} className="text-[9px] font-black uppercase tracking-widest text-white/40 hover:text-danger transition-colors">Clear Logs</button>
              )}
            </div>
            
            <div className="space-y-6">
              {history.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center border border-dashed border-white/20 rounded-[40px] bg-white/[0.02]">
                  <p className="text-white/30 text-[10px] font-black uppercase tracking-widest">No Active Logs</p>
                </div>
              ) : (
                history.map(item => (
                  <motion.div 
                    key={item.id} 
                    whileHover={{ x: 10 }}
                    onClick={() => navigate('/results', { state: { result: item.result } })} 
                    className="p-8 rounded-[30px] bg-white/[0.05] border border-white/10 flex items-center justify-between cursor-pointer transition-all hover:bg-white/[0.08] group shadow-xl"
                  >
                    <div className="flex items-center gap-6">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${item.is_fraudulent ? 'bg-danger/20 text-danger' : 'bg-secondary/20 text-secondary'}`}>
                        {item.is_fraudulent ? <ShieldAlert className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
                      </div>
                      <div>
                        <h4 className="text-md font-black text-white group-hover:text-primary transition-colors leading-none mb-2 uppercase tracking-tighter">{item.title}</h4>
                        <p className="text-[9px] text-white/40 uppercase font-black tracking-widest">{item.timestamp}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-white/40 group-hover:text-white transition-all" />
                  </motion.div>
                ))
              )}
            </div>

            {/* Micro Metrics Area */}
            <div className="pt-10 border-t border-white/10 grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <p className="text-[8px] font-black uppercase tracking-widest text-white/40">System Load</p>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '45%' }} className="h-full bg-primary" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[8px] font-black uppercase tracking-widest text-white/40">AI Confidence</p>
                <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                  <motion.div initial={{ width: 0 }} animate={{ width: '99.8%' }} className="h-full bg-secondary" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
