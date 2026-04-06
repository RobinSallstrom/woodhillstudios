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

## Future
- [ ] Replace placeholder artist portrait images with real photos
- [ ] Add lightbox for portfolio images
- [ ] Connect contact form to email service (Resend/Formspree)
- [ ] Add image management to individual artist pages (pull from storage.list)
