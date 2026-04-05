// Navigation — Underground Cinema Design System
// Fixed left sidebar on desktop, top bar on mobile
// Accent: rust #C4622D | Font: Barlow Condensed + Space Mono

import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Work' },
  { href: '/artists', label: 'Artists' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  { href: '/media', label: 'Media' },
];

export default function Navigation() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="fixed left-0 top-0 h-full w-[200px] z-50 hidden lg:flex flex-col justify-between py-10 px-8 border-r border-white/5">
        {/* Logo */}
        <div>
          <Link href="/">
            <div className="mb-16 cursor-pointer group">
              <div className="font-mono-label text-[10px] text-white/30 mb-1 tracking-[0.25em]">Stockholm</div>
              <div
                className="text-[13px] font-bold tracking-[0.12em] uppercase leading-tight text-[#E8E0D5] group-hover:text-white transition-colors duration-300"
                style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
              >
                Woodhill<br />Studios
              </div>
            </div>
          </Link>

          {/* Nav links */}
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = location === link.href || (link.href !== '/' && location.startsWith(link.href));
              return (
                <Link key={link.href} href={link.href}>
                  <div className={`nav-item flex items-center gap-3 py-2 group cursor-pointer`}>
                    <div className={`nav-dot transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-60'}`} />
                    <span
                      className={`font-mono-label text-[11px] tracking-[0.18em] transition-colors duration-300 ${
                        isActive ? 'text-[#E8E0D5]' : 'text-white/35 group-hover:text-white/70'
                      }`}
                    >
                      {link.label}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Footer tagline */}
        <div>
          <div className="w-8 h-px bg-[#C4622D] mb-4" />
          <p className="font-mono-label text-[9px] text-white/20 leading-relaxed">
            Exotic<br />Lifestyle.
          </p>
        </div>
      </nav>

      {/* Mobile Top Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 lg:hidden flex items-center justify-between px-6 py-4 transition-all duration-300 ${
          scrolled || mobileOpen ? 'bg-[#050505]/95 backdrop-blur-sm border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <Link href="/">
          <span
            className="text-[13px] font-bold tracking-[0.12em] uppercase text-[#E8E0D5]"
            style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            Woodhill Studios
          </span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-[#E8E0D5] p-1"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-40 lg:hidden bg-[#050505]/98 backdrop-blur-md flex flex-col items-center justify-center gap-8"
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
                  <Link href={link.href}>
                    <span
                      className={`text-4xl font-bold tracking-tight transition-colors duration-200 ${
                        isActive ? 'text-[#C4622D]' : 'text-[#E8E0D5] hover:text-white'
                      }`}
                      style={{ fontFamily: "'Barlow Condensed', sans-serif" }}
                    >
                      {link.label}
                    </span>
                  </Link>
                </motion.div>
              );
            })}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="font-mono-label text-[10px] text-white/25 mt-8"
            >
              Exotic Lifestyle.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
