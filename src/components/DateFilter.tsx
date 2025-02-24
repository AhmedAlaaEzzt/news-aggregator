import React from 'react'

interface DateFilterProps {
  startDate: string
  endDate: string
  onDateChange: (startDate: string, endDate: string) => void
}

const DateFilter: React.FC<DateFilterProps> = ({ startDate, endDate, onDateChange }) => {
  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStartDate = e.target.value
    if (endDate && newStartDate > endDate) {
      onDateChange(newStartDate, newStartDate)
    } else {
      onDateChange(newStartDate, endDate)
    }
  }

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEndDate = e.target.value
    if (startDate && newEndDate < startDate) {
      onDateChange(newEndDate, newEndDate)
    } else {
      onDateChange(startDate, newEndDate)
    }
  }

  const handleQuickSelect = (days: number) => {
    const end = new Date()
    const start = new Date()
    start.setDate(start.getDate() - days)

    const formatDate = (date: Date) => date.toISOString().split('T')[0]
    onDateChange(formatDate(start), formatDate(end))
  }

  const QuickSelectButton = ({ days, label }: { days: number; label: string }) => (
    <button
      onClick={() => handleQuickSelect(days)}
      className={`px-3 py-1 text-sm rounded-full transition-colors whitespace-nowrap
        ${
          startDate ===
          new Date(new Date().setDate(new Date().getDate() - days)).toISOString().split('T')[0]
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
    >
      {label}
    </button>
  )

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
        <h3 className="text-lg font-medium text-gray-900">Date Range</h3>
        <div className="flex flex-wrap gap-2">
          <QuickSelectButton days={1} label="Yesterday" />
          <QuickSelectButton days={7} label="Last 7d" />
          <QuickSelectButton days={30} label="Last 30d" />
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
        <div className="flex-1">
          <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
            From
          </label>
          <div className="relative">
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={handleStartDateChange}
              max={endDate}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm pl-3"
            />
          </div>
        </div>

        <div className="hidden sm:flex items-center px-4">
          <div className="w-2 h-0.5 bg-gray-300"></div>
        </div>

        <div className="flex-1">
          <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
            To
          </label>
          <div className="relative">
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={handleEndDateChange}
              min={startDate}
              max={new Date().toISOString().split('T')[0]}
              className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm pl-3"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DateFilter
