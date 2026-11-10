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

export interface PropertyCardBuildingProps {
  property: PublicProperty
  className?: string
  priority?: boolean
}

/**
 * Building Property Card Primitive
 * Strictly matching reference-ui/property - building - page.png:
 * - 16:10 image ratio with zoom on hover
 * - Badges: Featured (purple top-left) and PID (blue top-right)
 * - 1-line bold heading with brand color hover transition
 * - Large bold blue price and purple Negotiation badge
 * - 2-line description clamp
 * - Bottom specs bar with Beds, Baths, and sq.ft
 * - Clickable navigation to /properties/[slug]
 */
export default function PropertyCardBuilding({
  property,
  className = '',
  priority = false,
}: PropertyCardBuildingProps) {
  const [imageSrc, setImageSrc] = useState<string>(() =>
    getPrimaryPropertyImage(property)
  )

  const bedrooms = extractBedrooms(property)
  const bathrooms = extractBathrooms(property)
  const builtUpArea =
    property.super_built_up_area || property.carpet_area || null

  const displayPid = property.pid?.startsWith('ID:')
    ? property.pid
    : `ID:${property.pid || 'VI-PROP'}`

  return (
    <Link
      href={`/properties/${encodeURIComponent(property.slug)}`}
      className={`group flex flex-col h-full bg-white rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-stone-300 transition-all duration-300 overflow-hidden ${className}`}
    >
      {/* 1. Image Container (16:10 aspect ratio with hover zoom) */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
        <Image
          src={imageSrc}
          alt={property.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
          onError={() => {
            setImageSrc('/assets/images/building-hero-img.png')
          }}
        />

        {/* Gradient shadow for crisp badge legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />

        {/* Badges Overlay */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10 pointer-events-none">
          {/* Top-Left: Featured Badge (Purple) */}
          <div>
            {property.is_featured && (
              <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#7c3aed] text-white shadow-md uppercase tracking-wider backdrop-blur-sm">
                Featured
              </span>
            )}
          </div>

          {/* Top-Right: Property ID Badge (Blue) */}
          <div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-[#2563eb] text-white shadow-md tracking-wider backdrop-blur-sm">
              {displayPid}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Card Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title: 1-line bold heading with hover brand color transition */}
        <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#612124] transition-colors duration-200 line-clamp-1 leading-snug">
          {property.name}
        </h3>

        {/* Price & Negotiation Row */}
        <div className="flex items-center justify-between gap-2 mt-2">
          <span className="text-2xl font-extrabold text-[#2563eb] tracking-tight">
            {formatPropertyPrice(property.price, property.currency)}
          </span>

          {property.is_negotiable && (
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-700 border border-purple-200 shrink-0">
              Negotiation
            </span>
          )}
        </div>

        {/* Description snippet: 2 lines clamp */}
        {property.description ? (
          <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed mt-2 mb-4 flex-grow">
            {property.description}
          </p>
        ) : (
          <div className="mb-4 flex-grow" />
        )}

        {/* 3. Specs Bottom Bar */}
        <div className="pt-3 border-t border-stone-100 grid grid-cols-3 gap-2 text-stone-600 mt-auto">
          {/* Bedrooms */}
          <div className="flex items-center gap-1.5 min-w-0">
            <Bed className="w-4 h-4 text-stone-400 shrink-0" />
            <span className="text-xs font-medium truncate">
              {bedrooms !== null
                ? `${bedrooms} ${bedrooms === 1 ? 'Bed' : 'Beds'}`
                : '—'}
            </span>
          </div>

          {/* Bathrooms */}
          <div className="flex items-center gap-1.5 min-w-0">
            <Bath className="w-4 h-4 text-stone-400 shrink-0" />
            <span className="text-xs font-medium truncate">
              {bathrooms !== null
                ? `${bathrooms} ${bathrooms === 1 ? 'Bath' : 'Baths'}`
                : '—'}
            </span>
          </div>

          {/* Built-up Size */}
          <div className="flex items-center gap-1.5 min-w-0 justify-end">
            <Maximize2 className="w-4 h-4 text-stone-400 shrink-0" />
            <span className="text-xs font-medium truncate">
              {builtUpArea !== null
                ? formatArea(builtUpArea, property.area_unit || 'sq.ft')
                : '—'}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

