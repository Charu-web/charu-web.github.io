import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { EXPERIENCE_ITEMS } from '../data/portfolioData';

export const Experience: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(EXPERIENCE_ITEMS[0]?.id || null);

  const editorialEase = [0.16, 1, 0.3, 1] as const;

  return (
    <motion.section 
      id="experience" 
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: editorialEase }}
      className="py-24 sm:py-36 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto border-t border-[#ece8df] text-left select-none"
    >
      {/* Section Header */}
      <div className="pb-12 border-b border-[#ece8df] space-y-2">
        <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest block">
          03 / PROFESSIONAL HISTORY
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-editorial font-light text-zinc-900 tracking-tight">
          Experience
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 font-sans">
          Software engineering background, production platforms, and team contributions.
        </p>
      </div>

      {/* Horizontal Editorial List */}
      <div 
        onMouseLeave={() => setHoveredId(EXPERIENCE_ITEMS[0]?.id || null)}
        className="pt-6 divide-y divide-[#ece8df]"
      >
        {EXPERIENCE_ITEMS.map((item) => {
          const isSelected = hoveredId === item.id;
          const isMuted = hoveredId !== null && !isSelected;

          return (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              className={`py-8 sm:py-10 transition-all duration-300 cursor-default ${
                isMuted ? 'opacity-40 filter blur-[0.2px]' : 'opacity-100'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-8 items-start">
                
                {/* Column 1: Date/Period */}
                <div className="md:col-span-3 font-mono text-xs text-zinc-400 uppercase tracking-wider pt-1">
                  {item.period ? (
                    <span>{item.period.includes('2026') ? '2026' : item.period}</span>
                  ) : (
                    <span className="text-zinc-300">—</span>
                  )}
                </div>

                {/* Column 2: Company & Role */}
                <div className="md:col-span-5 space-y-1">
                  <h3 className={`text-2xl sm:text-3xl font-editorial tracking-tight transition-colors ${
                    isSelected ? 'text-[#2b4b7c]' : 'text-zinc-900'
                  }`}>
                    {item.company}
                  </h3>
                  <p className="font-mono text-xs text-zinc-500 uppercase tracking-widest">
                    {item.role}
                  </p>
                </div>

                {/* Column 3: Expandable Responsibilities & Details */}
                <div className="md:col-span-4 space-y-3 pt-1">
                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: editorialEase }}
                        className="space-y-3 overflow-hidden"
                      >
                        <ul className="space-y-2 text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans">
                          {item.responsibilities.slice(0, 2).map((resp, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#2b4b7c] mt-0.5">—</span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {item.technologies.map((tech) => (
                            <span 
                              key={tech} 
                              className="text-[10px] font-mono text-zinc-500 bg-white px-2 py-0.5 rounded border border-[#ece8df]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

              </div>
            </div>
          );
        })}
      </div>
    </motion.section>
  );
};
