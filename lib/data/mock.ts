import type { Book, Chapter, MonthlyPick } from '@/lib/types'

export const books: Book[] = [
  { id: 'cichy-atlas', slug: 'cichy-atlas', title: 'Cichy atlas', author: 'Mira Voss', genre: 'Powieść', year: 2024, rating: 4.9, cover: 'cover-atlas', color: 'deep teal', accentColor: '#2a6f6b', tag: 'Wybór czytelników', description: 'Kartografka Inez wraca do zalanego miasteczka, by narysować mapę miejsc, których już nie ma. Cicha opowieść o pamięci i powrotach.' },
  { id: 'ogrody-z-innego-swiata', slug: 'ogrody-z-innego-swiata', title: 'Ogrody z innego świata', author: 'Alicja Marek', genre: 'Fantastyka', year: 2023, rating: 4.8, cover: 'cover-garden', color: 'botanical', accentColor: '#ca5737', tag: 'Bestseller', description: 'Botaniczka odkrywa, że jej szklarnia nocą otwiera się na obcy ogród. Każda roślina, którą stamtąd przyniesie, coś jej odbiera.' },
  { id: 'po-blekitnej-godzinie', slug: 'po-blekitnej-godzinie', title: 'Po błękitnej godzinie', author: 'Nina Kwiecień', genre: 'Powieść', year: 2025, rating: 4.7, cover: 'cover-blue', color: 'ocean blue', accentColor: '#1d6d78', tag: 'Nowość', description: 'Trzy siostry spotykają się w nadmorskim domu po latach milczenia. Jedno lato wystarczy, by wypłynęły wszystkie sekrety.' },
  { id: 'krotka-historia-zachwytu', slug: 'krotka-historia-zachwytu', title: 'Krótka historia zachwytu', author: 'Jan Wysocki', genre: 'Historia', year: 2022, rating: 4.6, cover: 'cover-ornate', color: 'copper floral', accentColor: '#b34c37', description: 'Od gotyckich witraży po pierwsze kino — jak ludzie przez wieki uczyli się zachwytu. Erudycyjna i zaskakująco lekka podróż.' },
  { id: 'ksztalt-przemiany', slug: 'ksztalt-przemiany', title: 'Kształt przemiany', author: 'Joanna Bork', genre: 'Science fiction', year: 2024, rating: 4.8, cover: 'cover-moth', color: 'night garden', accentColor: '#cf7c54', description: 'W mieście, gdzie ludzie co dekadę zmieniają ciała, jedna kobieta postanawia zostać sobą. Niepokojąca i piękna wizja przyszłości.' },
  { id: 'male-ognie', slug: 'male-ognie', title: 'Małe ognie', author: 'Lena Arendt', genre: 'Biografia', year: 2021, rating: 4.5, cover: 'cover-fire', color: 'rust and cream', accentColor: '#ba765c', description: 'Portret zapomnianej szklarki, która w powojennej Polsce rozpalała piece i wyobraźnię. Biografia pełna ciepła i szczegółu.' },
  { id: 'sygnaly-z-glebin', slug: 'sygnaly-z-glebin', title: 'Sygnały z głębin', author: 'Artur Cichy', genre: 'Science fiction', year: 2023, rating: 4.7, cover: 'cover-depth', color: 'glacial blue', accentColor: '#568a8c', description: 'Załoga stacji badawczej pod lodem odbiera rytmiczny sygnał z dna oceanu. Im lepiej go rozumieją, tym mniej ufają sobie nawzajem.' },
  { id: 'tam-gdzie-pamieta-przyplyw', slug: 'tam-gdzie-pamieta-przyplyw', title: 'Tam, gdzie pamięta przypływ', author: 'Ada Laskowska', genre: 'Powieść', year: 2020, rating: 4.4, cover: 'cover-tide', color: 'sea glass', accentColor: '#7da59c', description: 'Latarnik i dziewczynka z pobliskiej wioski piszą do siebie listy wrzucane do morza. Czuła historia o samotności i przyjaźni.' },
  { id: 'lato-w-kolorze-sliwek', slug: 'lato-w-kolorze-sliwek', title: 'Lato w kolorze śliwek', author: 'Zofia Mrozek', genre: 'Powieść', year: 2026, rating: 4.6, cover: 'cover-plum', color: 'plum and rose', accentColor: '#7b50d1', tag: 'Nowość', description: 'Ostatnie wakacje przed dorosłością w sadzie babci, gdzie każdy owoc smakuje jak obietnica. Słodko-gorzka opowieść o dorastaniu.' },
  { id: 'zegarmistrz-chmur', slug: 'zegarmistrz-chmur', title: 'Zegarmistrz chmur', author: 'Tomasz Wilk', genre: 'Fantastyka', year: 2025, rating: 4.7, cover: 'cover-clouds', color: 'sunny amber', accentColor: '#f9a220', description: 'Chłopak z warsztatu na dachu naprawia mechanizmy, które poruszają niebem. Gdy jeden z nich staje, nad miastem zatrzymuje się pogoda.' },
  { id: 'kobieta-ktora-liczyla-gwiazdy', slug: 'kobieta-ktora-liczyla-gwiazdy', title: 'Kobieta, która liczyła gwiazdy', author: 'Ewa Lis', genre: 'Biografia', year: 2025, rating: 4.8, cover: 'cover-stars', color: 'midnight violet', accentColor: '#3b308f', description: 'Historia astronomki, która w XIX wieku skatalogowała tysiące gwiazd, choć nauka nie chciała znać jej nazwiska.' },
  { id: 'miasto-rozowego-szumu', slug: 'miasto-rozowego-szumu', title: 'Miasto różowego szumu', author: 'Kacper Nowicki', genre: 'Science fiction', year: 2026, rating: 4.5, cover: 'cover-neon', color: 'neon pink', accentColor: '#ff6fb5', tag: 'Nowość', description: 'W megapolis, gdzie sny można kupić w automacie, młoda hakerka znajduje sen, który ktoś ukrył przed wszystkimi. Szybka i olśniewająca.' },
]

