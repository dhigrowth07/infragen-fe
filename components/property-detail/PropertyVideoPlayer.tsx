'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Play, Video } from 'lucide-react'
import type { PublicProperty } from '@/lib/types/property.types'
import { getPrimaryPropertyImage } from '@/lib/formatters'

export interface PropertyVideoPlayerProps {
  property: PublicProperty
  className?: string
}

/**
 * Property Video Walkthrough Section
 * Strictly matching reference-ui/property - details - page.png (Slice 3):
 * - Card with "Property Video" heading
 * - Video container with thumbnail preview and circular play button overlay
 * - Supports HTML5 video streaming from S3 or embedded modal player
 */
export default function PropertyVideoPlayer({
  property,
  className = '',
}: PropertyVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)

  // Find video in property.media
  const videoMedia = property.media?.find(
    (m) => m.media_type === 'VIDEO' && Boolean(m.file_url)
  )
  const videoUrl = videoMedia?.file_url

  // Strictly show valid data only; if no video walkthrough is uploaded, hide section
  if (!videoUrl) {
    return null
  }

  const thumbnail = getPrimaryPropertyImage(property)

  return (
    <section
      className={`bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 ${className}`}
      aria-labelledby="property-video-heading"
    >
      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <h2
          id="property-video-heading"
          className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight"
        >
          Property Video
        </h2>

        {videoUrl ? (
          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            HD Walkthrough Available
          </span>
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-stone-400">
            <Video className="w-3.5 h-3.5" />
            Virtual Walkthrough
          </span>
        )}
      </div>

      {/* Video Container with Play Button Overlay */}
      <div className="mt-6 relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-stone-900 shadow-md group">
        {isPlaying && videoUrl ? (
          <video
            src={videoUrl}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          >
            Your browser does not support HTML5 video streaming.
          </video>
        ) : (
          <div
            onClick={() => setIsPlaying(true)}
            className="relative w-full h-full cursor-pointer"
          >
            <Image
              src={thumbnail}
              alt={`${property.name} video walkthrough preview`}
              fill
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover transition-transform duration-500 group-hover:scale-103"
            />

            {/* Darkened Gradient Overlay */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

            {/* Center Circular Play Button (matching wireframe teal/white circle) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                aria-label="Play property video walkthrough"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#20b2aa] hover:bg-[#1a938c] text-white flex items-center justify-center shadow-xl shadow-black/40 transition-all duration-300 group-hover:scale-110 active:scale-95 cursor-pointer"
              >
                <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current ml-1" />
              </button>
            </div>

            {/* Video duration/info bar pill */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white/90 text-xs font-semibold backdrop-blur-sm bg-black/50 px-3.5 py-2 rounded-lg pointer-events-none">
              <span className="truncate">{property.name} — Drone Cinematic Tour</span>
              <span className="shrink-0 text-white/70">1080p Full HD</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

