# Woodhill Studios — Design Brainstorm

## Approach 1 — "Raw Concrete Gallery"
<response>
<text>
**Design Movement:** Brutalist Digital / New Wave Gallery

**Core Principles:**
- Uncompromising rawness — thick borders, stark contrast, zero decoration
- Asymmetric tension — elements deliberately off-balance to create energy
- Typography as architecture — type is a structural element, not just labels
- Monochrome dominance broken by single vivid accent

**Color Philosophy:**
- Background: near-black `#080808`
- Text: stark white `#F5F5F5`
- Accent: electric lime `#C8FF00` used sparingly on hover and active states
- Muted: `#2A2A2A` for dividers and secondary surfaces

**Layout Paradigm:**
- Horizontal scrolling sections for the work grid
- Oversized serif numerals labeling each section
- Full-bleed images with text overlaid at extreme corners

**Signature Elements:**
- Thick 1px white rule lines used as separators
- Oversized stencil-style numbering
- Cursor-following spotlight effect on hover

**Interaction Philosophy:**
- Clicks feel mechanical — instant, no easing
- Hover reveals are abrupt and confident

**Animation:**
- Text splits and slides in from opposite sides on load
- Image reveals use a wipe/clip-path animation

**Typography System:**
- Heading: `Bebas Neue` — all caps, ultra-condensed
- Body: `Space Mono` — monospaced, technical feel
</text>
<probability>0.07</probability>
</response>

## Approach 2 — "Underground Cinema" ✅ SELECTED
<response>
<text>
**Design Movement:** Dark Cinematic / European Underground Art House

**Core Principles:**
- Cinematic darkness — the site feels like a film still, not a webpage
- Editorial tension — large type collides with imagery in unexpected ways
- Grain and texture — nothing is perfectly clean; everything has character
- Motion as storytelling — every transition has a narrative purpose

**Color Philosophy:**
- Background: true black `#050505`
- Text: warm off-white `#E8E0D5` — feels like aged paper, not sterile white
- Accent: muted rust/terracotta `#C4622D` — warm, underground, earthy
- Secondary: deep charcoal `#111111` for card surfaces
- Highlight: pure white `#FFFFFF` for maximum contrast moments

**Layout Paradigm:**
- Left-aligned vertical navigation (fixed sidebar on desktop)
- Staggered asymmetric grid for the work section — no uniform columns
- Full-viewport hero with oversized type that breaks the frame
- Generous negative space punctuated by bold typographic statements

**Signature Elements:**
- Film-grain CSS texture overlay on the entire site (subtle noise)
- Oversized italic serif display type that bleeds off-screen
- Thin horizontal rules with small caps labels

**Interaction Philosophy:**
- Smooth but deliberate — 600ms ease transitions
- Image hover: desaturation lifts, subtle scale, artist name fades in
- Navigation: active state uses a small filled circle indicator

**Animation:**
- Page transitions: content fades + slight Y-translate upward
- Hero text: characters stagger in with Framer Motion
- Work grid: items reveal sequentially on scroll (staggered fade-up)

**Typography System:**
- Display: `Playfair Display` italic — editorial, dramatic, cinematic
- Heading: `Barlow Condensed` bold — industrial, strong
- Body: `DM Sans` — clean, modern, readable
- Mono accent: `Space Mono` for labels and metadata
</text>
<probability>0.09</probability>
</response>

## Approach 3 — "Glitch Zine"
<response>
<text>
**Design Movement:** Post-Internet / Glitch Art / Digital Zine

**Core Principles:**
- Controlled chaos — deliberate misalignment and overlap
- Digital artifacts as decoration — glitch effects, scan lines, RGB splits
- Layered collage aesthetic — elements stack and overlap
- Anti-grid — content refuses to sit in neat rows

**Color Philosophy:**
- Background: very dark navy `#050810`
- Primary text: white
- Accent 1: neon cyan `#00FFFF`
- Accent 2: hot magenta `#FF00AA`
- Used in RGB-split glitch effects

**Layout Paradigm:**
- Overlapping z-index layers — images behind text behind images
- Rotated elements at ±2–5 degrees
- Marquee scrolling text strips between sections

**Signature Elements:**
- RGB channel split on hover for images
- Scanline overlay texture
- Marquee ticker strips

**Interaction Philosophy:**
- Hover triggers glitch animation — brief RGB split and flicker
- Clicks cause a brief screen flash

**Animation:**
- Glitch keyframe animation on hero title
- Scanline sweep on page load

**Typography System:**
- Display: `VT323` — retro terminal
- Body: `IBM Plex Mono`
</text>
<probability>0.05</probability>
</response>

---

## Selected Approach: **"Underground Cinema"**

Dark cinematic editorial aesthetic. Black background, warm off-white text, rust accent. Playfair Display italic for drama, Barlow Condensed for strength, DM Sans for body. Fixed left sidebar nav, staggered asymmetric work grid, film-grain texture, Framer Motion staggered reveals.
