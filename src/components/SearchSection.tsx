import SearchBar from './SearchBar'
import DateFilter from './DateFilter'

interface SearchSectionProps {
  searchQuery: string
  onSearchQueryChange: (query: string) => void
  onSearch: () => void
  startDate: string
  endDate: string
  onDateChange: (startDate: string, endDate: string) => void
  isValid?: boolean
}

const SearchSection = ({
  searchQuery,
  onSearchQueryChange,
  onSearch,
  startDate,
  endDate,
  onDateChange,
  isValid,
}: SearchSectionProps) => {
  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow space-y-4">
      <SearchBar
        value={searchQuery}
        onChange={onSearchQueryChange}
        onSearch={onSearch}
        isValid={isValid}
      />
      <DateFilter startDate={startDate} endDate={endDate} onDateChange={onDateChange} />
      <div className="w-full">
        <button
          onClick={onSearch}
          disabled={!isValid}
          className="w-full px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200 font-medium disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          Search News
        </button>
      </div>
    </div>
  )
}

export default SearchSection
