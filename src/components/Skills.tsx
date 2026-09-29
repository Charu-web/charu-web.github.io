import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SKILL_CATEGORIES } from '../data/portfolioData';

interface InteractiveSkillItemProps {
  name: string;
}

const InteractiveSkillItem: React.FC<InteractiveSkillItemProps> = ({ name }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.span
      whileHover={shouldReduceMotion ? {} : { y: -2, x: 2, color: '#2b4b7c' }}
      transition={{ type: 'spring', damping: 18, stiffness: 300 }}
      className="inline-block cursor-default text-sm sm:text-base text-zinc-700 hover:text-[#2b4b7c] transition-colors py-1 font-mono tracking-tight"
    >
      {name}
    </motion.span>
  );
};

export const Skills: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const editorialEase = [0.16, 1, 0.3, 1] as const;

  return (
    <motion.section 
      id="skills" 
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: editorialEase }}
      className="py-24 sm:py-36 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto border-t border-[#ece8df] text-left select-none"
    >
      {/* Section Eyebrow & Title */}
      <div className="pb-12 border-b border-[#ece8df] space-y-2">
        <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest block">
          04 / TECHNICAL INDEX
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-editorial font-light text-zinc-900 tracking-tight">
          Tooling &amp; Architecture
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 font-sans">
          Index of full-stack frameworks, real-time protocols, databases, and AI systems.
        </p>
      </div>

      {/* Editorial Index Grid */}
      <div className="pt-10 divide-y divide-[#ece8df]">
        {SKILL_CATEGORIES.map((category) => (
          <div 
            key={category.id} 
            className="py-8 sm:py-10 grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-8 items-baseline group"
          >
            {/* Category Number & Title */}
            <div className="sm:col-span-4 flex items-baseline gap-3">
              <span className="font-mono text-xs text-zinc-400">
                {category.number}
              </span>
              <h3 className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-zinc-900 group-hover:text-[#2b4b7c] transition-colors">
                / {category.title}
              </h3>
            </div>

            {/* Typography List with Displacement on Hover */}
            <div className="sm:col-span-8">
              <div className="flex flex-wrap gap-x-6 gap-y-2.5">
                {category.skills.map((skill) => (
                  <InteractiveSkillItem key={skill} name={skill} />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
};
