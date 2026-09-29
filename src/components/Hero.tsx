import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Download, Mail, Check } from 'lucide-react';
import { HeroCardVisual } from './HeroCardVisual';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onCopyEmail: () => void;
  copiedEmail: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onCopyEmail,
  copiedEmail,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { label: 'Years of Experience', value: '3+' },
    { label: 'Complete Projects', value: '15+' },
    { label: 'Code & Delivery Quality', value: '100%' },
  ];

  const editorialEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section 
      id="home" 
      className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center pt-28 sm:pt-32 pb-16 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-hidden select-none"
    >
      {/* Figma Ambient Radial Glows */}
      <div className="absolute top-1/4 right-5 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
        
        {/* ========================================================
            COLUMN 1: INTRO & HEADLINE (Figma Left Column)
            ======================================================== */}
        <motion.div 
          initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: editorialEase }}
          className="lg:col-span-5 flex flex-col items-start text-left space-y-4"
        >
          {/* Subtitle Badge */}
          <span className="font-mono text-xs sm:text-sm font-semibold tracking-widest uppercase text-zinc-400">
            FULL STACK DEVELOPER
          </span>

          {/* Main Name Headline */}
          <h1 className="font-sans text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
            Charu Sonker
          </h1>

          {/* Golden Amber Accent Divider (Matching Figma) */}
          <div className="w-14 h-1 bg-amber-400 rounded-full my-1 shadow-sm shadow-amber-400/50" />

          {/* Bio Description */}
          <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed max-w-md pt-1">
            Specializing in AI-integrated web applications, modern full-stack architectures, and high-performance digital products engineered for production.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-3">
            <a
              href="#contact"
              onClick={scrollToContact}
              className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm tracking-wide uppercase hover:bg-amber-300 transition-all duration-200 shadow-lg shadow-amber-400/20 cursor-pointer"
            >
              <span>Let's Talk</span>
              <ArrowRight className="w-4 h-4 text-zinc-950 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={onCopyEmail}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-white/20 text-zinc-200 hover:text-white hover:border-white/40 transition-colors text-xs sm:text-sm font-medium bg-white/[0.04] backdrop-blur-xs cursor-pointer"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Email Copied</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4 text-zinc-400" />
                  <span>{PERSONAL_INFO.email}</span>
                </>
              )}
            </button>

            <a
              href="./Charu_Sonker_Full_Stack_Developer_Resume.pdf"
              download
              className="inline-flex items-center gap-1.5 text-xs text-zinc-400 hover:text-amber-400 transition-colors py-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Resume PDF</span>
            </a>
          </div>
        </motion.div>

        {/* ========================================================
            COLUMN 2: CENTRAL VISUAL CARD (Figma Center Column)
            ======================================================== */}
        <motion.div 
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: editorialEase }}
          className="lg:col-span-5 flex items-center justify-center my-4 lg:my-0"
        >
          <HeroCardVisual />
        </motion.div>

        {/* ========================================================
            COLUMN 3: VERTICAL STATS STACK (Figma Right Column)
            ======================================================== */}
        <motion.div 
          initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: editorialEase }}
          className="lg:col-span-2 flex flex-row lg:flex-col items-start lg:items-end justify-between sm:justify-around lg:justify-center gap-6 sm:gap-8 text-left lg:text-right pt-4 lg:pt-0 border-t lg:border-t-0 border-white/[0.08]"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <span className="font-sans text-xs sm:text-sm text-zinc-400 block max-w-[130px] lg:max-w-none">
                {stat.label}
              </span>
              <span className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight block">
                {stat.value}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
