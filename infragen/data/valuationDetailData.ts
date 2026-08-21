import { LandTypeCard, TrustItem, ProcessStep } from "./landSalesDetailData";

export const valuationDetailData = {
  meta: {
    title: "Building Valuation Company in Coimbatore | Vizhi Infragen Realtors",
    description:
      "Trusted building valuation company in Coimbatore. Bank loan valuation reports, market value assessment, insurance appraisal, legal tax valuation, and rental yield estimation.",
    keywords: [
      "Building Valuation Company in Coimbatore",
      "Property valuation Coimbatore",
      "Bank loan valuation report Coimbatore",
      "Market value appraisal Coimbatore",
      "Property tax valuation",
      "Vizhi Infragen Realtors",
    ],
  },
  hero: {
    tagline: "ACCURATE & CERTIFIED APPRAISAL",
    title: "Building Valuation Company in",
    titleHighlight: "Coimbatore",
    subtext: "Trusted Building Valuation Company in Coimbatore",
    backgroundImage: "/assets/images/service-6.jpg",
  },
  premierDesk: {
    tagBadge: "Valuation Advisory Desk",
    title: "Trusted Building Valuation Company in Coimbatore",
    paragraph:
      "If you need an accurate assessment of your property's worth, Vizhi Infragen Realtors is a dependable building valuation company in Coimbatore. With years of on-ground experience assessing properties across the city, we help owners, buyers, and investors understand the true market value of a building before making major financial decisions. Our team personally inspects every property, studies local market trends, and applies proven valuation methods, so when we say we offer genuine, accurate valuation, we mean a report you can rely on for loans, sales, taxation, or investment planning.",
    bentoCards: {
      largeCard: {
        title: "Building Valuation",
        subtitle: "Fair Market Rate",
        image: "/assets/images/service-6.jpg",
      },
      smallCard1: {
        title: "Bank Loan Reports",
        subtitle: "Certified Appraisal",
        image: "/assets/images/val-expertise.jpg",
      },
      smallCard2: {
        title: "Market Analysis",
        subtitle: "Recent Transaction Logs",
        image: "/assets/images/val-transparency.jpg",
      },
    },
  },
  whyChoose: {
    tagBadge: "Why Choose Us",
    title: "Why Choose Vizhi Infragen Realtors",
    paragraph1:
      "Coimbatore's property market sees constant fluctuation in prices depending on location, infrastructure development, and demand, which makes accurate valuation essential for any major decision. Demand for a dependable building valuation company in Coimbatore has grown as more owners and investors realize that guesswork or outdated pricing can lead to poor financial outcomes. At Vizhi Infragen Realtors, our expertise comes from years of direct valuation work across areas like Saravanampatti, Kalapatti, Kovaipudur, Sulur, and Neelambur. We understand construction quality, land appreciation patterns, and regulatory valuation standards better than most, which allows us to deliver assessments that hold up with banks, buyers, and legal authorities.",
    paragraph2:
      "Every valuation we prepare goes through a thorough inspection and documentation review, including construction quality assessment, land record verification, and comparison with recent local transactions. This due diligence reflects our commitment to trustworthiness, ensuring our clients receive figures that are accurate and defensible.",
    image3D: "/assets/images/coimbatore-map-bg.jpg",
  },
  landTypes: [
    {
      id: 1,
      title: "Market Value Assessment",
      badge: "Fair Market Price",
      icon: "fa-calculator",
      image: "/assets/images/val-expertise.jpg",
      description:
        "Determining fair market price for buying, selling, or strategic investment decisions based on recent neighborhood sales.",
      bullets: [
        "Fair Market Pricing for Buy & Sell",
        "Comparative Neighborhood Trend Logs",
      ],
      footerText: "Assess Market Value",
    },
    {
      id: 2,
      title: "Bank Loan Valuation",
      badge: "Bank Approved",
      icon: "fa-building-columns",
      image: "/assets/images/service-6.jpg",
      description:
        "Preparing certified valuation reports accepted by nationalized and private banks for mortgage loan processing.",
      bullets: [
        "Reports Accepted by Leading Banks",
        "Fast-Track Mortgage Clearance Support",
      ],
      footerText: "Get Bank Report",
    },
    {
      id: 3,
      title: "Insurance Valuation",
      badge: "Reconstruction Cost",
      icon: "fa-shield-halved",
      image: "/assets/images/hero-bright-house.jpg",
      description:
        "Assessing building replacement and reconstruction costs to ensure precise hazard and fire insurance coverage.",
      bullets: [
        "Accurate Replacement Costing",
        "Comprehensive Risk & Hazard Audits",
      ],
      footerText: "Calculate Insurance",
    },
    {
      id: 4,
      title: "Taxation & Legal Valuation",
      badge: "Govt & Judicial Proof",
      icon: "fa-scale-balanced",
      image: "/assets/images/val-transparency.jpg",
      description:
        "Providing defensible valuation reports for property tax, wealth tax, capital gains, partition, or court proceedings.",
      bullets: [
        "Capital Gains & Wealth Tax Reports",
        "Judicial & Legal Proceeding Compliance",
      ],
      footerText: "Legal Valuation",
    },
    {
      id: 5,
      title: "Rental Valuation",
      badge: "Yield Estimation",
      icon: "fa-chart-pie",
      image: "/assets/images/service-9.jpg",
      description:
        "Estimating realistic rental yield based on physical property condition, locality amenities, and demand trends.",
      bullets: [
        "Locality Rental Yield Benchmarks",
        "Property Condition & Amenities Audit",
      ],
      footerText: "Estimate Rent",
    },
  ] as LandTypeCard[],
  trustworthiness: {
    eyebrow: "TRANSPARENCY GUARANTEE",
    title: "What Makes Our Valuation Services Trustworthy",
    leadDesc:
      "Trust is built through transparency, and that is exactly how Vizhi Infragen Realtors operates. When you choose our building valuation company in Coimbatore services, you receive:",
    backgroundImage: "/assets/images/daylight-villa-1.png",
    reputationNote:
      "Our reputation in Coimbatore has been built over years of accurate assessments and repeat client trust, which speaks to the authority and reliability we bring to every valuation we prepare.",
    items: [
      {
        id: 1,
        num: "01",
        title: "Detailed Reports",
        desc: '"Detailed, well-documented valuation reports."',
        author: "Valuation Engineering Desk",
        sub: "Complete Documented Dossiers",
      },
      {
        id: 2,
        num: "02",
        title: "Transparent Methodology",
        desc: '"Transparent methodology with no inflated or understated figures."',
        author: "Unbiased Valuation Desk",
        sub: "Scientific Valuation Modeling",
      },
      {
        id: 3,
        num: "03",
        title: "Bank & Legal Acceptance",
        desc: '"Reports accepted by banks, legal bodies, and government authorities."',
        author: "Compliance Authority Desk",
        sub: "100% Institutional Recognition",
      },
      {
        id: 4,
        num: "04",
        title: "Honest Guidance",
        desc: '"Honest guidance on factors affecting your property\'s value."',
        author: "Real Estate Advisory Desk",
        sub: "Factors Impacting Appreciation",
      },
      {
        id: 5,
        num: "05",
        title: "Quick Turnaround",
        desc: '"Quick turnaround without compromising accuracy."',
        author: "Rapid Inspection Operations",
        sub: "Prompt Report Delivery",
      },
    ] as TrustItem[],
  },
  process: {
    tagBadge: "Valuation Workflow",
    title: "How Our Building Valuation Process Works",
    subtext:
      "Getting an accurate valuation requires a structured approach, and ours is designed to make the process simple and reliable:",
    steps: [
      {
        step: 1,
        title: "Consultation",
        desc: "Share details about your property and the purpose of the valuation.",
        image: "/assets/images/mission-meeting.jpg",
      },
      {
        step: 2,
        title: "Site Inspection",
        desc: "Our team visits the property to assess construction quality and condition.",
        image: "/assets/images/land-development.jpg",
      },
      {
        step: 3,
        title: "Market Analysis",
        desc: "We study recent transactions and local price trends for comparison.",
        image: "/assets/images/val-expertise.jpg",
      },
      {
        step: 4,
        title: "Report Preparation",
        desc: "A detailed valuation report is prepared based on our findings.",
        image: "/assets/images/val-transparency.jpg",
      },
      {
        step: 5,
        title: "Delivery and Support",
        desc: "We hand over the report and remain available to clarify any queries.",
        image: "/assets/images/key-handover.jpg",
      },
    ] as ProcessStep[],
  },
  cta: {
    title: "Get in Touch",
    paragraph:
      "Vizhi Infragen Realtors has helped countless clients get accurate, dependable property assessments, backed by local expertise, transparent processes, and honest guidance. Whether you need a valuation for a loan, sale, insurance, or legal purpose, our team is ready to assist.",
    buttonText: "Contact Vizhi Infragen Today",
    buttonLink: "/contact?service=valuation",
    backgroundImage: "/assets/images/carousel-villa-1.jpg",
  },
};
