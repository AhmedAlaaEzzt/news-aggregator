import { TNewsCategory } from './unified.types'

export interface IUserPreferences {
  favoriteCategories: TNewsCategory[]
  favoriteSources: string[]
}
