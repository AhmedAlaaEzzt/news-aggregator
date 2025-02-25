import { useState, useEffect } from 'react'
import { useUnifiedNewsSearch } from './hooks/useNews'
import { NEWS_SOURCES } from './constants/newsSources'
import type { NewsItem, NewsSource, Category } from './types/news.types'

// Components
import NewsList from './components/NewsList'
import Header from './components/Header'
import SearchSection from './components/SearchSection'
import FiltersSection from './components/FiltersSection'
import PersonalizationPopup, { UserPreferences } from './components/PersonalizationPopup'

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
  }

  const handleDateChange = (newStartDate: string, newEndDate: string) => {
    setStartDate(newStartDate)
    setEndDate(newEndDate)
  }

  const handleCategoryChange = (categories: Category[]) => {
    setSelectedCategories(categories)
  }

  const handleSavePreferences = (preferences: UserPreferences) => {
    setSources(prev =>
      prev.map(source => ({
        ...source,
        isSelected: preferences.favoriteSources.includes(source.id),
      }))
    )
    setSelectedCategories(preferences.favoriteCategories)
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

  const isValidSearch = inputQuery.trim().length > 0

  return (
    <div className="min-h-screen bg-gray-100 py-4 sm:py-8">
      <div className="container mx-auto px-3 sm:px-4 max-w-7xl">
        <Header onPersonalize={() => setIsPersonalizationOpen(true)} />

        <div className="space-y-4 sm:space-y-6">
          <SearchSection
            searchQuery={inputQuery}
            onSearchQueryChange={setInputQuery}
            onSearch={handleSearch}
            startDate={startDate}
            endDate={endDate}
            onDateChange={handleDateChange}
            isValid={isValidSearch}
          />

          <FiltersSection
            sources={sources}
            selectedCategories={selectedCategories}
            onSourceChange={handleSourceChange}
            onCategoryChange={handleCategoryChange}
          />

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
