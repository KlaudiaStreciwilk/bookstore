import type { Book } from '@/lib/types'

export function BookCover({ book, large = false }: { book: Book; large?: boolean }) {
  return (
    <div className={`book-cover ${book.cover} ${large ? 'book-cover-large' : ''}`} role="img" aria-label={`Okładka książki ${book.title} autorstwa ${book.author}`}>
      {book.id === 'cichy-atlas' && <div className="atlas-art" />}
      <div className="cover-copy">
        {large && <span className="cover-kicker">POWIEŚĆ MIRY VOSS</span>}
        <span className="cover-title">{book.id === 'cichy-atlas' ? <>Cichy<br />atlas</> : book.title}</span>
        <span className="cover-author">{book.author}</span>
      </div>
      <span className="cover-grain" aria-hidden="true" />
    </div>
  )
}
