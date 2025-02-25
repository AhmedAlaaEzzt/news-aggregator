interface HeaderProps {
  onPersonalize: () => void
}

const Header = ({ onPersonalize }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6 sm:mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">News Aggregator</h1>
      <button
        onClick={onPersonalize}
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
      >
        Personalize
      </button>
    </div>
  )
}

export default Header
