'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Maximize2,
  Share2,
  Check,
} from 'lucide-react'
import type { PublicProperty } from '@/lib/types/property.types'
import {
  formatPropertyPrice,
  resolveLandPriceSuffix,
} from '@/lib/formatters'

export interface PropertyDetailHeroProps {
  property: PublicProperty
}

/**
 * Property Detail Hero Panoramic Gallery
 * Strictly matching reference-ui/property - details - page.png (Slice 1):
 * - Large full-width hero photo with left/right carousel arrows (<, >) when multiple images exist
 * - Breadcrumbs: HOME / [CITY] / [LOCATION]
 * - Large white bold title
 * - Location pin icon + full address line
 * - Top-Right: FEATURED badge + Huge turquoise price tag
 * - Clickable horizontal thumbnail strip (only rendered when real uploaded photos > 1)
 */
export default function PropertyDetailHero({ property }: PropertyDetailHeroProps) {
  // Collect only real uploaded photo images (exclude blueprints/sketches which belong in floor plans)
  const realMediaImages = (property.media || [])
    .filter((m) => m.media_type === 'IMAGE' && Boolean(m.file_url))
    .map((m) => m.file_url as string)

  // Primary image first if designated, followed by remaining real images
  const primaryMedia = property.media?.find(
    (m) => m.is_primary && m.media_type === 'IMAGE' && Boolean(m.file_url)
  )
  const sortedRealImages = primaryMedia?.file_url
    ? [primaryMedia.file_url, ...realMediaImages.filter((url) => url !== primaryMedia.file_url)]
    : realMediaImages

  // If real uploaded photos exist, use only those; otherwise use the single designated hero fallback
  const defaultHeroPlaceholder =
    property.property_type === 'LAND'
      ? '/assets/images/land-hero-img.png'
      : '/assets/images/building-hero-img.png'

  const allImages =
    sortedRealImages.length > 0 ? sortedRealImages : [defaultHeroPlaceholder]

  const [activeIndex, setActiveIndex] = useState(0)
  const [copied, setCopied] = useState(false)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const activeImage = allImages[activeIndex] || allImages[0]

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1))
  }

  const handleShare = async () => {
    if (typeof window !== 'undefined') {
      try {
        await navigator.clipboard.writeText(window.location.href)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        // Fallback silently
      }
    }
  }

  const fullAddress = [
    property.street_address,
    property.location,
    property.city,
    property.state,
    property.pincode,
  ]
    .filter(Boolean)
    .join(', ')

  const priceSuffix =
    property.property_type === 'LAND' ? resolveLandPriceSuffix(property) : ''

  return (
    <section className="relative w-full bg-stone-950 text-white">
      {/* 1. Full-Width Panoramic Hero Display */}
      <div className="relative w-full h-[480px] sm:h-[560px] md:h-[620px] lg:h-[680px] overflow-hidden">
        <Image
          src={activeImage}
          alt={property.name}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transition-all duration-500 ease-out"
        />

        {/* Ambient Dark Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />

        {/* Carousel Navigation Arrows (only rendered if multiple images exist) */}
        {allImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous photo"
              className="absolute left-4 sm:left-6 md:left-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all duration-200 active:scale-95 cursor-pointer shadow-lg"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next photo"
              className="absolute right-4 sm:right-6 md:right-8 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/45 hover:bg-black/75 text-white flex items-center justify-center backdrop-blur-sm border border-white/20 transition-all duration-200 active:scale-95 cursor-pointer shadow-lg"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}

        {/* Top Floating Action Buttons (Full Screen & Share) */}
        <div className="absolute top-28 sm:top-32 right-5 sm:right-10 lg:right-16 z-20 flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share property link"
            className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/75 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95 cursor-pointer"
            title="Copy property link"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>
          <button
            type="button"
            onClick={() => setIsLightboxOpen(true)}
            aria-label="Enlarge photo"
            className="w-10 h-10 rounded-full bg-black/50 hover:bg-black/75 border border-white/20 text-white flex items-center justify-center backdrop-blur-md transition-all active:scale-95 cursor-pointer"
            title="View full screen"
          >
            <Maximize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Hero Bottom Information Container */}
        <div className="absolute bottom-6 sm:bottom-8 inset-x-0 z-20 max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-16 xl:px-20">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            {/* Left: Breadcrumb, Title & Location */}
            <div className="max-w-3xl">
              {/* Breadcrumb: HOME / [CITY] / [LOCATION] */}
              <nav aria-label="Breadcrumb" className="mb-2.5">
                <ol className="flex items-center gap-2 text-xs font-semibold tracking-wider text-white/70 uppercase">
                  <li>
                    <Link
                      href="/"
                      className="hover:text-white transition-colors"
                    >
                      HOME
                    </Link>
                  </li>
                  <li>/</li>
                  <li>
                    <Link
                      href={
                        property.property_type === 'LAND'
                          ? '/properties/land'
                          : '/properties/building'
                      }
                      className="hover:text-white transition-colors"
                    >
                      {property.city || property.property_type}
                    </Link>
                  </li>
                  {property.location && (
                    <>
                      <li>/</li>
                      <li className="text-white/95 truncate">
                        {property.location}
                      </li>
                    </>
                  )}
                </ol>
              </nav>

              {/* Title Heading */}
              <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                {property.name}
              </h1>

              {/* Address Line with Location Pin */}
              <div className="flex items-center gap-2 mt-2.5 text-white/85 text-xs sm:text-sm">
                <MapPin className="w-4 h-4 text-[#20b2aa] shrink-0" />
                <span className="truncate">{fullAddress}</span>
              </div>
            </div>

            {/* Right: Featured Badge & Large Turquoise Price Tag */}
            <div className="flex flex-col md:items-end shrink-0">
              {property.is_featured && (
                <span className="inline-flex items-center self-start md:self-end px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-xs mb-1.5 border border-white/20">
                  FEATURED
                </span>
              )}

              <div className="flex items-baseline gap-1.5">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#20b2aa] tracking-tight drop-shadow-md">
                  {formatPropertyPrice(property.price, property.currency)}
                </span>
                {priceSuffix && (
                  <span className="text-sm font-semibold text-white/80">
                    {priceSuffix}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Horizontal Thumbnail Strip (aligned exactly with hero content container) */}
      {allImages.length > 1 && (
        <div className="w-full bg-[#0a0a0c] border-t border-b border-stone-800/80 py-3">
          <div className="max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-16 xl:px-20 flex items-center justify-start gap-2.5 sm:gap-3 overflow-x-auto scrollbar-none py-1">
            {allImages.map((imgUrl, idx) => {
              const isActive = idx === activeIndex
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Show image ${idx + 1}`}
                  className={`relative w-20 h-14 sm:w-24 sm:h-16 md:w-28 md:h-18 rounded-md overflow-hidden shrink-0 transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'ring-2 ring-[#20b2aa] scale-105 shadow-md shadow-[#20b2aa]/20 opacity-100'
                      : 'opacity-65 hover:opacity-100 border border-white/10'
                  }`}
                >
                  <Image
                    src={imgUrl}
                    alt={`${property.name} thumbnail ${idx + 1}`}
                    fill
                    sizes="120px"
                    className="object-cover"
                  />
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* 3. Full-Screen Lightbox Modal with z-[9999] */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col justify-between"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Bar with Close Button */}
          <div
            className="w-full bg-stone-900/90 border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between z-20 shrink-0 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-white font-bold text-sm sm:text-base truncate">
              {property.name} — Gallery ({activeIndex + 1} of {allImages.length})
            </span>

            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-red-600/90 hover:bg-red-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer border border-red-500/60"
              title="Close (Esc)"
            >
              <Check className="w-4 h-4 hidden" />
              <span>✕ Close</span>
            </button>
          </div>

          {/* Centered Image Canvas */}
          <div
            className="flex-1 w-full flex items-center justify-center p-4 sm:p-8 overflow-auto"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div
              className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={activeImage}
                alt={property.name}
                fill
                sizes="90vw"
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>

          {/* Bottom Controls Bar */}
          <div
            className="w-full bg-stone-900/60 border-t border-white/5 py-3 px-4 flex items-center justify-center gap-4 z-20 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            {allImages.length > 1 ? (
              <>
                <button
                  type="button"
                  onClick={handlePrev}
                  className="px-4 py-1.5 rounded-lg bg-white/15 hover:bg-white/30 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" /> Prev
                </button>
                <span className="text-xs text-white/70">
                  {activeIndex + 1} / {allImages.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-4 py-1.5 rounded-lg bg-white/15 hover:bg-white/30 text-white text-xs font-semibold flex items-center gap-1 cursor-pointer"
                >
                  Next <ChevronRight className="w-4 h-4" />
                </button>
              </>
            ) : (
              <span className="text-xs text-white/70">
                Press Esc or click Close to return
              </span>
            )}
          </div>
        </div>
      )}
    </section>
  )
}

