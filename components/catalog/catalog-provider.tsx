'use client'

import { createContext, useContext, useMemo, useState, type Dispatch, type ReactNode, type SetStateAction } from 'react'
import { useFavorites } from '@/lib/hooks/use-favorites'
import type { Book } from '@/lib/types'

export const ALL_GENRES = 'Wszystkie'
export const ALL_AUTHORS = 'Wszyscy autorzy'
export const ANY_YEAR = 'Dowolny rok'
export const ANY_RATING = 'Dowolne'

type CatalogContextValue = {
  books: Book[]
  filteredBooks: Book[]
  favorites: string[]
  isFavorite: (id: string) => boolean
  toggleFavorite: (id: string) => void
  query: string
  setQuery: Dispatch<SetStateAction<string>>
  genre: string
  setGenre: Dispatch<SetStateAction<string>>
  author: string
  setAuthor: Dispatch<SetStateAction<string>>
  year: string
  setYear: Dispatch<SetStateAction<string>>
  minRating: string
  setMinRating: Dispatch<SetStateAction<string>>
  favoritesOnly: boolean
  setFavoritesOnly: Dispatch<SetStateAction<boolean>>
  sortBest: boolean
  setSortBest: Dispatch<SetStateAction<boolean>>
  hasActiveFilters: boolean
  resetFilters: () => void
}

const CatalogContext = createContext<CatalogContextValue | null>(null)

export function CatalogProvider({ books, children }: { books: Book[]; children: ReactNode }) {
  const { favorites, isFavorite, toggleFavorite } = useFavorites()
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState(ALL_GENRES)
  const [author, setAuthor] = useState(ALL_AUTHORS)
  const [year, setYear] = useState(ANY_YEAR)
  const [minRating, setMinRating] = useState(ANY_RATING)
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [sortBest, setSortBest] = useState(false)

  const filteredBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('pl')
    const result = books.filter((book) => {
      const matchesText = !normalizedQuery || `${book.title} ${book.author}`.toLocaleLowerCase('pl').includes(normalizedQuery)
      const matchesGenre = genre === ALL_GENRES || book.genre === genre
      const matchesAuthor = author === ALL_AUTHORS || book.author === author
      const matchesYear = year === ANY_YEAR || String(book.year) === year
      const matchesRating = minRating === ANY_RATING || book.rating >= Number.parseFloat(minRating)
      const matchesFavorites = !favoritesOnly || favorites.includes(book.id)
      return matchesText && matchesGenre && matchesAuthor && matchesYear && matchesRating && matchesFavorites
    })
    return sortBest ? result.sort((a, b) => b.rating - a.rating) : result
  }, [author, books, favorites, favoritesOnly, genre, minRating, query, sortBest, year])

  const hasActiveFilters = Boolean(query) || genre !== ALL_GENRES || author !== ALL_AUTHORS || year !== ANY_YEAR || minRating !== ANY_RATING || favoritesOnly || sortBest

  function resetFilters() {
    setQuery('')
    setGenre(ALL_GENRES)
    setAuthor(ALL_AUTHORS)
    setYear(ANY_YEAR)
    setMinRating(ANY_RATING)
    setFavoritesOnly(false)
    setSortBest(false)
  }

  const value: CatalogContextValue = {
    books, filteredBooks, favorites, isFavorite, toggleFavorite,
    query, setQuery, genre, setGenre, author, setAuthor, year, setYear, minRating, setMinRating,
    favoritesOnly, setFavoritesOnly, sortBest, setSortBest, hasActiveFilters, resetFilters,
  }

  return <CatalogContext.Provider value={value}>{children}</CatalogContext.Provider>
}

// For components rendered both on the home page and outside the catalog (e.g. the header on auth pages).
export function useOptionalCatalog() {
  return useContext(CatalogContext)
}

export function useCatalog() {
  const context = useContext(CatalogContext)
  if (!context) throw new Error('useCatalog must be used within CatalogProvider')
  return context
}
