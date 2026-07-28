import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Shield, Terminal, Zap, Code2, AlertTriangle, Check, X, Search, Lock } from 'lucide-react';
import { Project } from '../types';
import { audioEngine } from '../utils/audio';

interface Project3DCardProps {
  key?: string;
  project: Project;
}

export default function Project3DCard({ project }: Project3DCardProps) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // Interactive Demo States inside Card
  const [ssrfInput, setSsrfInput] = useState('http://2130706433/latest/meta-data/');
  const [ssrfResult, setSsrfResult] = useState<string | null>(null);

  const [cveSearch, setCveSearch] = useState('CVE-2025-21223');
  const [cveResult, setCveResult] = useState<any>(null);

  const [osintDomain, setOsintDomain] = useState('target.com');
  const [osintLogs, setOsintLogs] = useState<string[]>([]);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12; // Max tilt 12 deg
    const rotateY = ((x - centerX) / centerX) * 12;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    audioEngine.playHover();
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  // SSRF Payload Test Simulation
  const handleTestSsrf = () => {
    audioEngine.playMechanicalClick();
    if (ssrfInput.includes('169.254.169.254') || ssrfInput.includes('2130706433') || ssrfInput.includes('localhost') || ssrfInput.includes('127.0.0.1')) {
      setSsrfResult('[URLPathGuard BLOCKED]: Detected Private IP / AWS IMDS Metadata bypass vector. Sanitized & Request Terminated.');
    } else {
      setSsrfResult('[URLPathGuard CLEAN]: Normalized Path: /public/v1/resource. Request Allowed.');
    }
  };

  // CVE Intelligence Lookup Simulation
  const handleTestCve = () => {
    audioEngine.playMechanicalClick();
    setCveResult({
      id: cveSearch || 'CVE-2025-21223',
      epss: '94.2%',
      severity: 'CRITICAL (9.8)',
      vector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
      status: 'EXPLOIT PoC ACTIVE IN WILD'
    });
  };

  // OSINT Scan Simulation
  const handleTestOsint = () => {
    audioEngine.playMechanicalClick();
    setOsintLogs([
      `[+] Resolving DNS records for ${osintDomain}...`,
      `[+] Discovered 4 subdomains via CT Logs: api.${osintDomain}, dev.${osintDomain}, auth.${osintDomain}`,
      `[!] Found CORS Misconfiguration on https://api.${osintDomain} (Access-Control-Allow-Origin: *)`,
      `[!] Open bucket detected: s3://${osintDomain}-backups`
    ]);
  };

  return (
    <>
      {/* 3D Tilt Card Component */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovered
            ? `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(1.02, 1.02, 1.02)`
            : 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="relative rounded-3xl bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl p-6 flex flex-col justify-between overflow-hidden shadow-2xl transition-all duration-300 hover:border-white/20 group"
      >
        {/* Specular Ambient Glow */}
        <div
          className="absolute -inset-1 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at 50% 0%, ${project.accentColor}25, transparent 60%)`,
          }}
        />

        <div>
          {/* Header Row */}
          <div className="flex items-center justify-between gap-3 mb-4" style={{ transform: 'translateZ(30px)' }}>
            <span
              className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase tracking-wider"
              style={{
                backgroundColor: `${project.accentColor}15`,
                color: project.accentColor,
                border: `1px solid ${project.accentColor}40`,
              }}
            >
              {project.category}
            </span>
            <div className="flex items-center gap-2">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => {
                  e.stopPropagation();
                  audioEngine.playMechanicalClick();
                }}
                className="p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
                title="GitHub Repo"
                data-cursor="REPO"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Title & Tagline */}
          <h3
            className="text-xl font-mono font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text transition-colors"
            style={{
              backgroundImage: `linear-gradient(to right, #ffffff, ${project.accentColor})`,
              transform: 'translateZ(25px)',
            }}
          >
            {project.title}
          </h3>
          <p className="text-xs font-mono text-zinc-400 mb-4" style={{ transform: 'translateZ(20px)' }}>
            {project.tagline}
          </p>

          {/* Description */}
          <p className="text-xs font-mono text-zinc-300 leading-relaxed mb-6" style={{ transform: 'translateZ(15px)' }}>
            {project.description}
          </p>

          {/* Interactive Feature Simulator inside Card */}
          <div
            className="mb-6 p-3.5 rounded-2xl bg-black/50 border border-white/10 font-mono text-xs space-y-2.5"
            style={{ transform: 'translateZ(35px)' }}
          >
            <div className="flex items-center justify-between text-[11px] text-zinc-400 border-b border-white/5 pb-1.5">
              <span className="flex items-center gap-1.5 text-white font-semibold">
                <Terminal className="w-3.5 h-3.5 text-[#FF5E5B]" />
                Interactive Telemetry Sandbox
              </span>
              <span className="text-[10px] text-[#00F0FF] uppercase">Live Engine</span>
            </div>

            {project.interactiveDemoType === 'ssrf' && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={ssrfInput}
                    onChange={(e) => setSsrfInput(e.target.value)}
                    placeholder="Enter target URL path..."
                    className="flex-1 bg-zinc-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-[#00F0FF]"
                  />
                  <button
                    onClick={handleTestSsrf}
                    className="px-3 py-1.5 rounded-lg bg-[#00F0FF]/10 border border-[#00F0FF]/30 text-[#00F0FF] text-[11px] font-bold hover:bg-[#00F0FF]/20"
                  >
                    Sanitize
                  </button>
                </div>
                {ssrfResult && (
                  <div className={`p-2 rounded-lg text-[10px] ${ssrfResult.includes('BLOCKED') ? 'bg-red-500/10 text-red-400 border border-red-500/30' : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'}`}>
                    {ssrfResult}
                  </div>
                )}
              </div>
            )}

            {project.interactiveDemoType === 'cve' && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={cveSearch}
                    onChange={(e) => setCveSearch(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-[#FF5E5B]"
                  />
                  <button
                    onClick={handleTestCve}
                    className="px-3 py-1.5 rounded-lg bg-[#FF5E5B]/10 border border-[#FF5E5B]/30 text-[#FF5E5B] text-[11px] font-bold hover:bg-[#FF5E5B]/20"
                  >
                    Fetch
                  </button>
                </div>
                {cveResult && (
                  <div className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-[10px] text-zinc-300 space-y-1">
                    <div className="flex justify-between text-[#FF5E5B] font-bold">
                      <span>{cveResult.id}</span>
                      <span>EPSS: {cveResult.epss}</span>
                    </div>
                    <div>SEVERITY: {cveResult.severity}</div>
                    <div className="text-[9px] text-amber-400 font-semibold">{cveResult.status}</div>
                  </div>
                )}
              </div>
            )}

            {project.interactiveDemoType === 'osint' && (
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={osintDomain}
                    onChange={(e) => setOsintDomain(e.target.value)}
                    className="flex-1 bg-zinc-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-[11px] text-white focus:outline-none focus:border-[#6366F1]"
                  />
                  <button
                    onClick={handleTestOsint}
                    className="px-3 py-1.5 rounded-lg bg-[#6366F1]/10 border border-[#6366F1]/30 text-[#818CF8] text-[11px] font-bold hover:bg-[#6366F1]/20"
                  >
                    Scan
                  </button>
                </div>
                {osintLogs.length > 0 && (
                  <div className="p-2 rounded-lg bg-black/80 border border-white/10 text-[9px] font-mono text-zinc-300 space-y-1 max-h-24 overflow-y-auto">
                    {osintLogs.map((log, idx) => (
                      <div key={idx} className={log.includes('[!]') ? 'text-amber-400 font-semibold' : 'text-zinc-400'}>
                        {log}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {project.interactiveDemoType === 'ctf' && (
              <div className="p-2 rounded-lg bg-zinc-900 border border-white/10 text-[10px] text-zinc-300 space-y-1">
                <div className="text-[#00F0FF] font-semibold">Flag Verification Proof:</div>
                <div className="text-[10px] text-zinc-400 font-mono">VoidWalkers&#123;0auth_st4t3_p4r4m_byp4ss_2025&#125;</div>
              </div>
            )}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6" style={{ transform: 'translateZ(10px)' }}>
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-white/[0.04] border border-white/[0.08] text-[10px] font-mono text-zinc-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Trigger */}
        <button
          onClick={() => {
            audioEngine.playMechanicalClick();
            setModalOpen(true);
          }}
          onMouseEnter={() => audioEngine.playHover()}
          className="w-full py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono text-white font-medium hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 group-hover:border-[#FF5E5B]/40"
          style={{ transform: 'translateZ(30px)' }}
          data-cursor="EXPAND"
        >
          <span>Deep Security Architecture & Writeup</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#FF5E5B]" />
        </button>
      </motion.div>

      {/* Writeup Modal Overlay */}
      <AnimatePresence>
        {modalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-2xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#0B0C10] border border-white/15 p-6 sm:p-8 space-y-6 text-left shadow-2xl"
            >
              {/* Close Button */}
              <button
                onClick={() => {
                  audioEngine.playMechanicalClick();
                  setModalOpen(false);
                }}
                className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              <div>
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-mono font-bold uppercase mb-2"
                  style={{
                    backgroundColor: `${project.accentColor}20`,
                    color: project.accentColor,
                  }}
                >
                  {project.category}
                </span>
                <h2 className="text-2xl font-mono font-bold text-white mb-1">
                  {project.title}
                </h2>
                <p className="text-xs font-mono text-zinc-400">{project.tagline}</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 text-xs font-mono text-zinc-300 leading-relaxed space-y-2">
                <div className="text-white font-bold">Security Architecture Overview:</div>
                <p>{project.longDescription}</p>
              </div>

              <div>
                <div className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-3">
                  Technical Highlights & Defense Mechanisms
                </div>
                <ul className="space-y-2 text-xs font-mono text-zinc-300">
                  {project.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-[#FF5E5B] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF5E5B] to-[#E11D48] text-white text-xs font-mono font-bold shadow-lg"
                >
                  <Github className="w-4 h-4" />
                  <span>Inspect Code on GitHub</span>
                </a>

                <button
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-white/5 text-xs font-mono text-zinc-300 hover:text-white"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
