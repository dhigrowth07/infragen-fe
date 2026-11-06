import { LandTypeCard, TrustItem, ProcessStep } from "./landSalesDetailData";

export const nriManagementDetailData = {
  meta: {
    title: "NRI Property Management Company in Coimbatore | Vizhi Infragen Realtors",
    description:
      "Trusted NRI property management company in Coimbatore. Power of attorney assistance, remote tenant screening, rent remittance, digital property inspection reports, and legal compliance.",
    keywords: [
      "NRI Property Management Company in Coimbatore",
      "NRI property care Coimbatore",
      "Power of attorney assistance Coimbatore",
      "Rent remittance NRI property",
      "Remote property management Coimbatore",
      "Vizhi Infragen Realtors",
    ],
  },
  hero: {
    tagline: "REMOTE PROPERTY SHIELD FOR NRIS",
    title: "NRI Property Management Company in",
    titleHighlight: "Coimbatore",
    subtext: "Trusted NRI Property Management Company in Coimbatore",
    backgroundImage: "/assets/images/service-4.jpg",
  },
  premierDesk: {
    tagBadge: "NRI Dedicated Desk",
    title: "Trusted NRI Property Management Company in Coimbatore",
    paragraph:
      "If you live abroad and own property back home, Vizhi Infragen Realtors is a dependable NRI property management company in Coimbatore. With years of on-ground experience serving Non-Resident Indians, we help owners protect their investments, maintain their properties, and stay worry-free despite the distance. Our team personally inspects every property, coordinates with tenants, and manages documentation on your behalf, so when we say we offer genuine, reliable support, we mean a service built specifically around the challenges of managing property from overseas.",
    bentoCards: {
      largeCard: {
        title: "NRI Property Shield",
        subtitle: "Remote Property Protection",
        image: "/assets/images/service-4.jpg",
      },
      smallCard1: {
        title: "Global Updates",
        subtitle: "Digital Reports & Photos",
        image: "/assets/images/about-property-management.jpg",
      },
      smallCard2: {
        title: "POA & Legal",
        subtitle: "Authorized Representation",
        image: "/assets/images/val-transparency.jpg",
      },
    },
  },
  whyChoose: {
    tagBadge: "Why Choose Us",
    title: "Why Choose Vizhi Infragen Realtors",
    paragraph1:
      "Coimbatore is home to a large NRI community with properties spread across the city, and many owners find it difficult to manage rentals, maintenance, and legal matters from another country. Demand for a dependable NRI property management company in Coimbatore has grown as more owners realize that time-zone differences and distance make hands-on management nearly impossible. At Vizhi Infragen Realtors, our expertise comes from years of working with NRI clients across areas like Saravanampatti, Kalapatti, Kovaipudur, Sulur, and Neelambur. We understand power of attorney procedures, remittance rules, tenant expectations, and local compliance requirements better than most, which allows us to protect NRI owners from disputes, delays, and unnecessary losses.",
    paragraph2:
      "Every property we manage for our NRI clients goes through a thorough documentation and condition check, including lease agreements, power of attorney verification, and compliance records. This due diligence reflects our commitment to trustworthiness, ensuring owners abroad never face unpleasant surprises.",
    image3D: "/assets/images/values-bg-bright.jpg",
  },
  landTypes: [
    {
      id: 1,
      title: "Tenant Sourcing & Screening",
      badge: "Verified Tenants",
      icon: "fa-user-check",
      image: "/assets/images/val-clientfirst.jpg",
      description:
        "Finding reliable tenants and verifying their background before move-in to protect your asset while you are abroad.",
      bullets: [
        "Rigorous Background & Identity Checks",
        "Long-Term Verified Tenant Sourcing",
      ],
      footerText: "Source Tenants",
    },
    {
      id: 2,
      title: "Rent Collection & Remittance",
      badge: "NRI Remittance",
      icon: "fa-earth-americas",
      image: "/assets/images/service-9.jpg",
      description:
        "Timely rent collection and guidance on NRE/NRO remittance transfers with digital accounting statements.",
      bullets: [
        "NRE/NRO Remittance Guidance",
        "Digital Monthly Statements & Ledgers",
      ],
      footerText: "Remittance Support",
    },
    {
      id: 3,
      title: "Property Maintenance",
      badge: "Remote Shield",
      icon: "fa-shield-halved",
      image: "/assets/images/about-property-management.jpg",
      description:
        "Regular upkeep, emergency repairs, and vendor coordination without requiring your physical presence in India.",
      bullets: [
        "Zero Physical Presence Required",
        "Vetted Local Vendor Oversight",
      ],
      footerText: "Maintain Property",
    },
    {
      id: 4,
      title: "Power of Attorney Assistance",
      badge: "Legal Authority",
      icon: "fa-file-signature",
      image: "/assets/images/service-7.jpg",
      description:
        "Guidance on power of attorney (POA) documentation and adjudication needed to authorize local representation.",
      bullets: [
        "POA Draft & Registration Guidance",
        "Authorized Representation Support",
      ],
      footerText: "POA Guidance",
    },
    {
      id: 5,
      title: "Legal & Compliance Support",
      badge: "Tax & Compliance",
      icon: "fa-scale-balanced",
      image: "/assets/images/val-expertise.jpg",
      description:
        "Managing lease agreements, renewals, local property taxes, TDS compliance, and regulatory formalities on your behalf.",
      bullets: [
        "TDS & Local Property Tax Support",
        "Regulatory & Eviction Protection",
      ],
      footerText: "Legal Support",
    },
  ] as LandTypeCard[],
  trustworthiness: {
    eyebrow: "TRANSPARENCY GUARANTEE",
    title: "What Makes Our NRI Services Trustworthy",
    leadDesc:
      "Trust is built through transparency, and that is exactly how Vizhi Infragen Realtors operates. When you choose our NRI property management company in Coimbatore services, you receive:",
    backgroundImage: "/assets/images/daylight-villa-1.png",
    reputationNote:
      "Our reputation among NRI clients has been built over years of repeat business and referrals, which speaks to the authority and reliability we bring to managing property remotely.",
    items: [
      {
        id: 1,
        num: "01",
        title: "Digital Accounting",
        desc: '"Clear, itemized accounting of rent and expenses, shared digitally."',
        author: "NRI Accounting Desk",
        sub: "Digital Statements & NRE/NRO Logs",
      },
      {
        id: 2,
        num: "02",
        title: "Transparent Pricing",
        desc: '"Transparent pricing with no hidden charges."',
        author: "NRI Client Desk",
        sub: "Zero Hidden International Charges",
      },
      {
        id: 3,
        num: "03",
        title: "Regular Inspection Reports",
        desc: '"Regular property inspection reports with photos and updates."',
        author: "Field Audit Operations",
        sub: "High-Res Photo & Video Audits",
      },
      {
        id: 4,
        num: "04",
        title: "Honest & Unbiased Advice",
        desc: '"Honest advice on repairs, rent revisions, and tenant matters."',
        author: "Uncompromised Advisory Desk",
        sub: "Maximizing Remote Property Yield",
      },
      {
        id: 5,
        num: "05",
        title: "Dedicated NRI Point of Contact",
        desc: '"A dedicated point of contact who understands NRI concerns and time-zone constraints."',
        author: "Global Client Liaison Desk",
        sub: "Time-Zone Aligned Communication",
      },
    ] as TrustItem[],
  },
  process: {
    tagBadge: "Remote Workflow",
    title: "How Our NRI Property Management Process Works",
    subtext:
      "Managing property from abroad requires a structured, trustworthy approach, and ours is designed to make ownership simple and stress-free:",
    steps: [
      {
        step: 1,
        title: "Consultation",
        desc: "Share details about your property, location, and management requirements over a call or video meeting.",
        image: "/assets/images/mission-meeting.jpg",
      },
      {
        step: 2,
        title: "Documentation Setup",
        desc: "We guide you through power of attorney and other required paperwork.",
        image: "/assets/images/val-transparency.jpg",
      },
      {
        step: 3,
        title: "Property Assessment",
        desc: "Our team inspects the property and recommends necessary improvements.",
        image: "/assets/images/val-accountability.jpg",
      },
      {
        step: 4,
        title: "Tenant Placement",
        desc: "We source, screen, and onboard reliable tenants.",
        image: "/assets/images/val-clientfirst.jpg",
      },
      {
        step: 5,
        title: "Ongoing Management & Reporting",
        desc: "We handle rent collection, maintenance, and compliance while keeping you updated regularly.",
        image: "/assets/images/service-4.jpg",
      },
    ] as ProcessStep[],
  },
  cta: {
    title: "Get in Touch",
    paragraph:
      "Vizhi Infragen Realtors has helped countless NRI property owners manage their assets with confidence, backed by local expertise, transparent processes, and honest guidance, no matter which country you call home. Whether you own a single unit or multiple properties, our team is ready to take the day-to-day burden off your hands.",
    buttonText: "Contact Vizhi Infragen Today",
    buttonLink: "/contact?service=nri-management",
    backgroundImage: "/assets/images/carousel-villa-1.jpg",
  },
};
