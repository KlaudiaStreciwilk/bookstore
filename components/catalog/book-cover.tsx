import type { Book } from '@/lib/types'

// Real cover art when the book has it; otherwise a placeholder jacket: a soft colour per book, the title set in type, and a note.
export function BookCover({ book, large = false }: { book: Book; large?: boolean }) {
  if (book.coverImage) {
    return (
      <div className={`book-cover ${book.cover} ${large ? 'book-cover-large' : ''}`}>
        <img className="cover-image" src={book.coverImage} alt={`Okładka: ${book.title}, ${book.author}`} loading="lazy" decoding="async" />
      </div>
    )
  }

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
