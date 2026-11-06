import { LandTypeCard, TrustItem, ProcessStep } from "./landSalesDetailData";

export const purchaseAssistanceDetailData = {
  meta: {
    title: "Land Purchase Assistance in Coimbatore | Vizhi Infragen Realtors",
    description:
      "Trusted land purchase assistance in Coimbatore. End-to-end buyer guidance, document verification, price negotiation, site evaluation, and registration support.",
    keywords: [
      "Land Purchase Assistance in Coimbatore",
      "Property buying assistance Coimbatore",
      "Land title check Coimbatore",
      "Site evaluation Coimbatore",
      "Plot registration support",
      "Vizhi Infragen Realtors",
    ],
  },
  hero: {
    tagline: "END-TO-END BUYER GUIDANCE",
    title: "Land Purchase Assistance in",
    titleHighlight: "Coimbatore",
    subtext: "Trusted Land Purchase Assistance in Coimbatore",
    backgroundImage: "/assets/images/service-2.jpg",
  },
  premierDesk: {
    tagBadge: "Purchase Advisory Desk",
    title: "Trusted Land Purchase Assistance in Coimbatore",
    paragraph:
      "If you are looking for reliable land purchase assistance in Coimbatore, Vizhi Infragen Realtors is the local partner you can count on. With years of on-ground experience guiding buyers through the Coimbatore real estate market, we help individuals, families, and investors make informed decisions at every step of the purchase. Our team personally verifies documents, negotiates on your behalf, and walks with you from shortlisting a plot to final registration, so when we say we offer genuine, end-to-end support, we mean a process that protects your money and your peace of mind.",
    bentoCards: {
      largeCard: {
        title: "Land Purchase Assistance",
        subtitle: "End-to-End Care",
        image: "/assets/images/service-2.jpg",
      },
      smallCard1: {
        title: "Price Negotiation",
        subtitle: "Fair Market Value",
        image: "/assets/images/handshake-deal.jpg",
      },
      smallCard2: {
        title: "Document Check",
        subtitle: "Legal Verification",
        image: "/assets/images/val-transparency.jpg",
      },
    },
  },
  whyChoose: {
    tagBadge: "Why Choose Us",
    title: "Why Choose Vizhi Infragen Realtors",
    paragraph1:
      "Coimbatore's real estate market moves fast, with new layouts, approvals, and pricing changes happening across growth corridors every year. Demand for land purchase assistance in Coimbatore has grown as more buyers realize that navigating documentation, approvals, and negotiations alone can be risky. At Vizhi Infragen Realtors, our expertise comes from years of direct dealings across areas like Saravanampatti, Kalapatti, Kovaipudur, Sulur, and Neelambur. We understand local land patterns, government approval processes, DTCP and RERA norms, and pricing trends better than most, which allows us to guide clients toward safe, informed purchases rather than rushed decisions.",
    paragraph2:
      "Every transaction we support goes through a thorough documentation check, including patta verification, encumbrance certificate review, and boundary confirmation. This due diligence reflects our commitment to trustworthiness, ensuring our clients never face legal surprises after purchase.",
    image3D: "/assets/images/land-sales-3d-new.png",
  },
  landTypes: [
    {
      id: 1,
      title: "Document Verification",
      badge: "Patta & EC Check",
      icon: "fa-file-circle-check",
      image: "/assets/images/service-7.jpg",
      description:
        "Checking patta, encumbrance certificate (EC), parent documents, and title records before you make a financial commitment.",
      bullets: [
        "Patta & Ownership Record Check",
        "Encumbrance Certificate Verification",
      ],
      footerText: "Verify Documents",
    },
    {
      id: 2,
      title: "Site Evaluation",
      badge: "Location Audit",
      icon: "fa-magnifying-glass-location",
      image: "/assets/images/land-development.jpg",
      description:
        "Assessing physical location, approach road accessibility, soil condition, zoning, and future development potential.",
      bullets: [
        "Road Access & Soil Inspection",
        "Zoning & Infrastructure Potential",
      ],
      footerText: "Evaluate Site",
    },
    {
      id: 3,
      title: "Price Negotiation",
      badge: "Fair Market Value",
      icon: "fa-handshake-simple",
      image: "/assets/images/handshake-deal.jpg",
      description:
        "Representing your interests with sellers to secure fair, market-aligned pricing without inflated broker margins.",
      bullets: [
        "Buyer-First Advocacy",
        "Securing Genuine Market Pricing",
      ],
      footerText: "Negotiate Price",
    },
    {
      id: 4,
      title: "Loan & Finance Guidance",
      badge: "Bank Coordination",
      icon: "fa-building-columns",
      image: "/assets/images/service-6.jpg",
      description:
        "Coordinating with top banks and financial institutions for hassle-free plot valuation and mortgage loan funding.",
      bullets: [
        "Bank Approval Assistance",
        "Turnkey Loan Documentation",
      ],
      footerText: "Finance Guidance",
    },
    {
      id: 5,
      title: "Registration Support",
      badge: "Legal Formalities",
      icon: "fa-file-signature",
      image: "/assets/images/key-handover.jpg",
      description:
        "Managing draft agreements, stamp duty calculations, sub-registrar scheduling, and legal formalities through trusted partners.",
      bullets: [
        "Draft Sale Deed Preparation",
        "Sub-Registrar Process Support",
      ],
      footerText: "Registration Support",
    },
  ] as LandTypeCard[],
  trustworthiness: {
    eyebrow: "TRANSPARENCY GUARANTEE",
    title: "What Makes Our Assistance Trustworthy",
    leadDesc:
      "Trust is built through transparency, and that is exactly how Vizhi Infragen Realtors operates. When you seek land purchase assistance in Coimbatore from us, you receive:",
    backgroundImage: "/assets/images/daylight-villa-1.png",
    reputationNote:
      "Our reputation in Coimbatore has been built over years of repeat business and referrals, which speaks to the authority and reliability we bring to every transaction.",
    items: [
      {
        id: 1,
        num: "01",
        title: "Clear Title Documents",
        desc: '"Clear title documents and verified ownership records."',
        author: "Legal Verification Desk",
        sub: "100% Legal Ownership Check",
      },
      {
        id: 2,
        num: "02",
        title: "Transparent Pricing",
        desc: '"Transparent pricing with no hidden charges."',
        author: "Buyer Advocacy Desk",
        sub: "Direct Rates & Zero Hidden Fees",
      },
      {
        id: 3,
        num: "03",
        title: "Convenient Site Visits",
        desc: '"Site visits arranged at your convenience."',
        author: "Field Operations Desk",
        sub: "On-Demand Inspection Escort",
      },
      {
        id: 4,
        num: "04",
        title: "Honest & Unbiased Advice",
        desc: '"Honest advice, even if it means recommending against a particular plot."',
        author: "Uncompromised Advisory Desk",
        sub: "Long-Term Buyer Protection",
      },
      {
        id: 5,
        num: "05",
        title: "Full Registration Support",
        desc: '"Support from consultation through to final registration."',
        author: "Turnkey Desk",
        sub: "End-to-End Property Transfer",
      },
    ] as TrustItem[],
  },
  process: {
    tagBadge: "Seamless Journey",
    title: "How Our Land Purchase Assistance Process Works",
    subtext:
      "Buying land is a significant decision, and our process is designed to make it simple and stress-free:",
    steps: [
      {
        step: 1,
        title: "Consultation",
        desc: "Share your budget, location preference, and purpose, whether residential, agricultural, commercial, or investment.",
        image: "/assets/images/mission-meeting.jpg",
      },
      {
        step: 2,
        title: "Shortlisting",
        desc: "We match you with suitable plots based on your requirements.",
        image: "/assets/images/plot-layout-1.jpg",
      },
      {
        step: 3,
        title: "Site Visit",
        desc: "Visit shortlisted plots with our team for a firsthand look.",
        image: "/assets/images/land-development.jpg",
      },
      {
        step: 4,
        title: "Verification",
        desc: "We handle document checks and legal clarity on your behalf.",
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
      "Vizhi Infragen Realtors has helped countless buyers navigate their purchase with confidence, backed by local expertise, verified documentation, and honest guidance. Whether you are planning to build your dream home, expand your business, or make a smart long-term investment, our team is ready to guide you through every step.",
    buttonText: "Contact Vizhi Infragen Today",
    buttonLink: "/contact?service=purchase-assistance",
    backgroundImage: "/assets/images/carousel-villa-1.jpg",
  },
};
