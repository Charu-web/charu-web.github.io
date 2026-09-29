import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { 
  X, 
  ArrowUpRight, 
  ArrowLeft, 
  ArrowRight,
  Target, 
  Lightbulb, 
  Globe
} from 'lucide-react';
import { GithubIcon } from './Icons';
import type { FeaturedProject } from '../types';
import { ProjectMockupVisual } from './ProjectMockupVisual';

interface CaseStudyModalProps {
  project: FeaturedProject | null;
  onClose: () => void;
  onSelectProject?: (project: FeaturedProject) => void;
  allProjects?: FeaturedProject[];
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({ 
  project, 
  onClose,
  onSelectProject,
  allProjects = []
}) => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  const { caseStudy } = project;

  // Determine previous and next projects for navigation
  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : allProjects[allProjects.length - 1];
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : allProjects[0];

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-50 overflow-y-auto bg-[#0c0d19] text-[#f1f5f9] select-text"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
      >
        {/* 1. Sticky Navigation Header */}
        <header className="sticky top-0 z-40 bg-[#0c0d19]/95 backdrop-blur-md border-b border-white/[0.08] py-4 px-6 sm:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-amber-400 font-semibold tracking-widest uppercase">
                PORTFOLIO
              </span>
              <span className="text-zinc-600 font-mono text-xs">/</span>
              <span className="font-sans text-sm sm:text-base text-white font-semibold">
                {project.title}
              </span>
            </div>

            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-300 hover:text-white px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.06] hover:bg-white/[0.12] transition-colors cursor-pointer"
              aria-label="Close Case Study"
            >
              <span>CLOSE (ESC)</span>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </header>

