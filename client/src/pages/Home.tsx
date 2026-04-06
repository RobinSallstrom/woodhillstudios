// Home.tsx — Woodhill Studios
// Single long-scroll: Hero → About → Artists → Contact
// Palette: off-white #F2EFE9, black #0A0A0A, teal #2D7A6B
// Fonts: Anton (hero), Bebas Neue (headings), DM Sans (body), Space Mono (labels)

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowDown, ArrowRight, ArrowUpRight } from 'lucide-react';
import { artists, artistPortraits } from '../lib/artists';
import Lightbox from '../components/Lightbox';
import { trpc } from '../lib/trpc';
import { toast } from 'sonner';

// ── Hero video CDN URL ──────────────────────────────────────────────────────────
const HERO_VIDEO = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663511118461/B2SuVb2ndJDsVHLccsDb5D/hero-forest_21c4f377.mp4';

// ── Staggered character reveal ─────────────────────────────────────────────────
function CharReveal({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const chars = text.split('');
  return (
    <span className={`inline-block overflow-hidden ${className ?? ''}`} aria-label={text}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{
            duration: 0.75,
            delay: delay + i * 0.032,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
}

// ── Section wrapper with scroll reveal ────────────────────────────────────────
function RevealSection({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(28px)',
        transition: 'opacity 0.8s ease, transform 0.8s cubic-bezier(0.25,0.46,0.45,0.94)',
      }}
    >
      {children}
    </div>
  );
}

// ── Artist card with expandable portfolio ──────────────────────────────────────
function ArtistCard({ artist, index }: { artist: typeof artists[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });

  const openLightbox = (imgIndex: number) => {
    setLightboxIndex(imgIndex);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);
  const nextImage = useCallback(() => setLightboxIndex(i => (i + 1) % artist.portfolioImages.length), [artist.portfolioImages.length]);
  const prevImage = useCallback(() => setLightboxIndex(i => (i - 1 + artist.portfolioImages.length) % artist.portfolioImages.length), [artist.portfolioImages.length]);

  const portrait = artistPortraits[artist.id];

  return (
    <>
      <div
        ref={ref}
        style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(36px)',
          transition: `opacity 0.7s ease ${index * 0.07}s, transform 0.7s cubic-bezier(0.25,0.46,0.45,0.94) ${index * 0.07}s`,
        }}
        className="border-b border-[#0A0A0A]/10"
      >
        {/* Artist row */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center gap-6 py-6 text-left group"
          style={{ cursor: 'none' }}
        >
          {/* Portrait */}
          <div className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0 border border-[#0A0A0A]/10">
            <img
              src={portrait}
              alt={artist.name}
              className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>

          {/* Name + discipline */}
          <div className="flex-1 min-w-0">
            <div className="font-heading text-2xl md:text-3xl text-[#0A0A0A] leading-none mb-1">
              {artist.name}
            </div>
            <div className="font-mono-label text-[#0A0A0A]/40">{artist.discipline}</div>
          </div>

          {/* Tags (desktop) */}
          <div className="hidden md:flex gap-2 flex-wrap justify-end max-w-[280px]">
            {artist.tags.map(tag => (
              <span
                key={tag}
                className="font-mono-label text-[9px] px-2 py-1 border border-[#0A0A0A]/15 text-[#0A0A0A]/45"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Expand arrow */}
          <div
            className="flex-shrink-0 text-[#0A0A0A]/30 group-hover:text-[#2D7A6B] transition-colors duration-300"
            style={{ transform: expanded ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.35s ease, color 0.3s ease' }}
          >
            <ArrowRight size={18} />
          </div>
        </button>

        {/* Expanded: bio + portfolio grid */}
        <AnimatePresence>
          {expanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="overflow-hidden"
            >
              <div className="pb-8 pl-20">
                {/* Bio */}
                <p className="font-body text-[#0A0A0A]/65 text-sm leading-relaxed max-w-xl mb-6">
                  {artist.fullBio}
                </p>

                {/* Website link */}
                {artist.website && (
                  <a
                    href={artist.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono-label text-[#2D7A6B] hover:opacity-70 transition-opacity mb-6"
                    style={{ cursor: 'none' }}
                  >
                    Visit site <ArrowUpRight size={12} />
                  </a>
                )}

                {/* Portfolio grid */}
                {artist.portfolioImages.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {artist.portfolioImages.map((img, i) => (
                      <button
                        key={i}
                        onClick={() => openLightbox(i)}
                        className="aspect-square overflow-hidden img-reveal"
                        style={{ cursor: 'none' }}
                        aria-label={`View image ${i + 1}`}
                      >
                        <img
                          src={img}
                          alt={`${artist.name} work ${i + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                        <div className="reveal-label">
                          <span className="font-mono-label text-white text-[9px]">View</span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Lightbox
        images={artist.portfolioImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
      />
    </>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function Home() {
  const aboutRef = useRef<HTMLElement>(null);
  const artistsRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formSent, setFormSent] = useState(false);

  const contactMutation = trpc.contact.submit.useMutation({
    onSuccess: () => {
      setFormSent(true);
    },
    onError: () => {
      toast.error('Something went wrong. Try again.');
    },
  });

  const scrollTo = (ref: React.RefObject<HTMLElement | null>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    contactMutation.mutate(formState);
  };

  return (
    <div className="bg-[#F2EFE9] text-[#0A0A0A]">

      {/* ═══════════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════════ */}
      <section className="relative w-full h-screen overflow-hidden flex flex-col items-center justify-center">

        {/* Background video */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.55) saturate(0.7)' }}
        >
          <source src={HERO_VIDEO} type="video/mp4" />
        </video>

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/50" />

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 w-full">
          {/* Main title — Anton, all-caps, maximum size */}
          <div
            className="leading-none text-[#F2EFE9] select-none"
            style={{
              fontFamily: "'Anton', sans-serif",
              fontSize: 'clamp(4.5rem, 16vw, 15rem)',
              textTransform: 'uppercase',
              lineHeight: 0.9,
              letterSpacing: '-0.01em',
            }}
          >
            <div className="overflow-hidden block">
              <CharReveal text="WOODHILL" delay={0.1} />
            </div>
            <div className="overflow-hidden block">
              <CharReveal text="STUDIOS" delay={0.35} />
            </div>
          </div>

          {/* Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.7 }}
            className="mt-6"
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.65rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'rgba(242,239,233,0.55)',
            }}
          >
            Exotic Lifestyle
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          onClick={() => scrollTo(aboutRef)}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#F2EFE9]/40 hover:text-[#F2EFE9]/80 transition-colors"
          style={{ cursor: 'none' }}
          aria-label="Scroll down"
        >
          <span
            style={{
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.58rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
            }}
          >
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={14} />
          </motion.div>
        </motion.button>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 2 — ABOUT
      ═══════════════════════════════════════════════════ */}
      <section
        ref={aboutRef}
        id="about"
        className="py-32 md:py-40 border-t border-[#0A0A0A]/08"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">

          {/* Section label */}
          <RevealSection className="mb-16">
            <div className="rule-label mb-0">About</div>
          </RevealSection>

          {/* Two-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Left: big heading */}
            <RevealSection>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(3.5rem, 7vw, 7rem)',
                  lineHeight: 0.92,
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  color: '#0A0A0A',
                }}
              >
                We make<br />
                <span style={{ color: '#2D7A6B' }}>things.</span><br />
                That's it.
              </h2>
            </RevealSection>

            {/* Right: copy */}
            <RevealSection>
              <div className="space-y-5 text-[#0A0A0A]/65 text-base leading-relaxed font-body">
                <p>
                  Woodhill Studios is a collective of 13 artists based in Stockholm. We've been making stuff together since — honestly, we've lost track. Long enough that we have a name for it.
                </p>
                <p>
                  Between us we cover graffiti, music production, sound design, cinematography, painting, illustration, animation, game development, and a few things that don't have a clean label yet. Some of us work together. Some of us work alone and just show up to the same parties.
                </p>
                <p>
                  The studio is in Stockholm. The work goes wherever it needs to go.
                </p>
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: '#2D7A6B',
                    marginTop: '2rem',
                  }}
                >
                  Exotic Lifestyle. ™
                </p>
              </div>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-[#0A0A0A]/10">
                {[
                  { num: '13', label: 'Artists' },
                  { num: '2014', label: 'Founded' },
                  { num: 'STH', label: 'Stockholm' },
                ].map(({ num, label }) => (
                  <div key={label}>
                    <div
                      style={{
                        fontFamily: "'Anton', sans-serif",
                        fontSize: '2.5rem',
                        color: '#0A0A0A',
                        lineHeight: 1,
                      }}
                    >
                      {num}
                    </div>
                    <div className="font-mono-label text-[#0A0A0A]/35 mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 3 — ARTISTS
      ═══════════════════════════════════════════════════ */}
      <section
        ref={artistsRef}
        id="artists"
        className="py-32 md:py-40 border-t border-[#0A0A0A]/08"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">

          {/* Section label */}
          <RevealSection className="mb-16">
            <div className="flex items-end justify-between">
              <div className="rule-label flex-1">The Collective</div>
            </div>
          </RevealSection>

          {/* Section heading */}
          <RevealSection className="mb-14">
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(3rem, 6vw, 6rem)',
                lineHeight: 0.92,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                color: '#0A0A0A',
              }}
            >
              13 people.<br />
              <span style={{ color: '#2D7A6B' }}>Zero HR department.</span>
            </h2>
          </RevealSection>

          {/* Artist accordion list */}
          <div className="border-t border-[#0A0A0A]/10">
            {artists.map((artist, i) => (
              <ArtistCard key={artist.id} artist={artist} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════
          SECTION 4 — CONTACT
      ═══════════════════════════════════════════════════ */}
      <section
        ref={contactRef}
        id="contact"
        className="py-32 md:py-40 border-t border-[#0A0A0A]/08 bg-[#0A0A0A]"
      >
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16">

          {/* Section label */}
          <RevealSection className="mb-16">
            <div
              className="flex items-center gap-4"
              style={{
                fontFamily: "'Space Mono', monospace",
                fontSize: '0.65rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(242,239,233,0.3)',
              }}
            >
              <span>Contact</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>
          </RevealSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

            {/* Left: heading + info */}
            <RevealSection>
              <h2
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(3rem, 6vw, 6rem)',
                  lineHeight: 0.92,
                  letterSpacing: '0.02em',
                  textTransform: 'uppercase',
                  color: '#F2EFE9',
                  marginBottom: '2rem',
                }}
              >
                Say hello.<br />
                <span style={{ color: '#2D7A6B' }}>We don't bite.</span>
              </h2>
              <p className="text-[#F2EFE9]/45 text-sm leading-relaxed font-body mb-8">
                Got a project? A collab idea? Just want to tell us our website looks good? We're genuinely happy to hear it. We're based in Stockholm but the internet is everywhere, so.
              </p>
              <div className="space-y-2">
                <div className="font-mono-label text-[#F2EFE9]/25">Location</div>
                <div className="font-body text-[#F2EFE9]/60 text-sm">Stockholm, Sweden</div>
              </div>
              <div className="mt-8 pt-8 border-t border-white/08">
                <p
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.7rem',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    color: '#2D7A6B',
                    fontStyle: 'italic',
                  }}
                >
                  "Exotic Lifestyle."
                </p>
              </div>
            </RevealSection>

            {/* Right: form */}
            <RevealSection>
              {formSent ? (
                <div className="flex flex-col items-start justify-center h-full gap-4">
                  <div
                    style={{
                      fontFamily: "'Bebas Neue', sans-serif",
                      fontSize: '3rem',
                      color: '#2D7A6B',
                      letterSpacing: '0.04em',
                      textTransform: 'uppercase',
                    }}
                  >
                    Got it.
                  </div>
                  <p className="font-body text-[#F2EFE9]/45 text-sm">
                    We'll get back to you. Probably.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label className="font-mono-label text-[#F2EFE9]/30 block mb-2">Name</label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                      className="w-full bg-transparent border-b border-white/15 focus:border-[#2D7A6B] outline-none py-3 text-[#F2EFE9] font-body text-sm transition-colors placeholder:text-white/20"
                      placeholder="Your name"
                      style={{ cursor: 'none' }}
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="font-mono-label text-[#F2EFE9]/30 block mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                      className="w-full bg-transparent border-b border-white/15 focus:border-[#2D7A6B] outline-none py-3 text-[#F2EFE9] font-body text-sm transition-colors placeholder:text-white/20"
                      placeholder="your@email.com"
                      style={{ cursor: 'none' }}
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="font-mono-label text-[#F2EFE9]/30 block mb-2">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formState.message}
                      onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                      className="w-full bg-transparent border-b border-white/15 focus:border-[#2D7A6B] outline-none py-3 text-[#F2EFE9] font-body text-sm transition-colors resize-none placeholder:text-white/20"
                      placeholder="What's on your mind?"
                      style={{ cursor: 'none' }}
                    />
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-4 border border-[#2D7A6B] text-[#2D7A6B] font-mono-label hover:bg-[#2D7A6B] hover:text-[#F2EFE9] transition-all duration-250 flex items-center justify-center gap-3"
                    style={{ cursor: 'none' }}
                  >
                    Send it <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </RevealSection>
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 lg:px-16 mt-24 pt-8 border-t border-white/08 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '1.1rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(242,239,233,0.25)',
            }}
          >
            Woodhill Studios
          </div>
          <div className="font-mono-label text-[#F2EFE9]/20">
            Stockholm, Sweden — Exotic Lifestyle
          </div>
          <div className="font-mono-label text-[#F2EFE9]/15">
            © {new Date().getFullYear()}
          </div>
        </div>
      </section>
    </div>
  );
}
