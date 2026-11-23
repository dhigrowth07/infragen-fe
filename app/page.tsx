"use client";

import React, { useEffect } from "react";
import HeroSection from "@/components/home/HeroSection";
import StatsCounterBar from "@/components/home/StatsCounterBar";
import AboutSection from "@/components/home/AboutSection";
import ProcessSection from "@/components/home/ProcessSection";
import OurProjectsSection from "@/components/home/OurProjectsSection";
import ProjectsSection from "@/components/home/ProjectsSection";
import WhyTrustSection from "@/components/home/WhyTrustSection";
import ServicesSection from "@/components/home/ServicesSection";
import ContactEnquirySection from "@/components/home/ContactEnquirySection";

export default function HomePage() {
  useEffect(() => {
    // Scroll Reveal Observer for elements with reveal classes
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
    <>
      <HeroSection />
      <StatsCounterBar />
      <ProcessSection />
      <OurProjectsSection />
      <ProjectsSection />
      <WhyTrustSection />
      <AboutSection />
      <ServicesSection />
      <ContactEnquirySection />
    </>
  );
}
