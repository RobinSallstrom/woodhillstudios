// Custom Cursor — Woodhill Studios
// Small teal dot + trailing ring. Works on off-white backgrounds.

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const dotX = useSpring(cursorX, { damping: 40, stiffness: 600, mass: 0.2 });
  const dotY = useSpring(cursorY, { damping: 40, stiffness: 600, mass: 0.2 });
  const ringX = useSpring(cursorX, { damping: 28, stiffness: 220, mass: 0.6 });
  const ringY = useSpring(cursorY, { damping: 28, stiffness: 220, mass: 0.6 });

  useEffect(() => {
    // Only show on desktop
    if (window.innerWidth < 1024) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.img-reveal') ||
        target.closest('.cursor-pointer');
      setIsHovering(!!isInteractive);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    document.documentElement.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
      document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY]);

  // Don't render on mobile
  if (typeof window !== 'undefined' && window.innerWidth < 1024) return null;

  return (
    <>
      {/* Dot — solid teal, no blend mode */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
        className="fixed top-0 left-0 w-[7px] h-[7px] rounded-full bg-[#2D7A6B] pointer-events-none z-[99999]"
      />
      {/* Ring — black outline, expands on hover */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 2.8 : 1,
          opacity: isVisible ? (isHovering ? 0.5 : 0.25) : 0,
          borderColor: isHovering ? '#2D7A6B' : 'rgba(10,10,10,0.4)',
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border pointer-events-none z-[99998]"
      />
    </>
  );
}
