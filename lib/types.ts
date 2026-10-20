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
  tag?: string
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
