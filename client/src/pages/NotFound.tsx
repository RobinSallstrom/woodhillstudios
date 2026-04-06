import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center pt-20 lg:pt-0 lg:pl-[200px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="px-6 text-center lg:text-left"
      >
        <div className="rule-label mb-6 justify-center lg:justify-start">Error</div>
        <h1
          className="text-[clamp(6rem,20vw,16rem)] font-bold text-[#E8E0D5]/5 leading-none mb-4 select-none"
          style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
        >
          404
        </h1>
        <p className="font-display text-[clamp(1.5rem,3vw,2.5rem)] text-[#E8E0D5]/60 italic mb-8 -mt-8 lg:-mt-12">
          Page not found.
        </p>
        <Link href="/">
          <motion.div
            whileHover={{ x: -4 }}
            className="inline-flex items-center gap-3 group cursor-pointer"
          >
            <ArrowLeft size={14} className="text-[#C4622D]" />
            <span className="font-mono-label text-[11px] text-[#E8E0D5]/50 group-hover:text-[#E8E0D5] transition-colors duration-300">
              Back to Home
            </span>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}
