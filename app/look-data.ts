const A = `${import.meta.env.BASE_URL}fr`;

export const LOOKS_PATH = `${import.meta.env.BASE_URL}looks/`;

export type Look = {
  id: string;
  title: string;
  searchTerm: string;
  image: string;
  alt: string;
  copy: string;
  pieces: string[];
  tone: "light" | "warm" | "dark" | "jewel";
};

export const looks: Look[] = [
  {
    id: "quiet-luxury-workday",
    title: "The Quiet-Luxury Workday",
    searchTerm: "work tote outfit",
    image: `${A}/lifestyle/look-bag-scarf-white.webp`,
    alt: "Woman in a white shirt wearing layered jewellery beside a woven bag with a floral scarf",
    copy: "A useful tote, fine layered jewellery and a soft scarf detail for polished everyday dressing.",
    pieces: ["Work tote", "Layered jewellery", "Floral scarf"],
    tone: "light",
  },
  {
    id: "scarf-on-the-bag",
    title: "The Scarf-on-the-Bag Look",
    searchTerm: "scarf tied on handbag",
    image: `${A}/lifestyle/look-scarf-on-bag.webp`,
    alt: "Woman carrying a taupe top-handle bag styled with a green patterned scarf and gold jewellery",
    copy: "A printed scarf becomes the colour note on a structured leather handbag, finished with warm gold.",
    pieces: ["Top-handle bag", "Patterned scarf", "Gold pendant"],
    tone: "jewel",
  },
  {
    id: "statement-gemstone",
    title: "The Statement Gemstone Look",
    searchTerm: "statement gemstone jewellery",
    image: `${A}/lifestyle/look-statement-gemstone.webp`,
    alt: "Close-up of a woman wearing an agate pendant and sculptural gold rings",
    copy: "Natural colour and confident scale, balanced by a quiet bag and an unfussy scarf.",
    pieces: ["Gemstone pendant", "Sculptural rings", "Neutral scarf"],
    tone: "dark",
  },
  {
    id: "gold-and-cashmere",
    title: "Everyday Gold & Cashmere",
    searchTerm: "gold jewellery with scarf outfit",
    image: `${A}/lifestyle/look-gold-scarf.webp`,
    alt: "Woman wearing layered gold jewellery with an ivory scarf",
    copy: "Soft ivory cashmere with warm, layered gold for a relaxed look that still feels considered.",
    pieces: ["Ivory scarf", "Gold hoops", "Layered pendant"],
    tone: "warm",
  },
  {
    id: "neutral-cashmere",
    title: "The Neutral Cashmere Wrap",
    searchTerm: "cashmere scarf outfit women",
    image: `${A}/lifestyle/look-cashmere-neutral.webp`,
    alt: "Woman wearing a camel cashmere wrap with minimal jewellery",
    copy: "A generous neutral wrap, one sculptural cuff and a restrained ring stack.",
    pieces: ["Cashmere wrap", "Statement cuff", "Minimal rings"],
    tone: "warm",
  },
  {
    id: "suede-weekend",
    title: "The Suede Weekend",
    searchTerm: "suede shoulder bag outfit",
    image: `${A}/editorial/hero-women-fashion-lifestyle.webp`,
    alt: "Woman wearing a neutral scarf and carrying a suede shoulder bag",
    copy: "Soft suede and relaxed layers for coffee runs, weekends away and every plan in between.",
    pieces: ["Suede shoulder bag", "Neutral scarf", "Diamond hoops"],
    tone: "warm",
  },
  {
    id: "layered-gemstones",
    title: "The Layered Gemstone Edit",
    searchTerm: "layered gemstone necklaces",
    image: `${A}/editorial/jewellery-lifestyle.webp`,
    alt: "Close-up of a woman wearing layered gemstone necklaces and rings",
    copy: "Fine chains, individual stones and an easy mix of proportions made for everyday layering.",
    pieces: ["Gemstone charms", "Fine chains", "Stacking rings"],
    tone: "light",
  },
  {
    id: "cashmere-commute",
    title: "The Cashmere Commute",
    searchTerm: "cashmere scarf work outfit",
    image: `${A}/editorial/scarf-lifestyle.webp`,
    alt: "Woman outdoors wearing a generous neutral scarf with a dark coat",
    copy: "A substantial scarf, a hands-free bag and small jewellery that moves easily from commute to dinner.",
    pieces: ["Merino-cashmere scarf", "Crossbody bag", "Small hoops"],
    tone: "dark",
  },
  {
    id: "merlot-colour-note",
    title: "The Merlot Colour Note",
    searchTerm: "red scarf neutral outfit",
    image: `${A}/drive/scarf-1.webp`,
    alt: "Woman styling a merlot scarf over a tonal neutral outfit",
    copy: "A single saturated scarf changes a neutral wardrobe without changing its point of view.",
    pieces: ["Merlot scarf", "Dark hobo bag", "Diamond studs"],
    tone: "jewel",
  },
  {
    id: "winter-white",
    title: "The Winter-White Layer",
    searchTerm: "ivory scarf outfit",
    image: `${A}/drive/scarf-4.webp`,
    alt: "Woman wearing an ivory scarf with an all-neutral outfit",
    copy: "Tonal ivory, clean jewellery and a softly structured leather bag for a calm, polished finish.",
    pieces: ["Ivory scarf", "Leather hobo", "Diamond pendant"],
    tone: "light",
  },
];

