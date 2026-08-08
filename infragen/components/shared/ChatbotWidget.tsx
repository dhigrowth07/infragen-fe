"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { propertiesData, PropertyItem } from "@/data/properties";
import { searchKnowledge, searchKnowledgeKeywordMode, parseFileMentions, splitTextIntoChunks } from "@/lib/ragKnowledge";
import { ChatMode, UploadedDocument, MessageItem, CardType, ChipItem, SessionMemory } from "@/lib/types";

// ── Mentions Catalogue for Autocomplete ───────────────────────────────────────

const MENTION_OPTIONS = [
  { tag: "@land", label: "Land & Plot Sales", icon: "fa-map-location-dot" },
  { tag: "@nri", label: "NRI Services & Remittance", icon: "fa-globe" },
  { tag: "@sulur", label: "Sulur Corridor Plots", icon: "fa-location-dot" },
  { tag: "@kalapatti", label: "Kalapatti IT Corridor", icon: "fa-location-dot" },
  { tag: "@pattanam", label: "Pattanam Residential Land", icon: "fa-location-dot" },
  { tag: "@neelambur", label: "Neelambur Commercial Zone", icon: "fa-location-dot" },
  { tag: "@dtcp", label: "DTCP & RERA Approvals", icon: "fa-file-contract" },
  { tag: "@properties", label: "Verified Property Listings", icon: "fa-house" },
  { tag: "@legal", label: "Patta & Legal Verification", icon: "fa-shield-halved" },
  { tag: "@construction", label: "Turnkey Building Construction", icon: "fa-helmet-safety" },
  { tag: "@valuation", label: "Bank & Market Valuation", icon: "fa-chart-line" },
  { tag: "@booking", label: "Schedule Site Visit", icon: "fa-calendar-check" },
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
  sources?: string[];
  memoryUpdates?: Partial<SessionMemory>;
}

