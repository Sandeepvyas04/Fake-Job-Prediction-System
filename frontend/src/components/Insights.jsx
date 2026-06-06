import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, AreaChart, Area, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar
} from 'recharts';
import { 
  TrendingUp, 
  AlertCircle, 
  Globe,
  Briefcase,
  ShieldCheck,
  Zap,
  MapPin,
  Download,
  Target,
  Activity
} from 'lucide-react';
import axios from 'axios';

const Insights = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeAlert, setActiveAlert] = useState(0);

  const alerts = [
    { city: "New York", role: "Data Entry", confidence: 98, time: "2 mins ago" },
    { city: "London", role: "Virtual Assistant", confidence: 94, time: "15 mins ago" },
    { city: "Mumbai", role: "Customer Support", confidence: 91, time: "45 mins ago" },
    { city: "Berlin", role: "Clerk", confidence: 97, time: "1 hour ago" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAlert((prev) => (prev + 1) % alerts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fake-job-backend-pgcq.onrender.com/api/insights');
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch insights:', error);
        // Enhanced Fallback data for demo
        setData({
          top_industries: [
            { name: 'Oil & Energy', fraudulent: 120 },
            { name: 'Accounting', fraudulent: 85 },
            { name: 'IT Services', fraudulent: 200 },
            { name: 'Marketing', fraudulent: 150 },
            { name: 'Real Estate', fraudulent: 90 }
          ],
          scam_dna: [
            { subject: 'Pressure', A: 120, B: 40, fullMark: 150 },
            { subject: 'Low Bar', A: 98, B: 30, fullMark: 150 },
            { subject: 'High Pay', A: 140, B: 50, fullMark: 150 },
            { subject: 'Vague', A: 80, B: 20, fullMark: 150 },
            { subject: 'Chat-Only', A: 130, B: 10, fullMark: 150 },
          ],
          monthly_trends: [
            { month: 'Jan', fraud: 45 }, { month: 'Feb', fraud: 52 },
            { month: 'Mar', fraud: 48 }, { month: 'Apr', fraud: 61 },
            { month: 'May', fraud: 55 }, { month: 'Jun', fraud: 67 }
          ],
          top_regions: [
            { region: 'North America', count: 450, color: '#ef4444' },
            { region: 'Europe', count: 320, color: '#f59e0b' },
            { region: 'Asia', count: 280, color: '#3b82f6' },
            { region: 'Africa', count: 150, color: '#10b981' }
          ]
        });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading || !data) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full" />
          <p className="text-white/40 font-medium">Initializing Intelligence Hub...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-12">
      {/* Cybersecurity Header */}
      <div className="relative p-12 rounded-[40px] overflow-hidden bg-[#0a0a0a] border border-white/5 shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-5"><Globe className="w-64 h-64 text-primary" /></div>
        <div className="relative z-10 space-y-6">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              <div className="w-2 h-2 rounded-full bg-danger animate-pulse" />
              <div className="w-2 h-2 rounded-full bg-danger animate-ping absolute" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-danger">Active Threat Monitoring</span>
          </div>
          <h2 className="text-6xl font-black tracking-tighter text-white">Global Fraud <br/>Intelligence</h2>
          <p className="text-lg text-white/60 max-w-xl leading-relaxed font-medium">
            Real-time visualization of recruitment fraud patterns across 120+ industries. 
            Powered by VeriJob's proprietary AI defense grid.
          </p>
          <div className="flex items-center gap-4 pt-4">
            <div className="px-6 py-3 bg-white/10 border border-white/10 rounded-2xl">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Global Accuracy</p>
              <p className="text-2xl font-black text-secondary">97.3%</p>
            </div>
            <div className="px-6 py-3 bg-white/10 border border-white/10 rounded-2xl">
              <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Daily Scans</p>
              <p className="text-2xl font-black text-primary">1.2k+</p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Ticker */}
      <div className="bg-danger/10 border-y border-danger/20 py-4 -mx-4 overflow-hidden">
        <div className="flex items-center gap-8 whitespace-nowrap px-4">
          <span className="flex items-center gap-2 text-danger font-black text-[10px] uppercase tracking-widest shrink-0">
            <Zap className="w-3 h-3 fill-danger" /> Latest Threats:
          </span>
          <AnimatePresence mode="wait">
            <motion.div key={activeAlert} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} className="flex gap-8 text-xs font-bold text-white/80">
              <span>{alerts[activeAlert].city} • {alerts[activeAlert].role}</span>
              <span className="text-danger font-black">{alerts[activeAlert].confidence}% Confidence</span>
              <span className="text-white/40 italic">{alerts[activeAlert].time}</span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Scam DNA Radar Chart */}
        <div className="lg:col-span-2 glass-premium p-10 rounded-[40px] space-y-8 group hover:border-primary/20 transition-all">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-white flex items-center gap-3 tracking-tighter uppercase">
                <Target className="text-primary w-6 h-6" /> Scam DNA Analysis
              </h3>
              <p className="text-sm text-white/40 font-medium">Anatomical breakdown of fraudulent vs. legitimate postings.</p>
            </div>
          </div>
          <div className="h-[400px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.scam_dna}>
                <PolarGrid stroke="#ffffff20" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#ffffff80', fontSize: 12, fontWeight: 'bold' }} />
                <Radar name="Scam Patterns" dataKey="A" stroke="#ef4444" fill="#ef4444" fillOpacity={0.5} />
                <Radar name="Real Standards" dataKey="B" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #ffffff20', borderRadius: '16px' }} />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* High Risk Regions */}
        <div className="glass-premium p-10 rounded-[40px] space-y-8">
          <h3 className="text-2xl font-black text-white flex items-center gap-3 tracking-tighter uppercase">
            <MapPin className="text-secondary w-6 h-6" /> Risk Zones
          </h3>
          <div className="space-y-6">
            {data.top_regions.map((region, i) => (
              <div key={i} className="space-y-3">
                <div className="flex justify-between text-xs font-black uppercase tracking-widest">
                  <span className="text-white/60">{region.region}</span>
                  <span style={{ color: region.color }}>{region.count} Threats</span>
                </div>
                <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }} whileInView={{ width: `${(region.count / 450) * 100}%` }}
                    className="h-full rounded-full" style={{ backgroundColor: region.color }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-6 border-t border-white/10">
            <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl">
              <Activity className="w-8 h-8 text-primary shrink-0" />
              <p className="text-[11px] text-white/60 leading-relaxed font-black uppercase tracking-wider">
                AI detection shows a <span className="text-white">14% increase</span> in Chat-based scams in the last 30 days.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Monthly Activity */}
      <div className="glass-premium p-10 rounded-[40px] space-y-8">
        <h3 className="text-2xl font-black text-white flex items-center gap-3 tracking-tighter uppercase">
          <TrendingUp className="text-accent w-6 h-6" /> Seasonal Attack Trends
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.monthly_trends}>
              <defs>
                <linearGradient id="colorFraud" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="month" stroke="#ffffff40" fontSize={12} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #ffffff20', borderRadius: '16px' }} />
              <Area type="monotone" dataKey="fraud" stroke="#ef4444" strokeWidth={3} fill="url(#colorFraud)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Insights;
