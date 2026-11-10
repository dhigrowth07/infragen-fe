'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react'

export interface LandHeroSlide {
  badge: string
  titleLine1: string
  titleLine2: string
  subtitle: string
  imageUrl: string
}

const LAND_HERO_SLIDES: LandHeroSlide[] = [
  {
    badge: 'VERIFIED FARMLANDS & DTCP LAYOUTS',
    titleLine1: 'Find Your Dream',
    titleLine2: 'Land & Plots',
    subtitle:
      'Explore DTCP approved plots, fertile agricultural lands, commercial parcels, and premium farm lands hand-picked for secure capital growth and quality living.',
    imageUrl: '/assets/images/land-hero-img.png',
  },
  {
    badge: 'PRIME EXPRESSWAY CORRIDORS',
    titleLine1: 'Strategic Commercial &',
    titleLine2: 'Industrial Plots',
    subtitle:
      'High-yield investment plots with verified title deeds, 60ft arterial road connectivity, and immediate industrial approvals along major transit axes.',
    imageUrl: '/assets/images/land-hero-img.png',
  },
  {
    badge: 'TRANQUIL AGRO RETREATS',
    titleLine1: 'Fertile Agro Estates &',
    titleLine2: 'Farm Communities',
    subtitle:
      'Abundant groundwater, mineral-rich red soil, and peaceful countryside locations ideal for weekend villas and organic cultivation.',
    imageUrl: '/assets/images/land-hero-img.png',
  },
]

export interface LandHeroBannerProps {
  className?: string
  slides?: LandHeroSlide[]
}

/**
 * Land Catalog Hero Section
 * Strictly matching reference-ui/property - land - page.png:
 * - Aerial parcel photography background with drone framing & vignette
 * - Capsule badge: "VERIFIED FARMLANDS & DTCP LAYOUTS" with gold accent
 * - Headline: "Find Your Dream Land & Plots"
 * - Subtitle: "Explore DTCP approved plots, fertile agricultural lands..."
 * - Carousel navigation buttons (←, →) & dot indicators
 * - Aligned container: max-w-[1600px] matching Home Page & Building Page
 */
export default function LandHeroBanner({
  className = '',
  slides = LAND_HERO_SLIDES,
}: LandHeroBannerProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  const activeSlide = slides[currentSlideIndex] || slides[0]

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  return (
    <section
      className={`relative w-full overflow-hidden bg-[#1c1214] text-white min-h-[600px] sm:min-h-[620px] md:min-h-[640px] lg:min-h-[660px] flex items-center ${className}`}
      aria-label="Land and plots property catalog hero banner"
    >
      {/* 1. Background Image with Transition */}
      <div className="absolute inset-0 z-0">
        <Image
          src={activeSlide.imageUrl}
          alt={`${activeSlide.titleLine1} ${activeSlide.titleLine2}`}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center transition-all duration-700 ease-out"
        />

        {/* Brand Vignette & Dark Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30 z-10 pointer-events-none" />
      </div>

      {/* 2. Banner Content Container */}
      <div className="relative z-20 max-w-[1600px] mx-auto px-5 sm:px-10 lg:px-16 xl:px-20 pt-32 sm:pt-36 md:pt-36 lg:pt-38 pb-16 sm:pb-20 w-full flex flex-col justify-center min-h-[600px] sm:min-h-[620px] md:min-h-[640px] lg:min-h-[660px]">
        <div className="max-w-3xl">
          {/* Top Capsule Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-[#c5a880] border border-[#c5a880]/30 backdrop-blur-md mb-4 shadow-sm">
            <MapPin className="w-3.5 h-3.5 text-[#c5a880]" />
            <span>{activeSlide.badge}</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.1] text-white">
            <span className="block">{activeSlide.titleLine1}</span>
            <span className="block text-white/95">{activeSlide.titleLine2}</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-5 text-white/80 text-sm sm:text-base md:text-lg font-normal leading-relaxed max-w-2xl">
            {activeSlide.subtitle}
          </p>

          {/* Carousel Arrow Controls */}
          <div className="flex items-center gap-4 mt-8">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous slide"
              className="w-10 h-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              aria-label="Next slide"
              className="w-10 h-10 rounded-full border border-white/20 bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Pagination Pill Dots */}
            <div className="flex items-center gap-1.5 ml-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === currentSlideIndex
                      ? 'w-6 bg-white'
                      : 'w-1.5 bg-white/40 hover:bg-white/60'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

