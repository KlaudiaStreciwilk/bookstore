'use client'

import { useMemo } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { ALL_AUTHORS, ALL_GENRES, ANY_RATING, ANY_YEAR, useCatalog } from '@/components/catalog/catalog-provider'

const ratingOptions = [ANY_RATING, '4+', '4.5+']

export function BookFilters({ genres }: { genres: string[] }) {
  const { books, query, setQuery, genre, setGenre, author, setAuthor, year, setYear, minRating, setMinRating } = useCatalog()

  const authors = useMemo(() => [...new Set(books.map((book) => book.author))], [books])
  const years = useMemo(() => [...new Set(books.map((book) => book.year))].sort((a, b) => b - a), [books])
  const genreOptions = [ALL_GENRES, ...genres]

  return (
    <div className="filter-panel" aria-label="Filtry książek">
      <label className="search-field"><span>Szukaj według tytułu lub autora</span><div className="search-input-wrap"><Search aria-hidden="true" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Szukaj „Diuna”" /></div></label>
      <label className="select-field"><span>Autor</span><span className="select-wrap"><select value={author} onChange={(event) => setAuthor(event.target.value)}><option>{ALL_AUTHORS}</option>{authors.map((value) => <option key={value}>{value}</option>)}</select><ChevronDown aria-hidden="true" /></span></label>
      <label className="select-field"><span>Rok wydania</span><span className="select-wrap"><select value={year} onChange={(event) => setYear(event.target.value)}><option>{ANY_YEAR}</option>{years.map((value) => <option key={value}>{value}</option>)}</select><ChevronDown aria-hidden="true" /></span></label>
      <fieldset className="rating-filter"><legend>Minimalna ocena</legend><div className="rating-options">{ratingOptions.map((value) => <button key={value} className={minRating === value ? 'filter-option selected' : 'filter-option'} type="button" aria-pressed={minRating === value} onClick={() => setMinRating(value)}>{value}</button>)}</div></fieldset>
      <div className="genre-filter"><span className="filter-label">Odkrywaj według gatunku</span><div className="genre-list" role="group" aria-label="Gatunek">{genreOptions.map((value) => <button key={value} className={genre === value ? 'genre-pill selected' : 'genre-pill'} type="button" aria-pressed={genre === value} onClick={() => setGenre(value)}>{value}</button>)}</div></div>
    </div>
  )
}
