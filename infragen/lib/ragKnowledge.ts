// ── Vizhi Infragen Realtors LLP — Official RAG Knowledge Base ─────────────────
// Content extracted WORD-FOR-WORD from official website documents.
// The AI chatbot answers ONLY from this knowledge — English only.

export interface KnowledgeChunk {
  id: string;
  category: string;
  title: string;
  content: string;
  keywords: string[];
}

export const ragKnowledge: KnowledgeChunk[] = [

  // ══════════════════════════════════════════════════════════════════════════════
  // HOME PAGE
  // ══════════════════════════════════════════════════════════════════════════════
  {
    id: "home_banner",
    category: "company",
    title: "About Vizhi Infragen Realtors LLP — Trusted Real Estate Company in Coimbatore",
    content: `Vizhi Infragen Realtors LLP is a trusted real estate and property management company in Coimbatore. With over 6 years of experience, we help individuals, investors, businesses, and NRI clients buy, sell, manage, and develop properties. Our local expertise, transparent approach, and reliable guidance ensure confident real estate decisions.

Your Reliable Partner for Land, Property & Asset Management in Coimbatore.`,
    keywords: ["about", "who are you", "vizhi infragen", "company", "coimbatore", "real estate company", "overview", "6 years", "trusted", "property management company"],
  },
  {
    id: "home_why_choose",
    category: "company",
    title: "Why Property Owners and Investors Choose Vizhi Infragen",
    content: `As a trusted real estate company in Coimbatore, we have built our reputation on honesty and follow-through rather than sales pressure. Here is what sets us apart:

• Transparent dealings — clear documentation, honest pricing, no hidden surprises.
• Genuine local expertise — first-hand knowledge of Coimbatore's micro-markets and approval bodies.
• Personalised solutions — advice shaped around your budget, timeline, and objectives.
• End-to-end support — from site selection and documentation to handover and ongoing management.
• Trusted local network — verified contacts across legal, survey, banking, and construction.
• Strong market knowledge — data-backed guidance on where, when, and how to invest.
• NRI-friendly services — built specifically for owners managing property from overseas.
• Investment-focused approach — every recommendation weighed for long-term return, not a quick deal.`,
    keywords: ["why choose", "why trust", "advantages", "benefits", "transparent", "local expertise", "nri friendly", "personalised", "reputation", "what sets you apart"],
  },
  {
    id: "home_services_overview",
    category: "services",
    title: "Our Real Estate Services in Coimbatore — Complete Range",
    content: `We offer a complete range of property services under one roof, so you never have to coordinate multiple agencies.

1. Land Sales — Verified plots, agricultural land, and development sites across Coimbatore, listed with clear titles and fair market pricing.
2. Land Purchase Assistance — End-to-end buyer support, including site shortlisting, due diligence, price negotiation, and title verification, so you invest with confidence.
3. Property Management — As an experienced property management company in Coimbatore, we handle residential and commercial assets with care: tenant coordination, rent collection, maintenance, and regular property inspections.
4. NRI Property Management — A dedicated, NRI-focused service that protects your property while you are abroad — secure rent handling, encroachment monitoring, document management, and transparent reporting you can trust from anywhere in the world.
5. Building Construction — Reliable construction support for homes, commercial units, and rental developments, managed with quality control and on-time delivery.
6. Building Valuation — Accurate, market-aligned valuations for sale, purchase, loan, or legal purposes, prepared with local price intelligence.
7. Land Approval and Documentation — Guidance through DTCP/local body approvals, registrations, and paperwork, reducing delays and compliance risk.
8. Land Conversion Services — Professional assistance converting agricultural land to residential or commercial use, handled correctly the first time.
9. Rental Services — Tenant sourcing and rental management for owners, plus property-finding help for tenants seeking homes, offices, and commercial space.
10. Warehouse and Corporate Solutions — Industrial and commercial real estate support for businesses needing warehousing, godowns, and corporate spaces along Coimbatore's key logistics routes.`,
    keywords: ["services", "what do you do", "all services", "land sales", "purchase assistance", "property management", "nri", "construction", "valuation", "approvals", "conversion", "rental", "warehouse", "corporate"],
  },
  {
    id: "home_areas_served",
    category: "areas",
    title: "Areas We Serve Across Coimbatore",
    content: `Coimbatore is one of Tamil Nadu's most dynamic real estate markets, and growth is concentrated in specific high-potential pockets. We provide focused services across these areas:

• Pattanam — A steadily appreciating residential and plot market.
• Sulur — Strong demand near the airport and industrial zones.
• Neelambur — A prime corridor for warehousing and corporate development.
• Kalapatti — Fast-growing residential and IT-adjacent belt.
• Sathy Road — Active residential and commercial land movement.
• Trichy Road — Established commercial and investment hotspot.
• Avinashi Road — Coimbatore's premier business and connectivity corridor.

Wherever you are buying, selling, or building in and around Coimbatore, we bring local insight that generic, citywide agents simply cannot match.`,
    keywords: ["areas", "locations", "pattanam", "sulur", "neelambur", "kalapatti", "sathy road", "trichy road", "avinashi road", "coimbatore areas", "where do you serve", "coverage"],
  },
  {
    id: "home_trust",
    category: "company",
    title: "Built on Experience, Run on Trust — Vizhi Infragen",
    content: `Real estate works on confidence, and confidence is earned. What makes Vizhi Infragen a trusted real estate company in Coimbatore is that every transaction is handled by people who have done it before — verifying documents, walking sites, negotiating fair deals, and standing behind clients long after the paperwork is signed.

The same care defines our work as a property management company in Coimbatore: clear records, honest timelines, realistic valuations, and straight answers even when they are not what you hoped to hear. For our NRI clients especially, this transparency is everything — you receive consistent updates and verifiable reporting so your property is as secure as if you were managing it yourself.`,
    keywords: ["trust", "experience", "reputation", "reliable", "honest", "nri updates", "reporting", "straight answers", "confidence"],
  },
  {
    id: "home_faq_trusted",
    category: "faq",
    title: "FAQ: What makes Vizhi Infragen a trusted real estate company in Coimbatore?",
    content: `Our reputation rests on transparent dealings, verified documentation, first-hand local market knowledge, and end-to-end support across Coimbatore's key growth corridors.`,
    keywords: ["faq trusted", "why trusted", "what makes trusted", "reputation faq"],
  },
  {
    id: "home_faq_full_service",
    category: "faq",
    title: "FAQ: Are you a full-service property management company in Coimbatore?",
    content: `Yes. We manage residential and commercial assets including tenant coordination, rent collection, maintenance, and inspections — and offer dedicated NRI property management.`,
    keywords: ["faq property management", "full service", "do you manage", "residential commercial"],
  },
  {
    id: "home_faq_areas",
    category: "faq",
    title: "FAQ: Which areas in Coimbatore do you cover?",
    content: `We serve all of Coimbatore, with deep focus on Pattanam, Sulur, Neelambur, Kalapatti, and the Sathy Road, Trichy Road, and Avinashi Road corridors.`,
    keywords: ["faq areas", "which areas", "where coimbatore", "coverage faq", "locations covered"],
  },
  {
    id: "home_faq_approvals",
    category: "faq",
    title: "FAQ: Can you assist with land approvals, conversion, construction, and valuation?",
    content: `Absolutely. We handle approvals, documentation, agricultural-to-residential conversion, building construction, and accurate market valuations end-to-end.`,
    keywords: ["faq approvals", "faq conversion", "faq construction", "faq valuation", "all services faq"],
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // ABOUT PAGE
  // ══════════════════════════════════════════════════════════════════════════════
  {
    id: "about_banner",
    category: "company",
    title: "About Us — A Trusted Real Estate and Property Management Company in Coimbatore",
    content: `Vizhi Infragen Realtors LLP is a professional real estate and property management company based in Coimbatore, Tamil Nadu. We help individuals, investors, corporates, and NRI clients buy, sell, manage, and develop property with complete transparency and dependable, hands-on expertise.

Real estate is rarely just a transaction. It is a home, a retirement plan, an inheritance, or a business decision that affects a family for years. We built Vizhi Infragen around that reality — to take the uncertainty out of property dealings in Coimbatore and replace it with clear advice, honest documentation, and follow-through you can rely on.

From the established corridors of Avinashi Road, Trichy Road, and Sathy Road to the fast-growing belts of Pattanam, Sulur, Neelambur, and Kalapatti, we bring genuine, on-the-ground market knowledge to every client we serve.`,
    keywords: ["about us", "about vizhi infragen", "who we are", "professional", "coimbatore", "transparency", "nri", "investors", "real estate"],
  },
  {
    id: "about_story",
    category: "company",
    title: "Our Story — Vizhi Infragen Realtors LLP",
    content: `What began as a commitment to do real estate the right way has grown into a full-service property partner for clients across Coimbatore and beyond. Over 7 years, we have guided buyers through due diligence, helped sellers reach the right price, managed assets for owners living overseas, and supported families through approvals, valuations, and construction.

Through it all, one principle has stayed constant: transparency builds trust, and trust builds lasting relationships. It is the reason so much of our work comes from referrals and repeat clients.`,
    keywords: ["our story", "history", "7 years", "background", "referrals", "repeat clients", "how we started", "journey"],
  },
  {
    id: "about_vision",
    category: "company",
    title: "Our Vision — Vizhi Infragen Realtors LLP",
    content: `To become South India's most trusted real estate and property management company by delivering transparent, sustainable, and value-driven property solutions.

We measure success not by the number of deals we close, but by the long-term value and confidence we create for the people who choose us.`,
    keywords: ["vision", "goal", "south india", "trusted", "sustainable", "value driven", "long term"],
  },
  {
    id: "about_mission",
    category: "company",
    title: "Our Mission — Vizhi Infragen Realtors LLP",
    content: `Our Mission:
• Provide end-to-end property solutions — from site selection and documentation to construction, valuation, and ongoing management, all under one roof.
• Offer hassle-free property management for NRI clients — so owners abroad can rely on secure, transparent, fully reported care for their property back home.
• Build long-term relationships through trust and professionalism — earning loyalty through honesty, consistency, and accountability rather than short-term gain.
• Deliver expert guidance for real estate investments — backed by real local market knowledge that helps clients invest with clarity and confidence.`,
    keywords: ["mission", "purpose", "objectives", "end to end", "nri property management", "long term relationships", "investment guidance"],
  },
  {
    id: "about_values",
    category: "company",
    title: "The Values That Guide Vizhi Infragen",
    content: `The Values That Guide Us:
• Transparency — clear pricing, verified documentation, and honest timelines, with no hidden surprises.
• Expertise — first-hand knowledge of Coimbatore's micro-markets, approval bodies, and price trends.
• Accountability — we stand behind our clients long after the paperwork is signed.
• Sustainability — value-driven, responsible solutions designed to last, not just to close a deal.
• Client-first thinking — advice shaped around your goals, your budget, and your timeline.`,
    keywords: ["values", "core values", "transparency", "expertise", "accountability", "sustainability", "client first", "principles", "ethics"],
  },
  {
    id: "about_what_we_do",
    category: "services",
    title: "What We Do — Full Range of Property Services",
    content: `We offer a complete range of property services so you never have to coordinate multiple agencies: Land Sales, Land Purchase Assistance, Property Management, NRI Property Management, Building Construction, Building Valuation, Land Approval and Documentation, Land Conversion Services, Rental Services, and Warehouse and Corporate Solutions.

Whether you are investing in land, selling an asset, managing property from overseas, or building from the ground up, our team handles the complexity so you can make decisions with peace of mind.`,
    keywords: ["what we do", "all services list", "complete services", "property services", "under one roof"],
  },
  {
    id: "about_why_clients_trust",
    category: "company",
    title: "Why Clients Trust Vizhi Infragen",
    content: `Confidence in real estate is earned, never claimed. Every transaction we handle is led by people who have done it before — verifying titles, walking sites, negotiating fairly, and reporting honestly. For our NRI clients especially, this means consistent updates and verifiable records, so your property is as secure as if you were managing it yourself.

We believe in showing our work, not just promising results. That commitment to professionalism and transparency is what makes Vizhi Infragen a partner clients return to and recommend.`,
    keywords: ["why clients trust", "client trust", "professionalism", "verifiable records", "nri security", "recommend", "repeat clients"],
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // SERVICES PAGE
  // ══════════════════════════════════════════════════════════════════════════════
  {
    id: "services_banner",
    category: "services",
    title: "Complete Real Estate and Property Management Solutions in Coimbatore",
    content: `At Vizhi Infragen Realtors LLP, we offer a full range of real estate and property management services under one roof — so you never have to coordinate multiple agencies, lawyers, or contractors on your own. From buying and selling land to managing assets for NRI owners and delivering turnkey construction, every service is handled with transparency, local market knowledge, and end-to-end support across Coimbatore and its fast-growing corridors, including Pattanam, Sulur, Neelambur, Kalapatti, Sathy Road, Trichy Road, and Avinashi Road.`,
    keywords: ["services overview", "complete solutions", "all services", "real estate solutions", "property management solutions", "under one roof"],
  },
  {
    id: "service_land_sales",
    category: "services",
    title: "Land Sales — Verified Plots and Land for Sale in Coimbatore",
    content: `Whether you are buying your first plot or expanding an investment portfolio, we offer verified, clear-title land across Coimbatore with honest pricing and complete documentation. Our listings are matched to your purpose, budget, and long-term goals.

Types of land available:
• Agricultural land
• Residential land
• Commercial land
• Investment properties
• Premium land parcels

We help you understand each property's location advantages, growth potential, and approval status before you commit — so every purchase is an informed one.`,
    keywords: ["land sales", "plots for sale", "buy land", "agricultural land", "residential land", "commercial land", "investment land", "premium land", "verified plots", "clear title"],
  },
  {
    id: "service_land_purchase",
    category: "services",
    title: "Land Purchase Assistance in Coimbatore",
    content: `Finding the right property is only half the journey; buying it safely is the rest. Our purchase assistance gives you expert support at every step, from shortlisting the right site to closing the deal at a fair price.

Services include:
• Property sourcing
• Investment consultation
• Site identification
• Price negotiation

We combine first-hand knowledge of Coimbatore's micro-markets with careful due diligence, helping you invest with clarity and confidence.`,
    keywords: ["land purchase assistance", "buy land help", "property sourcing", "site identification", "price negotiation", "due diligence", "buying support", "shortlisting"],
  },
  {
    id: "service_property_management",
    category: "services",
    title: "Property Management in Coimbatore",
    content: `Owning a property should not be a constant worry. Our property management service keeps your asset secure, maintained, and well-managed, whether you live nearby or far away.

Services include:
• Regular property inspections
• Property maintenance
• Cleaning supervision
• Security monitoring
• Utility management

You receive consistent oversight and clear reporting, so your property stays protected and in good condition all year round.`,
    keywords: ["property management", "manage property", "property inspections", "maintenance", "cleaning", "security monitoring", "utility management", "property care"],
  },
  {
    id: "service_nri_property_management",
    category: "services",
    title: "NRI Property Management in Coimbatore",
    content: `Managing property from abroad brings unique challenges — distance, paperwork, and the constant question of who you can trust. Our dedicated NRI property management service is built specifically to solve them.

Services include:
• End-to-end property care
• Tenant management
• Documentation assistance
• Construction supervision
• Periodic updates
• Property maintenance

We provide secure, transparent, fully reported care so your property back home is looked after as if you were managing it yourself — with regular updates you can rely on from anywhere in the world.`,
    keywords: ["nri property management", "nri services", "overseas property", "property abroad", "tenant management", "documentation nri", "construction supervision nri", "periodic updates", "remote property care"],
  },
  {
    id: "service_building_construction",
    category: "services",
    title: "Building Construction in Coimbatore",
    content: `From a family home to a commercial project, we deliver dependable construction with quality control and on-time completion. We manage the complexity so you can watch your vision take shape with peace of mind.

Services include:
• Residential construction
• Commercial construction
• Turnkey projects
• Project supervision

Whether you need full turnkey delivery or expert supervision of an ongoing build, we keep your project on schedule and to standard.`,
    keywords: ["building construction", "residential construction", "commercial construction", "turnkey", "project supervision", "home construction", "construction company", "builder coimbatore"],
  },
  {
    id: "service_building_valuation",
    category: "services",
    title: "Building Valuation in Coimbatore",
    content: `Accurate valuation is the foundation of every smart property decision. We provide market-aligned valuations backed by real local price intelligence — for sale, purchase, loan, or planning purposes.

Services include:
• Property valuation
• Market assessment
• Investment analysis

Our assessments give you a clear, realistic picture of what a property is truly worth and how it fits your investment goals.`,
    keywords: ["building valuation", "property valuation", "market assessment", "investment analysis", "valuation report", "property worth", "loan valuation", "valuation company"],
  },
  {
    id: "service_land_approvals",
    category: "services",
    title: "Land Approvals and Documentation in Coimbatore",
    content: `Property paperwork can stall a deal or create costly risk if it is not handled correctly. We guide you through approvals and documentation from start to finish, keeping you compliant and on schedule.

Services include:
• Legal verification
• Government approvals
• Documentation support
• Registration assistance

With our verified local network and process knowledge, we reduce delays and protect you from avoidable complications.`,
    keywords: ["land approvals", "documentation", "legal verification", "government approvals", "registration assistance", "dtcp approvals", "documentation company", "paperwork", "compliance"],
  },
  {
    id: "service_land_conversion",
    category: "services",
    title: "Land Conversion Services in Coimbatore",
    content: `Converting agricultural land for residential or commercial use involves specific regulations and approvals. We handle the process professionally and correctly the first time.

Services include:
• Agricultural to non-agricultural conversion
• Regulatory guidance

We manage the requirements end-to-end and keep you informed at every stage, so your land is ready for its intended use without unnecessary hurdles.`,
    keywords: ["land conversion", "agricultural to residential", "agricultural to commercial", "non agricultural", "conversion services", "regulatory guidance", "convert land"],
  },
  {
    id: "service_rental",
    category: "services",
    title: "Rental Services in Coimbatore — For Owners and Tenants",
    content: `For owners, we make renting effortless and secure. For tenants, we help find the right space. Either way, you get reliable, well-managed rental support.

Services include:
• Tenant sourcing
• Lease agreements
• Rental property management

We screen tenants, prepare clear lease agreements, and manage the rental relationship so your property earns steadily and stays protected.`,
    keywords: ["rental services", "tenant sourcing", "lease agreement", "rental management", "find tenant", "rent property", "tenant screening"],
  },
  {
    id: "service_warehouse_corporate",
    category: "services",
    title: "Warehouse and Corporate Solutions in Coimbatore",
    content: `Businesses need the right space in the right location. We provide industrial and commercial real estate support along Coimbatore's key logistics and business corridors.

Services include:
• Warehouse sourcing
• Industrial property assistance
• Corporate space requirements

From warehousing and godowns to corporate offices, we help you secure spaces that match your operational needs and growth plans.`,
    keywords: ["warehouse", "corporate solutions", "industrial property", "godown", "corporate space", "warehouse sourcing", "logistics corridor", "business space"],
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // LAND FOR SALE PAGE
  // ══════════════════════════════════════════════════════════════════════════════
  {
    id: "land_for_sale_page",
    category: "land",
    title: "Land for Sale in Coimbatore — Vizhi Infragen Realtors",
    content: `If you are searching for land for sale in Coimbatore, Vizhi Infragen Realtors is your reliable local partner. With years of on-ground experience in the Coimbatore real estate market, we help individuals, families, and investors find verified, well-located land parcels that match their budget and long-term goals. Our team personally inspects every listing before it reaches our clients — so when we say we offer genuine, verified plots, we mean land that is legally clear, properly documented, and ready for registration.

Coimbatore is one of Tamil Nadu's fastest-growing cities, known for its industrial base, educational institutions, and pleasant climate. Demand for land has grown steadily as more people look to build homes, start businesses, or invest for future returns.

Types of land for sale in Coimbatore we offer:
• Residential plots — DTCP-approved layouts suitable for building independent homes
• Agricultural land — Fertile land parcels on the outskirts, ideal for farming or long-term holding
• Commercial land — Strategic plots near highways and business hubs for shops, warehouses, or offices
• Investment plots — Land in upcoming growth zones with strong future appreciation potential
• Premium land parcels — Handpicked, high-value plots in prime and gated locations

What makes our land listings trustworthy:
• Clear title documents and verified ownership records
• Transparent pricing with no hidden charges
• Site visits arranged at your convenience
• Guidance on loan assistance and registration procedures
• Honest advice, even if it means recommending against a particular plot

How to buy land with us:
Step 1: Consultation — Share your budget, location preference, and purpose
Step 2: Shortlisting — We match you with suitable options from our current listings
Step 3: Site Visit — Visit the shortlisted plots with our team for a firsthand look
Step 4: Verification — We assist with document checks and legal clarity
Step 5: Registration — We support you through the final registration process`,
    keywords: ["land for sale", "plots for sale coimbatore", "buy land coimbatore", "residential plots", "agricultural land", "commercial land", "investment plots", "premium plots", "dtcp approved", "verified plots", "land listings"],
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // LAND PURCHASE ASSISTANCE PAGE
  // ══════════════════════════════════════════════════════════════════════════════
  {
    id: "land_purchase_assistance_page",
    category: "land",
    title: "Land Purchase Assistance in Coimbatore — Full Process",
    content: `If you are looking for reliable land purchase assistance in Coimbatore, Vizhi Infragen Realtors is the local partner you can count on. With years of on-ground experience guiding buyers through the Coimbatore real estate market, we help individuals, families, and investors make informed decisions at every step.

Our Land Purchase Assistance Services in Coimbatore:
• Document verification — Checking patta, encumbrance certificate, and title records before you commit
• Site evaluation — Assessing location, approach road, soil, and future development potential
• Price negotiation — Representing your interests to secure fair market value
• Loan and finance guidance — Coordinating with banks and financial institutions for smooth funding
• Registration support — Managing paperwork, stamp duty, and legal formalities through trusted partners

What you receive when you choose us:
• Clear title documents and verified ownership records
• Transparent pricing with no hidden charges
• Site visits arranged at your convenience
• Honest advice, even if it means recommending against a particular plot
• Support from consultation through to final registration

How our land purchase assistance process works:
Step 1: Consultation — Share your budget, location preference, and purpose (residential, agricultural, commercial, or investment)
Step 2: Shortlisting — We match you with suitable plots based on your requirements
Step 3: Site Visit — Visit shortlisted plots with our team for a firsthand look
Step 4: Verification — We handle document checks and legal clarity on your behalf
Step 5: Registration — We support you through the final registration process`,
    keywords: ["land purchase assistance", "buying land help", "document verification", "patta", "encumbrance certificate", "site evaluation", "price negotiation", "loan guidance", "registration support", "how to buy land", "purchase process"],
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // PROPERTY MANAGEMENT PAGE
  // ══════════════════════════════════════════════════════════════════════════════
  {
    id: "property_management_page",
    category: "property_management",
    title: "Property Management Company in Coimbatore — Full Services",
    content: `If you own residential or commercial property and need dependable support, Vizhi Infragen Realtors is a trusted property management company in Coimbatore. With years of on-ground experience handling properties across the city, we help owners protect their investments, maintain their assets, and earn steady returns without the day-to-day hassle. Our team personally inspects every property under our care, coordinates with tenants, and manages maintenance.

Our Property Management Services in Coimbatore:
• Tenant sourcing and screening — Finding reliable tenants and verifying their background before move-in
• Rent collection — Timely collection and transparent accounting of monthly rent
• Property maintenance — Regular upkeep, repairs, and vendor coordination to keep the property in top condition
• Legal and compliance support — Managing lease agreements, renewals, and local regulatory requirements
• Property inspections — Periodic checks to ensure the property is well maintained and tenants are compliant

What you receive when you choose our property management:
• Clear, itemized accounting of rent and expenses
• Transparent pricing with no hidden charges
• Regular property inspection reports
• Honest advice on repairs, rent revisions, and tenant matters
• Support from tenant onboarding through to lease renewal or exit

How our property management process works:
Step 1: Consultation — Share details about your property, location, and management requirements
Step 2: Property Assessment — Our team inspects the property and recommends necessary improvements
Step 3: Tenant Placement — We source, screen, and onboard reliable tenants
Step 4: Ongoing Management — We handle rent collection, maintenance, and compliance on your behalf
Step 5: Regular Reporting — You receive periodic updates on your property's condition and finances`,
    keywords: ["property management", "property management company", "manage property coimbatore", "tenant sourcing", "rent collection", "property maintenance", "lease agreements", "property inspections", "management process", "residential management", "commercial management"],
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // NRI PROPERTY MANAGEMENT PAGE
  // ══════════════════════════════════════════════════════════════════════════════
  {
    id: "nri_property_management_page",
    category: "nri",
    title: "NRI Property Management Company in Coimbatore — Full Services",
    content: `If you live abroad and own property back home, Vizhi Infragen Realtors is a dependable NRI property management company in Coimbatore. With years of on-ground experience serving Non-Resident Indians, we help owners protect their investments, maintain their properties, and stay worry-free despite the distance.

Our NRI Property Management Services in Coimbatore:
• Tenant sourcing and screening — Finding reliable tenants and verifying their background before move-in
• Rent collection and remittance support — Timely collection and secure transfer of rental income
• Property maintenance — Regular upkeep, repairs, and vendor coordination without requiring your presence
• Power of attorney assistance — Guidance on documentation needed to authorize local representation
• Legal and compliance support — Managing lease agreements, renewals, taxation, and regulatory requirements on your behalf

What you receive when you choose our NRI property management:
• Clear, itemized accounting of rent and expenses, shared digitally
• Transparent pricing with no hidden charges
• Regular property inspection reports with photos and updates
• Honest advice on repairs, rent revisions, and tenant matters
• A dedicated point of contact who understands NRI concerns and time-zone constraints

How our NRI property management process works:
Step 1: Consultation — Share details about your property, location, and management requirements over a call or video meeting
Step 2: Documentation Setup — We guide you through power of attorney and other required paperwork
Step 3: Property Assessment — Our team inspects the property and recommends necessary improvements
Step 4: Tenant Placement — We source, screen, and onboard reliable tenants
Step 5: Ongoing Management and Reporting — We handle rent collection, maintenance, and compliance while keeping you updated regularly`,
    keywords: ["nri property management", "nri services coimbatore", "non resident indian", "property management abroad", "overseas property care", "power of attorney", "poa", "rent remittance", "nri tenant management", "digital reports nri", "nri process", "manage property from abroad"],
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // BUILDING CONSTRUCTION PAGE
  // ══════════════════════════════════════════════════════════════════════════════
  {
    id: "building_construction_page",
    category: "construction",
    title: "Building Construction Company in Coimbatore — Services and Process",
    content: `If you are planning to build your dream home or a commercial space, Vizhi Infragen Realtors is a reliable building construction company in Coimbatore. With years of on-ground experience delivering quality construction across the city, we help clients turn their vision into a solid, well-built structure without the usual stress of managing contractors and materials.

Our Building Construction Services in Coimbatore:
• Architectural and structural planning — Designing layouts that balance aesthetics, function, and safety
• Residential construction — Building independent homes and villas tailored to your requirements
• Commercial construction — Constructing offices, shops, and business spaces built for durability
• Renovation and interior work — Upgrading existing structures with modern finishes and layouts
• Project management — Coordinating labor, materials, and timelines to keep the project on track

What you receive when you choose our construction services:
• Clear, itemized cost estimates with no hidden charges
• Quality material sourcing and regular site quality checks
• Realistic timelines with regular progress updates
• Honest advice on design changes, budgeting, and material choices
• Support from the first design sketch through to final handover

How our building construction process works:
Step 1: Consultation — Share your requirements, budget, and preferred design style
Step 2: Planning and Design — Our team prepares architectural and structural plans for your approval
Step 3: Approvals — We assist with obtaining necessary permits and regulatory clearances
Step 4: Construction — Our skilled team executes the build with regular quality checks
Step 5: Handover — We complete finishing work and hand over a move-in ready structure`,
    keywords: ["building construction", "construction company coimbatore", "residential construction", "commercial construction", "home building", "villas", "renovation", "interior work", "architectural planning", "turnkey construction", "construction process"],
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // BUILDING VALUATION PAGE
  // ══════════════════════════════════════════════════════════════════════════════
  {
    id: "building_valuation_page",
    category: "valuation",
    title: "Building Valuation Company in Coimbatore — Services and Process",
    content: `If you need an accurate assessment of your property's worth, Vizhi Infragen Realtors is a dependable building valuation company in Coimbatore. With years of on-ground experience assessing properties across the city, we help owners, buyers, and investors understand the true market value of a building before making major financial decisions.

Our Building Valuation Services in Coimbatore:
• Market value assessment — Determining fair market price for buying, selling, or investment purposes
• Bank loan valuation — Preparing reports accepted by banks and financial institutions for loan processing
• Insurance valuation — Assessing reconstruction cost for accurate insurance coverage
• Taxation and legal valuation — Providing valuation reports for property tax, wealth tax, or legal proceedings
• Rental valuation — Estimating fair rental value based on location and property condition

What you receive when you choose our valuation services:
• Detailed, well-documented valuation reports
• Transparent methodology with no inflated or understated figures
• Reports accepted by banks, legal bodies, and government authorities
• Honest guidance on factors affecting your property's value
• Quick turnaround without compromising accuracy

How our building valuation process works:
Step 1: Consultation — Share details about your property and the purpose of the valuation
Step 2: Site Inspection — Our team visits the property to assess construction quality and condition
Step 3: Market Analysis — We study recent transactions and local price trends for comparison
Step 4: Report Preparation — A detailed valuation report is prepared based on our findings
Step 5: Delivery and Support — We hand over the report and remain available to clarify any queries`,
    keywords: ["building valuation", "property valuation", "valuation company coimbatore", "market value assessment", "bank loan valuation", "insurance valuation", "legal valuation", "rental valuation", "valuation report", "property worth", "valuation process"],
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // LAND APPROVALS & DOCUMENTATION PAGE
  // ══════════════════════════════════════════════════════════════════════════════
  {
    id: "land_approvals_page",
    category: "approvals",
    title: "Land Approvals and Documentation Company in Coimbatore",
    content: `If you need help navigating the paperwork and permissions behind a land purchase or development, Vizhi Infragen Realtors is a dependable land approvals and documentation company in Coimbatore. With years of on-ground experience handling complex approval processes across the city, we help owners, buyers, and developers secure the right permissions and maintain clean, legally sound records.

Our Land Approvals and Documentation Services in Coimbatore:
• DTCP and layout approvals — Assisting with government approvals for residential and commercial layouts
• Patta and chitta transfer — Managing land record transfers and updates with revenue authorities
• Title verification — Reviewing ownership history and encumbrance status before any transaction
• Building plan approvals — Coordinating with local municipal bodies for construction permissions
• Legal documentation support — Preparing and reviewing sale deeds, agreements, and related paperwork

What you receive when you choose our documentation services:
• Accurate, verified paperwork with no shortcuts
• Transparent timelines and honest updates on approval status
• Direct coordination with revenue and municipal authorities
• Guidance on regulatory requirements before you invest
• Support from initial document review through to final approval

How our land approvals and documentation process works:
Step 1: Consultation — Share details about your land and the approvals or documentation you need
Step 2: Record Review — Our team examines existing documents to identify gaps or issues
Step 3: Authority Coordination — We liaise with revenue, municipal, and planning authorities on your behalf
Step 4: Application and Follow-up — We submit applications and track progress until resolution
Step 5: Final Handover — You receive complete, verified documents ready for use`,
    keywords: ["land approvals", "documentation company", "dtcp approval", "patta transfer", "chitta", "title verification", "building plan approval", "sale deed", "legal documentation", "registration", "paperwork", "government approvals", "rera"],
  },

  // ══════════════════════════════════════════════════════════════════════════════
  // CONTACT INFORMATION
  // ══════════════════════════════════════════════════════════════════════════════
  {
    id: "contact_info",
    category: "contact",
    title: "Contact Vizhi Infragen Realtors LLP — Get in Touch",
    content: `Vizhi Infragen Realtors LLP — Your Trusted Partner in Real Estate & Property Management in Coimbatore.

📞 Phone / WhatsApp: +91 96888 89420
📧 Email: vizhiinfragen@gmail.com
📍 Office: Shop No.24, Old Bus Stand, Sulur, Coimbatore, Tamil Nadu
🕒 Office Hours: Monday to Saturday, 9:00 AM – 7:00 PM

Whether you are investing in land, selling a property, managing an asset from overseas, or planning to build, Vizhi Infragen Realtors LLP is your trusted partner for real estate and property management in Coimbatore.

Talk to a Coimbatore Real Estate Expert Today. Contact Vizhi Infragen Realtors to explore our services and take the next step toward your property goal.`,
    keywords: ["contact", "phone", "email", "address", "office", "call us", "whatsapp", "sulur", "timing", "hours", "reach us", "get in touch", "how to contact", "talk to expert"],
  },
];

// ── RAG Search Function — Keyword + Phrase Matching ──────────────────────────

export function searchKnowledge(query: string, topK = 3): KnowledgeChunk[] {
  const q = query.toLowerCase().replace(/[^a-z0-9\s]/g, " ");
  const queryWords = q.split(/\s+/).filter(w => w.length > 2);

  if (queryWords.length === 0) return ragKnowledge.slice(0, topK);

  const scored = ragKnowledge.map(chunk => {
    const haystack = (
      chunk.title + " " + chunk.content + " " + chunk.keywords.join(" ")
    ).toLowerCase();

    let score = 0;

    // Exact keyword phrase match — highest priority
    for (const kw of chunk.keywords) {
      if (q.includes(kw)) {
        score += kw.split(" ").length * 8;
      }
    }

    // Full query found in title — very high boost
    if (chunk.title.toLowerCase().includes(q)) score += 20;

    // Each query word in title
    for (const word of queryWords) {
      if (chunk.title.toLowerCase().includes(word)) score += 5;
    }

    // Each query word in content/keywords
    for (const word of queryWords) {
      if (haystack.includes(word)) {
        score += 2;
        if (chunk.keywords.some(k => k.includes(word))) score += 4;
      }
    }

    // Category boosts
    if (chunk.category === "contact" && (q.includes("contact") || q.includes("phone") || q.includes("call") || q.includes("email") || q.includes("address") || q.includes("office"))) {
      score += 15;
    }
    if (chunk.category === "faq") {
      const faqWords = ["what", "how", "why", "when", "can", "do you", "are you", "is it"];
      if (faqWords.some(fw => q.includes(fw))) score += 3;
    }
    if (chunk.category === "nri" && (q.includes("nri") || q.includes("abroad") || q.includes("overseas") || q.includes("foreign"))) {
      score += 10;
    }

    return { chunk, score };
  });

  const sorted = scored
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (sorted.length === 0) return ragKnowledge.slice(0, 2);
  return sorted.slice(0, topK).map(s => s.chunk);
}

export function getKnowledgeByCategory(category: string): KnowledgeChunk[] {
  return ragKnowledge.filter(c => c.category === category);
}
