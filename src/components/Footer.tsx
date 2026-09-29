import React from 'react';
import { ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onCopyEmail: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onCopyEmail }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 sm:py-16 bg-[#080913] border-t border-white/[0.06] text-left text-zinc-400 text-xs font-sans select-none relative z-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-white/[0.06]">
          
          {/* Brand & Role */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5 text-white font-bold text-sm tracking-wider uppercase">
              <span>CHARU</span>
              <span className="text-amber-400">✦</span>
            </div>
            <p className="text-zinc-400 text-xs">
              Full Stack &amp; AI Web Developer
            </p>
          </div>

          {/* Location */}
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono block">
              LOCATION
            </span>
            <span className="text-zinc-200 font-medium">
              {PERSONAL_INFO.location}
            </span>
          </div>

          {/* Direct Links */}
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono block">
              QUICK NAVIGATION
            </span>
            <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-zinc-300">
              <a href="#services" className="hover:text-amber-400 transition-colors">Services</a>
              <a href="#projects" className="hover:text-amber-400 transition-colors">Portfolio</a>
              <a href="#about" className="hover:text-amber-400 transition-colors">About</a>
              <a href="#experience" className="hover:text-amber-400 transition-colors">Experience</a>
              <a href="#contact" className="hover:text-amber-400 transition-colors">Contact</a>
              <button onClick={onCopyEmail} className="hover:text-amber-400 transition-colors cursor-pointer text-left">Copy Email</button>
            </div>
          </div>

          {/* Back to Top */}
          <div className="flex sm:justify-end items-start">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-amber-400 text-zinc-300 hover:text-amber-400 transition-colors cursor-pointer text-xs uppercase tracking-wider"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-zinc-400 text-xs">
          <div>
            © 2026 Charu Sonker. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Designed &amp; Engineered with React, TypeScript &amp; Tailwind CSS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
