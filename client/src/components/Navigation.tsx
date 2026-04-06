// Navigation — Woodhill Studios
// Fixed left sidebar on desktop, top bar + overlay on mobile
// Uses WebGL transition context for page navigation

import { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTransition } from '../App';

const navLinks = [
  { href: '/', label: 'Work' },
  { href: '/artists', label: 'Artists' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/media', label: 'Media' },
];

export default function Navigation() {
  const [location, setLocation] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { triggerTransition } = useTransition();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const handleNavClick = useCallback((e: React.MouseEvent, href: string) => {
    e.preventDefault();
    // Don't transition if already on this page
    if (location === href) return;

    // Build a quick off-white + grain snapshot
    const canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    let snapshot: string | null = null;

    if (ctx) {
      ctx.fillStyle = '#F2EFE9';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * 20;
        data[i] = Math.max(0, Math.min(255, data[i] + noise));
        data[i + 1] = Math.max(0, Math.min(255, data[i + 1] + noise));
        data[i + 2] = Math.max(0, Math.min(255, data[i + 2] + noise));
      }
      ctx.putImageData(imageData, 0, 0);
      snapshot = canvas.toDataURL('image/jpeg', 0.85);
    }

    triggerTransition(snapshot, () => setLocation(href));
  }, [location, triggerTransition, setLocation]);

  return (
    <>
      {/* ── Desktop Sidebar ── */}
      <nav className="fixed left-0 top-0 h-full w-[200px] z-50 hidden lg:flex flex-col justify-between py-10 px-8 border-r border-[#0A0A0A]/08 bg-[#F2EFE9]">
        {/* Logo */}
        <div>
          <a href="/" onClick={(e) => handleNavClick(e, '/')} className="block mb-16 cursor-pointer group">
            <div className="font-mono-label text-[10px] text-[#0A0A0A]/30 mb-1 tracking-[0.25em]">Stockholm</div>
            <div className="font-heading text-[15px] tracking-[0.08em] uppercase leading-tight text-[#0A0A0A] group-hover:text-[#2D7A6B] transition-colors duration-300">
              Woodhill<br />Studios
            </div>
          </a>

          {/* Nav links */}
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = location === link.href || (link.href !== '/' && location.startsWith(link.href));
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="flex items-center gap-3 py-2 group cursor-pointer no-underline"
                >
                  {/* Active / hover dot */}
                  <div
                    className="w-1.5 h-1.5 rounded-full bg-[#2D7A6B] transition-all duration-300 flex-shrink-0"
                    style={{ opacity: isActive ? 1 : 0, transform: isActive ? 'scale(1)' : 'scale(0.5)' }}
                  />
                  <span
                    className={`font-mono-label text-[11px] tracking-[0.18em] transition-colors duration-300 ${
                      isActive
                        ? 'text-[#0A0A0A]'
                        : 'text-[#0A0A0A]/35 group-hover:text-[#0A0A0A]/70'
                    }`}
                  >
                    {link.label}
                  </span>
                </a>
              );
            })}
          </div>
        </div>

        {/* Footer tagline */}
        <div>
          <div className="w-8 h-px bg-[#2D7A6B] mb-4" />
          <p className="font-mono-label text-[9px] text-[#0A0A0A]/25 leading-relaxed">
            Exotic<br />Lifestyle.
          </p>
        </div>
      </nav>

      {/* ── Mobile Top Bar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 lg:hidden flex items-center justify-between px-6 py-4 transition-all duration-300 ${
          scrolled || mobileOpen
            ? 'bg-[#F2EFE9]/95 backdrop-blur-sm border-b border-[#0A0A0A]/08'
            : 'bg-transparent'
        }`}
      >
        <a href="/" onClick={(e) => handleNavClick(e, '/')} className="no-underline">
          <span className="font-heading text-[14px] tracking-[0.1em] uppercase text-[#0A0A0A]">
            Woodhill Studios
          </span>
        </a>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-[#0A0A0A] p-1"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* ── Mobile Menu Overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 lg:hidden bg-[#F2EFE9]/98 backdrop-blur-md flex flex-col items-center justify-center gap-8"
          >
            {navLinks.map((link, i) => {
              const isActive = location === link.href || (link.href !== '/' && location.startsWith(link.href));
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className="no-underline"
                  >
                    <span
                      className={`font-heading text-5xl tracking-tight transition-colors duration-200 ${
                        isActive ? 'text-[#2D7A6B]' : 'text-[#0A0A0A] hover:text-[#2D7A6B]'
                      }`}
                    >
                      {link.label}
                    </span>
                  </a>
                </motion.div>
              );
            })}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-mono-label text-[10px] text-[#0A0A0A]/25 mt-8"
            >
              Exotic Lifestyle.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
