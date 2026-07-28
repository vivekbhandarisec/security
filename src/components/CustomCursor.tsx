import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isPointer, setIsPointer] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide on mobile touch screens
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactive = target.closest('button, a, input, textarea, select, [data-cursor]');
      if (interactive) {
        setIsHovered(true);
        const cursorData = interactive.getAttribute('data-cursor');
        setCursorText(cursorData || '');
        setIsPointer(true);
      } else {
        setIsHovered(false);
        setCursorText('');
        setIsPointer(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {/* Center Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#FF5E5B] shadow-[0_0_10px_#FF5E5B]"
        animate={{
          x: pos.x - 4,
          y: pos.y - 4,
          scale: isHovered ? 0 : 1,
          opacity: isHovered ? 0 : 1
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 400, mass: 0.1 }}
      />

      {/* Outer Magnetic Interactive Halo */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full flex items-center justify-center border transition-colors duration-200 ${
          isHovered
            ? 'bg-[#FF5E5B]/10 border-[#FF5E5B] backdrop-blur-[2px] shadow-[0_0_20px_rgba(255,94,91,0.25)]'
            : 'border-white/20 bg-transparent'
        }`}
        animate={{
          x: pos.x - (isHovered ? 28 : 16),
          y: pos.y - (isHovered ? 28 : 16),
          width: isHovered ? 56 : 32,
          height: isHovered ? 56 : 32,
        }}
        transition={{ type: 'spring', damping: 25, stiffness: 300, mass: 0.2 }}
      >
        {cursorText && (
          <span className="text-[9px] font-mono tracking-wider font-semibold text-[#FF5E5B] uppercase text-center px-1 leading-none">
            {cursorText}
          </span>
        )}
      </motion.div>
    </div>
  );
}
