import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { Sparkles, ExternalLink, Globe } from 'lucide-react';

interface HeroCardVisualProps {
  className?: string;
}

interface ProjectPreview {
  id: string;
  tabLabel: string;
  title: string;
  category: string;
  domain: string;
  liveUrl: string;
  image: string;
  stack: string;
}

const FEATURED_PREVIEWS: ProjectPreview[] = [
  {
    id: 'fruits-and-nuts',
    tabLabel: 'E-Commerce',
    title: 'Fruits & Nuts Platform',
    category: 'Commercial E-Commerce',
    domain: 'fruitsandnuts.co.in',
    liveUrl: 'https://fruitsandnuts.co.in',
    image: './images/projects/fruits-and-nuts.jpg',
    stack: 'Next.js 15 · Prisma · PostgreSQL',
  },
  {
    id: 'kritours-palette',
    tabLabel: 'Travel Portal',
    title: 'Kritours Palette',
    category: 'Luxury Travel Platform',
    domain: 'kritours-palette.vercel.app',
    liveUrl: 'https://kritours-palette.vercel.app',
    image: './images/projects/kritours-palette.jpg',
    stack: 'Next.js 14 · TypeScript · Vercel Edge',
  },
  {
    id: 'saimaya-hotel',
    tabLabel: 'Hospitality',
    title: 'Hotel & Restaurant Sai Maya',
    category: 'Hospitality & Dining Platform',
    domain: 'shubhu.site',
    liveUrl: 'https://shubhu.site',
    image: './images/projects/saimaya-hotel.jpg',
    stack: 'HTML5 · Tailwind CSS · JavaScript',
  },
  {
    id: 'nexus360-crm',
    tabLabel: 'CRM Suite',
    title: 'Nexus360 CRM',
    category: 'Enterprise Operations CRM',
    domain: 'nexus360-crm.vercel.app',
    liveUrl: 'https://nexus360-crm.vercel.app',
    image: './images/projects/nexus360-crm.png',
    stack: 'React.js · Node.js · Express · MongoDB',
  },
];

export const HeroCardVisual: React.FC<HeroCardVisualProps> = ({ className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [isHovered, setIsHovered] = useState(false);

  // Subtle 3D tilt tracking
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.2 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  // Auto-cycle through the 4 real projects if not hovered
  useEffect(() => {
    if (isHovered || shouldReduceMotion) return;
    const interval = setInterval(() => {
      setActiveProjectIndex((prev) => (prev + 1) % FEATURED_PREVIEWS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isHovered, shouldReduceMotion]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    // Subtle tilt: max ~5 degrees
    rotateX.set(-y * 0.02);
    rotateY.set(x * 0.02);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  const currentProject = FEATURED_PREVIEWS[activeProjectIndex];

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: shouldReduceMotion ? 0 : smoothRotateX,
        rotateY: shouldReduceMotion ? 0 : smoothRotateY,
        transformPerspective: 1000,
      }}
      className={`relative w-full max-w-[390px] sm:max-w-[430px] lg:max-w-[450px] aspect-[4/5] rounded-3xl p-4 sm:p-6 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 ${
        isHovered ? 'shadow-amber-500/10' : ''
      } ${className}`}
    >
      {/* Background Frame Gradients matching dark navy theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#161a2e] via-[#101323] to-[#0c0e1a] rounded-3xl" />
      <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-amber-400/40 transition-colors pointer-events-none" />
      
      {/* Subtle Ambient Radial Glow inside Card */}
      <div className="absolute -top-20 -right-20 w-56 h-56 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header of the Showcase Card */}
      <div className="relative z-10 flex items-center justify-between pb-2.5 sm:pb-3 border-b border-white/[0.08]">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#ef4444]" />
          <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#f59e0b]" />
          <div className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#10b981]" />
          <span className="ml-1.5 sm:ml-2 font-mono text-[10px] sm:text-[11px] text-zinc-400">commercial-work.preview</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[9px] text-emerald-300 font-semibold tracking-wider uppercase whitespace-nowrap">Live Production</span>
        </div>
      </div>

      {/* Interactive Tabs for the 4 Genuine Projects */}
      <div className="relative z-10 flex items-center gap-1 sm:gap-1.5 pt-2">
        {FEATURED_PREVIEWS.map((project, idx) => (
          <button
            key={project.id}
            onClick={() => setActiveProjectIndex(idx)}
            className={`flex-1 py-1 sm:py-1.5 px-0.5 sm:px-1.5 rounded-md sm:rounded-lg font-sans sm:font-mono text-[9px] sm:text-[10px] font-semibold sm:font-normal tracking-tight sm:tracking-normal text-center transition-all cursor-pointer truncate ${
              activeProjectIndex === idx
                ? 'bg-amber-400 text-zinc-950 font-bold shadow-sm shadow-amber-400/30'
                : 'bg-white/[0.04] text-zinc-400 hover:text-white hover:bg-white/[0.08] border border-white/[0.06]'
            }`}
            title={`Preview ${project.title}`}
          >
            {project.tabLabel}
          </button>
        ))}
      </div>

      {/* Center Real Project Screenshot Viewport */}
      <div className="relative z-10 my-auto py-2">
        <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 relative shadow-inner group/preview bg-[#080911]">
          <img
            src={currentProject.image}
            alt={`${currentProject.title} - Real Project Preview`}
            loading="eager"
            className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover/preview:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none" />

          {/* Top Domain Link Badge */}
          <div className="absolute top-2.5 right-2.5 z-10">
            <a
              href={currentProject.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md border border-white/15 text-[10px] font-mono text-zinc-300 hover:text-amber-400 transition-colors"
              title="Visit Live Website"
            >
              <Globe className="w-2.5 h-2.5" />
              <span>{currentProject.domain}</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>

          {/* Bottom Title & Stack Overlay */}
          <div className="absolute bottom-2.5 left-2.5 right-2.5 z-10 text-left space-y-1">
            <span className="font-mono text-[9px] uppercase tracking-wider text-amber-400 block font-semibold">
              {currentProject.category}
            </span>
            <div className="font-sans text-sm font-bold text-white truncate">
              {currentProject.title}
            </div>
            <div className="font-mono text-[9px] text-zinc-300 truncate">
              {currentProject.stack}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Details of the Card */}
      <div className="relative z-10 pt-3 border-t border-white/[0.08] flex items-center justify-between text-left">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="font-sans text-xs font-semibold text-white">Production Portfolio</div>
            <div className="font-mono text-[10px] text-zinc-400">Verified Deployments</div>
          </div>
        </div>
        <span className="font-mono text-[10px] text-amber-400/90 font-semibold tracking-wider">
          {activeProjectIndex + 1} / {FEATURED_PREVIEWS.length}
        </span>
      </div>
    </motion.div>
  );
};