export const genres = ['Powieść', 'Fantastyka', 'Science fiction', 'Biografia', 'Historia']

// Editors' picks per month, oldest first. Later: a `monthly_picks` table with a `book_ids` array.
export const monthlyPicks: MonthlyPick[] = [
  { month: '2026-08', label: 'Sierpień', bookIds: ['cichy-atlas', 'ogrody-z-innego-swiata', 'krotka-historia-zachwytu', 'male-ognie'] },
  { month: '2026-09', label: 'Wrzesień', bookIds: ['po-blekitnej-godzinie', 'ksztalt-przemiany', 'sygnaly-z-glebin', 'tam-gdzie-pamieta-przyplyw'] },
  { month: '2026-10', label: 'Październik', bookIds: ['lato-w-kolorze-sliwek', 'zegarmistrz-chmur', 'kobieta-ktora-liczyla-gwiazdy', 'miasto-rozowego-szumu'] },
]

export const weeklyBookSlug = 'cichy-atlas'

export const chapters: Chapter[] = [
  { eyebrow: 'ROZDZIAŁ SIÓDMY', title: 'Mapa deszczu', excerpt: 'O poranku droga zniknęła pod srebrzystą wodą. Inez i tak rozłożyła mapę.', quote: '„Niektóre miejsca nie proszą, by je odnaleźć. Proszą, by o nich pamiętać”.', page: '147' },
  { eyebrow: 'ROZDZIAŁ ÓSMY', title: 'Dom po drugiej stronie', excerpt: 'W oknach paliło się światło, choć od lat nikt tam nie mieszkał.', quote: '„Są powroty, które zaczynają się od cichego pukania”.', page: '163' },
]
