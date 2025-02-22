import React from 'react'
import NewsCard from './NewsCard'
import WarningAlert from './WarningAlert'
import { NewsItem } from '../types/news'

interface NewsListProps {
  news: NewsItem[]
  isLoading?: boolean
  error?: string
  hasSearched: boolean
}

const NewsList: React.FC<NewsListProps> = ({ news, isLoading, error, hasSearched }) => {
  if (isLoading) {
    return <div className="text-center py-8 text-lg text-gray-600">Loading news...</div>
  }

  if (!hasSearched) {
    return (
      <div className="text-center py-8 text-lg text-gray-600">
        Enter a keyword above and click search to find news articles.
      </div>
    )
  }

  const showPartialError = error && news.length > 0
  const showCompleteError = error && news.length === 0

  if (showCompleteError) {
    return <div className="text-center py-8 text-lg text-red-600">{error}</div>
  }

  if (!news.length) {
    return (
      <div className="text-center py-8 text-lg text-gray-600">
        No news articles found for your search.
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {showPartialError && <WarningAlert message={`Some news sources failed to load: ${error}`} />}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.map((newsItem, index) => (
          <NewsCard
            key={`${newsItem.url}-${index}`}
            title={newsItem.title}
            description={newsItem.description}
            source={newsItem.source}
            imageUrl={newsItem.imageUrl}
            url={newsItem.url}
            publishedAt={newsItem.publishedAt}
          />
        ))}
      </div>
    </div>
  )
}

export default NewsList
