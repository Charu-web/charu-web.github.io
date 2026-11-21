import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Mail, Copy, Check, Send, ExternalLink, AlertCircle, Info } from 'lucide-react';
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
  const [formErrors, setFormErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [submissionInitiated, setSubmissionInitiated] = useState(false);
  const [copiedMessage, setCopiedMessage] = useState(false);

  const validateForm = () => {
    const errors: { name?: string; email?: string; message?: string } = {};
    if (!formState.name.trim()) {
      errors.name = 'Please provide your name.';
    } else if (formState.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formState.email.trim()) {
      errors.email = 'Please provide your email address.';
    } else if (!emailRegex.test(formState.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!formState.message.trim()) {
      errors.message = 'Please provide details about your project or inquiry.';
    } else if (formState.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters.';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const getMailtoUrl = () => {
    const subject = encodeURIComponent(`Project Inquiry from ${formState.name.trim()}`);
    const body = encodeURIComponent(
      `Hi Charu,\n\nName: ${formState.name.trim()}\nEmail: ${formState.email.trim()}\n\nMessage:\n${formState.message.trim()}\n\n---\nSent via portfolio contact form`
    );
    return `mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`;
  };

  const getGmailWebUrl = () => {
    const subject = encodeURIComponent(`Project Inquiry from ${formState.name.trim()}`);
    const body = encodeURIComponent(
      `Hi Charu,\n\nName: ${formState.name.trim()}\nEmail: ${formState.email.trim()}\n\nMessage:\n${formState.message.trim()}\n\n---\nSent via portfolio contact form`
    );
    return `https://mail.google.com/mail/?view=cm&fs=1&to=${PERSONAL_INFO.email}&su=${subject}&body=${body}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const mailtoUrl = getMailtoUrl();
    window.location.href = mailtoUrl;
    setSubmissionInitiated(true);
  };

  const handleCopyMessage = () => {
    const fullText = `Name: ${formState.name.trim()}\nEmail: ${formState.email.trim()}\n\nMessage:\n${formState.message.trim()}`;
    navigator.clipboard.writeText(fullText);
    setCopiedMessage(true);
    setTimeout(() => setCopiedMessage(false), 2500);
  };

  return (
    <section 
      id="contact" 
      className="py-24 sm:py-36 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10 text-left"
    >
      {/* Background ambient glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Banner Container */}
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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 relative z-10 items-start">
          
          {/* Left Column: Heading & Contact Info */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs font-semibold tracking-widest uppercase text-amber-400 block">
              START A COLLABORATION
            </span>

            <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
              Want to make awesome and impactful Product?
            </h2>

            <div className="w-14 h-1 bg-amber-400 rounded-full my-2" />

            <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed max-w-lg">
              Let's discuss your roadmap, product vision, or engineering needs. Currently open to full-time software engineering roles and high-impact digital projects.
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
              <span className="uppercase tracking-widest text-[10px] text-zinc-500">CONNECT</span>
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
            <h3 className="font-sans text-lg font-bold text-white mb-2 flex items-center gap-2">
              <Send className="w-4 h-4 text-amber-400" />
              <span>Send a Message</span>
            </h3>
            <p className="text-xs text-zinc-400 font-sans mb-4">
              Prefills your message directly in your mail application for transparent, direct delivery.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Alex Rivers"
                  value={formState.name}
                  onChange={(e) => {
                    setFormState({ ...formState, name: e.target.value });
                    if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                    formErrors.name ? 'border-red-500 focus:border-red-400' : 'border-white/[0.08] focus:border-amber-400'
                  }`}
                />
                {formErrors.name && (
                  <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{formErrors.name}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Your Email *</label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formState.email}
                  onChange={(e) => {
                    setFormState({ ...formState, email: e.target.value });
                    if (formErrors.email) setFormErrors({ ...formErrors, email: undefined });
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                    formErrors.email ? 'border-red-500 focus:border-red-400' : 'border-white/[0.08] focus:border-amber-400'
                  }`}
                />
                {formErrors.email && (
                  <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{formErrors.email}</span>
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-mono text-zinc-400 mb-1">Project Details *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Briefly describe what you would like to build..."
                  value={formState.message}
                  onChange={(e) => {
                    setFormState({ ...formState, message: e.target.value });
                    if (formErrors.message) setFormErrors({ ...formErrors, message: undefined });
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors resize-none ${
                    formErrors.message ? 'border-red-500 focus:border-red-400' : 'border-white/[0.08] focus:border-amber-400'
                  }`}
                />
                {formErrors.message && (
                  <p className="text-[11px] text-red-400 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{formErrors.message}</span>
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-400/20"
              >
                <span>Launch Email Client</span>
                <Send className="w-3.5 h-3.5 text-zinc-950" />
              </button>
            </form>

            {/* Informative Status Banner (Honest & Helpful) */}
            {submissionInitiated && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 space-y-2 text-left"
              >
                <div className="flex items-start gap-2 text-xs text-blue-300 font-sans leading-relaxed">
                  <Info className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                  <span>
                    Your email app has been opened with pre-filled details. Please review and click <strong>Send</strong> in your mail application to complete delivery.
                  </span>
                </div>

                <div className="pt-2 border-t border-blue-500/20 flex flex-wrap gap-2 text-[11px] font-mono">
                  <a
                    href={getGmailWebUrl()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 transition-colors"
                  >
                    <span>Open in Gmail Web</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={handleCopyMessage}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-white/[0.06] hover:bg-white/[0.12] text-zinc-300 transition-colors cursor-pointer"
                  >
                    <span>{copiedMessage ? 'Copied!' : 'Copy Text'}</span>
                    {copiedMessage ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              </motion.div>
            )}
          </div>

        </div>
      </motion.div>
    </section>
  );
};
