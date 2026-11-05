export interface ServiceSpec {
  icon: string;
  label: string;
}

export interface ServiceCardItem {
  id: number;
  slug: string;
  category: "land" | "care" | "build" | "legal" | "corporate";
  title: string;
  tagline: string;
  topBadgesLeft: string[];
  topBadgesRight: string[];
  image: string;
  specs: ServiceSpec[];
  deskName: string;
  deskAvatar: string;
  link: string;
  description: string;
}

export interface ServiceCategoryTab {
  id: "land" | "care" | "build" | "legal" | "corporate";
  label: string;
  icon: string;
}

export const serviceCategoryTabs: ServiceCategoryTab[] = [
  { id: "land", label: "Land & Investment", icon: "fa-map-location-dot" },
  { id: "care", label: "Property Care & NRI", icon: "fa-user-shield" },
  { id: "build", label: "Construction & Valuation", icon: "fa-helmet-safety" },
  { id: "legal", label: "Legal & Approvals", icon: "fa-scale-balanced" },
  { id: "corporate", label: "Corporate & Commercial", icon: "fa-building-user" },
];

export const servicesCarouselItems = [
  { id: 1, title: "1. Land Sales", image: "/assets/images/service-1.jpg", link: "/services/land-sales" },
  { id: 2, title: "2. Land Purchase Assistance", image: "/assets/images/service-2.jpg", link: "/services/purchase-assistance" },
  { id: 3, title: "3. Property Management", image: "/assets/images/service-3.jpg", link: "/services/property-management" },
  { id: 4, title: "4. NRI Property Management", image: "/assets/images/service-4.jpg", link: "/services/nri-management" },
  { id: 5, title: "5. Building Construction", image: "/assets/images/service-5.jpg", link: "/services/construction" },
  { id: 6, title: "6. Building Valuation", image: "/assets/images/service-6.jpg", link: "/services/valuation" },
  { id: 7, title: "7. Land Approvals & Documentation", image: "/assets/images/service-7.jpg", link: "/services/approvals" },
  { id: 8, title: "8. Land Conversion Services", image: "/assets/images/service-8.jpg", link: "/services/conversion" },
  { id: 9, title: "9. Rental Services", image: "/assets/images/service-9.jpg", link: "/services/rentals" },
  { id: 10, title: "10. Warehouse & Corporate Solutions", image: "/assets/images/service-10.jpg", link: "/services/warehouse" },
];

