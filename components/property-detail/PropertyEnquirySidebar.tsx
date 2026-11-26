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
 * 1. Property Lead Enquiry Form (Phase 7.1)
 * 2. Schedule A Tour Widget (Phase 7.2)
 * 3. Featured Properties Mini Cards (Phase 7.3 Sidebar)
 */
export default function PropertyEnquirySidebar({
  property,
  featuredProperties = [],
  className = '',
}: PropertyEnquirySidebarProps) {
  return (
    <div className={`flex flex-col gap-6 sm:gap-8 ${className}`} id="property-enquiry-sidebar">
      {/* 1. Property Inbound Lead Enquiry Form (Phase 7.1) */}
      <PropertyEnquiryForm property={property} className="order-1 lg:order-1" />

      {/* 2. Schedule Tour Widget: Mobile order-2 (directly after enquiry form); Desktop lg:order-3 */}
      <ScheduleTourCard property={property} className="order-2 lg:order-3" />

      {/* 3. Featured Properties Mini Cards: Mobile order-3; Desktop lg:order-2 (between enquiry form and schedule tour) */}
      {featuredProperties.length > 0 && (
        <FeaturedPropertiesWidget
          properties={featuredProperties}
          className="order-3 lg:order-2"
        />
      )}
    </div>
  )
}
