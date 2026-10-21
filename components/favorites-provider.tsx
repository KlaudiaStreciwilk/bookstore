'use client'

import { createContext, useContext, type ReactNode } from 'react'
import { useFavorites } from '@/lib/hooks/use-favorites'

type FavoritesContextValue = ReturnType<typeof useFavorites>

const FavoritesContext = createContext<FavoritesContextValue | null>(null)

// One favorites state for the whole app, so the catalog, the header counter and the
// opened-book modal (rendered outside the catalog) always agree.
export function FavoritesProvider({ children }: { children: ReactNode }) {
  const favorites = useFavorites()
  return <FavoritesContext.Provider value={favorites}>{children}</FavoritesContext.Provider>
}

export function useSharedFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useSharedFavorites must be used within FavoritesProvider')
  return context
}
