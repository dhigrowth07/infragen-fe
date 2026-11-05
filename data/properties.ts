export interface PropertyItem {
  id: number;
  title: string;
  location: string;
  description: string;
  category: string;
  badge: string;
  image: string;
}

export const propertiesData: PropertyItem[] = [
  {
    id: 1,
    title: "Greenspace Elite",
    location: "PATTANAM, COIMBATORE",
    description: "DTCP & RERA Approved Gated Layout Plots",
    category: "PLOTS & SITES",
    badge: "DTCP APPROVED",
    image: "/assets/images/plot-layout-1.jpg",
  },
  {
    id: 2,
    title: "Western County",
    location: "KALAPATTI, COIMBATORE",
    description: "Premium Gated Residential Community Plots",
    category: "PLOTS & SITES",
    badge: "RERA APPROVED",
    image: "/assets/images/plot-layout-2.jpg",
  },
  {
    id: 3,
    title: "Urbania Landmark",
    location: "NEELAMBUR, COIMBATORE",
    description: "NH Frontage Commercial & HQ Sites",
    category: "COMMERCIAL SITES",
    badge: "COMMERCIAL",
    image: "/assets/images/plot-layout-3.jpg",
  },
  {
    id: 4,
    title: "Tech View Plots",
    location: "SATHY ROAD, COIMBATORE",
    description: "IT Corridor Approved Layout Sites",
    category: "PLOTS & SITES",
    badge: "IT ZONE",
    image: "/assets/images/land-development.jpg",
  },
  {
    id: 5,
    title: "Avinashi Villa Land",
    location: "AVINASHI ROAD, COIMBATORE",
    description: "Exclusive Luxury Villa Plots",
    category: "VILLAS & HOMES",
    badge: "EXCLUSIVE",
    image: "/assets/images/hero-3.jpg",
  },
  {
    id: 6,
    title: "Sulur Growth Corridor",
    location: "SULUR, COIMBATORE",
    description: "Verified DTCP Approved Investment Land",
    category: "PLOTS & SITES",
    badge: "PRIME LOCATION",
    image: "/assets/images/hero-2.jpg",
  },
];
