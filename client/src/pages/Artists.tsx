// Artists Roster Page — Underground Cinema Design System
// Grid of artist cards with portrait, name, discipline
// Hover: scale + overlay reveal

import { useRef } from 'react';
import { Link } from 'wouter';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { artists, artistPortraits } from '@/lib/artists';

function ArtistCard({ artist, index }: { artist: typeof artists[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const portrait = artistPortraits[artist.id];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1 }}
    >
      <Link href={`/artists/${artist.id}`}>
        <div className="group cursor-pointer">
          {/* Image container */}
          <div className="relative overflow-hidden bg-[#111] mb-4" style={{ aspectRatio: '3/4' }}>
            <img
              src={portrait}
              alt={artist.name}
              loading="lazy"
              className="w-full h-full object-cover object-top transition-all duration-700 group-hover:scale-105 group-hover:brightness-40"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 p-6 text-center">
              <span className="font-mono-label text-[10px] text-[#C4622D] mb-3 tracking-[0.2em]">{artist.discipline}</span>
              <p className="text-white/80 text-sm leading-relaxed" style={{ fontFamily: "'DM Sans', sans-serif" }}>
                {artist.shortBio}
              </p>
              <div className="mt-4 flex items-center gap-2 text-white/60">
                <span className="font-mono-label text-[10px]">View Portfolio</span>
                <ArrowUpRight size={12} />
              </div>
            </div>
            {/* Index number */}
            <div className="absolute top-3 left-3">
              <span className="font-mono-label text-[9px] text-white/20">
                {String(index + 1).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* Card footer */}
          <div className="flex items-start justify-between">
            <div>
              <h3
                className="text-[#E8E0D5] font-bold text-lg leading-tight group-hover:text-white transition-colors duration-300"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                {artist.name}
              </h3>
              <span className="font-mono-label text-[10px] text-white/35 mt-1 block">{artist.discipline}</span>
            </div>
            <ArrowUpRight
              size={16}
              className="text-white/20 group-hover:text-[#C4622D] transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 mt-1 flex-shrink-0"
            />
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function Artists() {
  return (
    <div className="min-h-screen bg-[#050505] pt-20 lg:pt-0 lg:pl-[200px]">
      <div className="px-6 lg:px-12 py-16 lg:py-20">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-16"
        >
          <div className="rule-label mb-6">The Collective</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <h1
              className="text-[clamp(3rem,8vw,7rem)] font-bold text-[#E8E0D5] leading-none"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              Artists
            </h1>
            <p
              className="text-white/40 text-sm max-w-xs leading-relaxed lg:mb-3"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              13 creatives. Graffiti, film, music, animation, painting, and beyond.
            </p>
          </div>
        </motion.div>

        {/* Artist grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
          {artists.map((artist, i) => (
            <ArtistCard key={artist.id} artist={artist} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
