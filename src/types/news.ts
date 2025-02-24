export interface NewsItem {
  title: string
  description: string
  source: string
  imageUrl?: string
  url: string
  publishedAt: string
}

export interface NewsSource {
  id: string
  name: string
  isSelected: boolean
}
