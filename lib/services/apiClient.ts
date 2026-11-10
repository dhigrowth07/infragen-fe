/**
 * Central HTTP Client for Vizhi Infragen Public Web Portal.
 * Connects to the Express 5 backend API at http://localhost:5001/api/v1/public.
 */

import { envConfig } from '@/lib/envConfig'

export class ApiClientError extends Error {
  statusCode: number
  data?: unknown

  constructor(message: string, statusCode = 500, data?: unknown) {
    super(message)
    this.name = 'ApiClientError'
    this.statusCode = statusCode
    this.data = data
  }
}

export interface RequestOptions extends RequestInit {
  params?: Record<string, unknown>
  timeoutMs?: number
}

/**
 * Builds clean query string omitting undefined, null, or empty string values.
 */
function buildQueryString(params?: Record<string, unknown>): string {
  if (!params) return ''

  const searchParams = new URLSearchParams()

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === '') {
      continue
    }

    if (Array.isArray(value)) {
      value.forEach((val) => {
        if (val !== undefined && val !== null && val !== '') {
          searchParams.append(key, String(val))
        }
      })
    } else {
      searchParams.append(key, String(value))
    }
  }

  const qs = searchParams.toString()
  return qs ? `?${qs}` : ''
}

/**
 * Core HTTP Request Runner
 */
async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { params, timeoutMs = 25000, headers, ...restOptions } = options

  const baseUrl = envConfig.apiBaseUrl.replace(/\/+$/, '')
  let cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  if (baseUrl.endsWith('/public') && cleanEndpoint.startsWith('/public/')) {
    cleanEndpoint = cleanEndpoint.replace(/^\/public/, '')
  }
  const queryString = buildQueryString(params)
  const fullUrl = `${baseUrl}${cleanEndpoint}${queryString}`

  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs)

  try {
    const res = await fetch(fullUrl, {
      ...restOptions,
      signal: controller.signal,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        ...headers,
      },
    })

    clearTimeout(timeoutId)

    let responseData: unknown = null
    const contentType = res.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      responseData = await res.json()
    } else {
      const text = await res.text()
      responseData = { message: text }
    }

    if (!res.ok) {
      let errorMsg = `HTTP Request failed with status ${res.status} (${res.statusText})`
      if (responseData && typeof responseData === 'object') {
        const errorRecord = responseData as Record<string, unknown>

        // Prioritize detailed validation error messages if available (e.g. backend validation errors)
        if (Array.isArray(errorRecord.errors) && errorRecord.errors.length > 0) {
          const detailMsgs = errorRecord.errors
            .map((e: unknown) => {
              if (typeof e === 'string') return e
              if (
                e &&
                typeof e === 'object' &&
                'message' in e &&
                typeof (e as { message: unknown }).message === 'string'
              ) {
                return (e as { message: string }).message
              }
              return null
            })
            .filter(Boolean) as string[]

          if (detailMsgs.length > 0) {
            errorMsg = detailMsgs.join('. ')
          } else if (typeof errorRecord.message === 'string') {
            errorMsg = errorRecord.message
          }
        } else if (
          errorRecord.errors &&
          typeof errorRecord.errors === 'object' &&
          !Array.isArray(errorRecord.errors)
        ) {
          const detailMsgs = Object.values(errorRecord.errors as Record<string, unknown>)
            .filter((v): v is string => typeof v === 'string')
          if (detailMsgs.length > 0) {
            errorMsg = detailMsgs.join('. ')
          } else if (typeof errorRecord.message === 'string') {
            errorMsg = errorRecord.message
          }
        } else if (typeof errorRecord.message === 'string') {
          errorMsg = errorRecord.message
        } else if (typeof errorRecord.error === 'string') {
          errorMsg = errorRecord.error
        }
      }
      throw new ApiClientError(errorMsg, res.status, responseData)
    }

    return responseData as T
  } catch (err: unknown) {
    clearTimeout(timeoutId)

    if (err instanceof ApiClientError) {
      throw err
    }

    if (err instanceof Error && err.name === 'AbortError') {
      throw new ApiClientError(
        `API request to ${cleanEndpoint} timed out after ${timeoutMs}ms`,
        408
      )
    }

    const fallbackMsg = err instanceof Error ? err.message : 'Unknown network failure'
    throw new ApiClientError(
      `Network connection failed connecting to Vizhi Infragen API: ${fallbackMsg}`,
      503
    )
  }
}

export const apiClient = {
  get: <T>(endpoint: string, params?: Record<string, unknown>, options?: RequestOptions) =>
    request<T>(endpoint, { method: 'GET', params, ...options }),

  post: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),

  put: <T>(endpoint: string, body?: unknown, options?: RequestOptions) =>
    request<T>(endpoint, {
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
      ...options,
    }),

  delete: <T>(endpoint: string, options?: RequestOptions) =>
    request<T>(endpoint, { method: 'DELETE', ...options }),
}

export default apiClient

