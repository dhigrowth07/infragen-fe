import { apiClient } from './apiClient'
import type { PublicSettingsResponse } from '@/lib/types/property.types'

/**
 * Public Settings Service
 * Retrieves public platform contact phone numbers, WhatsApp, corporate office address, and hours.
 */
export const settingsService = {
  /**
   * Retrieves public site configuration and corporate contact dictionary.
   * Calls GET /api/v1/public/settings
   */
  async getPublicSettings(): Promise<PublicSettingsResponse> {
    return apiClient.get<PublicSettingsResponse>('/public/settings')
  },
}

export default settingsService

