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
}

export const ProjectCard3D: React.FC<ProjectCard3DProps> = ({
  project,
  index,
  onSelectCaseStudy,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Normalized mouse coordinates: -0.5 to +0.5
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 220, mass: 0.3 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // 3D Perspective rotation
  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-7, 7]);

  // Background huge title parallax drift behind the visual
  const bgTitleX = useTransform(smoothMouseX, [-0.5, 0.5], [-28, 28]);
  const bgTitleY = useTransform(smoothMouseY, [-0.5, 0.5], [-18, 18]);

  // Specular light sheen coordinates
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
    <article
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative w-full py-12 sm:py-20 border-b border-[#ece8df] last:border-b-0 text-left select-none group"
    >
      {/* 1. Behind the Visual: Huge Typography Drift */}
      <motion.div
        style={{
          x: shouldReduceMotion ? 0 : bgTitleX,
          y: shouldReduceMotion ? 0 : bgTitleY,
        }}
        className={`absolute top-4 sm:top-10 left-0 right-0 z-0 pointer-events-none select-none transition-opacity duration-500 font-editorial text-5xl sm:text-8xl lg:text-9xl tracking-tight text-[#2b4b7c] leading-none overflow-hidden ${
          isHovered ? 'opacity-15' : 'opacity-5 sm:opacity-8'
        }`}
      >
        <span className="whitespace-nowrap">{project.title}</span>
      </motion.div>

      {/* 2. Project Header: Serial Number & Titles */}
      <div className="relative z-10 space-y-2 mb-8 sm:mb-12">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-xs sm:text-sm font-semibold text-zinc-400 tracking-widest">
            {formattedIndex}
          </span>
          <span className="font-mono text-[11px] text-zinc-500 uppercase tracking-widest">
            {project.category}
          </span>
        </div>

        <h3 
          onClick={() => onSelectCaseStudy(project)}
          data-cursor="VIEW PROJECT"
          className="text-3xl sm:text-5xl lg:text-6xl font-editorial font-light text-zinc-900 group-hover:text-[#2b4b7c] transition-colors cursor-pointer tracking-tight"
        >
          {project.title}
        </h3>
      </div>

      {/* 3. Central Feature: Large 3D Perspective Visual */}
      <div 
        data-cursor="VIEW PROJECT"
        onClick={() => onSelectCaseStudy(project)}
        className="relative z-10 w-full cursor-pointer"
        style={{ perspective: 1200 }}
      >
        <motion.div
          style={{
            rotateX: shouldReduceMotion ? 0 : rotateX,
            rotateY: shouldReduceMotion ? 0 : rotateY,
            transformStyle: 'preserve-3d',
          }}
          className={`relative w-full rounded-2xl bg-white border overflow-hidden transition-all duration-300 ${
            isHovered
              ? 'border-[#c8c3b5] shadow-2xl shadow-zinc-300/40'
              : 'border-[#ece8df] shadow-md shadow-zinc-200/50'
          }`}
        >
          {/* Specular Dynamic Glare Light */}
          {!shouldReduceMotion && isHovered && (
            <motion.div
              style={{
                background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255, 255, 255, 0.4) 0%, transparent 65%)`,
              }}
              className="absolute inset-0 pointer-events-none z-30 transition-opacity duration-300"
            />
          )}

          {/* Browser Chrome Header */}
          <div className="bg-[#f7f5f0] border-b border-[#ece8df] px-4 py-3 flex items-center justify-between text-xs select-none">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e87063]/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#f4be4f]/80 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#62c554]/80 inline-block" />
            </div>

            <div className="font-mono text-[10px] text-zinc-500 bg-white px-3 py-0.5 rounded-full border border-[#ece8df] max-w-[240px] truncate">
              {project.liveUrl ? project.liveUrl.replace(/^https?:\/\//, '') : `${project.id}.app`}
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[10px] text-emerald-600 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="hidden sm:inline">LIVE</span>
            </div>
          </div>

          {/* Interactive Screen Container with Subtle Living Vertical Drift */}
          <div className="relative aspect-[16/10] sm:aspect-[21/9] bg-zinc-950 overflow-hidden flex items-center justify-center">
            <motion.div
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      y: isHovered ? [-3, 3, -3] : [0, 4, 0],
                      scale: isHovered ? 1.025 : 1,
                    }
              }
              transition={{
                y: {
                  duration: 6,
                  repeat: Infinity,
                  ease: 'easeInOut',
                },
                scale: {
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1],
                },
              }}
              className="w-full h-full"
            >
              <ProjectMockupVisual type={project.visualType} />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 4. Bottom Editorial Story & Actions */}
      <div className="relative z-10 pt-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
        <div className="md:col-span-7">
          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed font-sans max-w-2xl">
            {project.description}
          </p>
        </div>

        <div className="md:col-span-5 flex flex-col sm:flex-row md:flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pt-2">
          {/* Technologies */}
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="text-[11px] font-mono text-zinc-500 bg-white px-2.5 py-1 rounded-md border border-[#ece8df]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Direct Outbound Links */}
          <div className="flex items-center gap-4 text-xs font-mono">
            <button
              onClick={() => onSelectCaseStudy(project)}
              data-cursor="VIEW PROJECT"
              className="inline-flex items-center gap-1.5 text-[#2b4b7c] hover:text-[#1d3557] font-semibold transition-colors cursor-pointer group/btn"
            >
              <span>VIEW PROJECT</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </button>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                data-cursor="OPEN ↗"
                className="text-zinc-500 hover:text-[#2b4b7c] transition-colors inline-flex items-center gap-1"
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
                data-cursor="OPEN ↗"
                className="text-zinc-500 hover:text-zinc-900 transition-colors inline-flex items-center gap-1"
                title={`GitHub for ${project.title}`}
              >
                <GithubIcon className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>

    </article>
  );
};
