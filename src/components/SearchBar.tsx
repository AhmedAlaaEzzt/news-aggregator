import { useState } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [inputQuery, setInputQuery] = useState<string>('')

  const handleSearch = () => {
    if (inputQuery.trim()) {
      onSearch(inputQuery)
    } else {
      onSearch('')
    }
  }

  return (
    <div className="mb-6 max-w-2xl mx-auto flex gap-2">
      <input
        type="text"
        value={inputQuery}
        onChange={e => setInputQuery(e.target.value)}
        placeholder="Search news..."
        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleSearch()
          }
        }}
      />
      <button
        onClick={handleSearch}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
      >
        Search
      </button>
    </div>
  )
}

export default SearchBar
