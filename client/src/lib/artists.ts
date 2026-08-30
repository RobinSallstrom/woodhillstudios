// Woodhill Studios — Artist Roster Data
// Underground Cinema Design System

export interface Artist {
  id: string;
  name: string;
  discipline: string;
  shortBio: string;
  fullBio: string;
  website?: string;
  portfolioImages: string[];
  coverImage: string;
  tags: string[];
}

// Placeholder gradients in the site palette — swapped for real photos when they land.
// Each is an inline SVG data URI, so nothing is fetched from anywhere.
function grad(stops: string[], angle = 135): string {
  const rad = (angle * Math.PI) / 180;
  const x2 = (50 + Math.sin(rad) * 50).toFixed(1);
  const y2 = (50 - Math.cos(rad) * 50).toFixed(1);
  const stopTags = stops
    .map((color, i) => `<stop offset="${Math.round((i / (stops.length - 1)) * 100)}%" stop-color="${color}"/>`)
    .join('');
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="1000">` +
    `<defs><linearGradient id="g" x1="${(100 - +x2).toFixed(1)}%" y1="${(100 - +y2).toFixed(1)}%" x2="${x2}%" y2="${y2}%">${stopTags}</linearGradient></defs>` +
    `<rect width="800" height="1000" fill="url(#g)"/>` +
    `</svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

// Palette: teal #2D7A6B family, charcoal/black, sage, sand/ochre, muted rust
const UNSPLASH = {
  graffiti1: grad(['#2D7A6B', '#143A32', '#0A0A0A'], 135),
  graffiti2: grad(['#C4622D', '#5C2F17', '#1A1A1A'], 160),
  graffiti3: grad(['#7FA695', '#2D7A6B', '#143A32'], 110),
  graffiti4: grad(['#1A1A1A', '#2D5C52', '#2D7A6B'], 200),
  music1: grad(['#0A0A0A', '#12332C', '#2D7A6B'], 180),
  music2: grad(['#1A1A1A', '#4A2A1A', '#C4622D'], 145),
  music3: grad(['#0A0A0A', '#37474D', '#4A5E66'], 170),
  digital1: grad(['#2D7A6B', '#3E565C', '#4A5E66'], 120),
  digital2: grad(['#4A5E66', '#22303A', '#0A0A0A'], 150),
  digital3: grad(['#A8BFB2', '#7FA695', '#2D7A6B'], 100),
  film1: grad(['#2E2E2E', '#4B463C', '#6B665C'], 165),
  film2: grad(['#0A0A0A', '#1A1A1A', '#2E2E2E'], 180),
  film3: grad(['#6B665C', '#3A362E', '#0A0A0A'], 140),
  painting1: grad(['#D9CBA8', '#C2A66B', '#B98A4A'], 125),
  painting2: grad(['#F2EFE9', '#C9D2C5', '#7FA695'], 105),
  painting3: grad(['#C2A66B', '#B06A3A', '#C4622D'], 155),
  illustration1: grad(['#A8BFB2', '#CFC5A5', '#D9CBA8'], 95),
  illustration2: grad(['#C4622D', '#C99A6A', '#D9CBA8'], 130),
  dark1: grad(['#0A0A0A', '#1A1A1A', '#2E2E2E'], 200),
  dark2: grad(['#2E2E2E', '#37474D', '#4A5E66'], 175),
  studio1: grad(['#0A0A0A', '#143A32', '#2D7A6B'], 190),
  portrait1: grad(['#C9D2C5', '#7FA695'], 135),
  portrait2: grad(['#2D7A6B', '#143A32'], 135),
  portrait3: grad(['#4A5E66', '#22303A'], 135),
  portrait4: grad(['#C4622D', '#5C2F17'], 135),
  portrait5: grad(['#2E2E2E', '#0A0A0A'], 135),
  portrait6: grad(['#B98A4A', '#6B4A26'], 135),
  portrait7: grad(['#7FA695', '#2D7A6B'], 135),
  portrait8: grad(['#6B665C', '#3A362E'], 135),
  portrait9: grad(['#143A32', '#0A0A0A'], 135),
};

export const artists: Artist[] = [
  {
    id: 'otres',
    name: 'Otres',
    discipline: 'Graffiti & Digital Art',
    shortBio: 'Using both traditional and digital mediums to explore what his imaginative world contains.',
    fullBio: 'Using both traditional and digital mediums, and a compass, to explore what his imaginative world contains. It contains graffiti and video games. Mostly video games. Sometimes a canvas, and very rarely a sculpture.',
    portfolioImages: [UNSPLASH.graffiti1, UNSPLASH.graffiti2, UNSPLASH.digital1, UNSPLASH.graffiti3, UNSPLASH.digital2, UNSPLASH.graffiti4],
    coverImage: UNSPLASH.graffiti1,
    tags: ['Graffiti', 'Digital Art', 'Game Dev'],
  },
  {
    id: 'robin-sallstrom',
    name: 'Robin Sällström',
    discipline: 'Visual Art & VFX',
    shortBio: 'Specializes in creating stunning visuals that capture the imagination and leave a lasting impression.',
    fullBio: 'I specialize in creating stunning visuals that capture the imagination and leave a lasting impression. I continually strive to push creative boundaries and explore new technologies, always seeking innovative ways to enhance my craft. With a keen eye for detail, shapes, and color, I\'m committed to achieving the highest possible standard of work for every project.',
    website: 'https://www.robinsallstrom.com',
    portfolioImages: [UNSPLASH.digital1, UNSPLASH.digital2, UNSPLASH.digital3, UNSPLASH.dark1, UNSPLASH.dark2],
    coverImage: UNSPLASH.digital2,
    tags: ['Visual Art', 'VFX', 'Animation'],
  },
  {
    id: 'robin-carlheim-muller',
    name: 'Robin Carlheim-Müller',
    discipline: 'Sound Design & Music Production',
    shortBio: 'Sound designer, mix engineer and music producer with a love for creating juicy auditory journeys.',
    fullBio: 'Sound designer, mix engineer and music producer with a love for creating juicy auditory journeys. With over a decade of expertise in shaping professional audio for various mediums, including film, documentaries, television, and games, he does not shy away from any kind of creative endeavor. At times also wields a brush and canvas to engage the senses beyond sound.',
    portfolioImages: [UNSPLASH.music1, UNSPLASH.music2, UNSPLASH.music3, UNSPLASH.film1, UNSPLASH.painting1],
    coverImage: UNSPLASH.music1,
    tags: ['Sound Design', 'Music Production', 'Film Audio'],
  },
  {
    id: 'luciana-amado',
    name: 'Luciana Amado',
    discipline: 'Illustration & Design',
    shortBio: 'Notoriously prolific artist, designer, illustrator. She combines magic, passion, and striking colors.',
    fullBio: 'Luciana considers herself an atemporal citizen of the world but the truth is, she was born in 1974 in Argentina. Notoriously prolific artist, designer, illustrator, lover and mother. She works with different materials at the same time, starting always with handmade analog compositions, even for the most digital purposes. She combines magic, passion, and striking colors, (the same in her life). Heartfelt, no grays. Based in Stockholm since 2010, she lives with her family in Bandhagen.',
    portfolioImages: [UNSPLASH.illustration1, UNSPLASH.illustration2, UNSPLASH.painting2, UNSPLASH.painting3, UNSPLASH.digital3],
    coverImage: UNSPLASH.illustration1,
    tags: ['Illustration', 'Design', 'Painting'],
  },
  {
    id: 'hannes-backlund',
    name: 'Hannes Backlund',
    discipline: 'Painting',
    shortBio: 'An avid believer in the organic essence of artistry, seeking to capture the innate beauty the world naturally presents.',
    fullBio: 'An avid believer in the organic essence of artistry, Hannes Backlund seeks to capture and display the innate beauty and allure that the world naturally presents. His creative process thrives on the principle that the very act of painting is a conduit for creativity — if one has the desire and willpower, the simple act of a brushstroke can ignite creativity. With a penchant for letting artistry take its own course, Hannes finds joy when the canvas evolves in unexpected ways, almost as if the art itself is guiding the brush.',
    portfolioImages: [UNSPLASH.painting1, UNSPLASH.painting2, UNSPLASH.painting3, UNSPLASH.illustration2],
    coverImage: UNSPLASH.painting2,
    tags: ['Painting', 'Fine Art'],
  },
  {
    id: 'robin-myrdahl',
    name: 'Robin Myrdahl',
    discipline: 'Graffiti & Contemporary Art',
    shortBio: 'A dynamic individual with a vibrant background in graffiti and contemporary art, honing a unique and captivating style.',
    fullBio: 'Stig Börje Robin Myrdahl is a dynamic individual who has pursued a career as an artist and arts and crafts teacher. With a vibrant background in graffiti and contemporary art, he has honed his craft and developed a unique style that is both captivating and inspiring. As an artist and teacher, he brings a wealth of knowledge and creativity to his work, encouraging others to explore their own artistic potential.',
    website: 'https://stigborje.com',
    portfolioImages: [UNSPLASH.graffiti2, UNSPLASH.graffiti3, UNSPLASH.graffiti4, UNSPLASH.painting3, UNSPLASH.graffiti1],
    coverImage: UNSPLASH.graffiti3,
    tags: ['Graffiti', 'Contemporary Art', 'Teaching'],
  },
  {
    id: 'kiss',
    name: 'Kiss',
    discipline: 'Graffiti & Murals',
    shortBio: 'Bold, vibrant, and always pushing the limits. His unique style and dedication have made him a household name.',
    fullBio: 'Bold, vibrant, and always pushing the limits, Kiss is the graffiti artist to keep your eye on. His unique style and dedication to his craft have made him a household name, with fans all over the world. But for Kiss, creating art is not about fame or recognition — it\'s about expressing himself and sharing his vision with others. Whether he\'s working on a large-scale mural or a small canvas piece, he approaches each project with humility and a deep appreciation for the creative process.',
    portfolioImages: [UNSPLASH.graffiti4, UNSPLASH.graffiti1, UNSPLASH.graffiti2, UNSPLASH.graffiti3],
    coverImage: UNSPLASH.graffiti4,
    tags: ['Graffiti', 'Murals', 'Street Art'],
  },
  {
    id: 'simon-forsberg',
    name: 'Simon Forsberg',
    discipline: 'Cinematography & Direction',
    shortBio: 'Multi-talented professional dedicated to creating purposeful content with bold and honest imagery.',
    fullBio: 'Simon is a multi-talented professional with expertise in cinematography, photography, editing, directing, graphic design, and art direction. He\'s dedicated to creating purposeful content that cuts through the noise of the digital world with bold and honest imagery. Simon\'s work reflects his commitment to quality and making a meaningful impact. With his impressive skill set, Simon is uniquely equipped to turn any vision into a reality.',
    website: 'https://www.simonforsberg.com',
    portfolioImages: [UNSPLASH.film1, UNSPLASH.film2, UNSPLASH.film3, UNSPLASH.dark1, UNSPLASH.dark2],
    coverImage: UNSPLASH.film2,
    tags: ['Cinematography', 'Photography', 'Direction'],
  },
  {
    id: 'kid-quatro',
    name: 'Kid Quatro',
    discipline: 'Music Production',
    shortBio: 'An up-and-coming artist and producer. His music is a reflection of his nocturnal lifestyle.',
    fullBio: 'Kid Quatro (born 1996 in Stockholm, Sweden) is an up-and-coming artist and producer, currently living in Berlin, Germany. As a core member of the infamous underground collective Woodhill Studios, based in his hometown, Kid Quatro\'s music is a reflection of his nocturnal lifestyle. His sound is infused with his own unique blend of darkness and melancholy. Working tirelessly through the night, his music is imbued with the eerie energy of the nocturnal world — a haunting and provocative journey through the darkness of his own mind, a testament to his unparalleled creativity.',
    portfolioImages: [UNSPLASH.music2, UNSPLASH.music3, UNSPLASH.dark1, UNSPLASH.dark2, UNSPLASH.music1],
    coverImage: UNSPLASH.music3,
    tags: ['Music Production', 'Electronic', 'Underground'],
  },
];

// Portrait images mapped to artist IDs (for artist cards)
export const artistPortraits: Record<string, string> = {
  'otres': UNSPLASH.portrait9,
  'robin-sallstrom': UNSPLASH.portrait2,
  'robin-carlheim-muller': UNSPLASH.portrait3,
  'luciana-amado': UNSPLASH.portrait4,
  'hannes-backlund': UNSPLASH.portrait1,
  'robin-myrdahl': UNSPLASH.portrait7,
  'kiss': UNSPLASH.portrait6,
  'simon-forsberg': UNSPLASH.portrait8,
  'kid-quatro': UNSPLASH.portrait5,
};
