import type { IGuardianApiParams, IGuardianResponse, IUnifiedNewsItem } from '../types'
import { guardianApi } from '../api/instance'
import { transformGuardianArticle } from '../transformers/guardian.transformer'

const DEFAULT_PAGE_SIZE = 10

export const guardianService = {
  /**
   * Search news articles from The Guardian API
   * @param params - Search parameters
   * @returns Promise<IUnifiedNewsItem[]> - Array of unified news items
   */
  async searchNews(params: IGuardianApiParams = {}): Promise<IUnifiedNewsItem[]> {
    const { data } = await guardianApi.get<IGuardianResponse>('/search', {
      params: {
        'api-key': import.meta.env.VITE_GUARDIAN_API_KEY,
        'page-size': params['page-size'] || DEFAULT_PAGE_SIZE,
        'order-by': params.q ? 'relevance' : 'newest',
        ...params,
      },
    })

    return data.response.results.map(transformGuardianArticle)
  },
}
