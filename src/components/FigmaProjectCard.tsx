import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, BookOpen } from 'lucide-react';
import { GithubIcon } from './Icons';
import { ProjectMockupVisual } from './ProjectMockupVisual';
import type { FeaturedProject } from '../types';

interface FigmaProjectCardProps {
  project: FeaturedProject;
  index: number;
  onSelectCaseStudy: (project: FeaturedProject) => void;
}

export const FigmaProjectCard: React.FC<FigmaProjectCardProps> = ({
  project,
  index,
  onSelectCaseStudy,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const editorialEase = [0.16, 1, 0.3, 1] as const;

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.08, ease: editorialEase }}
      className="group relative bg-[#131627]/90 hover:bg-[#181d33] border border-white/[0.08] hover:border-amber-400/40 rounded-2xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 shadow-xl shadow-black/20"
    >
      <div>
        {/* Mockup Preview Container */}
        <div className="w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#0c0e1a] border border-white/[0.06] relative shadow-inner flex items-center justify-center">
          <ProjectMockupVisual type={project.visualType} />

          {/* Quick overlay badges on mockup */}
          <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 z-10 pointer-events-none">
            <span className="px-2 py-0.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-white/10 font-mono text-[10px] text-zinc-300">
              {project.filterCategory}
            </span>
          </div>
        </div>

        {/* Project Meta Information */}
        <div className="pt-4 space-y-1.5 text-left">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-amber-400 font-semibold tracking-wider uppercase">
              {project.category}
            </span>
          </div>

          <h3 className="font-sans text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
            {project.title}
          </h3>

          <p className="font-sans text-xs text-zinc-400 line-clamp-2 leading-relaxed">
            {project.tagline || project.description}
          </p>
        </div>

        {/* Tech Badges */}
        <div className="flex flex-wrap gap-1.5 pt-3">
          {project.technologies.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="font-mono text-[10px] text-zinc-400 bg-white/[0.04] px-2 py-0.5 rounded border border-white/[0.06]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Card Action Links */}
      <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-300 hover:text-amber-400 transition-colors py-1 px-2.5 rounded-lg bg-white/[0.04] hover:bg-white/[0.08]"
              title="Live Demo"
            >
              <span>Demo</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-400 hover:text-white transition-colors py-1 px-2 rounded-lg hover:bg-white/[0.06]"
              title="Source Code"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Code</span>
            </a>
          )}
        </div>

        {project.caseStudy && (
          <button
            onClick={() => onSelectCaseStudy(project)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors py-1 px-2.5 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Case Study</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};
