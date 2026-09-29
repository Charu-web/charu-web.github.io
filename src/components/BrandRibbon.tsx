import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const PLATFORMS = [
  { name: 'GitHub', label: 'github.com/Charu-web', url: 'https://github.com/Charu-web' },
  { name: 'LinkedIn', label: 'in/charu-sonker', url: 'https://www.linkedin.com/in/charu-sonker-196910250' },
  { name: 'Vercel', label: 'Production Deployed', url: 'https://vercel.com' },
  { name: 'Netlify', label: 'Serverless Functions', url: 'https://netlify.com' },
  { name: 'React', label: 'Frontend Ecosystem', url: 'https://react.dev' },
  { name: 'TypeScript', label: 'Type-Safe Architecture', url: 'https://www.typescriptlang.org' },
  { name: 'Node.js', label: 'Backend APIs', url: 'https://nodejs.org' },
];

export const BrandRibbon: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full bg-[#101224]/80 border-y border-white/[0.06] backdrop-blur-md py-6 sm:py-7 relative z-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div 
          initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center justify-center sm:justify-between gap-6 sm:gap-8 md:gap-12"
        >
          {PLATFORMS.map((platform) => (
            <a
              key={platform.name}
              href={platform.url}
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-2 text-zinc-400 hover:text-white transition-colors duration-200"
            >
              <span className="font-semibold text-sm sm:text-base tracking-wide font-sans text-zinc-300 group-hover:text-amber-400 transition-colors">
                {platform.name}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover:bg-amber-400 transition-colors" />
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
