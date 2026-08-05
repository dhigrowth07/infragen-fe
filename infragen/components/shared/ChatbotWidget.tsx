"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { propertiesData, PropertyItem } from "@/data/properties";

// ── Types ────────────────────────────────────────────────────────────────────

type CardType = "booking_form" | "lead_form" | "handoff";

interface ChipItem {
  icon: string;
  label: string;
  action?: string;
  payload?: string;
}

interface BotResponse {
  text: string;
  chips?: ChipItem[];
  properties?: PropertyItem[];
  cardType?: CardType;
}

interface MessageItem {
  id: number;
  sender: "bot" | "user";
  text: string;
  time: string;
  chips?: ChipItem[];
  properties?: PropertyItem[];
  cardType?: CardType;
}

interface SessionMemory {
  propertyType?: string;
  location?: string;
  budget?: string;
  name?: string;
  phone?: string;
}

// ── Helper ───────────────────────────────────────────────────────────────────

const getNow = () => {
  const d = new Date();
  const h = d.getHours();
  const m = d.getMinutes();
  return `${h > 12 ? h - 12 : h || 12}:${m < 10 ? "0" + m : m} ${h >= 12 ? "PM" : "AM"}`;
};

// ── Knowledge Base ───────────────────────────────────────────────────────────

const FAQ_ANSWERS: Record<string, string> = {
  dtcp:
    "📋 <strong>DTCP Approval</strong> (Directorate of Town and Country Planning) means the layout has government sanction. All our Coimbatore plots carry valid DTCP/RERA certification for safe investment.",
  rera:
    "🏛️ <strong>RERA</strong> (Real Estate Regulatory Authority) protects buyers. Every Vizhi Infragen project is RERA-registered, ensuring legal transparency and timely delivery.",
  loan:
    "🏦 <strong>Home/Land Loans:</strong> We partner with SBI, HDFC, Axis, ICICI & Canara Bank. We assist with documentation and processing at zero extra cost.",
  registration:
    "📝 <strong>Property Registration:</strong> Required at Sub-Registrar's office. We guide you through stamp duty, encumbrance certificate, and EC verification in Coimbatore.",
  encumbrance:
    "🔍 <strong>Encumbrance Certificate (EC):</strong> Confirms no legal dues or mortgages on the property. We verify EC before every transaction for buyer safety.",
  pattadar:
    "📜 <strong>Pattadar Passbook / Title Deed</strong> proves ownership. We provide verified chain of title documents for all our properties.",
  conversion:
    "🌾 <strong>Agricultural Land Conversion:</strong> We manage the complete process from survey to order for converting farm land to residential/commercial use in Coimbatore.",
  management:
    "🏢 <strong>Property Management Services:</strong> Tenant screening, rent collection, maintenance, inspections, and monthly reporting — all handled by our dedicated team.",
  nri:
    "✈️ <strong>NRI Property Shield:</strong> For non-resident Indians — we provide site inspection videos, legal monitoring, rent collection, and tax/compliance guidance from abroad.",
};

