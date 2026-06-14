export type CocoEmotion = 'happy' | 'curious' | 'sad' | 'excited' | 'proud' | 'calm';

export interface SdgZone {
  id: number;
  sdgNumber: string;
  title: string;
  action: string;
  color: string;
  theme: string;
  yRange: [number, number]; // Percentage range of scrolling through section
}

export interface ProductItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  rotation: number;
  scale: number;
  x: string; // horizontal percentage position on worktable
  y: string; // vertical percentage position on worktable
  svgType: 'bowl' | 'candle' | 'earrings' | 'keychain' | 'kit' | 'pendant';
}

export interface CollabNode {
  id: string;
  label: string;
  tier: 1 | 2 | 3;
  type: string;
  description: string;
  x: number; // percentage coordinate in container
  y: number; // percentage coordinate in container
  color: string;
}

export const SDG_ZONES: SdgZone[] = [
  {
    id: 1,
    sdgNumber: "SDG 15",
    title: "Life on Land",
    action: "Sourcing 100% natural, biodegradable discarded agricultural waste, completely replacing plastic inputs.",
    color: "#4A6741", // deep leaf green
    theme: "#1A1008", // dark earth
    yRange: [0, 16],
  },
  {
    id: 2,
    sdgNumber: "SDG 12",
    title: "Responsible Consumption & Production",
    action: "Upcycling regional restaurant and wholesale coconut waste into beautiful utility design pieces.",
    color: "#D4A843", // golden amber
    theme: "#2A180E",
    yRange: [16, 33],
  },
  {
    id: 3,
    sdgNumber: "SDG 13",
    title: "Climate Action",
    action: "Diverting thousands of empty shells from open-air burning, which heavily reduces local carbon emissions.",
    color: "#8AAF6E", // fresh leaf green
    theme: "#132310",
    yRange: [33, 50],
  },
  {
    id: 4,
    sdgNumber: "SDG 10",
    title: "Reduced Inequalities",
    action: "Sponsoring skill development and stable self-employment directly for marginalized Irular families.",
    color: "#C4894F", // shell mid
    theme: "#382012",
    yRange: [50, 66],
  },
  {
    id: 5,
    sdgNumber: "SDG 8",
    title: "Decent Work & Economic Growth",
    action: "Generating steady, dignified fair-wage supplemental income opportunities for tribal craftswomen.",
    color: "#2A6B72", // ocean depth teal
    theme: "#132D30",
    yRange: [66, 83],
  },
  {
    id: 6,
    sdgNumber: "SDG 5",
    title: "Gender Equality",
    action: "Providing economic independence, training, and leadership mentorship strictly to Irular tribal women.",
    color: "#D4A843",
    theme: "#1A0F06",
    yRange: [83, 100],
  },
];

export const PRODUCTS: ProductItem[] = [
  {
    id: "bowl",
    name: "Coconut Shell Bowl",
    tagline: "Eco-luxury Tableware",
    description: "Sanded fine, polished with organic virgin coconut oil for everyday natural serving.",
    rotation: -5,
    scale: 0.95,
    x: "15%",
    y: "40%",
    svgType: 'bowl',
  },
  {
    id: "candle",
    name: "Scented Candle",
    tagline: "Soy-Wax Infusion",
    description: "Hand-poured aromatic coconut-soy wax in a halved rustic shell with a crackling wood wick.",
    rotation: 12,
    scale: 1.05,
    x: "32%",
    y: "25%",
    svgType: 'candle',
  },
  {
    id: "earrings",
    name: "Shell Earrings",
    tagline: "Bohemian Filigree Jewellery",
    description: "Delicately carved leafy geometries showing the intricate dark grains of seasoned shell.",
    rotation: -20,
    scale: 0.8,
    x: "48%",
    y: "55%",
    svgType: 'earrings',
  },
  {
    id: "keychain",
    name: "Inara Keychain",
    tagline: "Minimal Shell Charm",
    description: "Laser cut circular coin charm showcasing the organic, earthy polished dark patterns.",
    rotation: 25,
    scale: 0.85,
    x: "62%",
    y: "35%",
    svgType: 'keychain',
  },
  {
    id: "kit",
    name: "Artisan Workshop Kit",
    tagline: " experiential Eco-DIY",
    description: "A gorgeous curated starter pack with organic wax, string, sandpaper, and a guide card.",
    rotation: 3,
    scale: 1.1,
    x: "82%",
    y: "30%",
    svgType: 'kit',
  },
  {
    id: "pendant",
    name: "Inara Leaf Pendant",
    tagline: "Earthy Adornments",
    description: "Draped beautifully on natural braided flax twine, capturing Kalpakkam's rich coastal soul.",
    rotation: -10,
    scale: 0.9,
    x: "93%",
    y: "58%",
    svgType: 'pendant',
  },
];

