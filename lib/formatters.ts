import type { PublicProperty } from './types/property.types'

/**
 * Currency & Price Formatter
 * Formats property price into INR (₹) or USD ($) with appropriate locale commas.
 */
export function formatPropertyPrice(
  price: number | string | null | undefined,
  currency = 'INR'
): string {
  if (price === null || price === undefined || price === '') {
    return 'Price on Request'
  }
  const numericPrice = Number(price)
  if (isNaN(numericPrice) || numericPrice <= 0) {
    return 'Price on Request'
  }
  const curr = currency?.toUpperCase() || 'INR'
  if (curr === 'USD') {
    return `$${numericPrice.toLocaleString('en-US')}`
  }
  return `₹${numericPrice.toLocaleString('en-IN')}`
}

/**
 * Area & Size Formatter
 * Formats numeric area with appropriate unit symbol.
 */
export function formatArea(
  area: number | string | null | undefined,
  unit = 'sq.ft'
): string {
  if (area === null || area === undefined || area === '') {
    return 'N/A'
  }
  const numericArea = Number(area)
  if (isNaN(numericArea) || numericArea <= 0) {
    return 'N/A'
  }
  return `${numericArea.toLocaleString('en-IN')} ${unit}`
}

/**
 * Extracts bedroom count from roomLayouts or typologies.
 */
export function extractBedrooms(property: PublicProperty): number | null {
  if (property.roomLayouts && property.roomLayouts.length > 0) {
    const bedItem = property.roomLayouts.find((r) =>
      /bed|bedroom/i.test(r.space_name)
    )
    if (bedItem && bedItem.quantity > 0) return bedItem.quantity
  }

  if (property.typologies && property.typologies.length > 0) {
    for (const t of property.typologies) {
      const match = t.typology_name.match(/(\d+)\s*(?:bhk|bed)/i)
      if (match) return parseInt(match[1], 10)
    }
  }

  return null
}

/**
 * Extracts bathroom count from roomLayouts, specifications, or typology estimates.
 */
export function extractBathrooms(property: PublicProperty): number | null {
  if (property.roomLayouts && property.roomLayouts.length > 0) {
    const bathItem = property.roomLayouts.find((r) =>
      /bath|bathroom|toilet|washroom/i.test(r.space_name)
    )
    if (bathItem && bathItem.quantity > 0) return bathItem.quantity
  }

  // Fallback 1: check specifications
  if (property.specifications && property.specifications.length > 0) {
    const spec = property.specifications.find((s) =>
      /bath|bathroom|toilet/i.test(s.field_name)
    )
    if (spec?.field_value) {
      const parsed = parseInt(spec.field_value, 10)
      if (!isNaN(parsed) && parsed > 0) return parsed
    }
  }

  // Fallback 2: Estimate from residential bedroom count if applicable
  if (property.property_type === 'BUILDING') {
    const beds = extractBedrooms(property)
    if (beds !== null && beds > 0) {
      return beds === 1 ? 1 : Math.max(2, beds <= 2 ? 2 : beds - 1)
    }
  }

  return null
}

/**
 * Resolves primary display image URL with designated fallback images.
 */
export function getPrimaryPropertyImage(property: PublicProperty): string {
  if (property.media && property.media.length > 0) {
    const primary = property.media.find(
      (m) => m.is_primary && m.media_type === 'IMAGE' && Boolean(m.file_url)
    )
    if (primary?.file_url) return primary.file_url

    const anyImage = property.media.find(
      (m) => m.media_type === 'IMAGE' && Boolean(m.file_url)
    )
    if (anyImage?.file_url) return anyImage.file_url

    const firstValid = property.media.find(
      (m) => m.media_type === 'IMAGE' && Boolean(m.file_url)
    )
    if (firstValid?.file_url) return firstValid.file_url
  }

  if (property.property_type === 'LAND') {
    return '/assets/images/land-hero-img.png'
  }

  return '/assets/images/building-hero-img.png'
}

/**
 * Extracts governmental or planning approval badge for land properties
 * (e.g. DTCP, RERA, CMDA, Panchayat, or Approved).
 */
