# Woodhill Studios — TODO

## Core Site
- [x] Homepage with hero, work grid, manifesto strip
- [x] Artists roster page with portrait cards and hover reveals
- [x] Individual artist detail pages with bio + portfolio grid
- [x] About page with split layout, disciplines stats, gallery
- [x] Contact page with brutalist form
- [x] 404 Not Found page
- [x] Fixed sidebar navigation (desktop) + hamburger menu (mobile)
- [x] Custom trailing cursor
- [x] Marquee ticker strip
- [x] Framer Motion page transitions

## Full-Stack Upgrade
- [x] Upgrade to full-stack (Express + tRPC + Drizzle + MySQL)
- [x] Database schema: users + media_files tables
- [x] S3 storage helpers (storagePut / storageGet)
- [x] tRPC procedures: storage.upload, storage.list, storage.delete
- [x] MediaUploader component (drag-and-drop, progress, file library)
- [x] Media Manager admin page at /media (auth-gated)
- [x] Media nav link in sidebar
- [x] Vitest tests for storage procedures (4/4 passing)

## Redesign (approved)
- [x] Update global CSS: off-white #F2EFE9 bg, black #0A0A0A text, teal #2D7A6B accent, 7% film grain overlay
- [x] Update Google Fonts: Anton (hero), Bebas Neue (headings), DM Sans (body), Space Mono (mono)
- [x] Rewrite all page copy: casual, grounded, sarcastic tone
- [x] Homepage: full-screen video hero (Twin Peaks mist/trees placeholder), centered all-caps ANTON title
- [x] Cursor displacement effect on hero video (canvas B&W+grain on mouse move, fade on stop)
- [x] Optical distortion warp page transition (on navigation only, not scroll)
- [x] Lightbox for portfolio images (fullscreen, keyboard nav, swipe, ESC, film grain bg)
- [x] Update Navigation: bright theme, teal active dot
- [x] Update Artists, About, Contact pages to new palette
- [x] Update CustomCursor to work on light background
- [x] Update MarqueeStrip to new palette

## Future (requires user content / external credentials)
- [ ] Replace placeholder artist portrait images with real photos
- [ ] Add lightbox for portfolio images
- [ ] Connect contact form to email service (Resend/Formspree)
- [ ] Add image management to individual artist pages (pull from storage.list)
