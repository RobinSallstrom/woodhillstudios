// Home Page — Underground Cinema Design System
// Hero: full-viewport with oversized italic type + hero image
// Work Grid: staggered asymmetric masonry-style layout

import { useEffect, useRef, useState } from 'react';
import { Link } from 'wouter';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { workItems } from '@/lib/artists';
import MarqueeStrip from '@/components/MarqueeStrip';

const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663511118461/B2SuVb2ndJDsVHLccsDb5D/wh-hero-Nnovzu7EzHPmuq3BgJ7jSY.webp';

// Stagger animation variants
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const charVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.8 },
  }),
};

function SplitText({ text, className }: { text: string; className?: string }) {
  return (
    <span className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={charVariants}
          style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

function WorkCard({ item, index }: { item: typeof workItems[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.06, ease: 'easeOut' }}
      className={`img-reveal group cursor-pointer ${
        item.span === 'tall' ? 'row-span-2' : item.span === 'wide' ? 'col-span-2' : ''
      }`}
    >
      <div className="relative w-full h-full overflow-hidden bg-[#111]" style={{ minHeight: item.span === 'tall' ? '480px' : '240px' }}>
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-50"
        />
        {/* Overlay info */}
        <div className="reveal-label flex-col gap-2 text-center px-4">
          <span className="font-mono-label text-[10px] text-[#C4622D] tracking-[0.2em]">{item.category}</span>
          <h3
            className="text-white text-xl font-bold leading-tight"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            {item.title}
          </h3>
          <span className="font-mono-label text-[10px] text-white/60">{item.artist}</span>
        </div>
        {/* Bottom label always visible */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent translate-y-0 opacity-100 transition-opacity duration-300 group-hover:opacity-0">
          <span className="font-mono-label text-[9px] text-white/40">{item.artist}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const workRef = useRef(null);
  const workInView = useInView(workRef, { once: true, margin: '-100px' });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505]">
      {/* ── HERO ── */}
      <section className="relative h-screen flex items-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Woodhill Studios"
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505]/60 to-transparent" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 w-full pb-16 lg:pb-20 px-6 lg:pl-[240px] lg:pr-16">
          <motion.div
            initial="hidden"
            animate={mounted ? 'visible' : 'hidden'}
            variants={containerVariants}
          >
            {/* Label */}
            <motion.div variants={itemVariants} className="rule-label mb-6 max-w-xs">
              Stockholm, Sweden
            </motion.div>

            {/* Display title */}
            <motion.h1
              variants={containerVariants}
              className="font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] text-[#E8E0D5] mb-2 overflow-hidden"
            >
              <SplitText text="Woodhill" className="block" />
            </motion.h1>
            <motion.h1
              variants={containerVariants}
              className="font-display text-[clamp(3.5rem,10vw,9rem)] leading-[0.9] text-[#C4622D] mb-8 overflow-hidden"
            >
              <SplitText text="Studios" className="block" />
            </motion.h1>

            {/* Tagline + CTA */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <p className="text-white/50 text-sm max-w-[280px] leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                A haven for the creatively inclined. 13 artists. One collective.
              </p>
              <Link href="/artists">
                <motion.div
                  whileHover={{ x: 6 }}
                  className="flex items-center gap-3 group cursor-pointer"
                >
                  <span className="font-mono-label text-[11px] text-[#E8E0D5] group-hover:text-[#C4622D] transition-colors duration-300">
                    Explore Artists
                  </span>
                  <ArrowRight size={14} className="text-[#C4622D] group-hover:translate-x-1 transition-transform duration-300" />
                </motion.div>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-8 right-8 lg:right-16 flex flex-col items-center gap-2"
        >
          <div className="w-px h-12 bg-white/20 relative overflow-hidden">
            <motion.div
              className="absolute top-0 left-0 w-full bg-[#C4622D]"
              animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>
          <span className="font-mono-label text-[9px] text-white/25 rotate-90 origin-center mt-2">scroll</span>
        </motion.div>
      </section>

      {/* ── MARQUEE STRIP ── */}
      <MarqueeStrip />

      {/* ── WORK GRID ── */}
      <section ref={workRef} className="px-6 lg:pl-[240px] lg:pr-12 py-20 lg:py-28">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={workInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <div className="rule-label mb-4">Selected Work</div>
            <h2
              className="text-[clamp(2rem,5vw,4rem)] font-bold text-[#E8E0D5] leading-none"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              The Collective
            </h2>
          </div>
          <Link href="/artists">
            <motion.span
              whileHover={{ x: 4 }}
              className="hidden sm:flex items-center gap-2 font-mono-label text-[10px] text-white/35 hover:text-[#C4622D] transition-colors duration-300 cursor-pointer"
            >
              All Artists <ArrowRight size={11} />
            </motion.span>
          </Link>
        </motion.div>

        {/* Asymmetric grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4 auto-rows-[240px]">
          {workItems.map((item, i) => (
            <WorkCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* ── MANIFESTO STRIP ── */}
      <section className="px-6 lg:pl-[240px] lg:pr-12 py-16 border-t border-white/5">
        <div className="max-w-2xl">
          <div className="rule-label mb-8">Manifesto</div>
          <blockquote
            className="font-display text-[clamp(1.4rem,3vw,2.2rem)] text-[#E8E0D5]/80 leading-[1.4] italic"
          >
            "A melting pot of imaginative expression. With the power of music production, graffiti, film, animation, and art at their fingertips — the tools to bring their wildest ideas to life."
          </blockquote>
          <div className="mt-8 flex items-center gap-4">
            <div className="w-8 h-px bg-[#C4622D]" />
            <span className="font-mono-label text-[10px] text-white/30">Woodhill Studios, Stockholm</span>
          </div>
        </div>
      </section>
    </div>
  );
}
