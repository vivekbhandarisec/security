import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Award, Terminal, Code2, Cpu, CheckCircle2, Copy, Check, ExternalLink } from 'lucide-react';
import { VIVEK_INFO, CTF_WRITEUPS } from '../data/portfolioData';
import { audioEngine } from '../utils/audio';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<'methodology' | 'bandit' | 'ctf' | 'disclosure'>('methodology');
  const [copiedPayload, setCopiedPayload] = useState<string | null>(null);

  const handleCopy = (payload: string) => {
    audioEngine.playMechanicalClick();
    navigator.clipboard.writeText(payload);
    setCopiedPayload(payload);
    setTimeout(() => setCopiedPayload(null), 2000);
  };

  return (
    <section id="about" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header Eyebrow */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/30 text-[#818CF8] text-xs font-mono mb-4">
          <Shield className="w-3.5 h-3.5" />
          <span>SECURITY RESEARCH & CTF COMPETITOR</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-sans mb-4">
          Web Security <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E5B] to-[#00F0FF]">Research & Methodology</span>
        </h2>
        <p className="text-zinc-400 font-mono text-sm max-w-2xl">
          Deep-dive analysis into modern web vulnerability mechanics, automated payload defenses, and competitive CTF problem solving.
        </p>
      </div>

      {/* Tabs Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-8 p-1.5 bg-white/[0.02] border border-white/[0.08] rounded-2xl backdrop-blur-md">
        {[
          { id: 'methodology', label: 'Research Focus', icon: Shield },
          { id: 'bandit', label: 'OverTheWire Bandit', icon: Terminal },
          { id: 'ctf', label: 'CTF Writeups & Analysis', icon: Award },
          { id: 'disclosure', label: 'Bug Bounty Disclosures', icon: Code2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                audioEngine.playMechanicalClick();
                setActiveTab(tab.id as any);
              }}
              onMouseEnter={() => audioEngine.playHover()}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-gradient-to-r from-[#FF5E5B] to-[#E11D48] text-white shadow-[0_0_20px_rgba(255,94,91,0.3)]'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.05]'
              }`}
              data-cursor="SELECT"
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Cards */}
      <AnimatePresence mode="wait">
        {activeTab === 'methodology' && (
          <motion.div
            key="methodology"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl hover:border-[#FF5E5B]/40 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-[#FF5E5B]/10 border border-[#FF5E5B]/30 flex items-center justify-center text-[#FF5E5B] mb-5">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-mono font-bold text-white mb-2">
                IDOR & Broken Access Control
              </h3>
              <p className="text-xs font-mono text-zinc-400 leading-relaxed mb-4">
                Investigating horizontal and vertical authorization flaws, missing object-level permission checks, multi-tenant state leaks, and parameter pollution vectors across GraphQL & REST APIs.
              </p>
              <ul className="space-y-2 text-xs font-mono text-zinc-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5E5B]" />
                  <span>Tenant Isolation Boundary Testing</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#FF5E5B]" />
                  <span>REST & GraphQL Guid/UUID Manipulation</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl hover:border-[#818CF8]/40 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-[#6366F1]/10 border border-[#6366F1]/30 flex items-center justify-center text-[#818CF8] mb-5">
                <Code2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-mono font-bold text-white mb-2">
                XSS & DOM Sanitization Bypasses
              </h3>
              <p className="text-xs font-mono text-zinc-400 leading-relaxed mb-4">
                Analyzing client-side JavaScript execution sinks, DOM-based XSS, CSP policy evaluations, HTML sanitizer edge cases, and context-aware payload construction for modern SPAs.
              </p>
              <ul className="space-y-2 text-xs font-mono text-zinc-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#818CF8]" />
                  <span>DOM Purify & Sanitizer Filter Bypasses</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#818CF8]" />
                  <span>Strict Content Security Policy (CSP) Evasion</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl hover:border-[#00F0FF]/40 transition-colors">
              <div className="w-10 h-10 rounded-2xl bg-[#00F0FF]/10 border border-[#00F0FF]/30 flex items-center justify-center text-[#00F0FF] mb-5">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-mono font-bold text-white mb-2">
                Automated Recon & Asset Discovery
              </h3>
              <p className="text-xs font-mono text-zinc-400 leading-relaxed mb-4">
                Building multi-threaded passive and active attack surface enumeration engines (ZeroStalker) that aggregate Certificate Transparency logs, DNS records, and exposed cloud endpoints.
              </p>
              <ul className="space-y-2 text-xs font-mono text-zinc-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span>Passive Subdomain Scraping & CT Logs</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00F0FF]" />
                  <span>Custom Nuclei Template Orchestration</span>
                </li>
              </ul>
            </div>
          </motion.div>
        )}

        {activeTab === 'bandit' && (
          <motion.div
            key="bandit"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-xl font-mono font-bold text-white flex items-center gap-2">
                  <Terminal className="w-5 h-5 text-[#FF5E5B]" />
                  OverTheWire Bandit: Levels 0 &rarr; 34 Walkthrough
                </h3>
                <p className="text-xs font-mono text-zinc-400 mt-1">
                  Comprehensive writeup & command scripts for Linux privilege escalation, SSH keys, SSL sockets, setuid binaries, and Git history forensics.
                </p>
              </div>
              <a
                href={VIVEK_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => audioEngine.playMechanicalClick()}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white hover:bg-white/10 transition-colors"
              >
                <span>View Full Repo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2 font-mono text-xs">
                <div className="text-[#00F0FF] font-semibold">Bandit Level 12-13: Hexdump & Compression Chains</div>
                <p className="text-zinc-400">
                  Decompressing nested gzip, bzip2, tar, and xz archives using xxd, file commands, and automated bash loop decompression scripts.
                </p>
                <div className="bg-zinc-950 p-2.5 rounded-xl border border-white/5 flex items-center justify-between text-zinc-300">
                  <code>xxd -r data.txt &gt; data.bin && file data.bin</code>
                  <button
                    onClick={() => handleCopy('xxd -r data.txt > data.bin && file data.bin')}
                    className="text-zinc-400 hover:text-white"
                  >
                    {copiedPayload === 'xxd -r data.txt > data.bin && file data.bin' ? (
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-black/40 border border-white/5 space-y-2 font-mono text-xs">
                <div className="text-[#FF5E5B] font-semibold">Bandit Level 23-24: Cronjob Shell Escapes</div>
                <p className="text-zinc-400">
                  Inspecting scheduled cron scripts in /etc/cron.d/ to inject bash commands into executable scripts executed by bandit24 privileges.
                </p>
                <div className="bg-zinc-950 p-2.5 rounded-xl border border-white/5 flex items-center justify-between text-zinc-300">
                  <code>cat /etc/cron.d/cronjob_bandit24</code>
                  <button
                    onClick={() => handleCopy('cat /etc/cron.d/cronjob_bandit24')}
                    className="text-zinc-400 hover:text-white"
                  >
                    {copiedPayload === 'cat /etc/cron.d/cronjob_bandit24' ? (
                      <Check className="w-3.5 h-3.5 text-green-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'ctf' && (
          <motion.div
            key="ctf"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {CTF_WRITEUPS.map((writeup) => (
              <div
                key={writeup.id}
                className="p-6 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded-md bg-[#FF5E5B]/10 border border-[#FF5E5B]/30 text-[#FF5E5B] text-[10px] font-mono font-bold">
                      {writeup.category}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">
                      {writeup.points} PTS &bull; {writeup.difficulty}
                    </span>
                  </div>
                  <h4 className="text-sm font-mono font-bold text-white mb-2">
                    {writeup.title}
                  </h4>
                  <p className="text-xs font-mono text-zinc-400 mb-4 leading-relaxed">
                    {writeup.summary}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/5">
                  <div className="text-[10px] font-mono text-zinc-400 mb-1">KEY TAKEAWAY:</div>
                  <p className="text-[11px] font-mono text-zinc-300 italic">
                    "{writeup.keyTakeaway}"
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {activeTab === 'disclosure' && (
          <motion.div
            key="disclosure"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl space-y-6"
          >
            <div className="max-w-2xl">
              <h3 className="text-xl font-mono font-bold text-white mb-2">
                Responsible Bug Bounty & Vulnerability Disclosure Ethics
              </h3>
              <p className="text-xs font-mono text-zinc-400 leading-relaxed">
                All security research conducted by Vivek Bhandari adheres strictly to coordinated vulnerability disclosure (CVD) policies. No exploitation is performed outside authorized bug bounty scope, and no sensitive user data is accessed or stored.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-[#FF5E5B] font-bold mb-1">1. Scope Verification</div>
                <div className="text-zinc-400">Strictly testing within target domain wildcard policy and RFC boundaries.</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-[#818CF8] font-bold mb-1">2. PoC Construction</div>
                <div className="text-zinc-400">Building minimal, non-destructive proof-of-concept payloads.</div>
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                <div className="text-[#00F0FF] font-bold mb-1">3. Coordinated Fix</div>
                <div className="text-zinc-400">Working directly with security teams to implement robust code remediation.</div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
