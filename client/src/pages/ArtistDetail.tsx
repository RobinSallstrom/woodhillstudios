// Artist Detail Page — Underground Cinema Design System
// Two-column bio layout + masonry portfolio grid
// Framer Motion staggered reveals

import { useRef } from 'react';
import { Link, useParams } from 'wouter';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, ExternalLink } from 'lucide-react';
import { artists, artistPortraits } from '@/lib/artists';

function PortfolioImage({ src, alt, index }: { src: string; alt: string; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="img-reveal overflow-hidden bg-[#111]"
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
        style={{ aspectRatio: index % 3 === 0 ? '4/5' : index % 3 === 1 ? '16/9' : '1/1' }}
      />
    </motion.div>
  );
}

export default function ArtistDetail() {
  const params = useParams<{ id: string }>();
  const artist = artists.find((a) => a.id === params.id);

  if (!artist) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center pt-20 lg:pt-0 lg:pl-[200px]">
        <div className="text-center">
          <p className="font-mono-label text-[11px] text-white/30 mb-4">Artist not found</p>
          <Link href="/artists">
            <span className="font-mono-label text-[11px] text-[#C4622D] cursor-pointer hover:underline">← Back to Artists</span>
          </Link>
        </div>
      </div>
    );
  }

  const portrait = artistPortraits[artist.id];

  return (
    <div className="min-h-screen bg-[#050505] pt-20 lg:pt-0 lg:pl-[200px]">
      <div className="px-6 lg:px-12 py-12 lg:py-16">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link href="/artists">
            <div className="flex items-center gap-2 group cursor-pointer w-fit">
              <ArrowLeft size={13} className="text-white/30 group-hover:text-[#C4622D] transition-colors duration-300" />
              <span className="font-mono-label text-[10px] text-white/30 group-hover:text-white/60 transition-colors duration-300">
                All Artists
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Bio section — two column */}
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-12 lg:gap-16 mb-20">
          {/* Left: portrait + links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="relative overflow-hidden bg-[#111] mb-6" style={{ aspectRatio: '3/4', maxWidth: '320px' }}>
              <img
                src={portrait}
                alt={artist.name}
                className="w-full h-full object-cover object-top"
              />
              {/* Discipline tag */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <span className="font-mono-label text-[10px] text-[#C4622D]">{artist.discipline}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {artist.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono-label text-[9px] text-white/30 border border-white/10 px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* External link */}
            {artist.website && (
              <a
                href={artist.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 group w-fit"
              >
                <span className="font-mono-label text-[10px] text-white/35 group-hover:text-[#C4622D] transition-colors duration-300">
                  {artist.website.replace('https://', '').replace('http://', '')}
                </span>
                <ExternalLink size={11} className="text-white/20 group-hover:text-[#C4622D] transition-colors duration-300" />
              </a>
            )}
          </motion.div>

          {/* Right: name + bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-col justify-center"
          >
            <div className="rule-label mb-6">Artist</div>
            <h1
              className="text-[clamp(3rem,7vw,6.5rem)] font-bold text-[#E8E0D5] leading-none mb-8"
              style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
            >
              {artist.name}
            </h1>
            <div className="w-12 h-px bg-[#C4622D] mb-8" />
            <p
              className="text-white/60 text-base leading-[1.8] max-w-lg"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              {artist.fullBio}
            </p>
          </motion.div>
        </div>

        {/* Portfolio grid */}
        <div>
          <div className="rule-label mb-8">Portfolio</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
            {artist.portfolioImages.map((img, i) => (
              <PortfolioImage key={i} src={img} alt={`${artist.name} work ${i + 1}`} index={i} />
            ))}
          </div>
        </div>

        {/* Next artist navigation */}
        <div className="mt-20 pt-12 border-t border-white/5 flex items-center justify-between">
          <Link href="/artists">
            <div className="flex items-center gap-3 group cursor-pointer">
              <ArrowLeft size={14} className="text-white/20 group-hover:text-[#C4622D] transition-colors duration-300" />
              <span className="font-mono-label text-[10px] text-white/30 group-hover:text-white/60 transition-colors duration-300">
                Back to Roster
              </span>
            </div>
          </Link>
          <span className="font-mono-label text-[9px] text-white/15">
            {String(artists.findIndex(a => a.id === artist.id) + 1).padStart(2, '0')} / {String(artists.length).padStart(2, '0')}
          </span>
        </div>
      </div>
    </div>
  );
}
