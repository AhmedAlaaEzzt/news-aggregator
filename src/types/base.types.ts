// Base error interface that other API errors extend from
export interface IApiError {
  message: string
  code?: string | number
}
