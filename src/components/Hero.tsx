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

  // Damped 2D parallax values for subtle DOM text tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 100, mass: 0.4 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const textX = useTransform(smoothMouseX, [-400, 400], [-8, 8]);
  const textY = useTransform(smoothMouseY, [-400, 400], [-6, 6]);

  const sculptureFloatX = useTransform(smoothMouseX, [-400, 400], [10, -10]);
  const sculptureFloatY = useTransform(smoothMouseY, [-400, 400], [8, -8]);

  // Scroll Interpolation
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroTranslateY = useTransform(scrollYProgress, [0, 0.75], [0, -45]);
  const heroScale = useTransform(scrollYProgress, [0, 0.75], [1, 0.96]);

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
        scale: shouldReduceMotion ? 1 : heroScale,
      }}
      className="min-h-[92vh] flex flex-col justify-between pt-32 pb-12 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto text-center relative select-none"
    >
      {/* 1. Eyebrow & Descriptors */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: editorialEase }}
        className="pt-2 space-y-1"
      >
        <p className="font-mono text-xs sm:text-sm tracking-widest uppercase text-zinc-800 font-semibold">
          CHARU SONKER
        </p>
        <p className="font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-zinc-500">
          FULL STACK DEVELOPER · AI-INTEGRATED WEB APPLICATIONS
        </p>
      </motion.div>

      {/* 2. Main 3-Layer Interlaced Headline & 3D Folded Sculpture */}
      <div className="my-auto py-8 sm:py-12 relative flex items-center justify-center w-full max-w-5xl mx-auto">
        
        {/* LAYER 1 (z-10): Background Typography (Primary Layout Driver) */}
        <motion.div 
          style={{ x: shouldReduceMotion ? 0 : textX, y: shouldReduceMotion ? 0 : textY }}
          className="relative z-10 font-editorial text-[clamp(3.5rem,8vw,8.5rem)] font-normal leading-[0.92] tracking-[-0.03em] text-[#2b4b7c] flex flex-col items-center justify-center w-full"
        >
          {/* Line 1: "I design, build" */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: editorialEase }}
            className="flex items-center justify-center"
          >
            <span>I design, build</span>
          </motion.div>

          {/* Line 2: "& ship" */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45, ease: editorialEase }}
            className="my-1 sm:my-1.5 flex items-center justify-center italic text-[#243f68]"
          >
            <span>&amp; ship</span>
          </motion.div>

          {/* Line 3: "digital products." */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: editorialEase }}
            className="flex items-center justify-center text-[#2b4b7c]"
          >
            <span>digital products.</span>
          </motion.div>
        </motion.div>

        {/* LAYER 2 (z-20): Original 3D Sculptural Object (Physically embedded into composition) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <motion.div
            style={{
              x: shouldReduceMotion ? 0 : sculptureFloatX,
              y: shouldReduceMotion ? 0 : sculptureFloatY,
            }}
            onMouseEnter={() => setIs3DHovered(true)}
            onMouseLeave={() => setIs3DHovered(false)}
            className="pointer-events-auto relative -mt-1 sm:-mt-2 flex items-center justify-center"
          >
            <Hero3DCanvas 
              mouseX={mouseCoords.x} 
              mouseY={mouseCoords.y} 
              isHovered={is3DHovered} 
            />
          </motion.div>
        </div>

        {/* LAYER 3 (z-30): Foreground Typography Accent (Creates depth without extra layout displacement) */}
        <div className="absolute inset-0 pointer-events-none z-30 flex items-center justify-center">
          <motion.div 
            style={{ x: shouldReduceMotion ? 0 : textX, y: shouldReduceMotion ? 0 : textY }}
            className="w-full font-editorial text-[clamp(3.5rem,8vw,8.5rem)] font-normal leading-[0.92] tracking-[-0.03em] text-[#2b4b7c] flex flex-col items-center justify-center"
          >
            {/* Spacer for Line 1 */}
            <div className="opacity-0 select-none pointer-events-none">
              I design, build
            </div>

            {/* Line 2 with selective foreground rendering */}
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease: editorialEase }}
              className="my-1 sm:my-1.5 flex items-center justify-center italic select-none"
            >
              <span className="opacity-0">&amp;&nbsp;</span>
              {/* 'ship' weaves across the front plane */}
              <span className="text-[#243f68] drop-shadow-xs">ship</span>
            </motion.div>

            {/* Spacer for Line 3 */}
            <div className="opacity-0 select-none pointer-events-none">
              digital products.
            </div>
          </motion.div>
        </div>

      </div>

      {/* 3. Understated Location & Email Metadata (1.0s Entrance) */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.0, ease: editorialEase }}
        className="pt-6 border-t border-[#ece8df]/80 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-zinc-500 uppercase tracking-widest"
      >
        <div>
          <span>LOCATION: </span>
          <span className="text-zinc-700 font-semibold">{PERSONAL_INFO.location}</span>
        </div>

        <button
          onClick={onCopyEmail}
          data-cursor="MAIL"
          className="text-zinc-600 hover:text-[#2b4b7c] transition-colors cursor-pointer lowercase tracking-normal font-sans text-xs flex items-center gap-1.5"
        >
          <span>{PERSONAL_INFO.email}</span>
          {copiedEmail && (
            <span className="font-mono text-[10px] text-emerald-600 uppercase tracking-wider font-semibold">
              (Copied)
            </span>
          )}
        </button>
      </motion.div>

    </motion.section>
  );
};
