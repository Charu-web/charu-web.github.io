import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Mail, ArrowUpRight } from 'lucide-react';
import { About3DCanvas } from './About3DCanvas';
import { PERSONAL_INFO } from '../data/portfolioData';

interface AboutProps {
  onContactClick: () => void;
}

export const About: React.FC<AboutProps> = ({ onContactClick }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section 
      id="about" 
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto border-t border-[#ece8df] text-left"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Column: Editorial Philosophy & Biography */}
        <div className="lg:col-span-8 space-y-6">
          <div className="pb-4 border-b border-[#ece8df]">
            <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest block mb-2">
              05 / BACKGROUND &amp; PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-5xl font-editorial font-light text-zinc-900 tracking-tight leading-tight">
              Building interfaces where <br />
              <span className="italic text-[#2b4b7c]">engineering meets experience.</span>
            </h2>
          </div>

          <div className="space-y-4 text-sm sm:text-base text-zinc-600 leading-relaxed font-sans max-w-2xl">
            <p>
              I’m a Full Stack Developer based in Lucknow, India, specializing in building performant, production-ready web applications, AI-integrated digital tools, and scalable distributed systems.
            </p>

            <p>
              My engineering stack spans React, Node.js, Express, MongoDB, SQL, and modern AI/LLM APIs. I connect human-centered UI design with resilient backend pipelines, clean data architectures, and sub-second response times.
            </p>
          </div>

          {/* Minimal Editorial Metadata Badges */}
          <div className="pt-2 flex flex-wrap gap-2 text-xs font-mono">
            <span className="bg-white px-3 py-1 rounded-md border border-[#ece8df] text-zinc-600">
              LOCATION: <strong className="text-zinc-900">{PERSONAL_INFO.location}</strong>
            </span>
            <span className="bg-white px-3 py-1 rounded-md border border-[#ece8df] text-zinc-600">
              FOCUS: <strong className="text-zinc-900">Full Stack &amp; AI Integration</strong>
            </span>
            <span className="bg-white px-3 py-1 rounded-md border border-[#ece8df] text-zinc-600">
              CURRENT ROLE: <strong className="text-zinc-900">Full Stack Developer</strong>
            </span>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-6 text-xs font-sans text-zinc-500">
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <MapPin className="w-3.5 h-3.5 text-zinc-400" />
              <span>{PERSONAL_INFO.location}</span>
            </div>

            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <Mail className="w-3.5 h-3.5 text-zinc-400" />
              <span>{PERSONAL_INFO.email}</span>
            </div>

            <button
              onClick={onContactClick}
              className="inline-flex items-center gap-1 font-semibold text-[#2b4b7c] hover:text-[#1d3557] transition-colors ml-auto cursor-pointer"
            >
              <span>Get in touch</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Floating 3D Geometric Sculpture */}
        <div className="lg:col-span-4 flex items-center justify-center">
          <div className="p-6 bg-white rounded-2xl border border-[#ece8df] shadow-xs flex flex-col items-center justify-center">
            <About3DCanvas />
            <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest mt-2">
              GEOMETRIC DYNAMICS
            </span>
          </div>
        </div>

      </div>
    </motion.section>
  );
};
