import type { NewsSource } from '../types/news.types'

export const NEWS_SOURCES: NewsSource[] = [
  {
    id: 'newsapi',
    name: 'News API',
    isSelected: true,
  },
  {
    id: 'guardian',
    name: 'The Guardian',
    isSelected: true,
  },
  {
    id: 'nytimes',
    name: 'The New York Times',
    isSelected: true,
  },
]
