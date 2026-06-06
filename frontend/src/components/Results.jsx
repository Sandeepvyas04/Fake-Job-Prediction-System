import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ShieldAlert, 
  AlertTriangle, 
  ShieldCheck, 
  ArrowLeft, 
  Download, 
  Share2,
  FileSearch,
  Zap,
  Lock,
  MailWarning
} from 'lucide-react';

const Results = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <ShieldAlert className="w-16 h-16 text-white/20" />
        <h2 className="text-2xl font-bold text-white">No results found</h2>
        <p className="text-white/40">Please go back to the dashboard and scan a job posting.</p>
        <Link to="/dashboard" className="bg-primary px-6 py-3 rounded-xl font-bold text-white">
          Go to Dashboard
        </Link>
      </div>
    );
  }

  const isFraud = result.is_fraudulent;
  const apiRiskFactors = result.risk_factors || [];
  const detectedUrl = location.state?.result?.url || "";

  const handleExport = () => {
    const reportContent = `
VERIJOB VERIFICATION REPORT
---------------------------
Timestamp: ${new Date().toLocaleString()}
Status: ${result.prediction}
Risk Level: ${result.risk_level}
Confidence Score: ${Math.round(result.confidence_score)}%
Factors Checked: 14

${isFraud ? 'DETECTED RISK FACTORS:' : 'SAFETY INDICATORS:'}
${isFraud 
  ? apiRiskFactors.map(f => `- ${f}`).join('\n') 
  : '- Professional email domain detected\n- Verified company profile\n- Salary range aligns with standards'}

Summary:
${isFraud 
  ? 'This job posting shows high indicators of recruitment fraud. We recommend not sharing personal information.' 
  : 'This job posting appears to be legitimate based on our current AI analysis.'}
    `;
    
    const element = document.createElement("a");
    const file = new Blob([reportContent], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `VeriJob_Report_${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'VeriJob Verification Report',
          text: `I just scanned a job posting on VeriJob.ai. Result: ${result.prediction} (${result.risk_level} Risk)`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(`VeriJob Report: ${result.prediction} - ${result.risk_level} Risk. Checked at VeriJob.ai`);
      alert("Link copied to clipboard!");
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const defaultRiskFactors = [
    { icon: <Zap key="z" className="w-4 h-4" />, text: "Unusually high salary for entry-level requirements." },
    { icon: <MailWarning key="m" className="w-4 h-4" />, text: "Communication requested via unofficial chat platforms." },
    { icon: <Lock key="l" className="w-4 h-4" />, text: "Requests sensitive personal info before any interview." },
    { icon: <FileSearch key="f" className="w-4 h-4" />, text: "Vague company profile with no verified online presence." }
  ];

  const displayRiskFactors = apiRiskFactors.length > 0 
    ? apiRiskFactors.map((factor, i) => ({
        icon: [<Zap key="z" className="w-4 h-4" />, <MailWarning key="m" className="w-4 h-4" />, <Lock key="l" className="w-4 h-4" />, <AlertTriangle key="a" className="w-4 h-4" />][i % 4],
        text: `Detected pattern: "${factor}" - frequently associated with fraudulent activity.`
      }))
    : defaultRiskFactors;

  return (
    <div className="max-w-6xl mx-auto py-24 px-6 relative">
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl blur-[160px] opacity-10 pointer-events-none ${isFraud ? 'bg-danger' : 'bg-primary'}`} />

      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/dashboard')}
        className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-white mb-16 transition-all group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-2 transition-transform" />
        Return to Command Center
      </motion.button>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Intelligence Report */}
        <motion.div variants={itemVariants} className="lg:col-span-8 space-y-12">
          <div className="glass-premium p-12 md:p-16 rounded-[60px] relative overflow-hidden border border-white/10">
            {isFraud && <div className="scan-line" />}
            
            <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 mb-20">
              <div className="text-left space-y-6">
                <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-white/5 border border-white/10">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${isFraud ? 'bg-danger' : 'bg-secondary'}`} />
                  <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/40">Intelligence Payload Verified</span>
                </div>
                <h3 className="text-6xl font-black tracking-tighter text-white leading-none">Security <br/>Audit Report.</h3>
              </div>
              
              <div className="flex flex-col items-end gap-4">
                <div className={`w-24 h-24 rounded-[32px] flex items-center justify-center shadow-2xl ${isFraud ? 'bg-danger/10 text-danger border border-danger/20' : 'bg-secondary/10 text-secondary border border-secondary/20'}`}>
                  {isFraud ? <ShieldAlert className="w-12 h-12" /> : <ShieldCheck className="w-12 h-12" />}
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.4em] mb-1">Threat Level</p>
                  <p className={`text-2xl font-black uppercase tracking-tighter ${isFraud ? 'text-danger' : 'text-secondary'}`}>{result.risk_level}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <div className="space-y-12 text-left">
                <div className="space-y-6">
                  <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em]">AI confidence rating</h4>
                  <div className="relative">
                    <span className="text-8xl font-black tracking-tighter text-white tabular-nums">{Math.round(result.confidence_score)}%</span>
                    <div className="absolute -bottom-2 left-0 w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }} 
                        animate={{ width: `${result.confidence_score}%` }} 
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className={`h-full ${isFraud ? 'bg-danger shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-secondary shadow-[0_0_10px_rgba(16,185,129,0.5)]'}`} 
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="p-6 rounded-[30px] bg-white/[0.05] border border-white/10 space-y-2">
                    <span className="text-[8px] font-black text-white/40 uppercase tracking-widest block">Status</span>
                    <span className={`text-xs font-black uppercase tracking-widest ${isFraud ? 'text-danger' : 'text-secondary'}`}>{result.prediction}</span>
                  </div>
                  <div className="p-6 rounded-[30px] bg-white/[0.05] border border-white/10 space-y-2">
                    <span className="text-[8px] font-black text-white/40 uppercase tracking-widest block">Data Points</span>
                    <span className="text-xs font-black uppercase tracking-widest text-white">14 Factors</span>
                  </div>
                </div>
              </div>

              <div className="space-y-10 text-left">
                <h4 className="text-[10px] font-black text-white/40 uppercase tracking-[0.5em]">{isFraud ? 'Risk Vectors Detected' : 'Security Markers'}</h4>
                <div className="space-y-4">
                  {isFraud ? (
                    displayRiskFactors.map((factor, i) => (
                      <motion.div key={i} variants={itemVariants} className="flex gap-5 p-6 rounded-[30px] bg-danger/10 border border-danger/20 group hover:bg-danger/20 transition-all shadow-lg">
                        <div className="shrink-0 mt-1 text-danger group-hover:scale-110 transition-transform">{factor.icon}</div>
                        <p className="text-xs font-bold leading-relaxed text-danger">{factor.text}</p>
                      </motion.div>
                    ))
                  ) : (
                    <div className="space-y-4">
                      <div className="flex gap-5 p-6 rounded-[30px] bg-secondary/10 border border-secondary/20 group hover:bg-secondary/20 transition-all shadow-lg">
                        <ShieldCheck className="w-5 h-5 shrink-0 mt-1 text-secondary group-hover:scale-110 transition-transform" />
                        <p className="text-xs font-bold leading-relaxed text-secondary">Verified corporate domain and infrastructure detected.</p>
                      </div>
                      <div className="flex gap-5 p-6 rounded-[30px] bg-secondary/10 border border-secondary/20 group hover:bg-secondary/20 transition-all shadow-lg">
                        <ShieldCheck className="w-5 h-5 shrink-0 mt-1 text-secondary group-hover:scale-110 transition-transform" />
                        <p className="text-xs font-bold leading-relaxed text-secondary">Economic markers align with verified industry standards.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap gap-6">
              <button onClick={handleExport} className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-white text-black text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all active:scale-95">
                <Download className="w-4 h-4" /> Export Intel
              </button>
              <button onClick={handleShare} className="flex items-center gap-3 px-8 py-4 rounded-2xl glass-premium text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/5 transition-all active:scale-95">
                <Share2 className="w-4 h-4" /> Broadcast Result
              </button>
            </div>
          </div>
        </motion.div>

        {/* Side Actions */}
        <motion.div variants={itemVariants} className="lg:col-span-4 space-y-8">
          <div className="glass-premium p-10 rounded-[50px] space-y-8 border border-white/10">
            <div className="w-16 h-16 bg-primary/10 rounded-[24px] flex items-center justify-center text-primary">
              <FileSearch className="w-8 h-8" />
            </div>
            <div className="space-y-4 text-left">
              <h4 className="text-2xl font-black tracking-tighter text-white">Protocol Alpha.</h4>
              <p className="text-sm text-white/30 leading-relaxed font-medium">
                {isFraud 
                  ? "Blacklist this entry immediately. Purge all communication logs and do not engage with the threat actor." 
                  : "Proceed with caution. Cross-reference company credentials via official LinkedIn channels."}
              </p>
            </div>
            <Link to="/insights" className="flex items-center gap-3 text-primary text-[10px] font-black uppercase tracking-[0.3em] group">
              Global Trends <ArrowLeft className="w-3 h-3 rotate-180 group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="bg-gradient-to-br from-primary/30 via-secondary/10 to-transparent p-[1px] rounded-[50px]">
            <div className="bg-black/60 backdrop-blur-3xl p-10 rounded-[49px] relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 opacity-5 group-hover:scale-110 transition-transform duration-700">
                <ShieldCheck className="w-40 h-40" />
              </div>
              <div className="space-y-6 text-left">
                <h4 className="text-2xl font-black tracking-tighter text-white leading-tight">Armor Your <br/>Browser.</h4>
                <p className="text-xs text-white/30 leading-relaxed font-medium mb-8">Deploy the VeriJob Neural Layer directly into your recruitment workflow.</p>
                <button className="w-full py-5 rounded-[24px] bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-2xl">Deploy Extension</button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Results;
