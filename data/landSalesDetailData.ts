export interface LandTypeCard {
  id: number;
  title: string;
  badge: string;
  icon: string;
  image: string;
  description: string;
  bullets: string[];
  footerText: string;
}

export interface TrustItem {
  id: number;
  num: string;
  title: string;
  desc: string;
  author: string;
  sub: string;
}

export interface ProcessStep {
  step: number;
  title: string;
  desc: string;
  image: string;
}

export const landSalesDetailData = {
  meta: {
    title: "Land for Sale in Coimbatore | Vizhi Infragen Realtors",
    description:
      "Trusted plots and land for sale in Coimbatore. DTCP approved residential plots, agricultural land, commercial plots and investment parcels with 100% legal verification.",
    keywords: [
      "Land for sale in Coimbatore",
      "DTCP plots Coimbatore",
      "Saravanampatti land",
      "Kalapatti plots",
      "Sulur land sales",
      "Vizhi Infragen",
    ],
  },
  hero: {
    tagline: "VERIFIED REAL ESTATE LISTINGS",
    title: "Land for Sale in",
    titleHighlight: "Coimbatore",
    subtext: "Trusted Plots and Land for Sale in Coimbatore",
    backgroundImage: "/assets/images/land-sales-hero-city.jpg",
  },
  premierDesk: {
    tagBadge: "Premier Land Desk",
    title: "Trusted Plots and Land for Sale in Coimbatore",
    paragraph:
      "If you are searching for land for sale in Coimbatore, Vizhi Infragen Realtors is your reliable local partner. With years of on-ground experience in the Coimbatore real estate market, we help individuals, families, and investors find verified, well-located land parcels that match their budget and long-term goals. Our team personally inspects every listing before it reaches our clients, so when we say we offer genuine, verified plots, we mean land that is legally clear, properly documented, and ready for registration.",
    bentoCards: {
      largeCard: {
        title: "Land Sales",
        subtitle: "Clear Title Plots",
        image: "/assets/images/land-sales-hero-city.jpg",
      },
      smallCard1: {
        title: "DTCP Approved",
        subtitle: "Prime Corridors",
        image: "/assets/images/plot-layout-1.jpg",
      },
      smallCard2: {
        title: "Verified Guidance",
        subtitle: "Due Diligence",
        image: "/assets/images/handshake-deal.jpg",
      },
    },
  },
  whyChoose: {
    tagBadge: "Why Choose Us",
    title: "Why Choose Vizhi Infragen Realtors",
    paragraph1:
      "Coimbatore is one of Tamil Nadu's fastest-growing cities, known for its industrial base, educational institutions, and pleasant climate. Demand for land for sale in Coimbatore has grown steadily as more people look to build homes, start businesses, or invest for future returns. At Vizhi Infragen Realtors, our expertise comes from years of direct dealings across Coimbatore's growth corridors, including areas near Saravanampatti, Kalapatti, Kovaipudur, Sulur, and Neelambur. We understand local land patterns, government approvals, DTCP and RERA norms, and pricing trends better than most, which allows us to guide clients toward informed decisions rather than rushed purchases.",
    paragraph2:
      "Every plot we list goes through a thorough documentation check, including patta verification, encumbrance certificate review, and boundary confirmation. This due diligence process reflects our commitment to trustworthiness, ensuring our clients never face legal surprises after purchase.",
    image3D: "/assets/images/land-sales-3d-new.png",
  },
  landTypes: [
    {
      id: 1,
      title: "Residential Plots",
      badge: "DTCP Approved",
      icon: "fa-house-flag",
      image: "/assets/images/service-1.jpg",
      description:
        "DTCP-approved layouts suitable for building independent homes in fast-growing residential communities across Coimbatore.",
      bullets: [
        "DTCP & RERA Approved Layouts",
        "Ready for Immediate Construction",
      ],
      footerText: "View Residential Inventory",
    },
    {
      id: 2,
      title: "Agricultural Land",
      badge: "Fertile Parcels",
      icon: "fa-wheat-awn",
      image: "/assets/images/plot-layout-1.jpg",
      description:
        "Fertile land parcels on the outskirts of Coimbatore, ideal for farming, organic agro-ventures, or long-term holding.",
      bullets: [
        "Rich Soil & Water Access",
        "High Land Value Appreciation",
      ],
      footerText: "Explore Agro Parcels",
    },
    {
      id: 3,
      title: "Commercial Land",
      badge: "Highway Frontage",
      icon: "fa-building",
      image: "/assets/images/land-sales-commercial-new.png",
      description:
        "Strategic plots near highways, main arteries, and business hubs for shops, godowns, warehouses, or corporate offices.",
      bullets: [
        "Highway & Arterial Frontage",
        "Prime Commercial Footfall",
      ],
      footerText: "Explore Commercial Plots",
    },
    {
      id: 4,
      title: "Investment Plots",
      badge: "High Appreciation",
      icon: "fa-chart-line",
      image: "/assets/images/plot-layout-2.jpg",
      description:
        "Land in upcoming growth zones with strong future appreciation potential along Coimbatore's key expansion corridors.",
      bullets: [
        "Growth Corridor Positioning",
        "Projected High Yield Returns",
      ],
      footerText: "View Growth Corridors",
    },
    {
      id: 5,
      title: "Premium Land Parcels",
      badge: "Gated Layout",
      icon: "fa-crown",
      image: "/assets/images/land-sales-hero-new.png",
      description:
        "Handpicked, high-value plots in prime and gated locations for buyers who want the best of Coimbatore real estate.",
      bullets: [
        "Exclusive Gated Community",
        "24/7 Security & Blacktop Roads",
      ],
      footerText: "Discover Luxury Estates",
    },
    {
      id: 6,
      title: "Custom Land Sourcing",
      badge: "Tailored Inventory",
      icon: "fa-bullseye",
      image: "/assets/images/plot-layout-3.jpg",
      description:
        "Whether you need a small residential plot or a large parcel for commercial development, our current inventory covers areas across the city and surrounding suburbs.",
      bullets: [
        "Tailored Area & Budget Matching",
        "End-to-End Property Sourcing",
      ],
      footerText: "Request Custom Sourcing",
    },
  ] as LandTypeCard[],
  trustworthiness: {
    eyebrow: "TRANSPARENCY GUARANTEE",
    title: "What Makes Our Land Listings Trustworthy",
    leadDesc:
      "Trust is built through transparency, and that is exactly how Vizhi Infragen Realtors operates. When you inquire about our plots, you receive:",
    backgroundImage: "/assets/images/daylight-villa-1.png",
    reputationNote:
      "Our reputation in Coimbatore has been built over years of repeat business and referrals, which speaks to the authority and reliability we bring to every transaction.",
    items: [
      {
        id: 1,
        num: "01",
        title: "Clear Title Documents",
        desc: '"Clear title documents and verified ownership records."',
        author: "Legal Due Diligence Desk",
        sub: "100% Legal Ownership Verification",
      },
      {
        id: 2,
        num: "02",
        title: "Transparent Pricing",
        desc: '"Transparent pricing with no hidden charges."',
        author: "Investor Advisory Desk",
        sub: "Direct Rates & Zero Hidden Costs",
      },
      {
        id: 3,
        num: "03",
        title: "Convenient Site Visits",
        desc: '"Site visits arranged at your convenience."',
        author: "Field Operations Desk",
        sub: "On-Demand Site Inspection",
      },
      {
        id: 4,
        num: "04",
        title: "Loan & Registration Guidance",
        desc: '"Guidance on loan assistance and registration procedures."',
        author: "Financial Support Desk",
        sub: "Turnkey Banking & Registration",
      },
      {
        id: 5,
        num: "05",
        title: "Honest & Unbiased Advice",
        desc: '"Honest advice, even if it means recommending against a particular plot."',
        author: "Uncompromised Advisory Desk",
        sub: "Long-Term Value Protection",
      },
    ] as TrustItem[],
  },
  process: {
    tagBadge: "Seamless Journey",
    title: "How to Buy Land with Us",
    subtext:
      "Buying land is a significant decision, and our process is designed to make it simple and stress-free:",
    steps: [
      {
        step: 1,
        title: "Consultation",
        desc: "Share your budget, location preference, and purpose (residential, agricultural, or commercial).",
        image: "/assets/images/mission-meeting.jpg",
      },
      {
        step: 2,
        title: "Shortlisting",
        desc: "We match you with suitable options from our current verified listings.",
        image: "/assets/images/plot-layout-1.jpg",
      },
      {
        step: 3,
        title: "Site Visit",
        desc: "Visit the shortlisted plots with our team for a firsthand look and locality check.",
        image: "/assets/images/land-development.jpg",
      },
      {
        step: 4,
        title: "Verification",
        desc: "We assist with full legal document checks, patta, and legal clarity.",
        image: "/assets/images/val-transparency.jpg",
      },
      {
        step: 5,
        title: "Registration",
        desc: "We support you through the final registration process with trusted legal partners.",
        image: "/assets/images/handshake-deal.jpg",
      },
    ] as ProcessStep[],
  },
  cta: {
    title: "Get in Touch",
    paragraph:
      "Vizhi Infragen Realtors has helped countless buyers find the right land for sale in Coimbatore, backed by local expertise, verified documentation, and honest guidance. Whether you are planning to build your dream home, expand your business, or make a smart long-term investment, our team is ready to help you find the perfect plot.",
    buttonText: "Contact Vizhi Infragen Today",
    buttonLink: "/contact?service=land-sales",
    backgroundImage: "/assets/images/carousel-villa-1.jpg",
  },
};
