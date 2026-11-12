'use client'

import React from 'react'
import type { PublicProperty } from '@/lib/types/property.types'
import PropertyDetailHero from './PropertyDetailHero'
import PropertyQuickMetrics from './PropertyQuickMetrics'
import PropertyDescription from './PropertyDescription'
import PropertySpecificationsTable from './PropertySpecificationsTable'
import PropertyAmenities from './PropertyAmenities'
import PropertyFloorPlanViewer from './PropertyFloorPlanViewer'
import PropertyVideoPlayer from './PropertyVideoPlayer'
import NearbyAmenitiesRadar from './NearbyAmenitiesRadar'
import PropertyEnquirySidebar from './PropertyEnquirySidebar'
import PropertySimilarSection from './PropertySimilarSection'

export interface PropertyDetailClientProps {
  property: PublicProperty
  similarProperties?: PublicProperty[]
  featuredProperties?: PublicProperty[]
}

/**
 * Property Details Main Client Container
 * Integrates Phase 5 components into a unified responsive layout
 * strictly adhering to reference-ui/property - details - page.png.
 */
export default function PropertyDetailClient({
  property,
  similarProperties = [],
  featuredProperties = [],
}: PropertyDetailClientProps) {
  return (
    <div className="bg-[#fcfbf9] min-h-screen">
      {/* 1. Hero Panoramic Gallery & Top Banner (Phase 5.2) */}
      <PropertyDetailHero property={property} />

      {/* 2. Main Content Body with Metrics & 2-Column Grid */}
      <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-16 xl:px-20 py-8 sm:py-10">
        {/* Quick Spec Metric Bar (Phase 5.3 - aligned without negative margin overlap) */}
        <div className="mb-8 sm:mb-10">
          <PropertyQuickMetrics property={property} />
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          {/* Left Column: Details, Specifications, Plans, Video */}
          <main className="lg:col-span-8 flex flex-col gap-8 sm:gap-10">
            {/* Property Narrative & Description Card (Phase 5.4) */}
            <PropertyDescription property={property} />

            {/* Dynamic Specifications Grid (Phase 5.5) */}
            <PropertySpecificationsTable property={property} />

            {/* Community Amenities & Facilities (Pool, Gym, Lift, etc.) */}
            <PropertyAmenities property={property} />

            {/* Architectural Floor Plans Section (Phase 5.6) */}
            <PropertyFloorPlanViewer property={property} />

            {/* Property Video Walkthrough Section (Phase 5.7) */}
            <PropertyVideoPlayer property={property} />

            {/* Interactive 5KM Proximity Radar & Map Landmarks (Phase 6.1) */}
            <NearbyAmenitiesRadar property={property} />
          </main>

          {/* Right Column: Sticky Lead Capture & Tour Booking */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24">
            <PropertyEnquirySidebar
              property={property}
              featuredProperties={featuredProperties}
            />
          </aside>
        </div>
      </div>

      {/* 3. Similar Properties Recommendation Carousel/Grid */}
      <PropertySimilarSection properties={similarProperties} />
    </div>
  )
}

