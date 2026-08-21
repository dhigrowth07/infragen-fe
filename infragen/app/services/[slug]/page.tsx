import type { Metadata } from "next";
import { landSalesDetailData } from "@/data/landSalesDetailData";
import { purchaseAssistanceDetailData } from "@/data/purchaseAssistanceDetailData";
import { propertyManagementDetailData } from "@/data/propertyManagementDetailData";
import { nriManagementDetailData } from "@/data/nriManagementDetailData";
import { constructionDetailData } from "@/data/constructionDetailData";
import { valuationDetailData } from "@/data/valuationDetailData";
import { approvalsDetailData } from "@/data/approvalsDetailData";
import { conversionDetailData } from "@/data/conversionDetailData";
import { rentalsDetailData } from "@/data/rentalsDetailData";
import { warehouseDetailData } from "@/data/warehouseDetailData";
import LandSalesHero from "@/components/service-detail/LandSalesHero";
import PremierLandDeskSection from "@/components/service-detail/PremierLandDeskSection";
import WhyChooseLandSalesSection from "@/components/service-detail/WhyChooseLandSalesSection";
import LandTypesGridSection from "@/components/service-detail/LandTypesGridSection";
import TrustworthinessSliderSection from "@/components/service-detail/TrustworthinessSliderSection";
import HowToBuyProcessSection from "@/components/service-detail/HowToBuyProcessSection";
import LandSalesCTASection from "@/components/service-detail/LandSalesCTASection";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return [
    { slug: "land-sales" },
    { slug: "purchase-assistance" },
    { slug: "property-management" },
    { slug: "nri-management" },
    { slug: "construction" },
    { slug: "valuation" },
    { slug: "approvals" },
    { slug: "conversion" },
    { slug: "rentals" },
    { slug: "warehouse" },
  ];
}

function getServiceData(slug: string) {
  switch (slug) {
    case "warehouse":
      return warehouseDetailData;
    case "rentals":
      return rentalsDetailData;
    case "conversion":
      return conversionDetailData;
    case "approvals":
      return approvalsDetailData;
    case "valuation":
      return valuationDetailData;
    case "construction":
      return constructionDetailData;
    case "nri-management":
      return nriManagementDetailData;
    case "property-management":
      return propertyManagementDetailData;
    case "purchase-assistance":
      return purchaseAssistanceDetailData;
    case "land-sales":
    default:
      return landSalesDetailData;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const data = getServiceData(slug);

  return {
    title: data.meta.title,
    description: data.meta.description,
    keywords: data.meta.keywords,
  };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const pageData = getServiceData(slug);

  return (
    <main className="w-full overflow-x-hidden">
      <LandSalesHero data={pageData} />
      <PremierLandDeskSection data={pageData} />
      <WhyChooseLandSalesSection data={pageData} />
      <LandTypesGridSection data={pageData} />
      <TrustworthinessSliderSection data={pageData} />
      <HowToBuyProcessSection data={pageData} />
      <LandSalesCTASection data={pageData} />
    </main>
  );
}
