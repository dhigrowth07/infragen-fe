import { LandTypeCard, TrustItem, ProcessStep } from "./landSalesDetailData";

export const constructionDetailData = {
  meta: {
    title: "Building Construction Company in Coimbatore | Vizhi Infragen Realtors",
    description:
      "Trusted building construction company in Coimbatore. Architectural design, residential villa construction, commercial building, renovation, and turnkey project management.",
    keywords: [
      "Building Construction Company in Coimbatore",
      "Villa construction Coimbatore",
      "Commercial building contractors Coimbatore",
      "Architectural planning Coimbatore",
      "Turnkey construction services",
      "Vizhi Infragen Realtors",
    ],
  },
  hero: {
    tagline: "TURNKEY QUALITY & ENGINEERING EXCELLENCE",
    title: "Building Construction Company in",
    titleHighlight: "Coimbatore",
    subtext: "Trusted Building Construction Company in Coimbatore",
    backgroundImage: "/assets/images/service-5.jpg",
  },
  premierDesk: {
    tagBadge: "Construction Operations Desk",
    title: "Trusted Building Construction Company in Coimbatore",
    paragraph:
      "If you are planning to build your dream home or a commercial space, Vizhi Infragen Realtors is a reliable building construction company in Coimbatore. With years of on-ground experience delivering quality construction across the city, we help clients turn their vision into a solid, well-built structure without the usual stress of managing contractors and materials. Our team personally oversees every stage of construction, from planning to handover, so when we say we offer genuine, quality-driven building services, we mean a process built on strong engineering, honest costing, and timely delivery.",
    bentoCards: {
      largeCard: {
        title: "Building Construction",
        subtitle: "Turnkey Delivery",
        image: "/assets/images/service-5.jpg",
      },
      smallCard1: {
        title: "Residential Villas",
        subtitle: "Custom Architecture",
        image: "/assets/images/hero-bright-house.jpg",
      },
      smallCard2: {
        title: "Quality Control",
        subtitle: "Structural Integrity",
        image: "/assets/images/land-development.jpg",
      },
    },
  },
  whyChoose: {
    tagBadge: "Why Choose Us",
    title: "Why Choose Vizhi Infragen Realtors",
    paragraph1:
      "Coimbatore's skyline is changing rapidly, with new homes, apartments, and commercial spaces coming up across the city every year. Demand for a dependable building construction company in Coimbatore has grown as more clients realize that poor planning and unreliable contractors can lead to cost overruns and delays. At Vizhi Infragen Realtors, our expertise comes from years of direct project execution across areas like Saravanampatti, Kalapatti, Kovaipudur, Sulur, and Neelambur. We understand local soil conditions, building codes, material quality, and approval processes better than most, which allows us to deliver structures that are safe, durable, and built to last.",
    paragraph2:
      "Every project we undertake goes through a thorough planning and quality check, including structural design review, material testing, and adherence to approved building plans. This due diligence reflects our commitment to trustworthiness, ensuring our clients never face compromised construction quality.",
    image3D: "/assets/images/hero-premium-building.jpg",
  },
  landTypes: [
    {
      id: 1,
      title: "Architectural & Structural Planning",
      badge: "Blueprint & Design",
      icon: "fa-compass-drafting",
      image: "/assets/images/hero-4.jpg",
      description:
        "Designing layouts that balance aesthetics, function, structural strength, and statutory safety compliance.",
      bullets: [
        "Balanced Aesthetics & Structural Safety",
        "Comprehensive Blueprints & 3D Layouts",
      ],
      footerText: "Plan Architecture",
    },
    {
      id: 2,
      title: "Residential Construction",
      badge: "Villas & Homes",
      icon: "fa-house-chimney",
      image: "/assets/images/hero-bright-house.jpg",
      description:
        "Building independent homes, modern duplexes, and luxury villas tailored strictly to your lifestyle requirements.",
      bullets: [
        "Custom Independent Homes & Villas",
        "Turnkey Execution & Quality Finishes",
      ],
      footerText: "Build Residential",
    },
    {
      id: 3,
      title: "Commercial Construction",
      badge: "Office & Retail Units",
      icon: "fa-building",
      image: "/assets/images/land-sales-commercial-new.png",
      description:
        "Constructing office buildings, retail showrooms, godowns, and business spaces engineered for durability and heavy footfall.",
      bullets: [
        "High-Durability Commercial Structures",
        "Corporate & Retail Space Fit-Outs",
      ],
      footerText: "Build Commercial",
    },
    {
      id: 4,
      title: "Renovation & Interior Work",
      badge: "Modern Upgrades",
      icon: "fa-paint-roller",
      image: "/assets/images/carousel-villa-2.jpg",
      description:
        "Upgrading existing structures with modern architectural finishes, smart space plans, and premium interior decor.",
      bullets: [
        "Structural Modernization & Layout Changes",
        "Turnkey Interior & Exterior Refurbishment",
      ],
      footerText: "Explore Interiors",
    },
    {
      id: 5,
      title: "Project Management",
      badge: "Timeline Control",
      icon: "fa-list-check",
      image: "/assets/images/val-accountability.jpg",
      description:
        "Coordinating labor, high-grade materials, and construction milestones to keep every project strictly on track.",
      bullets: [
        "Vetted Labor & Material Oversight",
        "On-Time Milestone & Budget Delivery",
      ],
      footerText: "Manage Project",
    },
  ] as LandTypeCard[],
  trustworthiness: {
    eyebrow: "TRANSPARENCY GUARANTEE",
    title: "What Makes Our Construction Services Trustworthy",
    leadDesc:
      "Trust is built through transparency, and that is exactly how Vizhi Infragen Realtors operates. When you choose our building construction company in Coimbatore services, you receive:",
    backgroundImage: "/assets/images/daylight-villa-1.png",
    reputationNote:
      "Our reputation in Coimbatore has been built over years of completed projects and satisfied clients, which speaks to the authority and reliability we bring to every construction we undertake.",
    items: [
      {
        id: 1,
        num: "01",
        title: "Itemized Cost Estimates",
        desc: '"Clear, itemized cost estimates with no hidden charges."',
        author: "Construction Estimation Desk",
        sub: "Fixed Material & Labor Costing",
      },
      {
        id: 2,
        num: "02",
        title: "Material Quality Sourcing",
        desc: '"Quality material sourcing and regular site quality checks."',
        author: "Quality Assurance Desk",
        sub: "Standardized Steel, Cement & Concrete Audits",
      },
      {
        id: 3,
        num: "03",
        title: "Realistic Timelines",
        desc: '"Realistic timelines with regular progress updates."',
        author: "Project Control Desk",
        sub: "Milestone-Driven Execution Logs",
      },
      {
        id: 4,
        num: "04",
        title: "Honest & Unbiased Advice",
        desc: '"Honest advice on design changes, budgeting, and material choices."',
        author: "Uncompromised Engineering Desk",
        sub: "Optimizing Value Without Quality Sacrifice",
      },
      {
        id: 5,
        num: "05",
        title: "Design-to-Handover Support",
        desc: '"Support from the first design sketch through to final handover."',
        author: "Turnkey Projects Desk",
        sub: "100% Move-In Ready Completion",
      },
    ] as TrustItem[],
  },
  process: {
    tagBadge: "Engineering Journey",
    title: "How Our Building Construction Process Works",
    subtext:
      "Constructing a building is a significant investment, and our process is designed to make it simple and stress-free:",
    steps: [
      {
        step: 1,
        title: "Consultation",
        desc: "Share your requirements, budget, and preferred design style.",
        image: "/assets/images/mission-meeting.jpg",
      },
      {
        step: 2,
        title: "Planning and Design",
        desc: "Our team prepares architectural and structural plans for your approval.",
        image: "/assets/images/hero-4.jpg",
      },
      {
        step: 3,
        title: "Approvals",
        desc: "We assist with obtaining necessary permits and regulatory clearances.",
        image: "/assets/images/val-transparency.jpg",
      },
      {
        step: 4,
        title: "Construction",
        desc: "Our skilled team executes the build with regular quality checks.",
        image: "/assets/images/land-development.jpg",
      },
      {
        step: 5,
        title: "Handover",
        desc: "We complete finishing work and hand over a move-in ready structure.",
        image: "/assets/images/key-handover.jpg",
      },
    ] as ProcessStep[],
  },
  cta: {
    title: "Get in Touch",
    paragraph:
      "Vizhi Infragen Realtors has helped countless clients bring their construction plans to life, backed by local expertise, transparent processes, and honest guidance. Whether you are building a home, an office, or a commercial space, our team is ready to guide you through every step.",
    buttonText: "Contact Vizhi Infragen Today",
    buttonLink: "/contact?service=construction",
    backgroundImage: "/assets/images/carousel-villa-1.jpg",
  },
};
