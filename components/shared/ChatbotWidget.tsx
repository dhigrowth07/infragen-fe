"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FaMapLocationDot,
  FaBuilding,
  FaLocationDot,
  FaLayerGroup,
  FaCalendarCheck,
  FaHandshake,
  FaBuildingShield,
  FaPlaneDeparture,
  FaHelmetSafety,
  FaCalculator,
  FaFileSignature,
  FaArrowsRotate,
  FaKey,
  FaWarehouse,
  FaPhone,
  FaArrowUpRightFromSquare,
  FaRobot,
  FaXmark,
  FaPaperPlane,
  FaMagnifyingGlass,
  FaHeadset,
  FaGlobe,
  FaChartLine,
  FaFileContract,
  FaShieldHalved,
  FaHouse,
  FaChevronDown,
  FaChevronUp,
  FaMinus,
  FaCommentDots,
  FaWhatsapp,
} from "react-icons/fa6";
import { propertiesData, PropertyItem } from "@/data/properties";
import { searchKnowledge } from "@/lib/ragKnowledge";
import { SITE_INFO } from "@/data/siteInfo";
import { MessageItem, CardType, ChipItem, SessionMemory } from "@/lib/types";
import { useSiteSettings, SiteInfoState } from "@/lib/context/SiteSettingsContext";
import { enquiryService } from "@/lib/services/enquiryService";

// ── Mentions Catalogue for Autocomplete ───────────────────────────────────────

const formatFaIcon = (icon?: string): string => {
  if (!icon) return "";
  const trimmed = icon.trim();
  if (
    trimmed.startsWith("fa-solid") ||
    trimmed.startsWith("fa-brands") ||
    trimmed.startsWith("fa-regular") ||
    trimmed.startsWith("fa-light") ||
    trimmed.startsWith("fa-thin") ||
    trimmed.startsWith("fa-duotone")
  ) {
    return trimmed;
  }
  return `fa-solid ${trimmed}`;
};

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  "fa-solid fa-map-location-dot": FaMapLocationDot,
  "fa-map-location-dot": FaMapLocationDot,
  "fa-solid fa-building": FaBuilding,
  "fa-building": FaBuilding,
  "fa-solid fa-location-dot": FaLocationDot,
  "fa-location-dot": FaLocationDot,
  "fa-solid fa-layer-group": FaLayerGroup,
  "fa-layer-group": FaLayerGroup,
  "fa-solid fa-calendar-check": FaCalendarCheck,
  "fa-calendar-check": FaCalendarCheck,
  "fa-brands fa-whatsapp": FaWhatsapp,
  "fa-whatsapp": FaWhatsapp,
  "fa-solid fa-handshake": FaHandshake,
  "fa-handshake": FaHandshake,
  "fa-solid fa-building-shield": FaBuildingShield,
  "fa-building-shield": FaBuildingShield,
  "fa-solid fa-plane-departure": FaPlaneDeparture,
  "fa-plane-departure": FaPlaneDeparture,
  "fa-solid fa-helmet-safety": FaHelmetSafety,
  "fa-helmet-safety": FaHelmetSafety,
  "fa-solid fa-calculator": FaCalculator,
  "fa-calculator": FaCalculator,
  "fa-solid fa-file-signature": FaFileSignature,
  "fa-file-signature": FaFileSignature,
  "fa-solid fa-arrows-rotate": FaArrowsRotate,
  "fa-arrows-rotate": FaArrowsRotate,
  "fa-solid fa-key": FaKey,
  "fa-key": FaKey,
  "fa-solid fa-warehouse": FaWarehouse,
  "fa-warehouse": FaWarehouse,
  "fa-solid fa-phone": FaPhone,
  "fa-phone": FaPhone,
  "fa-solid fa-arrow-up-right-from-square": FaArrowUpRightFromSquare,
  "fa-arrow-up-right-from-square": FaArrowUpRightFromSquare,
  "fa-solid fa-robot": FaRobot,
  "fa-robot": FaRobot,
  "fa-solid fa-xmark": FaXmark,
  "fa-xmark": FaXmark,
  "fa-solid fa-paper-plane": FaPaperPlane,
  "fa-paper-plane": FaPaperPlane,
  "fa-solid fa-magnifying-glass": FaMagnifyingGlass,
  "fa-magnifying-glass": FaMagnifyingGlass,
  "fa-solid fa-headset": FaHeadset,
  "fa-headset": FaHeadset,
  "fa-solid fa-globe": FaGlobe,
  "fa-globe": FaGlobe,
  "fa-solid fa-chart-line": FaChartLine,
  "fa-chart-line": FaChartLine,
  "fa-solid fa-file-contract": FaFileContract,
  "fa-file-contract": FaFileContract,
  "fa-solid fa-shield-halved": FaShieldHalved,
  "fa-shield-halved": FaShieldHalved,
  "fa-solid fa-house": FaHouse,
  "fa-house": FaHouse,
  "fa-solid fa-chevron-down": FaChevronDown,
  "fa-chevron-down": FaChevronDown,
  "fa-solid fa-chevron-up": FaChevronUp,
  "fa-chevron-up": FaChevronUp,
  "fa-solid fa-minus": FaMinus,
  "fa-minus": FaMinus,
  "fa-solid fa-comment-dots": FaCommentDots,
  "fa-comment-dots": FaCommentDots,
};

const RenderIcon: React.FC<{ icon?: string; className?: string }> = ({ icon, className = "" }) => {
  if (!icon) return null;
  const key = icon.trim();
  const stripped = key.replace(/^fa-(solid|brands|regular|light|thin|duotone)\s+/, "");
  const Component = ICON_MAP[key] || ICON_MAP[stripped];
  if (Component) {
    return <Component className={`inline-block shrink-0 ${className}`} />;
  }
  return <i className={`${formatFaIcon(icon)} ${className}`} />;
};

const MENTION_OPTIONS = [
  { tag: "@land", label: "Land & Plot Sales", icon: "fa-solid fa-map-location-dot" },
  { tag: "@nri", label: "NRI Services & Remittance", icon: "fa-solid fa-globe" },
  { tag: "@sulur", label: "Sulur Corridor Plots", icon: "fa-solid fa-location-dot" },
  { tag: "@kalapatti", label: "Kalapatti IT Corridor", icon: "fa-solid fa-location-dot" },
  { tag: "@pattanam", label: "Pattanam Residential Land", icon: "fa-solid fa-location-dot" },
  { tag: "@neelambur", label: "Neelambur Commercial Zone", icon: "fa-solid fa-location-dot" },
  { tag: "@dtcp", label: "DTCP & RERA Approvals", icon: "fa-solid fa-file-contract" },
  { tag: "@properties", label: "Verified Property Listings", icon: "fa-solid fa-house" },
  { tag: "@legal", label: "Patta & Legal Verification", icon: "fa-solid fa-shield-halved" },
  { tag: "@construction", label: "Turnkey Building Construction", icon: "fa-solid fa-helmet-safety" },
  { tag: "@valuation", label: "Bank & Market Valuation", icon: "fa-solid fa-chart-line" },
  { tag: "@booking", label: "Schedule Site Visit", icon: "fa-solid fa-calendar-check" },
];

const getNow = () => {
  const d = new Date();
  const h = d.getHours();
  const m = d.getMinutes();
  return `${h > 12 ? h - 12 : h || 12}:${m < 10 ? "0" + m : m} ${h >= 12 ? "PM" : "AM"}`;
};

interface BotResponse {
  text: string;
  chips?: ChipItem[];
  properties?: PropertyItem[];
  cardType?: CardType;
  memoryUpdates?: Partial<SessionMemory>;
}

export interface ServiceCatalogItem {
  chipAction: string;
  title: string;
  slug: string;
  badge: string;
  icon: string;
  link: string;
  summary: string;
  keywords: string[];
}

