'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { motion, useReducedMotion } from 'motion/react'
import { BookCover } from '@/components/catalog/book-cover'
import { snappySpring } from '@/components/motion/springs'
import { StaggerItem } from '@/components/motion/stagger'
import { Rating } from '@/components/rating'
import type { Book } from '@/lib/types'

type BookCardProps = {
  book: Book
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
}

const coverHover = { hover: { y: -6, rotate: -2, transition: snappySpring } }
const heartPop = { type: 'spring', stiffness: 600, damping: 11 } as const

export function BookCard({ book, isFavorite, onToggleFavorite }: BookCardProps) {
  const reduceMotion = useReducedMotion()
  // Bumped on every click so the heart icon remounts and replays its pop.
  const [popCount, setPopCount] = useState(0)

  function handleFavoriteClick() {
    onToggleFavorite(book.id)
    setPopCount((count) => count + 1)
  }

  return (
    <StaggerItem as="article" className="book-card" whileHover={reduceMotion ? undefined : 'hover'}>
      <div className="card-cover-wrap">
        <motion.div className="card-cover-motion" variants={coverHover}><BookCover book={book} /></motion.div>
        <button className={`heart-button ${isFavorite ? 'is-favorite' : ''}`} type="button" onClick={handleFavoriteClick} aria-label={isFavorite ? `Usuń ${book.title} z ulubionych` : `Dodaj ${book.title} do ulubionych`} aria-pressed={isFavorite}>
          <motion.span key={popCount} className="heart-icon" initial={popCount && !reduceMotion ? { scale: 0.55 } : false} animate={{ scale: 1 }} transition={heartPop}><Heart fill={isFavorite ? 'currentColor' : 'none'} aria-hidden="true" /></motion.span>
        </button>
        {book.tag && <span className="cover-tag">{book.tag}</span>}
      </div>
      <div className="card-title-row"><h3>{book.title}</h3><Rating value={book.rating} /></div>
      <p className="book-byline">{book.author}</p>
      <p className="book-meta">{book.genre}<span>·</span>{book.year}</p>
    </StaggerItem>
  )
}
