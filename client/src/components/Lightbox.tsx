// Lightbox — fullscreen image gallery
// Keyboard nav (←/→/ESC), swipe support, film grain bg, minimal UI

import { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';

export interface LightboxImage {
  src: string;
  alt?: string;
  caption?: string;
}

interface LightboxProps {
  images: LightboxImage[];
  index: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function Lightbox({ images, index, onClose, onNext, onPrev }: LightboxProps) {
  const current = images[index];

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape')     onClose();
    if (e.key === 'ArrowRight') onNext();
    if (e.key === 'ArrowLeft')  onPrev();
  }, [onClose, onNext, onPrev]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [handleKey]);

  // Touch/swipe support
  let touchStartX = 0;
  const onTouchStart = (e: React.TouchEvent) => { touchStartX = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) dx < 0 ? onNext() : onPrev();
  };

  if (!current) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="lightbox"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="lightbox-backdrop"
        onClick={onClose}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {/* Grain overlay inside lightbox */}
        <div className="grain-overlay" style={{ opacity: 0.05 }} aria-hidden="true" />

        {/* Image */}
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.35 }}
          className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
          onClick={e => e.stopPropagation()}
        >
          <img
            src={current.src}
            alt={current.alt ?? ''}
            className="max-w-full max-h-[85vh] object-contain"
            style={{ boxShadow: '0 32px 80px rgba(0,0,0,0.8)' }}
          />
          {current.caption && (
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
              <p className="font-mono-label text-[10px] text-white/60 text-center">{current.caption}</p>
            </div>
          )}
        </motion.div>

        {/* Controls */}
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-white/40 hover:text-white transition-colors duration-200 z-10"
          aria-label="Close"
        >
          <X size={20} strokeWidth={1.5} />
        </button>

        {/* Counter */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 font-mono-label text-[10px] text-white/30">
          {index + 1} / {images.length}
        </div>

        {/* Prev */}
        {images.length > 1 && (
          <button
            onClick={e => { e.stopPropagation(); onPrev(); }}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors duration-200 z-10 p-2"
            aria-label="Previous"
          >
            <ArrowLeft size={22} strokeWidth={1.5} />
          </button>
        )}

        {/* Next */}
        {images.length > 1 && (
          <button
            onClick={e => { e.stopPropagation(); onNext(); }}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/30 hover:text-white transition-colors duration-200 z-10 p-2"
            aria-label="Next"
          >
            <ArrowRight size={22} strokeWidth={1.5} />
          </button>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
