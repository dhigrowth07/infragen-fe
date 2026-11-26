import { apiClient } from './apiClient'
import type {
  PaginatedPropertiesResponse,
  SinglePropertyResponse,
  PublicPropertyListQuery,
  PublicProperty,
  PropertyType,
  PropertyFilterOptions,
  FilterOptionsResponse,
} from '@/lib/types/property.types'

/**
 * Public Property Service
 * Handles property catalog listing, filtering, deep-hydrated dossier retrieval,
 * featured properties, and similar property recommendations.
 */
export const propertyService = {
  /**
   * Retrieves paginated property catalog matching search facets & filters.
   * Calls GET /api/v1/public/properties
   */
  async getProperties(
    params: PublicPropertyListQuery = {}
  ): Promise<PaginatedPropertiesResponse> {
    return apiClient.get<PaginatedPropertiesResponse>('/public/properties', params as Record<string, unknown>)
  },

  /**
   * Retrieves complete property dossier with room layouts, typologies,
   * amenities, nearby amenities, media, and specifications by unique URL slug.
   * Calls GET /api/v1/public/properties/:slug
   */
  async getPropertyBySlug(slug: string): Promise<SinglePropertyResponse> {
    const encodedSlug = encodeURIComponent(slug)
    return apiClient.get<SinglePropertyResponse>(`/public/properties/${encodedSlug}`)
  },

  /**
   * Retrieves featured properties for homepage, showcase banners, or property type filters.
   * Calls GET /api/v1/public/properties?is_featured=true&limit=${limit}
   */
  async getFeaturedProperties(
    limit = 6,
    propertyType?: PropertyType
  ): Promise<PaginatedPropertiesResponse> {
    const params: Record<string, unknown> = {
      is_featured: true,
      limit,
    }
    if (propertyType) {
      params.property_type = propertyType
    }
    return apiClient.get<PaginatedPropertiesResponse>('/public/properties', params)
  },

  /**
   * Retrieves similar/recommended properties sharing the same property type,
   * excluding the currently viewed property.
   */
  async getSimilarProperties(
    type: PropertyType,
    currentSlug: string,
    limit = 3
  ): Promise<PublicProperty[]> {
    try {
      const response = await apiClient.get<PaginatedPropertiesResponse>('/public/properties', {
        property_type: type,
        limit: limit + 2,
      })

      const list = response.data || []
      return list.filter((p) => p.slug !== currentSlug).slice(0, limit)
    } catch {
      return []
    }
  },

  /**
   * Retrieves dynamic filter options (property sub-types, locations, roads)
   * matching real property catalog in the database.
   * Calls GET /api/v1/public/properties/filter-options
   */
  async getFilterOptions(
    propertyType?: PropertyType
  ): Promise<PropertyFilterOptions> {
    try {
      const params: Record<string, unknown> = {}
      if (propertyType) {
        params.property_type = propertyType
      }
      const response = await apiClient.get<FilterOptionsResponse>(
        '/public/properties/filter-options',
        params
      )
      return (
        response.data || {
          property_types: [],
          propertyTypes: [],
          locations: [],
          roads: [],
        }
      )
    } catch (err) {
      console.error('Failed to load filter options:', err)
      return {
        property_types: [],
        propertyTypes: [],
        locations: [],
        roads: [],
      }
    }
  },
}

export default propertyService

