import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, CheckCircle2, ArrowUpRight, Shield, Layers, Rocket } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

interface AboutProps {
  onContactClick: () => void;
}

const PRINCIPLES = [
  {
    icon: Layers,
    title: "Architecture Before Code",
    description: "Designing clean database schemas, predictable REST API contracts, and typed state boundaries before writing UI components to prevent cascade state bugs.",
  },
  {
    icon: Shield,
    title: "Production-First Rigor",
    description: "Prioritizing accessible layouts, defensive validation, sub-100ms API response targets, and graceful offline error states across all viewports.",
  },
  {
    icon: Rocket,
    title: "Continuous Learning by Shipping",
    description: "Transitioning from Electrical & Electronics Engineering into digital products by building and deploying live production applications with real users.",
  },
];

export const About: React.FC<AboutProps> = ({ onContactClick }) => {
  const shouldReduceMotion = useReducedMotion();
  const editorialEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section 
      id="about" 
      className="py-24 sm:py-36 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/4 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        
        {/* Left Column: Developer Card / Visual Frame */}
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
              <span>B.Tech 2026</span>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Engineering Standards & Philosophy */}
        <motion.div 
          initial={shouldReduceMotion ? false : { opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: editorialEase }}
          className="lg:col-span-7 space-y-6 text-left"
        >
          <div>
            <span className="font-mono text-xs font-semibold tracking-widest uppercase text-amber-400 block mb-2">
              ENGINEERING PHILOSOPHY
            </span>
            <h2 className="font-sans text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Built on Discipline, <br />
              Delivered for Production.
            </h2>
            <div className="w-12 h-1 bg-amber-400 rounded-full my-3" />
            <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed max-w-xl">
              I believe great software is where disciplined engineering meets intuitive human experience. Coming from an electrical engineering foundation, I treat every web system as a sequence of signal paths, boundary constraints, and verifiable states.
            </p>
          </div>

          {/* 3 Core Principles */}
          <div className="space-y-4 pt-2">
            {PRINCIPLES.map((principle) => {
              const Icon = principle.icon;
              return (
                <div
                  key={principle.title}
                  className="p-4 sm:p-5 rounded-2xl bg-[#131627]/80 border border-white/[0.08] flex items-start gap-4 hover:border-amber-400/30 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-sans text-base font-bold text-white">
                      {principle.title}
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                      {principle.description}
                    </p>
                  </div>
                </div>
              );
            })}
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
