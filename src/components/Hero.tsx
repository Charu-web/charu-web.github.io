import React, { useRef, useState } from 'react';
import { 
  motion, 
  useScroll, 
  useTransform, 
  useMotionValue, 
  useSpring, 
  useReducedMotion 
} from 'framer-motion';
import { Hero3DCanvas } from './Hero3DCanvas';
import { PERSONAL_INFO } from '../data/portfolioData';

interface HeroProps {
  onCopyEmail: () => void;
  copiedEmail: boolean;
}

export const Hero: React.FC<HeroProps> = ({
  onCopyEmail,
  copiedEmail,
}) => {
  const heroRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });
  const [is3DHovered, setIs3DHovered] = useState(false);

  // Parallax tracking values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 90, mass: 0.45 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  // Differential parallax movements for 3-layer sandwich depth
  // Layer 1 (Background type): moves slowest
  const bgTextX = useTransform(smoothMouseX, [-500, 500], [-8, 8]);
  const bgTextY = useTransform(smoothMouseY, [-500, 500], [-6, 6]);

  // Layer 3 (Foreground type): moves slightly faster for hyper-real depth
  const fgTextX = useTransform(smoothMouseX, [-500, 500], [16, -16]);
  const fgTextY = useTransform(smoothMouseY, [-500, 500], [12, -12]);

  // Scroll Interpolation
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroTranslateY = useTransform(scrollYProgress, [0, 0.8], [0, -50]);
  const bgScrollY = useTransform(scrollYProgress, [0, 0.8], [0, -35]);
  const fgScrollY = useTransform(scrollYProgress, [0, 0.8], [0, -70]);

  const combinedBgY = useTransform([bgTextY, bgScrollY], ([yParallax, yScroll]) => Number(yParallax) + Number(yScroll));
  const combinedFgY = useTransform([fgTextY, fgScrollY], ([yParallax, yScroll]) => Number(yParallax) + Number(yScroll));

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (shouldReduceMotion || !heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rawX = e.clientX - centerX;
    const rawY = e.clientY - centerY;

    mouseX.set(rawX);
    mouseY.set(rawY);
    setMouseCoords({ x: rawX, y: rawY });
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setMouseCoords({ x: 0, y: 0 });
    setIs3DHovered(false);
  };

  const editorialEase = [0.16, 1, 0.3, 1] as const;

  return (
    <motion.section
      ref={heroRef}
      id="home"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        opacity: shouldReduceMotion ? 1 : heroOpacity,
        y: shouldReduceMotion ? 0 : heroTranslateY,
      }}
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-between pt-28 sm:pt-32 pb-10 px-5 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-hidden select-none"
    >
      {/* ========================================================
          1. HEADER & IDENTITY BAR (Subtle, clean, recruiter-friendly)
          ======================================================== */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: editorialEase }}
        className="w-full flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-3 border-b border-[#ece7dc]/80 pb-4 relative z-40"
      >
        <div className="space-y-0.5">
          <p className="font-mono text-xs sm:text-sm tracking-widest uppercase text-zinc-900 font-semibold">
            CHARU SONKER
          </p>
          <p className="font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-zinc-500">
            FULL STACK DEVELOPER · AI-INTEGRATED WEB APPLICATIONS
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-[11px] tracking-wider text-zinc-500 uppercase">
          <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
          <span>AVAILABLE FOR SELECT WORK · 2026</span>
        </div>
      </motion.div>

      {/* ========================================================
          2. THE 3-LAYER VISUAL COMPOSITION CANVAS
             Layer 1: Background Oversized Cropped Typography (z-10)
             Layer 2: 3D Interconnected Alabaster Sculpture (z-20)
             Layer 3: Foreground Overlapping Typography (z-30)
          ======================================================== */}
      <div className="relative my-auto py-6 sm:py-10 min-h-[58vh] sm:min-h-[64vh] flex items-center justify-between w-full overflow-hidden">

        {/* ----------------------------------------------------
            LAYER 1 (z-10): BACKGROUND TYPOGRAPHY (Architectural Texture)
            - Oversized serif typography behind 3D object
            - Cropped and extending past container edges
            - Developer-related words: CODE · ENGINEER · BUILD · DEVELOP · DIGITAL
            - Low visual density / muted navy opacity
            ---------------------------------------------------- */}
        <motion.div
          aria-hidden="true"
          style={{
            x: shouldReduceMotion ? 0 : bgTextX,
            y: shouldReduceMotion ? 0 : combinedBgY,
          }}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, delay: 0.15, ease: editorialEase }}
          className="absolute inset-0 pointer-events-none select-none z-10 flex flex-col justify-around leading-[0.88] tracking-[-0.04em] font-editorial text-[#16233b]/[0.14] overflow-hidden"
        >
          {/* Row 1: Cropped Top Left */}
          <div className="flex items-baseline gap-6 sm:gap-12 whitespace-nowrap text-[clamp(4.2rem,12vw,13.5rem)] -ml-8 sm:-ml-16 font-light">
            <span className="tracking-tight">ENGINEER</span>
            <span className="italic font-normal">CODE</span>
            <span className="tracking-tight">BUILD</span>
          </div>

          {/* Row 2: Cropped Across Center Behind 3D Object */}
          <div className="flex items-baseline gap-8 sm:gap-16 whitespace-nowrap text-[clamp(4.8rem,13.5vw,15rem)] -ml-28 sm:-ml-40 font-normal">
            <span className="italic font-light">DEVELOP</span>
            <span className="tracking-tighter">ARCHITECTURE</span>
            <span className="italic">SYSTEMS</span>
          </div>

          {/* Row 3: Cropped Bottom Right */}
          <div className="flex items-baseline gap-6 sm:gap-12 whitespace-nowrap text-[clamp(4.2rem,11.5vw,13rem)] ml-8 sm:ml-24 font-light">
            <span className="tracking-tight">DIGITAL</span>
            <span className="italic font-normal">CREATE</span>
            <span className="tracking-tighter">SCALE</span>
          </div>
        </motion.div>

        {/* ----------------------------------------------------
            LAYER 2 (z-20): 3D SCULPTURAL OBJECT
            - Smooth white interconnected tubular architecture
            - Studio lighting, subtle reflections, ambient occlusion
            - Seamlessly framed without clipping
            - Interactive 3-5° parallax tilt
            ---------------------------------------------------- */}
        <div className="absolute inset-0 z-20 pointer-events-none w-full h-full flex items-center justify-center">
          <Hero3DCanvas
            mouseX={mouseCoords.x}
            mouseY={mouseCoords.y}
            isHovered={is3DHovered}
          />
        </div>

        {/* ----------------------------------------------------
            LAYER 2.5: PRIMARY EDITORIAL HEADLINE
            - Positioned on the left side
            - Anchors the composition with intentional whitespace
            ---------------------------------------------------- */}
        <div className="relative z-25 max-w-2xl text-left pointer-events-auto">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease: editorialEase }}
            className="space-y-1 sm:space-y-2"
          >
            <h1 className="font-editorial text-[clamp(2.5rem,6.8vw,6.4rem)] font-normal leading-[0.94] tracking-[-0.035em] text-[#16233b]">
              <span>Crafting thoughtful</span>
              <span className="block italic text-[#223d68] font-normal">
                digital systems
              </span>
            </h1>
          </motion.div>
        </div>

        {/* ----------------------------------------------------
            LAYER 3 (z-30): FOREGROUND TYPOGRAPHY (The Sandwich Depth)
            - Weaves partially in front of the 3D sculpture!
            - High-contrast deep navy serif
            - Fades & slides in slightly after 3D object
            - Differential parallax movement
            - Words: "CREATE" ribbon + "& products."
            ---------------------------------------------------- */}
        {/* Foreground Word: "& products." overlapping the lower body of 3D object */}
        <motion.div
          style={{
            x: shouldReduceMotion ? 0 : fgTextX,
            y: shouldReduceMotion ? 0 : combinedFgY,
          }}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: editorialEase }}
          className="absolute left-0 bottom-4 sm:bottom-8 lg:bottom-12 z-30 pointer-events-none select-none"
        >
          <div className="font-editorial text-[clamp(2.4rem,6.2vw,5.8rem)] font-normal leading-[0.92] tracking-[-0.035em] text-[#16233b] drop-shadow-xs">
            <span>&amp;&nbsp;</span>
            <span className="italic text-[#1d3557]">products.</span>
          </div>
        </motion.div>

        {/* Foreground Editorial Word: "CREATE" weaving across the 3D sculpture's right edge */}
        <motion.div
          style={{
            x: shouldReduceMotion ? 0 : fgTextX,
            y: shouldReduceMotion ? 0 : combinedFgY,
          }}
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1.0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: editorialEase }}
          className="absolute right-[4%] sm:right-[8%] lg:right-[12%] bottom-[10%] sm:bottom-[14%] z-30 pointer-events-none select-none"
        >
          <span className="font-editorial text-[clamp(2.8rem,7vw,6.2rem)] italic font-light text-[#16233b] tracking-tight drop-shadow-sm opacity-95">
            CREATE
          </span>
        </motion.div>

      </div>

      {/* ========================================================
          3. FOOTER METADATA & MICROCOPY BAR
             - Required microcopy: "Building thoughtful digital experiences with code, systems and AI."
             - Location, email copy action, scroll prompt
          ======================================================== */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.85, ease: editorialEase }}
        className="w-full pt-4 border-t border-[#ece7dc]/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] text-zinc-500 uppercase tracking-widest relative z-40"
      >
        {/* Required Microcopy */}
        <div className="max-w-md normal-case font-sans text-xs sm:text-[13px] text-zinc-600 leading-relaxed tracking-normal">
          <p>
            &ldquo;Building thoughtful digital experiences with code, systems and AI.&rdquo;
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5 sm:gap-7">
          <div>
            <span>LOCATION:&nbsp;</span>
            <span className="text-zinc-800 font-semibold">{PERSONAL_INFO.location}</span>
          </div>

          <button
            onClick={onCopyEmail}
            data-cursor="MAIL"
            className="text-zinc-700 hover:text-[#2b4b7c] transition-colors cursor-pointer lowercase tracking-normal font-sans text-xs flex items-center gap-1.5 focus:outline-hidden"
          >
            <span>{PERSONAL_INFO.email}</span>
            {copiedEmail && (
              <span className="font-mono text-[10px] text-emerald-600 uppercase tracking-wider font-semibold">
                (Copied)
              </span>
            )}
          </button>

          <span className="hidden md:inline-block text-zinc-400 font-mono text-[10px] tracking-wider">
            [ SCROLL ↓ ]
          </span>
        </div>
      </motion.div>

    </motion.section>
  );
};
