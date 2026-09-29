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

  // Differential parallax movements
  // Layer 1 (Background type): very slow movement
  const bgTextX = useTransform(smoothMouseX, [-500, 500], [-5, 5]);
  const bgTextY = useTransform(smoothMouseY, [-500, 500], [-4, 4]);

  // Layer 3 (Main headline): minimal movement to preserve reading stability
  const headlineX = useTransform(smoothMouseX, [-500, 500], [-3, 3]);
  const headlineY = useTransform(smoothMouseY, [-500, 500], [-2, 2]);

  // Scroll Interpolation
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroTranslateY = useTransform(scrollYProgress, [0, 0.8], [0, -45]);
  const bgScrollY = useTransform(scrollYProgress, [0, 0.8], [0, -25]);

  const combinedBgY = useTransform([bgTextY, bgScrollY], ([yParallax, yScroll]) => Number(yParallax) + Number(yScroll));

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
          1. HEADER & IDENTITY BAR
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
          2. THE REFINED HERO COMPOSITION
             - Layer 1 (z-10): Faded Background Typographic Texture (7-10% opacity)
             - Layer 2 (z-20): 3D Interconnected Alabaster Sculpture (Right 40-45%)
             - Layer 3 (z-30): Primary Readable Editorial Headline (Left 48-52%)
          ======================================================== */}
      <div className="relative my-auto py-6 sm:py-8 lg:py-12 min-h-[56vh] sm:min-h-[62vh] flex flex-col lg:flex-row items-start lg:items-center justify-between w-full overflow-hidden">

        {/* ----------------------------------------------------
            LAYER 1 (z-10): BACKGROUND TYPOGRAPHY
            - Soft gray / muted blue-gray architectural texture
            - Low opacity (0.07 / ~7-8%)
            - Extends beyond viewport, never competes with headline
            ---------------------------------------------------- */}
        <motion.div
          aria-hidden="true"
          style={{
            x: shouldReduceMotion ? 0 : bgTextX,
            y: shouldReduceMotion ? 0 : combinedBgY,
          }}
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.1, ease: editorialEase }}
          className="absolute inset-0 pointer-events-none select-none z-10 flex flex-col justify-around leading-[0.88] tracking-[-0.04em] font-editorial text-[#16233b]/[0.07] overflow-hidden"
        >
          {/* Row 1 */}
          <div className="flex items-baseline gap-8 sm:gap-14 whitespace-nowrap text-[clamp(4.2rem,11.5vw,13rem)] -ml-8 sm:-ml-14 font-light">
            <span className="tracking-tight">ENGINEER</span>
            <span className="italic font-normal">CODE</span>
            <span className="tracking-tight">BUILD</span>
          </div>

          {/* Row 2 */}
          <div className="flex items-baseline gap-10 sm:gap-20 whitespace-nowrap text-[clamp(4.6rem,13vw,14.5rem)] -ml-24 sm:-ml-36 font-normal">
            <span className="italic font-light">DEVELOP</span>
            <span className="tracking-tighter">ARCHITECTURE</span>
            <span className="italic">SYSTEMS</span>
          </div>

          {/* Row 3 */}
          <div className="flex items-baseline gap-8 sm:gap-14 whitespace-nowrap text-[clamp(4.2rem,11.5vw,13rem)] ml-10 sm:ml-20 font-light">
            <span className="tracking-tight">DIGITAL</span>
            <span className="italic font-normal">CREATE</span>
            <span className="tracking-tighter">SCALE</span>
          </div>
        </motion.div>

        {/* ----------------------------------------------------
            LAYER 3 (z-30): PRIMARY READABLE HEADLINE & SUPPORTING LINE
            - Desktop: Left 48–52%, max-width 680px, padding-left 4vw–6vw
            - Mobile: Top of stack, 100% legible, zero text collisions
            ---------------------------------------------------- */}
        <motion.div
          style={{
            x: shouldReduceMotion ? 0 : headlineX,
            y: shouldReduceMotion ? 0 : headlineY,
          }}
          className="relative z-30 max-w-[680px] w-full text-left lg:pl-[4vw] xl:pl-[5vw] pointer-events-auto"
        >
          {/* Headline Reveal Line 1: "CRAFTING" */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: editorialEase }}
            className="font-editorial text-[clamp(1.5rem,3.4vw,2.8rem)] font-light tracking-[0.10em] uppercase text-[#1a2d4b]/85 mb-1 sm:mb-2"
          >
            CRAFTING
          </motion.div>

          {/* Headline Reveal Lines 2 & 3: "thoughtful digital systems." */}
          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.35, ease: editorialEase }}
            className="font-editorial text-[clamp(2.8rem,6.8vw,6.4rem)] font-normal leading-[0.93] tracking-[-0.035em] text-[#16233b]"
          >
            <span>thoughtful</span>
            <span className="block italic text-[#223d68] font-normal">
              digital systems.
            </span>
          </motion.h1>

          {/* Supporting Line (Desktop): "& products." */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: editorialEase }}
            className="hidden lg:block pt-4 sm:pt-6"
          >
            <p className="font-editorial text-[clamp(1.6rem,3.6vw,3.2rem)] italic font-light text-[#1f3659]/90 tracking-tight">
              &amp; products.
            </p>
          </motion.div>
        </motion.div>

        {/* ----------------------------------------------------
            LAYER 2 (z-20): 3D SCULPTURE CONTAINER
            - Scaled to ~70% of previous size (480px-520px on desktop)
            - Positioned toward the RIGHT side on desktop
            - Controlled subtle overlap near the center without obscuring headline
            - Stacked between headline and "& products." on mobile
            ---------------------------------------------------- */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.90 }}
          animate={{ opacity: 1, scale: 1.0 }}
          transition={{ duration: 1.0, delay: 0.3, ease: editorialEase }}
          onMouseEnter={() => setIs3DHovered(true)}
          onMouseLeave={() => setIs3DHovered(false)}
          className="relative my-4 lg:my-0 lg:absolute lg:right-[2vw] xl:right-[4vw] lg:top-1/2 lg:-translate-y-1/2 w-[270px] h-[270px] sm:w-[350px] sm:h-[350px] lg:w-[480px] lg:h-[480px] xl:w-[520px] xl:h-[520px] mx-auto lg:mx-0 flex items-center justify-center z-20 pointer-events-auto cursor-grab active:cursor-grabbing"
        >
          <Hero3DCanvas
            mouseX={mouseCoords.x}
            mouseY={mouseCoords.y}
            isHovered={is3DHovered}
          />
        </motion.div>

        {/* Supporting Line (Mobile / Tablet): Stacked under 3D sculpture */}
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.65, ease: editorialEase }}
          className="block lg:hidden relative z-30 w-full text-left pt-2"
        >
          <p className="font-editorial text-[clamp(1.6rem,4.8vw,2.8rem)] italic font-light text-[#1f3659]/90 tracking-tight">
            &amp; products.
          </p>
        </motion.div>

      </div>

      {/* ========================================================
          3. FOOTER METADATA & MICROCOPY BAR
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
