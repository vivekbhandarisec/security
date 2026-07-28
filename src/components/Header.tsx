import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Terminal, ExternalLink, Menu, X } from 'lucide-react';
import QMonogram from './QMonogram';
import { audioEngine } from '../utils/audio';
import { VIVEK_INFO } from '../data/portfolioData';

interface HeaderProps {
  onToggleTerminal?: () => void;
}

export default function Header({ onToggleTerminal }: HeaderProps) {
  const [soundOn, setSoundOn] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setSoundOn(audioEngine.isEnabled());
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSoundToggle = () => {
    const newState = audioEngine.toggleSound();
    setSoundOn(newState);
  };

  const handleNavClick = (id: string) => {
    audioEngine.playMechanicalClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#0B0C10]/80 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Logo */}
        <button
          onClick={() => handleNavClick('hero')}
          onMouseEnter={() => audioEngine.playHover()}
          className="group flex items-center gap-3 text-left focus:outline-none"
          data-cursor="HOME"
        >
          <div className="relative w-9 h-9 rounded-xl bg-[#0F1015] border border-white/15 flex items-center justify-center p-1.5 overflow-hidden transition-all duration-300 group-hover:border-[#00F0FF]/60 group-hover:scale-105 shadow-[0_0_15px_rgba(0,240,255,0.15)]">
            <QMonogram className="w-6 h-6 transition-transform duration-300 group-hover:rotate-6" />
            <div className="absolute inset-0 bg-[#00F0FF]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-sans font-bold text-sm tracking-wider text-white group-hover:text-[#FF5E5B] transition-colors">
                VIVEK BHANDARI
              </span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono font-medium bg-[#00F0FF]/10 text-[#00F0FF] border border-[#00F0FF]/20">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00F0FF] animate-pulse" />
                SECURITY RESEARCH
              </span>
            </div>
            <p className="text-[11px] font-mono text-zinc-400 font-normal">
              Web Sec Researcher & CTF
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] backdrop-blur-md border border-white/[0.08] p-1.5 rounded-full shadow-inner">
          {[
            { id: 'hero', label: 'Overview' },
            { id: 'about', label: 'Research & CTFs' },
            { id: 'projects', label: 'Exploits & Tools' },
            { id: 'techstack', label: 'Tech Stack' },
            { id: 'terminal', label: 'AI Terminal' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              onMouseEnter={() => audioEngine.playHover()}
              className="px-3.5 py-1.5 text-xs font-mono text-zinc-300 hover:text-white rounded-full hover:bg-white/[0.08] transition-all duration-200"
              data-cursor="GO"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="hidden sm:flex items-center gap-2.5">
          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            onMouseEnter={() => audioEngine.playHover()}
            className="p-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-zinc-300 hover:text-[#FF5E5B] hover:border-[#FF5E5B]/40 hover:bg-[#FF5E5B]/10 transition-all duration-200"
            title={soundOn ? 'Mute Sound Effects' : 'Enable Mechanical Sound Effects'}
            data-cursor="AUDIO"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-[#FF5E5B]" /> : <VolumeX className="w-4 h-4 opacity-50" />}
          </button>

          {/* Quick Terminal Launch */}
          <button
            onClick={() => {
              audioEngine.playMechanicalClick();
              if (onToggleTerminal) {
                onToggleTerminal();
              } else {
                handleNavClick('terminal');
              }
            }}
            onMouseEnter={() => audioEngine.playHover()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#6366F1]/10 border border-[#6366F1]/30 text-xs font-mono text-[#818CF8] hover:text-white hover:bg-[#6366F1]/20 hover:border-[#6366F1]/60 transition-all duration-200"
            data-cursor="CLI"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>CLI</span>
          </button>

          {/* Resume PDF */}
          <a
            href={VIVEK_INFO.resume}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => audioEngine.playMechanicalClick()}
            onMouseEnter={() => audioEngine.playHover()}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-[#FF5E5B] to-[#E11D48] text-white text-xs font-mono font-medium shadow-[0_0_15px_rgba(255,94,91,0.3)] hover:shadow-[0_0_25px_rgba(255,94,91,0.5)] hover:scale-105 active:scale-95 transition-all duration-200"
            data-cursor="RESUME"
          >
            <span>Resume</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={handleSoundToggle}
            className="p-2 rounded-lg bg-white/5 text-zinc-300"
          >
            {soundOn ? <Volume2 className="w-4 h-4 text-[#FF5E5B]" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <button
            onClick={() => {
              audioEngine.playMechanicalClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#0B0C10]/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4">
          <div className="flex flex-col gap-2">
            {[
              { id: 'hero', label: 'Overview' },
              { id: 'about', label: 'Research & CTFs' },
              { id: 'projects', label: 'Exploits & Tools' },
              { id: 'techstack', label: 'Tech Stack' },
              { id: 'terminal', label: 'AI Terminal' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left py-2 text-sm font-mono text-zinc-200 hover:text-[#FF5E5B] border-b border-white/5"
              >
                {item.label}
              </button>
            ))}
          </div>
          <div className="pt-2 flex items-center justify-between">
            <a
              href={VIVEK_INFO.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#FF5E5B] text-white text-xs font-mono font-medium"
            >
              <span>Download Resume</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
