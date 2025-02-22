import { AxiosRequestConfig } from 'axios'

export interface ApiConfig extends AxiosRequestConfig {
  name: string
  retryAttempts?: number
  timeout?: number
}

export const API_CONFIGS: Record<string, ApiConfig> = {
  newsApi: {
    name: 'News API',
    baseURL: import.meta.env.VITE_NEWS_API_BASE_URL,
    headers: {
      'X-Api-Key': import.meta.env.VITE_NEWS_API_KEY,
    },
    timeout: 10000,
    retryAttempts: 3,
  },
  guardianApi: {
    name: 'Guardian API',
    baseURL: import.meta.env.VITE_GUARDIAN_API_BASE_URL,
    timeout: 10000,
    retryAttempts: 3,
  },
  nytimesApi: {
    name: 'NY Times API',
    baseURL: import.meta.env.VITE_NYTIMES_API_BASE_URL,
    timeout: 10000,
    retryAttempts: 3,
  },
}
