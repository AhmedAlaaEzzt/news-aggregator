import { useState, useEffect, useMemo } from 'react'
import { useUnifiedNewsSearch } from './hooks/useNews'
import { NEWS_SOURCES } from './constants/newsSources'
import { INewsItem, INewsSource, TNewsCategory } from './types'
import { DEFAULT_PAGE_SIZE, DEFAULT_LOOKBACK_DAYS } from './constants/config'

// Components
import NewsList from './components/NewsList'
import Header from './components/Header'
import SearchSection from './components/SearchSection'
import FiltersSection from './components/FiltersSection'
import PersonalizationPopup from './components/PersonalizationPopup'
import { IUnifiedNewsItem, IUserPreferences } from './types'

function App() {
  // This state is used to manage the personalization popup
  const [isPersonalizationOpen, setIsPersonalizationOpen] = useState(false)

  // **** Search Section ****
  // [inputQuery state] This state is used to store the user's entered search query
  const [inputQuery, setInputQuery] = useState<string>('')
  const [startDate, setStartDate] = useState<string>('')
  const [endDate, setEndDate] = useState<string>('')
  /* [hasSearched state] we check if the user has searched for news 
    if no we show a message to the user that he should search for news */
  const [hasSearched, setHasSearched] = useState<boolean>(false)
  /* [searchParams state] through this state we pass the search for call the apis 
    through the useUnifiedNewsSearch hook
  */
  const [searchParams, setSearchParams] = useState({
    query: '',
    startDate: '',
    endDate: '',
  })

  // **** Filters Section ****
  const [newsSources, setNewsSources] = useState<INewsSource[]>(NEWS_SOURCES)
  const [selectedCategories, setSelectedCategories] = useState<TNewsCategory[]>([])

  // Load saved preferences on initial mount if exists
  useEffect(() => {
    const savedPreferences = localStorage.getItem('userNewsPreferences')
    if (savedPreferences) {
      const { favoriteCategories, favoriteSources } = JSON.parse(
        savedPreferences
      ) as IUserPreferences
      setSelectedCategories(favoriteCategories)
      setNewsSources(prev =>
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
    yesterday.setDate(yesterday.getDate() - DEFAULT_LOOKBACK_DAYS)

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
    /* !! operator is used to convert the inputQuery to a boolean 
      if the inputQuery is empty it will return false and if it is not empty it will return true */
    setHasSearched(!!inputQuery)
  }

  const handleSourceChange = (updatedSources: INewsSource[]) => {
    setNewsSources(updatedSources)
  }

  const handleDateChange = (newStartDate: string, newEndDate: string) => {
    setStartDate(newStartDate)
    setEndDate(newEndDate)
  }

  const handleCategoryChange = (categories: TNewsCategory[]) => {
    setSelectedCategories(categories)
  }

  const handleSavePreferences = (preferences: IUserPreferences) => {
    setNewsSources(prev =>
      prev.map(newsSource => ({
        ...newsSource,
        isSelected: preferences.favoriteSources.includes(newsSource.id),
      }))
    )
    setSelectedCategories(preferences.favoriteCategories)
  }

  const {
    data: unifiedNews,
    isLoading,
    error,
  } = useUnifiedNewsSearch({
    q: searchParams.query,
    pageSize: DEFAULT_PAGE_SIZE,
    enabledSources: newsSources.filter(s => s.isSelected).map(s => s.id),
    startDate: searchParams.startDate,
    endDate: searchParams.endDate,
  })

  const formatNewsData = (articles: Array<IUnifiedNewsItem>): INewsItem[] => {
    return articles.map(article => ({
      title: article.title,
      description: article.description || '',
      source: article.source,
      imageUrl: article.imageUrl || undefined,
      url: article.url,
      publishedAt: article.publishedAt,
      category: (article.category || 'general') as TNewsCategory,
    }))
  }

  const filteredNews = useMemo(
    () =>
      (unifiedNews ? formatNewsData(unifiedNews) : []).filter(article =>
        selectedCategories.length === 0
          ? true
          : selectedCategories.includes(article.category || 'general')
      ),
    [unifiedNews, selectedCategories]
  )

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
          />

          <FiltersSection
            sources={newsSources}
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
        sources={newsSources}
        onSavePreferences={handleSavePreferences}
      />
    </div>
  )
}

export default App
