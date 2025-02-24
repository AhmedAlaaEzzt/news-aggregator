import { useQuery } from '@tanstack/react-query'
import { newsService } from '../services/news.service'
import { guardianService } from '../services/guardian.service'
import { nytimesService } from '../services/nytimes.service'
import type { INewsApiParams, IUnifiedNewsItem, IUnifiedNewsParams } from '../types'

// Query keys for caching
export const newsKeys = {
  all: ['news'] as const,
  search: (params: INewsApiParams) => [...newsKeys.all, 'search', params] as const,
  guardian: (params: any) => [...newsKeys.all, 'guardian', params] as const,
  nytimes: (params: any) => [...newsKeys.all, 'nytimes', params] as const,
}

interface UnifiedNewsSearchParams extends IUnifiedNewsParams {
  enabledSources?: string[]
}

export function useUnifiedNewsSearch(params: UnifiedNewsSearchParams) {
  const { enabledSources = ['newsapi', 'guardian', 'nytimes'] } = params

  // Create search params without enabledSources to prevent unnecessary re-fetches
  const searchParams = {
    q: params.q,
    pageSize: params.pageSize,
    language: 'en',
    from: params.startDate,
    to: params.endDate,
  }

  const guardianParams = {
    q: params.q,
    'page-size': params.pageSize,
    'from-date': params.startDate,
    'to-date': params.endDate,
  }

  const nytimesParams = {
    q: params.q,
    page: 0,
    begin_date: params.startDate?.replace(/-/g, ''),
    end_date: params.endDate?.replace(/-/g, ''),
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

  const isLoading =
    (newsApiQuery.isLoading && enabledSources.includes('newsapi')) ||
    (guardianQuery.isLoading && enabledSources.includes('guardian')) ||
    (nytimesQuery.isLoading && enabledSources.includes('nytimes'))

  // Combine and deduplicate results
  const combinedResults = (): IUnifiedNewsItem[] => {
    // Only include results from enabled sources
    const newsApiResults =
      enabledSources.includes('newsapi') && newsApiQuery.data ? newsApiQuery.data : []
    const guardianResults =
      enabledSources.includes('guardian') && guardianQuery.data ? guardianQuery.data : []
    const nytimesResults =
      enabledSources.includes('nytimes') && nytimesQuery.data ? nytimesQuery.data : []

    // Combine and sort by date
    return [...newsApiResults, ...guardianResults, ...nytimesResults].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )
  }

  // Create an array of error messages from failed API calls
  const errors = [
    newsApiQuery.error &&
      enabledSources.includes('newsapi') &&
      'NewsAPI: ' + (newsApiQuery.error as Error).message,
    guardianQuery.error &&
      enabledSources.includes('guardian') &&
      'Guardian: ' + (guardianQuery.error as Error).message,
    nytimesQuery.error &&
      enabledSources.includes('nytimes') &&
      'NY Times: ' + (nytimesQuery.error as Error).message,
  ].filter(Boolean)

  return {
    data: combinedResults(),
    isLoading,
    error: errors.length > 0 ? errors.join('; ') : null,
  }
}
