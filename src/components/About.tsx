import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { About3DCanvas } from './About3DCanvas';
import { PERSONAL_INFO } from '../data/portfolioData';

interface AboutProps {
  onContactClick: () => void;
}

export const About: React.FC<AboutProps> = ({ onContactClick }) => {
  const shouldReduceMotion = useReducedMotion();
  const editorialEase = [0.16, 1, 0.3, 1] as const;

  return (
    <motion.section 
      id="about" 
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: editorialEase }}
      className="py-24 sm:py-36 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto border-t border-[#ece8df] text-left select-none"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Massive Editorial Typography & Biography */}
        <div className="lg:col-span-8 space-y-12">
          
          <div className="space-y-4">
            <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest block">
              06 / BACKGROUND
            </span>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-editorial font-light text-zinc-900 tracking-tight leading-[1.02]">
              Engineering <br />
              <span className="italic text-[#2b4b7c]">with</span> <br />
              intention.
            </h2>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-zinc-600 leading-relaxed font-sans max-w-2xl">
            <p>
              I am Charu Sonker, a Full Stack Developer based in Lucknow, India. I specialize in developing performant, production-ready web and mobile applications with clean system architecture and practical AI integrations.
            </p>

            <p>
              My core engineering workflow leverages React.js, Node.js, Express.js, MongoDB, SQL, WebSockets, and modern LLM APIs. I focus on building reliable software platforms that bridge technical precision with intuitive human interaction.
            </p>
          </div>

          {/* Understated Factual Metadata */}
          <div className="pt-4 border-t border-[#ece8df] grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
            <div>
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-1">
                LOCATION
              </span>
              <span className="text-zinc-900 font-medium">
                {PERSONAL_INFO.location}
              </span>
            </div>

            <div>
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-1">
                ROLE
              </span>
              <span className="text-zinc-900 font-medium">
                Full Stack Developer
              </span>
            </div>

            <div>
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest block mb-1">
                DIRECT CONTACT
              </span>
              <button
                onClick={onContactClick}
                className="text-[#2b4b7c] hover:text-[#1d3557] font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Initiate chat</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Original Geometric Dynamics Visualization */}
        <div className="lg:col-span-4 flex items-center justify-center pt-8 lg:pt-16">
          <div className="w-full max-w-xs sm:max-w-sm rounded-2xl bg-white border border-[#ece8df] p-6 shadow-xs flex flex-col justify-between overflow-hidden group">
            {/* Visual 3D Container with comfortable breathing room */}
            <div className="w-full h-52 sm:h-56 relative flex items-center justify-center">
              <About3DCanvas />
            </div>

            {/* Editorial Metadata Label Block */}
            <div className="pt-4 border-t border-[#f2efe9] flex items-center justify-between text-left">
              <div>
                <span className="font-mono text-[9px] text-zinc-400 uppercase tracking-widest block mb-0.5">
                  STUDIO ARTIFACT
                </span>
                <span className="font-mono text-xs text-zinc-800 font-medium tracking-wider">
                  DEVELOPMENT SYSTEM
                </span>
              </div>
              <span className="font-mono text-[10px] text-zinc-400 uppercase tracking-widest">
                FIG. 01
              </span>
            </div>
          </div>
        </div>

      </div>
    </motion.section>
  );
};
