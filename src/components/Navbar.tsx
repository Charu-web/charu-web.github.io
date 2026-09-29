import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

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
    { name: 'Services', href: '#services' },
    { name: 'Portfolio', href: '#projects' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
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
            ? 'py-4 bg-[#0c0d19]/90 backdrop-blur-md border-b border-white/[0.08] shadow-lg' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between">
          
          {/* Logo: CHARU* with amber sparkle matching Figma's STEFAN* */}
          <motion.a 
            href="#home" 
            onClick={(e) => handleNavClick(e, '#home')}
            initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: editorialEase }}
            className="group flex items-center gap-1.5 focus:outline-none"
          >
            <span className="font-sans font-bold text-lg sm:text-xl tracking-wider uppercase text-white group-hover:text-amber-400 transition-colors">
              CHARU
            </span>
            <span className="text-amber-400 font-extrabold text-sm animate-pulse">✦</span>
          </motion.a>

          {/* Desktop Navigation Links */}
          <div className="flex items-center gap-8">
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.15 + index * 0.04,
                    ease: editorialEase
                  }}
                  className="hover:text-white transition-colors relative py-1 group"
                >
                  <span>{link.name}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-amber-400 group-hover:w-full transition-all duration-200" />
                </motion.a>
              ))}
            </nav>

            {/* Resume / Action Button */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="./Charu_Sonker_Full_Stack_Developer_Resume.pdf"
                download
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-full border border-white/20 text-white hover:border-amber-400 hover:text-amber-400 transition-all duration-200 bg-white/[0.04] backdrop-blur-xs"
              >
                <span>Resume</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-zinc-300 hover:text-white focus:outline-none cursor-pointer"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Fullscreen Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: editorialEase }}
            className="fixed inset-0 z-30 bg-[#0c0d19]/98 backdrop-blur-xl flex flex-col justify-between p-8 pt-28 text-left md:hidden"
          >
            <div className="space-y-6">
              <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest block">
                NAVIGATION
              </span>

              <nav className="flex flex-col space-y-4">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.25 }}
                    className="flex items-center justify-between py-2 border-b border-white/[0.08] group"
                  >
                    <span className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                      {link.name}
                    </span>
                    <span className="text-amber-400 text-sm">→</span>
                  </motion.a>
                ))}
              </nav>
            </div>

            <div className="pt-8 border-t border-white/[0.08] space-y-4 text-xs text-zinc-400">
              <a
                href="./Charu_Sonker_Full_Stack_Developer_Resume.pdf"
                download
                className="inline-flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-amber-400 text-zinc-950 font-semibold text-sm hover:bg-amber-300 transition-colors"
              >
                <span>Download Resume (PDF)</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <div className="space-y-1 text-center">
                <p className="text-white font-medium">csonker04@gmail.com</p>
                <p className="text-zinc-500">Lucknow, India</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
