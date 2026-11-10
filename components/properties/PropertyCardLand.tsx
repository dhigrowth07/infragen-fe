'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Maximize2, FileText, Route } from 'lucide-react'
import type { PublicProperty } from '@/lib/types/property.types'
import {
  formatPropertyPrice,
  getPrimaryPropertyImage,
  extractLandApproval,
  extractRoadWidth,
  formatLandExtent,
  resolveLandPriceSuffix,
} from '@/lib/formatters'

export interface PropertyCardLandProps {
  property: PublicProperty
  className?: string
  priority?: boolean
}

/**
 * Land Property Card Primitive
 * Strictly matching reference-ui/property - land - page.png:
 * - 16:10 image ratio with drone/aerial framing and hover zoom
 * - Badges: Featured (purple top-left) and PID (blue top-right)
 * - 1-line bold heading with brand color hover transition
 * - Bold blue price + unit suffix (e.g. ₹75,00,000 / Plot or / Acre)
 * - Purple Negotiation badge if is_negotiable=true
 * - 2-line description clamp
 * - Land specs bottom bar:
 *   - Area icon + Extent in acres/cents/sq.ft (e.g. 4.8 Ac)
 *   - Planning approval badge: DTCP, RERA, CMDA, Panchayat
 *   - Access road width: 40ft Rd with Route icon
 * - Clickable navigation to /properties/[slug]
 */
export default function PropertyCardLand({
  property,
  className = '',
  priority = false,
}: PropertyCardLandProps) {
  const [imageSrc, setImageSrc] = useState<string>(() =>
    getPrimaryPropertyImage(property)
  )

  const approval = extractLandApproval(property)
  const roadWidth = extractRoadWidth(property)
  const extent = formatLandExtent(property)
  const priceSuffix = resolveLandPriceSuffix(property)

  const displayPid = property.pid?.startsWith('ID:')
    ? property.pid
    : `ID:${property.pid || 'VI-LAND'}`

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
            setImageSrc('/assets/images/land-hero-img.png')
          }}
        />

        {/* Gradient shadow for badge legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/15 pointer-events-none" />

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

        {/* Price & Unit Row */}
        <div className="flex items-baseline gap-1.5 mt-2">
          <span className="text-2xl font-extrabold text-[#2563eb] tracking-tight">
            {formatPropertyPrice(property.price, property.currency)}
          </span>
          {Boolean(property.price && priceSuffix) && (
            <span className="text-xs font-medium text-stone-500 shrink-0">
              {priceSuffix}
            </span>
          )}
        </div>

        {/* Negotiation Badge (Wireframe Card 2: Vivid purple capsule under price) */}
        {property.is_negotiable && (
          <div className="mt-1.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-[#7c3aed] text-white tracking-wide shadow-xs">
              Negotiation
            </span>
          </div>
        )}

        {/* Description snippet: 2 lines clamp */}
        {property.description ? (
          <p className="text-stone-500 text-sm line-clamp-2 leading-relaxed mt-2.5 mb-4 flex-grow">
            {property.description}
          </p>
        ) : (
          <div className="mb-4 flex-grow" />
        )}

        {/* 3. Land Specs Bottom Bar (Icon + Text triplet matching wireframe) */}
        <div className="pt-3 border-t border-stone-100 flex items-center justify-between gap-2 text-stone-600 mt-auto">
          {/* Extent (Acres / Cents / sq.ft / sq.m) */}
          <div className="flex items-center gap-1.5 min-w-0">
            <Maximize2 className="w-4 h-4 text-stone-400 shrink-0" />
            <span className="text-xs font-semibold text-stone-700 truncate">
              {extent}
            </span>
          </div>

          {/* Planning Approval (DTCP / RERA / CMDA) */}
          <div className="flex items-center gap-1.5 min-w-0 justify-center">
            <FileText className="w-4 h-4 text-stone-400 shrink-0" />
            <span className="text-xs font-semibold text-stone-700 truncate">
              {approval}
            </span>
          </div>

          {/* Access Road Width */}
          <div className="flex items-center gap-1.5 min-w-0 justify-end">
            <Route className="w-4 h-4 text-stone-400 shrink-0" />
            <span className="text-xs font-medium text-stone-700 truncate">
              {roadWidth}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

