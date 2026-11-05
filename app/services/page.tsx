import type { Metadata } from "next";
import ServiceHero from "@/components/service/ServiceHero";
import ServiceIntroSection from "@/components/service/ServiceIntroSection";
import ServicesCategoriesCarousel from "@/components/service/ServicesCategoriesCarousel";
import ServicesFilterShowcase from "@/components/service/ServicesFilterShowcase";
import ServicesTrustSection from "@/components/service/ServicesTrustSection";
import ServicesCTASection from "@/components/service/ServicesCTASection";

export const metadata: Metadata = {
  title: "Real Estate & Property Management Services in Coimbatore | Vizhi Infragen",
  description:
    "Land sales, property management, NRI property care, construction, valuation, approvals, rentals and corporate property solutions in Coimbatore.",
  keywords: [
    "Coimbatore real estate services",
    "NRI property management Coimbatore",
    "land sales Coimbatore",
    "building construction Coimbatore",
    "land approvals DTCP",
    "building valuation",
  ],
};

export default function ServicesPage() {
  return (
    <>
      <ServiceHero />
      <ServiceIntroSection />
      <ServicesCategoriesCarousel />
      <ServicesFilterShowcase />
      <ServicesTrustSection />
      <ServicesCTASection />
    </>
  );
}
