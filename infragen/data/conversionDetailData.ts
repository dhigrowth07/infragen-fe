import { LandTypeCard, TrustItem, ProcessStep } from "./landSalesDetailData";

export const conversionDetailData = {
  meta: {
    title: "Land Conversion Services in Coimbatore | Vizhi Infragen Realtors",
    description:
      "Trusted land conversion services and plot sales in Coimbatore. Convert agricultural land to residential or commercial use, DTCP approved layout guidance, and verified plot deals.",
    keywords: [
      "Land Conversion Services in Coimbatore",
      "Land for sale in Coimbatore",
      "Agri to residential conversion Coimbatore",
      "DTCP plots Coimbatore",
      "Saravanampatti land conversion",
      "Vizhi Infragen Realtors",
    ],
  },
  hero: {
    tagline: "AGRICULTURAL & LAND CONVERSION SERVICES",
    title: "Land Conversion Services in",
    titleHighlight: "Coimbatore",
    subtext: "Trusted Plots and Land for Sale in Coimbatore",
    backgroundImage: "/assets/images/service-8.jpg",
  },
  premierDesk: {
    tagBadge: "Land Conversion Desk",
    title: "Trusted Plots and Land for Sale in Coimbatore",
    paragraph:
      "If you are searching for land for sale in Coimbatore, Vizhi Infragen Realtors is your reliable local partner. With years of on-ground experience in the Coimbatore real estate market, we help individuals, families, and investors find verified, well-located land parcels that match their budget and long-term goals. Our team personally inspects every listing before it reaches our clients, so when we say we offer genuine, verified plots, we mean land that is legally clear, properly documented, and ready for registration.",
    bentoCards: {
      largeCard: {
        title: "Land Conversion",
        subtitle: "Agri to Layout NOC",
        image: "/assets/images/service-8.jpg",
      },
      smallCard1: {
        title: "Zoning Clearance",
        subtitle: "Government Liaison",
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
      title: "Residential plots",
      badge: "DTCP Approved",
      icon: "fa-house-flag",
      image: "/assets/images/service-1.jpg",
      description:
        "DTCP-approved layouts suitable for building independent homes.",
      bullets: [
        "DTCP-Approved Layouts",
        "Suitable for Independent Homes",
      ],
      footerText: "View Residential Options",
    },
    {
      id: 2,
      title: "Agricultural land",
      badge: "Fertile Outskirts",
      icon: "fa-wheat-awn",
      image: "/assets/images/plot-layout-1.jpg",
      description:
        "Fertile land parcels on the outskirts, ideal for farming or long-term holding.",
      bullets: [
        "Fertile Suburban Outskirts",
        "Ideal for Farming & Holding",
      ],
      footerText: "Explore Agri Parcels",
    },
    {
      id: 3,
      title: "Commercial land",
      badge: "Highway Frontage",
      icon: "fa-building",
      image: "/assets/images/land-sales-commercial-new.png",
      description:
        "Strategic plots near highways and business hubs for shops, warehouses, or offices.",
      bullets: [
        "Strategic Highway Positioning",
        "For Shops, Warehouses & Offices",
      ],
      footerText: "Explore Commercial Sites",
    },
    {
      id: 4,
      title: "Investment plots",
      badge: "High Growth Potential",
      icon: "fa-chart-line",
      image: "/assets/images/plot-layout-2.jpg",
      description:
        "Land in upcoming growth zones with strong future appreciation potential.",
      bullets: [
        "Upcoming Growth Corridors",
        "High Appreciation Potential",
      ],
      footerText: "View Investment Plots",
    },
    {
      id: 5,
      title: "Premium land parcels",
      badge: "Gated Communities",
      icon: "fa-crown",
      image: "/assets/images/land-sales-hero-new.png",
      description:
        "Handpicked, high-value plots in prime and gated locations for buyers who want the best of Coimbatore real estate.",
      bullets: [
        "Handpicked High-Value Parcels",
        "Prime & Gated Community Sites",
      ],
      footerText: "Discover Premium Parcels",
    },
    {
      id: 6,
      title: "Citywide & Suburban Inventory",
      badge: "Tailored Parcels",
      icon: "fa-map-location-dot",
      image: "/assets/images/plot-layout-3.jpg",
      description:
        "Whether you need a small residential plot or a large parcel for commercial development, our current inventory of land for sale in Coimbatore covers areas across the city and its surrounding suburbs.",
      bullets: [
        "Small Residential to Large Commercial",
        "Citywide & Suburban Area Coverage",
      ],
      footerText: "Explore Full Inventory",
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
        desc: '"Clear title documents and verified ownership records"',
        author: "Legal Due Diligence Desk",
        sub: "Verified Ownership Records",
      },
      {
        id: 2,
        num: "02",
        title: "Transparent Pricing",
        desc: '"Transparent pricing with no hidden charges"',
        author: "Financial Advisory Desk",
        sub: "Zero Hidden Charges",
      },
      {
        id: 3,
        num: "03",
        title: "Site Visits at Your Convenience",
        desc: '"Site visits arranged at your convenience"',
        author: "Field Operations Desk",
        sub: "Personalized Inspections",
      },
      {
        id: 4,
        num: "04",
        title: "Loan & Registration Support",
        desc: '"Guidance on loan assistance and registration procedures"',
        author: "Registration Support Desk",
        sub: "End-to-End Assistance",
      },
      {
        id: 5,
        num: "05",
        title: "Honest & Direct Advice",
        desc: '"Honest advice, even if it means recommending against a particular plot"',
        author: "Client Advisory Desk",
        sub: "Uncompromised Integrity",
      },
    ] as TrustItem[],
  },
  process: {
    tagBadge: "Simple & Stress-Free Process",
    title: "How to Buy Land with Us",
    subtext:
      "Buying land is a significant decision, and our process is designed to make it simple and stress-free:",
    steps: [
      {
        step: 1,
        title: "Consultation",
        desc: "Share your budget, location preference, and purpose (residential, agricultural, or commercial)",
        image: "/assets/images/mission-meeting.jpg",
      },
      {
        step: 2,
        title: "Shortlisting",
        desc: "We match you with suitable options from our current listings",
        image: "/assets/images/plot-layout-1.jpg",
      },
      {
        step: 3,
        title: "Site Visit",
        desc: "Visit the shortlisted plots with our team for a firsthand look",
        image: "/assets/images/land-development.jpg",
      },
      {
        step: 4,
        title: "Verification",
        desc: "We assist with document checks and legal clarity",
        image: "/assets/images/val-transparency.jpg",
      },
      {
        step: 5,
        title: "Registration",
        desc: "We support you through the final registration process with trusted legal partners",
        image: "/assets/images/handshake-deal.jpg",
      },
    ] as ProcessStep[],
  },
  cta: {
    title: "Get in Touch",
    paragraph:
      "Vizhi Infragen Realtors has helped countless buyers find the right land for sale in Coimbatore, backed by local expertise, verified documentation, and honest guidance. Whether you are planning to build your dream home, expand your business, or make a smart long-term investment, our team is ready to help you find the perfect plot.",
    buttonText: "Contact Vizhi Infragen Today",
    buttonLink: "/contact?service=conversion",
    backgroundImage: "/assets/images/carousel-villa-1.jpg",
  },
};
