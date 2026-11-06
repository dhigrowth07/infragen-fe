"use client";

import React, { useEffect } from "react";
import ContactHero from "@/components/contact/ContactHero";
import ContactFormSection from "@/components/contact/ContactFormSection";
import OtherWaysToConnect from "@/components/contact/OtherWaysToConnect";
import OfficeMapSection from "@/components/contact/OfficeMapSection";
import ContactFaqSection from "@/components/contact/ContactFaqSection";
import ContactCtaBanner from "@/components/contact/ContactCtaBanner";

export default function ContactPage() {
  useEffect(() => {
    // Scroll Reveal Observer
    const revealElements = document.querySelectorAll(
      ".reveal, .reveal-up, .reveal-slide-up, .reveal-slide-left, .reveal-slide-right, .reveal-scale"
    );

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFBF7] text-[#1E293B]">
      <ContactHero />
      <ContactFormSection />
      <OtherWaysToConnect />
      <OfficeMapSection />
      <ContactFaqSection />
      <ContactCtaBanner />
    </div>
  );
}
