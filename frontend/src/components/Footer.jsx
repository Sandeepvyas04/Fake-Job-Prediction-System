import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative py-24 mt-32 overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
          <div className="col-span-1 md:col-span-2 space-y-10">
            <Link to="/" className="flex items-center gap-4 font-black text-3xl tracking-tighter text-white">
              <div className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center shadow-2xl">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <span>VeriJob<span className="text-white/20">.ai</span></span>
            </Link>
            <p className="text-white/30 max-w-sm leading-relaxed font-medium">
              Neutralizing recruitment threats with neural networks. 
              The standard for job seeker safety in the AI era.
            </p>
            <div className="flex items-center gap-4">
              <SocialIcon icon={<Twitter className="w-5 h-5" />} />
              <SocialIcon icon={<Github className="w-5 h-5" />} />
              <SocialIcon icon={<Linkedin className="w-5 h-5" />} />
            </div>
          </div>
          
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Protocol</h4>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-white/20">
              <li><Link to="/" className="hover:text-white transition-colors">How it Works</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Scan Jobs</Link></li>
              <li><Link to="/insights" className="hover:text-white transition-colors">Data Trends</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Security</Link></li>
            </ul>
          </div>
          
          <div className="space-y-8">
            <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Foundation</h4>
            <ul className="space-y-4 text-xs font-black uppercase tracking-widest text-white/20">
              <li><Link to="/" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-20 border-t border-white/5 text-center text-[10px] font-black uppercase tracking-[0.4em] text-white/10">
          <p>© {new Date().getFullYear()} VeriJob Global Command. Neural Network Safety Layer.</p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon }) => (
  <a href="/" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center text-white/40 hover:bg-primary/20 hover:text-primary transition-all">
    {icon}
  </a>
);

export default Footer;
