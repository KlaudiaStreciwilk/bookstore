'use client'

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'folio-favorites'

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [favoritesReady, setFavoritesReady] = useState(false)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      const parsed: unknown = saved ? JSON.parse(saved) : []
      setFavorites(Array.isArray(parsed) && parsed.every((value): value is string => typeof value === 'string') ? parsed : [])
    } catch {
      setFavorites([])
    } finally {
      setFavoritesReady(true)
    }
  }, [])

  useEffect(() => {
    if (!favoritesReady) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
    } catch {
      // Favorites remain available for the current session when storage is unavailable.
    }
  }, [favorites, favoritesReady])

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites])

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((current) => current.includes(id) ? current.filter((favorite) => favorite !== id) : [...current, id])
  }, [])

  return { favorites, isFavorite, toggleFavorite }
}
