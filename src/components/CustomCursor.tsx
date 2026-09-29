import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'project' | 'explore' | 'open' | 'mail'>('default');
  const [isTouchDevice] = useState(() => {
    if (typeof window === 'undefined') return true;
    return window.matchMedia('(pointer: coarse)').matches;
  });

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 26, stiffness: 360, mass: 0.18 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]');
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor');
        if (type === 'VIEW') {
          setCursorVariant('project');
          setCursorText('VIEW PROJECT');
        } else if (type === 'EXPLORE') {
          setCursorVariant('explore');
          setCursorText('EXPLORE');
        } else if (type === 'OPEN') {
          setCursorVariant('open');
          setCursorText('OPEN ↗');
        } else if (type === 'MAIL') {
          setCursorVariant('mail');
          setCursorText('COPY');
        } else {
          setCursorVariant('hover');
          setCursorText('');
        }
      } else if (target.closest('a')) {
        setCursorVariant('open');
        setCursorText('OPEN ↗');
      } else if (target.closest('button, input, textarea')) {
        setCursorVariant('hover');
        setCursorText('');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY, isTouchDevice]);

  if (isTouchDevice || shouldReduceMotion) return null;

  const isPill = cursorVariant === 'project' || cursorVariant === 'explore' || cursorVariant === 'open' || cursorVariant === 'mail';

  return (
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-50 flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
      style={{
        x: smoothX,
        y: smoothY,
      }}
    >
      <motion.div
        animate={{
          width: isPill ? (cursorVariant === 'project' ? 96 : 72) : cursorVariant === 'hover' ? 28 : 10,
          height: isPill ? 30 : cursorVariant === 'hover' ? 28 : 10,
          backgroundColor: isPill
            ? '#2b4b7c'
            : cursorVariant === 'hover'
              ? 'rgba(43, 75, 124, 0.15)'
              : 'rgba(43, 75, 124, 0.95)',
          borderColor: cursorVariant === 'hover' ? 'rgba(43, 75, 124, 0.4)' : 'transparent',
          borderWidth: cursorVariant === 'hover' ? 1.5 : 0,
        }}
        transition={{ type: 'spring', damping: 22, stiffness: 320 }}
        className="rounded-full flex items-center justify-center text-white font-mono text-[9px] tracking-wider uppercase shadow-md select-none"
      >
        {cursorText && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="font-bold whitespace-nowrap px-2"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </motion.div>
  );
};
