// Unified news item interface that all APIs will map to
export interface IUnifiedNewsItem {
  id: string
  title: string
  description: string | null
  source: string
  imageUrl: string | null
  url: string
  publishedAt: string
  category?: string
}

export type TNewsCategory =
  | 'business'
  | 'entertainment'
  | 'general'
  | 'health'
  | 'science'
  | 'sports'
  | 'technology'
  | 'politics'
  | 'world'
  | 'other'

export interface IDateFilter {
  startDate?: string
  endDate?: string
}

export interface IUnifiedNewsParams extends IDateFilter {
  q?: string
  pageSize?: number
  language?: string
}
