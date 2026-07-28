import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldAlert,
  Flame,
  Code2,
  Terminal,
  Zap,
  Box,
  Server,
  GitBranch,
  Activity,
  KeyRound,
  Copy,
  Check,
  Cpu,
  Layers,
  Sparkles,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import { SKILL_NODES } from '../data/portfolioData';
import { audioEngine } from '../utils/audio';

const ICON_MAP: Record<string, React.ElementType> = {
  ShieldAlert,
  Flame,
  Code2,
  Terminal,
  Zap,
  Box,
  Server,
  GitBranch,
  Activity,
  KeyRound,
};

type Category = 'all' | 'web-exploitation' | 'tooling' | 'infrastructure' | 'scripting';

const CATEGORY_LABELS: Record<Category, { label: string; color: string; border: string; text: string }> = {
  all: {
    label: 'All Technologies',
    color: 'from-white/20 to-white/5',
    border: 'border-white/20',
    text: 'text-white',
  },
  'web-exploitation': {
    label: 'Offensive Web & Auditing',
    color: 'from-[#FF5E5B]/20 to-[#FF5E5B]/5',
    border: 'border-[#FF5E5B]/40',
    text: 'text-[#FF5E5B]',
  },
  tooling: {
    label: 'Security Tooling & Scanners',
    color: 'from-[#00F0FF]/20 to-[#00F0FF]/5',
    border: 'border-[#00F0FF]/40',
    text: 'text-[#00F0FF]',
  },
  infrastructure: {
    label: 'Infrastructure & Sandboxing',
    color: 'from-[#6366F1]/20 to-[#6366F1]/5',
    border: 'border-[#6366F1]/40',
    text: 'text-[#818CF8]',
  },
  scripting: {
    label: 'Scripting & Exploit Engines',
    color: 'from-emerald-500/20 to-emerald-500/5',
    border: 'border-emerald-500/40',
    text: 'text-emerald-400',
  },
};

