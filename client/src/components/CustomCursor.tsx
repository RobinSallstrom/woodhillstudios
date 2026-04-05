// Custom Cursor — Underground Cinema Design System
// Small dot that follows the mouse with a trailing ring
// Rust accent on hover over interactive elements

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const springConfig = { damping: 30, stiffness: 300, mass: 0.5 };
  const dotX = useSpring(cursorX, { damping: 40, stiffness: 500, mass: 0.3 });
  const dotY = useSpring(cursorY, { damping: 40, stiffness: 500, mass: 0.3 });
  const ringX = useSpring(cursorX, springConfig);
  const ringY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show on desktop
    if (window.innerWidth < 1024) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.img-reveal') ||
        target.closest('.cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isVisible]);

  if (typeof window !== 'undefined' && window.innerWidth < 1024) return null;

  return (
    <>
      {/* Dot */}
      <motion.div
        style={{ x: dotX, y: dotY, translateX: '-50%', translateY: '-50%' }}
        animate={{ scale: isHovering ? 0 : 1, opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#2D7A6B] pointer-events-none z-[99999] mix-blend-multiply"
      />
      {/* Ring */}
      <motion.div
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isVisible ? (isHovering ? 0.6 : 0.3) : 0,
          borderColor: isHovering ? '#2D7A6B' : 'rgba(10,10,10,0.35),'
        }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border pointer-events-none z-[99998]"
      />
    </>
  );
}
