import SourceFilter from './SourceFilter'
import CategoryFilter from './CategoryFilter'
import { INewsSource, TNewsCategory } from '../types'

/**
 * Props for the FiltersSection component
 * @property {INewsSource[]} sources - List of available news sources
 * @property {TNewsCategory[]} selectedCategories - Currently selected news categories
 * @property {Function} onSourceChange - Callback when sources selection changes
 * @property {Function} onCategoryChange - Callback when categories selection changes
 */
type IFiltersSectionProps = {
  sources: INewsSource[]
  selectedCategories: TNewsCategory[]
  onSourceChange: (sources: INewsSource[]) => void
  onCategoryChange: (categories: TNewsCategory[]) => void
}

const FiltersSection = ({
  sources,
  selectedCategories,
  onSourceChange,
  onCategoryChange,
}: IFiltersSectionProps) => {
  return (
    <div
      className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4"
      role="region"
      aria-label="News filters"
    >
      <h2 className="text-lg font-medium text-gray-900 mb-3 sm:mb-4">News Sources</h2>
      <SourceFilter sources={sources} onSourceChange={onSourceChange} />
      <CategoryFilter selectedCategories={selectedCategories} onCategoryChange={onCategoryChange} />
    </div>
  )
}

export default FiltersSection
