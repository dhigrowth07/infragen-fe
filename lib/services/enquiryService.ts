import { apiClient } from './apiClient'
import type {
  CreateEnquiryInput,
  ScheduleTourInput,
  EnquiryApiResponse,
} from '@/lib/types/property.types'

/**
 * Public Customer Enquiry & Tour Booking Service
 * Dispatches inquiries and virtual tour appointment requests to backend.
 */
export const enquiryService = {
  /**
   * Submits a general, property-specific, or site-visit enquiry.
   * Calls POST /api/v1/public/enquiries
   */
  async submitEnquiry(payload: CreateEnquiryInput): Promise<EnquiryApiResponse> {
    return apiClient.post<EnquiryApiResponse>('/public/enquiries', payload)
  },

  /**
   * Schedules an interactive virtual tour appointment for a property.
   * Sends enquiry_type='VIRTUAL_TOUR_REQUEST' along with ISO scheduled_at timestamp.
   * Calls POST /api/v1/public/enquiries
   */
  async scheduleTour(payload: ScheduleTourInput): Promise<EnquiryApiResponse> {
    const defaultSubject = payload.pid
      ? `Virtual Tour Booking Request for ${payload.pid}`
      : 'Virtual Tour Booking Request'

    const defaultMessage = payload.message || `Customer requested a virtual tour scheduled for ${payload.scheduled_at}`

    const body: CreateEnquiryInput = {
      name: payload.name.trim(),
      email: payload.email.trim().toLowerCase(),
      phone: payload.phone.trim(),
      pid: payload.pid,
      scheduled_at: payload.scheduled_at,
      enquiry_type: 'VIRTUAL_TOUR_REQUEST',
      subject: payload.subject || defaultSubject,
      message: defaultMessage,
    }

    return apiClient.post<EnquiryApiResponse>('/public/enquiries', body)
  },
}

export default enquiryService

