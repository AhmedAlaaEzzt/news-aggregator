import axios, { AxiosInstance, AxiosError } from 'axios'
import type { INewsApiError, IGuardianApiError, INYTimesApiError } from '../types'
import { ApiConfig, API_CONFIGS } from './config'

// Custom error handler type
type ErrorHandler = (error: AxiosError, apiName: string) => void

// Helper function to extract error message based on API type
const getErrorMessage = (error: AxiosError, apiName: string): string => {
  if (!error.response?.data) return error.message

  switch (apiName) {
    case 'News API': {
      const apiError = error.response.data as INewsApiError
      return `${apiError.status}: ${apiError.message}`
    }
    case 'Guardian API': {
      const apiError = error.response.data as IGuardianApiError
      return `${apiError.response.status}: ${apiError.response.message}`
    }
    case 'NY Times API': {
      const apiError = error.response.data as INYTimesApiError
      return `${apiError.fault.detail.errorcode}: ${apiError.fault.faultstring}`
    }
    default:
      return 'Unknown API error'
  }
}

const defaultErrorHandler: ErrorHandler = (error, apiName) => {
  if (error.response) {
    // API responded with an error
    const errorMessage = getErrorMessage(error, apiName)
    console.error(`${apiName} Error:`, errorMessage)
  } else if (error.request) {
    // Network error (no response received)
    console.error(`${apiName} Network Error:`, error.request)
  } else {
    // Request setup error
    console.error(`${apiName} Request Error:`, error.message)
  }
}

// Private factory function for creating API instances
const createApiInstance = (
  config: ApiConfig,
  customErrorHandler: ErrorHandler = defaultErrorHandler
): AxiosInstance => {
  const instance = axios.create(config)

  // Add response interceptor for error handling
  instance.interceptors.response.use(
    response => response,
    error => {
      customErrorHandler(error, config.name)
      return Promise.reject(error)
    }
  )

  // Add retry mechanism for failed requests
  if (config.retryAttempts && config.retryAttempts > 0) {
    let retryCount = 0
    instance.interceptors.response.use(
      response => response,
      async error => {
        if (retryCount < (config.retryAttempts || 0) && error.response?.status >= 500) {
          retryCount++
          return instance(error.config)
        }
        return Promise.reject(error)
      }
    )
  }

  return instance
}

// Export API instances
export const newsApi = createApiInstance(API_CONFIGS.newsApi)
export const guardianApi = createApiInstance(API_CONFIGS.guardianApi)
export const nytimesApi = createApiInstance(API_CONFIGS.nytimesApi)
