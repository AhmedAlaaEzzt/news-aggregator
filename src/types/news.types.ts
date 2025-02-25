export interface NewsItem {
  title: string
  description: string
  source: string
  imageUrl?: string
  url: string
  publishedAt: string
  category?: TCategory
}

// Api News Source ex: newsApi, guardian, nyTimes
export interface INewsSource {
  id: string
  name: string
  isSelected: boolean
}

export type TCategory =
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
