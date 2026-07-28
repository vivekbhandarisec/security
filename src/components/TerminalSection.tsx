import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Terminal as TerminalIcon, Send, Sparkles, CornerDownLeft, Shield, Check, Copy, AlertCircle, RefreshCw } from 'lucide-react';
import { VIVEK_INFO, PROJECTS } from '../data/portfolioData';
import { audioEngine } from '../utils/audio';

interface CommandLog {
  cmd: string;
  output: React.ReactNode;
  time: string;
}

export default function TerminalSection() {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      cmd: 'welcome',
      output: (
        <div className="space-y-1 text-xs text-zinc-300">
          <p className="text-[#FF5E5B] font-bold">
            Vivek Bhandari Terminal Shell [Version 2.5.0-release]
          </p>
          <p className="text-zinc-400">
            Type <span className="text-[#00F0FF] font-bold">help</span> to view available security commands or ask custom questions directly to Vivek's AI Security Agent!
          </p>
        </div>
      ),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Quick GUI Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [contactSent, setContactSent] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs, isAiLoading]);

  const handleCommandSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const rawCmd = inputVal.trim();
    if (!rawCmd) return;

    audioEngine.playTerminalBeep();
    setInputVal('');
    setHistory((prev) => [...prev, rawCmd]);
    setHistoryIdx(-1);

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const cmdLower = rawCmd.toLowerCase();

    // Built-in Commands Processing
    if (cmdLower === 'clear') {
      setLogs([]);
      return;
    }

    let outputContent: React.ReactNode = null;

    if (cmdLower === 'help') {
      outputContent = (
        <div className="space-y-1.5 text-xs">
          <div className="text-[#FF5E5B] font-bold mb-1">AVAILABLE COMMANDS:</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-zinc-300 font-mono">
            <div><span className="text-[#00F0FF]">about</span> - Vivek's security profile</div>
            <div><span className="text-[#00F0FF]">projects</span> - Interactive security tools & writeups</div>
            <div><span className="text-[#00F0FF]">skills</span> - Technical skill matrix</div>
            <div><span className="text-[#00F0FF]">ctf</span> - Team Void-Walkers CTF writeups</div>
            <div><span className="text-[#00F0FF]">resume</span> - Open PDF Resume link</div>
            <div><span className="text-[#00F0FF]">github</span> - Open GitHub profile</div>
            <div><span className="text-[#00F0FF]">linkedin</span> - Open LinkedIn profile</div>
            <div><span className="text-[#00F0FF]">email</span> - Display contact email</div>
            <div><span className="text-[#00F0FF]">audit</span> - Run live payload vulnerability audit</div>
            <div><span className="text-[#00F0FF]">matrix</span> - Stream cyber telemetry</div>
            <div><span className="text-[#00F0FF]">clear</span> - Clear terminal logs</div>
            <div><span className="text-[#00F0FF]">ai &lt;query&gt;</span> - Query Gemini AI Security Assistant</div>
          </div>
        </div>
      );
    } else if (cmdLower === 'about') {
      outputContent = (
        <div className="text-xs text-zinc-300 space-y-1">
          <p className="text-[#FF5E5B] font-bold">{VIVEK_INFO.name} — {VIVEK_INFO.title}</p>
          <p className="text-zinc-400">{VIVEK_INFO.subtitle}</p>
          <p className="text-zinc-300">{VIVEK_INFO.bio}</p>
        </div>
      );
    } else if (cmdLower === 'projects') {
      outputContent = (
        <div className="text-xs text-zinc-300 space-y-2">
          <div className="text-[#FF5E5B] font-bold">SECURITY PROJECTS & TOOLS:</div>
          {PROJECTS.map((p) => (
            <div key={p.id} className="border-l-2 border-[#FF5E5B] pl-2 py-0.5">
              <span className="text-white font-bold">{p.title}</span> &bull; <span className="text-zinc-400">{p.tagline}</span>
              <div className="text-[10px] text-[#00F0FF]">{p.githubUrl}</div>
            </div>
          ))}
        </div>
      );
    } else if (cmdLower === 'skills') {
      outputContent = (
        <div className="text-xs text-zinc-300 space-y-1">
          <div className="text-[#FF5E5B] font-bold">CORE SKILLSET MATRIX:</div>
          <p>Burp Suite Pro, OWASP Top 10, Python 3, Linux SysAdmin, Docker, Nuclei, FastAPI, OAuth 2.0, Wireshark, Git.</p>
        </div>
      );
    } else if (cmdLower === 'ctf') {
      outputContent = (
        <div className="text-xs text-zinc-300 space-y-1">
          <div className="text-[#FF5E5B] font-bold">TEAM VOID-WALKERS CTF HIGHLIGHTS:</div>
          <p>Active CTF competitor in Web Exploitation, OAuth CSRF bypasses, OverTheWire Bandit Linux privilege escalation, and blind SQL injection.</p>
        </div>
      );
    } else if (cmdLower === 'resume') {
      window.open(VIVEK_INFO.resume, '_blank');
      outputContent = <div className="text-xs text-emerald-400">[SYSTEM]: Opening resume in new tab: {VIVEK_INFO.resume}</div>;
    } else if (cmdLower === 'github') {
      window.open(VIVEK_INFO.github, '_blank');
      outputContent = <div className="text-xs text-emerald-400">[SYSTEM]: Opening GitHub: {VIVEK_INFO.github}</div>;
    } else if (cmdLower === 'linkedin') {
      window.open(VIVEK_INFO.linkedin, '_blank');
      outputContent = <div className="text-xs text-emerald-400">[SYSTEM]: Opening LinkedIn: {VIVEK_INFO.linkedin}</div>;
    } else if (cmdLower === 'email' || cmdLower === 'contact') {
      outputContent = (
        <div className="text-xs text-zinc-300">
          Email: <a href={`mailto:${VIVEK_INFO.email}`} className="text-[#00F0FF] underline">{VIVEK_INFO.email}</a>
        </div>
      );
    } else if (cmdLower === 'audit') {
      outputContent = (
        <div className="text-xs font-mono space-y-1">
          <div className="text-[#FF5E5B] font-bold">[VULNERABILITY AUDIT SIMULATION INITIATED]</div>
          <div className="text-zinc-400">[1/3] Testing endpoint https://target.com/api/v1/auth/callback...</div>
          <div className="text-amber-400">[2/3] WARNING: Missing cryptographic state parameter binding in OAuth flow.</div>
          <div className="text-emerald-400">[3/3] AUDIT COMPLETE: 1 High Severity OAuth CSRF Vulnerability Flagged.</div>
        </div>
      );
    } else if (cmdLower === 'matrix') {
      outputContent = (
        <div className="text-xs text-[#00F0FF] font-mono leading-tight">
          01000110 01010011 01001111 01000011 01001001 01000101 01010100 01011001 [SECURED TELEMETRY ACTIVE]
        </div>
      );
    } else {
      // Query Gemini AI Backend for custom prompt!
      setIsAiLoading(true);
      try {
        const queryPrompt = rawCmd.startsWith('ai ') ? rawCmd.slice(3) : rawCmd;
        const res = await fetch('/api/terminal/ask', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: queryPrompt }),
        });
        const data = await res.json();
        outputContent = (
          <div className="text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed border-l-2 border-[#00F0FF] pl-2 font-mono">
            <span className="text-[#00F0FF] font-bold">[AI Security Agent]: </span>
            {data.response || data.error}
          </div>
        );
      } catch (err: any) {
        outputContent = (
          <div className="text-xs text-red-400 font-mono">
            [AI Assistant Error]: Failed to reach security research agent backend.
          </div>
        );
      } finally {
        setIsAiLoading(false);
      }
    }

    setLogs((prev) => [...prev, { cmd: rawCmd, output: outputContent, time: timeStr }]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIdx = historyIdx < history.length - 1 ? historyIdx + 1 : historyIdx;
        setHistoryIdx(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInputVal(history[history.length - 1 - nextIdx] || '');
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInputVal('');
      }
    }
  };

  const handleQuickContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    audioEngine.playSuccess();
    setContactSent(true);
    setTimeout(() => {
      setContactSent(false);
      setContactForm({ name: '', email: '', message: '' });
    }, 4000);
  };

  return (
    <section id="terminal" className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#6366F1]/10 border border-[#6366F1]/30 text-[#818CF8] text-xs font-mono mb-4">
          <TerminalIcon className="w-3.5 h-3.5" />
          <span>FLOATING AI TERMINAL & DIRECT CONTACT</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase font-sans mb-4">
          Interactive <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF5E5B] via-[#6366F1] to-[#00F0FF]">AI Terminal & Contact</span>
        </h2>
        <p className="text-zinc-400 font-mono text-sm max-w-2xl">
          Execute terminal commands or send custom prompts to Vivek's Gemini-powered AI Security Assistant.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* CLI Terminal Shell Component */}
        <div className="lg:col-span-2 rounded-3xl bg-[#0B0C10] border border-white/15 overflow-hidden shadow-2xl flex flex-col h-[520px]">
          {/* Terminal Window Bar */}
          <div className="px-4 py-3 bg-zinc-900/90 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <div className="text-xs font-mono text-zinc-400 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 text-[#FF5E5B]" />
              <span>vivek@security-research-box:~</span>
            </div>
            <div className="text-[10px] font-mono text-[#00F0FF] bg-[#00F0FF]/10 px-2 py-0.5 rounded border border-[#00F0FF]/20">
              AI READY
            </div>
          </div>

          {/* Terminal Content Body */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 font-mono">
            {logs.map((log, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <span className="text-[#FF5E5B] font-bold">vivek@sec-box:~$</span>
                  <span className="text-white font-medium">{log.cmd}</span>
                  <span className="text-[10px] text-zinc-600 ml-auto">{log.time}</span>
                </div>
                <div className="pl-4">{log.output}</div>
              </div>
            ))}

            {isAiLoading && (
              <div className="flex items-center gap-2 text-xs font-mono text-[#00F0FF] animate-pulse">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>AI Security Research Agent processing prompt...</span>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Command Input Prompt Bar */}
          <form onSubmit={handleCommandSubmit} className="p-3 bg-zinc-950 border-t border-white/10 flex items-center gap-2">
            <span className="text-xs font-mono text-[#FF5E5B] font-bold">$</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type command (e.g. 'help', 'about', 'projects') or ask security questions..."
              className="flex-1 bg-transparent text-xs font-mono text-white focus:outline-none placeholder:text-zinc-600"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-[#FF5E5B] text-white hover:bg-[#E11D48] transition-colors"
            >
              <CornerDownLeft className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>

        {/* Quick GUI Contact Card */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-mono font-bold text-white mb-2">
              Direct Contact & Advisory
            </h3>
            <p className="text-xs font-mono text-zinc-400 mb-6 leading-relaxed">
              Prefer standard email? Drop Vivek a direct message for security auditing, bug bounty inquiries, or CTF collaboration.
            </p>

            {contactSent ? (
              <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>Message recorded! Vivek will respond shortly via email.</span>
              </div>
            ) : (
              <form onSubmit={handleQuickContactSubmit} className="space-y-4 font-mono text-xs">
                <div>
                  <label className="block text-zinc-400 text-[11px] mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    value={contactForm.name}
                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                    placeholder="Jane Doe"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FF5E5B]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 text-[11px] mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    placeholder="jane@company.com"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FF5E5B]"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 text-[11px] mb-1">Message / Scope Details</label>
                  <textarea
                    required
                    rows={4}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Describe your security research inquiry or security audit requirements..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-[#FF5E5B]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF5E5B] to-[#E11D48] text-white font-bold text-xs shadow-lg hover:shadow-[0_0_20px_rgba(255,94,91,0.4)] transition-all"
                >
                  Send Message
                </button>
              </form>
            )}
          </div>

          <div className="pt-6 border-t border-white/10 mt-6 text-xs font-mono text-zinc-400 space-y-1">
            <div>Direct Email: <a href={`mailto:${VIVEK_INFO.email}`} className="text-[#00F0FF] underline">{VIVEK_INFO.email}</a></div>
            <div>Location: {VIVEK_INFO.location}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
