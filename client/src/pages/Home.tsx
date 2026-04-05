// Home Page — Woodhill Studios Redesign
// Video hero with cursor displacement effect
// Off-white / black / teal palette, Anton display font, film grain

import { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'wouter';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { workItems } from '@/lib/artists';
import MarqueeStrip from '@/components/MarqueeStrip';
import Lightbox, { LightboxImage } from '@/components/Lightbox';

const HERO_VIDEO = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663511118461/B2SuVb2ndJDsVHLccsDb5D/hero-forest-vimeo_3a94ef49.mp4';

// ── Cursor displacement on video ──────────────────────────────────────────────
function VideoHero() {
  const videoRef   = useRef<HTMLVideoElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLCanvasElement>(null);
  const mouse      = useRef({ x: 0, y: 0, active: false });
  const fadeTimer  = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const opacity    = useRef(0);
  const rafRef     = useRef<number>(0);

  const RADIUS = 140;

  const drawDisplacement = useCallback(() => {
    const video   = videoRef.current;
    const canvas  = canvasRef.current;
    const overlay = overlayRef.current;
    if (!video || !canvas || !overlay || video.readyState < 2) {
      rafRef.current = requestAnimationFrame(drawDisplacement);
      return;
    }

    const ctx  = canvas.getContext('2d')!;
    const octx = overlay.getContext('2d')!;
    const W = canvas.width;
    const H = canvas.height;

    // Draw current video frame to hidden canvas
    ctx.drawImage(video, 0, 0, W, H);

    if (opacity.current <= 0) {
      octx.clearRect(0, 0, W, H);
      rafRef.current = requestAnimationFrame(drawDisplacement);
      return;
    }

    // Get pixel data around cursor
    const mx = mouse.current.x;
    const my = mouse.current.y;
    const x0 = Math.max(0, mx - RADIUS);
    const y0 = Math.max(0, my - RADIUS);
    const x1 = Math.min(W, mx + RADIUS);
    const y1 = Math.min(H, my + RADIUS);
    const pw = x1 - x0;
    const ph = y1 - y0;
    if (pw <= 0 || ph <= 0) {
      rafRef.current = requestAnimationFrame(drawDisplacement);
      return;
    }

    const imageData = ctx.getImageData(x0, y0, pw, ph);
    const data = imageData.data;

    // Convert to grayscale + add grain
    for (let i = 0; i < data.length; i += 4) {
      const gray = 0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
      const grain = (Math.random() - 0.5) * 40;
      const v = Math.max(0, Math.min(255, gray + grain));
      data[i] = data[i + 1] = data[i + 2] = v;
    }

    // Draw effect onto overlay canvas with circular clip + fade
    octx.clearRect(0, 0, W, H);
    octx.save();
    octx.globalAlpha = opacity.current;

    // Circular gradient mask
    const grad = octx.createRadialGradient(mx, my, 0, mx, my, RADIUS);
    grad.addColorStop(0, 'rgba(0,0,0,1)');
    grad.addColorStop(0.7, 'rgba(0,0,0,0.9)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    octx.fillStyle = grad;
    octx.beginPath();
    octx.arc(mx, my, RADIUS, 0, Math.PI * 2);
    octx.fill();

    // Use destination-in to clip the effect
    octx.globalCompositeOperation = 'destination-in';
    octx.fillStyle = grad;
    octx.beginPath();
    octx.arc(mx, my, RADIUS, 0, Math.PI * 2);
    octx.fill();

    // Draw grayscale patch
    octx.globalCompositeOperation = 'source-over';
    octx.globalAlpha = opacity.current;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = pw;
    tempCanvas.height = ph;
    tempCanvas.getContext('2d')!.putImageData(imageData, 0, 0);

    octx.save();
    octx.beginPath();
    octx.arc(mx, my, RADIUS, 0, Math.PI * 2);
    octx.clip();
    octx.drawImage(tempCanvas, x0, y0);
    octx.restore();
    octx.restore();

    rafRef.current = requestAnimationFrame(drawDisplacement);
  }, []);

  useEffect(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;

    const rect = () => overlay.getBoundingClientRect();

    const onMove = (e: MouseEvent) => {
      const r = rect();
      mouse.current = {
        x: (e.clientX - r.left) * (overlay.width / r.width),
        y: (e.clientY - r.top)  * (overlay.height / r.height),
        active: true,
      };
      // Fade in
      opacity.current = Math.min(1, opacity.current + 0.15);
      clearTimeout(fadeTimer.current);
      // Start fade out after 200ms of no movement
      fadeTimer.current = setTimeout(() => {
        const fade = () => {
          opacity.current = Math.max(0, opacity.current - 0.04);
          if (opacity.current > 0) setTimeout(fade, 16);
        };
        fade();
      }, 200);
    };

    const onLeave = () => {
      mouse.current.active = false;
      clearTimeout(fadeTimer.current);
      const fade = () => {
        opacity.current = Math.max(0, opacity.current - 0.05);
        if (opacity.current > 0) setTimeout(fade, 16);
      };
      fade();
    };

    overlay.addEventListener('mousemove', onMove);
    overlay.addEventListener('mouseleave', onLeave);
    rafRef.current = requestAnimationFrame(drawDisplacement);

    return () => {
      overlay.removeEventListener('mousemove', onMove);
      overlay.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(rafRef.current);
      clearTimeout(fadeTimer.current);
    };
  }, [drawDisplacement]);

  return (
    <section className="relative h-screen overflow-hidden bg-[#0A0A0A]">
      {/* Video */}
      <video
        ref={videoRef}
        src={HERO_VIDEO}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60"
        crossOrigin="anonymous"
      />

      {/* Hidden canvas for pixel processing */}
      <canvas ref={canvasRef} width={1280} height={720} className="hidden" />

      {/* Overlay canvas — displacement effect */}
      <canvas
        ref={overlayRef}
        width={1280}
        height={720}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ mixBlendMode: 'normal', zIndex: 2 }}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#F2EFE9]" style={{ zIndex: 3 }} />
      <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#0A0A0A]/30" style={{ zIndex: 3 }} />

      {/* Hero content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="rule-label justify-center mb-6 text-white/50"
        >
          Stockholm, Sweden
        </motion.div>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-hero text-[clamp(5rem,18vw,16rem)] leading-[0.88] text-[#F2EFE9] uppercase tracking-tight"
          >
            WOODHILL
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-hero text-[clamp(5rem,18vw,16rem)] leading-[0.88] text-[#2D7A6B] uppercase tracking-tight"
          >
            STUDIOS
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-8 font-mono-label text-[#F2EFE9]/50 text-[11px]"
        >
          13 people who make stuff. Some of it's pretty good.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-8"
        >
          <Link href="/artists">
            <motion.div
              whileHover={{ x: 6 }}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <span className="font-mono-label text-[11px] text-[#F2EFE9]/70 group-hover:text-[#2D7A6B] transition-colors duration-300">
                Meet the crew
              </span>
              <ArrowRight size={13} className="text-[#2D7A6B]" />
            </motion.div>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        className="absolute bottom-8 right-8 lg:right-16 flex flex-col items-center gap-2 z-10"
      >
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-[#2D7A6B]"
            animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        <span className="font-mono-label text-[9px] text-white/25 rotate-90 origin-center mt-2">scroll</span>
      </motion.div>
    </section>
  );
}

// ── Work Card ─────────────────────────────────────────────────────────────────
function WorkCard({ item, index, onOpen }: { item: typeof workItems[0]; index: number; onOpen: () => void }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.05 }}
      className={`img-reveal group cursor-pointer ${
        item.span === 'tall' ? 'row-span-2' : item.span === 'wide' ? 'col-span-2' : ''
      }`}
      onClick={onOpen}
    >
      <div
        className="relative w-full h-full overflow-hidden bg-[#E4E1DA]"
        style={{ minHeight: item.span === 'tall' ? '480px' : '240px' }}
      >
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-75"
        />
        {/* Hover overlay */}
        <div className="reveal-label flex-col gap-2 text-center px-4">
          <span className="font-mono-label text-[10px] text-[#2D7A6B] tracking-[0.2em]">{item.category}</span>
          <h3 className="font-heading text-white text-2xl">{item.title}</h3>
          <span className="font-mono-label text-[10px] text-white/60">{item.artist}</span>
        </div>
        {/* Bottom label */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300">
          <span className="font-mono-label text-[9px] text-white/50">{item.artist}</span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Home ──────────────────────────────────────────────────────────────────────
export default function Home() {
  const workRef  = useRef(null);
  const workInView = useInView(workRef, { once: true, margin: '-100px' });
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const lightboxImages: LightboxImage[] = workItems.map(item => ({
    src: item.image,
    alt: item.title,
    caption: `${item.title} — ${item.artist}`,
  }));

  return (
    <div className="min-h-screen bg-[#F2EFE9]">
      <VideoHero />

      {/* Marquee */}
      <MarqueeStrip />

      {/* Work Grid */}
      <section ref={workRef} className="px-6 lg:pl-[240px] lg:pr-12 py-20 lg:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={workInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <div className="rule-label mb-4">Selected Work</div>
            <h2 className="font-heading text-[clamp(2.5rem,6vw,5rem)] text-[#0A0A0A] leading-none">
              The Collective
            </h2>
          </div>
          <Link href="/artists">
            <motion.span
              whileHover={{ x: 4 }}
              className="hidden sm:flex items-center gap-2 font-mono-label text-[10px] text-[#0A0A0A]/30 hover:text-[#2D7A6B] transition-colors duration-300 cursor-pointer"
            >
              All Artists <ArrowRight size={11} />
            </motion.span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 auto-rows-[240px]">
          {workItems.map((item, i) => (
            <WorkCard
              key={item.id}
              item={item}
              index={i}
              onOpen={() => setLightboxIndex(i)}
            />
          ))}
        </div>
      </section>

      {/* Manifesto */}
      <section className="px-6 lg:pl-[240px] lg:pr-12 py-16 border-t border-[#0A0A0A]/08">
        <div className="max-w-2xl">
          <div className="rule-label mb-8">Manifesto</div>
          <blockquote className="font-heading text-[clamp(1.8rem,4vw,3rem)] text-[#0A0A0A] leading-[1.2]">
            "A studio in Stockholm where people make things. Music, graffiti, film, games, animation. We didn't overthink the name."
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <div className="w-8 h-px bg-[#2D7A6B]" />
            <span className="font-mono-label text-[10px] text-[#0A0A0A]/30">Woodhill Studios, Stockholm</span>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNext={() => setLightboxIndex(prev => prev !== null ? (prev + 1) % lightboxImages.length : 0)}
          onPrev={() => setLightboxIndex(prev => prev !== null ? (prev - 1 + lightboxImages.length) % lightboxImages.length : 0)}
        />
      )}
    </div>
  );
}
