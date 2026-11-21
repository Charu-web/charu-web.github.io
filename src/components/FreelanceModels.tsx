import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { 
  Clock, 
  Calendar, 
  Layers, 
  ArrowRight, 
  Globe2, 
  Video, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';

interface FreelanceModelsProps {
  onContactClick: () => void;
}

export const FreelanceModels: React.FC<FreelanceModelsProps> = ({ onContactClick }) => {
  const shouldReduceMotion = useReducedMotion();
  const editorialEase = [0.16, 1, 0.3, 1] as const;

  const engagementModels = [
    {
      id: 'fixed-sprint',
      badge: 'MOST POPULAR FOR MVPs',
      badgeColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
      title: 'Fixed-Scope Sprints',
      timeline: '2 – 4 Weeks',
      bestFor: 'New product launches, MVP builds, feature expansions & UI redesigns',
      description:
        'Ideal when you have a defined product requirement or Figma design and need rapid, production-ready execution delivered on a predictable timeline.',
      deliverables: [
        'End-to-end frontend or full-stack application development',
        'Defined milestones, sprint backlog & delivery schedule',
        'Responsive cross-device testing & performance optimization',
        'Clean TypeScript code, documentation & 14 days post-launch support',
      ],
      icon: Layers,
    },
    {
      id: 'monthly-retainer',
      badge: 'BEST FOR SCALING TEAMS',
      badgeColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
      title: 'Dedicated Monthly Retainer',
      timeline: 'Monthly / Ongoing',
      bestFor: 'Seed & Series-A startups, agencies & products requiring continuous velocity',
      description:
        'Dedicated monthly engineering bandwidth embedded directly with your team. Rapid PR turnarounds, architecture iterations, and continuous feature delivery.',
      deliverables: [
        '20 – 30 hours per week dedicated engineering capacity',
        'Seamless integration into your Slack, Linear/Jira & GitHub workflows',
        'Architecture design, API integrations & continuous refactoring',
        'Priority bug fixes, release cycles & async progress demos',
      ],
      icon: Calendar,
    },
    {
      id: 'hourly-consulting',
      badge: 'FLEXIBLE & TARGETED',
      badgeColor: 'text-sky-400 bg-sky-400/10 border-sky-400/20',
      title: 'Technical Advisory & Consulting',
      timeline: 'On-Demand / Flexible',
      bestFor: 'Codebase audits, performance bottlenecks, architecture reviews & pair debugging',
      description:
        'Targeted technical deep-dives to solve gnarly architectural problems, eliminate bundle bloat, fix rendering bottlenecks, or audit security & state management.',
      deliverables: [
        'Frontend performance & Core Web Vitals optimization',
        'Full-stack architecture audit, schema design & API contract review',
        'Real-time pair-programming & debugging sessions',
        'Actionable written audit report with prioritized recommendations',
      ],
      icon: Clock,
    },
  ];

  const collaborationPrinciples = [
    {
      icon: Globe2,
      title: 'Global Timezone Overlap',
      description:
        'Based in India (IST, UTC+5:30) with guaranteed 3–4 hours daily synchronous overlap for US East (EST), US West (PST mornings), UK/Europe (GMT/CET), and APAC teams.',
    },
    {
      icon: Video,
      title: 'Async-First Clarity',
      description:
        'Loom video walkthroughs for every major PR, structured GitHub review threads, and written daily standup summaries. No unnecessary meetings required.',
    },
    {
      icon: ShieldCheck,
      title: 'Production-Grade Quality',
      description:
        'Strict TypeScript standards, 100% type safety, zero console errors, clean Git commit histories, and exhaustive cross-browser mobile verification.',
    },
  ];

  return (
    <section 
      id="freelance-models" 
      className="py-24 sm:py-36 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10 border-t border-white/[0.08]"
    >
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-16 text-left">
        <motion.div 
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: editorialEase }}
          className="space-y-2 max-w-2xl"
        >
          <span className="font-mono text-xs font-semibold tracking-widest uppercase text-amber-400 block">
            // 05 — INTERNATIONAL CLIENT ENGAGEMENT
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            How We Can Work Together
          </h2>
          <div className="w-12 h-1 bg-amber-400 rounded-full my-2" />
          <p className="font-sans text-sm sm:text-base text-zinc-300 pt-1">
            Flexible, high-velocity engineering models designed for international founders, product teams, and digital agencies. Transparent delivery, clear communication, and production-tested code.
          </p>
        </motion.div>

        <motion.button
          onClick={onContactClick}
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: editorialEase }}
          className="inline-flex items-center gap-2 self-start md:self-end px-5 py-2.5 rounded-full bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider hover:bg-amber-300 transition-colors shadow-lg shadow-amber-400/20 cursor-pointer"
        >
          <span>Start A Project Conversation</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </motion.button>
      </div>

      {/* 3 Engagement Model Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 text-left">
        {engagementModels.map((model, idx) => {
          const IconComponent = model.icon;
          return (
            <motion.div
              key={model.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: editorialEase }}
              className="group relative bg-[#131627]/90 hover:bg-[#181d33] border border-white/[0.08] hover:border-amber-400/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 shadow-xl shadow-black/20"
            >
              <div>
                {/* Header Badge & Icon */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className={`px-2.5 py-1 rounded-full font-mono text-[10px] font-semibold border ${model.badgeColor}`}>
                    {model.badge}
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-4 h-4" />
                  </div>
                </div>

                {/* Model Title */}
                <h3 className="font-sans text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-amber-300 transition-colors">
                  {model.title}
                </h3>

                <div className="font-mono text-xs text-amber-400 font-semibold mb-3">
                  Timeline: {model.timeline}
                </div>

                <p className="font-sans text-xs text-zinc-400 leading-relaxed mb-5">
                  {model.description}
                </p>

                {/* Best For Tag */}
                <div className="bg-black/40 rounded-lg p-2.5 border border-white/[0.06] mb-5">
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">
                    Best Suited For
                  </span>
                  <span className="font-sans text-xs text-zinc-300 font-medium">
                    {model.bestFor}
                  </span>
                </div>

                {/* Deliverables Checklist */}
                <div className="space-y-2.5 pt-2 border-t border-white/[0.06]">
                  <span className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest block">
                    What's Included
                  </span>
                  {model.deliverables.map((item, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <Zap className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-6 mt-6 border-t border-white/[0.06]">
                <button
                  onClick={onContactClick}
                  className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-amber-400 hover:text-zinc-950 border border-white/10 hover:border-amber-400 text-zinc-200 font-mono text-xs uppercase tracking-wider font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Select Model &amp; Inquire</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* International Collaboration Principles Bar */}
      <motion.div 
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: editorialEase }}
        className="bg-[#0e1122]/90 border border-white/[0.08] rounded-2xl p-6 sm:p-8"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left divide-y md:divide-y-0 md:divide-x divide-white/[0.08]">
          {collaborationPrinciples.map((item, pIdx) => {
            const PrincipleIcon = item.icon;
            return (
              <div key={pIdx} className={`${pIdx > 0 ? 'pt-6 md:pt-0 md:pl-8' : ''} space-y-2`}>
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-amber-400">
                    <PrincipleIcon className="w-4 h-4" />
                  </div>
                  <h4 className="font-sans text-base font-bold text-white">
                    {item.title}
                  </h4>
                </div>
                <p className="font-sans text-xs text-zinc-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
};
