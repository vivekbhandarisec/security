import React from 'react';

interface QMonogramProps {
  className?: string;
  size?: number;
}

export default function QMonogram({ className = "w-5 h-5", size }: QMonogramProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <defs>
        <linearGradient id="qPrimaryGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FF5E5B" />
          <stop offset="50%" stopColor="#6366F1" />
          <stop offset="100%" stopColor="#00F0FF" />
        </linearGradient>
        <linearGradient id="qTailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#00F0FF" />
          <stop offset="100%" stopColor="#FF5E5B" />
        </linearGradient>
      </defs>

      {/* Outer subtle shield-like rounded polygon guide */}
      <rect
        x="12"
        y="12"
        width="76"
        height="76"
        rx="22"
        stroke="url(#qPrimaryGrad)"
        strokeWidth="3"
        strokeDasharray="100 40"
        opacity="0.3"
      />

      {/* Main Q Circle Ring */}
      <path
        d="M 50 20 A 28 28 0 1 0 74 62"
        stroke="url(#qPrimaryGrad)"
        strokeWidth="8"
        strokeLinecap="round"
      />

      {/* Q Diagonal Tail Slash */}
      <path
        d="M 52 52 L 80 80"
        stroke="url(#qTailGrad)"
        strokeWidth="9"
        strokeLinecap="round"
      />

      {/* Accent Cyber Dot */}
      <circle cx="50" cy="50" r="4" fill="#00F0FF" />
    </svg>
  );
}
