# Woodhill Studios — TODO

## Architecture (2026-08-30)
Stripped to a pure static frontend (Path A). The Manus backend (Express + tRPC +
MySQL + S3 media manager) was removed — it only worked on Manus's hosting and the
public site never needed it. All content lives in the repo; deploys on Vercel.

## Remaining — needs Robin's content/decisions
- [ ] **Contact email** — `CONTACT_EMAIL` in `client/src/pages/Home.tsx` is a
      placeholder. Set the real address (form opens the visitor's mail app).
      Optional upgrade later: invisible sending via a form service or a tiny
      Vercel function + Resend.
- [ ] **Hero video** — the old Manus CDN link is dead (403). Drop real footage at
      `client/public/hero.mp4` and it appears automatically; until then the hero
      shows on a dark background. Candidate material: Synology
      `02_Internal/DOKUMENTERING/` Woodhill folders.
- [ ] Replace placeholder Unsplash portraits/portfolio images with real work —
      images go in `client/public/`, referenced from `client/src/lib/artists.ts`
- [ ] Add social/external links to artist cards (Spotify, Instagram, Behance…)
- [ ] Domain — point a real domain at the Vercel project when ready

## Completed
- [x] Underground Cinema design → off-white/teal long-scroll redesign (April 2026)
- [x] Single long-scroll page: Hero → About → Artists → Contact
- [x] Artist accordion, lightbox, custom cursor, film grain, char-reveal hero
- [x] Strip Manus backend; frontend-only Vite build; Vercel-ready (2026-08-30)
