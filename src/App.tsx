import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import BootSequence from './components/BootSequence';
import Header from './components/Header';
import Hero3DCanvas from './components/Hero3DCanvas';
import HeroOverlay from './components/HeroOverlay';
import AboutSection from './components/AboutSection';
import ProjectsSection from './components/ProjectsSection';
import TechStackSection from './components/TechStackSection';
import TerminalSection from './components/TerminalSection';
import Footer from './components/Footer';

export default function App() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    // Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const handleToggleTerminal = () => {
    const el = document.getElementById('terminal');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative bg-[#0B0C10] text-zinc-100 min-h-screen selection:bg-[#FF5E5B] selection:text-white font-sans antialiased overflow-x-hidden">
      {/* Boot Initialization Animation */}
      <AnimatePresence mode="wait">
        {booting && (
          <BootSequence key="boot" onComplete={() => setBooting(false)} />
        )}
      </AnimatePresence>

      {/* Main App Container with subtle fade in after boot */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: booting ? 0 : 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Custom Magnetic Cursor */}
        <CustomCursor />

        {/* Floating Translucent Header */}
        <Header onToggleTerminal={handleToggleTerminal} />

        {/* Hero Section with Fullscreen 3D Crystal Scene */}
        <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
          <Hero3DCanvas />
          <HeroOverlay onToggleTerminal={handleToggleTerminal} />
        </section>

        {/* Main Content Sections */}
        <main className="relative z-10 space-y-12">
          <AboutSection />
          <ProjectsSection />
          <TechStackSection />
          <TerminalSection />
        </main>

        {/* Footer */}
        <Footer />
      </motion.div>
    </div>
  );
}
