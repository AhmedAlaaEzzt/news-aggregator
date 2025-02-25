import { TCategory } from './news.types'

export interface IUserPreferences {
  favoriteCategories: TCategory[]
  favoriteSources: string[]
}