export const servicesCardData: ServiceCardItem[] = [
  {
    id: 1,
    slug: "land-sales",
    category: "land",
    title: "Land Sales",
    tagline: "Clear Title Plots",
    topBadgesLeft: ["Featured"],
    topBadgesRight: ["Sales", "Hot Offer"],
    image: "/assets/images/service-1.jpg",
    specs: [
      { icon: "fa-file-contract", label: "Title 100%" },
      { icon: "fa-shield-halved", label: "Verified" },
      { icon: "fa-chart-line", label: "High ROI" },
      { icon: "fa-location-dot", label: "Coimbatore" },
    ],
    deskName: "Land Sales Desk",
    deskAvatar: "/vizhi-infragen-realtors-logo.png",
    link: "/services/land-sales",
    description: "Verified plots, agricultural land, and development sites across Coimbatore, listed with clear titles and fair market pricing.",
  },
  {
    id: 2,
    slug: "purchase-assistance",
    category: "land",
    title: "Land Purchase Assistance",
    tagline: "End-to-End Care",
    topBadgesLeft: ["Featured"],
    topBadgesRight: ["Consult", "Safe Deal"],
    image: "/assets/images/service-2.jpg",
    specs: [
      { icon: "fa-magnifying-glass-location", label: "Site Sourcing" },
      { icon: "fa-handshake-simple", label: "Negotiate" },
      { icon: "fa-gavel", label: "Due Diligence" },
      { icon: "fa-shield", label: "Secure" },
    ],
    deskName: "Purchase Advisory",
    deskAvatar: "/vizhi-infragen-realtors-logo.png",
    link: "/services/purchase-assistance",
    description: "End-to-end buyer support, including site shortlisting, due diligence, price negotiation, and title verification, so you invest with confidence.",
  },
  {
    id: 3,
    slug: "property-management",
    category: "care",
    title: "Property Management",
    tagline: "Asset Protection",
    topBadgesLeft: ["Featured"],
    topBadgesRight: ["Care", "24/7 Shield"],
    image: "/assets/images/service-3.jpg",
    specs: [
      { icon: "fa-clipboard-check", label: "Site Audits" },
      { icon: "fa-broom", label: "Clean Care" },
      { icon: "fa-lock", label: "Security" },
      { icon: "fa-bolt", label: "Utilities" },
    ],
    deskName: "Property Care Desk",
    deskAvatar: "/vizhi-infragen-realtors-logo.png",
    link: "/services/property-management",
    description: "As an experienced property management company in Coimbatore, we handle residential and commercial assets with care: tenant coordination, rent collection, maintenance, and regular property inspections.",
  },
  {
    id: 4,
    slug: "nri-management",
    category: "care",
    title: "NRI Property Management",
    tagline: "Remote Property Shield",
    topBadgesLeft: ["Featured"],
    topBadgesRight: ["NRI Shield", "Global Update"],
    image: "/assets/images/service-4.jpg",
    specs: [
      { icon: "fa-camera-retro", label: "Photo Audits" },
      { icon: "fa-user-check", label: "Tenant Desk" },
      { icon: "fa-earth-americas", label: "Remote Access" },
      { icon: "fa-file-invoice", label: "Monthly Log" },
    ],
    deskName: "NRI Dedicated Desk",
    deskAvatar: "/vizhi-infragen-realtors-logo.png",
    link: "/services/nri-management",
    description: "A dedicated, NRI-focused service that protects your property while you're abroad — secure rent handling, encroachment monitoring, document management, and transparent reporting.",
  },
  {
    id: 5,
    slug: "construction",
    category: "build",
    title: "Building Construction",
    tagline: "Turnkey Delivery",
    topBadgesLeft: ["Featured"],
    topBadgesRight: ["Turnkey", "Quality Build"],
    image: "/assets/images/service-5.jpg",
    specs: [
      { icon: "fa-house-chimney", label: "Villas" },
      { icon: "fa-building", label: "Commercial" },
      { icon: "fa-compass-drafting", label: "Architect" },
      { icon: "fa-clock", label: "On-Time" },
    ],
    deskName: "Construction Desk",
    deskAvatar: "/vizhi-infragen-realtors-logo.png",
    link: "/services/construction",
    description: "Reliable construction support for homes, commercial units, and rental developments, managed with quality control and on-time delivery.",
  },
  {
    id: 6,
    slug: "valuation",
    category: "build",
    title: "Building Valuation",
    tagline: "Fair Market Rate",
    topBadgesLeft: ["Featured"],
    topBadgesRight: ["Appraisal", "Bank Rate"],
    image: "/assets/images/service-6.jpg",
    specs: [
      { icon: "fa-calculator", label: "Valuation" },
      { icon: "fa-chart-pie", label: "Market Data" },
      { icon: "fa-building-columns", label: "Bank Loan" },
      { icon: "fa-certificate", label: "Certified" },
    ],
    deskName: "Valuation Advisory",
    deskAvatar: "/vizhi-infragen-realtors-logo.png",
    link: "/services/valuation",
    description: "Accurate, market-aligned valuations for sale, purchase, loan, or legal purposes, prepared with local price intelligence.",
  },
  {
    id: 7,
    slug: "approvals",
    category: "legal",
    title: "Approvals & Documentation",
    tagline: "DTCP & Legal Clear",
    topBadgesLeft: ["Featured"],
    topBadgesRight: ["DTCP/LPA", "100% Legal"],
    image: "/assets/images/service-7.jpg",
    specs: [
      { icon: "fa-stamp", label: "DTCP Layout" },
      { icon: "fa-file-pen", label: "Drafting" },
      { icon: "fa-scale-balanced", label: "Legal Check" },
      { icon: "fa-id-card", label: "Registration" },
    ],
    deskName: "Legal & Sanction Desk",
    deskAvatar: "/vizhi-infragen-realtors-logo.png",
    link: "/services/approvals",
    description: "Guidance through DTCP/local body approvals, registrations, and paperwork, reducing delays and compliance risk.",
  },
  {
    id: 8,
    slug: "conversion",
    category: "legal",
    title: "Land Conversion Services",
    tagline: "Hassle-Free NOC",
    topBadgesLeft: ["Featured"],
    topBadgesRight: ["Agri to Non-Agri", "NOC Clear"],
    image: "/assets/images/service-8.jpg",
    specs: [
      { icon: "fa-seedling", label: "Agri to CLU" },
      { icon: "fa-landmark", label: "Govt Liaison" },
      { icon: "fa-map", label: "Zoning" },
      { icon: "fa-circle-check", label: "NOC Fast" },
    ],
    deskName: "Conversion Advisory",
    deskAvatar: "/vizhi-infragen-realtors-logo.png",
    link: "/services/conversion",
    description: "Professional assistance converting agricultural land to residential or commercial use, handled correctly the first time.",
  },
  {
    id: 9,
    slug: "rentals",
    category: "care",
    title: "Rental Services",
    tagline: "Fixed Rental Income",
    topBadgesLeft: ["Featured"],
    topBadgesRight: ["Rentals", "Steady Yield"],
    image: "/assets/images/service-9.jpg",
    specs: [
      { icon: "fa-users", label: "Verified Tenant" },
      { icon: "fa-file-contract", label: "Lease Draft" },
      { icon: "fa-indian-rupee-sign", label: "Rent Collect" },
      { icon: "fa-house-user", label: "Move Audit" },
    ],
    deskName: "Rental Desk",
    deskAvatar: "/vizhi-infragen-realtors-logo.png",
    link: "/services/rentals",
    description: "Tenant sourcing and rental management for owners, plus property-finding help for tenants seeking homes, offices, and commercial space.",
  },
  {
    id: 10,
    slug: "warehouse",
    category: "corporate",
    title: "Warehouse & Corporate",
    tagline: "Industrial & Corporate",
    topBadgesLeft: ["Featured"],
    topBadgesRight: ["Logistics", "Prime Corridors"],
    image: "/assets/images/service-10.jpg",
    specs: [
      { icon: "fa-warehouse", label: "Godowns" },
      { icon: "fa-industry", label: "Industrial" },
      { icon: "fa-briefcase", label: "Offices" },
      { icon: "fa-truck-fast", label: "Corridor" },
    ],
    deskName: "Corporate Sourcing",
    deskAvatar: "/vizhi-infragen-realtors-logo.png",
    link: "/services/warehouse",
    description: "Industrial and commercial real estate support for businesses needing warehousing, godowns, and corporate spaces along Coimbatore's key logistics routes.",
  },
];
