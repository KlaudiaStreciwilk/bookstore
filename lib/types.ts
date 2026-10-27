export type Book = {
  id: string
  slug: string
  title: string
  author: string
  genre: string
  year: number
  rating: number
  /** CSS class with the fallback jacket colour, used when there is no `coverImage`. */
  cover: string
  /** Path to real cover art under `public/`, e.g. "/okladki/diuna.jpg". */
  coverImage?: string
  color: string
  /** Dominant cover colour (hex), used for the pastel card background on hover. */
  accentColor: string
  description: string
  /** 3–4 sentences shown inside the opened book. */
  longDescription: string
  quote: string
  quotePage?: number
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
