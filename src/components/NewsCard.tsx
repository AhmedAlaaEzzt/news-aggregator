import React from 'react'

interface NewsCardProps {
  title: string
  description: string
  source: string
  imageUrl?: string
  url: string
  publishedAt: string
}

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  description,
  source,
  imageUrl,
  url,
  publishedAt,
}) => {
  const formattedDate = new Date(publishedAt).toLocaleDateString()

  return (
    <article className="h-full flex flex-col bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-transform duration-200 hover:-translate-y-1">
      <div className="w-full h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-24 h-24 text-gray-400"
          >
            <path
              fill="currentColor"
              d="M19 5v14H5V5h14zm0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-4.86 8.86l-3 3.87L9 13.14 6 17h12l-3.86-5.14z"
            />
          </svg>
        )}
      </div>
      <div className="flex flex-col flex-1 p-4">
        <h3 className="mb-2 text-lg font-semibold leading-tight line-clamp-2">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-800 hover:text-blue-600 transition-colors duration-200"
          >
            {title}
          </a>
        </h3>
        <p className="mb-4 text-gray-600 text-sm leading-relaxed line-clamp-3">{description}</p>
        <div className="mt-auto flex justify-between items-center text-sm text-gray-500">
          <span className="font-semibold">{source}</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </article>
  )
}

export default NewsCard
