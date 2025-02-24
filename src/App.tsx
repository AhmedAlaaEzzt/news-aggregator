import { useState, useEffect } from 'react'
import { useUnifiedNewsSearch } from './hooks/useNews'
import NewsList from './components/NewsList'
import SearchBar from './components/SearchBar'
import SourceFilter from './components/SourceFilter'
import DateFilter from './components/DateFilter'
import { NEWS_SOURCES } from './constants/newsSources'
import type { NewsItem, NewsSource } from './types/news'

function App() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [inputQuery, setInputQuery] = useState<string>('')
  const [searchParams, setSearchParams] = useState({
    query: '',
    startDate: '',
    endDate: '',
  })
  const [hasSearched, setHasSearched] = useState<boolean>(false)
  const [sources, setSources] = useState<NewsSource[]>(NEWS_SOURCES)
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')

  // Set default dates on component mount
  useEffect(() => {
    const today = new Date()
    const yesterday = new Date(today)
    yesterday.setDate(yesterday.getDate() - 1)

    const formatDate = (date: Date) => date.toISOString().split('T')[0]

    setStartDate(formatDate(yesterday))
    setEndDate(formatDate(today))
  }, [])

  const handleSearch = () => {
    setSearchQuery(inputQuery)
    setSearchParams({
      query: inputQuery,
      startDate,
      endDate,
    })
    setHasSearched(!!inputQuery)
  }

  const handleSourceChange = (updatedSources: NewsSource[]) => {
    setSources(updatedSources)
  }

  const handleDateChange = (newStartDate: string, newEndDate: string) => {
    setStartDate(newStartDate)
    setEndDate(newEndDate)
  }

  const {
    data: news,
    isLoading,
    error,
  } = useUnifiedNewsSearch({
    q: searchParams.query,
    pageSize: 10,
    enabledSources: sources.filter(s => s.isSelected).map(s => s.id),
    startDate: searchParams.startDate,
    endDate: searchParams.endDate,
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
    <div className="min-h-screen bg-gray-100 py-4 sm:py-8">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 sm:mb-8 text-center">
          News Aggregator
        </h1>

        <div className="space-y-4 sm:space-y-6">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4">
            <SearchBar value={inputQuery} onChange={setInputQuery} onSearch={handleSearch} />
            <DateFilter startDate={startDate} endDate={endDate} onDateChange={handleDateChange} />
            <div className="w-full">
              <button
                onClick={handleSearch}
                className="w-full px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 font-medium"
              >
                Search News
              </button>
            </div>
          </div>

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium text-gray-900 mb-3 sm:mb-4">News Sources</h3>
            <SourceFilter sources={sources} onSourceChange={handleSourceChange} />
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
    </div>
  )
}

export default App
