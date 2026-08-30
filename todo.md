# Woodhill Studios — TODO

## Architecture (2026-08-30)
Stripped to a pure static frontend (Path A). The Manus backend (Express + tRPC +
MySQL + S3 media manager) was removed — it only worked on Manus's hosting and the
public site never needed it. All content lives in the repo; deploys on Vercel.

## Remaining — needs Robin's content/decisions
- [ ] Replace gradient placeholders with real artist portraits + portfolio work —
      images go in `client/public/`, referenced from `client/src/lib/artists.ts`
- [ ] Add social/external links to artist cards (Spotify, Instagram, Behance…)
- [ ] Domain — point a real domain at the Vercel project when ready
- [ ] Optional: upgrade contact form from mailto to invisible sending
      (form service or Vercel function + Resend)
- [ ] Roster check — artists.ts lists 9 artists but the About copy says 13

## Completed
- [x] Contact email set to info.woodhill@gmail.com (mailto-based form) (2026-08-30)
- [x] Hero footage: uturtradet loop → compressed `client/public/hero.mp4` (2026-08-30)
- [x] Palette-gradient placeholders replace all Unsplash/Manus-CDN images (2026-08-30)
- [x] Underground Cinema design → off-white/teal long-scroll redesign (April 2026)
- [x] Single long-scroll page: Hero → About → Artists → Contact
- [x] Artist accordion, lightbox, custom cursor, film grain, char-reveal hero
- [x] Strip Manus backend; frontend-only Vite build; Vercel-ready (2026-08-30)
