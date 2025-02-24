import type { INewsResponse, IUnifiedNewsItem } from '../types'
import { mapToUnifiedCategory } from '../utils/categoryMapper'

/**
 * Transforms a NewsAPI article to the unified news item format
 */
export const transformNewsApiArticle = (
  article: INewsResponse['articles'][0]
): IUnifiedNewsItem => ({
  id: article.url, // News API doesn't provide unique IDs, using URL as ID
  title: article.title,
  description: article.description,
  source: article.source.name,
  imageUrl: article.urlToImage,
  url: article.url,
  publishedAt: article.publishedAt,
  category: mapToUnifiedCategory(article.category),
})
