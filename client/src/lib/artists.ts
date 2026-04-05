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

// Unsplash images used for artist cards and portfolios (dark, cinematic, editorial)
const UNSPLASH = {
  graffiti1: 'https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?w=800&q=80',
  graffiti2: 'https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?w=800&q=80',
  graffiti3: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80',
  graffiti4: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  music1: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80',
  music2: 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=800&q=80',
  music3: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
  digital1: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&q=80',
  digital2: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
  digital3: 'https://images.unsplash.com/photo-1555680202-c86f0e12f086?w=800&q=80',
  film1: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80',
  film2: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80',
  film3: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80',
  painting1: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80',
  painting2: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&q=80',
  painting3: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&q=80',
  illustration1: 'https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=800&q=80',
  illustration2: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=800&q=80',
  dark1: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80',
  dark2: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80',
  studio1: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80',
  portrait1: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
  portrait2: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80',
  portrait3: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&q=80',
  portrait4: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80',
  portrait5: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80',
  portrait6: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&q=80',
  portrait7: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&q=80',
  portrait8: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=600&q=80',
  portrait9: 'https://images.unsplash.com/photo-1463453091185-61582044d556?w=600&q=80',
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

// Work grid items for homepage
export const workItems = [
  { id: 1, image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663511118461/B2SuVb2ndJDsVHLccsDb5D/wh-work1-MX6YxD94qdFzarsPDLKhbi.webp', title: 'Urban Murals', artist: 'Kiss', category: 'Graffiti', span: 'tall' },
  { id: 2, image: 'https://d2xsxph8kpxj0f.cloudfront.net/310519663511118461/B2SuVb2ndJDsVHLccsDb5D/wh-work2-cdqidjFYwmEunLgeBcai9u.png', title: 'Nocturnal Sessions', artist: 'Kid Quatro', category: 'Music', span: 'tall' },
  { id: 3, image: UNSPLASH.digital1, title: 'Radiant Series', artist: 'Robin Sällström', category: 'Visual Art', span: 'wide' },
  { id: 4, image: UNSPLASH.film1, title: 'Documentary Cut', artist: 'Simon Forsberg', category: 'Film', span: 'normal' },
  { id: 5, image: UNSPLASH.painting1, title: 'Canvas Studies', artist: 'Hannes Backlund', category: 'Painting', span: 'normal' },
  { id: 6, image: UNSPLASH.graffiti2, title: 'Street Chronicles', artist: 'Otres', category: 'Graffiti', span: 'normal' },
  { id: 7, image: UNSPLASH.illustration1, title: 'Analog Compositions', artist: 'Luciana Amado', category: 'Illustration', span: 'wide' },
  { id: 8, image: UNSPLASH.music1, title: 'Audio Journeys', artist: 'Robin Carlheim-Müller', category: 'Sound', span: 'normal' },
];
