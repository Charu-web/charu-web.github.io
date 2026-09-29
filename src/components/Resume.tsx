import React from 'react';
import { FileText } from 'lucide-react';

export const Resume: React.FC = () => {
  return (
    <section id="resume" className="py-20 md:py-28 px-6 sm:px-8 lg:px-12 max-w-6xl mx-auto border-t border-[#ece8df] text-left">
      <div className="pb-10 border-b border-[#ece8df] flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <div>
          <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-widest block mb-2">
            07 / CREDENTIALS &amp; EDUCATION
          </span>
          <h2 className="text-3xl sm:text-4xl font-editorial font-light text-zinc-900 tracking-tight">
            Resume
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 font-sans mt-1">
            Overview of professional qualifications and full-stack technical background.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href="./Charu_Sonker_Full_Stack_Developer_Resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#2b4b7c] text-white text-xs font-mono tracking-wider uppercase font-semibold hover:bg-[#1e385f] transition-colors shadow-xs"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>VIEW RESUME ↗</span>
          </a>

          <a
            href="./Charu_Sonker_Full_Stack_Developer_Resume.pdf"
            download="Charu_Sonker_Full_Stack_Developer_Resume.pdf"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-[#ece8df] text-zinc-700 text-xs font-mono tracking-wider uppercase font-semibold hover:bg-zinc-50 hover:border-zinc-300 transition-colors shadow-xs"
          >
            <span>DOWNLOAD PDF ↓</span>
          </a>
        </div>
      </div>

      <div className="pt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-xs sm:text-sm">
        <div className="space-y-2">
          <div className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
            CORE ROLE
          </div>
          <p className="font-editorial text-lg text-zinc-900">
            Full Stack Developer (MERN)
          </p>
          <p className="text-zinc-600 leading-relaxed">
            AI-Integrated Web Applications, Web &amp; Mobile App Development.
          </p>
        </div>

        <div className="space-y-2">
          <div className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
            EXPERIENCE
          </div>
          <p className="font-editorial text-lg text-zinc-900">
            Volna Tech, Empire IT &amp; Hi-Tech
          </p>
          <p className="text-zinc-600 leading-relaxed">
            Production web platforms, real-time architectures, CRM tools, and scalable REST APIs.
          </p>
        </div>

        <div className="space-y-2">
          <div className="font-mono text-[11px] text-zinc-400 uppercase tracking-wider">
            STATUS &amp; LOCATION
          </div>
          <p className="font-editorial text-lg text-zinc-900">
            Lucknow, India · Open to Roles
          </p>
          <p className="text-zinc-600 leading-relaxed">
            Available for full-time software engineering roles and selected contract opportunities.
          </p>
        </div>
      </div>
    </section>
  );
};
