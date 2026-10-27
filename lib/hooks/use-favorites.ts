'use client'

import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'folio-favorites'

// Favorites belong to an account, so they only exist while someone is logged in.
// TODO: Supabase — load and save them per user instead of in localStorage.
export function useFavorites(enabled: boolean) {
  const [favorites, setFavorites] = useState<string[]>([])
  const [favoritesReady, setFavoritesReady] = useState(false)

  useEffect(() => {
    if (!enabled) {
      // Drop anything a guest saved before favorites required an account.
      try {
        window.localStorage.removeItem(STORAGE_KEY)
      } catch {
        // Nothing to clean up when storage is unavailable.
      }
      setFavorites([])
      setFavoritesReady(false)
      return
    }
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      const parsed: unknown = saved ? JSON.parse(saved) : []
      setFavorites(Array.isArray(parsed) && parsed.every((value): value is string => typeof value === 'string') ? parsed : [])
    } catch {
      setFavorites([])
    } finally {
      setFavoritesReady(true)
    }
  }, [enabled])

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
    if (!enabled) return
    setFavorites((current) => current.includes(id) ? current.filter((favorite) => favorite !== id) : [...current, id])
  }, [enabled])

  return { favoritesEnabled: enabled, favorites, isFavorite, toggleFavorite }
}
