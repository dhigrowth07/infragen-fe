'use client'

import React from 'react'
import {
  SlidersHorizontal,
  RotateCcw,
  Search,
  ChevronDown,
} from 'lucide-react'
import type { LandFilterFormState } from '@/lib/types/property.types'
import { formatPropertyPrice } from '@/lib/formatters'

export const LAND_PROPERTY_TYPES = [
  { label: 'All Types', value: '' },
  { label: 'Residential', value: 'Residential' },
  { label: 'Farmland', value: 'Farmland' },
  { label: 'Agri Culture Land', value: 'Agri Culture Land' },
  { label: 'Agri', value: 'Agri' },
  { label: 'Dry-agri', value: 'Dry-agri' },
  { label: 'DTCP', value: 'DTCP' },
  { label: 'Layout', value: 'Layout' },
  { label: 'Gated Community Plot', value: 'Gated Community Plot' },
  { label: 'Commercial', value: 'Commercial' },
  { label: 'Industrial/Warehouse', value: 'Industrial/Warehouse' },
  { label: 'Investment', value: 'Investment' },
  { label: 'Rental Income', value: 'Rental Income' },
]

export const LAND_LOCATIONS = [
  { label: 'All Locations', value: '' },
  { label: 'Sulur', value: 'Sulur' },
  { label: 'Karamadai', value: 'Karamadai' },
  { label: 'Singanallur', value: 'Singanallur' },
  { label: 'Tiruppur', value: 'tiruppur' },
  { label: 'Coimbatore', value: 'Coimbatore' },
  { label: 'Chennai', value: 'Chennai' },
]

export const LAND_ROADS = [
  { label: 'All Roads', value: '' },
  { label: 'Trichy - Cbe 6-Lane Expressway', value: 'Trichy - Cbe 6-Lane Expressway' },
  { label: 'Mettupalayam Road NH-67', value: 'Mettupalayam Road NH-67' },
  { label: 'Hosur Road Express Highway', value: 'Hosur Road Express Highway' },
  { label: 'Avinashi Road', value: 'Avinashi Road' },
  { label: 'Sathy Road', value: 'Sathy Road' },
]

export const MIN_PRICE_LIMIT = 0
export const MAX_PRICE_LIMIT = 50000000 // ₹5 Crores
export const PRICE_STEP = 500000 // ₹5 Lakhs

export interface LandFilterSidebarProps {
  filters: LandFilterFormState
  onFilterChange: (filters: LandFilterFormState) => void
  onSearch: () => void
  onReset: () => void
  className?: string
  propertyTypeOptions?: string[]
  locationOptions?: string[]
  roadOptions?: string[]
}

/**
 * Land Filter Sidebar Component
 * Dynamically populated from backend catalog with sensible fallback options.
 */
