import type { Book } from '@/lib/types'

// Placeholder jacket until real cover art arrives: a soft colour per book, the title set in type, and a note.
export function BookCover({ book, large = false }: { book: Book; large?: boolean }) {
  return (
    <div className={`book-cover ${book.cover} ${large ? 'book-cover-large' : ''}`} role="img" aria-label={`${book.title}, ${book.author} — okładka wkrótce`}>
      <div className="cover-copy">
        <span className="cover-author">{book.author}</span>
        <span className="cover-rule" aria-hidden="true" />
        <span className="cover-title">{book.title}</span>
        <span className="cover-rule" aria-hidden="true" />
        <span className="cover-soon">{large ? 'Okładka pojawi się wkrótce' : 'Okładka wkrótce'}</span>
      </div>
    </div>
  )
}