export const COLLAB_NODES: CollabNode[] = [
  {
    id: "inara",
    label: "Project Inara",
    tier: 1,
    type: "Origin Initiative",
    description: "Enactus VIT Chennai skill empowerment network",
    x: 50,
    y: 50,
    color: "#C4894F",
  },
  {
    id: "jasbeer",
    label: "Jasbeer & Aman",
    tier: 1,
    type: "Co-creation Partner",
    description: "Premium handcrafted coconut earring designers",
    x: 34,
    y: 35,
    color: "#D4A843",
  },
  {
    id: "craftofcoco",
    label: "Craft of Coco",
    tier: 1,
    type: "Artisan Lab",
    description: "Specialist designers of artistic shell earrings",
    x: 65,
    y: 62,
    color: "#D4A843",
  },
  {
    id: "sindhu",
    label: "Sindhu Coir Industries",
    tier: 1,
    type: "Material Network",
    description: "Supplier of rich organic coir & husk fibers",
    x: 53,
    y: 24,
    color: "#2A6B72",
  },
  {
    id: "eco_society",
    label: "Eco Society India",
    tier: 2,
    type: "NGO Partner",
    description: "Sustainability education and regional green projects",
    x: 21,
    y: 54,
    color: "#4A6741",
  },
  {
    id: "namma_ooru",
    label: "Namma Ooru Foundation",
    tier: 2,
    type: "NGO Partner",
    description: "Leading regional waste segregation & recycling advocacy",
    x: 78,
    y: 32,
    color: "#4A6741",
  },
  {
    id: "aram_thinai",
    label: "Aram Thinai",
    tier: 2,
    type: "NGO Partner",
    description: "Climate resilience and coastal livelihood empowerment",
    x: 32,
    y: 68,
    color: "#4A6741",
  },
  {
    id: "exnora",
    label: "ExNoRa International",
    tier: 2,
    type: "NGO Partner",
    description: "Community waste management campaigns and advocacy",
    x: 68,
    y: 18,
    color: "#4A6741",
  },
  {
    id: "cocoboo",
    label: "Cocoboo / Coco Soul",
    tier: 3,
    type: "Future Showcase",
    description: "Coconut shell home decor and organic kitchenware",
    x: 15,
    y: 22,
    color: "#8AAF6E",
  },
  {
    id: "better_india",
    label: "Better India Store",
    tier: 3,
    type: "Future Showcase",
    description: "Pan-India ethical marketplace representation",
    x: 88,
    y: 48,
    color: "#8AAF6E",
  },
  {
    id: "industree",
    label: "Industree Crafts",
    tier: 3,
    type: "Future Showcase",
    description: "Global design mentorship & livelihood scaling",
    x: 84,
    y: 75,
    color: "#8AAF6E",
  },
  {
    id: "fabindia",
    label: "Fabindia CSR",
    tier: 3,
    type: "Future Scale",
    description: "Premium retail listing & livelihood foundation scale",
    x: 18,
    y: 78,
    color: "#8AAF6E",
  },
];
