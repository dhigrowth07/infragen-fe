"use client";

import React, { useEffect } from "react";
import AboutHero from "@/components/about/AboutHero";
import WhoWeAreSection from "@/components/about/WhoWeAreSection";
import OurStorySection from "@/components/about/OurStorySection";
import VisionMissionSection from "@/components/about/VisionMissionSection";
import WhatWeDoSection from "@/components/about/WhatWeDoSection";
import CoreValuesSection from "@/components/about/CoreValuesSection";
import WhyClientsTrustSection from "@/components/about/WhyClientsTrustSection";

export default function AboutPage() {
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
      <AboutHero />
      <WhoWeAreSection />
      <OurStorySection />
      <VisionMissionSection />
      <WhatWeDoSection />
      <CoreValuesSection />
      <WhyClientsTrustSection />
    </div>
  );
}
