// WarpTransition — optical lens distortion warp on page navigation
// Uses SVG feTurbulence + feDisplacementMap to warp the outgoing page
// Triggered only on navigation (link clicks), not on scroll

import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';

interface WarpState {
  phase: 'idle' | 'out' | 'in';
}

export default function WarpTransition({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const [warp, setWarp] = useState<WarpState>({ phase: 'idle' });
  const prevLocation = useRef(location);
  const turbRef = useRef<SVGFETurbulenceElement>(null);
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const rafRef  = useRef<number>(0);

  // Animate the displacement scale
  const animateScale = (from: number, to: number, duration: number, onDone?: () => void) => {
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; // easeInOut
      const val = from + (to - from) * ease;

      if (turbRef.current) {
        turbRef.current.setAttribute('baseFrequency', `${0.004 + (val / 300) * 0.008}`);
      }
      if (dispRef.current) {
        dispRef.current.setAttribute('scale', String(val));
      }

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        onDone?.();
      }
    };
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (location === prevLocation.current) return;
    prevLocation.current = location;

    // Warp IN on new page arrival
    setWarp({ phase: 'in' });
    animateScale(120, 0, 700, () => {
      setWarp({ phase: 'idle' });
    });

    return () => cancelAnimationFrame(rafRef.current);
  }, [location]);

  const isActive = warp.phase !== 'idle';

  return (
    <>
      {/* SVG filter definition */}
      <svg
        style={{ position: 'fixed', width: 0, height: 0, overflow: 'hidden', zIndex: -1 }}
        aria-hidden="true"
      >
        <defs>
          <filter id="warp-filter" x="-20%" y="-20%" width="140%" height="140%" colorInterpolationFilters="sRGB">
            <feTurbulence
              ref={turbRef}
              type="turbulence"
              baseFrequency="0.004"
              numOctaves="2"
              seed="5"
              result="noise"
            />
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Page content wrapper — filter applied when active */}
      <div
        style={{
          filter: isActive ? 'url(#warp-filter)' : 'none',
          transition: 'filter 0.05s',
          minHeight: '100vh',
          width: '100%',
        }}
      >
        {children}
      </div>
    </>
  );
}
