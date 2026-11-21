import React from 'react';
import { ArrowUp, Mail, Copy } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PERSONAL_INFO } from '../data/portfolioData';

interface FooterProps {
  onCopyEmail: () => void;
}

const EMAIL_SUBJECT = 'Project Inquiry – Full Stack Development';
const MAILTO_LINK = `mailto:${PERSONAL_INFO.email}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`;

export const Footer: React.FC<FooterProps> = ({ onCopyEmail }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-12 sm:py-16 bg-[#080913] border-t border-white/[0.06] text-left text-zinc-400 text-xs font-sans relative z-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-10">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-white/[0.06]">
          
          {/* Brand & Direct Email */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-white font-bold text-sm tracking-wider uppercase">
              <span>CHARU</span>
              <span className="text-amber-400">{'\u2726'}</span>
            </div>
            <p className="text-zinc-400 text-xs">
              Full Stack &amp; AI Product Developer
            </p>
            <div className="pt-1 space-y-1.5">
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono block">
                DIRECT INBOX
              </span>
              <a
                href={MAILTO_LINK}
                className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-amber-400 hover:text-amber-300 transition-colors"
                title="Send direct email"
              >
                <Mail className="w-3.5 h-3.5 text-amber-400" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
              <div>
                <button
                  onClick={onCopyEmail}
                  className="inline-flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                >
                  <Copy className="w-3 h-3" />
                  <span>Copy Address</span>
                </button>
              </div>
            </div>
          </div>

          {/* Social Links & Location */}
          <div className="space-y-3">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono block">
              CONNECT &amp; LOCATION
            </span>
            <div className="text-zinc-200 font-medium">
              {PERSONAL_INFO.location}
            </div>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-amber-400 transition-colors font-mono text-[11px]"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-amber-400 transition-colors font-mono text-[11px]"
              >
                <LinkedinIcon className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Direct Navigation Links */}
          <div className="space-y-1">
            <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono block mb-2">
              QUICK NAVIGATION
            </span>
            <div className="flex flex-col gap-1.5 text-zinc-300">
              <a href="#services" className="hover:text-amber-400 transition-colors">Services</a>
              <a href="#projects" className="hover:text-amber-400 transition-colors">Featured Projects</a>
              <a href="#about" className="hover:text-amber-400 transition-colors">About &amp; Philosophy</a>
              <a href="#experience" className="hover:text-amber-400 transition-colors">Professional Experience</a>
              <a href="#freelance-models" className="hover:text-amber-400 transition-colors">Engagement Models</a>
              <a href="#contact" className="hover:text-amber-400 transition-colors">Contact &amp; Inquiries</a>
              <a
                href="./Charu_Sonker_Full_Stack_Developer_Resume.pdf"
                download="Charu_Sonker_Full_Stack_Developer_Resume.pdf"
                className="hover:text-amber-400 transition-colors inline-flex items-center gap-1.5 text-amber-400/90 font-medium pt-0.5"
              >
                <span>Download Resume</span>
                <span className="text-[10px] font-mono text-zinc-500">(PDF)</span>
              </a>
            </div>
          </div>

          {/* Back to Top */}
          <div className="flex sm:justify-end items-start">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-amber-400 text-zinc-300 hover:text-amber-400 transition-colors cursor-pointer text-xs uppercase tracking-wider"
              aria-label="Back to Top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-zinc-400 text-xs">
          <div>
            {'\u00A9'} 2026 Charu Sonker. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Designed &amp; Engineered with React, TypeScript &amp; Tailwind CSS</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
