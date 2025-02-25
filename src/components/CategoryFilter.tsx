import { Category } from '../types/news.types'

const CATEGORIES: Category[] = [
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

interface CategoryFilterProps {
  selectedCategories: Category[]
  onCategoryChange: (categories: Category[]) => void
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategories,
  onCategoryChange,
}) => {
  const toggleCategory = (category: Category) => {
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
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">Categories</h3>
        {selectedCategories.length > 0 && (
          <button onClick={clearCategories} className="text-sm text-blue-500 hover:text-blue-600">
            Clear all
          </button>
        )}
      </div>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => toggleCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
              ${
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
  )
}

export default CategoryFilter
