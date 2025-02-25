import { useState, useEffect, useCallback, KeyboardEvent, useMemo } from 'react'
import type { TNewsCategory, INewsSource } from '../types'
import { IUserPreferences } from '../types/userPreferences.types'
import { CATEGORIES } from '../constants/newsCategories'

interface PersonalizationPopupProps {
  isOpen: boolean
  onClose: () => void
  sources: INewsSource[]
  onSavePreferences: (preferences: IUserPreferences) => void
}

const PersonalizationPopup = ({
  isOpen,
  onClose,
  sources,
  onSavePreferences,
}: PersonalizationPopupProps) => {
  const [selectedCategories, setSelectedCategories] = useState<TNewsCategory[]>([])
  const [selectedSources, setSelectedSources] = useState<string[]>([])

  useEffect(() => {
    // Only load saved preferences when popup opens
    if (isOpen) {
      try {
        const savedPreferences = localStorage.getItem('userNewsPreferences')
        if (savedPreferences) {
          const { favoriteCategories, favoriteSources } = JSON.parse(savedPreferences)
          setSelectedCategories(favoriteCategories || [])
          setSelectedSources(favoriteSources || [])
        } else {
          // Reset to empty if no saved preferences
          setSelectedCategories([])
          setSelectedSources([])
        }
      } catch (error) {
        console.error('Error loading preferences:', error)
        // Reset to empty if there's an error
        setSelectedCategories([])
        setSelectedSources([])
      }
    }
  }, [isOpen]) // Only depend on isOpen, not on current filter state

  const handleSave = () => {
    const preferences: IUserPreferences = {
      favoriteCategories: selectedCategories,
      favoriteSources: selectedSources,
    }
    try {
      localStorage.setItem('userNewsPreferences', JSON.stringify(preferences))
      onSavePreferences(preferences)
      onClose()
    } catch (error) {
      console.error('Error saving preferences:', error)
      // Handle save error - could add error state and show message to user
    }
  }

  const toggleCategory = useCallback((category: TNewsCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
    )
  }, [])

  const toggleSource = useCallback((sourceId: string) => {
    setSelectedSources(prev =>
      prev.includes(sourceId) ? prev.filter(s => s !== sourceId) : [...prev, sourceId]
    )
  }, [])

  const categoryButtons = useMemo(
    () => (
      <div className="grid grid-cols-2 gap-2">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            aria-pressed={selectedCategories.includes(category)}
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
    ),
    [selectedCategories, toggleCategory]
  )

  const sourceButtons = useMemo(
    () => (
      <div className="grid grid-cols-2 gap-2">
        {sources.map(source => (
          <button
            key={source.id}
            onClick={() => toggleSource(source.id)}
            aria-pressed={selectedSources.includes(source.id)}
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
    ),
    [sources, selectedSources, toggleSource]
  )

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === 'Escape') {
        onClose()
      }
    },
    [onClose]
  )

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={e => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className="bg-white rounded-lg p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
        onKeyDown={handleKeyDown}
      >
        <h2 id="dialog-title" className="text-2xl font-bold mb-4">
          Personalize Your News Feed
        </h2>

        <div className="mb-6" role="group" aria-labelledby="categories-title">
          <h3 id="categories-title" className="text-lg font-semibold mb-3">
            Favorite Categories
          </h3>
          {categoryButtons}
        </div>

        <div className="mb-6" role="group" aria-labelledby="sources-title">
          <h3 id="sources-title" className="text-lg font-semibold mb-3">
            Favorite Sources
          </h3>
          {sourceButtons}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
            aria-label="Cancel and close dialog"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            aria-label="Save preferences and close dialog"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  )
}

export default PersonalizationPopup
