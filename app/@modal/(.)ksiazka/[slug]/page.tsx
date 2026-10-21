import { notFound } from 'next/navigation'
import { BookModal } from '@/components/book/book-modal'
import { getBookBySlug, getBooks } from '@/lib/data'

// Intercepts /ksiazka/[slug] during in-app navigation and shows the book over the current page.
export async function generateStaticParams() {
  const books = await getBooks()
  return books.map((book) => ({ slug: book.slug }))
}

export default async function BookModalPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const book = await getBookBySlug(slug)
  if (!book) notFound()
  return <BookModal book={book} />
}
