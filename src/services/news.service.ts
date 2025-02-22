import type { INewsApiParams, INewsResponse, IUnifiedNewsItem } from '../types'
import { newsApi } from '../api/instance'
import { transformNewsApiArticle } from '../transformers/newsapi.transformer'

export const newsService = {
  /**
   * Search news articles from NewsAPI
   * @param params - Search parameters
   * @returns Promise<IUnifiedNewsItem[]> - Array of unified news items
   */
  async searchNews(params: INewsApiParams): Promise<IUnifiedNewsItem[]> {
    const { data } = await newsApi.get<INewsResponse>('/everything', { params })
    return data.articles.map(transformNewsApiArticle)
  },
}
