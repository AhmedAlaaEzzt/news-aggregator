import { IApiError } from '../base.types'
import { TNewsCategory } from '../unified.types'

interface INewsArticle {
  source: {
    id: string | null
    name: string
  }
  author: string | null
  title: string
  description: string | null
  url: string
  urlToImage: string | null
  publishedAt: string
  content: string | null
}

export interface INewsResponse {
  status: string
  totalResults: number
  articles: INewsArticle[]
}

export interface INewsApiError extends IApiError {
  status: string
}

export interface INewsApiParams {
  q?: string
  category?: TNewsCategory
  country?: string
  language?: string
  page?: number
  pageSize?: number
}
