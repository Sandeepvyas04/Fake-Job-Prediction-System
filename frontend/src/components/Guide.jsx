import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  AlertOctagon, 
  Search, 
  Mail, 
  Globe, 
  DollarSign, 
  MessageSquare,
  HelpCircle,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Guide = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const redFlags = [
    {
      icon: <DollarSign className="w-6 h-6 text-danger" />,
      title: "Suspicious Salary",
      desc: "If the salary seems too good to be true for the required experience, it probably is. Scammers use high pay to lure victims."
    },
    {
      icon: <MessageSquare className="w-6 h-6 text-danger" />,
      title: "Unofficial Communication",
      desc: "Legitimate companies rarely use Telegram, WhatsApp, or personal Gmail accounts for initial recruitment phases."
    },
    {
      icon: <HelpCircle className="w-6 h-6 text-danger" />,
      title: "Vague Job Details",
      desc: "Postings that lack specific responsibilities or company information are often shells for phishing data."
    },
    {
      icon: <ShieldCheck className="w-6 h-6 text-danger" />,
      title: "Requests for Money",
      desc: "Never pay for 'training', 'software', or 'background checks'. Real employers never ask candidates for money."
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 space-y-24">
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-6"
      >
        <span className="inline-block px-4 py-1.5 rounded-full bg-danger/10 text-danger text-[10px] font-black uppercase tracking-[0.3em] border border-danger/20">
          Intelligence Protocol
        </span>
        <h1 className="text-7xl font-black tracking-tighter text-white">Neutralize <br/>the Threat.</h1>
        <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed font-medium">
          Recruitment fraud is evolving. Use this operational guide to identify 
          the subtle patterns used by global threat actors.
        </p>
      </motion.div>

      {/* Red Flags Grid */}
      <div className="space-y-16">
        <h2 className="text-4xl font-black text-center tracking-tighter uppercase text-white/80">Operational Red Flags</h2>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {redFlags.map((flag, i) => (
            <motion.div 
              key={i}
              variants={cardVariants}
              className="glass-premium p-10 rounded-[48px] space-y-8 hover:bg-white/[0.05] transition-all group"
            >
              <div className="w-14 h-14 bg-danger/10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {flag.icon}
              </div>
              <h3 className="text-2xl font-black tracking-tighter text-white uppercase leading-tight">{flag.title}</h3>
              <p className="text-sm text-white/40 leading-relaxed font-medium group-hover:text-white/60 transition-colors">
                {flag.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Verification Checklist */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass-premium rounded-[60px] p-12 md:p-20 overflow-hidden relative border border-white/10 shadow-2xl"
      >
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <AlertOctagon className="w-64 h-64 text-white" />
        </div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-10">
            <h2 className="text-5xl font-black tracking-tighter text-white leading-none">Security <br/>Verification.</h2>
            <p className="text-lg text-white/60 leading-relaxed font-medium">
              Execute these mandatory checks before transmitting any personal 
              intelligence or engaging with unverified recruiters.
            </p>
            <div className="space-y-6">
              {[
                "Verify email domain matches corporate root domain exactly.",
                "Cross-reference physical address via satellite imagery.",
                "Audit recruiter credentials via official LinkedIn channels.",
                "Scan global databases for reported company impersonations.",
                "Encrypt and withhold PII (SSN/Bank) until legal clearance."
              ].map((item, i) => (
                <div key={i} className="flex gap-6 items-start">
                  <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-1">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-white/80 text-md font-bold tracking-tight">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white/[0.03] backdrop-blur-3xl rounded-[40px] p-10 space-y-10 border border-white/10 shadow-2xl">
            <h3 className="text-3xl font-black tracking-tighter text-white">REPORT THREAT</h3>
            <p className="text-sm text-white/40 leading-relaxed font-medium">
              Immediate reporting of fraudulent clusters is critical for 
              maintaining collective security in the recruitment layer.
            </p>
            <div className="space-y-4">
              <a href="https://reportfraud.ftc.gov/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 rounded-3xl bg-white/[0.05] hover:bg-white/[0.1] transition-all border border-white/5 group shadow-xl">
                <div className="flex items-center gap-5">
                  <Globe className="w-6 h-6 text-white/40 group-hover:text-primary transition-colors" />
                  <span className="text-xs font-black uppercase tracking-widest text-white/80">FTC Defense Portal</span>
                </div>
                <ArrowRight className="w-5 h-5 text-white/20 group-hover:translate-x-2 transition-transform" />
              </a>
              <a href="https://www.ic3.gov/" target="_blank" rel="noopener noreferrer" className="flex items-center justify-between p-6 rounded-3xl bg-white/[0.05] hover:bg-white/[0.1] transition-all border border-white/5 group shadow-xl">
                <div className="flex items-center gap-5">
                  <Search className="w-6 h-6 text-white/40 group-hover:text-primary transition-colors" />
                  <span className="text-xs font-black uppercase tracking-widest text-white/80">FBI IC3 Interface</span>
                </div>
                <ArrowRight className="w-5 h-5 text-white/20 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
            <Link to="/dashboard" className="block w-full py-6 bg-white text-black rounded-3xl text-center font-black text-[10px] uppercase tracking-[0.3em] shadow-2xl hover:scale-[1.02] transition-transform">
              Initiate System Scan
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Guide;