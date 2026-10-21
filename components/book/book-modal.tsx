'use client'

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { useRouter } from 'next/navigation'
import { X } from 'lucide-react'
import { motion } from 'motion/react'
import { BookViewer } from '@/components/book/book-viewer'
import { clearBookOrigin, getBookOrigin } from '@/lib/book-origin'
import type { Book } from '@/lib/types'

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])'

// Dialog shown when a book is opened from the home page (intercepted /ksiazka/[slug] route).
// Closing animates the book back into its card, then goes back in history.
export function BookModal({ book }: { book: Book }) {
  const router = useRouter()
  const [origin] = useState(() => getBookOrigin(book.slug))
  const [closing, setClosing] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Lock page scroll, hide the card's cover while its copy is open, focus the close button.
  useEffect(() => {
    const root = document.documentElement
    const previousOverflow = root.style.overflow
    root.style.overflow = 'hidden'
    if (origin) origin.cover.style.visibility = 'hidden'
    closeRef.current?.focus({ preventScroll: true })
    return () => {
      root.style.overflow = previousOverflow
      if (origin) origin.cover.style.visibility = ''
      clearBookOrigin()
    }
  }, [origin])

  const requestClose = useCallback(() => setClosing(true), [])

  const handleCloseComplete = useCallback(() => {
    if (origin) origin.cover.style.visibility = ''
    router.back()
    const trigger = origin?.trigger
    if (trigger) setTimeout(() => trigger.focus({ preventScroll: true }), 50)
  }, [origin, router])

  // Escape closes; Tab cycles inside the dialog.
  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === 'Escape') {
      event.preventDefault()
      requestClose()
      return
    }
    if (event.key !== 'Tab' || !dialogRef.current) return
    const focusable = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((element) => element.offsetParent !== null)
    if (focusable.length === 0) return
    const first = focusable[0]
    const last = focusable[focusable.length - 1]
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault()
      last.focus()
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault()
      first.focus()
    }
  }

  return (
    <div ref={dialogRef} className="book-modal" role="dialog" aria-modal="true" aria-label={`${book.title}, ${book.author}`} onKeyDown={handleKeyDown}>
      <motion.div className="book-modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: closing ? 0 : 1 }} transition={{ duration: closing ? 0.6 : 0.35, delay: closing ? 0.7 : 0 }} onClick={requestClose} />
      <motion.button ref={closeRef} className="book-modal-close" type="button" aria-label="Zamknij książkę" onClick={requestClose} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: closing ? 0 : 1, scale: closing ? 0.8 : 1 }} transition={{ delay: closing ? 0 : 0.5 }}>
        <X aria-hidden="true" />
      </motion.button>
      <BookViewer book={book} origin={origin?.rect} closeRequested={closing} onCloseComplete={handleCloseComplete} />
    </div>
  )
}
