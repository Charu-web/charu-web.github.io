import React, { useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote, MapPin, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface AboutProps {
  onContactClick: () => void;
}

const TESTIMONIALS = [
  {
    id: 't1',
    quote: "Charu is a dedicated full-stack developer who consistently delivers high-performance solutions beyond expectations. Strong problem-solving mindset and exceptional execution on complex web architectures.",
    author: "Technical Peer Review",
    role: "Full Stack Engineering & Architecture",
  },
  {
    id: 't2',
    quote: "Demonstrated great ownership across backend APIs, real-time WebSockets, and AI integrations. Clean code, prompt communication, and a strong focus on production-ready delivery.",
    author: "Collaboration Endorsement",
    role: "Product & Client Delivery",
  },
];

export const About: React.FC<AboutProps> = ({ onContactClick }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const editorialEase = [0.16, 1, 0.3, 1] as const;

  const currentTestimonial = TESTIMONIALS[currentIdx];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section 
      id="about" 
      className="py-24 sm:py-36 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        
        {/* Left Column: Developer Card / Visual Frame (Matching Figma) */}
        <motion.div 
          initial={shouldReduceMotion ? false : { opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: editorialEase }}
          className="lg:col-span-5 flex justify-center lg:justify-start"
        >
          <div className="w-full max-w-[380px] sm:max-w-[400px] aspect-[4/5] rounded-3xl bg-gradient-to-b from-[#181d33] to-[#0f1122] border border-white/10 p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden group">
            {/* Ambient inner glow */}
            <div className="absolute -top-10 -right-10 w-44 h-44 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-44 h-44 bg-blue-500/15 rounded-full blur-2xl pointer-events-none" />

            {/* Top Badge */}
            <div className="flex items-center justify-between z-10">
              <span className="font-mono text-xs text-amber-400 font-semibold tracking-wider uppercase">
                ENGINEER IDENTITY
              </span>
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-[10px] font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>Available</span>
              </div>
            </div>

            {/* Center Profile Presentation */}
            <div className="my-auto py-6 space-y-4 z-10 text-left">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-400/30 to-blue-500/30 border border-white/20 flex items-center justify-center text-3xl font-extrabold text-white shadow-lg">
                CS
              </div>
              <div className="space-y-1">
                <h3 className="font-sans text-2xl font-bold text-white">Charu Sonker</h3>
                <p className="font-sans text-sm text-zinc-300">Full Stack &amp; AI Web Developer</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between z-10 text-xs text-zinc-400 font-mono">
              <div className="flex items-center gap-1.5 text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Production Verified</span>
              </div>
              <span>v2.6</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Large Golden Quote & Statement (Matching Figma) */}
        <motion.div 
          initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: editorialEase }}
          className="lg:col-span-7 space-y-8 text-left"
        >
          {/* Large Quote Mark */}
          <div className="text-amber-400 opacity-90">
            <Quote className="w-12 h-12 rotate-180" />
          </div>

          {/* Testimonial Quote text */}
          <div className="min-h-[140px] flex items-center">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={currentTestimonial.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: editorialEase }}
                className="font-sans text-xl sm:text-2xl lg:text-3xl text-white font-medium leading-relaxed tracking-tight"
              >
                "{currentTestimonial.quote}"
              </motion.blockquote>
            </AnimatePresence>
          </div>

          {/* Author info & Navigation arrows */}
          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-4">
            <div className="space-y-0.5">
              <div className="font-sans text-base sm:text-lg font-bold text-white">
                {currentTestimonial.author}
              </div>
              <div className="font-sans text-xs sm:text-sm text-zinc-400">
                {currentTestimonial.role}
              </div>
            </div>

            {/* Pagination Arrows */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full border border-white/10 hover:border-amber-400 bg-white/[0.04] hover:bg-amber-400/10 text-zinc-300 hover:text-amber-400 transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Previous endorsement"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full border border-white/10 hover:border-amber-400 bg-white/[0.04] hover:bg-amber-400/10 text-zinc-300 hover:text-amber-400 transition-colors flex items-center justify-center cursor-pointer"
                aria-label="Next endorsement"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={onContactClick}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              <span>Get in touch directly</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

        </motion.div>

      </div>
    </section>
  );
};
