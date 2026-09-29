import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ALL_PROJECTS } from '../data/portfolioData';
import type { FeaturedProject } from '../types';
import { ProjectCard3D } from './ProjectCard3D';

interface ProjectsProps {
  onSelectCaseStudy: (project: FeaturedProject) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectCaseStudy }) => {
  const [activeFilter, setActiveFilter] = useState<'All' | 'Web' | 'App'>('All');
  const shouldReduceMotion = useReducedMotion();

  const filteredProjects = ALL_PROJECTS.filter((project) => {
    if (activeFilter === 'All') return true;
    return project.filterCategory === activeFilter;
  });

  return (
    <motion.section 
      id="projects" 
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="py-24 sm:py-36 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto border-t border-[#ece8df]"
    >
      {/* Editorial Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-6 pb-12 border-b border-[#ece8df] text-left">
        <div className="space-y-2">
          <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest block">
            02 / SELECTED WORK
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-editorial font-light text-zinc-900 tracking-tight">
            Featured Projects
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 font-sans">
            Full-stack web architectures, real-time client systems, and AI-integrated products.
          </p>
        </div>

        {/* Minimal Editorial Filters: All, Web, App */}
        <div className="flex items-center gap-6 text-xs font-mono tracking-widest">
          {(['All', 'Web', 'App'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`transition-colors cursor-pointer py-1 uppercase ${
                activeFilter === filter
                  ? 'text-[#2b4b7c] font-semibold border-b border-[#2b4b7c]'
                  : 'text-zinc-400 hover:text-zinc-800'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Editorial Gallery (Full-Width Individual Project Views) */}
      <div className="divide-y divide-[#ece8df]">
        {filteredProjects.map((project, index) => (
          <ProjectCard3D
            key={project.id}
            project={project}
            index={index}
            onSelectCaseStudy={onSelectCaseStudy}
          />
        ))}
      </div>

    </motion.section>
  );
};
