'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import {
  Bed,
  Bath,
  Maximize2,
  Heart,
  Camera,
  MapPin,
  Compass,
} from 'lucide-react'
import type { PublicProperty } from '@/lib/types/property.types'
import {
  formatPropertyPrice,
  formatArea,
  extractBedrooms,
  extractBathrooms,
  getPrimaryPropertyImage,
} from '@/lib/formatters'

export interface SimilarPropertiesGridProps {
  properties: PublicProperty[]
  className?: string
}

/**
 * Single Similar Property Card
 * Strictly matching reference-ui/property - details - page.png (Slice 4):
 * - Image with hover scale transition
 * - Top-left: "Featured" badge (if is_featured)
 * - Bottom-right overlay on image: Interactive Favorite Heart button & Photo count
 * - Title and location/description snippet
 * - Specs bar: Beds, Baths, Area (for Building) OR Lot size, Road width, Facing (for Land)
 * - Footer: "FOR SALE" / "FOR RENT" on left, Teal Price on right
 */
function SimilarPropertyCard({ property }: { property: PublicProperty }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [imageSrc, setImageSrc] = useState<string>(() =>
    getPrimaryPropertyImage(property)
  )

  const isLand = property.property_type === 'LAND'
  const bedrooms = extractBedrooms(property)
  const bathrooms = extractBathrooms(property)
  const builtUpArea =
    property.super_built_up_area || property.carpet_area || property.lot_size || null

  const photoCount = property.media?.length || 1

  return (
    <div className="group flex flex-col h-full bg-white rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-xl hover:border-stone-300 transition-all duration-300 overflow-hidden">
      {/* 1. Image Viewport with Badges & Action Buttons */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
        <Link
          href={`/properties/${encodeURIComponent(property.slug)}`}
          className="block w-full h-full relative"
        >
          <Image
            src={imageSrc}
            alt={property.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
            onError={() => {
              setImageSrc(
                isLand
                  ? '/assets/images/land-hero-img.png'
                  : '/assets/images/building-hero-img.png'
              )
            }}
          />
          {/* Subtle gradient for badge legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20" />
        </Link>

        {/* Top-Left: Featured Badge */}
        {property.is_featured && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#d97706] text-white shadow-md uppercase tracking-wider">
              Featured
            </span>
          </div>
        )}

        {/* Bottom-Right Overlay Icons on Image: Heart (favorite) & Camera photo count */}
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5">
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsFavorite((prev) => !prev)
            }}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            className="w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-xs flex items-center justify-center transition-all cursor-pointer shadow-md"
            title={isFavorite ? 'Favorited' : 'Favorite'}
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorite
                  ? 'fill-rose-500 text-rose-500 scale-110'
                  : 'text-white hover:text-rose-400'
              }`}
            />
          </button>

          {photoCount > 0 && (
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-semibold shadow-md pointer-events-none">
              <Camera className="w-3.5 h-3.5" />
              <span>{photoCount}</span>
            </div>
          )}
        </div>
      </div>

      {/* 2. Card Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        <Link
          href={`/properties/${encodeURIComponent(property.slug)}`}
          className="group-hover:text-[#169b91] transition-colors"
        >
          <h3 className="text-base sm:text-lg font-bold text-stone-900 line-clamp-1 leading-snug">
            {property.name}
          </h3>
        </Link>

        {/* Location or Description Snippet */}
        <p className="text-xs sm:text-sm text-stone-500 line-clamp-1 mt-1 mb-4">
          {property.location
            ? `${property.location}, ${property.city || ''}`
            : property.description || property.city || 'Prime Location'}
        </p>

        {/* 3. Specs Bar with Icons */}
        <div className="pt-3 border-t border-stone-100 grid grid-cols-3 gap-2 text-stone-600 mt-auto">
          {isLand ? (
            <>
              {/* Lot Size */}
              <div className="flex items-center gap-1.5 min-w-0">
                <Maximize2 className="w-4 h-4 text-stone-400 shrink-0" />
                <span className="text-xs font-medium truncate">
                  {property.lot_size
                    ? `${property.lot_size} ${property.lot_size_unit || 'Acres'}`
                    : '—'}
                </span>
              </div>

              {/* Road Width */}
              <div className="flex items-center gap-1.5 min-w-0">
                <Compass className="w-4 h-4 text-stone-400 shrink-0" />
                <span className="text-xs font-medium truncate">
                  {property.road_width
                    ? `${property.road_width}ft Road`
                    : 'Tar Road'}
                </span>
              </div>

              {/* Facing or Subtype */}
              <div className="flex items-center gap-1.5 min-w-0 justify-end">
                <MapPin className="w-4 h-4 text-stone-400 shrink-0" />
                <span className="text-xs font-medium truncate">
                  {property.sub_type || 'Land'}
                </span>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
        </div>

        {/* 4. Footer Row: "FOR SALE" / "FOR RENT" on left, Teal Price on right */}
        <div className="pt-3 mt-3 border-t border-stone-100 flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
            FOR SALE
          </span>
          <span className="text-base sm:text-lg font-extrabold text-[#169b91] tracking-tight">
            {formatPropertyPrice(property.price, property.currency)}
          </span>
        </div>
      </div>
    </div>
  )
}

/**
 * Featured & Similar Properties Grid (Phase 7.3)
 * Strictly matching reference-ui/property - details - page.png (Slice 4):
 * - Full-width bottom section "Similar Properties"
 * - 3 property cards matching current property type (Building or Land)
 * - Quick specs, price, and favorite heart button
 */
export default function SimilarPropertiesGrid({
  properties,
  className = '',
}: SimilarPropertiesGridProps) {
  if (!properties || properties.length === 0) return null

  return (
    <section
      className={`py-12 border-t border-stone-200/80 bg-white/50 ${className}`}
      aria-labelledby="similar-properties-heading"
    >
      <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-16 xl:px-20">
        <h2
          id="similar-properties-heading"
          className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight mb-8"
        >
          Similar Properties
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {properties.slice(0, 3).map((item) => (
            <SimilarPropertyCard key={item.id} property={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

