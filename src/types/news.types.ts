import { TNewsCategory } from './unified.types'

export interface INewsItem {
  title: string
  description: string
  source: string
  imageUrl?: string
  url: string
  publishedAt: string
  category?: TNewsCategory
}

// Api News Source ex: newsApi, guardian, nyTimes
export interface INewsSource {
  id: string
  name: string
  isSelected: boolean
}
