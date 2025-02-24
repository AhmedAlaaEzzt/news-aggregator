import { IApiError } from '../base.types'

export interface IGuardianArticle {
  id: string
  type: string
  sectionId: string
  sectionName: string
  webPublicationDate: string
  webTitle: string
  webUrl: string
  apiUrl: string
  fields?: {
    trailText?: string
    thumbnail?: string
  }
  isHosted: boolean
  pillarId: string
  pillarName: string
}

export interface IGuardianResponse {
  response: {
    status: string
    userTier: string
    total: number
    startIndex: number
    pageSize: number
    currentPage: number
    pages: number
    orderBy: string
    results: IGuardianArticle[]
  }
}

export interface IGuardianApiError extends IApiError {
  response: {
    status: string
    message: string
  }
}

export interface IGuardianApiParams {
  q?: string
  section?: string
  page?: number
  'page-size'?: number
  orderBy?: string
}

export interface IGuardianParams {
  q: string
  'page-size'?: number
  'order-by'?: string
  'show-fields'?: string
  'from-date'?: string
  'to-date'?: string
}
