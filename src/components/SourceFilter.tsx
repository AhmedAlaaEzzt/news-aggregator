import React from 'react'
import { INewsSource } from '../types/news.types'

interface SourceFilterProps {
  sources: INewsSource[]
  onSourceChange: (sources: INewsSource[]) => void
}

const SourceFilter: React.FC<SourceFilterProps> = ({ sources, onSourceChange }) => {
  const handleSourceToggle = (toggledSource: INewsSource) => {
    const updatedSources = sources.map(source =>
      source.id === toggledSource.id ? { ...source, isSelected: !source.isSelected } : source
    )
    onSourceChange(updatedSources)
  }

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold mb-2 text-gray-700">Filter by Source</h2>
      <div className="flex flex-wrap gap-2">
        {sources.map(source => (
          <button
            key={source.id}
            onClick={() => handleSourceToggle(source)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              source.isSelected
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {source.name}
          </button>
        ))}
      </div>
    </div>
  )
}

export default SourceFilter
