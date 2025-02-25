import type { IGuardianResponse, IUnifiedNewsItem } from '../types'
import { mapToUnifiedCategory } from '../utils/categoryMapper'

const GUARDIAN_LOGO = new URL('../assets/the-guardian-logo.png', import.meta.url).href

/**
 * Transforms a Guardian API article to the unified news item format
 */
export const transformGuardianArticle = (
  article: IGuardianResponse['response']['results'][0]
): IUnifiedNewsItem => ({
  id: article.id,
  title: article.webTitle,
  description: null, // Guardian API doesn't provide descriptions in the basic response
  source: 'The Guardian',
  imageUrl: GUARDIAN_LOGO, // Using The Guardian logo for all Guardian articles
  url: article.webUrl,
  publishedAt: article.webPublicationDate,
  category: mapToUnifiedCategory(article.sectionId),
})
