import { LandTypeCard, TrustItem, ProcessStep } from "./landSalesDetailData";

export const propertyManagementDetailData = {
  meta: {
    title: "Property Management Company in Coimbatore | Vizhi Infragen Realtors",
    description:
      "Trusted property management company in Coimbatore. Tenant screening, rent collection, property maintenance, legal compliance, and regular inspection reports.",
    keywords: [
      "Property Management Company in Coimbatore",
      "Property care Coimbatore",
      "Tenant screening Coimbatore",
      "Rent collection services Coimbatore",
      "Rental property maintenance",
      "Vizhi Infragen Realtors",
    ],
  },
  hero: {
    tagline: "FULL-SERVICE ASSET PROTECTION",
    title: "Property Management Company in",
    titleHighlight: "Coimbatore",
    subtext: "Trusted Property Management Company in Coimbatore",
    backgroundImage: "/assets/images/service-3.jpg",
  },
  premierDesk: {
    tagBadge: "Property Care Desk",
    title: "Trusted Property Management Company in Coimbatore",
    paragraph:
      "If you own residential or commercial property and need dependable support, Vizhi Infragen Realtors is a trusted property management company in Coimbatore. With years of on-ground experience handling properties across the city, we help owners protect their investments, maintain their assets, and earn steady returns without the day-to-day hassle. Our team personally inspects every property under our care, coordinates with tenants, and manages maintenance, so when we say we offer genuine, reliable management, we mean a service that treats your property as if it were our own.",
    bentoCards: {
      largeCard: {
        title: "Property Management",
        subtitle: "Asset Protection",
        image: "/assets/images/service-3.jpg",
      },
      smallCard1: {
        title: "Tenant Screening",
        subtitle: "Background Check",
        image: "/assets/images/about-property-management.jpg",
      },
      smallCard2: {
        title: "Maintenance Care",
        subtitle: "Regular Inspection",
        image: "/assets/images/val-accountability.jpg",
      },
    },
  },
  whyChoose: {
    tagBadge: "Why Choose Us",
    title: "Why Choose Vizhi Infragen Realtors",
    paragraph1:
      "Coimbatore's property market has grown rapidly, with more owners now living outside the city or juggling multiple properties, which makes professional oversight essential. Demand for a dependable property management company in Coimbatore has grown as owners realize that handling tenants, maintenance, and legal compliance alone can be time-consuming and risky. At Vizhi Infragen Realtors, our expertise comes from years of direct dealings across areas like Saravanampatti, Kalapatti, Kovaipudur, Sulur, and Neelambur. We understand local rental patterns, tenant expectations, and regulatory requirements better than most, which allows us to protect owners from unnecessary disputes and losses.",
    paragraph2:
      "Every property we manage goes through a thorough documentation and condition check, including lease agreements, maintenance records, and compliance verification. This due diligence reflects our commitment to trustworthiness, ensuring owners never face unpleasant surprises down the line.",
    image3D: "/assets/images/story-bg.jpg",
  },
  landTypes: [
    {
      id: 1,
      title: "Tenant Sourcing & Screening",
      badge: "Verified Tenants",
      icon: "fa-user-check",
      image: "/assets/images/val-clientfirst.jpg",
      description:
        "Finding reliable tenants and verifying their identity, employment, and background before move-in to ensure hassle-free occupancy.",
      bullets: [
        "Comprehensive Background Checks",
        "Reliable & Timely Occupants",
      ],
      footerText: "Source Tenants",
    },
    {
      id: 2,
      title: "Rent Collection",
      badge: "Timely Yield",
      icon: "fa-file-invoice-dollar",
      image: "/assets/images/service-9.jpg",
      description:
        "Timely collection and transparent accounting of monthly rent, deposited directly into your bank account with complete ledgers.",
      bullets: [
        "Automated Monthly Rent Deposits",
        "Detailed Financial Statements",
      ],
      footerText: "Collect Rent",
    },
    {
      id: 3,
      title: "Property Maintenance",
      badge: "Asset Upkeep",
      icon: "fa-wrench",
      image: "/assets/images/about-property-management.jpg",
      description:
        "Regular upkeep, emergency repairs, and verified vendor coordination to keep your property in top physical condition.",
      bullets: [
        "24/7 Plumbing & Electrical Care",
        "Preventative Maintenance Audits",
      ],
      footerText: "Maintain Asset",
    },
    {
      id: 4,
      title: "Legal & Compliance Support",
      badge: "Lease Governance",
      icon: "fa-scale-balanced",
      image: "/assets/images/service-7.jpg",
      description:
        "Drafting standardized lease agreements, managing renewals, security deposit handling, and local regulatory compliance.",
      bullets: [
        "Watertight Lease Agreements",
        "Regulatory & Eviction Protection",
      ],
      footerText: "Legal Support",
    },
    {
      id: 5,
      title: "Property Inspections",
      badge: "Periodic Audit",
      icon: "fa-clipboard-check",
      image: "/assets/images/val-transparency.jpg",
      description:
        "Periodic scheduled checks with photo/video logs to ensure the property is well maintained and tenants adhere to terms.",
      bullets: [
        "Detailed Photo & Video Audit Logs",
        "Structure & Appliance Inspections",
      ],
      footerText: "Schedule Audit",
    },
  ] as LandTypeCard[],
  trustworthiness: {
    eyebrow: "TRANSPARENCY GUARANTEE",
    title: "What Makes Our Management Services Trustworthy",
    leadDesc:
      "Trust is built through transparency, and that is exactly how Vizhi Infragen Realtors operates. When you choose our property management company in Coimbatore services, you receive:",
    backgroundImage: "/assets/images/daylight-villa-1.png",
    reputationNote:
      "Our reputation in Coimbatore has been built over years of repeat business and referrals, which speaks to the authority and reliability we bring to every property we manage.",
    items: [
      {
        id: 1,
        num: "01",
        title: "Itemized Accounting",
        desc: '"Clear, itemized accounting of rent and expenses."',
        author: "Financial Accounting Desk",
        sub: "Transparent Monthly Statements",
      },
      {
        id: 2,
        num: "02",
        title: "Transparent Pricing",
        desc: '"Transparent pricing with no hidden charges."',
        author: "Owner Care Desk",
        sub: "Zero Hidden Management Fees",
      },
      {
        id: 3,
        num: "03",
        title: "Regular Inspection Reports",
        desc: '"Regular property inspection reports."',
        author: "Field Operations Desk",
        sub: "Photographic Property Audit",
      },
      {
        id: 4,
        num: "04",
        title: "Honest & Unbiased Advice",
        desc: '"Honest advice on repairs, rent revisions, and tenant matters."',
        author: "Uncompromised Advisory Desk",
        sub: "Maximizing Property Yield",
      },
      {
        id: 5,
        num: "05",
        title: "End-to-End Tenancy Support",
        desc: '"Support from tenant onboarding through to lease renewal or exit."',
        author: "Tenancy Operations Desk",
        sub: "Hassle-Free Lease Management",
      },
    ] as TrustItem[],
  },
  process: {
    tagBadge: "Structured Approach",
    title: "How Our Property Management Process Works",
    subtext:
      "Managing a property well requires a structured approach, and ours is designed to make ownership simple and stress-free:",
    steps: [
      {
        step: 1,
        title: "Consultation",
        desc: "Share details about your property, location, and management requirements.",
        image: "/assets/images/mission-meeting.jpg",
      },
      {
        step: 2,
        title: "Property Assessment",
        desc: "Our team inspects the property and recommends necessary improvements.",
        image: "/assets/images/val-accountability.jpg",
      },
      {
        step: 3,
        title: "Tenant Placement",
        desc: "We source, screen, and onboard reliable tenants.",
        image: "/assets/images/val-clientfirst.jpg",
      },
      {
        step: 4,
        title: "Ongoing Management",
        desc: "We handle rent collection, maintenance, and compliance on your behalf.",
        image: "/assets/images/service-3.jpg",
      },
      {
        step: 5,
        title: "Regular Reporting",
        desc: "You receive periodic updates on your property's condition and finances.",
        image: "/assets/images/val-transparency.jpg",
      },
    ] as ProcessStep[],
  },
  cta: {
    title: "Get in Touch",
    paragraph:
      "Vizhi Infragen Realtors has helped countless property owners manage their assets with confidence, backed by local expertise, transparent processes, and honest guidance. Whether you own a single unit or multiple properties, our team is ready to take the day-to-day burden off your hands.",
    buttonText: "Contact Vizhi Infragen Today",
    buttonLink: "/contact?service=property-management",
    backgroundImage: "/assets/images/carousel-villa-1.jpg",
  },
};
