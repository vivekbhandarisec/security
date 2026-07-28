import React from 'react';
import { motion } from 'motion/react';
import { Shield, Terminal, ArrowDown, ChevronRight, Award, ExternalLink } from 'lucide-react';
import { VIVEK_INFO } from '../data/portfolioData';
import { audioEngine } from '../utils/audio';

interface HeroOverlayProps {
  onToggleTerminal?: () => void;
}

export default function HeroOverlay({ onToggleTerminal }: HeroOverlayProps) {
  const handleScrollTo = (id: string) => {
    audioEngine.playMechanicalClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
      <div className="max-w-3xl">
        {/* Status Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-6"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF5E5B] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF5E5B]" />
          </span>
          <span className="text-xs font-mono text-zinc-300 font-medium">
            {VIVEK_INFO.status}
          </span>
          <span className="text-zinc-600">|</span>
          <span className="text-xs font-mono text-[#00F0FF] flex items-center gap-1">
            <Award className="w-3 h-3" />
            CTF Competitor
          </span>
        </motion.div>

        {/* Display Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
          className="space-y-2 mb-6"
        >
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white tracking-tight uppercase font-sans">
            VIVEK <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E5B] via-[#6366F1] to-[#00F0FF]">BHANDARI</span>
          </h1>
          <p className="text-lg sm:text-2xl font-sans font-light text-zinc-300 tracking-wide leading-relaxed">
            Web Application Security Researcher <span className="text-[#FF5E5B] font-normal">&bull;</span> Bug Bounty Hunter <span className="text-[#00F0FF] font-normal">&bull;</span> CTF Competitor
          </p>
        </motion.div>

        {/* Concise Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className="text-sm sm:text-base text-zinc-400 font-mono leading-relaxed mb-8 max-w-2xl"
        >
          {VIVEK_INFO.bio}
        </motion.p>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10"
        >
          {VIVEK_INFO.stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/[0.07] backdrop-blur-md hover:border-[#FF5E5B]/40 transition-colors"
            >
              <div className="text-2xl font-mono font-bold text-white mb-0.5">
                {stat.value}
              </div>
              <div className="text-[11px] font-mono text-zinc-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Call to Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: 'easeOut' }}
          className="flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() => handleScrollTo('projects')}
            onMouseEnter={() => audioEngine.playHover()}
            className="group flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-[#FF5E5B] to-[#E11D48] text-white text-sm font-mono font-semibold shadow-[0_0_25px_rgba(255,94,91,0.35)] hover:shadow-[0_0_40px_rgba(255,94,91,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            data-cursor="VIEW"
          >
            <Shield className="w-4 h-4" />
            <span>Explore Projects</span>
            <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>

          <button
            onClick={() => {
              audioEngine.playMechanicalClick();
              if (onToggleTerminal) {
                onToggleTerminal();
              } else {
                handleScrollTo('terminal');
              }
            }}
            onMouseEnter={() => audioEngine.playHover()}
            className="group flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-white/[0.04] border border-white/15 hover:border-[#6366F1]/60 text-white text-sm font-mono font-medium hover:bg-[#6366F1]/10 transition-all duration-200"
            data-cursor="CLI"
          >
            <Terminal className="w-4 h-4 text-[#818CF8]" />
            <span>Launch AI Terminal</span>
          </button>

          <a
            href={VIVEK_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => audioEngine.playMechanicalClick()}
            onMouseEnter={() => audioEngine.playHover()}
            className="p-3.5 rounded-2xl bg-white/[0.04] border border-white/15 text-zinc-300 hover:text-white hover:border-white/30 transition-all duration-200"
            title="GitHub Profile"
            data-cursor="GITHUB"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => handleScrollTo('about')}
      >
        <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="w-6 h-10 rounded-full border border-white/15 flex items-start justify-center p-1.5">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-[#FF5E5B]"
          />
        </div>
      </motion.div>
    </div>
  );
}
