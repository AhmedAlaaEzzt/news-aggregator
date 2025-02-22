import { useState } from 'react'
import { useUnifiedNewsSearch } from './hooks/useNews'
import NewsList from './components/NewsList'
import { NewsItem } from './components/NewsList'

function App() {
  const [inputQuery, setInputQuery] = useState<string>('')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [hasSearched, setHasSearched] = useState<boolean>(false)

  const handleSearch = () => {
    if (inputQuery.trim()) {
      setSearchQuery(inputQuery)
      setHasSearched(true)
    } else {
      setSearchQuery('')
      setHasSearched(false)
    }
  }

  const {
    data: news,
    isLoading,
    error,
  } = useUnifiedNewsSearch({
    q: searchQuery,
    pageSize: 10,
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

        <div className="mb-6 max-w-2xl mx-auto flex gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={e => setInputQuery(e.target.value)}
            placeholder="Search news..."
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={e => {
              if (e.key === 'Enter') {
                handleSearch()
              }
            }}
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Search
          </button>
        </div>

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
