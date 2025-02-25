import SourceFilter from './SourceFilter'
import CategoryFilter from './CategoryFilter'
import type { NewsSource, Category } from '../types/news.types'

interface FiltersSectionProps {
  sources: NewsSource[]
  selectedCategories: Category[]
  onSourceChange: (sources: NewsSource[]) => void
  onCategoryChange: (categories: Category[]) => void
}

const FiltersSection = ({
  sources,
  selectedCategories,
  onSourceChange,
  onCategoryChange,
}: FiltersSectionProps) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4">
      <h3 className="text-lg font-medium text-gray-900 mb-3 sm:mb-4">News Sources</h3>
      <SourceFilter sources={sources} onSourceChange={onSourceChange} />
      <CategoryFilter selectedCategories={selectedCategories} onCategoryChange={onCategoryChange} />
    </div>
  )
}

export default FiltersSection
