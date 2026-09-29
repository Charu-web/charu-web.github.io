import { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { BrandRibbon } from './components/BrandRibbon';
import { Services } from './components/Services';
import { Projects } from './components/Projects';
import { About } from './components/About';
import { Experience } from './components/Experience';
import { Skills } from './components/Skills';
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

  // Top Minimal Scroll Progress Bar with Golden Accent
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
    <div className="min-h-screen bg-[#0c0d19] text-[#f1f5f9] flex flex-col selection:bg-amber-400 selection:text-zinc-950 relative overflow-x-hidden font-sans">
      
      {/* Golden Accent Scroll Progress Bar */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-amber-400 origin-left z-50 pointer-events-none"
      />

      {/* Global Minimal Interactive Cursor */}
      <CustomCursor />

      {/* Figma Midnight Navbar with CHARU✦ */}
      <Navbar />

      {/* Main Content Journey Matching Figma Desktop - 7 Structure */}
      <main className="flex-grow">
        {/* 1. Hero with 3-Column Layout: Intro & Bio, Central Developer Card, Vertical Stats */}
        <Hero
          onCopyEmail={handleCopyEmail}
          copiedEmail={copiedEmail}
        />

        {/* 2. Platform & Technology Ribbon (Figma's Behance/Dribbble/Upwork/Fiverr strip) */}
        <BrandRibbon />

        {/* 3. My Awesome Services (Left Heading + 3 Horizontal Cards on Right) */}
        <Services />

        {/* 4. Our Portfolio (3-Column Project Mockup Cards + Filter Controls) */}
        <Projects onSelectCaseStudy={(project) => setSelectedCaseStudy(project)} />

        {/* 5. Endorsement & Identity (Figma Testimonial Quote + Portrait Card) */}
        <About onContactClick={scrollToContact} />

        {/* 6. Professional Experience Timeline */}
        <Experience />

        {/* 7. Tools & Technical Index */}
        <Skills />

        {/* 8. Contact Banner: Want to make awesome and impactful Product? */}
        <Contact
          onCopyEmail={handleCopyEmail}
          copiedEmail={copiedEmail}
        />
      </main>

      {/* Dark Footer */}
      <Footer onCopyEmail={handleCopyEmail} />

      {/* Case Study Full Reader Modal */}
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