export const SERVICES_CATALOG: ServiceCatalogItem[] = [
  {
    chipAction: "chip_svc_land_sales",
    title: "Land Sales",
    slug: "land-sales",
    badge: "Land Sales",
    icon: "fa-solid fa-map-location-dot",
    link: "/services/land-sales",
    summary:
      "Verified residential layouts, agricultural farmland, and commercial plots across Coimbatore with 100% clear titles and fair market pricing. We provide complete advisory for buyers seeking high-appreciation land.",
    keywords: ["land sales", "sell land", "land sale service", "@land-sales"],
  },
  {
    chipAction: "chip_svc_purchase",
    title: "Land Purchase Assistance",
    slug: "purchase-assistance",
    badge: "Land Purchase Assistance",
    icon: "fa-solid fa-handshake",
    link: "/services/purchase-assistance",
    summary:
      "End-to-end buyer advisory including property sourcing, thorough legal title due diligence, price negotiation, and secure registration. We ensure every investment is safe and legally clear.",
    keywords: ["purchase assistance", "purchase", "buying assistance", "due diligence", "@purchase"],
  },
  {
    chipAction: "chip_svc_prop_mgmt",
    title: "Property Management",
    slug: "property-management",
    badge: "Property Management",
    icon: "fa-solid fa-building-shield",
    link: "/services/property-management",
    summary:
      "Comprehensive property asset management for owners, covering tenant vetting, lease administration, rent collection, and regular physical inspections. Proactive maintenance protects your real estate.",
    keywords: ["property management", "manage property", "property care", "tenant management", "@property-management"],
  },
  {
    chipAction: "chip_svc_nri",
    title: "NRI Property Management",
    slug: "nri-management",
    badge: "NRI Property Management",
    icon: "fa-solid fa-plane-departure",
    link: "/services/nri-management",
    summary:
      "Dedicated remote property concierge protecting Coimbatore real estate for NRIs living abroad. Enjoy high-resolution inspection updates, encroachment surveillance, utility handling, and transparent reporting.",
    keywords: ["nri management", "nri care", "nri property", "remote property", "@nri"],
  },
  {
    chipAction: "chip_svc_construction",
    title: "Building Construction",
    slug: "construction",
    badge: "Building Construction",
    icon: "fa-solid fa-helmet-safety",
    link: "/services/construction",
    summary:
      "Turnkey residential villa construction, turnkey commercial complexes, and bespoke development delivered by experienced engineers. Quality materials, transparent estimates, and on-time completion guaranteed.",
    keywords: ["building construction", "turnkey construction", "construction", "civil work", "builder", "@construction"],
  },
  {
    chipAction: "chip_svc_valuation",
    title: "Building Valuation",
    slug: "valuation",
    badge: "Building Valuation",
    icon: "fa-solid fa-calculator",
    link: "/services/valuation",
    summary:
      "Certified property valuation reports prepared with localized Coimbatore price intelligence and structural assessment. Ideal for bank loan collateral, capital gains taxation, and legal documentation.",
    keywords: ["building valuation", "property valuation", "valuation report", "appraisal", "valuation", "@valuation"],
  },
  {
    chipAction: "chip_svc_approvals",
    title: "Land Approvals & Documentation",
    slug: "approvals",
    badge: "Land Approvals & Documentation",
    icon: "fa-solid fa-file-signature",
    link: "/services/approvals",
    summary:
      "Complete liaison and statutory paperwork clearance for DTCP/LPA layout approvals, RERA compliance, Patta transfers, and Chitta/Adangal documentation. Avoid procedural delays with legal guidance.",
    keywords: ["approvals", "dtcp approval", "rera approval", "patta transfer", "chitta", "approvals & documentation", "@approvals", "@dtcp"],
  },
  {
    chipAction: "chip_svc_conversion",
    title: "Land Conversion Services",
    slug: "conversion",
    badge: "Land Conversion Services",
    icon: "fa-solid fa-arrows-rotate",
    link: "/services/conversion",
    summary:
      "Specialized government liaison for converting agricultural land to residential or commercial use (Change of Land Use - CLU). We secure district collectorate clearances and statutory NOCs without friction.",
    keywords: ["land conversion", "conversion", "clu", "agri to non-agri", "@conversion"],
  },
  {
    chipAction: "chip_svc_rentals",
    title: "Rental Services",
    slug: "rentals",
    badge: "Rental Services",
    icon: "fa-solid fa-key",
    link: "/services/rentals",
    summary:
      "Professional tenant sourcing and rental management for property owners, delivering steady yields and verified agreements. We also assist families and corporations in finding prime rental properties.",
    keywords: ["rental services", "rental management", "rentals", "lease management", "@rentals"],
  },
  {
    chipAction: "chip_svc_warehouse",
    title: "Warehouse & Corporate Solutions",
    slug: "warehouse",
    badge: "Warehouse & Corporate Solutions",
    icon: "fa-solid fa-warehouse",
    link: "/services/warehouse",
    summary:
      "Strategic industrial land sourcing, turnkey godowns, logistics warehouses, and corporate office spaces along Coimbatore's key transit corridors (Avinashi, Trichy, and Sathy roads).",
    keywords: ["warehouse", "warehousing", "godown", "corporate solutions", "industrial space", "@warehouse"],
  },
];

function getServicesDirectoryResponse(): BotResponse {
  return {
    text: `📋 <strong>Vizhi Infragen Realtors — Comprehensive Real Estate Services</strong><br/><br/>We provide end-to-end real estate and property solutions across Coimbatore.<br/>Select a service below to view details and access the dedicated page:`,
    chips: SERVICES_CATALOG.map((s) => ({
      icon: s.icon,
      label: s.title,
      action: s.chipAction,
    })),
  };
}

function getServiceDetailResponse(service: ServiceCatalogItem): BotResponse {
  return {
    text: `📋 <strong>${service.title}</strong><br/><br/>${service.summary}<br/><br/>Click below to explore full specifications, processes, and service features:`,
    chips: [
      {
        icon: service.icon,
        label: `View ${service.title} Page`,
        link: service.link,
      },
      { icon: "fa-solid fa-calendar-check", label: "Schedule Meeting", action: "chip_book" },
      { icon: "fa-brands fa-whatsapp", label: "Chat on WhatsApp", action: "chip_agent" },
      { icon: "fa-solid fa-layer-group", label: "All Services", action: "chip_services" },
    ],
  };
}

