import type { Book, WeeklyBook } from '@/lib/types'
import { books, chapters, genres, weeklyBookSlug } from './mock'

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
