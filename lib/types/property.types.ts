/**
 * Central TypeScript Domain Types & DTOs for Vizhi Infragen Public Web Portal.
 * Cross-verified 1:1 against backend models in infragen-be (Property.model.ts, database.types.ts).
 */

// ============================================================================
// 1. DOMAIN ENUMS & UNION TYPES
// ============================================================================

export type PropertyType = 'BUILDING' | 'LAND'

export type PropertyStatus =
  | 'DRAFT'
  | 'PUBLISHED'
  | 'ARCHIVED'
  | 'UNDER_CONTRACT'
  | 'SOLD'

export type AreaUnit = 'sq.ft' | 'sq.yd' | 'sq.m' | 'cents' | 'acres' | 'grounds'
export type LotSizeUnit = 'sq.ft' | 'acre' | 'cent' | 'hectare'

export type MediaType = 'IMAGE' | 'VIDEO' | 'SKETCH'
export type TravelMode = 'WALK' | 'DRIVE'

export type NearbyCategory =
  | 'SCHOOLS_COLLEGES'
  | 'HOSPITALS'
  | 'TRANSIT_HIGHWAYS'
  | 'BANKS_MARKETS'
  | 'PARKS_RECREATION'
  | 'OTHER'

export type EnquiryType =
  | 'GENERAL'
  | 'PROPERTY_ENQUIRY'
  | 'VIRTUAL_TOUR_REQUEST'
  | 'TENDER_SPECIFICATION'
  | 'SITE_VISIT'

export type EnquiryStatus =
  | 'NEW'
  | 'IN_REVIEW'
  | 'CONTACTED'
  | 'RESOLVED'
  | 'CLOSED'
  | 'SPAM'

export type PublicPropertySort =
  | 'newest'
  | 'price_asc'
  | 'price_desc'
  | 'area_desc'
  | 'oldest'


// ============================================================================
// 2. RELATIONAL SUB-ENTITIES (DEEP HYDRATION)
// ============================================================================

export interface PropertyTypologyItem {
  id?: string
  property_id?: string
  typology_name: string
  is_custom?: boolean
  created_at?: string
}

export interface PropertyRoomLayoutItem {
  id?: string
  property_id?: string
  space_name: string
  quantity: number
  is_custom?: boolean
  created_at?: string
}

export interface PropertyAmenityItem {
  id: string
  name: string
  slug?: string
  icon_key?: string
  category?: string
  sort_order?: number
}

export interface PropertyNearbyAmenityItem {
  id?: string
  property_id?: string
  name: string
  category: NearbyCategory
  distance_km: number
  travel_time: string
  travel_mode?: TravelMode | string
  latitude?: number | null
  longitude?: number | null
  icon_key?: string | null
  sort_order?: number
}

export interface PropertyMediaItem {
  id: string
  property_id?: string
  media_type: MediaType
  file_key?: string
  file_url: string
  file_name?: string
  file_size_bytes?: number | string | null
  mime_type?: string
  is_primary: boolean
  sort_order: number
  caption?: string
  created_at?: string
  updated_at?: string
}

export interface PropertySpecificationItem {
  id?: string
  property_id?: string
  field_name: string
  field_value: string
  sort_order?: number
  created_at?: string
}

export interface PropertyAnalyticsItem {
  view_count: number
  inquiry_count: number
}


// ============================================================================
// 3. CENTRAL PUBLIC PROPERTY ENTITY
// ============================================================================

export interface PublicProperty {
  id: string
  pid: string
  slug: string
  name: string
  property_type: PropertyType
  sub_type: string
  status: PropertyStatus
  description: string
  price: number | string | null
  currency: string
  is_negotiable: boolean
  is_featured: boolean
  is_verified: boolean

  // Building Attributes
  floor_current?: number | null
  floor_total?: number | null
  super_built_up_area?: number | string | null
  carpet_area?: number | string | null
  area_unit: AreaUnit

  // Land Attributes
  lot_size?: number | string | null
  lot_size_unit?: LotSizeUnit | AreaUnit | null
  road_base?: string | null
  road_width?: number | string | null
  road_width_ft?: number | string | null
  survey_number?: string | null

  // Address & Geo
  street_address?: string | null
  location: string
  city: string
  state: string
  pincode?: string | null
  latitude?: number | string | null
  longitude?: number | string | null
  google_maps_url?: string | null

  // Asset Management Contact
  manager_name?: string | null
  manager_phone?: string | null
  manager_email?: string | null
  sort_order?: number
  view_count?: number
  created_at?: string
  updated_at?: string

  // Deep Relational Associations
  typologies?: PropertyTypologyItem[]
  roomLayouts?: PropertyRoomLayoutItem[]
  amenities?: PropertyAmenityItem[]
  nearbyAmenities?: PropertyNearbyAmenityItem[]
  media?: PropertyMediaItem[]
  specifications?: PropertySpecificationItem[]
  analytics?: PropertyAnalyticsItem
}


