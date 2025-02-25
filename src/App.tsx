import { useState, useEffect } from 'react'
import { useUnifiedNewsSearch } from './hooks/useNews'
import NewsList from './components/NewsList'
import SearchBar from './components/SearchBar'
import SourceFilter from './components/SourceFilter'
import DateFilter from './components/DateFilter'
import CategoryFilter from './components/CategoryFilter'
import PersonalizationPopup, { UserPreferences } from './components/PersonalizationPopup'
import { NEWS_SOURCES } from './constants/newsSources'
import type { NewsItem, NewsSource, Category } from './types/news.types'

function App() {
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
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [isPersonalizationOpen, setIsPersonalizationOpen] = useState(false)

  // Load saved preferences on initial mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('userNewsPreferences')
    if (savedPreferences) {
      const { favoriteCategories, favoriteSources } = JSON.parse(
        savedPreferences
      ) as UserPreferences
      setSelectedCategories(favoriteCategories)
      setSources(prev =>
        prev.map(source => ({
          ...source,
          isSelected: favoriteSources.includes(source.id),
        }))
      )
    }
  }, [])

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
    setSearchParams({
      query: inputQuery,
      startDate,
      endDate,
    })
    setHasSearched(!!inputQuery)
  }

  const handleSourceChange = (updatedSources: NewsSource[]) => {
    setSources(updatedSources)
    // Don't save to localStorage when changing filters manually
  }

  const handleDateChange = (newStartDate: string, newEndDate: string) => {
    setStartDate(newStartDate)
    setEndDate(newEndDate)
  }

  const handleCategoryChange = (categories: Category[]) => {
    setSelectedCategories(categories)
    // Don't save to localStorage when changing filters manually
  }

  const handleSavePreferences = (preferences: UserPreferences) => {
    // Update sources based on favorite sources
    setSources(prev =>
      prev.map(source => ({
        ...source,
        isSelected: preferences.favoriteSources.includes(source.id),
      }))
    )
    // Update selected categories from preferences
    setSelectedCategories(preferences.favoriteCategories)
    // Preferences are already saved to localStorage in the PersonalizationPopup component
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
      category: article.category || 'general',
    }))
  }

  const filteredNews = (news ? formatNewsData(news) : []).filter(article =>
    selectedCategories.length === 0
      ? true
      : selectedCategories.includes(article.category || 'general')
  )

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-8">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
        <div className="flex justify-between items-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">News Aggregator</h1>
          <button
            onClick={() => setIsPersonalizationOpen(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Personalize
          </button>
        </div>

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

          <div className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4">
            <h3 className="text-lg font-medium text-gray-900 mb-3 sm:mb-4">News Sources</h3>
            <SourceFilter sources={sources} onSourceChange={handleSourceChange} />
            <CategoryFilter
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          <section>
            <NewsList
              news={filteredNews}
              isLoading={isLoading}
              error={error || ''}
              hasSearched={hasSearched}
            />
          </section>
        </div>
      </div>

      <PersonalizationPopup
        isOpen={isPersonalizationOpen}
        onClose={() => setIsPersonalizationOpen(false)}
        sources={sources}
        onSavePreferences={handleSavePreferences}
      />
    </div>
  )
}

export default App
