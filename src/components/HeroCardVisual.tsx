import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { Terminal, Sparkles, Layers, Cpu, Code2 } from 'lucide-react';

interface HeroCardVisualProps {
  className?: string;
}

export const HeroCardVisual: React.FC<HeroCardVisualProps> = ({ className = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Subtle 3D tilt tracking
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 150, mass: 0.2 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (shouldReduceMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - (rect.left + rect.width / 2);
    const y = e.clientY - (rect.top + rect.height / 2);

    // Subtle tilt: max ~6 degrees
    rotateX.set(-y * 0.025);
    rotateY.set(x * 0.025);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

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
      className={`relative w-full max-w-[380px] sm:max-w-[420px] lg:max-w-[440px] aspect-[4/5] rounded-3xl p-6 sm:p-7 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 ${
        isHovered ? 'shadow-blue-500/20' : ''
      } ${className}`}
    >
      {/* Background Frame Gradients matching Figma Card */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#161a2e] via-[#101323] to-[#0c0e1a] rounded-3xl" />
      <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-amber-400/40 transition-colors pointer-events-none" />
      
      {/* Subtle Ambient Radial Glow inside Card */}
      <div className="absolute -top-20 -right-20 w-56 h-56 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Bar of the Card */}
      <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/[0.08]">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
          <span className="ml-2 font-mono text-[11px] text-zinc-400">workspace.tsx</span>
        </div>
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[10px] text-emerald-300 font-semibold tracking-wider uppercase">Active</span>
        </div>
      </div>

      {/* Center Holographic Code & Architecture Display */}
      <div className="relative z-10 my-auto py-4 space-y-4">
        {/* Code snippet block */}
        <div className="bg-[#090b14]/80 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/[0.06] shadow-inner font-mono text-xs sm:text-sm text-zinc-300 space-y-2">
          <div className="flex items-center gap-2 text-zinc-500 text-[11px]">
            <Terminal className="w-3.5 h-3.5 text-amber-400" />
            <span>Developer Terminal</span>
          </div>
          <div className="pt-1 text-xs leading-relaxed">
            <span className="text-purple-400 font-semibold">const</span>{' '}
            <span className="text-blue-300">developer</span> = &#123;
            <div className="pl-4 text-zinc-400">
              name: <span className="text-emerald-300">'Charu Sonker'</span>,<br />
              role: <span className="text-emerald-300">'Full Stack + AI'</span>,<br />
              stack: [<span className="text-amber-300">'React'</span>, <span className="text-amber-300">'Node'</span>, <span className="text-amber-300">'AI APIs'</span>],<br />
              status: <span className="text-blue-400">'Production-Ready'</span>
            </div>
            &#125;;
          </div>
        </div>

        {/* Floating Feature Tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-mono font-medium">
            <Code2 className="w-3 h-3 text-blue-400" />
            React &amp; TypeScript
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono font-medium">
            <Cpu className="w-3 h-3 text-purple-400" />
            AI &amp; LLM Pipelines
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-mono font-medium">
            <Layers className="w-3 h-3 text-amber-400" />
            REST &amp; WebSockets
          </span>
        </div>
      </div>

      {/* Bottom Footer Details of the Card */}
      <div className="relative z-10 pt-4 border-t border-white/[0.08] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="font-sans text-xs font-semibold text-white">Full Stack Engineering</div>
            <div className="font-mono text-[10px] text-zinc-400">Lucknow, India</div>
          </div>
        </div>
        <span className="font-mono text-[10px] text-amber-400/90 font-semibold tracking-wider">
          v2.6
        </span>
      </div>
    </motion.div>
  );
};
