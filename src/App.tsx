import { useState } from 'react'
import { useUnifiedNewsSearch } from './hooks/useNews'
import NewsList from './components/NewsList'
import SearchBar from './components/SearchBar'
import SourceFilter from './components/SourceFilter'
import { NEWS_SOURCES } from './constants/newsSources'
import type { NewsItem, NewsSource } from './types/news'

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [hasSearched, setHasSearched] = useState<boolean>(false)
  const [sources, setSources] = useState<NewsSource[]>(NEWS_SOURCES)

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setHasSearched(!!query)
  }

  const handleSourceChange = (updatedSources: NewsSource[]) => {
    setSources(updatedSources)
  }

  const {
    data: news,
    isLoading,
    error,
  } = useUnifiedNewsSearch({
    q: searchQuery,
    pageSize: 10,
    enabledSources: sources.filter(s => s.isSelected).map(s => s.id),
  })

  const formatNewsData = (articles: any[]): NewsItem[] => {
    return articles.map(article => ({
      title: article.title,
      description: article.description || '',
      source: article.source,
      imageUrl: article.imageUrl,
      url: article.url,
      publishedAt: article.publishedAt,
    }))
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">News Aggregator</h1>

        <SearchBar onSearch={handleSearch} />
        <SourceFilter sources={sources} onSourceChange={handleSourceChange} />

        <section>
          <NewsList
            news={news ? formatNewsData(news) : []}
            isLoading={isLoading}
            error={error || ''}
            hasSearched={hasSearched}
          />
        </section>
      </div>
    </div>
  )
}

export default App
