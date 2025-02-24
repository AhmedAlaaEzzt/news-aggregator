import type { INYTimesResponse, IUnifiedNewsItem } from '../types'
import { mapToUnifiedCategory } from '../utils/categoryMapper'

const NY_TIMES_SOURCE = 'The New York Times'
const NY_TIMES_IMAGE_BASE_URL = 'https://www.nytimes.com/'

/**
 * Transforms a NYTimes API article to the unified news item format
 */
export const transformNYTimesArticle = (
  article: INYTimesResponse['response']['docs'][0]
): IUnifiedNewsItem => ({
  id: article._id,
  title: article.headline.main,
  description: article.abstract || article.snippet || '',
  source: NY_TIMES_SOURCE,
  imageUrl:
    article.multimedia?.length > 0
      ? `${NY_TIMES_IMAGE_BASE_URL}${article.multimedia[0].url}`
      : null,
  url: article.web_url,
  publishedAt: article.pub_date,
  category: mapToUnifiedCategory(article.section_name),
})
