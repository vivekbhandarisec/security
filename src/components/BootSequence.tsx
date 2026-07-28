import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Shield, Cpu, Lock, CheckCircle2, Zap } from 'lucide-react';
import QMonogram from './QMonogram';
import { audioEngine } from '../utils/audio';

interface BootSequenceProps {
  key?: string;
  onComplete: () => void;
}

const BOOT_LOGS = [
  'SEC_KERNEL: Initializing Sandboxed Security Core v2.4.0...',
  'CIPHER_SUITE: Binding RSA-4096 & Quantum-Resistant Handshakes...',
  'RECON_ENGINE: ZeroStalker Asset Graph & CT-Logs Sync [OK]',
  'EXPLOIT_DB: Synchronizing CVE & EPSS Telemetry Feeds [OK]',
  'AUTHORIZATION: Vivek Bhandari Identity Verified [ACCESS GRANTED]',
];

export default function BootSequence({ onComplete }: BootSequenceProps) {
  const [logIndex, setLogIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [glitchText, setGlitchText] = useState('SYSTEM BOOT');

  useEffect(() => {
    // Play boot sound effect
    audioEngine.playMechanicalClick();

    // Glitch text effect
    const chars = '01#$X_?/\\<>&%';
    const glitchInterval = setInterval(() => {
      const randomStr = Array.from({ length: 11 }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length))
      ).join('');
      setGlitchText(randomStr);
    }, 80);

    setTimeout(() => {
      clearInterval(glitchInterval);
      setGlitchText('SYSTEM ONLINE');
    }, 1800);

    // Step through boot logs
    const logInterval = setInterval(() => {
      setLogIndex((prev) => {
        if (prev < BOOT_LOGS.length - 1) {
          audioEngine.playHover();
          return prev + 1;
        }
        return prev;
      });
    }, 380);

    // Progress bar counter
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev < 100) {
          return Math.min(100, prev + Math.floor(Math.random() * 15 + 10));
        }
        return 100;
      });
    }, 180);

    // Complete boot sequence
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 2500);

    return () => {
      clearInterval(glitchInterval);
      clearInterval(logInterval);
      clearInterval(progressInterval);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-[9999] bg-[#050506] flex flex-col items-center justify-center p-6 select-none overflow-hidden"
    >
      {/* Background Matrix Mesh Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(#1f293d_1px,transparent_1px)] [background-size:24px_24px] opacity-20 pointer-events-none" />
      
      {/* Ambient Neon Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[100px] pointer-events-none" />

      {/* Main Terminal Card */}
      <div className="relative z-10 w-full max-w-md bg-[#0A0A0C]/90 border border-white/15 rounded-3xl p-8 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,240,255,0.15)] flex flex-col items-center text-center">
        
        {/* Monogram Badge */}
        <div className="relative mb-6">
          <div className="w-20 h-20 rounded-2xl bg-[#0F1015] border border-white/20 flex items-center justify-center p-3 shadow-[0_0_30px_rgba(0,240,255,0.25)] relative overflow-hidden">
            <QMonogram className="w-14 h-14 animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5E5B]/10 via-transparent to-[#00F0FF]/10 animate-spin" />
          </div>
          <div className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-[9px] font-mono text-emerald-400 font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            LIVE
          </div>
        </div>

        {/* Glitch Status Banner */}
        <div className="font-mono text-xs font-bold tracking-[0.25em] text-[#00F0FF] mb-2 flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#FF5E5B]" />
          <span>{glitchText}</span>
        </div>

        <h1 className="text-xl font-mono font-black text-white tracking-tight mb-1">
          VIVEK BHANDARI
        </h1>
        <p className="text-xs font-mono text-zinc-400 mb-6">
          Security Research & Vulnerability Engineering
        </p>

        {/* Progress Bar */}
        <div className="w-full space-y-2 mb-6">
          <div className="flex justify-between items-center text-[10px] font-mono text-zinc-400">
            <span>INITIALIZING TELEMETRY</span>
            <span className="text-[#00F0FF] font-bold">{progress}%</span>
          </div>
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden p-0.5 border border-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#FF5E5B] via-[#6366F1] to-[#00F0FF]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut' }}
            />
          </div>
        </div>

        {/* Terminal Log Output Stream */}
        <div className="w-full bg-black/80 border border-white/10 rounded-2xl p-3.5 text-left font-mono text-[10px] text-zinc-400 space-y-1.5 h-24 overflow-hidden relative">
          {BOOT_LOGS.slice(0, logIndex + 1).map((log, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-2 ${
                idx === logIndex ? 'text-emerald-400 font-bold' : 'text-zinc-500'
              }`}
            >
              <span className="text-zinc-600">&gt;</span>
              <span className="truncate">{log}</span>
            </div>
          ))}
          <div className="absolute bottom-1 right-2 text-[9px] text-zinc-600 font-mono animate-pulse">
            SYS_ACK
          </div>
        </div>

        {/* Skip Button */}
        <button
          onClick={() => {
            audioEngine.playMechanicalClick();
            onComplete();
          }}
          className="mt-6 text-[10px] font-mono text-zinc-500 hover:text-white underline underline-offset-4 transition-colors"
        >
          [SKIP INITIALIZATION &rarr;]
        </button>
      </div>
    </motion.div>
  );
}
