# Woodhill Studios Website — Session Handoff (2026-08-30)

## Where things stand

The site is a **pure static frontend** (Vite + React, long-scroll single page:
Hero → About → Artists → Contact) and is **deployed on Vercel**, project
`woodhillstudios` under robinsallstroms-projects. The deployment URL is behind
Vercel's login (deployment protection) — only Robin sees it. No domain yet.

Latest deploy: https://woodhillstudios-6o0lg0dy9-robinsallstroms-projects.vercel.app

## What happened this session

1. **Recovered the project.** The local folder was an empty `git init`; the real
   code lived on GitHub (`RobinSallstrom/woodhillstudios`, built on Manus in
   April 2026). Reconnected local → remote and pulled it down.
2. **Stripped the Manus backend (Robin's "Path A" decision).** Removed the
   Express/tRPC/MySQL/S3 server, Manus runtime plugins, auth, media manager,
   wouter patch, and unused legacy pages. ~13,000 lines deleted. All content is
   hardcoded in the frontend; nothing external remains except Google Fonts.
3. **Content pass:**
   - Contact form → opens visitor's mail app, targets **info.woodhill@gmail.com**
     (`CONTACT_EMAIL` in `client/src/pages/Home.tsx`)
   - Hero video → Robin's `uturtradet.mp4` (4:49 studio montage), compressed to
     15MB 720p muted at `client/public/hero.mp4`. Raw 37MB source in `media/`
     (git-ignored).
   - Artist images → inline SVG **palette-gradient placeholders** generated in
     `client/src/lib/artists.ts` (teal/charcoal/sage/sand/rust). Real photos
     later replace them in that same file.

## ⚠️ Not pushed to GitHub

Four local commits (`abc17a7`, `e6e487a`, `7b56a78`, + this handoff) are **not
pushed** — Robin hasn't said to push yet. First thing next session: ask, then
`git push` (repo is public; GitHub still shows the old Manus full-stack version).
Note: GitHub account must be RobinSallstrom (`/private` command switches).

## Next steps (also in todo.md)

1. Real artist portraits + portfolio images (candidates: Synology
   `02_Internal/DOKUMENTERING/` Woodhill folders) → `client/public/`, wire in
   `artists.ts`
2. **Roster mismatch:** `artists.ts` has 9 artists, About copy says "13" — ask
   Robin which is right
3. Social links on artist cards
4. Domain + flip deployment protection off when content is real
5. Optional: contact form upgrade from mailto → Resend + Vercel function

## Working on it

- `pnpm dev` → http://localhost:3000 (binds all interfaces; IPv4+IPv6)
- `pnpm check` (tsc) and `pnpm build` both pass clean as of this commit
- Deploy: `vercel deploy --yes` (preview) / `vercel deploy --prod` when ready
- Chrome-extension screenshots of localhost failed all session (extension
  permission issue, not the site) — verify visually by opening the browser
  yourself or checking the Vercel URL
