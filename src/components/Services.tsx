import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Code2, Cpu, Activity } from 'lucide-react';

interface ServiceItem {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  description: string;
  count: string;
  tags: string[];
}

const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'fullstack',
    icon: <Code2 className="w-5 h-5 text-amber-400" />,
    title: 'Full Stack Web Applications',
    subtitle: 'Production MERN, Next.js & REST APIs',
    description: 'Scalable web applications with modular frontend architectures, secure backend services, JWT authorization, and optimized MongoDB/SQL databases.',
    count: '10+ Projects',
    tags: ['React.js', 'Node.js', 'Express', 'MongoDB', 'REST APIs'],
  },
  {
    id: 'ai-integration',
    icon: <Cpu className="w-5 h-5 text-blue-400" />,
    title: 'AI Systems & LLM Integration',
    subtitle: 'Gemini, OpenAI & Intelligent Pipelines',
    description: 'AI-assisted web tooling, automated sketch classification, canvas color quantization, prompt engineering, and real-time model integration.',
    count: '5+ Projects',
    tags: ['OpenAI API', 'Gemini API', 'Prompt Design', 'Canvas AI'],
  },
  {
    id: 'realtime-interactive',
    icon: <Activity className="w-5 h-5 text-purple-400" />,
    title: 'Interactive & Real-Time Engineering',
    subtitle: 'WebSockets, 60FPS Canvas & Modern UI',
    description: 'Sub-50ms synchronized multiplayer drawing lobbies, physics-based 2D arcade loops, responsive Tailwind layouts, and interactive experiences.',
    count: '6+ Projects',
    tags: ['Socket.io', 'HTML5 Canvas', 'Tailwind CSS', 'Framer Motion'],
  },
];

export const Services: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const editorialEase = [0.16, 1, 0.3, 1] as const;

  return (
    <section id="services" className="py-24 sm:py-32 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto relative z-10">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        
        {/* Left Column: Heading & Explanatory Paragraph (Matching Figma) */}
        <motion.div 
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: editorialEase }}
          className="lg:col-span-5 space-y-4 text-left"
        >
          <span className="font-mono text-xs font-semibold tracking-widest uppercase text-amber-400">
            CAPABILITIES
          </span>
          <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
            My Awesome <br />
            Services
          </h2>
          <div className="w-12 h-1 bg-amber-400 rounded-full my-2" />
          <p className="font-sans text-sm sm:text-base text-zinc-300 leading-relaxed max-w-md pt-2">
            From technical architecture and database schemas to client-side state and responsive production deployments. Focused on clean code, speed, and real-world impact.
          </p>

          <div className="pt-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors group cursor-pointer"
            >
              <span>Explore portfolio works</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </motion.div>

        {/* Right Column: Stack of 3 Horizontal Cards (Matching Figma) */}
        <div className="lg:col-span-7 space-y-4">
          {SERVICES_DATA.map((service, index) => (
            <motion.div
              key={service.id}
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: editorialEase }}
              className="group relative bg-[#131627]/90 hover:bg-[#181d33] border border-white/[0.08] hover:border-amber-400/40 rounded-2xl p-6 sm:p-7 transition-all duration-300 shadow-lg shadow-black/20 flex flex-col sm:flex-row sm:items-center justify-between gap-5 text-left"
            >
              <div className="flex items-start sm:items-center gap-4">
                {/* Thumbnail Icon Box */}
                <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/10 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {service.icon}
                </div>

                {/* Details */}
                <div className="space-y-1">
                  <h3 className="font-sans text-lg sm:text-xl font-bold text-white group-hover:text-amber-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-zinc-400">
                    {service.subtitle}
                  </p>
                  <p className="font-sans text-xs text-zinc-400 leading-relaxed pt-1 sm:hidden">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Count & Golden Arrow */}
              <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/[0.06]">
                <span className="font-mono text-xs text-zinc-400 font-medium">
                  {service.count}
                </span>
                <div className="w-9 h-9 rounded-full bg-white/[0.04] group-hover:bg-amber-400/20 border border-white/10 group-hover:border-amber-400/40 flex items-center justify-center text-zinc-400 group-hover:text-amber-400 transition-all">
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
