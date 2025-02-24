export interface NewsItem {
  title: string
  description: string
  source: string
  imageUrl?: string
  url: string
  publishedAt: string
  category?: Category
}

export interface NewsSource {
  id: string
  name: string
  isSelected: boolean
}

export type Category =
  | 'general'
  | 'business'
  | 'technology'
  | 'science'
  | 'health'
  | 'sports'
  | 'entertainment'
  | 'politics'
  | 'world'
  | 'other'
