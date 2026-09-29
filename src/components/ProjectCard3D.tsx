import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import { GithubIcon } from './Icons';
import type { FeaturedProject } from '../types';
import { ProjectMockupVisual } from './ProjectMockupVisual';

interface ProjectCard3DProps {
  project: FeaturedProject;
  index: number;
  onSelectCaseStudy: (project: FeaturedProject) => void;
  isFeatured?: boolean;
}

export const ProjectCard3D: React.FC<ProjectCard3DProps> = ({
  project,
  index,
  onSelectCaseStudy,
  isFeatured = false,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Normalized mouse coordinates: -0.5 to +0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 24, stiffness: 260, mass: 0.25 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Perspective 3D rotation (subtle, elegant tilt)
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [5.5, -5.5]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-6.5, 6.5]);

  // Background huge title movement
  const bgTitleX = useTransform(smoothMouseX, [-0.5, 0.5], [-20, 20]);
  const bgTitleY = useTransform(smoothMouseY, [-0.5, 0.5], [-12, 12]);

  // Dynamic specular light reflection
  const glareX = useTransform(smoothMouseX, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(smoothMouseY, [-0.5, 0.5], ['0%', '100%']);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width - 0.5;
    const yPct = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(xPct);
    mouseY.set(yPct);
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  const formattedIndex = String(index + 1).padStart(2, '0');

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative group ${isFeatured ? 'md:col-span-2' : ''}`}
    >
      {/* 1. BEHIND: Marius Ballot Signature Large Typography Reveal */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : bgTitleX,
          y: shouldReduceMotion ? 0 : bgTitleY,
        }}
        className={`absolute -top-10 sm:-top-14 left-0 sm:left-4 z-0 pointer-events-none select-none transition-opacity duration-500 font-editorial text-5xl sm:text-7xl lg:text-8xl italic tracking-tight text-[#2b4b7c] ${
          isHovered ? 'opacity-15' : 'opacity-0 sm:opacity-5'
        }`}
      >
        <span>{project.title}</span>
      </motion.div>

      {/* 2. FOREGROUND: 3D Perspective Card (1200px perspective) */}
      <motion.div
        data-cursor="VIEW"
        style={{
          perspective: 1200,
          transformStyle: 'preserve-3d',
        }}
        className="relative z-10 w-full"
      >
        <motion.div
          style={{
            rotateX: shouldReduceMotion ? 0 : rotateX,
            rotateY: shouldReduceMotion ? 0 : rotateY,
            transformStyle: 'preserve-3d',
          }}
          className={`flex flex-col bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
            isHovered
              ? 'border-[#c8c3b5] shadow-xl'
              : 'border-[#ece8df] shadow-sm'
          }`}
        >
          {/* Dynamic Light Sheen on Hover */}
          {!shouldReduceMotion && isHovered && (
            <motion.div
              style={{
                background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.35) 0%, transparent 65%)`,
              }}
              className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
            />
          )}

          {/* Browser / Device Chrome Header */}
          <div className="bg-[#f7f5f0] border-b border-[#ece8df] px-4 py-2.5 flex items-center justify-between text-xs select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e87063]/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#f4be4f]/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#62c554]/80 inline-block" />
            </div>

            {/* URL pill */}
            <div className="font-mono text-[10px] text-zinc-400 bg-white/80 px-3 py-0.5 rounded-full border border-[#ece8df] max-w-[200px] truncate">
              {project.liveUrl ? project.liveUrl.replace(/^https?:\/\//, '') : `${project.id}.app`}
            </div>

            <div className="font-mono text-[10px] text-zinc-500 font-semibold">
              {formattedIndex}
            </div>
          </div>

          {/* Project Screenshot / Visual Container with Subtle Living Motion */}
          <div
            onClick={() => onSelectCaseStudy(project)}
            className={`cursor-pointer overflow-hidden bg-zinc-950 relative flex items-center justify-center border-b border-[#ece8df] ${
              isFeatured ? 'aspect-[21/9] sm:aspect-[2/1]' : 'aspect-[16/10]'
            }`}
          >
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      scale: isHovered ? 1.03 : 1,
                      y: isHovered ? -2 : 0,
                    }
              }
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full"
            >
              <ProjectMockupVisual type={project.visualType} />
            </motion.div>

            {/* Live Indicator Badge on Visual */}
            <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE READY</span>
            </div>
          </div>

          {/* Project Content & Typography */}
          <div className="p-6 sm:p-7 flex flex-col flex-grow justify-between space-y-4 text-left">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 uppercase tracking-wider">
                <span>{project.category}</span>
                <span className="text-zinc-500 font-sans lowercase">{project.filterCategory}</span>
              </div>

              <h3
                onClick={() => onSelectCaseStudy(project)}
                className="text-2xl sm:text-3xl font-editorial font-normal text-zinc-900 group-hover:text-[#2b4b7c] transition-colors cursor-pointer"
              >
                {project.title}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-sans line-clamp-2">
                {project.description}
              </p>
            </div>

            {/* Tech Stack Chips & Direct Links */}
            <div className="pt-4 border-t border-[#f2efe9] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] font-mono text-zinc-500 bg-[#faf9f6] px-2 py-0.5 rounded border border-[#ece8df]"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-[10px] font-mono text-zinc-400 px-1 py-0.5">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 font-sans text-xs">
                <button
                  onClick={() => onSelectCaseStudy(project)}
                  className="inline-flex items-center gap-1 text-[#2b4b7c] hover:text-[#1d3557] font-semibold transition-colors cursor-pointer"
                >
                  <span>VIEW CASE STUDY</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-500 hover:text-[#2b4b7c] transition-colors inline-flex items-center gap-1 font-mono text-[11px]"
                    title={`Live Demo for ${project.title}`}
                  >
                    <span>DEMO</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                )}

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-500 hover:text-zinc-900 transition-colors inline-flex items-center gap-1 font-mono text-[11px]"
                    title={`GitHub Repository for ${project.title}`}
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
