'use client'

import React from 'react'
import {
  SlidersHorizontal,
  RotateCcw,
  Search,
  ChevronDown,
} from 'lucide-react'
import type { BuildingFilterFormState } from '@/lib/types/property.types'
import { formatPropertyPrice } from '@/lib/formatters'

export const BUILDING_PROPERTY_TYPES = [
  { label: 'All Types', value: '' },
  { label: 'Gated Community', value: 'Gated Community' },
  { label: 'Home/Villa/Apartment', value: 'Home/Villa/Apartment' },
  { label: 'Residential Apartments', value: 'Residential Apartments' },
  { label: 'Residential', value: 'Residential' },
  { label: 'Commercial', value: 'Commercial' },
  { label: 'Industrial/Warehouse', value: 'Industrial/Warehouse' },
  { label: 'Dry-agri', value: 'Dry-agri' },
  { label: 'Investment', value: 'Investment' },
  { label: 'Rental Income', value: 'Rental Income' },
]

export const BUILDING_LOCATIONS = [
  { label: 'All Locations', value: '' },
  { label: 'Vadavalli', value: 'Vadavalli' },
  { label: 'Sulur', value: 'Sulur' },
  { label: 'Race Course Road', value: 'Race Course Road' },
  { label: 'Avinashi Road', value: 'Avinashi Road' },
  { label: 'Coimbatore', value: 'Coimbatore' },
]

export const BUILDING_ROADS = [
  { label: 'All Roads', value: '' },
  { label: '30ft Residential Access Road', value: '30ft Residential Access Road' },
  { label: '60ft Tar / Bitumen Main Road', value: '60ft Tar / Bitumen Main Road' },
  { label: 'Trichy - Cbe 6-Lane Expressway', value: 'Trichy - Cbe 6-Lane Expressway' },
]

export const MIN_PRICE_LIMIT = 0
export const MAX_PRICE_LIMIT = 50000000 // ₹5 Crores
export const PRICE_STEP = 500000 // ₹5 Lakhs

export interface BuildingFilterSidebarProps {
  filters: BuildingFilterFormState
  onFilterChange: (filters: BuildingFilterFormState) => void
  onSearch: () => void
  onReset: () => void
  className?: string
  propertyTypeOptions?: string[]
  locationOptions?: string[]
  roadOptions?: string[]
}

/**
 * Building Filter Sidebar Component
 * Dynamically populated from backend catalog with sensible fallback options.
 */
