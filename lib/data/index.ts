import type { Book, MonthlyPickWithBooks, WeeklyBook } from '@/lib/types'
import { books, chapters, genres, monthlyPicks, weeklyBookSlug } from './mock'

// Data access layer. Currently backed by mock data — swap these implementations for CMS calls later.

export async function getBooks(): Promise<Book[]> {
  return books
}

export async function getBookBySlug(slug: string): Promise<Book | undefined> {
  return books.find((book) => book.slug === slug)
}

export async function getGenres(): Promise<string[]> {
  return genres
}

export async function getWeeklyBook(): Promise<WeeklyBook | undefined> {
  const book = await getBookBySlug(weeklyBookSlug)
  return book && { book, chapters }
}

/** Monthly editors' picks with resolved books, oldest month first. */
export async function getMonthlyPicks(): Promise<MonthlyPickWithBooks[]> {
  const byId = new Map(books.map((book) => [book.id, book]))
  return [...monthlyPicks]
    .sort((a, b) => a.month.localeCompare(b.month))
    .map(({ bookIds, ...pick }) => ({
      ...pick,
      books: bookIds.map((id) => byId.get(id)).filter((book): book is Book => Boolean(book)),
    }))
}
