import React from 'react'
import NewsCard from './NewsCard'
import WarningAlert from './WarningAlert'
import { INewsItem } from '../types/news.types'

const MESSAGES = {
  LOADING: 'Loading news...',
  INITIAL: 'Enter a keyword above and click search to find news articles.',
  NO_RESULTS: 'No news articles found for your search.',
} as const

interface INewsListProps {
  news: INewsItem[]
  isLoading?: boolean
  error?: string
  hasSearched: boolean
}

const NewsList: React.FC<INewsListProps> = ({ news, isLoading = false, error, hasSearched }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={`skeleton-${index}`} className="animate-pulse bg-gray-200 rounded-lg h-64" />
        ))}
      </div>
    )
  }

  if (!hasSearched) {
    return <div className="text-center py-8 text-lg text-gray-600">{MESSAGES.INITIAL}</div>
  }

  const showPartialError = error && news.length > 0
  const showCompleteError = error && news.length === 0

  if (showCompleteError) {
    return <div className="text-center py-8 text-lg text-red-600">{error}</div>
  }

  if (!news.length) {
    return <div className="text-center py-8 text-lg text-gray-600">{MESSAGES.NO_RESULTS}</div>
  }

  return (
    <div className="space-y-6">
      {showPartialError && <WarningAlert message={`Some news sources failed to load: ${error}`} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map(newsItem => (
          <NewsCard
            key={newsItem.url}
            title={newsItem.title}
            description={newsItem.description}
            source={newsItem.source}
            imageUrl={newsItem.imageUrl}
            url={newsItem.url}
            publishedAt={newsItem.publishedAt}
            category={newsItem.category}
          />
        ))}
      </div>
    </div>
  )
}

export default NewsList
