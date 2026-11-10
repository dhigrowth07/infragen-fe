'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Bed, Bath, Maximize2 } from 'lucide-react'
import type { PublicProperty } from '@/lib/types/property.types'
import {
  formatPropertyPrice,
  formatArea,
  extractBedrooms,
  extractBathrooms,
  getPrimaryPropertyImage,
} from '@/lib/formatters'

export interface FeaturedPropertiesWidgetProps {
  properties: PublicProperty[]
  className?: string
}

function MiniFeaturedCard({ property }: { property: PublicProperty }) {
  const [imageSrc, setImageSrc] = useState<string>(() =>
    getPrimaryPropertyImage(property)
  )

  const bedrooms = extractBedrooms(property)
  const bathrooms = extractBathrooms(property)
  const builtUpArea =
    property.super_built_up_area || property.carpet_area || property.lot_size || null

  return (
    <Link
      href={`/properties/${encodeURIComponent(property.slug)}`}
      className="group block rounded-xl overflow-hidden border border-stone-200/80 hover:border-stone-400 bg-white shadow-xs transition-all duration-300"
    >
      {/* 1. Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
        <Image
          src={imageSrc}
          alt={property.name}
          fill
          sizes="(max-width: 640px) 100vw, 360px"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => {
            setImageSrc(
              property.property_type === 'LAND'
                ? '/assets/images/land-hero-img.png'
                : '/assets/images/building-hero-img.png'
            )
          }}
        />
      </div>

      {/* 2. Body Details */}
      <div className="p-4">
        <h4 className="font-bold text-stone-900 text-sm group-hover:text-[#169b91] transition-colors truncate">
          {property.name}
        </h4>
        <p className="text-xs text-stone-500 truncate mt-0.5 mb-3">
          {property.location
            ? `${property.location}, ${property.city || ''}`
            : property.description || property.city || 'Prime Location'}
        </p>

        {/* Quick Specs Row */}
        <div className="flex items-center gap-4 text-xs text-stone-600 pb-3 border-b border-stone-100">
          <div className="flex items-center gap-1">
            <Bed className="w-3.5 h-3.5 text-stone-400" />
            <span>{bedrooms ?? 2}</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath className="w-3.5 h-3.5 text-stone-400" />
            <span>{bathrooms ?? 2}</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize2 className="w-3.5 h-3.5 text-stone-400" />
            <span>
              {builtUpArea ? formatArea(builtUpArea, property.area_unit || 'sq.ft') : '—'}
            </span>
          </div>
        </div>

        {/* Footer: For Sale/Rent on Left, Price on Right */}
        <div className="pt-2.5 flex items-center justify-between text-xs">
          <span className="text-stone-500 font-semibold">For Sale</span>
          <span className="font-extrabold text-[#169b91]">
            {formatPropertyPrice(property.price, property.currency)}
          </span>
        </div>
      </div>
    </Link>
  )
}

/**
 * Mini Sidebar Cards for "Featured Properties" (Phase 7.3)
 * Strictly matching `reference-ui/property - details - page.png`:
 * - Up to 2 featured property cards stacked vertically
 * - Image, title, location snippet, specs icons, and price
 */
export default function FeaturedPropertiesWidget({
  properties,
  className = '',
}: FeaturedPropertiesWidgetProps) {
  if (!properties || properties.length === 0) return null

  return (
    <div
      className={`bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-7 ${className}`}
      id="featured-properties-sidebar-widget"
    >
      <h3 className="text-base sm:text-lg font-bold text-stone-900 pb-3 border-b border-stone-100">
        Featured Properties
      </h3>

      <div className="mt-4 space-y-4">
        {properties.slice(0, 2).map((property) => (
          <MiniFeaturedCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  )
}

