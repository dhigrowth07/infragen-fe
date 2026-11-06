// ── Vizhi Infragen Realtors — Central Site Configuration ──────────────────────
// All contact info, social links, and business details live here.
// Import from this file instead of hardcoding values across the codebase.

export const SITE_INFO = {
  name: "Vizhi Infragen Realtors LLP",
  shortName: "Vizhi Infragen Realtors",
  tagline: "Your Trusted Partner in Real Estate & Property Management in Coimbatore.",

  // ── Contact ────────────────────────────────────────────────────────────────
  phone1: "96888 89420",
  phone2: "97871 66889",
  phone1Raw: "9688889420",          // digits only, for tel: links
  phone2Raw: "9787166889",
  email: "admin@vizhiinfragenrealtors.com",

  // ── Address ────────────────────────────────────────────────────────────────
  address: "Shop No. 24, Suganthi Nagar, Bus Stand Complex, Sulur Old Bus Stand, Sulur, Coimbatore – 641402",
  addressShort: "Shop No.24, Suganthi Nagar, Sulur, Coimbatore – 641402",

  // ── Business Hours ─────────────────────────────────────────────────────────
  officeHours: "09:00 AM – 09:00 PM",
  officeHoursDays: "Monday to Sunday",

  // ── Social & Messaging Links ───────────────────────────────────────────────
  social: {
    whatsapp: "https://api.whatsapp.com/send/?phone=919688889420&text&type=phone_number&app_absent=0",
    whatsappDirect: "https://wa.me/919688889420",   // used for pre-filled message deep-links
    instagram: "https://www.instagram.com/vizhiinfragen_realestate",
    facebook: "https://www.facebook.com/share/1HLJxSh9q5/?mibextid=wwXIfr",
    // twitter and youtube: add real profile URLs once available
    twitter: "https://twitter.com",
    youtube: "https://youtube.com",
  },

  // ── Google Maps ────────────────────────────────────────────────────────────
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3543.9295631804443!2d77.12256657452008!3d11.025895354543762!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba855aa377e3a01%3A0xb056daed6b04dcc2!2sVizhi%20Infragen%20Realtors%20LLP!5e1!3m2!1sen!2sin!4v1793945680225!5m2!1sen!2sin",
  mapsLink: "https://maps.app.goo.gl/qcS47e1rifFwwA7a9",

  // ── Copyright ──────────────────────────────────────────────────────────────
  copyrightYear: "2026",
} as const;

// Helpers for common use-cases
export const whatsappLink = (message: string) =>
  `${SITE_INFO.social.whatsappDirect}?text=${encodeURIComponent(message)}`;

export const telLink = (raw: string) => `tel:${raw}`;
export const mailtoLink = (subject = "") =>
  `mailto:${SITE_INFO.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;

