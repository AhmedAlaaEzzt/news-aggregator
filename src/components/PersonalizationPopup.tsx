import { useState, useEffect } from 'react'
import type { Category, NewsSource } from '../types/news.types'

interface PersonalizationPopupProps {
  isOpen: boolean
  onClose: () => void
  sources: NewsSource[]
  onSavePreferences: (preferences: UserPreferences) => void
}

export interface UserPreferences {
  favoriteCategories: Category[]
  favoriteSources: string[]
}

const PersonalizationPopup = ({
  isOpen,
  onClose,
  sources,
  onSavePreferences,
}: PersonalizationPopupProps) => {
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [selectedSources, setSelectedSources] = useState<string[]>([])

  useEffect(() => {
    // Only load saved preferences when popup opens
    if (isOpen) {
      const savedPreferences = localStorage.getItem('userNewsPreferences')
      if (savedPreferences) {
        const { favoriteCategories, favoriteSources } = JSON.parse(savedPreferences)
        setSelectedCategories(favoriteCategories)
        setSelectedSources(favoriteSources)
      } else {
        // Reset to empty if no saved preferences
        setSelectedCategories([])
        setSelectedSources([])
      }
    }
  }, [isOpen]) // Only depend on isOpen, not on current filter state

  const categories: Category[] = [
    'general',
    'business',
    'technology',
    'science',
    'health',
    'sports',
    'entertainment',
    'politics',
    'world',
  ]

  const handleSave = () => {
    const preferences: UserPreferences = {
      favoriteCategories: selectedCategories,
      favoriteSources: selectedSources,
    }
    localStorage.setItem('userNewsPreferences', JSON.stringify(preferences))
    onSavePreferences(preferences)
    onClose()
  }

  const toggleCategory = (category: Category) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    )
  }

  const toggleSource = (sourceId: string) => {
    setSelectedSources(prev =>
      prev.includes(sourceId) ? prev.filter(s => s !== sourceId) : [...prev, sourceId]
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Personalize Your News Feed</h2>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Favorite Categories</h3>
          <div className="grid grid-cols-2 gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`p-2 rounded-md text-sm ${
                  selectedCategories.includes(category)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Favorite Sources</h3>
          <div className="grid grid-cols-2 gap-2">
            {sources.map(source => (
              <button
                key={source.id}
                onClick={() => toggleSource(source.id)}
                className={`p-2 rounded-md text-sm ${
                  selectedSources.includes(source.id)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {source.name}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:text-gray-800">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}

export default PersonalizationPopup
