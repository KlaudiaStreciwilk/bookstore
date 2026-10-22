import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { BookViewer } from '@/components/book/book-viewer'
import { SiteHeader } from '@/components/site-header'
import { getCurrentUser } from '@/lib/auth/session'
import { getBookBySlug, getBooks } from '@/lib/data'

type BookPageProps = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  const books = await getBooks()
  return books.map((book) => ({ slug: book.slug }))
}

export async function generateMetadata({ params }: BookPageProps): Promise<Metadata> {
  const book = await getBookBySlug((await params).slug)
  return book ? { title: `${book.title} — ${book.author} | Książkarnia`, description: book.description } : {}
}

// Full page for a book, used when /ksiazka/[slug] is opened directly (shared link, refresh).
export default async function BookPage({ params }: BookPageProps) {
  const { slug } = await params
  const [book, user] = await Promise.all([getBookBySlug(slug), getCurrentUser()])
  if (!book) notFound()

  return (
    <div id="top" className="book-page-layout">
      <SiteHeader user={user} />
      <main className="book-page-main page-shell">
        <BookViewer book={book} />
        <Link className="book-page-back" href="/#katalog"><ArrowLeft aria-hidden="true" /> Wróć do katalogu</Link>
      </main>
    </div>
  )
}
