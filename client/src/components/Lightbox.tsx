// Lightbox — fullscreen image gallery
// Black background, film grain overlay, keyboard + swipe + ESC navigation

import { useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface LightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({ images, currentIndex, isOpen, onClose, onNext, onPrev }: LightboxProps) {
  const touchStartX = useRef<number | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return;
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'ArrowLeft') onPrev();
  }, [isOpen, onClose, onNext, onPrev]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) onNext();
      else onPrev();
    }
    touchStartX.current = null;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[99998] flex items-center justify-center"
          style={{ background: '#000' }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Film grain */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              opacity: 0.10,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'repeat',
              backgroundSize: '128px 128px',
            }}
          />

          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 text-white/50 hover:text-white transition-colors p-2"
            style={{ cursor: 'none' }}
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Counter */}
          <div
            className="absolute top-6 left-1/2 -translate-x-1/2 z-10"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.62rem',
              letterSpacing: '0.22em',
              color: 'rgba(255,255,255,0.35)',
              textTransform: 'uppercase',
            }}
          >
            {currentIndex + 1} / {images.length}
          </div>

          {/* Prev */}
          {images.length > 1 && (
            <button
              onClick={onPrev}
              className="absolute left-4 md:left-8 z-10 text-white/35 hover:text-white transition-colors p-3"
              style={{ cursor: 'none' }}
              aria-label="Previous"
            >
              <ChevronLeft size={26} />
            </button>
          )}

          {/* Image */}
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={images[currentIndex]}
              alt={`Portfolio ${currentIndex + 1}`}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="max-w-[88vw] max-h-[85vh] object-contain select-none"
              draggable={false}
              onClick={(e) => e.stopPropagation()}
            />
          </AnimatePresence>

          {/* Next */}
          {images.length > 1 && (
            <button
              onClick={onNext}
              className="absolute right-4 md:right-8 z-10 text-white/35 hover:text-white transition-colors p-3"
              style={{ cursor: 'none' }}
              aria-label="Next"
            >
              <ChevronRight size={26} />
            </button>
          )}

          {/* Backdrop click to close */}
          <div className="absolute inset-0 -z-10" onClick={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
