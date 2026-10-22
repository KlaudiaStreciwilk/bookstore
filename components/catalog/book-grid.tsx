'use client'

import { BookCard } from '@/components/catalog/book-card'
import { useCatalog } from '@/components/catalog/catalog-provider'
import { EmptyState } from '@/components/catalog/empty-state'
import { Candle, Letters, SleepingCat } from '@/components/decor'
import { Stagger } from '@/components/motion/stagger'

export function BookGrid() {
  const { filteredBooks, isFavorite, toggleFavorite, favoritesOnly, sortBest, hasActiveFilters, resetFilters } = useCatalog()

  return (
    <>
      <div className="results-heading"><p><span className="results-dot" /> {favoritesOnly ? 'Twoje ulubione' : sortBest ? 'Czytelnicze bestsellery' : 'Książki do odkrycia'} <span className="result-total">{filteredBooks.length}</span></p>{hasActiveFilters && <button className="clear-filters" type="button" onClick={resetFilters}>Wyczyść filtry</button>}</div>

      {filteredBooks.length > 0
        ? <div className="bookcase"><Letters className="bookcase-letters" /><Candle className="bookcase-candle bookcase-candle-right" height="short" /><SleepingCat className="bookcase-cat" /><Stagger className="book-grid">{filteredBooks.map((book) => <BookCard key={book.id} book={book} isFavorite={isFavorite(book.id)} onToggleFavorite={toggleFavorite} />)}</Stagger></div>
        : <EmptyState onReset={resetFilters} />}
    </>
  )
}
