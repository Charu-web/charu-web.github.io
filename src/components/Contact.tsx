import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Copy } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactProps {
  onCopyEmail: () => void;
  copiedEmail: boolean;
}

export const Contact: React.FC<ContactProps> = ({ onCopyEmail, copiedEmail }) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Magnetic Button Spring Physics
  const btnX = useMotionValue(0);
  const btnY = useMotionValue(0);

  const springConfig = { damping: 15, stiffness: 180, mass: 0.1 };
  const smoothBtnX = useSpring(btnX, springConfig);
  const smoothBtnY = useSpring(btnY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (shouldReduceMotion || !buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    btnX.set((e.clientX - centerX) * 0.35);
    btnY.set((e.clientY - centerY) * 0.35);
  };

  const handleMouseLeave = () => {
    btnX.set(0);
    btnY.set(0);
  };

  const editorialEase = [0.16, 1, 0.3, 1] as const;

  return (
    <motion.section 
      id="contact" 
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: editorialEase }}
      className="py-24 sm:py-40 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto border-t border-[#ece8df] text-left select-none"
    >
      <div className="space-y-16">
        
        {/* Massive Typographic Headline */}
        <div className="space-y-4">
          <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest block">
            07 / GET IN TOUCH
          </span>

          <h2 className="text-4xl sm:text-7xl lg:text-8xl font-editorial font-light text-zinc-900 tracking-tight leading-[0.98]">
            Let's <br />
            build <br />
            <span className="italic text-[#2b4b7c]">something</span> <br />
            memorable.
          </h2>
        </div>

        {/* Direct Email & Links */}
        <div className="space-y-8 pt-6 border-t border-[#ece8df]">
          <div>
            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest block mb-2">
              DIRECT EMAIL
            </span>
            <button
              onClick={onCopyEmail}
              data-cursor="MAIL"
              className="group font-editorial text-2xl sm:text-4xl lg:text-5xl text-[#2b4b7c] hover:text-[#1d3557] transition-colors flex items-center gap-3 cursor-pointer"
            >
              <span>{PERSONAL_INFO.email}</span>
              {copiedEmail ? (
                <span className="font-mono text-xs text-emerald-600 font-semibold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Copied!
                </span>
              ) : (
                <Copy className="w-5 h-5 text-zinc-400 group-hover:text-[#2b4b7c] transition-colors" />
              )}
            </button>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 font-mono text-xs text-zinc-600">
            <div className="flex items-center gap-6">
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                data-cursor="OPEN ↗"
                className="hover:text-[#2b4b7c] transition-colors flex items-center gap-1"
              >
                <span>LINKEDIN</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                data-cursor="OPEN ↗"
                className="hover:text-[#2b4b7c] transition-colors flex items-center gap-1"
              >
                <span>GITHUB</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            {/* Magnetic CTA Button */}
            <motion.a
              ref={buttonRef}
              href={`mailto:${PERSONAL_INFO.email}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              style={{
                x: shouldReduceMotion ? 0 : smoothBtnX,
                y: shouldReduceMotion ? 0 : smoothBtnY,
              }}
              className="inline-flex items-center gap-2 bg-[#2b4b7c] text-white px-6 py-3 rounded-full text-xs font-mono font-medium tracking-wider hover:bg-[#1d3557] transition-colors shadow-sm cursor-pointer"
            >
              <span>START A CONVERSATION</span>
              <ArrowUpRight className="w-4 h-4" />
            </motion.a>
          </div>
        </div>

      </div>
    </motion.section>
  );
};
