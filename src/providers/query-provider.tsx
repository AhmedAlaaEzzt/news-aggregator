import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

interface IQueryProviderProps {
  children: ReactNode
}

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // disable automatic refetch on window focus
      retry: 1, // retry failed queries once
      staleTime: 5 * 60 * 1000, // data is fresh for 5 minutes
    },
  },
})

export function QueryProvider({ children }: IQueryProviderProps) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
