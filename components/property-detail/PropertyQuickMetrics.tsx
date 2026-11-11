'use client'

import React from 'react'
import {
  Bed,
  Bath,
  Maximize2,
  Scaling,
  Route,
  Milestone,
  FileText,
} from 'lucide-react'
import type { PublicProperty } from '@/lib/types/property.types'
import {
  extractBedrooms,
  extractBathrooms,
  formatArea,
  formatLandExtent,
  extractRoadWidth,
} from '@/lib/formatters'

export interface PropertyQuickMetricsProps {
  property: PublicProperty
  className?: string
}

/**
 * Floating Quick Spec Metric Bar
 * Strictly matching reference-ui/property - details - page.png (Slice 1):
 * - White card with rounded corners and subtle shadow
 * - Top header: "Property ID: VI2017" in brand teal
 * - Thin divider
 * - 4-column spec items with icons and uppercase label headers:
 *   - BUILDING: BEDROOMS, BATHROOMS, AREA, LOT SIZE
 *   - LAND: PLOT EXTENT, ROAD WIDTH, ROAD BASE, SURVEY NUMBER
 */
// Helper to split value and unit for clean visual hierarchy (matching attached UI)
function splitMetric(formatted: string) {
  if (!formatted || formatted === '—') return { value: '—', unit: '' }
  const match = formatted.match(/^([\d,.]+)\s*(.*)$/)
  if (match) {
    return { value: match[1], unit: match[2] }
  }
  return { value: formatted, unit: '' }
}

export default function PropertyQuickMetrics({
  property,
  className = '',
}: PropertyQuickMetricsProps) {
  const isBuilding = property.property_type === 'BUILDING'

  // Building spec extractions
  const bedrooms = extractBedrooms(property)
  const bathrooms = extractBathrooms(property)
  const builtUpArea =
    property.super_built_up_area || property.carpet_area
      ? formatArea(
          property.super_built_up_area || property.carpet_area,
          property.area_unit || 'sq.ft'
        )
      : '—'
  const lotSizeFormatted = property.lot_size
    ? formatArea(property.lot_size, property.lot_size_unit || 'sq.ft')
    : '—'

  // Land spec extractions
  const landExtent = formatLandExtent(property)
  const roadWidth = extractRoadWidth(property)
  const roadBase = property.road_base || '—'
  const surveyNumber = property.survey_number || '—'

  const displayPid = property.pid || '—'

  const areaParsed = splitMetric(builtUpArea)
  const lotParsed = splitMetric(lotSizeFormatted)
  const extentParsed = splitMetric(landExtent)
  const roadWidthParsed = splitMetric(roadWidth)

  return (
    <div
      className={`bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-7 ${className}`}
    >
      {/* Top Header Row: Property ID (clean divider line matching attached design) */}
      <div className="pb-3.5 border-b border-stone-100">
        <div className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-stone-500">
          <span>Property ID:</span>
          <span className="font-bold text-[#20b2aa] tracking-wide uppercase">
            {displayPid}
          </span>
        </div>
      </div>

      {/* 4-Column Spec Items */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-5">
        {isBuilding ? (
          <>
            {/* 1. Bedrooms */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] sm:text-xs font-bold text-stone-400 uppercase tracking-wider">
                BEDROOMS
              </span>
              <div className="flex items-center gap-2.5">
                <Bed className="w-5 h-5 text-[#20b2aa] shrink-0" />
                <span className="text-lg sm:text-xl font-extrabold text-stone-900">
                  {bedrooms !== null ? bedrooms : '—'}
                </span>
              </div>
            </div>

            {/* 2. Bathrooms */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] sm:text-xs font-bold text-stone-400 uppercase tracking-wider">
                BATHROOMS
              </span>
              <div className="flex items-center gap-2.5">
                <Bath className="w-5 h-5 text-[#20b2aa] shrink-0" />
                <span className="text-lg sm:text-xl font-extrabold text-stone-900">
                  {bathrooms !== null ? bathrooms : '—'}
                </span>
              </div>
            </div>

            {/* 3. Area (Built-up) */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] sm:text-xs font-bold text-stone-400 uppercase tracking-wider">
                AREA
              </span>
              <div className="flex items-center gap-2.5 min-w-0">
                <Scaling className="w-5 h-5 text-[#20b2aa] shrink-0" />
                <div className="flex items-baseline gap-1 truncate">
                  <span className="text-lg sm:text-xl font-extrabold text-stone-900">
                    {areaParsed.value}
                  </span>
                  {areaParsed.unit && (
                    <span className="text-xs font-semibold text-stone-500">
                      {areaParsed.unit}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 4. Lot Size */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] sm:text-xs font-bold text-stone-400 uppercase tracking-wider">
                LOT SIZE
              </span>
              <div className="flex items-center gap-2.5 min-w-0">
                <Maximize2 className="w-5 h-5 text-[#20b2aa] shrink-0" />
                <div className="flex items-baseline gap-1 truncate">
                  <span className="text-lg sm:text-xl font-extrabold text-stone-900">
                    {lotParsed.value}
                  </span>
                  {lotParsed.unit && (
                    <span className="text-xs font-semibold text-stone-500">
                      {lotParsed.unit}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            {/* 1. Plot Extent */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] sm:text-xs font-bold text-stone-400 uppercase tracking-wider">
                PLOT EXTENT
              </span>
              <div className="flex items-center gap-2.5 min-w-0">
                <Maximize2 className="w-5 h-5 text-[#20b2aa] shrink-0" />
                <div className="flex items-baseline gap-1 truncate">
                  <span className="text-lg sm:text-xl font-extrabold text-stone-900">
                    {extentParsed.value}
                  </span>
                  {extentParsed.unit && (
                    <span className="text-xs font-semibold text-stone-500">
                      {extentParsed.unit}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Road Width */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] sm:text-xs font-bold text-stone-400 uppercase tracking-wider">
                ROAD WIDTH
              </span>
              <div className="flex items-center gap-2.5 min-w-0">
                <Route className="w-5 h-5 text-[#20b2aa] shrink-0" />
                <div className="flex items-baseline gap-1 truncate">
                  <span className="text-lg sm:text-xl font-extrabold text-stone-900">
                    {roadWidthParsed.value}
                  </span>
                  {roadWidthParsed.unit && (
                    <span className="text-xs font-semibold text-stone-500">
                      {roadWidthParsed.unit}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 3. Road Base */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] sm:text-xs font-bold text-stone-400 uppercase tracking-wider">
                ROAD BASE
              </span>
              <div className="flex items-center gap-2.5 min-w-0">
                <Milestone className="w-5 h-5 text-[#20b2aa] shrink-0" />
                <span className="text-sm sm:text-base font-extrabold text-stone-900 truncate" title={roadBase}>
                  {roadBase}
                </span>
              </div>
            </div>

            {/* 4. Survey Number */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] sm:text-xs font-bold text-stone-400 uppercase tracking-wider">
                SURVEY NUMBER
              </span>
              <div className="flex items-center gap-2.5 min-w-0">
                <FileText className="w-5 h-5 text-[#20b2aa] shrink-0" />
                <span className="text-sm sm:text-base font-extrabold text-stone-900 truncate" title={surveyNumber}>
                  {surveyNumber}
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

