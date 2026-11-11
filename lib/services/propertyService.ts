import { apiClient } from './apiClient'
import type {
  PaginatedPropertiesResponse,
  SinglePropertyResponse,
  PublicPropertyListQuery,
  PublicProperty,
  PropertyType,
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
   * Retrieves featured properties for homepage and showcase banners.
   * Calls GET /api/v1/public/properties?is_featured=true&limit=${limit}
   */
  async getFeaturedProperties(limit = 6): Promise<PaginatedPropertiesResponse> {
    return apiClient.get<PaginatedPropertiesResponse>('/public/properties', {
      is_featured: true,
      limit,
    })
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
}

export default propertyService