export function extractLandApproval(property: PublicProperty): string {
  if (property.specifications && property.specifications.length > 0) {
    const approvalSpec = property.specifications.find((s) =>
      /approval|authority|sanction|dtcp|rera|cmda|panchayat/i.test(s.field_name)
    )
    if (approvalSpec?.field_value) {
      const val = approvalSpec.field_value.trim().toUpperCase()
      if (val.includes('DTCP')) return 'DTCP'
      if (val.includes('RERA')) return 'RERA'
      if (val.includes('CMDA')) return 'CMDA'
      if (val.includes('PANCHAYAT')) return 'Panchayat'
      return approvalSpec.field_value.trim().slice(0, 10)
    }
  }

  if (property.sub_type) {
    const st = property.sub_type.toUpperCase()
    if (st.includes('DTCP')) return 'DTCP'
    if (st.includes('RERA')) return 'RERA'
    if (st.includes('CMDA')) return 'CMDA'
    if (st.includes('PANCHAYAT')) return 'Panchayat'
  }

  const combined = `${property.name} ${property.description || ''}`.toUpperCase()
  if (combined.includes('DTCP')) return 'DTCP'
  if (combined.includes('RERA')) return 'RERA'
  if (combined.includes('CMDA')) return 'CMDA'
  if (combined.includes('PANCHAYAT')) return 'Panchayat'

  return '—'
}

/**
 * Extracts road width access description (e.g. "40ft Rd").
 */
export function extractRoadWidth(property: PublicProperty): string {
  if (property.road_width_ft && Number(property.road_width_ft) > 0) {
    return `${Math.round(Number(property.road_width_ft))}ft Rd`
  }
  if (property.road_width && Number(property.road_width) > 0) {
    return `${Math.round(Number(property.road_width))}ft Rd`
  }
  if (property.road_base) {
    const match = property.road_base.match(/(\d+)\s*(?:ft|feet)?/i)
    if (match) return `${match[1]}ft Rd`
  }
  return '—'
}

/**
 * Formats land extent into clean acreage or cent notation (e.g. "4.8 Ac", "12 Cents", "100 sq.ft", "11 sq.m").
 */
export function formatLandExtent(property: PublicProperty): string {
  if (property.lot_size && Number(property.lot_size) > 0) {
    const num = Number(property.lot_size)
    const unit = String(property.lot_size_unit || property.area_unit || '').toLowerCase().trim()
    let unitLabel = property.lot_size_unit || 'Ac'
    if (unit.includes('acre')) unitLabel = 'Ac'
    else if (unit.includes('cent')) unitLabel = 'Cents'
    else if (unit.includes('hectare')) unitLabel = 'Ha'
    else if (unit.includes('sq.m') || unit.includes('sqm')) unitLabel = 'sq.m'
    else if (unit.includes('sq.yd') || unit.includes('sqyd')) unitLabel = 'sq.yd'
    else if (unit.includes('sq.ft') || unit.includes('sqft')) unitLabel = 'sq.ft'
    else if (unit.includes('ground')) unitLabel = 'Gr'
    return `${num.toLocaleString('en-IN')} ${unitLabel}`
  }

  if (property.super_built_up_area && Number(property.super_built_up_area) > 0) {
    const num = Number(property.super_built_up_area)
    const unit = String(property.area_unit || 'sq.ft').toLowerCase().trim()
    let unitLabel = property.area_unit || 'sq.ft'
    if (unit.includes('sq.ft') || unit.includes('sqft')) unitLabel = 'sq.ft'
    else if (unit.includes('sq.m') || unit.includes('sqm')) unitLabel = 'sq.m'
    else if (unit.includes('sq.yd') || unit.includes('sqyd')) unitLabel = 'sq.yd'
    return `${num.toLocaleString('en-IN')} ${unitLabel}`
  }

  return '—'
}

/**
 * Resolves appropriate price unit suffix for land parcel display.
 * Suffix like "/ sq. ft." is shown when the property price represents a rate.
 * For lump sum property totals (>= 1,00,000 INR), no redundant suffix is displayed.
 */
export function resolveLandPriceSuffix(property: PublicProperty): string {
  const numPrice = Number(property.price)
  const unit = String(property.lot_size_unit || property.area_unit || '').toLowerCase().trim()

  if (unit.includes('acre')) return '/ Acre'
  if (unit.includes('cent')) return '/ Cent'
  if (unit.includes('ground')) return '/ Ground'

  if (unit.includes('sq.m') || unit.includes('sqm')) {
    if (isNaN(numPrice) || numPrice < 100000) return '/ sq. m'
    return ''
  }

  if (unit.includes('sq.ft') || unit.includes('sqft')) {
    if (isNaN(numPrice) || numPrice < 100000) return '/ sq. ft.'
    return ''
  }

  return ''
}
