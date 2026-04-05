// About Page — Underground Cinema Design System
// Split layout: manifesto text + atmospheric studio photos
// Framer Motion scroll reveals

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const ABOUT_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663511118461/B2SuVb2ndJDsVHLccsDb5D/wh-about-c4WmzPqyWSLZK5Ggp2CQCt.webp';
const HERO_IMAGE = 'https://d2xsxph8kpxj0f.cloudfront.net/310519663511118461/B2SuVb2ndJDsVHLccsDb5D/wh-hero-Nnovzu7EzHPmuq3BgJ7jSY.webp';

const galleryImages = [
  'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800&q=80',
  'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80',
  'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800&q=80',
  'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80',
  'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&q=80',
  'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80',
];

const disciplines = [
  { label: 'Music Production', count: '3+' },
  { label: 'Visual Art & VFX', count: '2+' },
  { label: 'Graffiti & Murals', count: '3+' },
  { label: 'Film & Photography', count: '2+' },
  { label: 'Illustration & Design', count: '2+' },
  { label: 'Painting', count: '2+' },
];

function GalleryItem({ src, index }: { src: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.07 }}
      className="overflow-hidden bg-[#111] img-reveal"
      style={{ aspectRatio: index % 2 === 0 ? '4/3' : '3/4' }}
    >
      <img
        src={src}
        alt="Woodhill Studios"
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </motion.div>
  );
}

export default function About() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-80px' });

  return (
    <div className="min-h-screen bg-[#050505] pt-20 lg:pt-0 lg:pl-[200px]">
      {/* ── HERO SPLIT ── */}
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col justify-center px-6 lg:px-12 py-16 lg:py-20"
        >
          <div className="rule-label mb-8">About</div>
          <h1
            className="text-[clamp(3rem,6vw,5.5rem)] font-bold text-[#E8E0D5] leading-none mb-8"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            A Haven for<br />
            <span className="text-[#C4622D]">the Creatively</span><br />
            Inclined.
          </h1>
          <div className="w-12 h-px bg-[#C4622D] mb-8" />
          <p
            className="text-white/55 text-base leading-[1.9] max-w-md"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            Woodhill Studios convenes a colorful cast of 13 creatives with backgrounds spanning from game development to wood carving. This innovative space is a melting pot of imaginative expression.
          </p>
          <p
            className="text-white/55 text-base leading-[1.9] max-w-md mt-4"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            With the power of music production, graffiti, film, animation, and art at their fingertips, the members of Woodhill Studios have the tools to bring their wildest ideas to life.
          </p>
          <div className="mt-10">
            <span className="font-mono-label text-[10px] text-white/20">Stockholm, Sweden</span>
          </div>
        </motion.div>

        {/* Right: image */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative overflow-hidden"
          style={{ minHeight: '400px' }}
        >
          <img
            src={ABOUT_IMAGE}
            alt="Woodhill Studios collective"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent lg:block hidden" />
        </motion.div>
      </section>

      {/* ── DISCIPLINES STATS ── */}
      <section ref={statsRef} className="px-6 lg:px-12 py-16 border-t border-white/5">
        <div className="rule-label mb-10">Disciplines</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/5">
          {disciplines.map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="bg-[#050505] p-6 lg:p-8"
            >
              <div
                className="text-[clamp(2rem,4vw,3.5rem)] font-bold text-[#C4622D] leading-none mb-2"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {d.count}
              </div>
              <div className="font-mono-label text-[10px] text-white/35">{d.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── STUDIO IMAGE FULL WIDTH ── */}
      <section className="px-6 lg:px-12 py-4">
        <div className="relative overflow-hidden" style={{ height: 'clamp(300px, 50vh, 600px)' }}>
          <img
            src={HERO_IMAGE}
            alt="Woodhill Studios space"
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
          <div className="absolute bottom-8 left-8 right-8">
            <blockquote
              className="font-display text-[clamp(1.2rem,2.5vw,2rem)] text-white/80 italic max-w-2xl"
            >
              "The very act of creation is a conduit for creativity."
            </blockquote>
          </div>
        </div>
      </section>

      {/* ── PHOTO GALLERY ── */}
      <section className="px-6 lg:px-12 py-16">
        <div className="rule-label mb-10">Studio Life</div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 lg:gap-4">
          {galleryImages.map((src, i) => (
            <GalleryItem key={i} src={src} index={i} />
          ))}
        </div>
      </section>

      {/* ── TAGLINE FOOTER ── */}
      <section className="px-6 lg:px-12 py-16 border-t border-white/5">
        <div className="flex items-center gap-6">
          <div className="w-8 h-px bg-[#C4622D]" />
          <p
            className="font-display text-[clamp(1.5rem,3vw,2.5rem)] text-[#E8E0D5]/40 italic"
          >
            Exotic Lifestyle.
          </p>
        </div>
      </section>
    </div>
  );
}
