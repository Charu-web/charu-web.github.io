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
      whileHover={shouldReduceMotion ? {} : { y: -2, scale: 1.04 }}
      transition={{ type: 'spring', damping: 15, stiffness: 300 }}
      className="inline-block px-3 py-1 rounded-md bg-white border border-[#ece8df] hover:border-[#2b4b7c] hover:text-[#2b4b7c] hover:shadow-xs transition-all duration-200 cursor-default font-mono text-xs"
    >
      {name}
    </motion.span>
  );
};

export const Skills: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section 
      id="skills" 
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto border-t border-[#ece8df] text-left"
    >
      <div className="pb-10 border-b border-[#ece8df]">
        <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest block mb-2">
          04 / TECHNICAL TOOLING
        </span>
        <h2 className="text-3xl sm:text-4xl font-editorial font-light text-zinc-900 tracking-tight">
          Skills &amp; Tooling
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 font-sans mt-1">
          Interactive technology directory. Hover over skills for micro-parallax depth.
        </p>
      </div>

      <div className="pt-8 divide-y divide-[#ece8df]">
        {SKILL_CATEGORIES.map((cat) => (
          <div 
            key={cat.id} 
            className="py-6 grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-8 items-baseline group hover:bg-white/60 px-4 -mx-4 rounded-xl transition-colors duration-200"
          >
            <div className="sm:col-span-4">
              <h3 className="font-mono text-xs sm:text-sm font-semibold tracking-wider text-zinc-900 group-hover:text-[#2b4b7c] group-hover:translate-x-2 transition-all duration-300">
                {cat.title}
              </h3>
            </div>
            <div className="sm:col-span-8">
              <div className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans flex flex-wrap gap-x-2.5 gap-y-2">
                {cat.skills.map((skill) => (
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
