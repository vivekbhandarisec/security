import React from 'react';
import { Github, Linkedin, ExternalLink, ArrowUp } from 'lucide-react';
import QMonogram from './QMonogram';
import { VIVEK_INFO } from '../data/portfolioData';
import { audioEngine } from '../utils/audio';

export default function Footer() {
  const scrollToTop = () => {
    audioEngine.playMechanicalClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#0B0C10] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#0F1015] border border-white/15 flex items-center justify-center p-1">
            <QMonogram className="w-5 h-5" />
          </div>
          <div>
            <div className="font-sans font-bold text-sm text-white">
              VIVEK BHANDARI
            </div>
            <div className="text-[11px] font-mono text-zinc-400">
              Web Application Security Research &bull; Bug Bounty Advisory
            </div>
          </div>
        </div>

        {/* Operational Status */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>All Security Systems Operational & Advisory Open</span>
        </div>

        {/* Links & Back to top */}
        <div className="flex items-center gap-4">
          <a
            href={VIVEK_INFO.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => audioEngine.playMechanicalClick()}
            onMouseEnter={() => audioEngine.playHover()}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            title="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>

          <a
            href={VIVEK_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => audioEngine.playMechanicalClick()}
            onMouseEnter={() => audioEngine.playHover()}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            title="LinkedIn"
          >
            <Linkedin className="w-4 h-4" />
          </a>

          <a
            href={VIVEK_INFO.resume}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => audioEngine.playMechanicalClick()}
            onMouseEnter={() => audioEngine.playHover()}
            className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Resume PDF"
          >
            <ExternalLink className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            onMouseEnter={() => audioEngine.playHover()}
            className="p-2.5 rounded-xl bg-gradient-to-r from-[#FF5E5B] to-[#E11D48] text-white shadow-lg hover:scale-105 active:scale-95 transition-transform"
            title="Back to Top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