// ============================================================================
// 4. API QUERY & PAGINATION SHAPES
// ============================================================================

export interface PublicPropertyListQuery {
  page?: number
  limit?: number
  property_type?: PropertyType
  sub_type?: string
  road_base?: string
  location?: string
  city?: string
  min_price?: number
  max_price?: number
  min_area?: number
  max_area?: number
  is_featured?: boolean
  search?: string
  sort?: PublicPropertySort
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasNextPage: boolean
  hasPrevPage: boolean
  total_pages?: number
  has_next_page?: boolean
  has_prev_page?: boolean
}

export interface PaginatedApiResponse<T> {
  success: boolean
  status_code?: number
  message: string
  data: T[]
  pagination?: PaginationMeta
  meta?: PaginationMeta
  timestamp?: string
}

export interface SingleApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export type PaginatedPropertiesResponse = PaginatedApiResponse<PublicProperty>
export type SinglePropertyResponse = SingleApiResponse<PublicProperty>


// ============================================================================
// 5. INBOUND CUSTOMER ENQUIRY & TOUR DTOs
// ============================================================================

export interface CreateEnquiryInput {
  name: string
  phone: string
  email: string
  enquiry_type?: EnquiryType
  subject: string
  message: string
  pid?: string
  scheduled_at?: string
}

export interface ScheduleTourInput {
  name: string
  phone: string
  email: string
  pid?: string
  scheduled_at: string
  subject?: string
  message?: string
}

export interface EnquiryEntity {
  id: string
  property_id?: string | null
  pid?: string | null
  name: string
  phone: string
  email: string
  enquiry_type: EnquiryType
  status: EnquiryStatus
  subject: string
  message: string
  scheduled_at?: string | null
  created_at?: string
}

export type EnquiryApiResponse = SingleApiResponse<EnquiryEntity>

export interface PublicSettingsDictionary {
  COMPANY_PHONE: string
  COMPANY_WHATSAPP: string
  COMPANY_EMAIL: string
  OFFICE_HOURS: string
  OFFICE_ADDRESS: string
  [key: string]: string
}

export type PublicSettingsResponse = SingleApiResponse<PublicSettingsDictionary>


// ============================================================================
// 6. CLIENT-SIDE SEARCH & FILTER FORM STATES
// ============================================================================

export interface BuildingFilterFormState {
  propertyId: string
  propertyType: string
  location: string
  road: string
  minSize: string
  priceRange: [number, number]
  sort: PublicPropertySort
  sizeRange: string
  status: string
}

export interface LandFilterFormState {
  propertyId: string
  propertyType: string
  category?: string
  location: string
  city?: string
  road: string
  approvals?: string[]
  minSize: string
  areaUnit?: AreaUnit
  ftRoad?: string
  priceRange: [number, number]
  sort: PublicPropertySort
  sizeRange: string
  status: string
}


// ============================================================================
// 7. UI CONSTANTS & HELPER MAPS
// ============================================================================

export const NEARBY_CATEGORY_METADATA: Record<
  NearbyCategory,
  { label: string; icon: string; dotColor: string; badgeClass: string }
> = {
  SCHOOLS_COLLEGES: {
    label: 'Schools & Colleges',
    icon: 'fa-graduation-cap',
    dotColor: '#8b5cf6', // purple
    badgeClass: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  HOSPITALS: {
    label: 'Hospitals & Healthcare',
    icon: 'fa-hospital',
    dotColor: '#0ea5e9', // cyan/teal
    badgeClass: 'bg-teal-50 text-teal-700 border-teal-200',
  },
  TRANSIT_HIGHWAYS: {
    label: 'Transit & Highways',
    icon: 'fa-road',
    dotColor: '#f97316', // orange
    badgeClass: 'bg-orange-50 text-orange-700 border-orange-200',
  },
  BANKS_MARKETS: {
    label: 'Banks & Markets',
    icon: 'fa-building-columns',
    dotColor: '#ef4444', // red
    badgeClass: 'bg-red-50 text-red-700 border-red-200',
  },
  PARKS_RECREATION: {
    label: 'Parks & Recreation',
    icon: 'fa-tree',
    dotColor: '#10b981', // emerald
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  OTHER: {
    label: 'Civic Infrastructure',
    icon: 'fa-map-pin',
    dotColor: '#64748b', // slate
    badgeClass: 'bg-slate-50 text-slate-700 border-slate-200',
  },
}

export const LAND_APPROVAL_OPTIONS = [
  'DTCP Approved',
  'RERA Approved',
  'Panchayat Approval',
  'CMDA Approved',
  'Agricultural Conversion / NOC',
] as const

