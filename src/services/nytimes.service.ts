import type { INYTimesApiParams, INYTimesResponse, IUnifiedNewsItem } from '../types'
import { nytimesApi } from '../api/instance'
import { transformNYTimesArticle } from '../transformers/nytimes.transformer'

const DEFAULT_PAGE = 0
const NY_TIMES_SOURCE = 'The New York Times'

export const nytimesService = {
  /**
   * Search news articles from The New York Times API
   * @param params - Search parameters
   * @returns Promise<IUnifiedNewsItem[]> - Array of unified news items
   */
  async searchNews(params: INYTimesApiParams = {}): Promise<IUnifiedNewsItem[]> {
    const { data } = await nytimesApi.get<INYTimesResponse>('', {
      params: {
        'api-key': import.meta.env.VITE_NYTIMES_API_KEY,
        page: params.page || DEFAULT_PAGE,
        q: params.q || '',
        sort: params.q ? 'relevance' : 'newest',
        fq: params.q ? undefined : `source:("${NY_TIMES_SOURCE}")`,
        ...params,
      },
    })

    return data.response.docs.map(transformNYTimesArticle)
  },
}
