import React from 'react'
import { TNewsCategory } from '../types'
import { CATEGORIES } from '../constants/newsCategories'

interface ICategoryFilterProps {
  selectedCategories: TNewsCategory[]
  onCategoryChange: (categories: TNewsCategory[]) => void
}

const CategoryFilter: React.FC<ICategoryFilterProps> = ({
  selectedCategories,
  onCategoryChange,
}) => {
  const toggleCategory = (category: TNewsCategory) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category))
    } else {
      onCategoryChange([...selectedCategories, category])
    }
  }

  const clearCategories = () => {
    onCategoryChange([])
  }

  return (
    <div className="space-y-2" role="region" aria-label="Category filters">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Categories</h3>
        {selectedCategories.length > 0 && (
          <button
            onClick={clearCategories}
            className="text-sm text-blue-500 hover:text-blue-600"
            aria-label="Clear all selected categories"
          >
            Clear all
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Category options">
        {CATEGORIES.map(category => {
          const isSelected = selectedCategories.includes(category)
          const categoryName = category.charAt(0).toUpperCase() + category.slice(1)
          return (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              aria-pressed={isSelected}
              aria-label={`${categoryName} category ${isSelected ? 'selected' : 'unselected'}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
                ${
                  isSelected
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {categoryName}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// Added React.memo() to prevent unnecessary re-renders when parent component updates with same props
export default React.memo(CategoryFilter)
