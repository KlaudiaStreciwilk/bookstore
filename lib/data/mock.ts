import type { Book, Chapter } from '@/lib/types'

export const books: Book[] = [
  { id: 'cichy-atlas', slug: 'cichy-atlas', title: 'Cichy atlas', author: 'Mira Voss', genre: 'Powieść', year: 2024, rating: 4.9, cover: 'cover-atlas', color: 'deep teal', tag: 'Wybór czytelników' },
  { id: 'ogrody-z-innego-swiata', slug: 'ogrody-z-innego-swiata', title: 'Ogrody z innego świata', author: 'Alicja Marek', genre: 'Fantastyka', year: 2023, rating: 4.8, cover: 'cover-garden', color: 'botanical', tag: 'Bestseller' },
  { id: 'po-blekitnej-godzinie', slug: 'po-blekitnej-godzinie', title: 'Po błękitnej godzinie', author: 'Nina Kwiecień', genre: 'Powieść', year: 2025, rating: 4.7, cover: 'cover-blue', color: 'ocean blue', tag: 'Nowość' },
  { id: 'krotka-historia-zachwytu', slug: 'krotka-historia-zachwytu', title: 'Krótka historia zachwytu', author: 'Jan Wysocki', genre: 'Historia', year: 2022, rating: 4.6, cover: 'cover-ornate', color: 'copper floral' },
  { id: 'ksztalt-przemiany', slug: 'ksztalt-przemiany', title: 'Kształt przemiany', author: 'Joanna Bork', genre: 'Science fiction', year: 2024, rating: 4.8, cover: 'cover-moth', color: 'night garden' },
  { id: 'male-ognie', slug: 'male-ognie', title: 'Małe ognie', author: 'Lena Arendt', genre: 'Biografia', year: 2021, rating: 4.5, cover: 'cover-fire', color: 'rust and cream' },
  { id: 'sygnaly-z-glebin', slug: 'sygnaly-z-glebin', title: 'Sygnały z głębin', author: 'Artur Cichy', genre: 'Science fiction', year: 2023, rating: 4.7, cover: 'cover-depth', color: 'glacial blue' },
  { id: 'tam-gdzie-pamieta-przyplyw', slug: 'tam-gdzie-pamieta-przyplyw', title: 'Tam, gdzie pamięta przypływ', author: 'Ada Laskowska', genre: 'Powieść', year: 2020, rating: 4.4, cover: 'cover-tide', color: 'sea glass' },
]

export const genres = ['Powieść', 'Fantastyka', 'Science fiction', 'Biografia', 'Historia']

export const weeklyBookSlug = 'cichy-atlas'

export const chapters: Chapter[] = [
  { eyebrow: 'ROZDZIAŁ SIÓDMY', title: 'Mapa deszczu', excerpt: 'O poranku droga zniknęła pod srebrzystą wodą. Inez i tak rozłożyła mapę.', quote: '„Niektóre miejsca nie proszą, by je odnaleźć. Proszą, by o nich pamiętać”.', page: '147' },
  { eyebrow: 'ROZDZIAŁ ÓSMY', title: 'Dom po drugiej stronie', excerpt: 'W oknach paliło się światło, choć od lat nikt tam nie mieszkał.', quote: '„Są powroty, które zaczynają się od cichego pukania”.', page: '163' },
]
