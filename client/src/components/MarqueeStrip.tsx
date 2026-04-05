// Marquee Strip — Underground Cinema Design System
// Infinite horizontal scrolling text strip
// Used between sections for editorial rhythm

import { motion } from 'framer-motion';

interface MarqueeStripProps {
  items?: string[];
  speed?: number;
  className?: string;
}

const defaultItems = [
  'Woodhill Studios',
  '✦',
  'Exotic Lifestyle',
  '✦',
  'Stockholm',
  '✦',
  'Graffiti',
  '✦',
  'Music Production',
  '✦',
  'Film',
  '✦',
  'Animation',
  '✦',
  'Fine Art',
  '✦',
];

export default function MarqueeStrip({ items = defaultItems, speed = 30, className = '' }: MarqueeStripProps) {
  const repeated = [...items, ...items, ...items];

  return (
    <div className={`overflow-hidden border-y border-white/5 py-3 ${className}`}>
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
              item === '✦' ? 'text-[#C4622D]' : 'text-white/20'
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
