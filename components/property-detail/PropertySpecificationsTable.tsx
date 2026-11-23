'use client'

import { MapPin, ExternalLink, Phone, Mail, User } from 'lucide-react'
import type { PublicProperty } from '@/lib/types/property.types'
import {
  extractLandApproval,
  extractBedrooms,
  extractBathrooms,
} from '@/lib/formatters'

export interface PropertySpecificationsTableProps {
  property: PublicProperty
  className?: string
}

interface SpecRow {
  label: string
  value: React.ReactNode
}

/**
 * Dynamic Specifications Grid
 * Strictly matching reference-ui/property - details - page.png (Slice 2):
 * - Heading: "Additional Details"
 * - Alternating 2-column zebra-striped key-value table
 * - Hydrated dynamically from property.specifications with fallback synthesis
 */
export default function PropertySpecificationsTable({
  property,
  className = '',
}: PropertySpecificationsTableProps) {
  const specs: SpecRow[] = []

  // 1. Add specifications from relational backend table
  if (property.specifications && property.specifications.length > 0) {
    for (const s of property.specifications) {
      if (s.field_name && s.field_value) {
        specs.push({
          label: s.field_name.endsWith(':') ? s.field_name : `${s.field_name}:`,
          value: s.field_value,
        })
      }
    }
  }

  // 2. Synthesize baseline domain specifications if relational array is small
  const existingLabels = new Set(specs.map((s) => s.label.toLowerCase()))

  const addIfMissing = (
    label: string,
    value: React.ReactNode,
    options?: { href?: string }
  ) => {
    if (value === null || value === undefined || value === '—' || (typeof value === 'string' && value.trim() === '')) return
    const key = `${label}:`.toLowerCase()
    if (!existingLabels.has(key)) {
      if (options?.href) {
        specs.push({
          label: `${label}:`,
          value: (
            <a
              href={options.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-stone-900 font-semibold hover:text-[#0d9488] transition-colors group underline underline-offset-4 decoration-stone-300 hover:decoration-[#0d9488]"
            >
              <MapPin className="w-3.5 h-3.5 text-[#0d9488] shrink-0" />
              <span>{value}</span>
              <ExternalLink className="w-3.5 h-3.5 text-stone-400 group-hover:text-[#0d9488] transition-colors shrink-0" />
            </a>
          ),
        })
      } else {
        specs.push({ label: `${label}:`, value })
      }
      existingLabels.add(key)
    }
  }

  addIfMissing('Property Type', property.property_type === 'BUILDING' ? 'Building Development' : 'Land & Plots')
  addIfMissing('Category / Sub-Type', property.sub_type)
  
  if (property.typologies && property.typologies.length > 0) {
    const typoNames = property.typologies.map((t) => t.typology_name).join(', ')
    addIfMissing('Typology / Configuration', typoNames)
  }

  if (property.property_type === 'BUILDING') {
    const beds = extractBedrooms(property)
    if (beds !== null && beds > 0) {
      addIfMissing('Bedrooms', `${beds} ${beds === 1 ? 'Bedroom' : 'Bedrooms'}`)
    }
    const baths = extractBathrooms(property)
    if (baths !== null && baths > 0) {
      addIfMissing('Bathrooms', `${baths} ${baths === 1 ? 'Bathroom' : 'Bathrooms'}`)
    }
    if (property.super_built_up_area) {
      addIfMissing('Super Built-Up Area', `${property.super_built_up_area} ${property.area_unit || 'sq.ft'}`)
    }
    if (property.carpet_area) {
      addIfMissing('Carpet Area', `${property.carpet_area} ${property.area_unit || 'sq.ft'}`)
    }
    if (property.floor_current !== null && property.floor_current !== undefined) {
      addIfMissing(
        'Floor Level',
        property.floor_total
          ? `Floor ${property.floor_current} of ${property.floor_total}`
          : `Floor ${property.floor_current}`
      )
    }
    addIfMissing('Balconies', property.roomLayouts?.find((r) => /balcon/i.test(r.space_name))?.quantity)
  } else {
    if (property.lot_size) {
      addIfMissing('Lot Size', `${property.lot_size} ${property.lot_size_unit || property.area_unit || 'sq.ft'}`)
    }
    const approval = extractLandApproval(property)
    if (approval && approval !== '—') {
      addIfMissing('Planning Approval', approval)
    }
    if (property.road_width) {
      addIfMissing('Road Width', `${property.road_width} Feet`)
    }
    addIfMissing('Road Frontage', property.road_base)
    addIfMissing('Revenue Survey No', property.survey_number)
  }

  const locationParts: string[] = []
  for (const part of [property.location, property.city, property.state].filter(Boolean) as string[]) {
    const trimmed = part.trim()
    if (trimmed && !locationParts.some((p) => p.toLowerCase() === trimmed.toLowerCase())) {
      locationParts.push(trimmed)
    }
  }
  const locationText = locationParts.join(', ')
  if (locationText) {
    addIfMissing('Location / Zone', locationText)
  }

  if (property.google_maps_url) {
    addIfMissing('Google Maps', 'View on Google Maps', { href: property.google_maps_url })
  }

  if (property.is_verified) {
    addIfMissing('Verification Status', 'Verified & Legally Vetted')
  }
  if (property.status === 'PUBLISHED') {
    addIfMissing('Ownership Status', 'Clear Title (Ready for Registration)')
  } else if (property.status) {
    addIfMissing('Ownership Status', property.status)
  }
  addIfMissing('Postal Code', property.pincode)

  // Asset Manager / Owner Contact Details from Admin Panel
  const managerName = property.manager_name?.trim() || 'Vizhi Infragen Asset Desk'
  const managerPhone = property.manager_phone?.trim() || '+91 96888 89420'
  const managerEmail = property.manager_email?.trim() || 'admin@vizhiinfragenrealtors.com'

  addIfMissing(
    'Asset Manager',
    <div className="flex items-center gap-2">
      <User className="w-3.5 h-3.5 text-[#0d9488] shrink-0" />
      <span className="font-semibold text-stone-900">{managerName}</span>
    </div>
  )

  addIfMissing(
    'Manager Contact',
    <a
      href={`tel:${managerPhone}`}
      className="inline-flex items-center gap-1.5 text-stone-900 font-semibold hover:text-[#0d9488] transition-colors group underline underline-offset-4 decoration-stone-300 hover:decoration-[#0d9488]"
    >
      <Phone className="w-3.5 h-3.5 text-[#0d9488] shrink-0" />
      <span>{managerPhone}</span>
    </a>
  )

  addIfMissing(
    'Manager Email',
    <a
      href={`mailto:${managerEmail}`}
      className="inline-flex items-center gap-1.5 text-stone-900 font-semibold hover:text-[#0d9488] transition-colors group underline underline-offset-4 decoration-stone-300 hover:decoration-[#0d9488]"
    >
      <Mail className="w-3.5 h-3.5 text-[#0d9488] shrink-0" />
      <span>{managerEmail}</span>
    </a>
  )

  if (specs.length === 0) {
    return null
  }

  return (
    <section
      className={`bg-white rounded-2xl border border-stone-200/90 shadow-sm p-6 sm:p-8 ${className}`}
      aria-labelledby="property-additional-details-heading"
    >
      <h2
        id="property-additional-details-heading"
        className="text-xl sm:text-2xl font-bold text-stone-900 tracking-tight pb-4 border-b border-stone-100"
      >
        Additional Details
      </h2>

      <div className="mt-5 overflow-hidden rounded-xl border border-stone-100 divide-y divide-stone-100">
        {specs.map((row, idx) => {
          const isZebra = idx % 2 === 0
          return (
            <div
              key={idx}
              className={`flex flex-col sm:flex-row sm:items-center justify-between px-4 sm:px-6 py-3.5 text-sm transition-colors ${
                isZebra ? 'bg-stone-50/70' : 'bg-white'
              }`}
            >
              <span className="font-bold text-stone-800 sm:w-1/3 shrink-0">
                {row.label}
              </span>
              <span className="text-stone-600 sm:w-2/3 mt-0.5 sm:mt-0 font-medium">
                {row.value}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

