// Media Manager Page — Underground Cinema Design System
// Admin-only page for uploading and managing S3 media assets
// Accessible at /media — requires login

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'wouter';
import { LogIn, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';
import { getLoginUrl } from '@/const';
import MediaUploader from '@/components/MediaUploader';
import { artists } from '@/lib/artists';

type Category = 'hero' | 'portfolio' | 'about' | 'general';

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'general', label: 'General' },
  { value: 'hero', label: 'Hero / Banner' },
  { value: 'portfolio', label: 'Portfolio' },
  { value: 'about', label: 'About' },
];

export default function MediaManager() {
  const { user, loading } = useAuth();
  const [activeCategory, setActiveCategory] = useState<Category>('general');
  const [activeArtist, setActiveArtist] = useState<string>('');

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F2EFE9] flex items-center justify-center pt-20">
        <div className="w-px h-12 bg-[#0A0A0A]/10 animate-pulse" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#F2EFE9] flex items-center justify-center pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="px-6 text-center"
        >
          <div className="rule-label mb-6 justify-center">Access Required</div>
          <h1
            className="text-[clamp(2.5rem,6vw,5rem)] font-bold text-[#0A0A0A] leading-none mb-6"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Sign In to<br />
            <span style={{ color: '#2D7A6B' }}>Manage Media</span>
          </h1>
          <p className="text-[#0A0A0A]/45 text-sm mb-8 max-w-xs mx-auto" style={{ fontFamily: "'DM Sans', sans-serif" }}>
            Upload and manage images, videos, and documents for the Woodhill Studios site.
          </p>
          <a href={getLoginUrl()}>
            <motion.div
              whileHover={{ x: 4 }}
              className="inline-flex items-center gap-3 group cursor-pointer"
            >
              <span className="font-mono-label text-[11px] text-[#0A0A0A]/60 group-hover:text-[#2D7A6B] transition-colors duration-300">
                Sign In
              </span>
              <LogIn size={13} style={{ color: '#2D7A6B' }} />
            </motion.div>
          </a>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2EFE9] pt-20">
      <div className="px-6 lg:px-12 py-12 lg:py-16">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <Link href="/">
            <div className="flex items-center gap-2 group cursor-pointer w-fit">
              <ArrowLeft size={13} className="text-[#0A0A0A]/30 group-hover:text-[#2D7A6B] transition-colors duration-300" />
              <span className="font-mono-label text-[10px] text-[#0A0A0A]/30 group-hover:text-[#0A0A0A]/60 transition-colors duration-300">
                Back to Site
              </span>
            </div>
          </Link>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-12"
        >
          <div className="rule-label mb-6">Admin</div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
            <h1
              className="text-[clamp(2.5rem,6vw,5rem)] font-bold text-[#0A0A0A] leading-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Media Manager
            </h1>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="font-mono-label text-[10px] text-[#0A0A0A]/35">
                Signed in as {user.name ?? user.email ?? 'Owner'}
              </span>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 lg:gap-12">
          {/* Left: filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Category filter */}
            <div className="mb-8">
              <div className="rule-label mb-4">Category</div>
              <div className="flex flex-col gap-1">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat.value}
                    onClick={() => setActiveCategory(cat.value)}
                    className={`flex items-center gap-3 py-2 group text-left transition-colors duration-200 ${
                      activeCategory === cat.value ? 'text-[#0A0A0A]' : 'text-[#0A0A0A]/35 hover:text-[#0A0A0A]/65'
                    }`}
                  >
                    <div className={`w-1 h-1 rounded-full transition-all duration-200 ${
                      activeCategory === cat.value ? 'bg-[#2D7A6B]' : 'bg-transparent'
                    }`} />
                    <span className="font-mono-label text-[11px]">{cat.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Artist filter (only for portfolio) */}
            {activeCategory === 'portfolio' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="rule-label mb-4">Artist</div>
                <div className="flex flex-col gap-1">
                  <button
                    onClick={() => setActiveArtist('')}
                    className={`flex items-center gap-3 py-2 text-left transition-colors duration-200 ${
                      activeArtist === '' ? 'text-[#0A0A0A]' : 'text-[#0A0A0A]/35 hover:text-[#0A0A0A]/65'
                    }`}
                  >
                    <div className={`w-1 h-1 rounded-full transition-all duration-200 ${activeArtist === '' ? 'bg-[#2D7A6B]' : 'bg-transparent'}`} />
                    <span className="font-mono-label text-[11px]">All Artists</span>
                  </button>
                  {artists.map(a => (
                    <button
                      key={a.id}
                      onClick={() => setActiveArtist(a.id)}
                      className={`flex items-center gap-3 py-2 text-left transition-colors duration-200 ${
                        activeArtist === a.id ? 'text-[#0A0A0A]' : 'text-[#0A0A0A]/35 hover:text-[#0A0A0A]/65'
                      }`}
                    >
                      <div className={`w-1 h-1 rounded-full transition-all duration-200 ${activeArtist === a.id ? 'bg-[#2D7A6B]' : 'bg-transparent'}`} />
                      <span className="font-mono-label text-[11px]">{a.name}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right: uploader */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <MediaUploader
              key={`${activeCategory}-${activeArtist}`}
              category={activeCategory}
              artistId={activeArtist || undefined}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
