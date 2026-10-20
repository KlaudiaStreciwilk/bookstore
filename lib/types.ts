export type Book = {
  id: string
  slug: string
  title: string
  author: string
  genre: string
  year: number
  rating: number
  cover: string
  color: string
  /** Dominant cover colour (hex), used for the pastel card background on hover. */
  accentColor: string
  description: string
  tag?: string
}

export type MonthlyPick = {
  /** ISO month, e.g. "2026-10". */
  month: string
  label: string
  bookIds: string[]
}

export type MonthlyPickWithBooks = Omit<MonthlyPick, 'bookIds'> & {
  books: Book[]
}

export type Chapter = {
  eyebrow: string
  title: string
  excerpt: string
  quote: string
  page: string
}

export type WeeklyBook = {
  book: Book
  chapters: Chapter[]
}
