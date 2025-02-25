interface SearchBarProps {
  onSearch: (query: string) => void
  value: string
  onChange: (value: string) => void
  isValid?: boolean
}

const SearchBar = ({ value, onChange, onSearch, isValid }: SearchBarProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search news..."
        className={`w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 transition-colors duration-200 ${
          value && !isValid
            ? 'border-red-300 focus:ring-red-500'
            : 'border-gray-300 focus:ring-blue-500'
        }`}
        onKeyDown={e => {
          if (e.key === 'Enter' && isValid) {
            onSearch(value)
          }
        }}
      />
    </div>
  )
}

export default SearchBar