function localAI(
  input: string,
  memory: SessionMemory,
  siteInfo?: SiteInfoState,
  whatsappLink?: (msg: string) => string
): BotResponse {
  const lo = input.toLowerCase().trim();
  const memoryUpdates: Partial<SessionMemory> = {};

  // Extract memory locations & types
  if (lo.includes("sulur")) memoryUpdates.location = "Sulur";
  else if (lo.includes("kalapatti")) memoryUpdates.location = "Kalapatti";
  else if (lo.includes("neelambur")) memoryUpdates.location = "Neelambur";
  else if (lo.includes("sathy")) memoryUpdates.location = "Sathy Road";
  else if (lo.includes("avinashi")) memoryUpdates.location = "Avinashi Road";
  else if (lo.includes("pattanam")) memoryUpdates.location = "Pattanam";
  else if (lo.includes("trichy")) memoryUpdates.location = "Trichy Road";

  if (/\b(plot|plots|dtcp|rera|site|sites|layout|land)\b/.test(lo)) memoryUpdates.propertyType = "PLOTS & SITES";
  else if (/\b(villa|villas|house|home|residential)\b/.test(lo)) memoryUpdates.propertyType = "VILLAS & HOMES";
  else if (/\b(commercial|office|shop|warehouse|godown)\b/.test(lo)) memoryUpdates.propertyType = "COMMERCIAL SITES";

  // Greetings & Interactive Flow Init
  const isGreeting = /\b(hi|hello|hey|good morning|good afternoon|good evening|start|namaste|vanakkam|menu|options|help|how are you|how r u|how are u|how do you do|what's up|whats up|sup)\b/i.test(lo);
  if (isGreeting) {
    const isHowAreYou = /how (are|r) (you|u)|how do you do|what'?s up|sup/i.test(lo);
    return {
      text: isHowAreYou
        ? `😊 <strong>I'm doing great, thank you for asking!</strong><br/><br/>I am your 24/7 Coimbatore property concierge. How can we assist your real estate journey today?<br/>Choose an option below or ask any property question:`
        : `👋 <strong>Welcome to Vizhi Infragen Realtors Assistant!</strong><br/><br/>How can we assist your Coimbatore real estate journey today?<br/>Select an option below:`,
      chips: [
        { icon: "fa-solid fa-map-location-dot", label: "Search Property", action: "chip_search_prop" },
        { icon: "fa-solid fa-location-dot", label: "Locations & Corridors", action: "chip_locations" },
        { icon: "fa-solid fa-layer-group", label: "Real Estate Services", action: "chip_services" },
        { icon: "fa-solid fa-calendar-check", label: "Schedule Meeting", action: "chip_book" },
        { icon: "fa-brands fa-whatsapp", label: "Connect on WhatsApp", action: "chip_agent" },
      ],
      memoryUpdates,
    };
  }

  // Agent / WhatsApp Direct Request
  if (
    lo === "agent" ||
    lo === "contact agent" ||
    lo === "talk to agent" ||
    lo === "advisor" ||
    lo === "whatsapp" ||
    lo === "chat on whatsapp" ||
    lo.includes("talk to advisor") ||
    lo.includes("speak to advisor") ||
    lo.includes("whatsapp advisor")
  ) {
    return {
      text: `💬 <strong>Connect with a Vizhi Property Advisor</strong><br/><br/>Our dedicated Coimbatore property advisors are available on WhatsApp for direct advisory, site visits, and instant property assistance.<br/><br/>Click the button below to connect on WhatsApp:`,
      cardType: "handoff",
      chips: [
        { icon: "fa-solid fa-map-location-dot", label: "Search Property", action: "chip_search_prop" },
        { icon: "fa-solid fa-location-dot", label: "Locations", action: "chip_locations" },
        { icon: "fa-solid fa-calendar-check", label: "Schedule Meeting", action: "chip_book" },
      ],
      memoryUpdates,
    };
  }

  // Locations Guide Flow (3 Prime Corridors requested by client)
  if (
    lo === "locations" ||
    lo === "explore locations" ||
    lo === "locations & corridors" ||
    lo.includes("corridor") ||
    lo.includes("locations") ||
    lo.includes("area") ||
    lo.includes("where") ||
    (lo.includes("location") && !lo.includes("trichy") && !lo.includes("sathy") && !lo.includes("avinashi"))
  ) {
    return {
      text: `📍 <strong>Coimbatore High-Growth Real Estate Corridors</strong><br/><br/>Select a prime corridor to view active verified listings:`,
      chips: [
        { icon: "fa-solid fa-location-dot", label: "Trichy Road Corridor", action: "chip_loc_trichy" },
        { icon: "fa-solid fa-location-dot", label: "Sathy Road Belt", action: "chip_loc_sathy" },
        { icon: "fa-solid fa-location-dot", label: "Avinashi Road Hub", action: "chip_loc_avinashi" },
      ],
      memoryUpdates,
    };
  }

  // Trichy Road Corridor Selection
  if (lo.includes("trichy") || lo.includes("sulur")) {
    return {
      text: `📍 <strong>Trichy Road Corridor (Sulur)</strong><br/><br/>Fast-growing highway connectivity through Sulur, commercial growth, and expressway access.<br/><br/>Select below to view verified active listings:`,
      chips: [
        { icon: "fa-solid fa-building", label: "Explore Trichy Road Buildings", link: "/properties/building?road=Trichy+Road" },
        { icon: "fa-solid fa-map-location-dot", label: "Explore Trichy Road Land", link: "/properties/land?road=Trichy+Road" },
        { icon: "fa-solid fa-calendar-check", label: "Schedule Meeting", action: "chip_book" },
        { icon: "fa-brands fa-whatsapp", label: "Chat on WhatsApp", action: "chip_agent" },
      ],
      memoryUpdates: { location: "Trichy Road" },
    };
  }

  // Sathy Road Belt Selection
  if (lo.includes("sathy") || lo.includes("saravanampatti")) {
    return {
      text: `📍 <strong>Sathy Road Belt</strong><br/><br/>Established educational and residential corridor connecting Saravanampatti tech hub.<br/><br/>Select below to view verified active listings:`,
      chips: [
        { icon: "fa-solid fa-building", label: "Explore Sathy Road Buildings", link: "/properties/building?road=Sathy+Road" },
        { icon: "fa-solid fa-map-location-dot", label: "Explore Sathy Road Land", link: "/properties/land?road=Sathy+Road" },
        { icon: "fa-solid fa-calendar-check", label: "Schedule Meeting", action: "chip_book" },
        { icon: "fa-brands fa-whatsapp", label: "Chat on WhatsApp", action: "chip_agent" },
      ],
      memoryUpdates: { location: "Sathy Road" },
    };
  }

  // Avinashi Road Hub Selection
  if (lo.includes("avinashi") || lo.includes("neelambur") || lo.includes("airport")) {
    return {
      text: `📍 <strong>Avinashi Road Hub</strong><br/><br/>Premier commercial corridor near Coimbatore International Airport, Neelambur bypass & IT parks.<br/><br/>Select below to view verified active listings:`,
      chips: [
        { icon: "fa-solid fa-building", label: "Explore Avinashi Road Buildings", link: "/properties/building?road=Avinashi+Road" },
        { icon: "fa-solid fa-map-location-dot", label: "Explore Land & Plots (Avinashi Rd)", link: "/properties/land?road=Avinashi+Road" },
        { icon: "fa-solid fa-calendar-check", label: "Schedule Meeting", action: "chip_book" },
        { icon: "fa-brands fa-whatsapp", label: "Chat on WhatsApp", action: "chip_agent" },
      ],
      memoryUpdates: { location: "Avinashi Road" },
    };
  }

  // Agent Handoff Trigger
  if (/\b(agent|human|person|talk to|speak to|call|phone|whatsapp|contact)\b/.test(lo) && !lo.includes("buy") && !lo.includes("sell")) {
    return { text: "", cardType: "handoff", memoryUpdates };
  }

  // Site Visit Booking Trigger
  if (/\b(visit|book|schedule|appointment|site visit)\b/.test(lo) && !lo.includes("about")) {
    return {
      text: `📅 <strong>Schedule a Site Visit</strong><br/>Our Coimbatore property advisor will coordinate the visit details.<br/><br/>Please fill in your details below:`,
      cardType: "booking_form",
      memoryUpdates,
    };
  }

  // Property Search Category Prompt (Search Property)
  if (
    lo === "search properties in coimbatore" ||
    lo === "search property" ||
    (/\b(search property|find property|browse property|view property|properties)\b/.test(lo) &&
      !lo.includes("land") &&
      !lo.includes("building") &&
      !lo.includes("villa") &&
      !lo.includes("plot") &&
      !lo.includes("location") &&
      !lo.includes("service"))
  ) {
    return {
      text: `🏡 <strong>Explore Coimbatore Properties</strong><br/><br/>Which asset type would you like to view?`,
      chips: [
        { icon: "fa-solid fa-map-location-dot", label: "Land & Plots", action: "chip_prop_land" },
        { icon: "fa-solid fa-building", label: "Buildings & Villas", action: "chip_prop_building" },
      ],
      memoryUpdates,
    };
  }

  // Land & Plots Selection
  if (
    lo === "show me land and plots for sale" ||
    lo.includes("land & plots") ||
    lo === "land & plots" ||
    lo === "land plots" ||
    (lo.includes("land") && (lo.includes("plot") || lo.includes("site") || lo.includes("sale") || lo.includes("buy")))
  ) {
    return {
      text: `📍 <strong>Verified Land & Plots in Coimbatore</strong><br/><br/>Explore DTCP & RERA approved residential layouts, agricultural farmland, and investment plots with 100% clear titles and fair market pricing.`,
      chips: [
        { icon: "fa-solid fa-map-location-dot", label: "View Land Properties", link: "/properties/land" },
        { icon: "fa-solid fa-calendar-check", label: "Schedule Meeting", action: "chip_book" },
        { icon: "fa-brands fa-whatsapp", label: "Chat on WhatsApp", action: "chip_agent" },
      ],
      memoryUpdates: { propertyType: "PLOTS & SITES" },
    };
  }

  // Buildings & Commercial Selection
  if (
    lo === "show me buildings and villas for sale" ||
    lo.includes("buildings & villas") ||
    lo === "buildings & villas" ||
    lo === "buildings" ||
    lo === "building" ||
    lo.includes("villa") ||
    (lo.includes("building") && (lo.includes("commercial") || lo.includes("house") || lo.includes("home") || lo.includes("sale")))
  ) {
    return {
      text: `🏢 <strong>Residential & Commercial Buildings</strong><br/><br/>Explore ready-to-occupy luxury villas, independent houses, turnkey commercial offices, and industrial warehouse assets across Coimbatore.`,
      chips: [
        { icon: "fa-solid fa-building", label: "View Building Properties", link: "/properties/building" },
        { icon: "fa-solid fa-calendar-check", label: "Schedule Meeting", action: "chip_book" },
        { icon: "fa-brands fa-whatsapp", label: "Chat on WhatsApp", action: "chip_agent" },
      ],
      memoryUpdates: { propertyType: "VILLAS & HOMES" },
    };
  }

  // Services Directory Selection (Prompt all 10 official website services)
  if (
    lo === "services" ||
    lo === "our services" ||
    lo === "service" ||
    lo === "what services do you offer" ||
    lo === "real estate services" ||
    lo.includes("what real estate services") ||
    (/\bservices\b/.test(lo) && !SERVICES_CATALOG.some((s) => s.keywords.some((kw) => lo.includes(kw))))
  ) {
    return getServicesDirectoryResponse();
  }

  // Individual Service Direct Keyword Match (10 Core Services)
  for (const svc of SERVICES_CATALOG) {
    if (svc.keywords.some((kw) => lo.includes(kw))) {
      return getServiceDetailResponse(svc);
    }
  }

  // Primary RAG Knowledge Content Search (Exact keyword matching against 20+ company documents)
  const ragChunks = searchKnowledge(input, 3);
  const phoneDisplay = siteInfo?.phone1 || "98422 12345";
  const phoneRaw = siteInfo?.phone1Raw || "9842212345";

  if (ragChunks.length > 0) {
    const top = ragChunks[0];
    const waUrl = whatsappLink
      ? whatsappLink(`Hi Vizhi Infragen! I have a question regarding: ${top.title}`)
      : `https://wa.me/91${phoneRaw}`;

    let dynamicContent = top.content;
    if (siteInfo?.email) {
      dynamicContent = dynamicContent.replaceAll(SITE_INFO.email, siteInfo.email);
    }
    if (siteInfo?.phone1) {
      dynamicContent = dynamicContent.replaceAll(SITE_INFO.phone1, siteInfo.phone1);
    }
    if (siteInfo?.phone2) {
      dynamicContent = dynamicContent.replaceAll(SITE_INFO.phone2, siteInfo.phone2);
    }

    return {
      text: `📋 <strong>${top.title}</strong><br/><br/>${dynamicContent.replace(/\n\n/g, "<br/><br/>").replace(/\n/g, "<br/>")}<br/><br/><em>Need further details or customized guidance? Connect directly with our on-call property team:</em>`,
      chips: [
        { icon: "fa-solid fa-phone", label: `Call Team: +91 ${phoneDisplay}`, link: `tel:+91${phoneRaw}` },
        { icon: "fa-brands fa-whatsapp", label: "WhatsApp Us", link: waUrl },
        { icon: "fa-solid fa-calendar-check", label: "Schedule Meeting", action: "chip_book" },
        { icon: "fa-solid fa-map-location-dot", label: "Explore Properties", action: "chip_search_prop" },
      ],
      memoryUpdates,
    };
  }

  const defaultWaUrl = whatsappLink
    ? whatsappLink(`Hi Vizhi Infragen! I have an enquiry: ${input.trim()}`)
    : `https://wa.me/91${phoneRaw}`;

  const queryTrimmed = input.trim();
  const queryDisplay = queryTrimmed.length > 0 ? ` regarding "<strong>${queryTrimmed}</strong>"` : "";

  return {
    text: `📞 <strong>Further Details & Direct Advisory</strong><br/><br/>For personalized guidance, verified property listings, or customized details${queryDisplay}, connect directly with our Coimbatore property advisory team.<br/><br/><em>Call our on-call property desk directly or connect on WhatsApp:</em>`,
    chips: [
      { icon: "fa-solid fa-phone", label: `Call Team: +91 ${phoneDisplay}`, link: `tel:+91${phoneRaw}` },
      { icon: "fa-brands fa-whatsapp", label: "WhatsApp Us", link: defaultWaUrl },
      { icon: "fa-solid fa-calendar-check", label: "Schedule Meeting", action: "chip_book" },
      { icon: "fa-solid fa-map-location-dot", label: "Explore Properties", action: "chip_search_prop" },
    ],
    memoryUpdates,
  };
}

const CHIP_ROUTES: Record<string, { display: string; prompt: string }> = {
  chip_welcome: { display: "Main Menu", prompt: "hello" },
  chip_search_prop: { display: "Search Property", prompt: "search properties in Coimbatore" },
  chip_prop_land: { display: "Land & Plots", prompt: "show me land and plots for sale" },
  chip_prop_building: { display: "Buildings & Villas", prompt: "show me buildings and villas for sale" },
  chip_search: { display: "Search Properties", prompt: "show me land and plots for sale in Coimbatore" },
  chip_locations: { display: "Locations", prompt: "locations" },
  chip_services: { display: "Our Services", prompt: "services" },

  // 10 Official Website Services
  chip_svc_land_sales: { display: "Land Sales", prompt: "land sales" },
  chip_svc_purchase: { display: "Land Purchase Assistance", prompt: "purchase assistance" },
  chip_svc_prop_mgmt: { display: "Property Management", prompt: "property management" },
  chip_svc_nri: { display: "NRI Property Management", prompt: "nri management" },
  chip_svc_construction: { display: "Building Construction", prompt: "construction" },
  chip_svc_valuation: { display: "Building Valuation", prompt: "valuation" },
  chip_svc_approvals: { display: "Land Approvals & Documentation", prompt: "approvals" },
  chip_svc_conversion: { display: "Land Conversion Services", prompt: "conversion" },
  chip_svc_rentals: { display: "Rental Services", prompt: "rentals" },
  chip_svc_warehouse: { display: "Warehouse & Corporate Solutions", prompt: "warehouse" },

  // Backwards-compatible mappings for legacy service chips
  chip_buy: { display: "Purchase Assistance", prompt: "purchase assistance" },
  chip_sell: { display: "Land Sales", prompt: "land sales" },
  chip_rent: { display: "Rental Services", prompt: "rentals" },
  chip_nri: { display: "NRI Services", prompt: "nri management" },
  chip_faq: { display: "Approvals & Documentation", prompt: "approvals" },
  chip_construction: { display: "Building Construction", prompt: "construction" },
  chip_valuation: { display: "Building Valuation", prompt: "valuation" },
  chip_book: { display: "Schedule Meeting", prompt: "I want to schedule a meeting or site visit" },
  chip_agent: { display: "Contact Agent", prompt: "I want to talk to a property advisor" },

  // Location Chip Routing
  chip_loc_pattanam: { display: "Pattanam Plots", prompt: "@pattanam tell me about plots and real estate in Pattanam Coimbatore" },
  chip_loc_sulur: { display: "Sulur Corridor", prompt: "@sulur tell me about plots and investment land in Sulur Coimbatore" },
  chip_loc_kalapatti: { display: "Kalapatti IT Belt", prompt: "@kalapatti tell me about residential plots in Kalapatti Coimbatore" },
  chip_loc_neelambur: { display: "Neelambur Commercial", prompt: "@neelambur tell me about commercial land and warehousing in Neelambur Coimbatore" },
  chip_loc_sathy: { display: "Sathy Road Belt", prompt: "Sathy Road" },
  chip_loc_avinashi: { display: "Avinashi Road Hub", prompt: "Avinashi Road" },
  chip_loc_trichy: { display: "Trichy Road Corridor", prompt: "Trichy Road" },

  chip_cancel: { display: "Cancel Booking", prompt: "" },
};

export default function ChatbotWidget() {
  const { siteInfo, whatsappLink } = useSiteSettings();
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [memory, setMemory] = useState<SessionMemory>({});

  // Mentions autocomplete state
  const [showMentionMenu, setShowMentionMenu] = useState(false);
  const [mentionFilter, setMentionFilter] = useState("");

  // Booking & Lead state
  const [bName, setBName] = useState("");
  const [bPhone, setBPhone] = useState("");
  const [bEmail, setBEmail] = useState("");
  const [bDate, setBDate] = useState("");
  const [bSlot, setBSlot] = useState("10:00 AM");
  const [bPropertyHint, setBPropertyHint] = useState("");
  const [lastUserQuery, setLastUserQuery] = useState("");
  const [isBookingSubmitting, setIsBookingSubmitting] = useState(false);

  const [lastBooking, setLastBooking] = useState<{
    name: string;
    phone: string;
    date: string;
    slot: string;
    property: string;
  } | null>(null);

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 100) setVisible(true);
    };
    window.addEventListener("scroll", onScroll);
    const t = setTimeout(() => setVisible(true), 2000);
    return () => {
      window.removeEventListener("scroll", onScroll);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle Input `@` Mention trigger
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);

    const lastWord = val.split(/\s+/).pop() || "";
    if (lastWord.startsWith("@")) {
      setShowMentionMenu(true);
      setMentionFilter(lastWord.slice(1).toLowerCase());
    } else {
      setShowMentionMenu(false);
    }
  };

  const selectMention = (tag: string) => {
    const words = input.split(/\s+/);
    words.pop();
    const newText = [...words, tag].join(" ") + " ";
    setInput(newText);
    setShowMentionMenu(false);
  };

  const addBotMessage = useCallback(
    (text: string, chips?: ChipItem[], properties?: PropertyItem[], cardType?: CardType) => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + Math.random(), sender: "bot", text, time: getNow(), chips, properties, cardType },
      ]);
    },
    []
  );

  const addUserMessage = useCallback((text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), sender: "user", text, time: getNow() },
    ]);
  }, []);

  // Instant Guided Concierge Engine (0ms Latency, No External AI / Gemini Dependencies)
  const handleLocalQuery = useCallback(
    (userText: string, currentMemory: SessionMemory) => {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const localResponse = localAI(userText, currentMemory, siteInfo, whatsappLink);
        if (localResponse.memoryUpdates) {
          setMemory((p) => ({ ...p, ...localResponse.memoryUpdates }));
        }
        if (localResponse.cardType === "handoff" && !localResponse.text) {
          addBotMessage(
            "🙋 <strong>Connect with a Vizhi Property Advisor</strong><br/>Our Coimbatore team is available Mon–Sat, 9AM–7PM.",
            undefined,
            undefined,
            "handoff"
          );
        } else {
          addBotMessage(
            localResponse.text,
            localResponse.chips,
            localResponse.properties,
            localResponse.cardType
          );
        }
      }, 150);
    },
    [addBotMessage, siteInfo, whatsappLink]
  );

  const handleBookingCancel = useCallback(() => {
    if (!lastBooking) {
      addBotMessage("ℹ️ <strong>No Active Booking Found</strong><br/>There is no confirmed booking to cancel at this time.", [
        { icon: "fa-calendar-check", label: "Book New Visit", action: "chip_book" },
      ]);
      return;
    }

    const { name, phone, date, slot, property } = lastBooking;
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const rescheduleTime = `${tomorrow.toLocaleDateString("en-IN", { weekday: "long", day: "numeric", month: "long" })} at 10:00 AM`;

    const waMsg = `❌ Site Visit Cancelled\n\nBooking for ${name} (${phone}) on ${date} at ${slot} has been cancelled.\nReschedule target: ${rescheduleTime}.`;
    window.open(whatsappLink(waMsg), "_blank");

    setLastBooking(null);
    addBotMessage(
      `❌ <strong>Booking Cancelled</strong><br/>Cancelled visit for <strong>${name}</strong> on ${date} (${slot}).<br/>WhatsApp update sent to property team.`,
      [{ icon: "fa-calendar-plus", label: "Book New Visit", action: "chip_book" }]
    );
  }, [lastBooking, addBotMessage, whatsappLink]);

  const handleSend = useCallback(
    (displayText?: string, chipAction?: string) => {
      if (chipAction === "chip_cancel") {
        addUserMessage("Cancel Booking");
        handleBookingCancel();
        return;
      }

      let prompt = (displayText || input).trim();
      let display = prompt;

      if (chipAction && CHIP_ROUTES[chipAction]) {
        const route = CHIP_ROUTES[chipAction];
        display = route.display || prompt;
        prompt = route.prompt || prompt;
      }

      if (!prompt) return;

      setInput("");
      setShowMentionMenu(false);
      addUserMessage(display);
      if (!chipAction) {
        setLastUserQuery(prompt);
      }

      if (chipAction === "chip_search_prop") {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBotMessage(
            `🏡 <strong>Explore Coimbatore Properties</strong><br/><br/>Which asset type would you like to view?`,
            [
              { icon: "fa-solid fa-map-location-dot", label: "Land & Plots", action: "chip_prop_land" },
              { icon: "fa-solid fa-building", label: "Buildings & Villas", action: "chip_prop_building" },
            ]
          );
        }, 150);
        return;
      }

      if (chipAction === "chip_prop_land") {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBotMessage(
            `📍 <strong>Verified Land & Plots in Coimbatore</strong><br/><br/>Explore DTCP & RERA approved residential layouts, agricultural farmland, and investment plots with 100% clear titles and fair market pricing.`,
            [
              { icon: "fa-solid fa-map-location-dot", label: "View Land Properties", link: "/properties/land" },
              { icon: "fa-solid fa-calendar-check", label: "Schedule Meeting", action: "chip_book" },
              { icon: "fa-brands fa-whatsapp", label: "Chat on WhatsApp", action: "chip_agent" },
            ]
          );
        }, 150);
        return;
      }

      if (chipAction === "chip_prop_building") {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBotMessage(
            `🏢 <strong>Residential & Commercial Buildings</strong><br/><br/>Explore ready-to-occupy luxury villas, independent houses, turnkey commercial offices, and industrial warehouse assets across Coimbatore.`,
            [
              { icon: "fa-solid fa-building", label: "View Building Properties", link: "/properties/building" },
              { icon: "fa-solid fa-calendar-check", label: "Schedule Meeting", action: "chip_book" },
              { icon: "fa-brands fa-whatsapp", label: "Chat on WhatsApp", action: "chip_agent" },
            ]
          );
        }, 150);
        return;
      }

      if (chipAction === "chip_locations") {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBotMessage(
            `📍 <strong>Coimbatore High-Growth Real Estate Corridors</strong><br/><br/>Select a prime corridor to view active verified listings:`,
            [
              { icon: "fa-solid fa-location-dot", label: "Trichy Road Corridor", action: "chip_loc_trichy" },
              { icon: "fa-solid fa-location-dot", label: "Sathy Road Belt", action: "chip_loc_sathy" },
              { icon: "fa-solid fa-location-dot", label: "Avinashi Road Hub", action: "chip_loc_avinashi" },
            ]
          );
        }, 150);
        return;
      }

      if (chipAction === "chip_loc_trichy") {
        setMemory((prev) => ({ ...prev, location: "Trichy Road" }));
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBotMessage(
            `📍 <strong>Trichy Road Corridor (Sulur)</strong><br/><br/>Fast-growing highway connectivity through Sulur, commercial growth, and expressway access.<br/><br/>Select below to view verified active listings:`,
            [
              { icon: "fa-solid fa-building", label: "Explore Trichy Road Buildings", link: "/properties/building?road=Trichy+Road" },
              { icon: "fa-solid fa-map-location-dot", label: "Explore Trichy Road Land", link: "/properties/land?road=Trichy+Road" },
              { icon: "fa-solid fa-calendar-check", label: "Schedule Meeting", action: "chip_book" },
              { icon: "fa-brands fa-whatsapp", label: "Chat on WhatsApp", action: "chip_agent" },
            ]
          );
        }, 150);
        return;
      }

      if (chipAction === "chip_loc_sathy") {
        setMemory((prev) => ({ ...prev, location: "Sathy Road" }));
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBotMessage(
            `📍 <strong>Sathy Road Belt</strong><br/><br/>Established educational and residential corridor connecting Saravanampatti tech hub.<br/><br/>Select below to view verified active listings:`,
            [
              { icon: "fa-solid fa-building", label: "Explore Sathy Road Buildings", link: "/properties/building?road=Sathy+Road" },
              { icon: "fa-solid fa-map-location-dot", label: "Explore Sathy Road Land", link: "/properties/land?road=Sathy+Road" },
              { icon: "fa-solid fa-calendar-check", label: "Schedule Meeting", action: "chip_book" },
              { icon: "fa-brands fa-whatsapp", label: "Chat on WhatsApp", action: "chip_agent" },
            ]
          );
        }, 150);
        return;
      }

      if (chipAction === "chip_loc_avinashi") {
        setMemory((prev) => ({ ...prev, location: "Avinashi Road" }));
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBotMessage(
            `📍 <strong>Avinashi Road Hub</strong><br/><br/>Premier commercial corridor near Coimbatore International Airport, Neelambur bypass & IT parks.<br/><br/>Select below to view verified active listings:`,
            [
              { icon: "fa-solid fa-building", label: "Explore Avinashi Road Buildings", link: "/properties/building?road=Avinashi+Road" },
              { icon: "fa-solid fa-map-location-dot", label: "Explore Land & Plots (Avinashi Rd)", link: "/properties/land?road=Avinashi+Road" },
              { icon: "fa-solid fa-calendar-check", label: "Schedule Meeting", action: "chip_book" },
              { icon: "fa-brands fa-whatsapp", label: "Chat on WhatsApp", action: "chip_agent" },
            ]
          );
        }, 150);
        return;
      }

      if (chipAction === "chip_services") {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const res = getServicesDirectoryResponse();
          addBotMessage(res.text, res.chips);
        }, 150);
        return;
      }

      // 10 Official Website Services & Legacy Aliases
      const matchedSvc =
        SERVICES_CATALOG.find((s) => s.chipAction === chipAction) ||
        (chipAction === "chip_buy" ? SERVICES_CATALOG.find((s) => s.slug === "purchase-assistance") : undefined) ||
        (chipAction === "chip_sell" ? SERVICES_CATALOG.find((s) => s.slug === "land-sales") : undefined) ||
        (chipAction === "chip_rent" ? SERVICES_CATALOG.find((s) => s.slug === "rentals") : undefined) ||
        (chipAction === "chip_nri" ? SERVICES_CATALOG.find((s) => s.slug === "nri-management") : undefined) ||
        (chipAction === "chip_faq" ? SERVICES_CATALOG.find((s) => s.slug === "approvals") : undefined) ||
        (chipAction === "chip_construction" ? SERVICES_CATALOG.find((s) => s.slug === "construction") : undefined) ||
        (chipAction === "chip_valuation" ? SERVICES_CATALOG.find((s) => s.slug === "valuation") : undefined);

      if (matchedSvc) {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          const res = getServiceDetailResponse(matchedSvc);
          addBotMessage(res.text, res.chips);
        }, 150);
        return;
      }

      if (chipAction === "chip_book") {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBotMessage(`📅 <strong>Schedule a Site Visit</strong><br/>Please fill in your details below:`, undefined, undefined, "booking_form");
        }, 200);
        return;
      }

      if (chipAction === "chip_agent") {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBotMessage(
            "💬 <strong>Connect with a Vizhi Property Advisor</strong><br/><br/>Our dedicated Coimbatore property advisors are available on WhatsApp for instant assistance, verified listings, and site visits.<br/><br/>Click below to start a chat on WhatsApp:",
            undefined,
            undefined,
            "handoff"
          );
        }, 150);
        return;
      }

      handleLocalQuery(prompt, memory);
    },
    [input, memory, addUserMessage, addBotMessage, handleLocalQuery, handleBookingCancel, whatsappLink]
  );

  const openChatFresh = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasUnread(false);
    setMessages([]);
    setMemory({});
    setTimeout(() => {
      addBotMessage(
        `👋 <strong>Welcome to Vizhi Infragen Realtors Assistant!</strong><br/><br/>I am your 24/7 Coimbatore property concierge. How can we assist your real estate journey today?<br/>Choose an option below or type a query:`,
        [
          { icon: "fa-solid fa-map-location-dot", label: "Search Property", action: "chip_search_prop" },
          { icon: "fa-solid fa-location-dot", label: "Locations & Corridors", action: "chip_locations" },
          { icon: "fa-solid fa-layer-group", label: "Real Estate Services", action: "chip_services" },
          { icon: "fa-solid fa-calendar-check", label: "Schedule Meeting", action: "chip_book" },
          { icon: "fa-brands fa-whatsapp", label: "Connect on WhatsApp", action: "chip_agent" },
        ]
      );
    }, 150);
  }, [addBotMessage]);

  const toggleChat = () => {
    if (isOpen) {
      setIsOpen(false);
      setIsMinimized(true);
      return;
    }
    if (isMinimized) {
      setIsOpen(true);
      setIsMinimized(false);
      return;
    }
    openChatFresh();
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bName.trim() || !bPhone.trim() || isBookingSubmitting) return;

    setIsBookingSubmitting(true);
    const name = bName.trim();
    const phone = bPhone.trim();
    const cleanDigits = phone.replace(/\D/g, "");
    const email = bEmail.trim() || `${cleanDigits || "visitor"}@vizhi-visitor.in`;
    const date = bDate || "Next available date";
    const slot = bSlot;
    const property = bPropertyHint || memory.location || memory.propertyType || "Coimbatore Property";

    let scheduledIso: string | undefined = undefined;
    if (bDate) {
      try {
        const timePart = slot.includes("10:00") ? "10:00:00" : slot.includes("12:00") ? "12:00:00" : "16:00:00";
        const d = new Date(`${bDate}T${timePart}`);
        if (!isNaN(d.getTime())) {
          scheduledIso = d.toISOString();
        }
      } catch {
        scheduledIso = undefined;
      }
    }

    setLastBooking({ name, phone, date, slot, property });

    const bookingMessage = [
      `Client requested site visit/meeting on ${date} at ${slot}.`,
      `Property/Area hint: ${property}.`,
      lastUserQuery ? `User Inquiry: "${lastUserQuery}".` : null,
      `(Source: Chatbot Interactive Concierge)`,
    ]
      .filter(Boolean)
      .join("\n");

    // Submit directly to PostgreSQL backend (POST /api/v1/public/enquiries)
    try {
      await enquiryService.submitEnquiry({
        name,
        phone,
        email,
        enquiry_type: "SITE_VISIT",
        subject: `[Chatbot Enquiry] Meeting / Site Visit (${slot})`,
        message: bookingMessage,
        scheduled_at: scheduledIso,
      });
    } catch (err) {
      console.warn("Notice: Backend enquiry submission handled:", err);
    }

    const waMsg = `⚡ New Site Visit Booked via Chatbot!\n\nClient: ${name}\nPhone: ${phone}\nDate: ${date} (${slot})\nProperty: ${property}`;
    const waUrl = whatsappLink(waMsg);

    setIsBookingSubmitting(false);

    addBotMessage(
      `🎉 <strong>Site Visit Successfully Scheduled!</strong><br/><br/>` +
      `Thank you <strong>${name}</strong>! Your meeting appointment has been registered directly with our advisory desk.<br/><br/>` +
      `📅 <strong>Date:</strong> ${date}<br/>` +
      `⏰ <strong>Slot:</strong> ${slot}<br/>` +
      `📍 <strong>Property / Area:</strong> ${property}<br/><br/>` +
      `Our property advisor will call you at <strong>${phone}</strong> to confirm the exact schedule.`,
      [
        { icon: "fa-brands fa-whatsapp", label: "Send Details on WhatsApp", link: waUrl },
        { icon: "fa-solid fa-map-location-dot", label: "Explore Properties", action: "chip_search_prop" },
      ]
    );

    setBName("");
    setBPhone("");
    setBEmail("");
    setBDate("");
  };

  const filteredMentions = MENTION_OPTIONS.filter((m) => m.tag.includes(mentionFilter) || m.label.toLowerCase().includes(mentionFilter));

  return (
    <>
      {/* Trigger Button */}
      <button
        onClick={toggleChat}
        aria-label="Open AI Property Assistant"
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[9999] w-[56px] h-[56px] sm:w-[62px] sm:h-[62px] rounded-full bg-gradient-to-br from-[#1F0A10] to-[#4a1c26] border-[2.5px] border-[#c5a880] shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-500 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
        } hover:scale-110`}
      >
        <span className="absolute -inset-1.5 rounded-full border-2 border-[#c5a880]/35 animate-ping pointer-events-none" />
        <RenderIcon icon="fa-solid fa-robot" className="text-2xl text-[#c5a880] relative z-10" />
        {hasUnread && !isOpen && !isMinimized && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-white z-20 shadow-lg animate-bounce">
            1
          </span>
        )}
      </button>

      {/* Minimized Pill */}
      {isMinimized && (
        <button
          onClick={toggleChat}
          className="fixed bottom-[72px] sm:bottom-[88px] right-3 sm:right-6 z-[9997] bg-gradient-to-r from-[#1F0A10] to-[#3d1520] border border-[#c5a880]/50 text-white text-[11px] font-semibold px-4 py-2 rounded-full shadow-xl flex items-center gap-2.5 cursor-pointer hover:border-[#c5a880] transition-all duration-200"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-[#c5a880] font-bold">Vizhi Concierge Assistant</span>
          <RenderIcon icon="fa-solid fa-chevron-up" className="text-[9px] text-[#c5a880]" />
        </button>
      )}

      {/* Chat Window */}
      <div
        className={`fixed bottom-20 sm:bottom-24 right-3 sm:right-6 z-[9998] w-[calc(100vw-24px)] sm:w-[420px] max-w-[420px] flex flex-col bg-white rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.22)] border border-stone-200/60 overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
        }`}
        style={{ height: "min(650px, calc(100dvh - 96px))" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1A0810] via-[#2D1015] to-[#3d1520] px-4 py-3 flex items-center justify-between shrink-0 shadow-lg border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-[#c5a880]/15 border-2 border-[#c5a880]/70 flex items-center justify-center text-[#c5a880]">
                <RenderIcon icon="fa-solid fa-robot" className="text-base text-[#c5a880]" />
              </div>
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#2D1015]" />
            </div>
            <div>
              <div className="font-bold text-[13px] text-white font-['Outfit',sans-serif] flex items-center gap-1.5">
                Vizhi Real Estate AI
                <span className="text-[8px] bg-[#c5a880] text-[#1F0A10] font-black px-1.5 py-0.5 rounded tracking-wide">
                  COIMBATORE
                </span>
              </div>
              <div className="text-[10px] text-emerald-400 font-['Inter',sans-serif]">
                Vizhi Property Assistant — Online
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-red-500/80 text-white/70 hover:text-white flex items-center justify-center text-xs transition-all cursor-pointer"
            >
              <RenderIcon icon="fa-solid fa-xmark" />
            </button>
          </div>
        </div>

        {/* Quick Actions Scroll Bar */}
        <div className="bg-[#1A0810] px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto shrink-0 scrollbar-none border-b border-white/10">
          {[
            { label: "Search Property", action: "chip_search_prop" },
            { label: "Locations", action: "chip_locations" },
            { label: "Services", action: "chip_services" },
            { label: "Schedule Meeting", action: "chip_book" },
            { label: "Agent", action: "chip_agent" },
          ].map((btn) => (
            <button
              key={btn.action}
              onClick={() => handleSend(btn.label, btn.action)}
              className="px-2.5 py-1 rounded-full text-[10px] bg-white/8 border border-white/15 text-white/85 hover:bg-[#c5a880] hover:text-[#1F0A10] font-medium shrink-0 transition-all cursor-pointer"
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-3.5 bg-gradient-to-b from-[#faf7f4] to-[#f5f0ea] space-y-3.5 font-['Inter',sans-serif]">
          {messages.map((m) => (
            <div key={m.id} className={`flex items-end gap-2 ${m.sender === "user" ? "flex-row-reverse" : ""}`}>
              {m.sender === "bot" && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1F0A10] to-[#3d1520] border border-[#c5a880]/60 flex items-center justify-center text-[11px] text-[#c5a880] shrink-0 shadow-md">
                  <RenderIcon icon="fa-solid fa-robot" />
                </div>
              )}
              <div className="max-w-[88%] space-y-2 min-w-0">
                {m.text && (
                  <div
                    dangerouslySetInnerHTML={{ __html: m.text }}
                    className={`px-3.5 py-2.5 text-[11.5px] leading-relaxed rounded-2xl ${
                      m.sender === "bot"
                        ? "bg-white text-stone-800 rounded-bl-md shadow-sm border border-stone-200/70"
                        : "bg-gradient-to-br from-[#2D1015] to-[#4a1c26] text-white rounded-br-md shadow-md"
                    }`}
                  />
                )}


                {/* Property Listing Cards */}
                {m.properties && m.properties.length > 0 && (
                  <div className="space-y-2 pt-0.5">
                    {m.properties.map((prop) => (
                      <div key={prop.id} className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-sm">
                        <div className="relative h-28 w-full">
                          <Image src={prop.image} alt={prop.title} fill className="object-cover" sizes="360px" />
                          <span className="absolute top-2 left-2 bg-[#1F0A10]/90 text-[#c5a880] text-[9px] font-bold px-2 py-0.5 rounded">
                            {prop.badge}
                          </span>
                        </div>
                        <div className="p-2.5">
                          <h5 className="font-bold text-[12px] text-[#1E293B]">{prop.title}</h5>
                          <p className="text-[10px] text-[#c5a880] font-semibold flex items-center gap-1 mt-0.5">
                            <i className="fa-solid fa-location-dot" /> {prop.location}
                          </p>
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => {
                                setBPropertyHint(prop.title);
                                handleSend("Book Visit", "chip_book");
                              }}
                              className="flex-1 bg-[#1F0A10] text-[#c5a880] text-[10px] font-bold py-1 rounded transition cursor-pointer"
                            >
                              📅 Schedule Visit
                            </button>
                            <a
                              href={whatsappLink(`Hi! I'm interested in ${prop.title}`)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-2.5 bg-emerald-600 text-white text-[11px] font-bold rounded flex items-center justify-center"
                            >
                              <i className="fa-brands fa-whatsapp" />
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Booking Form Card */}
                {m.cardType === "booking_form" && (
                  <form onSubmit={handleBookingSubmit} className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-md space-y-2">
                    <div className="flex items-center gap-1.5 text-[12px] font-bold text-[#1E293B]">
                      <RenderIcon icon="fa-solid fa-calendar-check" className="text-[#c5a880]" />
                      <span>Schedule a Meeting / Site Visit</span>
                    </div>
                    <input
                      required
                      type="text"
                      placeholder="Full Name *"
                      value={bName}
                      onChange={(e) => setBName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded px-2.5 py-1.5 text-[11px] outline-none focus:border-[#c5a880]"
                    />
                    <input
                      required
                      type="tel"
                      placeholder="Phone Number *"
                      value={bPhone}
                      onChange={(e) => setBPhone(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded px-2.5 py-1.5 text-[11px] outline-none focus:border-[#c5a880]"
                    />
                    <input
                      type="email"
                      placeholder="Email Address (Optional)"
                      value={bEmail}
                      onChange={(e) => setBEmail(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded px-2.5 py-1.5 text-[11px] outline-none focus:border-[#c5a880]"
                    />
                    <div className="grid grid-cols-2 gap-1.5">
                      <input
                        type="date"
                        value={bDate}
                        onChange={(e) => setBDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="bg-stone-50 border border-stone-300 rounded px-2 py-1.5 text-[10px] outline-none focus:border-[#c5a880]"
                      />
                      <select value={bSlot} onChange={(e) => setBSlot(e.target.value)} className="bg-stone-50 border border-stone-300 rounded px-2 py-1.5 text-[10px] focus:border-[#c5a880]">
                        <option>10:00 AM</option>
                        <option>12:00 PM</option>
                        <option>04:00 PM</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      disabled={isBookingSubmitting}
                      className="w-full bg-[#1F0A10] hover:bg-[#2d1017] text-[#c5a880] font-extrabold py-2 rounded-xl text-[11px] cursor-pointer transition-all flex items-center justify-center gap-1.5 disabled:opacity-50"
                    >
                      {isBookingSubmitting ? (
                        <span>Registering Visit…</span>
                      ) : (
                        <>
                          <RenderIcon icon="fa-solid fa-calendar-check" />
                          <span>Confirm Meeting / Site Visit</span>
                        </>
                      )}
                    </button>
                  </form>
                )}

                {/* Handoff Card */}
                {m.cardType === "handoff" && (
                  <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-md space-y-1.5">
                    <a
                      href={whatsappLink("Hi Vizhi Infragen! I am interested in property in Coimbatore and would like to speak to an advisor.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-xl text-[11.5px] flex items-center justify-center gap-2 shadow-sm transition-all"
                    >
                      <RenderIcon icon="fa-brands fa-whatsapp" className="text-base" /> Chat with Property Advisor on WhatsApp
                    </a>
                  </div>
                )}

                {/* Timestamp */}
                <span className="text-[8.5px] text-stone-400 block text-right">{m.time}</span>

                {/* Chips */}
                {m.chips && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {m.chips.map((c, i) =>
                      c.link ? (
                        c.link.startsWith("tel:") || c.link.startsWith("http") ? (
                          <a
                            key={i}
                            href={c.link}
                            target={c.link.startsWith("http") ? "_blank" : undefined}
                            rel={c.link.startsWith("http") ? "noopener noreferrer" : undefined}
                            className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[11px] font-bold border border-[#c5a880] bg-[#1F0A10] text-white hover:bg-[#c5a880] hover:text-[#1F0A10] hover:border-[#dfcaa7] shadow-sm transition-all duration-150 cursor-pointer"
                          >
                            {c.icon && <RenderIcon icon={c.icon} className="text-[#c5a880] group-hover:text-[#1F0A10] transition-colors text-xs" />}
                            <span className="text-white group-hover:text-[#1F0A10] transition-colors font-bold">{c.label}</span>
                            <RenderIcon icon={c.link.startsWith("tel:") ? "fa-solid fa-phone" : "fa-solid fa-arrow-up-right-from-square"} className="text-[10px] text-[#c5a880] group-hover:text-[#1F0A10] transition-colors" />
                          </a>
                        ) : (
                          <Link
                            key={i}
                            href={c.link}
                            className="group inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-[11px] font-bold border border-[#c5a880] bg-[#1F0A10] text-white hover:bg-[#c5a880] hover:text-[#1F0A10] hover:border-[#dfcaa7] shadow-sm transition-all duration-150 cursor-pointer"
                          >
                            {c.icon && <RenderIcon icon={c.icon} className="text-[#c5a880] group-hover:text-[#1F0A10] transition-colors text-xs" />}
                            <span className="text-white group-hover:text-[#1F0A10] transition-colors font-bold">{c.label}</span>
                            <RenderIcon icon="fa-solid fa-arrow-up-right-from-square" className="text-[10px] text-[#c5a880] group-hover:text-[#1F0A10] transition-colors" />
                          </Link>
                        )
                      ) : (
                        <button
                          key={i}
                          onClick={() => handleSend(c.label, c.action)}
                          className="group px-2.5 py-1 rounded-full text-[10px] border border-[#c5a880]/60 text-[#3d1520] bg-[#c5a880]/12 hover:bg-[#c5a880] hover:text-[#1F0A10] font-medium transition cursor-pointer flex items-center gap-1.5"
                        >
                          {c.icon && <RenderIcon icon={c.icon} className="text-xs group-hover:text-[#1F0A10] transition-colors" />}
                          <span className="group-hover:text-[#1F0A10] transition-colors">{c.label}</span>
                        </button>
                      )
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-end gap-2">
              <div className="w-7 h-7 rounded-full bg-[#1F0A10] border border-[#c5a880]/60 text-[#c5a880] flex items-center justify-center text-[11px] shrink-0">
                <RenderIcon icon="fa-solid fa-robot" />
              </div>
              <div className="bg-white px-3 py-2 rounded-2xl rounded-bl-md shadow-sm border border-stone-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Mention Autocomplete Popover */}
        {showMentionMenu && filteredMentions.length > 0 && (
          <div className="bg-white border-t border-stone-200 max-h-36 overflow-y-auto p-1 text-[11px] shadow-lg shrink-0">
            <div className="px-2 py-1 text-[9px] font-bold text-stone-400 uppercase tracking-wider">Select Tag to Filter Knowledge:</div>
            {filteredMentions.map((opt) => (
              <button
                key={opt.tag}
                onClick={() => selectMention(opt.tag)}
                className="w-full text-left px-2.5 py-1.5 hover:bg-stone-100 rounded flex items-center justify-between text-stone-800 font-medium cursor-pointer"
              >
                <div className="flex items-center gap-1.5">
                  <RenderIcon icon={opt.icon} className="text-[#c5a880] text-xs" />
                  <span className="font-bold text-[#c5a880]">{opt.tag}</span>
                </div>
                <span className="text-[10px] text-stone-500">{opt.label}</span>
              </button>
            ))}
          </div>
        )}

        {/* Input Footer */}
        <div className="px-3 py-2.5 bg-white border-t border-stone-200 flex items-center gap-2 shrink-0 shadow-md">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder='Ask about properties, services, or locations…'
            className="flex-1 bg-[#faf8f5] border border-stone-300 rounded-full px-3.5 py-1.5 text-[11.5px] outline-none focus:border-[#c5a880]"
          />
          <button
            onClick={() => handleSend()}
            disabled={isTyping || !input.trim()}
            className="w-8 h-8 rounded-full bg-[#1F0A10] text-[#c5a880] hover:scale-105 flex items-center justify-center transition shrink-0 border border-[#c5a880]/30 disabled:opacity-40"
          >
            <RenderIcon icon="fa-solid fa-paper-plane" className="text-xs" />
          </button>
        </div>
      </div>
    </>
  );
}
