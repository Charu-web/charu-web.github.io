import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'WORK', href: '#projects', num: '01' },
    { name: 'ABOUT', href: '#about', num: '02' },
    { name: 'EXPERIENCE', href: '#experience', num: '03' },
    { name: 'LAB', href: '#lab', num: '04' },
    { name: 'CONTACT', href: '#contact', num: '05' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const editorialEase = [0.16, 1, 0.3, 1] as const;

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'py-3.5 bg-[#faf9f6]/92 backdrop-blur-md border-b border-[#ece8df] shadow-2xs' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          
          {/* Top Left: CHARU SONKER 01—05 Minimal Brand */}
          <motion.a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: editorialEase }}
            className="group flex items-baseline gap-2.5 focus:outline-none"
          >
            <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest uppercase text-zinc-900 group-hover:text-[#2b4b7c] transition-colors">
              CHARU SONKER
            </span>
            <span className="font-mono text-[10px] text-zinc-400 tracking-wider">
              01—05
            </span>
          </motion.a>

          {/* Top Right: Minimalist Desktop Navigation */}
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-7 text-xs font-mono tracking-widest text-zinc-600">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2 + index * 0.04,
                    ease: editorialEase
                  }}
                  className="hover:text-[#2b4b7c] transition-colors font-medium relative group py-1"
                >
                  <span>{link.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#2b4b7c] group-hover:w-full transition-all duration-200" />
                </motion.a>
              ))}
            </nav>

            {/* Availability Indicator */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="hidden lg:flex items-center gap-2 pl-4 border-l border-[#ece8df] font-mono text-[10px] tracking-wider text-zinc-500 uppercase select-none"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] text-zinc-600 font-semibold tracking-widest">AVAILABLE</span>
            </motion.div>

            {/* Mobile Hamburger Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="md:hidden p-1.5 text-zinc-800 hover:text-zinc-950 focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </motion.button>
          </div>

        </div>
      </header>

      {/* Custom Fullscreen Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: editorialEase }}
            className="fixed inset-0 z-30 bg-[#faf9f6] flex flex-col justify-between p-8 pt-28 text-left md:hidden"
          >
            <div className="space-y-6">
              <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest block">
                NAVIGATION / DIRECTORY
              </span>

              <nav className="flex flex-col space-y-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    className="flex items-baseline justify-between py-2 border-b border-[#ece8df] group"
                  >
                    <span className="text-3xl font-editorial text-zinc-900 group-hover:text-[#2b4b7c] transition-colors">
                      {link.name}
                    </span>
                    <span className="font-mono text-xs text-zinc-400">
                      {link.num}
                    </span>
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="pt-8 border-t border-[#ece8df] space-y-2 font-mono text-xs text-zinc-500">
              <p className="uppercase tracking-widest text-[10px] text-zinc-400">CONTACT DIRECT</p>
              <p className="text-zinc-900">csonker04@gmail.com</p>
              <p className="text-zinc-500">Lucknow, India</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
