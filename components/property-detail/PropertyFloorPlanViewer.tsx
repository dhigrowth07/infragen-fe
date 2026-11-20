'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { Maximize2, X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react'
import type { PublicProperty } from '@/lib/types/property.types'

export interface PropertyFloorPlanViewerProps {
  property: PublicProperty
  className?: string
}

// Architectural Floor Plans Section
// Strictly matching reference-ui/property - details - page.png (Slice 2):
// - Card with "Floor Plans" heading
// - Teal framed container with blueprint/layout sketch
// - Supports multiple sketches with tab selector & gallery navigation
// - Click-to-enlarge lightbox modal with z-[9999] overlay (above navbar)
// - Prominent close button, zoom controls, and body scroll lock
// - If no sketch blueprint is uploaded, returns null (no dummy data)
export default function PropertyFloorPlanViewer({
  property,
  className = '',
}: PropertyFloorPlanViewerProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [activeSketchIndex, setActiveSketchIndex] = useState(0)

  // Find all sketches/blueprints from property.media
  const sketchItems =
    property.media?.filter(
      (m) => m.media_type === 'SKETCH' && Boolean(m.file_url)
    ) || []

  // Prevent background scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isLightboxOpen])

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return
      if (e.key === 'Escape') setIsLightboxOpen(false)
      if (sketchItems.length > 1) {
        if (e.key === 'ArrowLeft') {
          setActiveSketchIndex((prev) => (prev > 0 ? prev - 1 : sketchItems.length - 1))
          setZoomLevel(1)
        } else if (e.key === 'ArrowRight') {
          setActiveSketchIndex((prev) => (prev < sketchItems.length - 1 ? prev + 1 : 0))
          setZoomLevel(1)
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isLightboxOpen, sketchItems.length])

  // Strictly show valid data only; if no sketch is uploaded, hide section
  if (sketchItems.length === 0) {
    return null
  }

  const currentSketch = sketchItems[activeSketchIndex] || sketchItems[0]
  const floorPlanUrl = currentSketch.file_url

  const handleOpen = () => {
    setZoomLevel(1)
    setIsLightboxOpen(true)
  }

  const handleZoomIn = (e: React.MouseEvent) => {
    e.stopPropagation()
    setZoomLevel((prev) => Math.min(2.5, Math.round((prev + 0.25) * 100) / 100))
  }

  const handleZoomOut = (e: React.MouseEvent) => {
    e.stopPropagation()
    setZoomLevel((prev) => Math.max(0.5, Math.round((prev - 0.25) * 100) / 100))
  }

  const handleResetZoom = (e: React.MouseEvent) => {
    e.stopPropagation()
    setZoomLevel(1)
  }

  return (
    <section
      className={`bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 ${className}`}
      aria-labelledby="property-floor-plans-heading"
    >
      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <h2
          id="property-floor-plans-heading"
          className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight"
        >
          Floor Plans
        </h2>

        <div className="flex items-center gap-3">
          {sketchItems.length > 1 && (
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
              {sketchItems.length} Plans Available
            </span>
          )}
          <button
            type="button"
            onClick={handleOpen}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0d9488] hover:text-[#0f766e] transition-colors cursor-pointer"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>Click to Enlarge</span>
          </button>
        </div>
      </div>

      {/* Multiple Floor Plans Selector Tabs */}
      {sketchItems.length > 1 && (
        <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {sketchItems.map((sketch, idx) => {
            const isCurrent = idx === activeSketchIndex
            const title = sketch.file_name
              ? sketch.file_name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
              : `Floor Plan ${idx + 1}`
            return (
              <button
                key={sketch.id || idx}
                type="button"
                onClick={() => {
                  setActiveSketchIndex(idx)
                  setZoomLevel(1)
                }}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer whitespace-nowrap ${
                  isCurrent
                    ? 'bg-[#20b2aa] text-white shadow-xs'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
                }`}
              >
                <span className="capitalize truncate max-w-[200px]">{title}</span>
              </button>
            )
          })}
        </div>
      )}

      {/* Teal Bordered Frame (matching wireframe) */}
      <div className="mt-6 border-2 border-[#20b2aa] rounded-xl p-3 sm:p-4 bg-stone-50/50">
        <div
          onClick={handleOpen}
          className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-lg overflow-hidden bg-white border border-stone-200/70 shadow-inner group cursor-pointer"
        >
          <Image
            key={floorPlanUrl}
            src={floorPlanUrl}
            alt={`${property.name} architectural floor plan ${activeSketchIndex + 1}`}
            fill
            sizes="(max-width: 1024px) 100vw, 800px"
            className="object-contain p-2 sm:p-4 transition-transform duration-300 group-hover:scale-102"
          />

          {/* Hover Overlay Hint */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity px-3.5 py-1.5 rounded-full text-xs font-bold bg-black/75 text-white backdrop-blur-sm flex items-center gap-1.5 shadow-lg">
              <Maximize2 className="w-3.5 h-3.5" />
              <span>Inspect Blueprint</span>
            </span>
          </div>
        </div>
      </div>

      {/* Lightbox Modal with z-[9999] completely above fixed navbar */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col justify-between"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Top Controls Bar */}
          <div
            className="w-full bg-stone-900/90 border-b border-white/10 px-4 sm:px-8 py-3.5 flex items-center justify-between z-20 shrink-0 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className="text-white font-bold text-sm sm:text-base truncate">
                {property.name}
              </span>
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-xs font-semibold bg-teal-500/20 text-[#20b2aa] border border-[#20b2aa]/40">
                {sketchItems.length > 1
                  ? `Plan ${activeSketchIndex + 1} of ${sketchItems.length}: ${
                      currentSketch.file_name
                        ? currentSketch.file_name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')
                        : `Layout ${activeSketchIndex + 1}`
                    }`
                  : 'Architectural Layout Plan'}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Zoom Controls */}
              <div className="flex items-center bg-white/10 rounded-lg p-1 border border-white/10">
                <button
                  type="button"
                  onClick={handleZoomOut}
                  className="p-1.5 sm:p-2 rounded text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                  title="Zoom Out (-)"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleResetZoom}
                  className="text-xs font-mono text-white/90 px-2 select-none hover:text-[#20b2aa] cursor-pointer"
                  title="Reset Zoom"
                >
                  {Math.round(zoomLevel * 100)}%
                </button>
                <button
                  type="button"
                  onClick={handleZoomIn}
                  className="p-1.5 sm:p-2 rounded text-white/80 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                  title="Zoom In (+)"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-4 h-4" />
                </button>
              </div>

              {/* Close Button - Highly Visible Red Accent */}
              <button
                type="button"
                onClick={() => setIsLightboxOpen(false)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg bg-red-600/90 hover:bg-red-600 text-white font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer border border-red-500/60"
                title="Close Lightbox (Esc)"
              >
                <X className="w-4 h-4" />
                <span>Close</span>
              </button>
            </div>
          </div>

          {/* Modal Blueprint Canvas - Centered with safe margins */}
          <div
            className="relative flex-1 w-full flex items-center justify-center p-4 sm:p-8 overflow-auto"
            onClick={() => setIsLightboxOpen(false)}
          >
            {/* Previous Plan Arrow */}
            {sketchItems.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveSketchIndex((prev) => (prev > 0 ? prev - 1 : sketchItems.length - 1))
                  setZoomLevel(1)
                }}
                className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white transition-all shadow-xl z-30 cursor-pointer border border-white/20"
                title="Previous Plan (Left Arrow)"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <div
              className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center transition-transform duration-200"
              style={{ transform: `scale(${zoomLevel})` }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                key={floorPlanUrl}
                src={floorPlanUrl}
                alt={`${property.name} floor plan enlarged`}
                fill
                sizes="90vw"
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>

            {/* Next Plan Arrow */}
            {sketchItems.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setActiveSketchIndex((prev) => (prev < sketchItems.length - 1 ? prev + 1 : 0))
                  setZoomLevel(1)
                }}
                className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 p-2.5 sm:p-3 rounded-full bg-black/60 hover:bg-black/90 text-white/80 hover:text-white transition-all shadow-xl z-30 cursor-pointer border border-white/20"
                title="Next Plan (Right Arrow)"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Hint Bar & Multi-Plan Thumbnails */}
          <div
            className="w-full bg-stone-900/80 border-t border-white/10 py-2.5 px-4 flex flex-col sm:flex-row items-center justify-between gap-2 z-20 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-xs text-white/50 select-none">
              Click outside or press Esc to close • Use zoom controls or arrow keys to switch plans
            </div>

            {sketchItems.length > 1 && (
              <div className="flex items-center gap-1.5">
                {sketchItems.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      setActiveSketchIndex(idx)
                      setZoomLevel(1)
                    }}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === activeSketchIndex
                        ? 'w-6 bg-[#20b2aa]'
                        : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                    title={`Go to Plan ${idx + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}


