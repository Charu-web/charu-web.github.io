import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Copy, Check, Send } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './Icons';
import { PERSONAL_INFO } from '../data/portfolioData';

interface ContactProps {
  onCopyEmail: () => void;
  copiedEmail: boolean;
}

export const Contact: React.FC<ContactProps> = ({ onCopyEmail, copiedEmail }) => {
  const shouldReduceMotion = useReducedMotion();
  const editorialEase = [0.16, 1, 0.3, 1] as const;

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [sentSuccess, setSentSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate sending message or open mailto
    const mailtoUrl = `mailto:${PERSONAL_INFO.email}?subject=Project Inquiry from ${encodeURIComponent(formState.name)}&body=${encodeURIComponent(formState.message)}%0A%0AFrom: ${encodeURIComponent(formState.email)}`;
    window.location.href = mailtoUrl;
    setSentSuccess(true);
    setTimeout(() => setSentSuccess(false), 4000);
  };

  return (
    <section 
      id="contact" 
      className="py-24 sm:py-36 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10 text-left"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Banner Container Matching Figma's CTA */}
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: editorialEase }}
        className="rounded-3xl bg-gradient-to-b from-[#161a2e] to-[#0f1122] border border-white/10 p-8 sm:p-12 lg:p-16 shadow-2xl relative overflow-hidden"
      >
        {/* Glow overlay */}
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 relative z-10 items-center">
          
          {/* Left Column: Figma Exact Headline */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs font-semibold tracking-widest uppercase text-amber-400 block">
              START A COLLABORATION
            </span>

            {/* Exact headline from Figma */}
            <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
              Want to make awesome and impactful Product?
            </h2>

            <div className="w-14 h-1 bg-amber-400 rounded-full my-2" />

            <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed max-w-lg">
              Let's discuss your roadmap, product vision, or engineering needs. Currently open to full-time engineering roles and high-impact digital projects.
            </p>

            {/* Email quick copy */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onCopyEmail}
                className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-amber-400 text-zinc-950 font-bold text-xs sm:text-sm tracking-wide uppercase hover:bg-amber-300 transition-all duration-200 shadow-lg shadow-amber-400/20 cursor-pointer"
              >
                <span>{copiedEmail ? 'Email Copied!' : 'Copy Email Address'}</span>
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-zinc-950" />
                ) : (
                  <Copy className="w-4 h-4 text-zinc-950" />
                )}
              </button>

              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white transition-colors py-2 px-3"
              >
                <Mail className="w-4 h-4 text-amber-400" />
                <span>{PERSONAL_INFO.email}</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-6 pt-4 text-xs font-mono text-zinc-400">
              <span className="uppercase tracking-widest text-[10px] text-zinc-500">FOLLOW US</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="hover:text-amber-400 transition-colors flex items-center gap-1.5"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>
            </div>

          </div>

          {/* Right Column: Direct Quick Contact Form */}
          <div className="lg:col-span-5 bg-[#0d0f1f]/80 backdrop-blur-md rounded-2xl p-6 sm:p-7 border border-white/[0.08] shadow-inner">
            <h3 className="font-sans text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Send className="w-4 h-4 text-amber-400" />
              <span>Send a Quick Message</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Alex Rivers"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Your Email</label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Project Details</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Briefly describe what you would like to build..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-amber-400 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-400/20"
              >
                <span>{sentSuccess ? 'Opening Mail Client...' : 'Send Message →'}</span>
              </button>
            </form>
          </div>

        </div>
      </motion.div>
    </section>
  );
};
