import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Statement } from './components/Statement';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
import { Lab } from './components/Lab';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CaseStudyModal } from './components/CaseStudyModal';
import { Toast } from './components/Toast';
import type { FeaturedProject } from './types';
import { PERSONAL_INFO, ALL_PROJECTS } from './data/portfolioData';

export function App() {
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<FeaturedProject | null>(null);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastVisible, setToastVisible] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Top Minimal Scroll Progress Bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Initialize Lenis smooth scrolling (respects prefers-reduced-motion)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 3500);
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopiedEmail(true);
    showToast(`Copied ${PERSONAL_INFO.email} to clipboard!`);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const scrollToContact = () => {
    const el = document.getElementById('contact');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] text-[#222222] flex flex-col selection:bg-[#2b4b7c] selection:text-white relative">
      
      {/* 2px Minimal Top Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-[#2b4b7c] origin-left z-50 pointer-events-none"
      />

      {/* Global Minimal 3D Interactive Cursor */}
      <CustomCursor />

      {/* Minimal Design-System Navbar */}
      <Navbar />

      {/* Editorial Visual Journey: Hero -> Statement -> Projects -> Experience -> Skills -> Lab -> About -> Contact */}
      <main className="flex-grow">
        {/* 1. Hero with Asymmetric 3D Sculpture & Interlaced Typography */}
        <Hero
          onCopyEmail={handleCopyEmail}
          copiedEmail={copiedEmail}
        />

        {/* 2. Introduction Statement & Structured Metadata */}
        <Statement />

        {/* 3. Vertical Editorial Projects Gallery */}
        <Projects onSelectCaseStudy={(project) => setSelectedCaseStudy(project)} />

        {/* 4. Horizontal Expandable Experience List */}
        <Experience />

        {/* 5. Pure Technical Index */}
        <Skills />

        {/* 6. Horizontal Experimental Strip */}
        <Lab />

        {/* 7. Minimal Philosophy & Geometric Sculpture */}
        <About onContactClick={scrollToContact} />

        {/* 8. Massive Typographic Contact Statement */}
        <Contact
          onCopyEmail={handleCopyEmail}
          copiedEmail={copiedEmail}
        />
      </main>

      {/* Minimal Editorial Footer */}
      <Footer onCopyEmail={handleCopyEmail} />

      {/* Full-Screen Case Study Experience */}
      <CaseStudyModal
        project={selectedCaseStudy}
        onClose={() => setSelectedCaseStudy(null)}
        onSelectProject={(project) => setSelectedCaseStudy(project)}
        allProjects={ALL_PROJECTS}
      />

      {/* Toast Notification */}
      <Toast
        message={toastMessage}
        visible={toastVisible}
        onClose={() => setToastVisible(false)}
      />

    </div>
  );
}

export default App;
