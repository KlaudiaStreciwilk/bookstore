'use client'

import { Heart } from 'lucide-react'
import { BookCover } from '@/components/catalog/book-cover'
import { Rating } from '@/components/rating'
import type { Book } from '@/lib/types'

type BookCardProps = {
  book: Book
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
}

export function BookCard({ book, isFavorite, onToggleFavorite }: BookCardProps) {
  return (
    <article className="book-card">
      <div className="card-cover-wrap"><BookCover book={book} /><button className={`heart-button ${isFavorite ? 'is-favorite' : ''}`} type="button" onClick={() => onToggleFavorite(book.id)} aria-label={isFavorite ? `Usuń ${book.title} z ulubionych` : `Dodaj ${book.title} do ulubionych`} aria-pressed={isFavorite}><Heart fill={isFavorite ? 'currentColor' : 'none'} aria-hidden="true" /></button>{book.tag && <span className="cover-tag">{book.tag}</span>}</div>
      <div className="card-title-row"><h3>{book.title}</h3><Rating value={book.rating} /></div>
      <p className="book-byline">{book.author}</p>
      <p className="book-meta">{book.genre}<span>·</span>{book.year}</p>
    </article>
  )
}
