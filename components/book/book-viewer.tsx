'use client'

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from 'react'
import { Heart } from 'lucide-react'
import { useAnimate, useReducedMotion } from 'motion/react'
import { BookCover } from '@/components/catalog/book-cover'
import { useSharedFavorites } from '@/components/favorites-provider'
import { Rating } from '@/components/rating'
import type { Book } from '@/lib/types'

/** Must match the CSS transition of `.book-spread` / `.book-leaf`. */
const OPEN_MS = 900
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))
/** Number of pages that riffle over once the cover is open. */
const PAGES = [0, 1, 2, 3, 4, 5]

type FlightStart = { x: number; y: number; scale: number }

type BookViewerProps = {
  book: Book
  /** Rect of the clicked cover; the book flies out of it and back into it on close. */
  origin?: DOMRect
  closeRequested?: boolean
  onCloseComplete?: () => void
}

function BookDetails({ book }: { book: Book }) {
  return (
    <div className="book-details">
      <p className="book-details-genre">{book.genre}</p>
      <h2 className="book-details-title">{book.title}</h2>
      <p className="book-details-author">{book.author}</p>
      <p className="book-details-meta"><Rating value={book.rating} /><span>·</span>{book.year}</p>
      <p className="book-details-description">{book.longDescription}</p>
    </div>
  )
}

// A book that flies in, opens its cover in 3D and shows its "inside" on two pages
// (one scrollable page on phones). Open/close are CSS transitions driven by `data-state`.
export function BookViewer({ book, origin, closeRequested = false, onCloseComplete }: BookViewerProps) {
  const reduceMotion = useReducedMotion()
  const { favoritesEnabled, isFavorite, toggleFavorite } = useSharedFavorites()
  const [flyerRef, animate] = useAnimate<HTMLDivElement>()
  const leafRef = useRef<HTMLDivElement>(null)
  const flightStart = useRef<FlightStart | null>(null)
  const [state, setState] = useState<'closed' | 'open'>('closed')
  const favorite = isFavorite(book.id)

  // Opening: fly from the clicked cover to the centre, then open the cover.
  useLayoutEffect(() => {
    const flyer = flyerRef.current
    const leaf = leafRef.current
    if (!flyer || !leaf) return
    let cancelled = false

    async function open() {
      if (origin && !reduceMotion) {
        const flyerRect = flyer.getBoundingClientRect()
        const target = leaf!.getBoundingClientRect()
        const start = { x: origin.left - target.left, y: origin.top - target.top, scale: origin.width / target.width }
        flightStart.current = start
        // Scale around the cover's top-left corner so it lands exactly on the clicked card.
        flyer.style.transformOrigin = `${target.left - flyerRect.left}px ${target.top - flyerRect.top}px`
        flyer.style.transform = `translate(${start.x}px, ${start.y}px) scale(${start.scale})`
        await animate(flyer, { x: [start.x, 0], y: [start.y, 0], scale: [start.scale, 1] }, { type: 'spring', stiffness: 160, damping: 24 })
      } else if (!reduceMotion) {
        await wait(250)
      }
      if (!cancelled) setState('open')
    }

    void open()
    return () => { cancelled = true }
    // Runs once on mount: the origin is captured at click time.
  }, [])

  // Closing: close the cover, then fly back to the card.
  useEffect(() => {
    if (!closeRequested) return
    let cancelled = false

    async function close() {
      setState('closed')
      if (reduceMotion) {
        onCloseComplete?.()
        return
      }
      await wait(OPEN_MS)
      const start = flightStart.current
      if (start && flyerRef.current && !cancelled) {
        await animate(flyerRef.current, { x: start.x, y: start.y, scale: start.scale }, { duration: 0.45, ease: [0.4, 0, 0.2, 1] })
      }
      if (!cancelled) onCloseComplete?.()
    }

    void close()
    return () => { cancelled = true }
  }, [animate, closeRequested, flyerRef, onCloseComplete, reduceMotion])

  return (
    <div className="book-viewer" data-state={state}>
      <div className="book-flyer" ref={flyerRef}>
        <div className="book-spread">
          <div className="book-sheet book-sheet-right">
            <div className="book-mobile-details"><BookDetails book={book} /></div>
            <figure className="book-quote">
              <blockquote>„{book.quote}”</blockquote>
              {book.quotePage && <figcaption>— str. {book.quotePage} —</figcaption>}
            </figure>
            {favoritesEnabled && (
              <button className={`book-favorite ${favorite ? 'is-favorite' : ''}`} type="button" aria-pressed={favorite} onClick={() => toggleFavorite(book.id)}>
                <Heart fill={favorite ? 'currentColor' : 'none'} aria-hidden="true" />
                {favorite ? 'W ulubionych' : 'Dodaj do ulubionych'}
              </button>
            )}
          </div>
          {/* Loose pages that riffle over after the cover opens; purely decorative. */}
          {PAGES.map((index) => <span key={index} className="book-flip-page" style={{ '--page': index } as CSSProperties} aria-hidden="true" />)}
          <div className="book-leaf" ref={leafRef}>
            <div className="book-leaf-front" aria-hidden={state === 'open'}><BookCover book={book} /></div>
            <div className="book-leaf-back book-sheet"><BookDetails book={book} /></div>
          </div>
        </div>
      </div>
    </div>
  )
}
