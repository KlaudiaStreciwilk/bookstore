import { Sparkles } from 'lucide-react'
import { BookCover } from '@/components/catalog/book-cover'
import { FadeIn } from '@/components/motion/fade-in'
import type { Book } from '@/lib/types'

// Decorative side panel of the auth pages: fanned book covers and a short slogan. Hidden on phones.
export function AuthShowcase({ books }: { books: Book[] }) {
  return (
    <aside className="auth-showcase">
      <div className="auth-showcase-glow" aria-hidden="true" />
      <FadeIn className="auth-covers" aria-hidden="true">
        {books.slice(0, 3).map((book, index) => (
          <div className={`auth-cover auth-cover-${index + 1}`} key={book.id}><BookCover book={book} /></div>
        ))}
      </FadeIn>
      <FadeIn className="auth-showcase-copy" delay={0.15}>
        <p className="eyebrow"><Sparkles aria-hidden="true" /> Twoja półka czeka</p>
        <h2>Historie, które <em>zostają.</em></h2>
        <p>Zapisuj ulubione książki, wracaj do fragmentów i odkrywaj co tydzień nową lekturę razem z ponad 12 tys. czytelników.</p>
      </FadeIn>
    </aside>
  )
}
