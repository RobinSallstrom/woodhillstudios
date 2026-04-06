// Navigation — single-page anchor scroll nav
// Fixed top bar, off-white/teal palette
// Bebas Neue logo, Space Mono links

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Artists', href: '#artists' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ['about', 'artists', 'contact'];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection('');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const el = document.getElementById(href.slice(1));
      if (el) el.scrollIntoView({ behavior: 'smooth' });
      setMobileOpen(false);
    }
  };

  return (
    <>
      {/* Top bar */}
      <header
        className="fixed top-0 left-0 right-0 z-[9990] transition-all duration-400"
        style={{
          background: scrolled ? 'rgba(242,239,233,0.93)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(10,10,10,0.07)' : '1px solid transparent',
        }}
      >
        <div
          className="max-w-[1200px] mx-auto flex items-center justify-between"
          style={{ padding: '0 1.5rem', height: '64px' }}
        >
          {/* Logo */}
          <a
            href="/"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '1.1rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: scrolled ? '#0A0A0A' : '#F2EFE9',
              transition: 'color 0.3s ease',
              textDecoration: 'none',
              cursor: 'none',
            }}
          >
            Woodhill Studios
          </a>

          {/* Desktop links */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map(link => {
              const sectionId = link.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleAnchorClick(e, link.href)}
                  style={{
                    fontFamily: "'Space Mono', monospace",
                    fontSize: '0.65rem',
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: scrolled
                      ? isActive ? '#2D7A6B' : 'rgba(10,10,10,0.45)'
                      : isActive ? '#2D7A6B' : 'rgba(242,239,233,0.5)',
                    textDecoration: 'none',
                    cursor: 'none',
                    transition: 'color 0.25s ease',
                    position: 'relative' as const,
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: -3,
                        left: 0,
                        right: 0,
                        height: 1,
                        background: '#2D7A6B',
                      }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              cursor: 'none',
              color: scrolled ? '#0A0A0A' : '#F2EFE9',
              background: 'none',
              border: 'none',
            }}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[9989] flex flex-col items-center justify-center"
          style={{ background: '#0A0A0A' }}
        >
          <nav className="flex flex-col items-center gap-10">
            {NAV_LINKS.map(link => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleAnchorClick(e, link.href)}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '3.5rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: '#F2EFE9',
                  cursor: 'none',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#2D7A6B')}
                onMouseLeave={e => (e.currentTarget.style.color = '#F2EFE9')}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div
            style={{
              position: 'absolute',
              bottom: '2.5rem',
              fontFamily: "'Space Mono', monospace",
              fontSize: '0.58rem',
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'rgba(242,239,233,0.18)',
            }}
          >
            Exotic Lifestyle
          </div>
        </div>
      )}
    </>
  );
}
