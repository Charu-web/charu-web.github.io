import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'WORK', href: '#projects' },
    { name: 'ABOUT', href: '#about' },
    { name: 'LAB', href: '#lab' },
    { name: 'RESUME', href: '#resume' },
    { name: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'py-3 bg-[#faf9f6]/95 backdrop-blur-md border-b border-[#ece8df] shadow-2xs' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
        
        {/* Top Left: CHARU SONKER Minimal Brand */}
        <motion.a 
          href="#home" 
          onClick={(e) => handleNavClick(e, '#home')}
          initial={shouldReduceMotion ? false : { opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="group flex items-baseline gap-2 focus:outline-none"
        >
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest uppercase text-zinc-900 group-hover:text-[#2b4b7c] transition-colors">
            CHARU SONKER
          </span>
          <span className="font-script text-xs sm:text-sm text-zinc-400 group-hover:text-[#2b4b7c] transition-colors hidden sm:inline">
            portfolio
          </span>
        </motion.a>

        {/* Top Right: Understated minimalist navigation & live status */}
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex items-center gap-6 text-xs font-sans tracking-wide text-zinc-600">
            {navLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 0.35 + index * 0.04,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="hover:text-[#2b4b7c] transition-colors font-medium"
              >
                {link.name}
              </motion.a>
            ))}
          </nav>

          {/* Open to Opportunities Live Pulse Indicator */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className="hidden lg:flex items-center gap-2 pl-4 border-l border-[#ece8df] font-mono text-[10px] tracking-wider text-zinc-500 uppercase select-none"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] text-zinc-600 font-semibold tracking-widest">OPEN TO OPPORTUNITIES</span>
          </motion.div>
        </div>

        {/* Mobile Hamburger Menu Button */}
        <motion.button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="md:hidden p-1 text-zinc-700 hover:text-zinc-950 focus:outline-none cursor-pointer"
          aria-label="Toggle navigation menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#faf9f6] border-b border-[#ece8df] px-6 py-6 space-y-4 shadow-sm text-left animate-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-3 text-sm text-zinc-700">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="py-1 hover:text-[#2b4b7c] flex justify-between items-center"
              >
                <span>{link.name}</span>
                <span className="text-zinc-400 text-xs">→</span>
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
