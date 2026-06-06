import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldAlert, Search, BarChart3, ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black">
      {/* Dynamic Visual Centerpiece */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none">
        <div className="absolute inset-0 bg-primary/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute inset-20 border border-primary/10 rounded-full animate-[spin_20s_linear_infinite]" />
        <div className="absolute inset-40 border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col items-center text-center max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-3 py-2 px-6 rounded-full glass border-white/10 mb-10 shadow-2xl"
          >
            <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Neural Engine v2.4 Active</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-7xl lg:text-[120px] font-black mb-10 leading-[0.85] tracking-tighter text-white"
          >
            Neutralize <br />
            <span className="text-gradient-ai">Fake Jobs.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl md:text-2xl text-white/40 mb-16 max-w-3xl mx-auto leading-relaxed font-medium"
          >
            VeriJob is the world's most advanced intelligence layer for recruitment safety. 
            Dissecting fraudulent patterns with surgical AI precision.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-32"
          >
            <Link 
              to="/dashboard" 
              className="shimmer glow-btn relative bg-white text-black px-12 py-6 rounded-full font-black text-xs uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95"
            >
              Initiate Intelligence Scan
            </Link>
            <Link 
              to="/insights" 
              className="text-white font-black text-xs uppercase tracking-[0.2em] border-b-2 border-white/10 pb-1 hover:border-primary transition-all"
            >
              Access Global Database
            </Link>
          </motion.div>

          {/* Core Modules Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-1px bg-white/10 border border-white/10 rounded-[60px] overflow-hidden w-full backdrop-blur-3xl shadow-2xl">
            <FeatureModule 
              icon={<ShieldAlert className="w-8 h-8" />}
              title="Neural Audit"
              tag="Real-time"
              desc="Deep linguistic analysis of job postings to identify syntactic deception."
            />
            <FeatureModule 
              icon={<Search className="w-8 h-8" />}
              title="Identity Check"
              tag="Protocol 7"
              desc="Cross-referencing recruiter domains against millions of blacklisted assets."
            />
            <FeatureModule 
              icon={<BarChart3 className="w-8 h-8" />}
              title="Threat Intel"
              tag="Live Feed"
              desc="Direct connection to global fraud migration patterns and active clusters."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureModule = ({ icon, title, tag, desc }) => (
  <div className="bg-black/40 p-12 text-left group hover:bg-white/[0.02] transition-all duration-700">
    <div className="flex items-center justify-between mb-10">
      <div className="text-primary group-hover:scale-110 transition-transform duration-700">{icon}</div>
      <span className="text-[9px] font-black uppercase tracking-widest text-white/20 border border-white/10 px-3 py-1 rounded-full">{tag}</span>
    </div>
    <h3 className="text-3xl font-black mb-6 tracking-tighter text-white">{title}</h3>
    <p className="text-white/30 text-sm leading-relaxed font-medium group-hover:text-white/50 transition-colors">{desc}</p>
  </div>
);

export default Hero;
