'use client'

import React from 'react'
import {
  Waves,
  Dumbbell,
  ShieldCheck,
  Car,
  ArrowUpDown,
  Home,
  Zap,
  Trees,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'
import type { PublicProperty } from '@/lib/types/property.types'

export interface PropertyAmenitiesProps {
  property: PublicProperty
  className?: string
}

interface AmenityDisplayItem {
  id?: string
  name: string
  category?: string
  icon_key?: string
}

// Fallback baseline standard community amenities for building properties when unlinked
const BASELINE_BUILDING_AMENITIES: AmenityDisplayItem[] = [
  { name: 'Swimming Pool', icon_key: 'waves', category: 'LEISURE' },
  { name: 'Gymnasium', icon_key: 'dumbbell', category: 'FITNESS' },
  { name: '24/7 Security', icon_key: 'shield-check', category: 'SECURITY' },
  { name: 'Reserved Parking', icon_key: 'square-parking', category: 'PARKING' },
  { name: 'High-speed Lift', icon_key: 'arrow-up-down', category: 'CONVENIENCE' },
  { name: 'Club House', icon_key: 'home', category: 'COMMUNITY' },
  { name: 'Power Backup', icon_key: 'zap', category: 'INFRASTRUCTURE' },
  { name: 'Playground', icon_key: 'trees', category: 'RECREATION' },
]

function getAmenityIcon(iconKey?: string, name?: string) {
  const key = (iconKey || '').toLowerCase()
  const n = (name || '').toLowerCase()

  if (key === 'waves' || n.includes('pool') || n.includes('swimming')) {
    return <Waves className="w-4 h-4 text-cyan-600" />
  }
  if (key === 'dumbbell' || n.includes('gym') || n.includes('fitness')) {
    return <Dumbbell className="w-4 h-4 text-emerald-600" />
  }
  if (key === 'shield-check' || n.includes('security') || n.includes('guard')) {
    return <ShieldCheck className="w-4 h-4 text-blue-600" />
  }
  if (key === 'square-parking' || key === 'car' || n.includes('parking')) {
    return <Car className="w-4 h-4 text-amber-600" />
  }
  if (key === 'arrow-up-down' || n.includes('lift') || n.includes('elevator')) {
    return <ArrowUpDown className="w-4 h-4 text-indigo-600" />
  }
  if (key === 'home' || n.includes('club') || n.includes('community')) {
    return <Home className="w-4 h-4 text-rose-600" />
  }
  if (key === 'zap' || n.includes('power') || n.includes('backup') || n.includes('generator')) {
    return <Zap className="w-4 h-4 text-yellow-500" />
  }
  if (key === 'trees' || n.includes('play') || n.includes('park') || n.includes('garden')) {
    return <Trees className="w-4 h-4 text-green-600" />
  }
  return <CheckCircle2 className="w-4 h-4 text-[#c5a880]" />
}

/**
 * Community Amenities & Facilities Section
 * Renders master amenities (Pool, Gym, Lift, Security, etc.) for building properties.
 */
export default function PropertyAmenities({
  property,
  className = '',
}: PropertyAmenitiesProps) {
  const hasAssigned = Boolean(property.amenities && property.amenities.length > 0)

  // Use assigned amenities, or fall back to standard building amenities for buildings
  const amenities: AmenityDisplayItem[] = hasAssigned
    ? property.amenities!
    : property.property_type === 'BUILDING'
    ? BASELINE_BUILDING_AMENITIES
    : []

  if (amenities.length === 0) {
    return null
  }

  return (
    <section
      className={`bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 ${className}`}
      aria-labelledby="property-amenities-heading"
    >
      <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-6">
        <div>
          <h2
            id="property-amenities-heading"
            className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight"
          >
            Amenities &amp; Facilities
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Community, lifestyle, and infrastructure facilities available at this property.
          </p>
        </div>
        <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#faf7f4] text-[#8C6D46] border border-[#c5a880]/40">
          <Sparkles className="w-3.5 h-3.5 text-[#c5a880]" />
          <span>{amenities.length} Amenities</span>
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
        {amenities.map((item, idx) => (
          <div
            key={item.id || idx}
            className="group flex items-center gap-3 p-3 sm:p-3.5 rounded-xl border border-stone-100 bg-stone-50/70 hover:bg-[#faf7f4] hover:border-[#c5a880]/50 transition-all duration-200"
          >
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-white border border-stone-200/80 shadow-2xs flex items-center justify-center shrink-0 group-hover:border-[#c5a880]/60 transition-colors">
              {getAmenityIcon(item.icon_key, item.name)}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-semibold text-stone-800 group-hover:text-[#1F0A10] truncate">
                {item.name}
              </p>
              {item.category && (
                <span className="text-[9.5px] text-stone-400 font-medium uppercase tracking-wider block truncate">
                  {item.category.replace(/_/g, ' ')}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

