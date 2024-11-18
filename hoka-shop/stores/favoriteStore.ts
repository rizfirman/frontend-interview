import type { Products } from '@/types'

export const useFavoriteStore = defineStore('favoriteStore', () => {
  const favoriteCookie = useCookie<Products[]>('favorites', {
    default: () => [],
  })
  const favorites = ref<Products[]>(favoriteCookie.value || [])

  const addToFavorites = (product: Products) => {
    if (!favorites.value.some((fav) => fav.id === product.id)) {
      favorites.value.push(product)
      favoriteCookie.value = favorites.value
    }
  }

  const removeFromFavorites = (productId: number) => {
    favorites.value = favorites.value.filter((fav) => fav.id !== productId)
    favoriteCookie.value = favorites.value
  }

  const isFavorite = (productId: number) => {
    return favorites.value.some((fav) => fav.id === productId)
  }

  const loadFavoritesFromCookie = () => {
    favorites.value = favoriteCookie.value || []
  }

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    loadFavoritesFromCookie,
  }
})
