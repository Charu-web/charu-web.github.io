import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, BookOpen, Images, Layout } from 'lucide-react';
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
  const [viewMode, setViewMode] = useState<'image' | 'telemetry'>('image');

  const hasLiveDemo = Boolean(project.liveUrl && !project.liveUrl.includes('github.com'));
  const hasImage = Boolean(project.imageUrl);

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
          
          {hasImage && viewMode === 'image' ? (
            <div className="w-full h-full relative overflow-hidden group/img">
              <img
                src={project.imageUrl}
                alt={`${project.title} - Real Project Preview`}
                loading="lazy"
                className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover/img:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/30 pointer-events-none" />

              {/* Bottom Image Caption Pill */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-[10px] font-mono text-zinc-300 pointer-events-none">
                <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10">
                  {project.liveUrl ? new URL(project.liveUrl).hostname : 'Verified Project'}
                </span>
                {project.galleryImages && project.galleryImages.length > 0 && (
                  <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md border border-white/10 flex items-center gap-1 text-amber-300">
                    <Images className="w-2.5 h-2.5" />
                    <span>+{project.galleryImages.length} Photos</span>
                  </span>
                )}
              </div>
            </div>
          ) : (
            <ProjectMockupVisual type={project.visualType} />
          )}

          {/* Top-Left Category Badge (Positioned safely away from right-side controls) */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
            <span className="px-2.5 py-0.5 rounded-full bg-zinc-950/85 backdrop-blur-md border border-white/10 font-mono text-[10px] text-amber-400 font-semibold shadow-sm">
              {project.filterCategory}
            </span>
          </div>

          {/* Top-Right Toggle (Switch between genuine Screenshot & Interactive Telemetry UI) */}
          {hasImage && (
            <div className="absolute top-2.5 right-2.5 flex items-center z-10">
              <button
                onClick={() => setViewMode(viewMode === 'image' ? 'telemetry' : 'image')}
                className="px-2 py-0.5 rounded-full bg-zinc-950/85 hover:bg-zinc-900 backdrop-blur-md border border-white/10 font-mono text-[9px] text-zinc-300 hover:text-white transition-colors flex items-center gap-1 cursor-pointer shadow-sm"
                title={viewMode === 'image' ? 'Switch to interactive telemetry architecture view' : 'Switch to real screenshot'}
              >
                {viewMode === 'image' ? (
                  <>
                    <Layout className="w-2.5 h-2.5 text-amber-400" />
                    <span>Architecture</span>
                  </>
                ) : (
                  <>
                    <Images className="w-2.5 h-2.5 text-amber-400" />
                    <span>Photo</span>
                  </>
                )}
              </button>
            </div>
          )}
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
          {hasLiveDemo && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-200 hover:text-amber-400 transition-colors py-1.5 px-3 rounded-lg bg-white/[0.04] hover:bg-white/[0.08] border border-white/10"
              title="Open Live Project Demo"
            >
              <span>Live Project</span>
              <ExternalLink className="w-3 h-3 text-amber-400" />
            </a>
          )}

          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-400 hover:text-white transition-colors py-1.5 px-2.5 rounded-lg hover:bg-white/[0.06]"
              title="View Source Code on GitHub"
            >
              <GithubIcon className="w-3.5 h-3.5" />
              <span>Code</span>
            </a>
          )}
        </div>

        {project.caseStudy && (
          <button
            onClick={() => onSelectCaseStudy(project)}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors py-1.5 px-3 rounded-lg bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/20 cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Case Study</span>
          </button>
        )}
      </div>
    </motion.div>
  );
};
