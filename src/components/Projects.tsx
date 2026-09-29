import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ALL_PROJECTS } from '../data/portfolioData';
import type { FeaturedProject } from '../types';
import { FigmaProjectCard } from './FigmaProjectCard';

interface ProjectsProps {
  onSelectCaseStudy: (project: FeaturedProject) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectCaseStudy }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Full Stack' | 'AI & Web' | 'Production'>('All');
  const shouldReduceMotion = useReducedMotion();
  const editorialEase = [0.16, 1, 0.3, 1] as const;

  const filteredProjects = ALL_PROJECTS.filter((project) => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Full Stack') {
      return project.filterCategory === 'App' || project.technologies.includes('Node.js');
    }
    if (activeFilter === 'AI & Web') {
      return project.category.includes('AI') || project.technologies.includes('OpenAI API');
    }
    if (activeFilter === 'Production') {
      return project.liveUrl && !project.liveUrl.includes('github.com');
    }
    return true;
  });

  return (
    <section 
      id="projects" 
      className="py-24 sm:py-36 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header: Our Portfolio & See All (Matching Figma) */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 text-left">
        <motion.div 
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: editorialEase }}
          className="space-y-2"
        >
          <span className="font-mono text-xs font-semibold tracking-widest uppercase text-amber-400 block">
            SELECTED WORKS
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Our Portfolio
          </h2>
          <div className="w-12 h-1 bg-amber-400 rounded-full my-2" />
          <p className="font-sans text-sm text-zinc-300 max-w-md pt-1">
            Production-ready full stack architectures, real-time interactive apps, and AI-integrated applications.
          </p>
        </motion.div>

        {/* Filter Controls & "See All →" */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2 p-1 rounded-xl bg-white/[0.04] border border-white/[0.08]">
            {(['All', 'Full Stack', 'AI & Web', 'Production'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-amber-400 text-zinc-950 font-bold shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <a
            href="https://github.com/Charu-web"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors group py-1"
          >
            <span>See All</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* 3-Column Responsive Grid (Matching Figma Desktop - 7) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredProjects.map((project, index) => (
          <FigmaProjectCard
            key={project.id}
            project={project}
            index={index}
            onSelectCaseStudy={onSelectCaseStudy}
          />
        ))}
      </div>

    </section>
  );
};
