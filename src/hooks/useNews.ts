import { useQuery } from '@tanstack/react-query'
import { newsService } from '../services/news.service'
import { guardianService } from '../services/guardian.service'
import { nytimesService } from '../services/nytimes.service'
import type { INewsApiParams, IUnifiedNewsItem } from '../types'

// Query keys for caching
export const newsKeys = {
  all: ['news'] as const,
  search: (params: INewsApiParams) => [...newsKeys.all, 'search', params] as const,
  guardian: (params: any) => [...newsKeys.all, 'guardian', params] as const,
  nytimes: (params: any) => [...newsKeys.all, 'nytimes', params] as const,
}

export function useUnifiedNewsSearch(params: { q?: string; pageSize?: number }) {
  const searchParams = {
    ...params,
    language: 'en',
  }

  const guardianParams = {
    q: params.q,
    'page-size': params.pageSize,
  }

  const nytimesParams = {
    q: params.q,
    page: 0,
  }

  const newsApiQuery = useQuery({
    queryKey: newsKeys.search(searchParams),
    queryFn: () => newsService.searchNews(searchParams),
    enabled: !!params.q,
    staleTime: 5 * 60 * 1000,
  })

  const guardianQuery = useQuery({
    queryKey: newsKeys.guardian(guardianParams),
    queryFn: () => guardianService.searchNews(guardianParams),
    enabled: !!params.q,
    staleTime: 5 * 60 * 1000,
  })

  const nytimesQuery = useQuery({
    queryKey: newsKeys.nytimes(nytimesParams),
    queryFn: () => nytimesService.searchNews(nytimesParams),
    enabled: !!params.q,
    staleTime: 5 * 60 * 1000,
  })

  const isLoading = newsApiQuery.isLoading || guardianQuery.isLoading || nytimesQuery.isLoading

  // Combine and deduplicate results
  const combinedResults = (): IUnifiedNewsItem[] => {
    // Get results from successful API calls, use empty array for failed calls
    const newsApiResults = newsApiQuery.data ?? []
    const guardianResults = guardianQuery.data ?? []
    const nytimesResults = nytimesQuery.data ?? []

    // Combine and sort by date
    return [...newsApiResults, ...guardianResults, ...nytimesResults].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  }

  // Create an array of error messages from failed API calls
  const errors = [
    newsApiQuery.error && 'NewsAPI: ' + (newsApiQuery.error as Error).message,
    guardianQuery.error && 'Guardian: ' + (guardianQuery.error as Error).message,
    nytimesQuery.error && 'NY Times: ' + (nytimesQuery.error as Error).message,
  ].filter(Boolean)

  return {
    data: combinedResults(),
    isLoading,
    error: errors.length > 0 ? errors.join('; ') : null,
  }
}