        {/* 2. Main Full-Page Case Study Container */}
        <motion.article 
          initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 pb-24 text-left"
        >
          {/* Top Metadata & Category */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-white/[0.08] text-xs font-mono text-zinc-400 uppercase tracking-widest">
            <div>
              CATEGORY: <span className="text-amber-400 font-semibold">{project.category}</span>
            </div>
            <div>
              PLATFORM: <span className="text-white font-semibold">{project.filterCategory}</span>
            </div>
          </div>

          {/* Large Headline */}
          <div className="py-10 sm:py-14 space-y-4">
            <h1 id="case-study-title" className="text-4xl sm:text-6xl font-sans font-extrabold tracking-tight text-white leading-tight">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl font-sans text-zinc-300 max-w-3xl leading-relaxed">
              {project.tagline || project.description}
            </p>
          </div>

          {/* Action CTAs (Live Demo & Source Code) */}
          <div className="pb-12 flex flex-wrap gap-4 text-xs font-mono tracking-wider uppercase font-semibold">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 text-zinc-950 font-bold hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20"
              >
                <Globe className="w-4 h-4" />
                <span>LAUNCH LIVE DEMO ↗</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/[0.06] border border-white/10 text-white hover:bg-white/[0.12] transition-colors"
              >
                <GithubIcon className="w-4 h-4" />
                <span>VIEW GITHUB REPOSITORY ↗</span>
              </a>
            )}
          </div>

          {/* Project Visual Display Frame */}
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-zinc-950 mb-16">
            <div className="bg-[#131627] px-4 py-2.5 flex items-center justify-between border-b border-white/[0.08] text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80 inline-block" />
              </div>
              <div className="font-mono text-[10px] text-zinc-400">
                {project.liveUrl || 'production-build.app'}
              </div>
              <div className="w-4" />
            </div>

            <div className="min-h-[360px] sm:min-h-[460px] flex items-center justify-center p-4">
              <ProjectMockupVisual type={project.visualType} />
            </div>
          </div>

          {/* Structured Architectural Sections */}
          <div className="space-y-16">
            {caseStudy ? (
              <>
                {/* 1. Overview & Problem / Solution Grid */}
                <section className="space-y-6">
                  <div className="border-b border-white/[0.08] pb-3">
                    <span className="font-mono text-[11px] text-amber-400 uppercase tracking-widest">
                      01 / SYSTEM OVERVIEW
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white mt-1">
                      Architecture &amp; Mission
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans max-w-3xl">
                    {caseStudy.overview}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="p-6 rounded-2xl bg-[#131627] border border-white/[0.08] space-y-2">
                      <div className="flex items-center gap-2 text-white font-mono text-xs uppercase tracking-wider font-semibold">
                        <Target className="w-4 h-4 text-amber-400" />
                        <span>The Problem</span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {caseStudy.problem}
                      </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-[#131627] border border-white/[0.08] space-y-2">
                      <div className="flex items-center gap-2 text-amber-400 font-mono text-xs uppercase tracking-wider font-semibold">
                        <Lightbulb className="w-4 h-4 text-amber-400" />
                        <span>Engineering Solution</span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {caseStudy.solution}
                      </p>
                    </div>
                  </div>
                </section>

                {/* 2. Key Features */}
                <section className="space-y-6">
                  <div className="border-b border-white/[0.08] pb-3">
                    <span className="font-mono text-[11px] text-amber-400 uppercase tracking-widest">
                      02 / CAPABILITIES
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white mt-1">
                      Key Engineering Features
                    </h2>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {caseStudy.keyFeatures.map((feat, i) => (
                      <li key={i} className="p-4 rounded-xl bg-[#131627] border border-white/[0.08] text-xs sm:text-sm text-zinc-300 flex items-start gap-3">
                        <span className="text-amber-400 font-mono text-xs font-bold mt-0.5">
                          {String(i + 1).padStart(2, '0')}.
                        </span>
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* 3. Technical Implementation */}
                <section className="space-y-6">
                  <div className="border-b border-white/[0.08] pb-3">
                    <span className="font-mono text-[11px] text-amber-400 uppercase tracking-widest">
                      03 / IMPLEMENTATION
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white mt-1">
                      Technical Implementation Details
                    </h2>
                  </div>
                  <ul className="space-y-3 font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed">
                    {caseStudy.technicalImplementation.map((impl, i) => (
                      <li key={i} className="p-4 rounded-xl bg-[#131627] border border-white/[0.08] flex items-start gap-3">
                        <span className="text-amber-400 font-mono text-xs mt-0.5">—</span>
                        <span>{impl}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* 4. Tech Stack Breakdown */}
                <section className="space-y-6">
                  <div className="border-b border-white/[0.08] pb-3">
                    <span className="font-mono text-[11px] text-amber-400 uppercase tracking-widest">
                      04 / TECH STACK
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white mt-1">
                      Technology &amp; Tooling Breakdown
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {caseStudy.technologyStack.map((stackGroup) => (
                      <div key={stackGroup.category} className="p-5 rounded-2xl bg-[#131627] border border-white/[0.08] space-y-3">
                        <div className="text-[11px] font-mono font-semibold text-amber-400 uppercase tracking-wider">
                          {stackGroup.category}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {stackGroup.tools.map((tool) => (
                            <span key={tool} className="text-xs font-mono px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.08] text-zinc-300">
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* 5. Challenges & Outcome */}
                <section className="space-y-6">
                  <div className="border-b border-white/[0.08] pb-3">
                    <span className="font-mono text-[11px] text-amber-400 uppercase tracking-widest">
                      05 / OUTCOME
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white mt-1">
                      Engineering Outcome &amp; Takeaways
                    </h2>
                  </div>
                  <div className="p-6 rounded-2xl bg-[#131627] border border-white/[0.08] space-y-4 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                    <p>{caseStudy.outcome}</p>
                    {caseStudy.challenges && caseStudy.challenges.length > 0 && (
                      <div className="pt-2 border-t border-white/[0.06] space-y-2">
                        <span className="font-mono text-[11px] text-amber-400 uppercase tracking-wider block">
                          Technical Challenges Resolved:
                        </span>
                        <ul className="space-y-1.5 text-zinc-300">
                          {caseStudy.challenges.map((c, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-amber-400">•</span>
                              <span>{c}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </section>
              </>
            ) : (
              <section className="space-y-6">
                <div className="border-b border-white/[0.08] pb-3">
                  <span className="font-mono text-[11px] text-amber-400 uppercase tracking-widest">
                    01 / HIGHLIGHTS
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-sans font-bold text-white mt-1">
                    Engineering Overview
                  </h2>
                </div>
                <div className="p-6 rounded-2xl bg-[#131627] border border-white/[0.08] space-y-4 text-sm text-zinc-300">
                  <p>{project.highlight || project.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.map((t) => (
                      <span key={t} className="text-xs font-mono px-3 py-1 rounded bg-white/[0.04] border border-white/[0.08] text-zinc-300">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* Project-to-Project Navigation */}
          {allProjects.length > 1 && onSelectProject && (
            <div className="mt-24 pt-12 border-t border-white/[0.08] grid grid-cols-1 sm:grid-cols-2 gap-8">
              {prevProject && (
                <button
                  onClick={() => {
                    onSelectProject(prevProject);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group flex flex-col items-start p-6 rounded-2xl bg-[#131627] border border-white/[0.08] hover:border-amber-400/50 transition-all duration-300 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-2 group-hover:text-amber-400 transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                    <span>PREVIOUS PROJECT</span>
                  </div>
                  <h3 className="font-sans text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {prevProject.title}
                  </h3>
                </button>
              )}

              {nextProject && (
                <button
                  onClick={() => {
                    onSelectProject(nextProject);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group flex flex-col items-end p-6 rounded-2xl bg-[#131627] border border-white/[0.08] hover:border-amber-400/50 transition-all duration-300 text-right cursor-pointer"
                >
                  <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-2 group-hover:text-amber-400 transition-colors">
                    <span>NEXT PROJECT</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="font-sans text-xl sm:text-2xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {nextProject.title}
                  </h3>
                </button>
              )}
            </div>
          )}

          {/* Close Floating Bottom Action */}
          <div className="mt-16 text-center">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-amber-400 text-zinc-950 font-bold font-mono text-xs uppercase tracking-widest hover:bg-amber-300 transition-colors cursor-pointer shadow-lg shadow-amber-400/20"
            >
              <span>RETURN TO WORK</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </motion.article>
      </div>
    </AnimatePresence>
  );
};