function localAI(input: string, memory: SessionMemory, mode: ChatMode = "rag"): BotResponse {
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

  // Dedicated Keyword Search Mode Fallback
  if (mode === "keyword") {
    const kwRes = searchKnowledgeKeywordMode(input, 3);
    return {
      text: kwRes.text,
      sources: kwRes.sources,
      chips: [
        { icon: "fa-magnifying-glass", label: "Search Properties", action: "chip_search" },
        { icon: "fa-location-dot", label: "Filter Locations", action: "chip_locations" },
        { icon: "fa-calendar-check", label: "Book Site Visit", action: "chip_book" },
        { icon: "fa-headset", label: "Talk to Agent", action: "chip_agent" },
      ],
      memoryUpdates,
    };
  }

  // Greetings & Interactive Flow Init
  if (/\b(hi|hello|hey|good morning|start|namaste|menu|options|services|help)\b/.test(lo)) {
    return {
      text: `👋 <strong>Welcome to Vizhi Infragen Realtors AI Assistant!</strong><br/><br/>What kind of real estate service or property are you looking for in Coimbatore?<br/>Select a keyword category or location below:`,
      chips: [
        { icon: "fa-map-location-dot", label: "🏡 Land & Plots for Sale", action: "chip_search" },
        { icon: "fa-location-dot", label: "📍 Locations & Corridors", action: "chip_locations" },
        { icon: "fa-globe", label: "✈️ NRI Property Management", action: "chip_nri" },
        { icon: "fa-file-contract", label: "📜 DTCP, Patta & Approvals", action: "chip_faq" },
        { icon: "fa-helmet-safety", label: "🏗️ Building Construction", action: "chip_construction" },
        { icon: "fa-chart-line", label: "📊 Building Valuation", action: "chip_valuation" },
        { icon: "fa-calendar-check", label: "📅 Schedule Site Visit", action: "chip_book" },
        { icon: "fa-headset", label: "🙋 Contact Advisor", action: "chip_agent" },
      ],
      memoryUpdates,
    };
  }

  // Locations Guide Flow
  if (lo.includes("location") || lo.includes("area") || lo.includes("corridor")) {
    return {
      text: `📍 <strong>Coimbatore High-Growth Real Estate Corridors</strong><br/><br/>Which location would you like to explore?`,
      chips: [
        { icon: "fa-location-pin", label: "Pattanam Plots", action: "chip_loc_pattanam" },
        { icon: "fa-location-pin", label: "Sulur Airport Zone", action: "chip_loc_sulur" },
        { icon: "fa-location-pin", label: "Kalapatti IT Belt", action: "chip_loc_kalapatti" },
        { icon: "fa-location-pin", label: "Neelambur Commercial", action: "chip_loc_neelambur" },
        { icon: "fa-location-pin", label: "Sathy Road Belt", action: "chip_loc_sathy" },
        { icon: "fa-location-pin", label: "Avinashi Road Hub", action: "chip_loc_avinashi" },
        { icon: "fa-location-pin", label: "Trichy Road Corridor", action: "chip_loc_trichy" },
      ],
      memoryUpdates,
    };
  }

  // Specific Location Selection Trigger
  const targetLoc = memoryUpdates.location || (lo.includes("sulur") ? "Sulur" : lo.includes("kalapatti") ? "Kalapatti" : lo.includes("pattanam") ? "Pattanam" : lo.includes("neelambur") ? "Neelambur" : lo.includes("sathy") ? "Sathy Road" : lo.includes("avinashi") ? "Avinashi Road" : lo.includes("trichy") ? "Trichy Road" : "");
  if (targetLoc) {
    const matchedProps = propertiesData.filter((p) => p.location.toLowerCase().includes(targetLoc.toLowerCase()));
    const displayProps = matchedProps.length > 0 ? matchedProps : propertiesData.slice(0, 2);
    const ragLocationChunks = searchKnowledge(targetLoc, 2);

    const ragSnippet = ragLocationChunks.length > 0 ? ragLocationChunks[0].content.replace(/\n\n/g, "<br/>") : "";

    return {
      text: `📍 <strong>Real Estate & Properties in ${targetLoc}, Coimbatore</strong><br/><br/>${ragSnippet}<br/><br/><strong>Available Verified Listings:</strong>`,
      properties: displayProps,
      sources: ragLocationChunks.map((c) => c.title),
      chips: [
        { icon: "fa-calendar-check", label: `Book Visit in ${targetLoc}`, action: "chip_book" },
        { icon: "fa-map-location-dot", label: "View Other Locations", action: "chip_locations" },
        { icon: "fa-headset", label: "Talk to Advisor", action: "chip_agent" },
      ],
      memoryUpdates,
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

  // Property Search Listings Trigger
  if (/\b(show|find|list|view|search|available|listings)\b/.test(lo) && /\b(properties|plots|villas|sites|land|houses)\b/.test(lo)) {
    const results = propertiesData.slice(0, 3);
    return {
      text: `🏘️ <strong>Verified Properties Found in Coimbatore</strong>:<br/>Filter by location keyword or select below:`,
      properties: results,
      chips: [
        { icon: "fa-location-dot", label: "Filter by Location", action: "chip_locations" },
        { icon: "fa-calendar-plus", label: "Book Site Visit", action: "chip_book" },
        { icon: "fa-headset", label: "Talk to Advisor", action: "chip_agent" },
      ],
      memoryUpdates,
    };
  }

  // Primary RAG Knowledge Content Search (Exact keyword matching against 20+ company documents)
  const ragChunks = searchKnowledge(input, 3);
  if (ragChunks.length > 0) {
    const top = ragChunks[0];
    return {
      text: `📋 <strong>${top.title}</strong><br/><br/>${top.content.replace(/\n\n/g, "<br/><br/>").replace(/\n/g, "<br/>")}`,
      sources: ragChunks.map((c) => c.title),
      chips: [
        { icon: "fa-magnifying-glass", label: "Search Properties", action: "chip_search" },
        { icon: "fa-location-dot", label: "View Locations", action: "chip_locations" },
        { icon: "fa-calendar-check", label: "Book Site Visit", action: "chip_book" },
        { icon: "fa-headset", label: "Talk to Agent", action: "chip_agent" },
      ],
      memoryUpdates,
    };
  }

  return {
    text: `ℹ️ <strong>Vizhi Infragen Realtors LLP — Coimbatore</strong><br/><br/>We provide transparent real estate & property management services across Coimbatore (Pattanam, Sulur, Neelambur, Kalapatti, Sathy Road, Avinashi Road).`,
    chips: [
      { icon: "fa-magnifying-glass", label: "Search Properties", action: "chip_search" },
      { icon: "fa-globe", label: "NRI Services", action: "chip_nri" },
      { icon: "fa-headset", label: "Contact Agent", action: "chip_agent" },
    ],
    memoryUpdates,
  };
}

const CHIP_ROUTES: Record<string, { display: string; prompt: string }> = {
  chip_welcome: { display: "Main Menu", prompt: "hello" },
  chip_search: { display: "Search Properties", prompt: "show me land and plots for sale in Coimbatore" },
  chip_locations: { display: "Explore Locations", prompt: "which locations and growth corridors do you cover in Coimbatore?" },
  chip_buy: { display: "Buy Property", prompt: "tell me about land purchase assistance and buying plots in Coimbatore" },
  chip_sell: { display: "Sell Property", prompt: "I want to sell my property in Coimbatore" },
  chip_rent: { display: "Rent / Manage", prompt: "tell me about property management and rental services in Coimbatore" },
  chip_nri: { display: "NRI Services", prompt: "@nri tell me about dedicated NRI property management in Coimbatore" },
  chip_faq: { display: "FAQ & Legal", prompt: "@dtcp what are the frequently asked questions about real estate legal documents DTCP RERA in Coimbatore?" },
  chip_construction: { display: "Building Construction", prompt: "@construction tell me about turnkey building construction services in Coimbatore" },
  chip_valuation: { display: "Building Valuation", prompt: "@valuation tell me about building valuation reports for bank loans and taxation" },
  chip_book: { display: "Book Visit", prompt: "I want to schedule a site visit" },
  chip_agent: { display: "Contact Agent", prompt: "I want to talk to a property advisor" },

  // Location Chip Routing
  chip_loc_pattanam: { display: "Pattanam Plots", prompt: "@pattanam tell me about plots and real estate in Pattanam Coimbatore" },
  chip_loc_sulur: { display: "Sulur Corridor", prompt: "@sulur tell me about plots and investment land in Sulur Coimbatore" },
  chip_loc_kalapatti: { display: "Kalapatti IT Belt", prompt: "@kalapatti tell me about residential plots in Kalapatti Coimbatore" },
  chip_loc_neelambur: { display: "Neelambur Commercial", prompt: "@neelambur tell me about commercial land and warehousing in Neelambur Coimbatore" },
  chip_loc_sathy: { display: "Sathy Road Belt", prompt: "tell me about land and plots on Sathy Road Coimbatore" },
  chip_loc_avinashi: { display: "Avinashi Road Hub", prompt: "tell me about villa land and property on Avinashi Road Coimbatore" },
  chip_loc_trichy: { display: "Trichy Road Corridor", prompt: "tell me about investment plots on Trichy Road Coimbatore" },

  chip_cancel: { display: "Cancel Booking", prompt: "" },
};

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const [visible, setVisible] = useState(false);
  const [mode, setMode] = useState<ChatMode>("rag");
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [apiHistory, setApiHistory] = useState<Array<{ role: "user" | "model"; content: string }>>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [memory, setMemory] = useState<SessionMemory>({});

  // Mentions autocomplete state
  const [showMentionMenu, setShowMentionMenu] = useState(false);
  const [mentionFilter, setMentionFilter] = useState("");

  // Custom Document Upload state (inspired by rag-chat-bot-main)
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDocument[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Booking & Lead state
  const [bName, setBName] = useState("");
  const [bPhone, setBPhone] = useState("");
  const [bEmail, setBEmail] = useState("");
  const [bDate, setBDate] = useState("");
  const [bSlot, setBSlot] = useState("10:00 AM");
  const [bPropertyHint, setBPropertyHint] = useState("");

  const [lastBooking, setLastBooking] = useState<{
    name: string;
    phone: string;
    date: string;
    slot: string;
    property: string;
  } | null>(null);

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
    (text: string, chips?: ChipItem[], properties?: PropertyItem[], cardType?: CardType, sources?: string[]) => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + Math.random(), sender: "bot", text, time: getNow(), chips, properties, cardType, sources, mode },
      ]);
    },
    [mode]
  );

  const addUserMessage = useCallback((text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now() + Math.random(), sender: "user", text, time: getNow() },
    ]);
  }, []);

  // Handle Document Upload (Inspired by rag-chat-bot-main)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = (event.target?.result as string) || "";
      const chunks = splitTextIntoChunks(text);
      const newDoc: UploadedDocument = {
        id: Date.now().toString(),
        fileName: file.name,
        chunks,
        uploadedAt: new Date().toLocaleTimeString(),
      };
      setUploadedDocs((prev) => [...prev, newDoc]);
      setShowUploadModal(false);
      addBotMessage(
        `📄 <strong>Uploaded Document Added!</strong><br/>File: <strong>${file.name}</strong> (${chunks.length} chunks extracted).<br/>You can now target it in chat using <code>@${file.name.replace(/\.[^/.]+$/, "")}</code>!`,
        [
          { icon: "fa-magnifying-glass", label: `Ask about ${file.name}`, action: `chip_doc_${newDoc.id}` },
        ]
      );
    };
    reader.readAsText(file);
  };

  // API Call with Streaming support & mode handling
  const askGemini = useCallback(
    async (userText: string, currentHistory: Array<{ role: "user" | "model"; content: string }>, currentMemory: SessionMemory): Promise<void> => {
      try {
        const res = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: [...currentHistory, { role: "user", content: userText }],
            sessionMemory: currentMemory,
            mode,
          }),
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();

        if (data.type === "error") throw new Error(data.message);

        if (data.type === "tool_call") {
          const toolResult = localAI(userText, currentMemory, mode);
          if (toolResult.memoryUpdates) setMemory((p) => ({ ...p, ...toolResult.memoryUpdates }));
          if (toolResult.cardType === "handoff" && !toolResult.text) {
            addBotMessage("🙋 <strong>Connect with a Vizhi Property Advisor</strong><br/>Our Coimbatore team is available Mon–Sat, 9AM–7PM.", undefined, undefined, "handoff");
          } else {
            addBotMessage(toolResult.text, toolResult.chips, toolResult.properties, toolResult.cardType, toolResult.sources);
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
          addBotMessage(
            html,
            [
              { icon: "fa-[#c5a880]", label: "Search Properties", action: "chip_search" },
              { icon: "fa-location-dot", label: "View Locations", action: "chip_locations" },
              { icon: "fa-calendar-check", label: "Book Site Visit", action: "chip_book" },
              { icon: "fa-headset", label: "Talk to Agent", action: "chip_agent" },
            ],
            undefined,
            undefined,
            data.sources
          );
          setApiHistory((prev) => [...prev, { role: "user", content: userText }, { role: "model", content: data.text }]);
          return;
        }
      } catch {
        // Fallback to local AI engine on error
      }

      setIsTyping(false);
      const localResponse = localAI(userText, currentMemory, mode);
      if (localResponse.memoryUpdates) setMemory((p) => ({ ...p, ...localResponse.memoryUpdates }));
      if (localResponse.cardType === "handoff" && !localResponse.text) {
        addBotMessage("🙋 <strong>Connect with a Vizhi Property Advisor</strong><br/>Our Coimbatore team is available Mon–Sat, 9AM–7PM.", undefined, undefined, "handoff");
      } else {
        addBotMessage(localResponse.text, localResponse.chips, localResponse.properties, localResponse.cardType, localResponse.sources);
      }
      setApiHistory((prev) => [...prev, { role: "user", content: userText }]);
    },
    [addBotMessage, mode]
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
    window.open(`https://wa.me/919688889420?text=${encodeURIComponent(waMsg)}`, "_blank");

    setLastBooking(null);
    addBotMessage(
      `❌ <strong>Booking Cancelled</strong><br/>Cancelled visit for <strong>${name}</strong> on ${date} (${slot}).<br/>WhatsApp update sent to property team.`,
      [{ icon: "fa-calendar-plus", label: "Book New Visit", action: "chip_book" }]
    );
  }, [lastBooking, addBotMessage]);

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

      if (chipAction === "chip_book") {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBotMessage(`📅 <strong>Schedule a Site Visit</strong><br/>Please fill in your details below:`, undefined, undefined, "booking_form");
        }, 300);
        return;
      }

      if (chipAction === "chip_agent") {
        setIsTyping(true);
        setTimeout(() => {
          setIsTyping(false);
          addBotMessage("🙋 <strong>Connect with a Vizhi Property Advisor</strong><br/>Our Coimbatore team is available Mon–Sat, 9AM–7PM.", undefined, undefined, "handoff");
        }, 300);
        return;
      }

      setIsTyping(true);
      askGemini(prompt, apiHistory, memory).finally(() => setIsTyping(false));
    },
    [input, memory, apiHistory, addUserMessage, addBotMessage, askGemini, handleBookingCancel]
  );

  const openChatFresh = useCallback(() => {
    setIsOpen(true);
    setIsMinimized(false);
    setHasUnread(false);
    setMessages([]);
    setApiHistory([]);
    setMemory({});
    setTimeout(() => {
      addBotMessage(
        `👋 <strong>Welcome to Vizhi Infragen Realtors AI!</strong><br/><br/>I am your 24/7 Coimbatore real estate assistant. What kind of property or service are you interested in?<br/>Choose an option or type a query using <code>@mentions</code>:`,
        [
          { icon: "fa-map-location-dot", label: "🏡 Land & Plots for Sale", action: "chip_search" },
          { icon: "fa-location-dot", label: "📍 Explore Locations", action: "chip_locations" },
          { icon: "fa-globe", label: "✈️ NRI Services", action: "chip_nri" },
          { icon: "fa-file-contract", label: "📜 DTCP & Legal FAQs", action: "chip_faq" },
          { icon: "fa-calendar-check", label: "📅 Book Site Visit", action: "chip_book" },
          { icon: "fa-headset", label: "🙋 Contact Agent", action: "chip_agent" },
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

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bName || !bPhone) return;

    const name = bName;
    const phone = bPhone;
    const date = bDate || "Next available slot";
    const slot = bSlot;
    const property = bPropertyHint || memory.location || "Coimbatore Property";

    setLastBooking({ name, phone, date, slot, property });
    const waMsg = `⚡ New Site Visit Booked!\n\nClient: ${name}\nPhone: ${phone}\nDate: ${date} (${slot})\nProperty: ${property}`;
    window.open(`https://wa.me/919688889420?text=${encodeURIComponent(waMsg)}`, "_blank");

    fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, contactTime: `${date} (${slot})`, type: "Site Visit Booking", propertyInterest: property }),
    }).catch(() => {});

    addBotMessage(
      `⚡ <strong>Booking Confirmed & WhatsApp Alert Sent!</strong><br/><br/>🎉 Site Visit Confirmed for <strong>${name}</strong>!<br/>Date & Time: ${date} (${slot})<br/>Property: ${property}`,
      [{ icon: "fa-xmark", label: "Cancel Booking", action: "chip_cancel" }]
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
      </button>

      {/* Minimized Pill */}
      {isMinimized && (
        <button
          onClick={toggleChat}
          className="fixed bottom-[88px] right-6 z-[9997] bg-gradient-to-r from-[#1F0A10] to-[#3d1520] border border-[#c5a880]/50 text-white text-[11px] font-semibold px-4 py-2 rounded-full shadow-xl flex items-center gap-2.5 cursor-pointer hover:border-[#c5a880] transition-all duration-200"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
          <span className="text-[#c5a880] font-bold">Vizhi AI ({mode === "rag" ? "RAG Mode" : "Keyword Mode"})</span>
          <i className="fa-solid fa-chevron-up text-[9px] text-[#c5a880]" />
        </button>
      )}

      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-6 z-[9998] w-[430px] max-w-[calc(100vw-20px)] flex flex-col bg-white rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.22)] border border-stone-200/60 overflow-hidden transition-all duration-300 origin-bottom-right ${
          isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-90 pointer-events-none"
        }`}
        style={{ height: "min(650px, calc(100vh - 110px))" }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1A0810] via-[#2D1015] to-[#3d1520] px-4 py-3 flex items-center justify-between shrink-0 shadow-lg border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="relative shrink-0">
              <div className="w-10 h-10 rounded-full bg-[#c5a880]/15 border-2 border-[#c5a880]/70 flex items-center justify-center text-[#c5a880]">
                <i className="fa-solid fa-robot text-base" />
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
                Online — RAG & Keyword Intelligent Bot
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Document Upload Button */}
            <button
              onClick={() => setShowUploadModal(true)}
              title="Upload custom document (PDF/TXT/DOCX)"
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-[#c5a880]/30 text-[#c5a880] flex items-center justify-center text-xs transition-all cursor-pointer"
            >
              <i className="fa-solid fa-paperclip" />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-white/10 hover:bg-red-500/80 text-white/70 hover:text-white flex items-center justify-center text-xs transition-all cursor-pointer"
            >
              <i className="fa-solid fa-xmark" />
            </button>
          </div>
        </div>

        {/* Dual Mode Switcher Bar */}
        <div className="bg-[#15060A] px-3 py-1.5 flex items-center justify-between border-b border-white/10 shrink-0">
          <span className="text-[10px] text-white/60 font-medium">Search Engine Mode:</span>
          <div className="flex bg-black/40 p-0.5 rounded-lg border border-white/15">
            <button
              onClick={() => setMode("rag")}
              className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                mode === "rag" ? "bg-[#c5a880] text-[#1F0A10] shadow-sm" : "text-white/70 hover:text-white"
              }`}
            >
              ⚡ AI RAG Mode
            </button>
            <button
              onClick={() => setMode("keyword")}
              className={`px-2.5 py-0.5 rounded-md text-[10px] font-bold transition-all ${
                mode === "keyword" ? "bg-[#c5a880] text-[#1F0A10] shadow-sm" : "text-white/70 hover:text-white"
              }`}
            >
              🔍 Keyword Mode
            </button>
          </div>
        </div>

        {/* Quick Actions Scroll Bar */}
        <div className="bg-[#1A0810] px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto shrink-0 scrollbar-none border-b border-white/10">
          {[
            { label: "Search Land", action: "chip_search" },
            { label: "Locations", action: "chip_locations" },
            { label: "NRI Care", action: "chip_nri" },
            { label: "Approvals", action: "chip_faq" },
            { label: "Construction", action: "chip_construction" },
            { label: "Valuation", action: "chip_valuation" },
            { label: "Book Visit", action: "chip_book" },
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

        {/* Upload Document Modal */}
        {showUploadModal && (
          <div className="p-3 bg-amber-50 border-b border-amber-200 text-stone-800 text-[11px] flex items-center justify-between shrink-0">
            <div>
              <p className="font-bold text-amber-900">📄 Upload Document (PDF / TXT)</p>
              <p className="text-[10px] text-stone-600">Upload custom document to query with <code>@mentions</code></p>
            </div>
            <div className="flex gap-2">
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept=".txt,.pdf,.docx" className="hidden" />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#1F0A10] text-[#c5a880] text-[10px] font-bold px-2.5 py-1 rounded cursor-pointer"
              >
                Browse File
              </button>
              <button onClick={() => setShowUploadModal(false)} className="text-stone-400 hover:text-stone-700">
                <i className="fa-solid fa-xmark text-xs" />
              </button>
            </div>
          </div>
        )}

        {/* Uploaded Documents Badges */}
        {uploadedDocs.length > 0 && (
          <div className="bg-stone-100 px-3 py-1.5 flex items-center gap-1.5 overflow-x-auto shrink-0 border-b border-stone-200 text-[10px]">
            <span className="font-bold text-stone-600 shrink-0">Files:</span>
            {uploadedDocs.map((doc) => (
              <span key={doc.id} className="bg-stone-200 text-stone-800 px-2 py-0.5 rounded-full font-medium shrink-0 flex items-center gap-1">
                <i className="fa-solid fa-file-text text-[9px] text-[#c5a880]" /> @{doc.fileName.replace(/\.[^/.]+$/, "")}
              </span>
            ))}
          </div>
        )}

        {/* Messages List */}
        <div className="flex-1 overflow-y-auto p-3.5 bg-gradient-to-b from-[#faf7f4] to-[#f5f0ea] space-y-3.5 font-['Inter',sans-serif]">
          {messages.map((m) => (
            <div key={m.id} className={`flex items-end gap-2 ${m.sender === "user" ? "flex-row-reverse" : ""}`}>
              {m.sender === "bot" && (
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1F0A10] to-[#3d1520] border border-[#c5a880]/60 flex items-center justify-center text-[11px] text-[#c5a880] shrink-0 shadow-md">
                  <i className="fa-solid fa-robot" />
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

                {/* Sources Attribution Badge (Inspired by rag-chat-bot-main) */}
                {m.sources && m.sources.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-0.5">
                    {m.sources.map((src, idx) => (
                      <span key={idx} className="text-[9px] bg-stone-200/80 text-stone-700 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 border border-stone-300/50">
                        <i className="fa-solid fa-book-bookmark text-[8px] text-[#c5a880]" />
                        {src.length > 35 ? src.slice(0, 35) + "…" : src}
                      </span>
                    ))}
                  </div>
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
                              href={`https://wa.me/919688889420?text=Hi!%20I'm%20interested%20in%20${encodeURIComponent(prop.title)}`}
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
                    <h4 className="text-[11.5px] font-bold text-[#1E293B]">📅 Schedule Site Visit</h4>
                    <input
                      required
                      type="text"
                      placeholder="Full Name *"
                      value={bName}
                      onChange={(e) => setBName(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded px-2.5 py-1.5 text-[11px] outline-none"
                    />
                    <input
                      required
                      type="tel"
                      placeholder="Phone Number *"
                      value={bPhone}
                      onChange={(e) => setBPhone(e.target.value)}
                      className="w-full bg-stone-50 border border-stone-300 rounded px-2.5 py-1.5 text-[11px] outline-none"
                    />
                    <div className="grid grid-cols-2 gap-1.5">
                      <input
                        type="date"
                        value={bDate}
                        onChange={(e) => setBDate(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="bg-stone-50 border border-stone-300 rounded px-2 py-1.5 text-[10px] outline-none"
                      />
                      <select value={bSlot} onChange={(e) => setBSlot(e.target.value)} className="bg-stone-50 border border-stone-300 rounded px-2 py-1.5 text-[10px]">
                        <option>10:00 AM</option>
                        <option>12:00 PM</option>
                        <option>04:00 PM</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full bg-[#1F0A10] text-[#c5a880] font-extrabold py-2 rounded text-[11px] cursor-pointer">
                      ✅ Confirm Booking
                    </button>
                  </form>
                )}

                {/* Handoff Card */}
                {m.cardType === "handoff" && (
                  <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-md space-y-1.5">
                    <a
                      href="https://wa.me/919688889420?text=Hi!%20I%20need%20help%20from%20a%20Vizhi%20property%20advisor"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-emerald-600 text-white font-bold py-2 px-3 rounded text-[11px] flex items-center justify-center gap-2"
                    >
                      <i className="fa-brands fa-whatsapp" /> Chat on WhatsApp
                    </a>
                    <a href="tel:+919688889420" className="w-full bg-[#1F0A10] text-[#c5a880] font-bold py-2 px-3 rounded text-[11px] flex items-center justify-center gap-2">
                      <i className="fa-solid fa-phone" /> Call: +91 96888 89420
                    </a>
                  </div>
                )}

                {/* Timestamp */}
                <span className="text-[8.5px] text-stone-400 block text-right">{m.time}</span>

                {/* Chips */}
                {m.chips && (
                  <div className="flex flex-wrap gap-1">
                    {m.chips.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(c.label, c.action)}
                        className="px-2.5 py-1 rounded-full text-[10px] border border-[#c5a880]/60 text-[#3d1520] bg-[#c5a880]/12 hover:bg-[#c5a880] hover:text-[#1F0A10] font-medium transition cursor-pointer"
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex items-end gap-2">
              <div className="w-7 h-7 rounded-full bg-[#1F0A10] border border-[#c5a880]/60 text-[#c5a880] flex items-center justify-center text-[11px] shrink-0">
                <i className="fa-solid fa-robot" />
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
                <span className="font-bold text-[#c5a880]">{opt.tag}</span>
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
            placeholder={mode === "rag" ? 'Type question or @tag (e.g. "@sulur", "@nri")…' : 'Type keywords (e.g. "Sulur plots", "DTCP")…'}
            className="flex-1 bg-[#faf8f5] border border-stone-300 rounded-full px-3.5 py-1.5 text-[11.5px] outline-none focus:border-[#c5a880]"
          />
          <button
            onClick={() => handleSend()}
            disabled={isTyping || !input.trim()}
            className="w-8 h-8 rounded-full bg-[#1F0A10] text-[#c5a880] hover:scale-105 flex items-center justify-center transition shrink-0 border border-[#c5a880]/30 disabled:opacity-40"
          >
            <i className="fa-solid fa-paper-plane text-xs" />
          </button>
        </div>
      </div>
    </>
  );
}
