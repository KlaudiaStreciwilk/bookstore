'use client'

import { useRef, useState, type MouseEvent } from 'react'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { motion, useReducedMotion, type Variants } from 'motion/react'
import { BookCover } from '@/components/catalog/book-cover'
import { snappySpring } from '@/components/motion/springs'
import { StaggerItem } from '@/components/motion/stagger'
import { Rating } from '@/components/rating'
import { setBookOrigin } from '@/lib/book-origin'
import type { Book } from '@/lib/types'

type BookCardProps = {
  book: Book
  isFavorite: boolean
  /** Omitted for guests: the heart only appears for logged-in readers. */
  onToggleFavorite?: (id: string) => void
  /** Monthly picks variant: shows the short description instead of the year. */
  showDescription?: boolean
}

const heartPop = { type: 'spring', stiffness: 600, damping: 11 } as const

// The book stands on a shelf; "active" (hover on desktop, press/hold on touch) slides it up as if pulled out.
export function BookCard({ book, isFavorite, onToggleFavorite, showDescription = false }: BookCardProps) {
  const reduceMotion = useReducedMotion()
  // Bumped on every click so the heart icon remounts and replays its pop.
  const [popCount, setPopCount] = useState(0)

  const cover: Variants = {
    hidden: { y: 0, rotate: 0 },
    visible: { y: 0, rotate: 0, transition: snappySpring },
    active: reduceMotion ? { y: 0, rotate: 0 } : { y: -10, rotate: -1, transition: snappySpring },
  }

  const coverLinkRef = useRef<HTMLAnchorElement>(null)
  const bookHref = `/ksiazka/${book.slug}`

  // Lets the opened book fly out of this card's cover.
  function rememberOrigin(event: MouseEvent<HTMLAnchorElement>) {
    const cover = coverLinkRef.current?.querySelector<HTMLElement>('.book-cover')
    if (cover) setBookOrigin(book.slug, cover, event.currentTarget)
  }

  function handleFavoriteClick() {
    onToggleFavorite?.(book.id)
    setPopCount((count) => count + 1)
  }

  return (
    <StaggerItem as="article" className={showDescription ? 'book-card book-card-detailed' : 'book-card'} whileHover="active" whileTap="active">
      <div className="card-cover-wrap">
        <Link ref={coverLinkRef} className="card-cover-link" href={bookHref} scroll={false} aria-label={`Otwórz książkę ${book.title}`} onClick={rememberOrigin}>
          <motion.div className="card-cover-motion" variants={cover}><BookCover book={book} /></motion.div>
        </Link>
        {onToggleFavorite && (
          <button className={`heart-button ${isFavorite ? 'is-favorite' : ''}`} type="button" onClick={handleFavoriteClick} aria-label={isFavorite ? `Usuń ${book.title} z ulubionych` : `Dodaj ${book.title} do ulubionych`} aria-pressed={isFavorite}>
            <motion.span key={popCount} className="heart-icon" initial={popCount && !reduceMotion ? { scale: 0.55 } : false} animate={{ scale: 1 }} transition={heartPop}><Heart fill={isFavorite ? 'currentColor' : 'none'} aria-hidden="true" /></motion.span>
          </button>
        )}
        {book.tag && <span className="cover-tag">{book.tag}</span>}
      </div>
      <div className="card-title-row"><h3><Link className="card-title-link" href={bookHref} scroll={false} onClick={rememberOrigin}>{book.title}</Link></h3><Rating value={book.rating} /></div>
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
