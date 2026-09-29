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
    <footer className="py-16 sm:py-20 bg-[#f7f5f0] border-t border-[#ece8df] text-left text-zinc-600 text-xs font-mono select-none">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 space-y-12">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-[#ece8df]">
          
          {/* Brand & Role */}
          <div className="space-y-1">
            <div className="font-mono text-xs font-semibold uppercase tracking-widest text-zinc-900">
              CHARU SONKER
            </div>
            <div className="text-zinc-500 text-xs font-sans">
              FULL STACK DEVELOPER
            </div>
          </div>

          {/* Location */}
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">
              LOCATION
            </span>
            <span className="text-zinc-800 font-medium">
              Lucknow, India
            </span>
          </div>

          {/* Direct Links */}
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">
              NETWORK
            </span>
            <div className="flex flex-col space-y-1.5 text-zinc-600">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#2b4b7c] transition-colors"
              >
                LinkedIn ↗
              </a>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-[#2b4b7c] transition-colors"
              >
                GitHub ↗
              </a>
              <button
                onClick={onCopyEmail}
                className="hover:text-[#2b4b7c] transition-colors text-left cursor-pointer"
              >
                Email
              </button>
            </div>
          </div>

          {/* Back to Top */}
          <div className="flex sm:justify-end items-start">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 hover:text-[#2b4b7c] transition-colors cursor-pointer text-zinc-500 uppercase tracking-wider"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-zinc-400 text-[11px]">
          <div>
            © 2026 CHARU SONKER
          </div>
          <div>
            Editorial + Digital Craft System
          </div>
        </div>

      </div>
    </footer>
  );
};