export default function TechStackSection() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [activeSkillId, setActiveSkillId] = useState<string>('burp-suite');
  const [copiedCommand, setCopiedCommand] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const activeSkill = SKILL_NODES.find((s) => s.id === activeSkillId) || SKILL_NODES[0];

  const filteredSkills = SKILL_NODES.filter(
    (skill) => selectedCategory === 'all' || skill.category === selectedCategory
  );

  // Background Interactive Matrix Particle Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 800);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 600);

    const handleResize = () => {
      if (!canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    const particles = Array.from({ length: 35 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      radius: Math.random() * 2 + 1,
      color: Math.random() > 0.5 ? 'rgba(0, 240, 255, ' : 'rgba(255, 94, 91, ',
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw particle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.opacity + ')';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleCopyCommand = (cmd: string) => {
    audioEngine.playMechanicalClick();
    navigator.clipboard.writeText(cmd);
    setCopiedCommand(true);
    setTimeout(() => setCopiedCommand(false), 2000);
  };

  return (
    <section id="techstack" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Background Matrix Canvas */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Header Section */}
      <div className="relative z-10 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-xs font-mono mb-4">
          <Cpu className="w-3.5 h-3.5" />
          <span>OFFENSIVE TECH STACK & ARCHITECTURE</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-sans mb-4">
          Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F0FF] via-[#6366F1] to-[#FF5E5B]">Tech Telemetry</span>
        </h2>
        <p className="text-zinc-400 font-mono text-sm max-w-2xl">
          Exploit weaponization tooling, protocol auditing suites, and high-performance security infrastructure used for vulnerability discovery and bug bounty research.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="relative z-10 flex flex-wrap items-center gap-2 mb-10 p-1.5 bg-white/[0.02] border border-white/[0.08] rounded-2xl backdrop-blur-xl">
        {(Object.keys(CATEGORY_LABELS) as Category[]).map((catKey) => {
          const cat = CATEGORY_LABELS[catKey];
          const isActive = selectedCategory === catKey;
          return (
            <button
              key={catKey}
              onClick={() => {
                audioEngine.playMechanicalClick();
                setSelectedCategory(catKey);
              }}
              onMouseEnter={() => audioEngine.playHover()}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all duration-200 ${
                isActive
                  ? `bg-gradient-to-r ${cat.color} ${cat.border} ${cat.text} shadow-[0_0_20px_rgba(0,0,0,0.5)] border`
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
              }`}
              data-cursor="FILTER"
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Main Split Grid: Interactive Tool Cards + Live Telemetry Inspector */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Tool Cards Grid (7 cols) */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill) => {
              const Icon = ICON_MAP[skill.iconName] || Layers;
              const isSelected = activeSkillId === skill.id;
              const catTheme = CATEGORY_LABELS[skill.category];

              return (
                <motion.div
                  key={skill.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => {
                    audioEngine.playMechanicalClick();
                    setActiveSkillId(skill.id);
                  }}
                  onMouseEnter={() => audioEngine.playHover()}
                  className={`group relative p-5 rounded-2xl cursor-pointer transition-all duration-300 backdrop-blur-xl ${
                    isSelected
                      ? `bg-[#0F1015]/90 border-2 ${catTheme.border} shadow-[0_0_30px_rgba(0,0,0,0.8)] scale-[1.02]`
                      : 'bg-white/[0.02] border border-white/[0.08] hover:border-white/20 hover:bg-white/[0.04]'
                  }`}
                  data-cursor="SELECT"
                >
                  {/* Subtle Top-Right Accent Light */}
                  <div className={`absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br ${catTheme.color} blur-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none`} />

                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className={`p-2.5 rounded-xl bg-white/[0.05] border border-white/10 ${catTheme.text}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium border ${catTheme.border} ${catTheme.text} bg-black/40`}>
                      {skill.proficiency}% PROFICIENCY
                    </span>
                  </div>

                  <h3 className="text-base font-mono font-bold text-white mb-1 group-hover:text-[#00F0FF] transition-colors">
                    {skill.name}
                  </h3>

                  <p className="text-xs font-mono text-zinc-400 line-clamp-2 leading-relaxed mb-4">
                    {skill.description}
                  </p>

                  {/* Meter Bar */}
                  <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 bg-gradient-to-r ${
                        isSelected ? 'from-[#00F0FF] via-[#6366F1] to-[#FF5E5B]' : 'from-zinc-400 to-zinc-600'
                      }`}
                      style={{ width: `${skill.proficiency}%` }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Right Side: Live Telemetry & Inspector Panel (5 cols) */}
        <div className="lg:col-span-5 sticky top-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSkill.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8 rounded-3xl bg-[#0A0A0B] border border-white/15 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute top-[-20%] right-[-20%] w-60 h-60 rounded-full bg-indigo-500/10 blur-[80px] pointer-events-none" />

              {/* Inspector Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#00F0FF] animate-pulse" />
                  <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                    TELEMETRY INSPECTOR
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-zinc-300">
                  ID: {activeSkill.id.toUpperCase()}
                </span>
              </div>

              {/* Tool Identity */}
              <div className="flex items-center gap-4 mb-6">
                {React.createElement(ICON_MAP[activeSkill.iconName] || Layers, {
                  className: 'w-10 h-10 text-[#00F0FF] p-2 bg-[#00F0FF]/10 rounded-2xl border border-[#00F0FF]/30',
                })}
                <div>
                  <h3 className="text-xl font-mono font-bold text-white">
                    {activeSkill.name}
                  </h3>
                  <span className="text-xs font-mono text-[#FF5E5B]">
                    {CATEGORY_LABELS[activeSkill.category].label}
                  </span>
                </div>
              </div>

              {/* Technical Description */}
              <div className="space-y-4 mb-6">
                <div>
                  <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1">
                    OVERVIEW & ARCHITECTURE
                  </div>
                  <p className="text-xs font-mono text-zinc-300 leading-relaxed">
                    {activeSkill.description}
                  </p>
                </div>

                <div>
                  <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1">
                    OFFENSIVE SECURITY USE CASE
                  </div>
                  <p className="text-xs font-mono text-[#00F0FF] leading-relaxed bg-[#00F0FF]/5 p-3 rounded-xl border border-[#00F0FF]/20">
                    {activeSkill.useCase}
                  </p>
                </div>
              </div>

              {/* Real Command Invocation Snippet */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                    REAL-WORLD EXECUTION SNIPPET
                  </span>
                  <button
                    onClick={() => handleCopyCommand(activeSkill.commandExample)}
                    className="flex items-center gap-1 text-[10px] font-mono text-zinc-400 hover:text-white transition-colors"
                  >
                    {copiedCommand ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400">COPIED</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>COPY</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-3.5 rounded-xl bg-black/80 border border-white/10 font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre-wrap break-all select-all">
                  <span className="text-zinc-500">$ </span>
                  {activeSkill.commandExample}
                </div>
              </div>

              {/* Connected Ecosystem Tools */}
              <div>
                <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-2">
                  CONNECTED SECURITY ECOSYSTEM
                </div>
                <div className="flex flex-wrap gap-2">
                  {activeSkill.connections.map((connId) => {
                    const connSkill = SKILL_NODES.find((s) => s.id === connId);
                    if (!connSkill) return null;
                    return (
                      <button
                        key={connId}
                        onClick={() => {
                          audioEngine.playMechanicalClick();
                          setActiveSkillId(connId);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 hover:border-[#00F0FF]/40 hover:bg-[#00F0FF]/10 text-[11px] font-mono text-zinc-300 hover:text-[#00F0FF] transition-all flex items-center gap-1"
                      >
                        <span>{connSkill.name}</span>
                        <ChevronRight className="w-3 h-3 opacity-50" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
