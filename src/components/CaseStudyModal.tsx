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
        className="fixed inset-0 z-50 overflow-y-auto bg-[#faf9f6] text-[#222222] select-text"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-study-title"
      >
        {/* 1. Sticky Minimalist Editorial Navigation Header */}
        <header className="sticky top-0 z-40 bg-[#faf9f6]/92 backdrop-blur-md border-b border-[#ece8df] py-4 px-6 sm:px-8 lg:px-12">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-[#2b4b7c] font-semibold tracking-widest uppercase">
                SELECTED WORK
              </span>
              <span className="text-zinc-300 font-mono text-xs">/</span>
              <span className="font-editorial text-sm sm:text-base text-zinc-900 font-normal">
                {project.title}
              </span>
            </div>

            <button
              onClick={onClose}
              data-cursor="CLICK"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-600 hover:text-zinc-950 px-3 py-1.5 rounded-full border border-[#ece8df] bg-white hover:bg-zinc-100 transition-colors cursor-pointer"
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
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 pb-24 text-left"
        >
          {/* Top Metadata & Category */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#ece8df] text-xs font-mono text-zinc-500 uppercase tracking-widest">
            <div>
              CATEGORY: <span className="text-zinc-900 font-semibold">{project.category}</span>
            </div>
            <div>
              PLATFORM: <span className="text-zinc-900 font-semibold">{project.filterCategory}</span>
            </div>
          </div>

          {/* Large Editorial Headline */}
          <div className="py-10 sm:py-14 space-y-4">
            <h1 id="case-study-title" className="text-4xl sm:text-6xl lg:text-7xl font-editorial font-light tracking-tight text-zinc-950 leading-[1.05]">
              {project.title}
            </h1>
            <p className="text-lg sm:text-2xl font-editorial text-zinc-600 max-w-3xl leading-relaxed italic">
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2b4b7c] text-white hover:bg-[#1e385f] transition-colors shadow-sm"
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white border border-[#ece8df] text-zinc-800 hover:bg-zinc-50 transition-colors shadow-xs"
              >
                <GithubIcon className="w-4 h-4" />
                <span>VIEW GITHUB REPOSITORY ↗</span>
              </a>
            )}
          </div>

          {/* Expansive Project Visual Display Frame */}
          <div className="rounded-2xl overflow-hidden border border-[#ece8df] shadow-md bg-zinc-950 mb-16">
            <div className="bg-[#1f2329] px-4 py-2.5 flex items-center justify-between border-b border-zinc-800 text-xs">
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

            <div className="min-h-[360px] sm:min-h-[460px] flex items-center justify-center">
              <ProjectMockupVisual type={project.visualType} />
            </div>
          </div>

          {/* Structured Architectural Sections */}
          <div className="space-y-16">
            {caseStudy ? (
              <>
                {/* 1. Overview & Problem / Solution Grid */}
                <section className="space-y-6">
                  <div className="border-b border-[#ece8df] pb-3">
                    <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest">
                      01 / SYSTEM OVERVIEW
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-editorial font-light text-zinc-900 mt-1">
                      Architecture &amp; Mission
                    </h2>
                  </div>
                  <p className="text-sm sm:text-base text-zinc-700 leading-relaxed font-sans max-w-3xl">
                    {caseStudy.overview}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                    <div className="p-6 rounded-xl bg-white border border-[#ece8df] space-y-2">
                      <div className="flex items-center gap-2 text-zinc-900 font-mono text-xs uppercase tracking-wider font-semibold">
                        <Target className="w-4 h-4 text-zinc-500" />
                        <span>The Problem</span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                        {caseStudy.problem}
                      </p>
                    </div>

                    <div className="p-6 rounded-xl bg-white border border-[#ece8df] space-y-2">
                      <div className="flex items-center gap-2 text-[#2b4b7c] font-mono text-xs uppercase tracking-wider font-semibold">
                        <Lightbulb className="w-4 h-4 text-[#2b4b7c]" />
                        <span>Engineering Solution</span>
                      </div>
                      <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                        {caseStudy.solution}
                      </p>
                    </div>
                  </div>
                </section>

                {/* 2. Key Features */}
                <section className="space-y-6">
                  <div className="border-b border-[#ece8df] pb-3">
                    <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest">
                      02 / CAPABILITIES
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-editorial font-light text-zinc-900 mt-1">
                      Key Engineering Features
                    </h2>
                  </div>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {caseStudy.keyFeatures.map((feat, i) => (
                      <li key={i} className="p-4 rounded-xl bg-white border border-[#ece8df] text-xs sm:text-sm text-zinc-700 flex items-start gap-3">
                        <span className="text-[#2b4b7c] font-mono text-xs font-bold mt-0.5">
                          {String(i + 1).padStart(2, '0')}.
                        </span>
                        <span className="leading-relaxed">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* 3. Technical Implementation */}
                <section className="space-y-6">
                  <div className="border-b border-[#ece8df] pb-3">
                    <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest">
                      03 / IMPLEMENTATION
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-editorial font-light text-zinc-900 mt-1">
                      Technical Implementation Details
                    </h2>
                  </div>
                  <ul className="space-y-3 font-sans text-xs sm:text-sm text-zinc-600 leading-relaxed">
                    {caseStudy.technicalImplementation.map((impl, i) => (
                      <li key={i} className="p-4 rounded-xl bg-white border border-[#ece8df] flex items-start gap-3">
                        <span className="text-zinc-400 font-mono text-xs mt-0.5">—</span>
                        <span>{impl}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* 4. Tech Stack Breakdown */}
                <section className="space-y-6">
                  <div className="border-b border-[#ece8df] pb-3">
                    <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest">
                      04 / TECH STACK
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-editorial font-light text-zinc-900 mt-1">
                      Technology &amp; Tooling Breakdown
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {caseStudy.technologyStack.map((stackGroup) => (
                      <div key={stackGroup.category} className="p-5 rounded-xl bg-white border border-[#ece8df] space-y-3">
                        <div className="text-[11px] font-mono font-semibold text-zinc-500 uppercase tracking-wider">
                          {stackGroup.category}
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {stackGroup.tools.map((tool) => (
                            <span key={tool} className="text-xs font-mono px-2 py-0.5 rounded bg-[#faf9f6] border border-[#ece8df] text-zinc-700">
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
                  <div className="border-b border-[#ece8df] pb-3">
                    <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest">
                      05 / OUTCOME
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-editorial font-light text-zinc-900 mt-1">
                      Engineering Outcome &amp; Takeaways
                    </h2>
                  </div>
                  <div className="p-6 rounded-xl bg-white border border-[#ece8df] space-y-4 text-xs sm:text-sm text-zinc-700 leading-relaxed font-sans">
                    <p>{caseStudy.outcome}</p>
                    {caseStudy.challenges && caseStudy.challenges.length > 0 && (
                      <div className="pt-2 border-t border-[#f2efe9] space-y-2">
                        <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider block">
                          Technical Challenges Resolved:
                        </span>
                        <ul className="space-y-1.5 text-zinc-600">
                          {caseStudy.challenges.map((c, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#2b4b7c]">•</span>
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
                <div className="border-b border-[#ece8df] pb-3">
                  <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest">
                    01 / HIGHLIGHTS
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-editorial font-light text-zinc-900 mt-1">
                    Engineering Overview
                  </h2>
                </div>
                <div className="p-6 rounded-xl bg-white border border-[#ece8df] space-y-4 text-sm text-zinc-700">
                  <p>{project.highlight || project.description}</p>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.map((t) => (
                      <span key={t} className="text-xs font-mono px-3 py-1 rounded bg-[#faf9f6] border border-[#ece8df] text-zinc-700">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </section>
            )}
          </div>

          {/* 6. Marius Ballot Signature Project-to-Project Navigation */}
          {allProjects.length > 1 && onSelectProject && (
            <div className="mt-24 pt-12 border-t border-[#ece8df] grid grid-cols-1 sm:grid-cols-2 gap-8">
              {prevProject && (
                <button
                  onClick={() => {
                    onSelectProject(prevProject);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group flex flex-col items-start p-6 rounded-2xl bg-white border border-[#ece8df] hover:border-[#c8c3b5] hover:shadow-md transition-all duration-300 text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-2 group-hover:text-[#2b4b7c] transition-colors">
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                    <span>PREVIOUS PROJECT</span>
                  </div>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-zinc-900 group-hover:text-[#2b4b7c] transition-colors">
                    {prevProject.title}
                  </h3>
                  <span className="w-0 group-hover:w-full h-0.5 bg-[#2b4b7c] mt-2 transition-all duration-300" />
                </button>
              )}

              {nextProject && (
                <button
                  onClick={() => {
                    onSelectProject(nextProject);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group flex flex-col items-end p-6 rounded-2xl bg-white border border-[#ece8df] hover:border-[#c8c3b5] hover:shadow-md transition-all duration-300 text-right cursor-pointer"
                >
                  <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-400 uppercase tracking-wider mb-2 group-hover:text-[#2b4b7c] transition-colors">
                    <span>NEXT PROJECT</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <h3 className="font-editorial text-2xl sm:text-3xl text-zinc-900 group-hover:text-[#2b4b7c] transition-colors">
                    {nextProject.title}
                  </h3>
                  <span className="w-0 group-hover:w-full h-0.5 bg-[#2b4b7c] mt-2 transition-all duration-300" />
                </button>
              )}
            </div>
          )}

          {/* Close Floating Bottom Action */}
          <div className="mt-16 text-center">
            <button
              onClick={onClose}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-zinc-900 text-white font-mono text-xs uppercase tracking-widest hover:bg-[#2b4b7c] transition-colors cursor-pointer shadow-sm"
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
