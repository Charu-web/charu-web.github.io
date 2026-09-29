import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import { ProjectMockupVisual } from './ProjectMockupVisual';

export const Lab: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [activeExperiment, setActiveExperiment] = useState<number | null>(0);

  const experiments = [
    {
      num: '01',
      id: 'doodle-duel',
      title: 'Doodle Duel AI',
      category: 'Real-Time WebSockets & Vision AI',
      description: 'Collaborative multiplayer drawing canvas synchronized with OpenAI vision evaluation.',
      technologies: ['React', 'Socket.io', 'OpenAI API', 'Canvas API'],
      visualType: 'doodle-duel' as const,
      githubUrl: 'https://github.com/Charu-web/sketch-duel-ai-doodle-battles',
      liveUrl: 'https://sketch-duel-ai-doodle-battles.vercel.app',
    },
    {
      num: '02',
      id: 'neon-space-shooter',
      title: 'Neon Space Shooter',
      category: 'Canvas Game Loop & Physics Math',
      description: '60FPS arcade space engine with spatial partition collision & zero garbage collection.',
      technologies: ['JavaScript', 'HTML5 Canvas', 'Game Physics'],
      visualType: 'space-shooter' as const,
      githubUrl: 'https://github.com/Charu-web/neon-space-shooter',
      liveUrl: 'https://charu-web.github.io/neon-space-shooter/',
    },
    {
      num: '03',
      id: 'bubble-shooter',
      title: 'Bubble Shooter Physics',
      category: 'Hexagonal Grid & Recursive Flood Fill',
      description: 'Ray-casting trajectory projection with recursive cluster drop math.',
      technologies: ['Canvas API', 'Math Physics', 'Algorithms'],
      visualType: 'bubble-shooter' as const,
      githubUrl: 'https://github.com/Charu-web',
    },
    {
      num: '04',
      id: 'pixel-quantizer',
      title: 'Pixel Quantizer Engine',
      category: 'K-Means Color Clustering & Palettes',
      description: 'Image quantizer mapping continuous RGB spaces into discrete retro palettes.',
      technologies: ['React', 'TypeScript', 'Color Quantization'],
      visualType: 'pixel-art' as const,
      githubUrl: 'https://github.com/Charu-web/pixel-art-image-transformer',
      liveUrl: 'https://pixel-art-ai-studio.vercel.app',
    },
  ];

  const editorialEase = [0.16, 1, 0.3, 1] as const;

  return (
    <motion.section 
      id="lab" 
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: editorialEase }}
      className="py-24 sm:py-36 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto border-t border-[#ece8df] text-left select-none"
    >
      {/* Section Eyebrow & Title */}
      <div className="pb-12 border-b border-[#ece8df] space-y-2">
        <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest block">
          05 / EXPERIMENTS &amp; INTERACTIVE GRAPHICS
        </span>
        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-editorial font-light text-zinc-900 tracking-tight">
          Lab
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 font-sans">
          Horizontal experimental strip. Hover an experiment to reveal live canvas visuals.
        </p>
      </div>

      {/* Main Interactive Layout: Horizontal Strip List + Floating Preview */}
      <div className="pt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Experiments Strip */}
        <div className="lg:col-span-7 divide-y divide-[#ece8df]">
          {experiments.map((exp, idx) => {
            const isActive = activeExperiment === idx;

            return (
              <div
                key={exp.id}
                onMouseEnter={() => setActiveExperiment(idx)}
                className={`py-6 sm:py-8 transition-all duration-300 cursor-pointer group flex flex-col justify-between ${
                  isActive ? 'opacity-100' : 'opacity-60 hover:opacity-100'
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs text-zinc-400">
                    {exp.num}
                  </span>
                  <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                    {exp.category}
                  </span>
                </div>

                <div className="pt-2 flex items-baseline justify-between">
                  <h3 className={`text-2xl sm:text-3xl font-editorial transition-colors ${
                    isActive ? 'text-[#2b4b7c]' : 'text-zinc-900'
                  }`}>
                    {exp.title}
                  </h3>

                  <div className="flex items-center gap-3 font-mono text-xs">
                    {exp.liveUrl && (
                      <a
                        href={exp.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-400 hover:text-[#2b4b7c] transition-colors flex items-center gap-0.5"
                      >
                        <span>DEMO</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                    {exp.githubUrl && (
                      <a
                        href={exp.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-zinc-400 hover:text-zinc-900 transition-colors"
                      >
                        <GithubIcon className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-zinc-500 pt-1 font-sans">
                  {exp.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Right Column: Visual Preview Canvas Frame */}
        <div className="lg:col-span-5 flex items-center justify-center">
          <div className="w-full max-w-md rounded-2xl bg-zinc-950 border border-[#ece8df] overflow-hidden shadow-xl p-1 relative">
            <div className="bg-zinc-900/90 px-3 py-2 border-b border-zinc-800 flex items-center justify-between text-[10px] font-mono text-zinc-400">
              <span className="flex items-center gap-1.5 text-zinc-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>INTERACTIVE CANVAS</span>
              </span>
              <span>{activeExperiment !== null ? experiments[activeExperiment]?.num : '01'}</span>
            </div>

            <div className="h-64 sm:h-72 w-full overflow-hidden flex items-center justify-center relative">
              <AnimatePresence mode="wait">
                {activeExperiment !== null && (
                  <motion.div
                    key={experiments[activeExperiment].id}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.3, ease: editorialEase }}
                    className="w-full h-full"
                  >
                    <ProjectMockupVisual type={experiments[activeExperiment].visualType} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </motion.section>
  );
};
