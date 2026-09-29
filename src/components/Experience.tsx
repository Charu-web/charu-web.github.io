import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Briefcase, Calendar, ChevronRight } from 'lucide-react';
import { EXPERIENCE_ITEMS } from '../data/portfolioData';

export const Experience: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [hoveredId, setHoveredId] = useState<string | null>(EXPERIENCE_ITEMS[0]?.id || null);
  const editorialEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section 
      id="experience" 
      className="py-24 sm:py-36 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10 text-left"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <motion.div 
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: editorialEase }}
        className="pb-12 space-y-2"
      >
        <span className="font-mono text-xs font-semibold tracking-widest uppercase text-amber-400 block">
          CAREER TIMELINE
        </span>
        <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Professional Experience
        </h2>
        <div className="w-12 h-1 bg-amber-400 rounded-full my-2" />
        <p className="font-sans text-sm text-zinc-300 max-w-md pt-1">
          Production software engineering, full stack workflows, and verified project outcomes.
        </p>
      </motion.div>

      {/* Horizontal Experience List in Dark Navy Cards */}
      <div className="space-y-4">
        {EXPERIENCE_ITEMS.map((item, index) => {
          const isSelected = hoveredId === item.id;

          return (
            <motion.div
              key={item.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: index * 0.08, ease: editorialEase }}
              onMouseEnter={() => setHoveredId(item.id)}
              onClick={() => setHoveredId(isSelected ? null : item.id)}
              className={`rounded-2xl border p-6 sm:p-7 transition-all duration-300 cursor-pointer ${
                isSelected 
                  ? 'bg-[#181d33] border-amber-400/50 shadow-xl shadow-black/30' 
                  : 'bg-[#131627]/80 hover:bg-[#15192c] border-white/[0.08]'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-amber-400" />
                    <h3 className="font-sans text-xl sm:text-2xl font-bold text-white">
                      {item.company}
                    </h3>
                  </div>
                  <p className="font-sans text-sm text-amber-300/90 font-medium">
                    {item.role}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 font-mono text-xs text-zinc-400">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.period || '2026'}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-zinc-400 transition-transform ${isSelected ? 'rotate-90 text-amber-400' : ''}`} />
                </div>
              </div>

              {/* Responsibilities & Technologies */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3, ease: editorialEase }}
                    className="pt-5 mt-4 border-t border-white/[0.08] space-y-4 overflow-hidden"
                  >
                    <ul className="space-y-2 text-sm text-zinc-300 leading-relaxed font-sans">
                      {item.responsibilities.map((resp, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className="text-amber-400 mt-1">•</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {item.technologies.map((tech) => (
                        <span 
                          key={tech} 
                          className="text-xs font-mono text-zinc-300 bg-white/[0.06] px-2.5 py-1 rounded-lg border border-white/[0.08]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
