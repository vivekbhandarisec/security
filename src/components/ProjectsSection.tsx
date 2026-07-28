import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import Project3DCard from './Project3DCard';
import { Shield, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audio';

export default function ProjectsSection() {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Security Tool' | 'CTF Writeup' | 'Security Defense'>('All');

  const filteredProjects = PROJECTS.filter((p) => {
    if (selectedFilter === 'All') return true;
    return p.category === selectedFilter;
  });

  return (
    <section id="projects" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5E5B]/10 border border-[#FF5E5B]/30 text-[#FF5E5B] text-xs font-mono mb-4">
          <Shield className="w-3.5 h-3.5" />
          <span>SECURITY SOFTWARE & EXPLOIT RESEARCH</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-sans mb-4">
          Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E5B] via-[#6366F1] to-[#00F0FF]">3D Project Modules</span>
        </h2>
        <p className="text-zinc-400 font-mono text-sm max-w-2xl">
          Hover over cards for 3D tilt physics, test live vulnerability payload sanitizers directly inside the cards, and explore security architecture writeups.
        </p>
      </div>

      {/* Filter Category Bar */}
      <div className="flex flex-wrap gap-2 mb-10 p-1.5 bg-white/[0.02] border border-white/[0.08] rounded-2xl w-fit">
        {['All', 'Security Tool', 'Security Defense', 'CTF Writeup'].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              audioEngine.playMechanicalClick();
              setSelectedFilter(cat as any);
            }}
            onMouseEnter={() => audioEngine.playHover()}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-medium transition-all ${
              selectedFilter === cat
                ? 'bg-gradient-to-r from-[#FF5E5B] to-[#E11D48] text-white shadow-[0_0_15px_rgba(255,94,91,0.3)]'
                : 'text-zinc-400 hover:text-white hover:bg-white/5'
            }`}
            data-cursor="FILTER"
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3D Project Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <Project3DCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