export default function LandFilterSidebar({
  filters,
  onFilterChange,
  onSearch,
  onReset,
  className = '',
  propertyTypeOptions,
  locationOptions,
  roadOptions,
}: LandFilterSidebarProps) {
  const typeOptions = React.useMemo(() => {
    if (propertyTypeOptions && propertyTypeOptions.length > 0) {
      return [
        { label: 'All Types', value: '' },
        ...propertyTypeOptions.map((t) => ({ label: t, value: t })),
      ]
    }
    return LAND_PROPERTY_TYPES
  }, [propertyTypeOptions])

  const locOptions = React.useMemo(() => {
    if (locationOptions && locationOptions.length > 0) {
      return [
        { label: 'All Locations', value: '' },
        ...locationOptions.map((loc) => ({ label: loc, value: loc })),
      ]
    }
    return LAND_LOCATIONS
  }, [locationOptions])

  const rdOptions = React.useMemo(() => {
    if (roadOptions && roadOptions.length > 0) {
      return [
        { label: 'All Roads', value: '' },
        ...roadOptions.map((rd) => ({ label: rd, value: rd })),
      ]
    }
    return LAND_ROADS
  }, [roadOptions])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch()
  }

  const handlePriceChange = (newRange: [number, number]) => {
    onFilterChange({
      ...filters,
      priceRange: newRange,
    })
  }

  const minPrice = filters.priceRange?.[0] ?? MIN_PRICE_LIMIT
  const maxPrice = filters.priceRange?.[1] ?? MAX_PRICE_LIMIT

  const minPercent = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        ((minPrice - MIN_PRICE_LIMIT) /
          (MAX_PRICE_LIMIT - MIN_PRICE_LIMIT)) *
          100
      )
    )
  )

  const maxPercent = Math.min(
    100,
    Math.max(
      0,
      Math.round(
        ((maxPrice - MIN_PRICE_LIMIT) /
          (MAX_PRICE_LIMIT - MIN_PRICE_LIMIT)) *
          100
      )
    )
  )

  return (
    <div
      className={`bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 ${className}`}
    >
      {/* 1. Header Row */}
      <div className="flex items-center justify-between pb-4 border-b border-stone-100">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-base md:text-lg">
          <SlidersHorizontal className="w-5 h-5 text-[#2563eb]" />
          <span>Property Search</span>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-stone-800 transition-colors py-1 px-1.5 rounded-md hover:bg-stone-50 cursor-pointer"
          title="Reset all filters"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Filters</span>
        </button>
      </div>

      {/* 2. Form Fields matching screenshot */}
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        {/* PROPERTY ID */}
        <div>
          <label
            htmlFor="land-property-id"
            className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1.5"
          >
            PROPERTY ID
          </label>
          <input
            id="land-property-id"
            type="text"
            value={filters.propertyId}
            onChange={(e) =>
              onFilterChange({ ...filters, propertyId: e.target.value })
            }
            placeholder="Type ID"
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-800 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] transition-all bg-white"
          />
        </div>

        {/* PROPERTY TYPE */}
        <div>
          <label
            htmlFor="land-property-type"
            className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1.5"
          >
            PROPERTY TYPE
          </label>
          <div className="relative">
            <select
              id="land-property-type"
              value={filters.propertyType || filters.category || ''}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  propertyType: e.target.value,
                  category: e.target.value,
                })
              }
              className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] transition-all bg-white pr-10 cursor-pointer"
            >
              {typeOptions.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          </div>
        </div>

        {/* LOCATION */}
        <div>
          <label
            htmlFor="land-location"
            className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1.5"
          >
            LOCATION
          </label>
          <div className="relative">
            <select
              id="land-location"
              value={filters.location || filters.city || ''}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  location: e.target.value,
                  city: e.target.value,
                })
              }
              className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] transition-all bg-white pr-10 cursor-pointer"
            >
              {locOptions.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          </div>
        </div>

        {/* ROAD */}
        <div>
          <label
            htmlFor="land-road"
            className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1.5"
          >
            ROAD
          </label>
          <div className="relative">
            <select
              id="land-road"
              value={filters.road}
              onChange={(e) =>
                onFilterChange({ ...filters, road: e.target.value })
              }
              className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] transition-all bg-white pr-10 cursor-pointer"
            >
              {rdOptions.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          </div>
        </div>

        {/* MINIMUM SIZE */}
        <div>
          <label
            htmlFor="land-min-size"
            className="block text-[11px] font-bold text-stone-600 uppercase tracking-wider mb-1.5"
          >
            MINIMUM SIZE
          </label>
          <input
            id="land-min-size"
            type="number"
            min="0"
            step="any"
            value={filters.minSize}
            onChange={(e) =>
              onFilterChange({ ...filters, minSize: e.target.value })
            }
            placeholder="Min Size in Ft."
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-800 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] transition-all bg-white"
          />
        </div>

        {/* PRICE RANGE DUAL SLIDER */}
        <div className="pt-2">
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="font-bold text-stone-700 uppercase tracking-wider">
              Price range:
            </span>
            <span className="font-semibold text-[#2563eb]">
              {formatPropertyPrice(minPrice)} to {formatPropertyPrice(maxPrice)}
            </span>
          </div>

          {/* Interactive Dual Slider Track */}
          <div className="relative h-6 flex items-center">
            {/* Background Track */}
            <div className="absolute w-full h-1.5 bg-stone-200 rounded-full" />

            {/* Active Range Highlight */}
            <div
              className="absolute h-1.5 bg-[#2563eb] rounded-full pointer-events-none transition-all duration-75"
              style={{
                left: `${minPercent}%`,
                width: `${Math.max(0, maxPercent - minPercent)}%`,
              }}
            />

            {/* Native dual range sliders */}
            <input
              type="range"
              min={MIN_PRICE_LIMIT}
              max={MAX_PRICE_LIMIT}
              step={PRICE_STEP}
              value={minPrice}
              onChange={(e) => {
                const val = Math.min(Number(e.target.value), maxPrice - PRICE_STEP)
                handlePriceChange([val, maxPrice])
              }}
              className="absolute w-full h-1.5 appearance-none bg-transparent pointer-events-auto cursor-pointer z-20 accent-[#2563eb] [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#2563eb] [&::-webkit-slider-thumb]:shadow-md"
              aria-label="Minimum price"
            />
            <input
              type="range"
              min={MIN_PRICE_LIMIT}
              max={MAX_PRICE_LIMIT}
              step={PRICE_STEP}
              value={maxPrice}
              onChange={(e) => {
                const val = Math.max(Number(e.target.value), minPrice + PRICE_STEP)
                handlePriceChange([minPrice, val])
              }}
              className="absolute w-full h-1.5 appearance-none bg-transparent pointer-events-auto cursor-pointer z-20 accent-[#2563eb] [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#2563eb] [&::-webkit-slider-thumb]:shadow-md"
              aria-label="Maximum price"
            />
          </div>
        </div>

        {/* 3. Search CTA Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-[#2563eb] hover:bg-blue-700 active:bg-blue-800 text-white font-semibold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 text-sm cursor-pointer"
          >
            <Search className="w-4 h-4" />
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  )
}
