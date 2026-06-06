import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
      scrolled ? 'py-4' : 'py-8'
    }`}>
      <div className="container mx-auto px-6">
        <div className={`relative flex items-center justify-between px-8 py-4 rounded-[32px] transition-all duration-700 glass border-white/5 shadow-2xl overflow-hidden group ${
          scrolled ? 'bg-black/40 backdrop-blur-3xl border-white/10' : 'bg-transparent border-transparent shadow-none'
        }`}>
          {/* Animated Glow Background Effect */}
          <div className="absolute -inset-x-20 -top-20 -bottom-20 bg-gradient-to-r from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 blur-3xl pointer-events-none" />

          <Link to="/" className="relative flex items-center gap-4 font-black text-3xl tracking-tighter text-white z-10">
            <motion.div 
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center shadow-2xl"
            >
              <ShieldCheck className="w-7 h-7" />
            </motion.div>
            <span className="hidden sm:block">
              VeriJob<span className="text-white/20">.ai</span>
            </span>
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-12 relative z-10">
            {[
              { name: 'Home', path: '/' },
              { name: 'Scan', path: '/dashboard' },
              { name: 'Insights', path: '/insights' },
              { name: 'Guide', path: '/guide' }
            ].map((link) => (
              <Link 
                key={link.name}
                to={link.path} 
                className={`text-[10px] font-black uppercase tracking-[0.3em] transition-all hover:text-white ${
                  location.pathname === link.path ? 'text-white' : 'text-white/20'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="relative z-10 flex items-center gap-6">
            <Link 
              to="/dashboard"
              className="bg-white text-black px-10 py-4 rounded-[20px] font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center gap-3 group hover:scale-105 active:scale-95 shadow-2xl glow-primary"
            >
              Initiate Scan
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                →
              </motion.span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
