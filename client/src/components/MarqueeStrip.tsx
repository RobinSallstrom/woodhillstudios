// Marquee Strip — Woodhill Studios Redesign
// Infinite horizontal scrolling text strip — off-white bg, black text, teal diamonds

import { motion } from 'framer-motion';

interface MarqueeStripProps {
  items?: string[];
  speed?: number;
  className?: string;
}

const defaultItems = [
  'Woodhill Studios',
  '◆',
  'Exotic Lifestyle',
  '◆',
  'Stockholm',
  '◆',
  'Graffiti',
  '◆',
  'Music Production',
  '◆',
  'Film',
  '◆',
  'Animation',
  '◆',
  'Fine Art',
  '◆',
  'Game Dev',
  '◆',
];

export default function MarqueeStrip({ items = defaultItems, speed = 30, className = '' }: MarqueeStripProps) {
  const repeated = [...items, ...items, ...items];

  return (
    <div className={`overflow-hidden border-y border-[#0A0A0A]/08 py-3 bg-[#F2EFE9] ${className}`}>
      <motion.div
        animate={{ x: [0, `-${100 / 3}%`] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        className="flex gap-8 whitespace-nowrap"
        style={{ width: 'max-content' }}
      >
        {repeated.map((item, i) => (
          <span
            key={i}
            className={`font-mono-label text-[10px] tracking-[0.2em] ${
              item === '◆' ? 'text-[#2D7A6B]' : 'text-[#0A0A0A]/30'
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
