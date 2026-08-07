"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { propertiesData, PropertyItem } from "@/data/properties";
import { searchKnowledge } from "@/lib/ragKnowledge";

// ── Types ─────────────────────────────────────────────────────────────────────

type CardType = "booking_form" | "lead_form" | "handoff";

interface ChipItem {
  icon: string;
  label: string;
  action: string;
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
  purpose?: string;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

const getNow = () => {
  const d = new Date();
  const h = d.getHours();
  const m = d.getMinutes();
  return `${h > 12 ? h - 12 : h || 12}:${m < 10 ? "0" + m : m} ${h >= 12 ? "PM" : "AM"}`;
};

// ── Local AI RAG Engine ───────────────────────────────────────────────────────
// Uses exact text RAG search + intent mapping.
// Answers strictly based on company knowledge documents.

interface BotResponse {
  text: string;
  chips?: ChipItem[];
  properties?: PropertyItem[];
  cardType?: CardType;
  memoryUpdates?: Partial<SessionMemory>;
}

function localAI(input: string, memory: SessionMemory): BotResponse {
  const lo = input.toLowerCase().trim();
  const memoryUpdates: Partial<SessionMemory> = {};

  // ── 1. Extract location memory ─────────────────────────────────────────────
  if (lo.includes("sulur")) memoryUpdates.location = "Sulur";
  else if (lo.includes("kalapatti")) memoryUpdates.location = "Kalapatti";
  else if (lo.includes("neelambur")) memoryUpdates.location = "Neelambur";
  else if (lo.includes("sathy")) memoryUpdates.location = "Sathy Road";
  else if (lo.includes("avinashi")) memoryUpdates.location = "Avinashi Road";
  else if (lo.includes("pattanam")) memoryUpdates.location = "Pattanam";
  else if (lo.includes("saravanampatti")) memoryUpdates.location = "Saravanampatti";
  else if (lo.includes("kovaipudur")) memoryUpdates.location = "Kovaipudur";
  else if (lo.includes("trichy")) memoryUpdates.location = "Trichy Road";

  // ── 2. Extract property type memory ─────────────────────────────────────────
  if (/\b(plot|plots|dtcp|rera|site|sites|layout|land)\b/.test(lo)) memoryUpdates.propertyType = "PLOTS & SITES";
  else if (/\b(villa|villas|house|home|2bhk|3bhk|residential)\b/.test(lo)) memoryUpdates.propertyType = "VILLAS & HOMES";
  else if (/\b(commercial|office|shop|warehouse|godown|corporate)\b/.test(lo)) memoryUpdates.propertyType = "COMMERCIAL SITES";
  else if (/\b(agricultural|farm|farmland|agri)\b/.test(lo)) memoryUpdates.propertyType = "AGRICULTURAL";

  // ── 3. Extract budget memory ────────────────────────────────────────────────
  const budgetMatch = lo.match(/(\d+)\s*(lakh|lakhs|l\b|crore|cr\b)/i);
  if (budgetMatch) {
    const amount = parseInt(budgetMatch[1]);
    const unit = budgetMatch[2].toLowerCase();
    const isLakh = unit.startsWith("l");
    memoryUpdates.budget = isLakh ? `₹${amount}L` : `₹${amount}Cr`;
  }

  // ── 4. Direct Action Intent Triggers ────────────────────────────────────────

  // Greetings
  if (/\b(hi|hello|hey|good morning|good afternoon|good evening|start|namaste)\b/.test(lo)) {
    return {
      text: `👋 <strong>Welcome to Vizhi Infragen Realtors AI!</strong><br/><br/>I am your 24/7 Coimbatore real estate and property management assistant. I can help you:<br/>• 🏡 Search verified plots, villas & commercial land<br/>• 📜 Guidance on DTCP, RERA, Patta & Encumbrance Certificates<br/>• ✈️ Dedicated NRI Property Management services<br/>• 🏗️ Construction, Valuation & Land Conversion<br/>• 📅 Schedule site visits & speak with advisors<br/><br/>How can I assist you today?`,
      chips: [
        { icon: "fa-magnifying-glass", label: "Search Properties", action: "chip_search" },
        { icon: "fa-house", label: "Buy Property", action: "chip_buy" },
        { icon: "fa-tag", label: "Sell Property", action: "chip_sell" },
        { icon: "fa-key", label: "Rent / Manage", action: "chip_rent" },
        { icon: "fa-globe", label: "NRI Services", action: "chip_nri" },
        { icon: "fa-circle-question", label: "FAQ & Legal", action: "chip_faq" },
        { icon: "fa-calendar-check", label: "Book Visit", action: "chip_book" },
        { icon: "fa-headset", label: "Contact Agent", action: "chip_agent" },
      ],
      memoryUpdates,
    };
  }

  // Thank you
  if (/\b(thank|thanks|great|perfect|awesome|wonderful)\b/.test(lo) && !lo.includes("buy") && !lo.includes("sell")) {
    return {
      text: `🙏 <strong>You're welcome!</strong> Is there anything else I can help you with regarding Coimbatore real estate or property management?`,
      chips: [
        { icon: "fa-magnifying-glass", label: "Search Properties", action: "chip_search" },
        { icon: "fa-calendar-check", label: "Book Site Visit", action: "chip_book" },
        { icon: "fa-house", label: "Main Menu", action: "chip_welcome" },
      ],
      memoryUpdates,
    };
  }

  // Agent Handoff Trigger
  if (/\b(agent|human|person|talk to|speak to|call|phone|whatsapp|contact|advisor)\b/.test(lo) && !lo.includes("buy") && !lo.includes("sell") && !lo.includes("plot")) {
    return { text: "", cardType: "handoff", memoryUpdates };
  }

  // Site Visit Booking Trigger
  if (/\b(visit|book|schedule|appointment|site visit)\b/.test(lo) && !lo.includes("about") && !lo.includes("company")) {
    const loc = memoryUpdates.location || memory.location;
    return {
      text: `📅 <strong>Schedule a Site Visit</strong><br/>${loc ? `We'll arrange a visit to our <em>${loc}</em> properties. ` : ""}Our Coimbatore property advisor will coordinate the visit details.<br/><br/>Please fill in your details below:`,
      cardType: "booking_form",
      memoryUpdates,
    };
  }

  // Sell Property Lead Trigger
  if (/\b(sell|selling|want to sell|list my property)\b/.test(lo)) {
    return {
      text: `🏷️ <strong>Sell Your Property with Vizhi Infragen</strong><br/><br/>We help you get fair market value with:<br/>• Data-backed property valuation<br/>• Verified buyer network (no pressure)<br/>• Complete title & legal documentation support<br/>• Transparent, seller-first process<br/><br/>Share your details below and our expert will contact you within 24 hours:`,
      cardType: "lead_form",
      chips: [
        { icon: "fa-headset", label: "Talk to Agent Now", action: "chip_agent" },
      ],
      memoryUpdates: { ...memoryUpdates, purpose: "sell" },
    };
  }

  // Property Search Listings Trigger
  if (/\b(show|find|list|view|search|available|listings)\b/.test(lo) && /\b(properties|plots|villas|sites|land|houses)\b/.test(lo)) {
    const type = memoryUpdates.propertyType || memory.propertyType;
    const loc = memoryUpdates.location || memory.location;

    const matched = propertiesData.filter((p) => {
      const typeMatch = !type || type === "AGRICULTURAL" || p.category === type;
      const locMatch = !loc || p.location.toLowerCase().includes(loc.toLowerCase());
      return typeMatch && locMatch;
    });

    const results = matched.length > 0 ? matched.slice(0, 3) : propertiesData.slice(0, 3);
    const typeLabel = type ? type.toLowerCase() : "verified properties";
    const locLabel = loc ? ` in <strong>${loc}</strong>` : " across Coimbatore";

    return {
      text: `🏘️ <strong>Properties Found</strong><br/>Here are ${typeLabel}${locLabel}:`,
      properties: results,
      chips: [
        { icon: "fa-calendar-plus", label: "Book Site Visit", action: "chip_book" },
        { icon: "fa-headset", label: "Talk to Advisor", action: "chip_agent" },
      ],
      memoryUpdates,
    };
  }

  // ── 5. Primary RAG Knowledge Search ─────────────────────────────────────────
  // Performs exact & keyword RAG matching against all 20+ company documents.

  const ragChunks = searchKnowledge(input, 2);

  if (ragChunks.length > 0) {
    const top = ragChunks[0];
    // Format text nicely with linebreaks
    const formattedText = top.content
      .replace(/\n\n/g, "<br/><br/>")
      .replace(/\n/g, "<br/>")
      .replace(/•/g, "•");

    return {
      text: `📋 <strong>${top.title}</strong><br/><br/>${formattedText}`,
      chips: [
        { icon: "fa-magnifying-glass", label: "Search Properties", action: "chip_search" },
        { icon: "fa-calendar-check", label: "Book Site Visit", action: "chip_book" },
        { icon: "fa-circle-question", label: "FAQ & Legal", action: "chip_faq" },
        { icon: "fa-headset", label: "Talk to Agent", action: "chip_agent" },
      ],
      memoryUpdates,
    };
  }

  // ── 6. Fallback Guardrail ───────────────────────────────────────────────────
  return {
    text: `ℹ️ <strong>Vizhi Infragen Realtors LLP — Coimbatore</strong><br/><br/>We provide transparent real estate and property management services across Coimbatore (Pattanam, Sulur, Neelambur, Kalapatti, Sathy Road, Trichy Road, Avinashi Road).<br/><br/>How can I help you?<br/>• Land Sales & Purchase Assistance<br/>• Property Management & Dedicated NRI Services<br/>• Building Construction & Market Valuation<br/>• DTCP/RERA Approvals & Land Conversion`,
    chips: [
      { icon: "fa-magnifying-glass", label: "Search Properties", action: "chip_search" },
      { icon: "fa-globe", label: "NRI Services", action: "chip_nri" },
      { icon: "fa-circle-question", label: "FAQ & Legal", action: "chip_faq" },
      { icon: "fa-headset", label: "Contact Agent", action: "chip_agent" },
    ],
    memoryUpdates,
  };
}

// ── CHIP ACTION ROUTER ────────────────────────────────────────────────────────
// Maps quick action chips to user prompts for RAG matching

const CHIP_ROUTES: Record<string, { display: string; prompt: string }> = {
  chip_welcome: { display: "Main Menu", prompt: "hello" },
  chip_search: { display: "Search Properties", prompt: "show me land and plots for sale in Coimbatore" },
  chip_buy: { display: "Buy Property", prompt: "tell me about land purchase assistance and buying plots in Coimbatore" },
  chip_sell: { display: "Sell Property", prompt: "I want to sell my property in Coimbatore" },
  chip_rent: { display: "Rent / Manage", prompt: "tell me about property management and rental services in Coimbatore" },
  chip_nri: { display: "NRI Services", prompt: "tell me about dedicated NRI property management in Coimbatore" },
  chip_faq: { display: "FAQ & Legal", prompt: "what are the frequently asked questions about real estate legal documents DTCP RERA in Coimbatore?" },
  chip_book: { display: "Book Visit", prompt: "I want to schedule a site visit" },
  chip_agent: { display: "Contact Agent", prompt: "I want to talk to a property advisor" },
  chip_dtcp: { display: "DTCP Approval", prompt: "what is DTCP layout approval in Coimbatore?" },
  chip_rera: { display: "RERA Registration", prompt: "what is RERA registration for properties?" },
  chip_loan: { display: "Home Loans", prompt: "tell me about home loan guidance and bank coordination" },
  chip_registration: { display: "Registration", prompt: "how does property registration and stamp duty work?" },
  chip_ec: { display: "Encumbrance Cert.", prompt: "what is an encumbrance certificate EC?" },
  chip_conversion: { display: "Land Conversion", prompt: "tell me about agricultural land conversion services" },
  chip_docs: { display: "Documents Required", prompt: "what documents are required to buy land in Coimbatore?" },
  chip_whatsapp: { display: "WhatsApp Us", prompt: "" },
  chip_cancel: { display: "Cancel Booking", prompt: "" },
};

// ── Main Component ─────────────────────────────────────────────────────────────

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [apiHistory, setApiHistory] = useState<Array<{ role: "user" | "model"; content: string }>>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [memory, setMemory] = useState<SessionMemory>({});

