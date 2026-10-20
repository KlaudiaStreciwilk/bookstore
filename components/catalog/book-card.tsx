'use client'

import { useState } from 'react'
import { Heart } from 'lucide-react'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { BookCover } from '@/components/catalog/book-cover'
import { snappySpring } from '@/components/motion/springs'
import { StaggerItem } from '@/components/motion/stagger'
import { Rating } from '@/components/rating'
import { tint } from '@/lib/colors'
import type { Book } from '@/lib/types'

type BookCardProps = {
  book: Book
  isFavorite: boolean
  onToggleFavorite: (id: string) => void
  /** Monthly picks variant: shows the short description instead of the year. */
  showDescription?: boolean
}

const PANEL_REST = '#f4f0fa'
const colorTransition = { duration: 0.3, ease: 'easeOut' } as const
const heartPop = { type: 'spring', stiffness: 600, damping: 11 } as const

// "active" is driven by hover on desktop and by press/hold on touch screens.
export function BookCard({ book, isFavorite, onToggleFavorite, showDescription = false }: BookCardProps) {
  const reduceMotion = useReducedMotion()
  // Bumped on every click so the heart icon remounts and replays its pop.
  const [popCount, setPopCount] = useState(0)

  const panel: Variants = {
    hidden: { backgroundColor: PANEL_REST },
    visible: { backgroundColor: PANEL_REST, transition: colorTransition },
    active: { backgroundColor: tint(book.accentColor, 0.25), transition: colorTransition },
  }
  const cover: Variants = {
    hidden: { y: 0, rotate: 0 },
    visible: { y: 0, rotate: 0, transition: snappySpring },
    active: reduceMotion ? { y: 0, rotate: 0 } : { y: -6, rotate: -2, transition: snappySpring },
  }

  function handleFavoriteClick() {
    onToggleFavorite(book.id)
    setPopCount((count) => count + 1)
  }

  return (
    <StaggerItem as="article" className={showDescription ? 'book-card book-card-detailed' : 'book-card'} whileHover="active" whileTap="active">
      <motion.div className="card-cover-wrap" variants={panel} style={{ backgroundColor: PANEL_REST }}>
        <motion.div className="card-cover-motion" variants={cover}><BookCover book={book} /></motion.div>
        <button className={`heart-button ${isFavorite ? 'is-favorite' : ''}`} type="button" onClick={handleFavoriteClick} aria-label={isFavorite ? `Usuń ${book.title} z ulubionych` : `Dodaj ${book.title} do ulubionych`} aria-pressed={isFavorite}>
          <motion.span key={popCount} className="heart-icon" initial={popCount && !reduceMotion ? { scale: 0.55 } : false} animate={{ scale: 1 }} transition={heartPop}><Heart fill={isFavorite ? 'currentColor' : 'none'} aria-hidden="true" /></motion.span>
        </button>
        {book.tag && <span className="cover-tag">{book.tag}</span>}
      </motion.div>
      <div className="card-title-row"><h3>{book.title}</h3><Rating value={book.rating} /></div>
      <p className="book-byline">{book.author}</p>
      {showDescription ? (
        <>
          <p className="book-meta">{book.genre}</p>
          <p className="book-description">{book.description}</p>
        </>
      ) : (
        <p className="book-meta">{book.genre}<span>·</span>{book.year}</p>
      )}
    </StaggerItem>
  )
}
