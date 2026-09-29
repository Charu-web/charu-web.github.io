import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { PERSONAL_INFO } from '../data/portfolioData';

export const Statement: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const editorialEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section 
      id="statement" 
      className="py-24 sm:py-36 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto border-t border-[#ece8df] text-left select-none"
    >
      <div className="space-y-16 sm:space-y-24">
        
        {/* Massive Editorial Headline */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: editorialEase }}
          className="space-y-4"
        >
          <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest block">
            01 / MANIFESTO &amp; APPROACH
          </span>

          <h2 className="text-3xl sm:text-5xl lg:text-7xl font-editorial font-light text-zinc-900 tracking-tight leading-[1.06] max-w-5xl">
            I build digital experiences <br className="hidden sm:inline" />
            <span className="italic text-[#2b4b7c]">that combine</span> <br />
            engineering and design.
          </h2>
        </motion.div>

        {/* Narrative & Structured Metadata Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pt-8 border-t border-[#ece8df]">
          
          {/* Left Column: Focused Paragraph */}
          <motion.div 
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.15, ease: editorialEase }}
            className="lg:col-span-7 space-y-4 text-sm sm:text-base text-zinc-600 leading-relaxed font-sans"
          >
            <p>
              Bridging robust full-stack engineering with intentional visual design. I develop responsive web applications, real-time client systems, and practical AI integrations tailored for reliability and user engagement.
            </p>
            <p className="text-zinc-500 text-xs sm:text-sm">
              From end-to-end CRM workflow automation to high-frequency WebSocket canvas engines, every software layer is constructed with clean system architecture and production stability.
            </p>
          </motion.div>

          {/* Right Column: Clean Editorial Metadata */}
          <motion.div 
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, delay: 0.25, ease: editorialEase }}
            className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-6 font-mono text-xs"
          >
            <div className="space-y-1">
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">
                BASED IN
              </span>
              <p className="text-zinc-900 font-semibold tracking-wide">
                {PERSONAL_INFO.location.toUpperCase()}
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">
                FOCUS
              </span>
              <p className="text-zinc-900 font-medium leading-snug">
                FULL STACK DEVELOPMENT <br />
                <span className="text-zinc-600">AI-INTEGRATED APPLICATIONS</span>
              </p>
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest block">
                CURRENT
              </span>
              <p className="text-zinc-900 font-medium">
                WEB &amp; MOBILE APP DEVELOPER
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};
