import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export const Skills: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const editorialEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section 
      id="skills" 
      className="py-24 sm:py-36 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10 text-left"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Eyebrow & Title */}
      <motion.div 
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: editorialEase }}
        className="pb-12 space-y-2"
      >
        <span className="font-mono text-xs font-semibold tracking-widest uppercase text-amber-400 block">
          TECHNICAL STACK
        </span>
        <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Tools &amp; Technologies
        </h2>
        <div className="w-12 h-1 bg-amber-400 rounded-full my-2" />
        <p className="font-sans text-sm text-zinc-300 max-w-md pt-1">
          Full stack libraries, real-time protocols, databases, and AI tooling used in production.
        </p>
      </motion.div>

      {/* Grid of Dark Navy Skill Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SKILL_CATEGORIES.map((category, index) => (
          <motion.div
            key={category.id}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: editorialEase }}
            className="rounded-2xl bg-[#131627]/90 hover:bg-[#181d33] border border-white/[0.08] hover:border-amber-400/40 p-6 sm:p-7 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.06]">
                <span className="font-mono text-xs text-amber-400 font-bold">
                  {category.number}
                </span>
                <span className="font-sans text-xs text-zinc-400 uppercase tracking-wider">
                  {category.description}
                </span>
              </div>

              <h3 className="font-sans text-xl font-bold text-white pt-4 pb-3">
                {category.title}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2 pt-2">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-xs text-zinc-300 bg-white/[0.04] px-3 py-1.5 rounded-lg border border-white/[0.08] hover:border-amber-400/40 hover:text-white transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
