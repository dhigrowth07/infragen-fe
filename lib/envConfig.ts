/**
 * Central Environment Configuration for Vizhi Infragen Public Web Portal.
 * Provides safe defaults and type-safe access to environment variables.
 */

export const envConfig = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001/api/v1',
  publicSiteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  defaultCurrency: process.env.NEXT_PUBLIC_DEFAULT_CURRENCY || 'INR',
  defaultCity: process.env.NEXT_PUBLIC_DEFAULT_CITY || 'Coimbatore',
  defaultState: process.env.NEXT_PUBLIC_DEFAULT_STATE || 'Tamil Nadu',
} as const

export default envConfig