  // Booking form state
  const [bName, setBName] = useState("");
  const [bPhone, setBPhone] = useState("");
  const [bEmail, setBEmail] = useState("");
  const [bDate, setBDate] = useState("");
  const [bSlot, setBSlot] = useState("10:00 AM");
  const [bPropertyHint, setBPropertyHint] = useState("");

  // Cancel booking state — stores the last confirmed booking for cancellation
  const [lastBooking, setLastBooking] = useState<{
    name: string;
    phone: string;
    date: string;
    slot: string;
    property: string;
  } | null>(null);

  // Lead form state
  const [lName, setLName] = useState("");
  const [lPhone, setLPhone] = useState("");
  const [lEmail, setLEmail] = useState("");
  const [lContactTime, setLContactTime] = useState("Morning (9AM–12PM)");

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

  // ── Add messages ───────────────────────────────────────────────────────────

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

  // ── Gemini API call with local RAG fallback ────────────────────────────────

  const askGemini = useCallback(
    async (userText: string, currentHistory: Array<{ role: "user" | "model"; content: string }>, currentMemory: SessionMemory): Promise<void> => {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...currentHistory, { role: "user", content: userText }],
            sessionMemory: currentMemory,
          }),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (data.type === "error") throw new Error(data.message);

        if (data.type === "tool_call") {
          const toolResult = localAI(userText, currentMemory);
          if (toolResult.memoryUpdates) setMemory((p) => ({ ...p, ...toolResult.memoryUpdates }));
          if (toolResult.cardType === "handoff" && !toolResult.text) {
            addBotMessage("🙋 <strong>Connect with a Vizhi Property Advisor</strong><br/>Our Coimbatore team is available Mon–Sat, 9AM–7PM.", undefined, undefined, "handoff");
          } else {
            addBotMessage(toolResult.text, toolResult.chips, toolResult.properties, toolResult.cardType);
          }
          setApiHistory((prev) => [...prev, { role: "user", content: userText }]);
          return;
        }

        if (data.type === "message" && data.text) {
          setIsTyping(false);
          const html = data.text
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            .replace(/\*(.*?)\*/g, "<em>$1</em>")
            .replace(/\n/g, "<br/>");
          addBotMessage(html, [
            { icon: "fa-magnifying-glass", label: "Search Properties", action: "chip_search" },
            { icon: "fa-calendar-check", label: "Book Site Visit", action: "chip_book" },
            { icon: "fa-headset", label: "Talk to Agent", action: "chip_agent" },
          ]);
          setApiHistory((prev) => [...prev, { role: "user", content: userText }, { role: "model", content: data.text }]);
          return;
        }
      } catch {
        // Fallback to local RAG engine on error/quota limit
      }

      // ── Local RAG fallback ─────────────────────────────────────────────────
      setIsTyping(false);
      const localResponse = localAI(userText, currentMemory);
      if (localResponse.memoryUpdates) setMemory((p) => ({ ...p, ...localResponse.memoryUpdates }));
      if (localResponse.cardType === "handoff" && !localResponse.text) {
        addBotMessage("🙋 <strong>Connect with a Vizhi Property Advisor</strong><br/>Our Coimbatore team is available Mon–Sat, 9AM–7PM. Choose how you'd like to reach us:", undefined, undefined, "handoff");
      } else {
        addBotMessage(localResponse.text, localResponse.chips, localResponse.properties, localResponse.cardType);
      }
      setApiHistory((prev) => [...prev, { role: "user", content: userText }]);
    },
    [addBotMessage]
  );

  // ── Send handler ───────────────────────────────────────────────────────────

  // ── Cancel Booking Handler ─────────────────────────────────────────────────

  const handleBookingCancel = useCallback(() => {
    if (!lastBooking) {
      addBotMessage(
        "ℹ️ <strong>No Active Booking Found</strong><br/>There is no confirmed booking to cancel at this time.",
        [{ icon: "fa-calendar-check", label: "Book New Visit", action: "chip_book" }]
      );
      return;
    }

    const { name, phone, date, slot, property } = lastBooking;

    // Determine reschedule time — next day at 10 AM
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowLabel = tomorrow.toLocaleDateString("en-IN", {
      weekday: "long",
      day: "numeric",
      month: "long",
    });
    const rescheduleTime = `${tomorrowLabel} at 10:00 AM`;

    // Build cancellation WhatsApp message to client 7402297479
    const waMsg = [
      "❌ Site Visit Cancelled",
      "",
      `Booking for ${name} (${phone}) on ${date} at ${slot} has been cancelled.`,
      "",
      `We will reconnect with the visitor on ${rescheduleTime}.`,
      "",
      "Please follow up when available.",
      "- Vizhi Infragen AI System",
    ].join("\n");

    // Open WhatsApp to client number with cancellation message
    window.open(
      `https://wa.me/919688889420?text=${encodeURIComponent(waMsg)}`,
      "_blank"
    );

    // Clear stored booking
    setLastBooking(null);

    addBotMessage(
      `❌ <strong>Booking Cancelled</strong><br/><br/>` +
        `We're sorry your site visit has been <strong>cancelled</strong>.<br/><br/>` +
        `📋 <strong>Cancelled Booking:</strong><br/>` +
        `• Name: ${name}<br/>` +
        `• Date & Time: ${date} (${slot})<br/>` +
        `• Property: ${property}<br/><br/>` +
        `📲 <strong>WhatsApp notification</strong> sent to our team.<br/><br/>` +
        `🔄 We will connect with you on <strong>${rescheduleTime}</strong>. We apologise for the inconvenience!`,
      [
        { icon: "fa-calendar-plus", label: "Book New Visit", action: "chip_book" },
        { icon: "fa-headset", label: "Contact Agent", action: "chip_agent" },
        { icon: "fa-house", label: "Main Menu", action: "chip_welcome" },
      ]
    );
  }, [lastBooking, addBotMessage]);

  const handleSend = useCallback(
    (displayText?: string, chipAction?: string) => {
      if (chipAction === "chip_whatsapp") {
        window.open("https://wa.me/919688889420?text=Hi!%20I'm%20interested%20in%20Vizhi%20Infragen%20properties", "_blank");
        return;
      }

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
      addUserMessage(display);

      if (chipAction === "chip_book") {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBotMessage(
            `📅 <strong>Schedule a Site Visit</strong><br/>${memory.location ? `We'll arrange a visit to our <em>${memory.location}</em> properties. ` : ""}Our Coimbatore advisor will coordinate the details.<br/><br/>Please fill in your details below:`,
            undefined,
            undefined,
            "booking_form"
          );
        }, 400);
        return;
      }
      if (chipAction === "chip_agent") {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBotMessage(
            "🙋 <strong>Connect with a Vizhi Property Advisor</strong><br/>Our Coimbatore team is available Mon–Sat, 9AM–7PM. Choose how you'd like to reach us:",
            undefined,
            undefined,
            "handoff"
          );
        }, 400);
        return;
      }

      setIsTyping(true);
      askGemini(prompt, apiHistory, memory).finally(() => setIsTyping(false));
    },
    [input, memory, apiHistory, addUserMessage, addBotMessage, askGemini, handleBookingCancel]
  );

  // ── Chat open/close ────────────────────────────────────────────────────────

  const openChatFresh = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasUnread(false);
    setMessages([]);
    setApiHistory([]);
    setMemory({});
    setTimeout(() => {
      addBotMessage(
        `👋 <strong>Welcome to Vizhi Infragen Realtors AI!</strong><br/><br/>I am your 24/7 Coimbatore real estate and property management assistant. I can help you:<br/>• 🏡 Search verified plots, villas & commercial land<br/>• 📜 Guidance on DTCP, RERA, Patta & Encumbrance Certificates<br/>• ✈️ Dedicated NRI Property Management services<br/>• 🏗️ Construction, Valuation & Land Conversion<br/>• 📅 Schedule site visits & speak with advisors<br/><br/>How can I assist you today?`,
        [
          { icon: "fa-magnifying-glass", label: "Search Properties", action: "chip_search" },
          { icon: "fa-house", label: "Buy Property", action: "chip_buy" },
          { icon: "fa-tag", label: "Sell Property", action: "chip_sell" },
          { icon: "fa-key", label: "Rent / Manage", action: "chip_rent" },
          { icon: "fa-globe", label: "NRI Services", action: "chip_nri" },
          { icon: "fa-circle-question", label: "FAQ & Legal", action: "chip_faq" },
          { icon: "fa-calendar-check", label: "Book Visit", action: "chip_book" },
          { icon: "fa-headset", label: "Contact Agent", action: "chip_agent" },
        ]
      );
    }, 150);
  }, [addBotMessage]);

  const minimizeChat = () => {
    setIsOpen(false);
    setIsMinimized(true);
  };

  const closeAndReset = () => {
    setIsOpen(false);
    setIsMinimized(false);
    setMessages([]);
    setApiHistory([]);
    setMemory({});
    setInput("");
    setIsTyping(false);
    setHasUnread(false);
    setBName("");
    setBPhone("");
    setBEmail("");
    setBDate("");
    setBPropertyHint("");
    setLastBooking(null);
    setLName("");
    setLPhone("");
    setLEmail("");
  };

  const toggleChat = () => {
    if (isOpen) {
      minimizeChat();
      return;
    }
    if (isMinimized) {
      setIsOpen(true);
      setIsMinimized(false);
      return;
    }
    openChatFresh();
  };

  // ── Form Submissions ───────────────────────────────────────────────────────

  // ── Form Submissions (Real-Time Notification Dispatch) ──────────────────────

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bName || !bPhone) return;

    const name = bName;
    const phone = bPhone;
    const date = bDate || "Next available slot";
    const slot = bSlot;
    const property = bPropertyHint || memory.location || "Coimbatore Property";

    setMemory((prev) => ({ ...prev, name, phone }));

    // Store booking info for potential cancellation
    setLastBooking({ name, phone, date, slot, property });

    // Build WhatsApp message to the client (7402297479)
    const waMsg = [
      "⚡ New Site Visit Booked!",
      "",
      "🎉 Site Visit Confirmed!",
      "",
      "📋 Booking Details:",
      `• Name: ${name}`,
      `• Phone: ${phone}`,
      `• Date & Time: ${date} (${slot})`,
      `• Property: ${property}`,
      "",
      "Please contact this visitor within 2 hours!",
      "- Vizhi Infragen AI System",
    ].join("\n");

    // Auto-open WhatsApp to client number 7402297479 with pre-filled message
    window.open(
      `https://wa.me/919688889420?text=${encodeURIComponent(waMsg)}`,
      "_blank"
    );

    // Also record the lead in backend
    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        contactTime: `${date} (${slot})`,
        type: "Site Visit Booking",
        propertyInterest: property,
      }),
    }).catch(() => {});

    addBotMessage(
      `⚡ <strong>Booking Sent via WhatsApp!</strong><br/><br/>` +
        `🎉 <strong>Site Visit Confirmed for ${name}!</strong><br/><br/>` +
        `📋 <strong>Booking Details:</strong><br/>` +
        `• Name: ${name}<br/>` +
        `• Phone: ${phone}<br/>` +
        `• Date & Time: ${date} (${slot})<br/>` +
        `• Property: ${property}<br/><br/>` +
        `📲 <strong>WhatsApp notification</strong> has been sent to our property team! They will contact you within <strong>2 hours</strong>.`,
      [
        { icon: "fa-xmark", label: "Cancel Booking", action: "chip_cancel" },
        { icon: "fa-magnifying-glass", label: "Browse More Properties", action: "chip_search" },
      ]
    );
    setBName("");
    setBPhone("");
    setBEmail("");
    setBDate("");
    setBPropertyHint("");
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lName || !lPhone) return;

    const name = lName;
    const phone = lPhone;
    const time = lContactTime;

    // Send real-time lead dispatch to backend
    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phone,
        contactTime: time,
        type: "General Enquiry",
        propertyInterest: memory.propertyType || memory.location || "Coimbatore Real Estate",
      }),
    }).catch(() => {});

    addBotMessage(
      `⚡ <strong>Real-Time Notification Sent!</strong><br/><br/>✅ <strong>Thank you, ${name}!</strong><br/><br/>Your enquiry has been received and forwarded to our property advisor team in real time. We will contact you at <strong>${phone}</strong> during <strong>${time}</strong>.<br/><br/>We'll provide free, data-backed guidance. You can also connect with us live right now:`,
      [
        { icon: "fa-whatsapp", label: "⚡ Connect Real-Time on WhatsApp", action: "chip_whatsapp" },
        { icon: "fa-house", label: "Main Menu", action: "chip_welcome" },
      ]
    );
    setLName("");
    setLPhone("");
    setLEmail("");
  };

  // ── Render UI ──────────────────────────────────────────────────────────────

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
        <i className="fa-solid fa-robot text-2xl text-[#c5a880] relative z-10" />
        {hasUnread && !isOpen && !isMinimized && (
          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-extrabold flex items-center justify-center border-2 border-white z-20 shadow-lg animate-bounce">
            1
          </span>
        )}
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
          className="fixed bottom-[88px] right-6 z-[9997] bg-gradient-to-r from-[#1F0A10] to-[#3d1520] border border-[#c5a880]/50 text-white text-[11px] font-semibold px-4 py-2 rounded-full shadow-xl flex items-center gap-2.5 cursor-pointer hover:border-[#c5a880] transition-all duration-200"
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
              <span className="text-[9px] bg-[#c5a880] text-[#1F0A10] font-black px-2 py-0.5 rounded-full tracking-wide">
                COIMBATORE
              </span>
            </div>
            <div className="text-[11px] text-emerald-400 font-['Inter',sans-serif] flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-emerald-400 inline-block animate-pulse" />
              Online — 24/7 AI Property Assistant
            </div>
          </div>
          {Object.values(memory).filter(Boolean).length > 0 && (
            <span
              title={`Remembered: ${JSON.stringify(memory)}`}
              className="text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-semibold cursor-help shrink-0"
            >
              <i className="fa-solid fa-brain text-[8px] mr-1" />
              {Object.values(memory).filter(Boolean).length} facts
            </span>
          )}
          <button
            onClick={minimizeChat}
            aria-label="Minimize chat"
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white flex items-center justify-center transition-all cursor-pointer"
          >
            <i className="fa-solid fa-window-minimize text-[10px]" />
          </button>
          <button
            onClick={closeAndReset}
            aria-label="Close chat"
            className="w-7 h-7 rounded-full bg-white/10 hover:bg-red-500/80 text-white/70 hover:text-white flex items-center justify-center text-xs transition-all cursor-pointer"
          >
            <i className="fa-solid fa-xmark" />
          </button>
        </div>

        {/* Quick Action Bar (Exact options requested: Search, Buy, Sell, Rent, NRI, FAQ & Legal, Book Visit, Agent) */}
        <div className="bg-[#1A0810] px-3 py-2 flex items-center gap-2 overflow-x-auto shrink-0 scrollbar-none border-b border-white/10">
          {[
            { emoji: "🔍", label: "Search", action: "chip_search" },
            { emoji: "🏡", label: "Buy", action: "chip_buy" },
            { emoji: "🏷️", label: "Sell", action: "chip_sell" },
            { emoji: "🔑", label: "Rent", action: "chip_rent" },
            { emoji: "✈️", label: "NRI", action: "chip_nri" },
            { emoji: "📋", label: "FAQ & Legal", action: "chip_faq" },
            { emoji: "📅", label: "Book Visit", action: "chip_book" },
            { emoji: "🙋", label: "Agent", action: "chip_agent" },
          ].map((btn) => (
            <button
              key={btn.action}
              onClick={() => handleSend(btn.label, btn.action)}
              className="px-3 py-1 rounded-full text-[11px] bg-white/8 border border-white/15 text-white/85 hover:bg-[#c5a880] hover:text-[#1F0A10] hover:border-[#c5a880] font-medium shrink-0 transition-all duration-200 cursor-pointer"
            >
              {btn.emoji} {btn.label}
            </button>
          ))}
        </div>

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-b from-[#faf7f4] to-[#f5f0ea] space-y-4 font-['Inter',sans-serif]">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center gap-3 pb-8">
              <div className="w-16 h-16 rounded-full bg-[#1F0A10]/10 flex items-center justify-center">
                <i className="fa-solid fa-robot text-3xl text-[#c5a880]" />
              </div>
              <p className="text-stone-500 text-sm font-medium">Vizhi AI — Property Expert</p>
              <p className="text-stone-400 text-xs max-w-[220px]">
                Ask me anything about buying, selling, building, or managing property in Coimbatore.
              </p>
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
                {m.text && (
                  <div
                    dangerouslySetInnerHTML={{ __html: m.text }}
                    className={`px-4 py-3 text-[12px] leading-relaxed rounded-2xl ${
                      m.sender === "bot"
                        ? "bg-white text-stone-800 rounded-bl-md shadow-sm border border-stone-200/70"
                        : "bg-gradient-to-br from-[#2D1015] to-[#4a1c26] text-white rounded-br-md shadow-md"
                    }`}
                  />
                )}

                {/* Property Listing Cards */}
                {m.properties && m.properties.length > 0 && (
                  <div className="space-y-2.5 pt-0.5">
                    {m.properties.map((prop) => (
                      <div
                        key={prop.id}
                        className="bg-white rounded-xl overflow-hidden border border-stone-200 shadow-md hover:shadow-lg transition-shadow"
                      >
                        <div className="relative h-32 w-full">
                          <Image src={prop.image} alt={prop.title} fill className="object-cover" sizes="360px" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <span className="absolute top-2 left-2 bg-[#1F0A10]/90 text-[#c5a880] text-[9px] font-extrabold px-2 py-0.5 rounded-md tracking-wide">
                            {prop.badge}
                          </span>
                        </div>
                        <div className="p-3">
                          <h5 className="font-bold text-[12px] text-[#1E293B] font-['Outfit',sans-serif] leading-tight">
                            {prop.title}
                          </h5>
                          <p className="text-[10px] text-[#c5a880] font-semibold mt-0.5 flex items-center gap-1">
                            <i className="fa-solid fa-location-dot text-[9px]" /> {prop.location}
                          </p>
                          <p className="text-[10px] text-stone-500 mt-1 leading-snug">{prop.description}</p>
                          <div className="flex gap-2 mt-2.5">
                            <button
                              onClick={() => {
                                setBPropertyHint(prop.title);
                                handleSend("Book Visit", "chip_book");
                              }}
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
                  <form
                    onSubmit={handleBookingSubmit}
                    className="bg-white rounded-xl p-4 border border-stone-200 shadow-md space-y-2.5"
                  >
                    <h4 className="text-[12px] font-bold text-[#1E293B] font-['Outfit',sans-serif]">
                      📅 Visit Details
                    </h4>
                    <input
                      required
                      type="text"
                      placeholder="Full Name *"
                      value={bName}
                      onChange={(e) => setBName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-[11px] outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]/30 transition"
                    />
                    <input
                      required
                      type="tel"
                      placeholder="Phone Number *"
                      value={bPhone}
                      onChange={(e) => setBPhone(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-[11px] outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]/30 transition"
                    />
                    <input
                      type="email"
                      placeholder="Email Address (optional)"
                      value={bEmail}
                      onChange={(e) => setBEmail(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-[11px] outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]/30 transition"
                    />
                    {bPropertyHint && (
                      <input
                        type="text"
                        readOnly
                        value={bPropertyHint}
                        className="w-full bg-stone-100 border border-stone-200 rounded-lg px-3 py-2 text-[11px] text-stone-500"
                      />
                    )}
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="date"
                        value={bDate}
                        onChange={(e) => setBDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="bg-stone-50 border border-stone-300 rounded-lg px-2 py-2 text-[11px] outline-none focus:border-[#c5a880] transition"
                      />
                      <select
                        value={bSlot}
                        onChange={(e) => setBSlot(e.target.value)}
                        className="bg-stone-50 border border-stone-300 rounded-lg px-2 py-2 text-[11px] outline-none focus:border-[#c5a880] transition"
                      >
                        <option>10:00 AM</option>
                        <option>12:00 PM</option>
                        <option>02:00 PM</option>
                        <option>04:00 PM</option>
                        <option>05:30 PM</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#1F0A10] hover:bg-[#3d1520] text-[#c5a880] font-extrabold py-2.5 rounded-lg text-[11px] transition-colors shadow-md cursor-pointer"
                    >
                      ✅ Confirm Site Visit
                    </button>
                  </form>
                )}

                {/* Lead Form Card */}
                {m.cardType === "lead_form" && (
                  <form
                    onSubmit={handleLeadSubmit}
                    className="bg-white rounded-xl p-4 border border-stone-200 shadow-md space-y-2.5"
                  >
                    <h4 className="text-[12px] font-bold text-[#1E293B] font-['Outfit',sans-serif]">
                      📝 Property Enquiry
                    </h4>
                    <input
                      required
                      type="text"
                      placeholder="Your Full Name *"
                      value={lName}
                      onChange={(e) => setLName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-[11px] outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]/30 transition"
                    />
                    <input
                      required
                      type="tel"
                      placeholder="Phone Number *"
                      value={lPhone}
                      onChange={(e) => setLPhone(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-[11px] outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]/30 transition"
                    />
                    <input
                      type="email"
                      placeholder="Email Address (optional)"
                      value={lEmail}
                      onChange={(e) => setLEmail(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-[11px] outline-none focus:border-[#c5a880] focus:ring-1 focus:ring-[#c5a880]/30 transition"
                    />
                    <select
                      value={lContactTime}
                      onChange={(e) => setLContactTime(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded-lg px-3 py-2 text-[11px] outline-none focus:border-[#c5a880] transition"
                    >
                      <option>Morning (9AM–12PM)</option>
                      <option>Afternoon (12PM–4PM)</option>
                      <option>Evening (4PM–7PM)</option>
                    </select>
                    <button
                      type="submit"
                      className="w-full bg-[#1F0A10] hover:bg-[#3d1520] text-[#c5a880] font-extrabold py-2.5 rounded-lg text-[11px] transition-colors shadow-md cursor-pointer"
                    >
                      📤 Submit Enquiry
                    </button>
                  </form>
                )}

                {/* Agent Handoff Card */}
                {m.cardType === "handoff" && (
                  <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-md space-y-2">
                    <a
                      href="https://wa.me/919688889420?text=Hi!%20I%20need%20help%20from%20a%20Vizhi%20property%20advisor"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-lg text-[11px] flex items-center justify-center gap-2.5 transition-colors shadow-sm"
                    >
                      <i className="fa-brands fa-whatsapp text-sm" /> Chat on WhatsApp
                    </a>
                    <a
                      href="tel:+919688889420"
                      className="w-full bg-[#1F0A10] hover:bg-[#3d1520] text-[#c5a880] font-bold py-2.5 px-4 rounded-lg text-[11px] flex items-center justify-center gap-2.5 transition-colors shadow-sm"
                    >
                      <i className="fa-solid fa-phone text-xs" /> Call: +91 96888 89420
                    </a>
                    <a
                      href="mailto:vizhiinfragen@gmail.com"
                      className="w-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold py-2.5 px-4 rounded-lg text-[11px] flex items-center justify-center gap-2.5 transition-colors"
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

                {/* Chips Suggestions */}
                {m.chips && (
                  <div className="flex flex-wrap gap-1.5">
                    {m.chips.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(c.label, c.action)}
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

        {/* Input Footer */}
        <div className="px-3 py-3 bg-white border-t border-stone-200 flex items-center gap-2 shrink-0 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder='Ask anything… e.g. "NRI property management", "DTCP plots"'
            className="flex-1 bg-[#faf8f5] border border-stone-300 rounded-full px-4 py-2 text-[11.5px] outline-none focus:border-[#c5a880] focus:ring-2 focus:ring-[#c5a880]/20 font-['Inter',sans-serif] transition"
          />
          <button
            onClick={() => handleSend()}
            disabled={isTyping || !input.trim()}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-[#1F0A10] to-[#3d1520] text-[#c5a880] hover:scale-105 flex items-center justify-center transition-transform shrink-0 shadow-md cursor-pointer border border-[#c5a880]/30 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
            aria-label="Send Message"
          >
            <i className="fa-solid fa-paper-plane text-xs" />
          </button>
        </div>
      </div>
    </>
  );
}
