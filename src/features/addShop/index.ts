import type { Product } from '../../app/App'

export const addBye = (arr: Product[], newItem: Product): Product[] => {
  return [...arr, newItem]
}
