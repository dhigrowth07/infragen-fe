'use client'

import React from 'react'
import type { PublicProperty } from '@/lib/types/property.types'
import PropertyEnquiryForm from './PropertyEnquiryForm'
import FeaturedPropertiesWidget from './FeaturedPropertiesWidget'
import ScheduleTourCard from './ScheduleTourCard'

export interface PropertyEnquirySidebarProps {
  property: PublicProperty
  featuredProperties?: PublicProperty[]
  className?: string
}

/**
 * Sticky Property Lead Enquiry Sidebar (Phase 7 Orchestrator)
 * Strictly matching reference-ui/property - details - page.png:
 * 1. Property Lead Enquiry Form (Phase 7.1)
 * 2. Featured Properties Mini Cards (Phase 7.3 Sidebar)
 * 3. Schedule A Tour Widget (Phase 7.2)
 */
export default function PropertyEnquirySidebar({
  property,
  featuredProperties = [],
  className = '',
}: PropertyEnquirySidebarProps) {
  return (
    <div className={`flex flex-col gap-6 sm:gap-8 ${className}`} id="property-enquiry-sidebar">
      {/* 1. Property Inbound Lead Enquiry Form (Phase 7.1) */}
      <PropertyEnquiryForm property={property} />

      {/* 2. Featured Properties Mini Cards (Phase 7.3 Sidebar) */}
      {featuredProperties.length > 0 && (
        <FeaturedPropertiesWidget properties={featuredProperties} />
      )}

      {/* 3. Schedule A Tour Widget (Phase 7.2) */}
      <ScheduleTourCard property={property} />
    </div>
  )
}