// ── Main Component ────────────────────────────────────────────────────────────

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false); // true = hidden but preserving chat
  const [hasUnread, setHasUnread] = useState(true);
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [memory, setMemory] = useState<SessionMemory>({});

  // Booking form state
  const [bName, setBName] = useState("");
  const [bPhone, setBPhone] = useState("");
  const [bEmail, setBEmail] = useState("");
  const [bDate, setBDate] = useState("");
  const [bSlot, setBSlot] = useState("10:00 AM");

  // Lead form state
  const [lName, setLName] = useState("");
  const [lPhone, setLPhone] = useState("");
  const [lEmail, setLEmail] = useState("");
  const [lContactTime, setLContactTime] = useState("Morning (9AM–12PM)");

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 100) setVisible(true); };
    window.addEventListener("scroll", onScroll);
    const t = setTimeout(() => setVisible(true), 2000);
    return () => { window.removeEventListener("scroll", onScroll); clearTimeout(t); };
  }, []);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // ── AI Brain / Intent Engine ─────────────────────────────────────────────

  const getResponse = useCallback((raw: string, action?: string, payload?: string): BotResponse => {
    const t = raw.trim();
    const lo = t.toLowerCase();

    // ── Quick Action Routing ─────────────────────────
    if (action === "welcome_start") {
      return {
        text: "👋 Welcome to <strong>Vizhi Infragen Realtors AI</strong>!<br/><br/>I'm your 24/7 Coimbatore real-estate assistant. I can help you:<br/>• 🏡 Find & buy verified properties<br/>• 🏷️ Sell or rent your assets<br/>• 📅 Schedule site visits<br/>• ✈️ Manage NRI properties<br/>• 📋 Answer legal & documentation FAQs<br/><br/>What would you like to do today?",
        chips: [
          { icon: "fa-magnifying-glass", label: "Search Properties", action: "guide_step1" },
          { icon: "fa-house", label: "Buy Property", action: "action_buy" },
          { icon: "fa-tag", label: "Sell Property", action: "action_sell" },
          { icon: "fa-key", label: "Rent / Manage", action: "action_rent" },
          { icon: "fa-globe", label: "NRI Services", action: "action_nri" },
          { icon: "fa-circle-question", label: "FAQ & Legal", action: "action_faq" },
          { icon: "fa-headset", label: "Contact Agent", action: "action_handoff" },
        ],
      };
    }

    // ── Guided Search ────────────────────────────────
    if (action === "guide_step1") {
      return {
        text: "🔍 <strong>Step 1 of 3 — Property Type</strong><br/>What type of property are you looking for in Coimbatore?",
        chips: [
          { icon: "fa-layer-group", label: "DTCP/RERA Plots", action: "guide_step2", payload: "PLOTS & SITES" },
          { icon: "fa-house-chimney", label: "Villas & Homes", action: "guide_step2", payload: "VILLAS & HOMES" },
          { icon: "fa-building", label: "Commercial Sites", action: "guide_step2", payload: "COMMERCIAL SITES" },
          { icon: "fa-warehouse", label: "Agricultural Land", action: "guide_step2", payload: "AGRICULTURAL" },
        ],
      };
    }

    if (action === "guide_step2") {
      const type = payload || "Property";
      setMemory(prev => ({ ...prev, propertyType: type }));
      return {
        text: `📍 <strong>Step 2 of 3 — Location</strong><br/>Great! <em>${type}</em> noted. Which micro-market in Coimbatore do you prefer?`,
        chips: [
          { icon: "fa-location-dot", label: "Sulur", action: "guide_step3", payload: "Sulur" },
          { icon: "fa-location-dot", label: "Kalapatti", action: "guide_step3", payload: "Kalapatti" },
          { icon: "fa-location-dot", label: "Neelambur", action: "guide_step3", payload: "Neelambur" },
          { icon: "fa-location-dot", label: "Sathy Road", action: "guide_step3", payload: "Sathy Road" },
          { icon: "fa-location-dot", label: "Avinashi Road", action: "guide_step3", payload: "Avinashi Road" },
          { icon: "fa-location-dot", label: "Pattanam", action: "guide_step3", payload: "Pattanam" },
        ],
      };
    }

    if (action === "guide_step3") {
      const loc = payload || "Coimbatore";
      setMemory(prev => ({ ...prev, location: loc }));
      return {
        text: `💰 <strong>Step 3 of 3 — Budget</strong><br/>Looking for <em>${memory.propertyType || "properties"}</em> in <em>${loc}</em>. What is your budget range?`,
        chips: [
          { icon: "fa-indian-rupee-sign", label: "Under ₹30 Lakhs", action: "show_properties", payload: "Under ₹30L" },
          { icon: "fa-indian-rupee-sign", label: "₹30L – ₹60L", action: "show_properties", payload: "₹30L–₹60L" },
          { icon: "fa-indian-rupee-sign", label: "₹60L – ₹1.2 Cr", action: "show_properties", payload: "₹60L–₹1.2Cr" },
          { icon: "fa-indian-rupee-sign", label: "Above ₹1.2 Cr", action: "show_properties", payload: "₹1.2Cr+" },
        ],
      };
    }

    if (action === "show_properties") {
      const budget = payload || "Any Budget";
      setMemory(prev => ({ ...prev, budget }));
      const matched = propertiesData.slice(0, 3);
      return {
        text: `✨ <strong>Recommended Properties</strong><br/>Showing top picks for <em>${memory.propertyType || "properties"}</em> in <em>${memory.location || "Coimbatore"}</em> (${budget}):`,
        properties: matched,
        chips: [
          { icon: "fa-calendar-plus", label: "Book Site Visit", action: "action_book" },
          { icon: "fa-headset", label: "Talk to Sales Rep", action: "action_handoff" },
          { icon: "fa-arrows-rotate", label: "New Search", action: "guide_step1" },
        ],
      };
    }

    // ── Buy ──────────────────────────────────────────
    if (action === "action_buy") {
      return {
        text: "🏡 <strong>Buy Property in Coimbatore</strong><br/><br/>We offer 100% legally verified plots, villa sites, and commercial frontage across Sulur, Kalapatti, Neelambur, Sathy Road, and Avinashi Road corridors.<br/><br/>Would you like to explore by property type or location?",
        chips: [
          { icon: "fa-magnifying-glass", label: "Start Guided Search", action: "guide_step1" },
          { icon: "fa-calendar-check", label: "Book Site Visit", action: "action_book" },
          { icon: "fa-headset", label: "Speak to Agent", action: "action_handoff" },
        ],
      };
    }

    // ── Sell ─────────────────────────────────────────
    if (action === "action_sell") {
      return {
        text: "🏷️ <strong>Sell Your Property with Vizhi Infragen</strong><br/><br/>We help property owners get the best market value with:<br/>• Data-backed property valuation<br/>• Direct buyer network (no intermediaries)<br/>• Complete legal documentation support<br/>• Zero pressure — seller-first approach<br/><br/>Share your details and we'll reach out within 24 hours:",
        cardType: "lead_form",
        chips: [
          { icon: "fa-headset", label: "Talk to Agent Now", action: "action_handoff" },
        ],
      };
    }

    // ── Rent / Property Management ───────────────────
    if (action === "action_rent") {
      return {
        text: "🔑 <strong>Rental & Property Management in Coimbatore</strong><br/><br/>Our end-to-end rental services include:<br/>• Tenant screening & background checks<br/>• Lease agreement drafting<br/>• Monthly rent collection & remittance<br/>• Periodic inspections & maintenance<br/>• Financial reporting for owners<br/><br/>This is ideal for NRI owners and busy professionals.",
        chips: [
          { icon: "fa-globe", label: "NRI Property Shield", action: "action_nri" },
          { icon: "fa-headset", label: "Enquire Now", action: "action_handoff" },
          { icon: "fa-calendar-check", label: "Request Callback", action: "action_book" },
        ],
      };
    }

    // ── NRI ──────────────────────────────────────────
    if (action === "action_nri") {
      return {
        text: "✈️ <strong>NRI Property Shield — Vizhi Infragen</strong><br/><br/>Built exclusively for Non-Resident Indians managing Coimbatore assets from overseas:<br/><br/>✅ On-site inspection visits + photo/video reports<br/>✅ Tenant sourcing & rent collection<br/>✅ Agricultural-to-residential conversion<br/>✅ Legal title clearance & tax compliance<br/>✅ Power-of-attorney assistance<br/>✅ WhatsApp & email status updates",
        chips: [
          { icon: "fa-whatsapp", label: "WhatsApp Us", action: "wa_link" },
          { icon: "fa-phone", label: "Call Us", action: "call_link" },
          { icon: "fa-calendar-check", label: "Request Consultation", action: "action_book" },
        ],
      };
    }

    // ── FAQ ──────────────────────────────────────────
    if (action === "action_faq") {
      return {
        text: "📋 <strong>FAQ & Legal Information</strong><br/>Select a topic or type your question:",
        chips: [
          { icon: "fa-stamp", label: "DTCP Approval", action: "faq_dtcp" },
          { icon: "fa-landmark", label: "RERA Registration", action: "faq_rera" },
          { icon: "fa-piggy-bank", label: "Home / Land Loans", action: "faq_loan" },
          { icon: "fa-file-signature", label: "Property Registration", action: "faq_registration" },
          { icon: "fa-file-circle-check", label: "Encumbrance Cert.", action: "faq_encumbrance" },
          { icon: "fa-seedling", label: "Land Conversion", action: "faq_conversion" },
          { icon: "fa-building-user", label: "Property Management", action: "faq_management" },
        ],
      };
    }

    // ── FAQ Sub-answers ──────────────────────────────
    if (action?.startsWith("faq_")) {
      const key = action.replace("faq_", "");
      const answer = FAQ_ANSWERS[key] || "Please contact our team for more details on this topic.";
      return {
        text: answer,
        chips: [
          { icon: "fa-circle-question", label: "More FAQ Topics", action: "action_faq" },
          { icon: "fa-headset", label: "Ask Legal Expert", action: "action_handoff" },
        ],
      };
    }

    // ── Book Site Visit ──────────────────────────────
    if (action === "action_book") {
      return {
        text: `📅 <strong>Schedule a Site Visit</strong><br/>${memory.location ? `We'll arrange a visit to our <em>${memory.location}</em> properties.` : "Our Coimbatore advisor will coordinate the visit details."}<br/><br/>Please fill in your details below:`,
        cardType: "booking_form",
      };
    }

    // ── Human Handoff ────────────────────────────────
    if (action === "action_handoff") {
      return {
        text: "🙋 <strong>Connect with a Vizhi Property Advisor</strong><br/>Our Coimbatore team is available Mon–Sat, 9AM–7PM. Choose how you'd like to reach us:",
        cardType: "handoff",
      };
    }

    // ── External Links ───────────────────────────────
    if (action === "wa_link") {
      if (typeof window !== "undefined") window.open("https://wa.me/919688889420?text=Hi!%20I'm%20interested%20in%20Vizhi%20Infragen%20properties", "_blank");
      return { text: "Opening WhatsApp... 💬", chips: [{ icon: "fa-house", label: "Back to Menu", action: "welcome_start" }] };
    }
    if (action === "call_link") {
      if (typeof window !== "undefined") window.location.href = "tel:+919688889420";
      return { text: "Connecting call... 📞", chips: [{ icon: "fa-house", label: "Back to Menu", action: "welcome_start" }] };
    }
    if (action === "back_home") {
      return getResponse("", "welcome_start");
    }

    // ── Natural Language Search ──────────────────────
    const hasPlot = lo.includes("plot") || lo.includes("land") || lo.includes("dtcp") || lo.includes("rera") || lo.includes("site") || lo.includes("layout");
    const hasVilla = lo.includes("villa") || lo.includes("house") || lo.includes("home") || lo.includes("2bhk") || lo.includes("3bhk") || lo.includes("apartment") || lo.includes("flat");
    const hasCommercial = lo.includes("commercial") || lo.includes("office") || lo.includes("shop") || lo.includes("warehouse");
    const hasLocation = lo.includes("sulur") || lo.includes("kalapatti") || lo.includes("neelambur") || lo.includes("sathy") || lo.includes("avinashi") || lo.includes("pattanam") || lo.includes("saravanampatti") || lo.includes("coimbatore");
    const hasBudget = lo.includes("lakh") || lo.includes("crore") || lo.includes("₹") || lo.includes("rs") || lo.includes("budget");
    const hasNRI = lo.includes("nri") || lo.includes("abroad") || lo.includes("overseas") || lo.includes("usa") || lo.includes("uk") || lo.includes("dubai");
    const hasRent = lo.includes("rent") || lo.includes("tenant") || lo.includes("lease") || lo.includes("manage");
    const hasBuy = lo.includes("buy") || lo.includes("purchase") || lo.includes("invest") || lo.includes("looking for");
    const hasSell = lo.includes("sell") || lo.includes("selling") || lo.includes("sale");
    const hasFAQ = lo.includes("faq") || lo.includes("legal") || lo.includes("document") || lo.includes("loan") || lo.includes("registration") || lo.includes("encumbrance") || lo.includes("approval") || lo.includes("ec cert") || lo.includes("stamp duty");
    const hasVisit = lo.includes("visit") || lo.includes("schedule") || lo.includes("appointment") || lo.includes("book");
    const hasContact = lo.includes("contact") || lo.includes("phone") || lo.includes("call") || lo.includes("agent") || lo.includes("talk") || lo.includes("human") || lo.includes("person");
    const hasGreet = lo.includes("hi") || lo.includes("hello") || lo.includes("hey") || lo.includes("good morning") || lo.includes("good afternoon") || lo.includes("start");
    const hasThanks = lo.includes("thank") || lo.includes("thanks") || lo.includes("great") || lo.includes("perfect");

    if (hasGreet) return getResponse("", "welcome_start");
    if (hasThanks) {
      return {
        text: "🙏 You're welcome! Is there anything else I can help you with regarding Coimbatore real estate?",
        chips: [
          { icon: "fa-magnifying-glass", label: "Search Properties", action: "guide_step1" },
          { icon: "fa-calendar-check", label: "Book Visit", action: "action_book" },
          { icon: "fa-house", label: "Main Menu", action: "welcome_start" },
        ],
      };
    }

    if (hasNRI) return getResponse("", "action_nri");
    if (hasFAQ) return getResponse("", "action_faq");
    if (hasVisit) return getResponse("", "action_book");
    if (hasContact) return getResponse("", "action_handoff");
    if (hasSell) return getResponse("", "action_sell");
    if (hasRent) return getResponse("", "action_rent");

    // Natural Language Property Search — extract context
    if (hasPlot || hasVilla || hasCommercial || hasLocation || hasBudget || hasBuy) {
      let extracted_type = memory.propertyType;
      let extracted_loc = memory.location;

      if (hasPlot) extracted_type = "PLOTS & SITES";
      else if (hasVilla) extracted_type = "VILLAS & HOMES";
      else if (hasCommercial) extracted_type = "COMMERCIAL SITES";

      if (lo.includes("sulur")) extracted_loc = "Sulur";
      else if (lo.includes("kalapatti")) extracted_loc = "Kalapatti";
      else if (lo.includes("neelambur")) extracted_loc = "Neelambur";
      else if (lo.includes("sathy")) extracted_loc = "Sathy Road";
      else if (lo.includes("avinashi")) extracted_loc = "Avinashi Road";
      else if (lo.includes("pattanam")) extracted_loc = "Pattanam";
      else if (lo.includes("saravanampatti")) extracted_loc = "Saravanampatti";

      if (extracted_type) setMemory(prev => ({ ...prev, propertyType: extracted_type }));
      if (extracted_loc) setMemory(prev => ({ ...prev, location: extracted_loc }));

      const matched = propertiesData.filter(p => {
        if (extracted_type && extracted_type !== "AGRICULTURAL") return p.category === extracted_type;
        if (extracted_loc) return p.location.toLowerCase().includes((extracted_loc || "").toLowerCase());
        return true;
      }).slice(0, 3) || propertiesData.slice(0, 3);

      const locText = extracted_loc ? ` in <strong>${extracted_loc}</strong>` : " across Coimbatore";
      const typeText = extracted_type ? `<strong>${extracted_type}</strong>` : "properties";

      return {
        text: `🏘️ <strong>AI Search Result:</strong> Here are verified ${typeText}${locText} matching your query:`,
        properties: matched.length > 0 ? matched : propertiesData.slice(0, 3),
        chips: [
          { icon: "fa-calendar-plus", label: "Book Site Visit", action: "action_book" },
          { icon: "fa-sliders", label: "Refine Search", action: "guide_step1" },
          { icon: "fa-headset", label: "Talk to Expert", action: "action_handoff" },
        ],
      };
    }

    // ── Domain Guardrail (Off-topic) ─────────────────
    const isRealEstate = hasPlot || hasVilla || hasCommercial || hasLocation || hasBudget || hasNRI ||
      hasRent || hasBuy || hasSell || hasFAQ || hasVisit || hasContact || hasGreet || hasThanks ||
      lo.includes("price") || lo.includes("cost") || lo.includes("infragen") || lo.includes("vizhi") ||
      lo.includes("property") || lo.includes("real estate") || lo.includes("coimbatore");

    if (!isRealEstate || t.length === 0) {
      return {
        text: "⚠️ <strong>I can only assist with Coimbatore Real Estate.</strong><br/><br/>I'm Vizhi AI — exclusively trained for property buying, selling, NRI management, and legal queries in Coimbatore.<br/><br/>Please ask me about:<br/>• Buying plots or villas in Coimbatore<br/>• DTCP/RERA approvals<br/>• Scheduling a site visit<br/>• Property management or NRI services",
        chips: [
          { icon: "fa-magnifying-glass", label: "Search Properties", action: "guide_step1" },
          { icon: "fa-house", label: "Main Menu", action: "welcome_start" },
          { icon: "fa-headset", label: "Talk to Agent", action: "action_handoff" },
        ],
      };
    }

    // Final fallback for real-estate adjacent queries
    return {
      text: `💡 I found this related to your query. Here's how I can help with Coimbatore real estate:`,
      chips: [
        { icon: "fa-magnifying-glass", label: "Search Properties", action: "guide_step1" },
        { icon: "fa-circle-question", label: "FAQ & Legal", action: "action_faq" },
        { icon: "fa-headset", label: "Ask an Agent", action: "action_handoff" },
      ],
    };
  }, [memory]);

  // ── Send Message Handler ──────────────────────────

  const handleSend = useCallback((displayText?: string, action?: string, payload?: string) => {
    const rawText = displayText || input;
    if (!rawText.trim() && !action) return;

    const userMsg: MessageItem = {
      id: Date.now(),
      sender: "user",
      text: rawText || action || "",
      time: getNow(),
    };
    setMessages(prev => [...prev, userMsg]);
    if (!displayText) setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const resp = getResponse(rawText, action, payload);
      const botMsg: MessageItem = {
        id: Date.now() + 1,
        sender: "bot",
        text: resp.text,
        time: getNow(),
        chips: resp.chips,
        properties: resp.properties,
        cardType: resp.cardType,
      };
      setIsTyping(false);
      setMessages(prev => [...prev, botMsg]);
    }, 650);
  }, [input, getResponse]);

  // ── Minimize Chat (preserve progress) ────────────
  const minimizeChat = () => {
    setIsOpen(false);
    setIsMinimized(true); // keep messages, memory intact
  };

  // ── Reset + Close Chat (X button) ────────────────
  const closeAndReset = () => {
    setIsOpen(false);
    setIsMinimized(false);
    setMessages([]);
    setMemory({});
    setInput("");
    setIsTyping(false);
    setHasUnread(false);
    setBName(""); setBPhone(""); setBEmail(""); setBDate("");
    setLName(""); setLPhone(""); setLEmail("");
  };

  // ── Toggle Chat (floating trigger button) ─────────
  const toggleChat = () => {
    if (isOpen) {
      // Clicking trigger while open → minimize (preserve progress)
      minimizeChat();
      return;
    }
    if (isMinimized) {
      // Restore from minimized — resume exactly where user left off
      setIsOpen(true);
      setIsMinimized(false);
      return;
    }
    // Fully closed → open fresh from welcome
    setIsOpen(true);
    setIsMinimized(false);
    setHasUnread(false);
    setMessages([]);
    setMemory({});
    setTimeout(() => {
      const welcome = getResponse("", "welcome_start");
      setMessages([{
        id: Date.now(),
        sender: "bot",
        text: welcome.text,
        time: getNow(),
        chips: welcome.chips,
      }]);
    }, 100);
  };

  // ── Booking Submit ────────────────────────────────

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bName || !bPhone) return;

    setMemory(prev => ({ ...prev, name: bName, phone: bPhone }));

    const confirmMsg: MessageItem = {
      id: Date.now(),
      sender: "bot",
      text: `🎉 <strong>Site Visit Confirmed!</strong><br/><br/>📋 <strong>Booking Summary:</strong><br/>• Name: ${bName}<br/>• Phone: ${bPhone}${bEmail ? `<br/>• Email: ${bEmail}` : ""}<br/>• Date: ${bDate || "Next available slot"}<br/>• Time: ${bSlot}<br/>${memory.location ? `• Location: ${memory.location}` : ""}<br/><br/>Our Coimbatore advisor will call you within <strong>2 hours</strong> to confirm location coordinates. 📍`,
      time: getNow(),
      chips: [
        { icon: "fa-whatsapp", label: "Confirm on WhatsApp", action: "wa_link" },
        { icon: "fa-magnifying-glass", label: "Browse More Properties", action: "guide_step1" },
      ],
    };

    setMessages(prev => [...prev, confirmMsg]);
    setBName(""); setBPhone(""); setBEmail(""); setBDate("");
  };

  // ── Lead Submit ───────────────────────────────────

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lName || !lPhone) return;

    const confirmMsg: MessageItem = {
      id: Date.now(),
      sender: "bot",
      text: `✅ <strong>Thank you, ${lName}!</strong><br/><br/>Your sell enquiry has been received. Our property valuation expert will contact you at <strong>${lPhone}</strong> during <strong>${lContactTime}</strong>.<br/><br/>We'll provide a free, data-backed market valuation report within 24 hours.`,
      time: getNow(),
      chips: [
        { icon: "fa-whatsapp", label: "WhatsApp Update", action: "wa_link" },
        { icon: "fa-house", label: "Main Menu", action: "welcome_start" },
      ],
    };

    setMessages(prev => [...prev, confirmMsg]);
    setLName(""); setLPhone(""); setLEmail("");
  };

  // ── Render ────────────────────────────────────────

  return (
    <>
      {/* ── Floating Trigger Button ──────────────────── */}
      <button
        onClick={toggleChat}
        aria-label="Open AI Property Assistant"
        className={`fixed bottom-6 right-6 z-[9999] w-[62px] h-[62px] rounded-full bg-gradient-to-br from-[#1F0A10] to-[#4a1c26] border-[2.5px] border-[#c5a880] shadow-2xl flex items-center justify-center cursor-pointer transition-all duration-500 ${
          visible ? "opacity-100 scale-100" : "opacity-0 scale-75 pointer-events-none"
        } hover:scale-110`}
      >
        <span className="absolute -inset-1.5 rounded-full border-2 border-[#c5a880]/35 animate-ping pointer-events-none" />
        <i className="fa-solid fa-robot text-2xl text-[#c5a880] relative z-10 transition-all duration-300" />
        {/* Red unread badge (first visit) */}
        {hasUnread && !isOpen && !isMinimized && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-white z-20 shadow-lg animate-bounce">
            1
          </span>
        )}
        {/* Green resume badge when minimized */}
        {isMinimized && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white z-20 shadow-lg">
            <i className="fa-solid fa-chevron-up text-[9px]" />
          </span>
        )}
      </button>

      {/* ── Minimized Preview Pill ──────────────────── */}
      {isMinimized && (
        <button
          onClick={toggleChat}
          className="fixed bottom-[88px] right-6 z-[9997] bg-gradient-to-r from-[#1F0A10] to-[#3d1520] border border-[#c5a880]/50 text-white text-[11px] font-semibold font-['Inter',sans-serif] px-4 py-2 rounded-full shadow-xl flex items-center gap-2.5 cursor-pointer hover:border-[#c5a880] transition-all duration-200"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-[#c5a880] font-bold">Vizhi AI</span>
          <span className="text-white/70">— tap to resume</span>
          <i className="fa-solid fa-chevron-up text-[9px] text-[#c5a880]" />
        </button>
      )}

      {/* ── Chat Window ──────────────────────────────── */}
      <div
        className={`fixed bottom-24 right-6 z-[9998] w-[420px] max-w-[calc(100vw-20px)] flex flex-col bg-white rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.22)] border border-stone-200/60 overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
        }`}
        style={{ height: "min(640px, calc(100vh - 110px))" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1A0810] via-[#2D1015] to-[#3d1520] px-4 py-3.5 flex items-center gap-3 shrink-0 shadow-lg">
          <div className="relative shrink-0">
            <div className="w-11 h-11 rounded-full bg-[#c5a880]/15 border-2 border-[#c5a880]/70 flex items-center justify-center text-[#c5a880]">
              <i className="fa-solid fa-robot text-lg" />
            </div>
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#2D1015]" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-[13.5px] text-white font-['Outfit',sans-serif] flex items-center gap-2">
              Vizhi Real Estate AI
              <span className="text-[9px] bg-[#c5a880] text-[#1F0A10] font-black px-2 py-0.5 rounded-full tracking-wide">COIMBATORE</span>
            </div>
            <div className="text-[11px] text-emerald-400 font-['Inter',sans-serif] flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block animate-pulse" />
              Online — 24/7 Property Assistant
            </div>
          </div>
          {/* Minimize Button */}
          <button
            onClick={minimizeChat}
            aria-label="Minimize chat (preserves progress)"
            title="Minimize — your chat progress is saved"
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <i className="fa-solid fa-window-minimize text-[10px]" />
          </button>
          {/* Close & Reset Button */}
          <button
            onClick={closeAndReset}
            aria-label="Close and reset chat"
            title="Close and clear chat history"
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-red-500/80 text-white/70 hover:text-white flex items-center justify-center text-xs transition-all cursor-pointer"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {/* Quick Action Bar */}
        <div className="bg-[#1A0810] px-3 py-2 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none border-b border-white/10">
          {[
            { emoji: "🔍", label: "Search", action: "guide_step1" },
            { emoji: "🏡", label: "Buy", action: "action_buy" },
            { emoji: "🏷️", label: "Sell", action: "action_sell" },
            { emoji: "🔑", label: "Rent", action: "action_rent" },
            { emoji: "✈️", label: "NRI", action: "action_nri" },
            { emoji: "📋", label: "FAQ", action: "action_faq" },
            { emoji: "📅", label: "Book Visit", action: "action_book" },
            { emoji: "🙋", label: "Agent", action: "action_handoff" },
          ].map(btn => (
            <button
              key={btn.action}
              onClick={() => handleSend(btn.label, btn.action)}
              className="px-3 py-1 rounded-full text-[11px] bg-white/8 border border-white/15 text-white/85 hover:bg-[#c5a880] hover:text-[#1F0A10] hover:border-[#c5a880] font-medium shrink-0 transition-all duration-200 cursor-pointer"
            >
              {btn.emoji} {btn.label}
            </button>
          ))}
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-[#faf7f4] to-[#f5f0ea] space-y-4 font-['Inter',sans-serif]">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3 pb-8">
              <div className="w-16 h-16 rounded-full bg-[#1F0A10]/10 flex items-center justify-center">
                <i className="fa-solid fa-robot text-3xl text-[#c5a880]" />
              </div>
              <p className="text-stone-500 text-sm font-medium">AI Property Assistant</p>
              <p className="text-stone-400 text-xs max-w-[220px]">Ask me anything about buying, selling, or managing property in Coimbatore.</p>
            </div>
          )}

          {messages.map((m) => (
            <div key={m.id} className={`flex items-end gap-2 ${m.sender === "user" ? "flex-row-reverse" : ""}`}>
              {m.sender === "bot" && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1F0A10] to-[#3d1520] border border-[#c5a880]/60 flex items-center justify-center text-[11px] text-[#c5a880] shrink-0 shadow-md">
                  <i className="fa-solid fa-robot" />
                </div>
              )}
              <div className="max-w-[85%] space-y-2 min-w-0">
                {/* Bubble */}
                <div
                  dangerouslySetInnerHTML={{ __html: m.text }}
                  className={`px-4 py-3 text-[12px] leading-relaxed rounded-2xl ${
                    m.sender === "bot"
                      ? "bg-white text-stone-800 rounded-bl-md shadow-sm border border-stone-200/70"
                      : "bg-gradient-to-br from-[#2D1015] to-[#4a1c26] text-white rounded-br-md shadow-md"
                  }`}
                />

                {/* Property Cards */}
                {m.properties && m.properties.length > 0 && (
                  <div className="space-y-2.5 pt-0.5">
                    {m.properties.map(prop => (
                      <div key={prop.id} className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-md hover:shadow-lg transition-shadow">
                        <div className="relative h-32 w-full">
                          <Image src={prop.image} alt={prop.title} fill className="object-cover" sizes="360px" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <span className="absolute top-2 left-2 bg-[#1F0A10]/90 text-[#c5a880] text-[9px] font-extrabold px-2 py-0.5 rounded-md tracking-wide">
                            {prop.badge}
                          </span>
                        </div>
                        <div className="p-3">
                          <h5 className="font-bold text-[12px] text-[#1E293B] font-['Outfit',sans-serif] leading-tight">{prop.title}</h5>
                          <p className="text-[10px] text-[#c5a880] font-semibold mt-0.5 flex items-center gap-1">
                            <i className="fa-solid fa-location-dot text-[9px]" /> {prop.location}
                          </p>
                          <p className="text-[10px] text-stone-500 mt-1 leading-snug">{prop.description}</p>
                          <div className="flex gap-2 mt-2.5">
                            <button
                              onClick={() => handleSend(`Book visit for ${prop.title}`, "action_book")}
                              className="flex-1 bg-[#1F0A10] hover:bg-[#3d1520] text-[#c5a880] text-[10px] font-bold py-1.5 rounded-lg transition-colors cursor-pointer"
                            >
                              📅 Schedule Visit
                            </button>
                            <a
                              href={`https://wa.me/919688889420?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(prop.title)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold rounded-lg flex items-center justify-center transition-colors"
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
                  <form onSubmit={handleBookingSubmit} className="bg-white rounded-xl p-4 border border-stone-200 shadow-md space-y-2.5">
                    <h4 className="text-[12px] font-bold text-[#1E293B] font-['Outfit',sans-serif]">📅 Visit Details</h4>
                    <input
                      required type="text" placeholder="Full Name *"
                      value={bName} onChange={e => setBName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-[11px] outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]/30 transition"
                    />
                    <input
                      required type="tel" placeholder="Phone Number *"
                      value={bPhone} onChange={e => setBPhone(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-[11px] outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]/30 transition"
                    />
                    <input
                      type="email" placeholder="Email Address (optional)"
                      value={bEmail} onChange={e => setBEmail(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-[11px] outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]/30 transition"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date" value={bDate} onChange={e => setBDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="bg-stone-50 border border-stone-300 rounded-lg px-2 py-2 text-[11px] outline-none focus:border-[#c5a880] transition"
                      />
                      <select
                        value={bSlot} onChange={e => setBSlot(e.target.value)}
                        className="bg-stone-50 border border-stone-300 rounded-lg px-2 py-2 text-[11px] outline-none focus:border-[#c5a880] transition"
                      >
                        <option>10:00 AM</option>
                        <option>12:00 PM</option>
                        <option>02:00 PM</option>
                        <option>04:00 PM</option>
                        <option>05:30 PM</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full bg-[#1F0A10] hover:bg-[#3d1520] text-[#c5a880] font-extrabold py-2.5 rounded-lg text-[11px] transition-colors shadow-md cursor-pointer">
                      ✅ Confirm Site Visit
                    </button>
                  </form>
                )}

                {/* Lead Form Card */}
                {m.cardType === "lead_form" && (
                  <form onSubmit={handleLeadSubmit} className="bg-white rounded-xl p-4 border border-stone-200 shadow-md space-y-2.5">
                    <h4 className="text-[12px] font-bold text-[#1E293B] font-['Outfit',sans-serif]">📝 Sell Enquiry</h4>
                    <input
                      required type="text" placeholder="Your Full Name *"
                      value={lName} onChange={e => setLName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-[11px] outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]/30 transition"
                    />
                    <input
                      required type="tel" placeholder="Phone Number *"
                      value={lPhone} onChange={e => setLPhone(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-[11px] outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]/30 transition"
                    />
                    <input
                      type="email" placeholder="Email Address (optional)"
                      value={lEmail} onChange={e => setLEmail(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-[11px] outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]/30 transition"
                    />
                    <select
                      value={lContactTime} onChange={e => setLContactTime(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-[11px] outline-none focus:border-[#c5a880] transition"
                    >
                      <option>Morning (9AM–12PM)</option>
                      <option>Afternoon (12PM–4PM)</option>
                      <option>Evening (4PM–7PM)</option>
                    </select>
                    <button type="submit" className="w-full bg-[#1F0A10] hover:bg-[#3d1520] text-[#c5a880] font-extrabold py-2.5 rounded-lg text-[11px] transition-colors shadow-md cursor-pointer">
                      📤 Submit Sell Enquiry
                    </button>
                  </form>
                )}

                {/* Handoff Card */}
                {m.cardType === "handoff" && (
                  <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-md space-y-2">
                    <a
                      href="https://wa.me/919688889420?text=Hi!%20I%20need%20help%20from%20a%20Vizhi%20property%20advisor"
                      target="_blank" rel="noopener noreferrer"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-lg text-[11px] flex items-center justify-center gap-2.5 transition-colors shadow-sm"
                    >
                      <i className="fa-brands fa-whatsapp text-sm" /> Chat on WhatsApp
                    </a>
                    <a
                      href="tel:+919688889420"
                      className="w-full bg-[#1E293B] hover:bg-slate-900 text-white font-bold py-2.5 px-4 rounded-lg text-[11px] flex items-center justify-center gap-2.5 transition-colors shadow-sm"
                    >
                      <i className="fa-solid fa-phone text-xs" /> Call +91 96888 89420
                    </a>
                    <a
                      href="mailto:srissa2006@gmail.com?subject=Property Enquiry - Vizhi Infragen"
                      className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-2.5 px-4 rounded-lg text-[11px] flex items-center justify-center gap-2.5 transition-colors border border-stone-300"
                    >
                      <i className="fa-solid fa-envelope text-xs" /> Email Our Team
                    </a>
                    <div className="pt-1.5 border-t border-stone-200 text-center text-[10px] text-stone-400">
                      📍 Shop No.24, Old Bus Stand, Sulur, Coimbatore — Mon–Sat 9AM–7PM
                    </div>
                  </div>
                )}

                {/* Timestamp */}
                <span className="text-[9px] text-stone-400 block text-right">{m.time}</span>

                {/* Chip Suggestions */}
                {m.chips && (
                  <div className="flex flex-wrap gap-1.5">
                    {m.chips.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(c.label, c.action, c.payload)}
                        className="px-3 py-1.5 rounded-full text-[11px] border border-[#c5a880]/60 text-[#3d1520] bg-[#c5a880]/12 hover:bg-[#c5a880] hover:text-[#1F0A10] hover:border-[#c5a880] font-semibold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
                      >
                        <i className={`fa-solid ${c.icon} text-[9px]`} />
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-end gap-2">
              <div className="w-7 h-7 rounded-full bg-[#1F0A10] border border-[#c5a880]/60 text-[#c5a880] flex items-center justify-center text-[11px] shrink-0">
                <i className="fa-solid fa-robot" />
              </div>
              <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-md shadow-sm border border-stone-200 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880] animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Footer Input */}
        <div className="px-3 py-3 bg-white border-t border-stone-200 flex items-center gap-2 shrink-0 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSend()}
            placeholder='Try "DTCP plots near Sulur under ₹40L"…'
            className="flex-1 bg-[#faf8f5] border border-stone-300 rounded-full px-4 py-2 text-[11.5px] outline-none focus:border-[#c5a880] focus:ring-2 focus:ring-[#c5a880]/20 font-['Inter',sans-serif] transition"
          />
          <button
            onClick={() => handleSend()}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1F0A10] to-[#3d1520] text-[#c5a880] hover:scale-105 flex items-center justify-center transition-transform shrink-0 shadow-md cursor-pointer border border-[#c5a880]/30"
            aria-label="Send Message"
          >
            <i className="fa-solid fa-paper-plane text-xs" />
          </button>
        </div>
      </div>
    </>
  );
}
