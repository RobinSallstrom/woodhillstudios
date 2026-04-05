import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F2EFE9] flex items-center justify-center pt-20 lg:pt-0 lg:pl-[200px]">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="px-6 text-center lg:text-left"
      >
        <div className="rule-label mb-6 justify-center lg:justify-start">Error</div>
        <h1 className="font-hero text-[clamp(6rem,20vw,16rem)] text-[#0A0A0A]/05 leading-none mb-4 select-none uppercase">
          404
        </h1>
        <p className="font-heading text-[clamp(1.5rem,3vw,2.5rem)] text-[#0A0A0A]/50 mb-8 -mt-8 lg:-mt-12">
          Nothing here. Not even a tumbleweed.
        </p>
        <Link href="/">
          <motion.div
            whileHover={{ x: -4 }}
            className="inline-flex items-center gap-3 group cursor-pointer"
          >
            <ArrowLeft size={14} className="text-[#2D7A6B]" />
            <span className="font-mono-label text-[11px] text-[#0A0A0A]/40 group-hover:text-[#0A0A0A] transition-colors duration-300">
              Back to Home
            </span>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}