export default function BuildingFilterSidebar({
  filters,
  onFilterChange,
  onSearch,
  onReset,
  className = '',
  propertyTypeOptions,
  locationOptions,
  roadOptions,
}: BuildingFilterSidebarProps) {
  const typeOptions = React.useMemo(() => {
    if (propertyTypeOptions && propertyTypeOptions.length > 0) {
      return [
        { label: 'All Types', value: '' },
        ...propertyTypeOptions.map((t) => ({ label: t, value: t })),
      ]
    }
    return BUILDING_PROPERTY_TYPES
  }, [propertyTypeOptions])

  const locOptions = React.useMemo(() => {
    if (locationOptions && locationOptions.length > 0) {
      return [
        { label: 'All Locations', value: '' },
        ...locationOptions.map((loc) => ({ label: loc, value: loc })),
      ]
    }
    return BUILDING_LOCATIONS
  }, [locationOptions])

  const rdOptions = React.useMemo(() => {
    if (roadOptions && roadOptions.length > 0) {
      return [
        { label: 'All Roads', value: '' },
        ...roadOptions.map((rd) => ({ label: rd, value: rd })),
      ]
    }
    return BUILDING_ROADS
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
      <div className="flex items-center justify-between pb-5 border-b border-stone-100">
        <div className="flex items-center gap-2 text-stone-900 font-bold text-base md:text-lg">
          <SlidersHorizontal className="w-5 h-5 text-[#612124]" />
          <span>Property Search</span>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-500 hover:text-[#612124] transition-colors py-1 px-2 rounded-md hover:bg-stone-50 cursor-pointer"
          title="Reset all filters"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Clear Filters</span>
        </button>
      </div>

      {/* 2. Filter Form */}
      <form onSubmit={handleSubmit} className="mt-5 space-y-4">
        {/* PROPERTY ID */}
        <div>
          <label
            htmlFor="sidebar-property-id"
            className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5"
          >
            Property ID
          </label>
          <input
            id="sidebar-property-id"
            type="text"
            value={filters.propertyId}
            onChange={(e) =>
              onFilterChange({ ...filters, propertyId: e.target.value })
            }
            placeholder="Type ID"
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-800 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] transition-all bg-stone-50/50"
          />
        </div>

        {/* PROPERTY TYPE */}
        <div>
          <label
            htmlFor="sidebar-property-type"
            className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5"
          >
            Property Type
          </label>
          <div className="relative">
            <select
              id="sidebar-property-type"
              value={filters.propertyType}
              onChange={(e) =>
                onFilterChange({ ...filters, propertyType: e.target.value })
              }
              className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] transition-all bg-stone-50/50 pr-10 cursor-pointer"
            >
              {typeOptions.map((pt) => (
                <option key={pt.value} value={pt.value}>
                  {pt.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          </div>
        </div>

        {/* LOCATION */}
        <div>
          <label
            htmlFor="sidebar-location"
            className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5"
          >
            Location
          </label>
          <div className="relative">
            <select
              id="sidebar-location"
              value={filters.location}
              onChange={(e) =>
                onFilterChange({ ...filters, location: e.target.value })
              }
              className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] transition-all bg-stone-50/50 pr-10 cursor-pointer"
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
            htmlFor="sidebar-road"
            className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5"
          >
            Road
          </label>
          <div className="relative">
            <select
              id="sidebar-road"
              value={filters.road}
              onChange={(e) =>
                onFilterChange({ ...filters, road: e.target.value })
              }
              className="w-full appearance-none px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] transition-all bg-stone-50/50 pr-10 cursor-pointer"
            >
              {rdOptions.map((road) => (
                <option key={road.value} value={road.value}>
                  {road.label}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400 pointer-events-none" />
          </div>
        </div>

        {/* MINIMUM SIZE */}
        <div>
          <label
            htmlFor="sidebar-min-size"
            className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5"
          >
            Minimum Size
          </label>
          <input
            id="sidebar-min-size"
            type="number"
            min="0"
            value={filters.minSize}
            onChange={(e) =>
              onFilterChange({ ...filters, minSize: e.target.value })
            }
            placeholder="Min Size in Ft."
            className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-stone-800 text-sm placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-[#2563eb]/20 focus:border-[#2563eb] transition-all bg-stone-50/50"
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

          <div className="relative h-6 flex items-center">
            {/* Background Track */}
            <div className="relative h-2 w-full rounded-full bg-stone-200">
              {/* Active Highlight Track */}
              <div
                className="absolute h-2 rounded-full bg-[#2563eb]"
                style={{
                  left: `${minPercent}%`,
                  width: `${Math.max(0, maxPercent - minPercent)}%`,
                }}
              />
            </div>

            {/* Min Range Input */}
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
              className="pointer-events-none absolute inset-x-0 h-2 w-full appearance-none bg-transparent accent-[#2563eb] cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#2563eb] [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#2563eb]"
              aria-label="Minimum price"
            />

            {/* Max Range Input */}
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
              className="pointer-events-none absolute inset-x-0 h-2 w-full appearance-none bg-transparent accent-[#2563eb] cursor-pointer [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-[#2563eb] [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-[#2563eb]"
              aria-label="Maximum price"
            />
          </div>
        </div>

        {/* 3. Search CTA Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-[#2563eb] hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
          >
            <Search className="w-4 h-4 shrink-0" />
            <span>Search</span>
          </button>
        </div>
      </form>
    </div>
  )
}

