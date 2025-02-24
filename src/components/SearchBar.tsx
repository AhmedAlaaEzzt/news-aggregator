interface SearchBarProps {
  onSearch: (query: string) => void
  value: string
  onChange: (value: string) => void
}

const SearchBar = ({ value, onChange, onSearch }: SearchBarProps) => {
  return (
    <div className="max-w-2xl mx-auto">
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Search news..."
        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onKeyDown={e => {
          if (e.key === 'Enter') {
            onSearch(value)
          }
        }}
      />
    </div>
  )
}

export default SearchBar
