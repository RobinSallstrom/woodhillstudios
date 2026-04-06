// CustomCursor — teal dot + black ring on off-white background
// No mix-blend-mode to avoid invisibility issues

import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);
  const isHovering = useRef(false);

  useEffect(() => {
    const dot = dotRef.current;
    const ringEl = ringRef.current;
    if (!dot || !ringEl) return;

    const onMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const onEnter = () => { isHovering.current = true; };
    const onLeave = () => { isHovering.current = false; };

    document.addEventListener('mousemove', onMove);

    // Add hover listeners to interactive elements
    const addListeners = () => {
      document.querySelectorAll('a, button, [role="button"], .img-reveal, .cursor-pointer').forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    addListeners();

    // Re-add on DOM changes
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    const animate = () => {
      // Dot follows cursor directly
      dot.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;

      // Ring gravitates toward cursor
      ring.current.x += (pos.current.x - ring.current.x) * 0.12;
      ring.current.y += (pos.current.y - ring.current.y) * 0.12;

      const scale = isHovering.current ? 1.8 : 1;
      ringEl.style.transform = `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px) scale(${scale})`;

      // Dot: teal when hovering, black otherwise
      dot.style.background = isHovering.current ? '#2D7A6B' : '#0A0A0A';
      dot.style.opacity = isHovering.current ? '0' : '1';

      // Ring: teal border when hovering
      ringEl.style.borderColor = isHovering.current ? '#2D7A6B' : 'rgba(10,10,10,0.4)';

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener('mousemove', onMove);
      observer.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[99997]"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: '#0A0A0A',
          willChange: 'transform',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[99996]"
        style={{
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid rgba(10,10,10,0.4)',
          willChange: 'transform',
          transition: 'border-color 0.2s ease, transform 0.1s ease',
        }}
      />
    </>
  );
}
