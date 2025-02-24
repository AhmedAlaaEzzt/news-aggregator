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
  selectedCategory: Category | null
  onCategoryChange: (category: Category | null) => void
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-medium text-gray-900">Categories</h3>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onCategoryChange(null)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
            ${
              !selectedCategory
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
        >
          All
        </button>
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200
              ${
                selectedCategory === category
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
