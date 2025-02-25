import { TCategory } from '../types/news.types'

const categoryMappings: Record<string, TCategory> = {
  // NewsAPI categories
  general: 'general',
  business: 'business',
  technology: 'technology',
  science: 'science',
  health: 'health',
  sports: 'sports',
  entertainment: 'entertainment',

  // Guardian sections
  world: 'world',
  politics: 'politics',
  'business/business': 'business',
  'technology/technology': 'technology',
  'science/science': 'science',
  sport: 'sports',
  culture: 'entertainment',

  // NYTimes sections
  World: 'world',
  'U.S.': 'general',
  Politics: 'politics',
  Business: 'business',
  Technology: 'technology',
  Science: 'science',
  Health: 'health',
  Sports: 'sports',
  Arts: 'entertainment',
}

export const mapToUnifiedCategory = (sourceCategory: string | undefined): TCategory => {
  if (!sourceCategory) return 'general'

  // Try to find an exact match
  const mappedCategory = categoryMappings[sourceCategory]
  if (mappedCategory) return mappedCategory

  // Try to find a partial match by checking if the source category contains any of our category names
  const lowerCaseCategory = sourceCategory.toLowerCase()
  for (const [key, value] of Object.entries(categoryMappings)) {
    if (lowerCaseCategory.includes(key.toLowerCase())) {
      return value
    }
  }

  // Default to general if no match is found
  return 'general'
}
