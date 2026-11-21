import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Mail, Check, Copy } from 'lucide-react';
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

  const scrollToProjects = (e: React.MouseEvent) => {
    e.preventDefault();
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { label: 'Completed Projects', value: '12+' },
    { label: 'Core Specialization', value: 'Full Stack' },
    { label: 'Primary Architecture', value: 'Next · Node' },
  ];

  const editorialEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section 
      id="home" 
      className="relative min-h-[90vh] lg:min-h-[94vh] flex items-center pt-28 sm:pt-32 pb-16 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-hidden text-left"
    >
      {/* Ambient Radial Glows */}
      <div className="absolute top-1/4 right-5 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center relative z-10">
        
        {/* ========================================================
            COLUMN 1: COMMERCIAL VALUE PROPOSITION & CTAs
            ======================================================== */}
        <motion.div 
          initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: editorialEase }}
          className="lg:col-span-5 flex flex-col items-start space-y-4"
        >
          {/* Availability Status Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] font-semibold tracking-wider uppercase text-emerald-300">
              AVAILABLE FOR FREELANCE PROJECTS
            </span>
          </div>

          {/* Approved Commercial Outcome Headline */}
          <h1 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.12]">
            I Build Web Applications, E&#8209;Commerce Stores &amp; Custom SaaS Solutions.
          </h1>

          {/* Golden Amber Accent Divider */}
          <div className="w-14 h-1 bg-amber-400 rounded-full my-1 shadow-sm shadow-amber-400/50" />

          {/* Approved Supporting Introduction */}
          <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed max-w-lg pt-1">
            Hi, I'm Charu Sonker — Full Stack Developer. I help businesses turn ideas and designs into modern, functional digital products using React, Next.js, Node.js, and modern databases.
          </p>

          {/* Primary & Secondary Hero CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
            {/* Primary CTA */}
            <a
              href="#projects"
              onClick={scrollToProjects}
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm tracking-wide uppercase hover:bg-amber-300 transition-all duration-200 shadow-lg shadow-amber-400/20 cursor-pointer"
            >
              <span>View Selected Work</span>
              <ArrowDown className="w-4 h-4 text-zinc-950 group-hover:translate-y-0.5 transition-transform" />
            </a>

            {/* Secondary CTA */}
            <a
              href="#contact"
              onClick={scrollToContact}
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full border border-white/20 text-zinc-200 hover:text-white hover:border-amber-400/60 hover:bg-white/[0.04] transition-all text-xs sm:text-sm font-semibold cursor-pointer"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4 text-amber-400" />
            </a>
          </div>

          {/* Direct Email Access Strip */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 pt-2 text-xs font-mono text-zinc-400">
            <span className="text-zinc-500 text-[11px] uppercase tracking-wider whitespace-nowrap">Direct Email:</span>
            <a
              href={`mailto:${PERSONAL_INFO.email}?subject=Project%20Inquiry%20%E2%80%93%20Full%20Stack%20Development`}
              className="text-amber-400 hover:text-amber-300 transition-colors font-medium flex items-center gap-1.5 whitespace-nowrap"
              title="Click to open email client"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{PERSONAL_INFO.email}</span>
            </a>
            <button
              onClick={onCopyEmail}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white transition-colors cursor-pointer text-[10px] shrink-0"
              title="Copy email to clipboard"
            >
              {copiedEmail ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3 text-zinc-400" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* ========================================================
            COLUMN 2: CENTRAL PRODUCTION PORTFOLIO COMPOSITION
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
            COLUMN 3: VERTICAL STATS STACK
            ======================================================== */}
        <motion.div 
          initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: editorialEase }}
          className="lg:col-span-2 flex flex-row lg:flex-col items-start lg:items-end justify-between sm:justify-around lg:justify-center gap-4 sm:gap-6 lg:gap-8 text-left lg:text-right pt-4 lg:pt-0 border-t lg:border-t-0 border-white/[0.08]"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <span className="font-sans text-xs sm:text-sm text-zinc-400 block max-w-[110px] sm:max-w-[130px] lg:max-w-none">
                {stat.label}
              </span>
              <span className="font-sans text-xl sm:text-2xl lg:text-2xl xl:text-3xl font-extrabold text-white tracking-tight block sm:whitespace-nowrap lg:whitespace-nowrap">
                {stat.value}
              </span>
            </div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
