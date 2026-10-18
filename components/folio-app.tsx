'use client'

import { useEffect, useMemo, useState } from 'react'
import { ArrowDown, ArrowRight, BookOpen, Check, ChevronDown, Heart, Search, Sparkles, Star } from 'lucide-react'

type Book = {
  id: string
  title: string
  author: string
  genre: string
  year: number
  rating: number
  cover: string
  color: string
  tag?: string
}

const books: Book[] = [
  { id: 'cichy-atlas', title: 'Cichy atlas', author: 'Mira Voss', genre: 'Powieść', year: 2024, rating: 4.9, cover: 'cover-atlas', color: 'deep teal', tag: 'Wybór czytelników' },
  { id: 'ogrody-z-innego-swiata', title: 'Ogrody z innego świata', author: 'Alicja Marek', genre: 'Fantastyka', year: 2023, rating: 4.8, cover: 'cover-garden', color: 'botanical', tag: 'Bestseller' },
  { id: 'po-blekitnej-godzinie', title: 'Po błękitnej godzinie', author: 'Nina Kwiecień', genre: 'Powieść', year: 2025, rating: 4.7, cover: 'cover-blue', color: 'ocean blue', tag: 'Nowość' },
  { id: 'krotka-historia-zachwytu', title: 'Krótka historia zachwytu', author: 'Jan Wysocki', genre: 'Historia', year: 2022, rating: 4.6, cover: 'cover-ornate', color: 'copper floral' },
  { id: 'ksztalt-przemiany', title: 'Kształt przemiany', author: 'Joanna Bork', genre: 'Science fiction', year: 2024, rating: 4.8, cover: 'cover-moth', color: 'night garden' },
  { id: 'male-ognie', title: 'Małe ognie', author: 'Lena Arendt', genre: 'Biografia', year: 2021, rating: 4.5, cover: 'cover-fire', color: 'rust and cream' },
  { id: 'sygnaly-z-glebin', title: 'Sygnały z głębin', author: 'Artur Cichy', genre: 'Science fiction', year: 2023, rating: 4.7, cover: 'cover-depth', color: 'glacial blue' },
  { id: 'tam-gdzie-pamieta-przyplyw', title: 'Tam, gdzie pamięta przypływ', author: 'Ada Laskowska', genre: 'Powieść', year: 2020, rating: 4.4, cover: 'cover-tide', color: 'sea glass' },
]

const genres = ['Wszystkie', 'Powieść', 'Fantastyka', 'Science fiction', 'Biografia', 'Historia']
const chapters = [
  { eyebrow: 'ROZDZIAŁ SIÓDMY', title: 'Mapa deszczu', excerpt: 'O poranku droga zniknęła pod srebrzystą wodą. Inez i tak rozłożyła mapę.', quote: '„Niektóre miejsca nie proszą, by je odnaleźć. Proszą, by o nich pamiętać”.', page: '147' },
  { eyebrow: 'ROZDZIAŁ ÓSMY', title: 'Dom po drugiej stronie', excerpt: 'W oknach paliło się światło, choć od lat nikt tam nie mieszkał.', quote: '„Są powroty, które zaczynają się od cichego pukania”.', page: '163' },
]

function Brand() {
  return <a className="brand" href="#top" aria-label="folio — strona główna"><span className="brand-mark"><BookOpen aria-hidden="true" /></span><span>folio<span className="brand-dot">.</span></span></a>
}

function BookCover({ book, large = false }: { book: Book; large?: boolean }) {
  return (
    <div className={`book-cover ${book.cover} ${large ? 'book-cover-large' : ''}`} role="img" aria-label={`Okładka książki ${book.title} autorstwa ${book.author}`}>
      {book.id === 'cichy-atlas' && <div className="atlas-art" />}
      <div className="cover-copy">
        {large && <span className="cover-kicker">POWIEŚĆ MIRY VOSS</span>}
        <span className="cover-title">{book.id === 'cichy-atlas' ? <>Cichy<br />atlas</> : book.title}</span>
        <span className="cover-author">{book.author}</span>
      </div>
      <span className="cover-grain" aria-hidden="true" />
    </div>
  )
}

function Rating({ value }: { value: number }) {
  return <span className="rating"><span className="rating-stars" aria-label={`${value} na 5`}><Star fill="currentColor" aria-hidden="true" /></span><span>{value.toFixed(1)}</span></span>
}

export default function FolioApp() {
  const [favorites, setFavorites] = useState<string[]>([])
  const [favoritesReady, setFavoritesReady] = useState(false)
  const [query, setQuery] = useState('')
  const [genre, setGenre] = useState('Wszystkie')
  const [author, setAuthor] = useState('Wszyscy autorzy')
  const [year, setYear] = useState('Dowolny rok')
  const [minRating, setMinRating] = useState('Dowolne')
  const [favoritesOnly, setFavoritesOnly] = useState(false)
  const [sortBest, setSortBest] = useState(false)
  const [chapterIndex, setChapterIndex] = useState(0)

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem('folio-favorites')
      const parsed: unknown = saved ? JSON.parse(saved) : []
      setFavorites(Array.isArray(parsed) && parsed.every((value): value is string => typeof value === 'string') ? parsed : [])
    } catch {
      setFavorites([])
    } finally {
      setFavoritesReady(true)
    }
  }, [])

  useEffect(() => {
    if (!favoritesReady) return
    try {
      window.localStorage.setItem('folio-favorites', JSON.stringify(favorites))
    } catch {
      // Favorites remain available for the current session when storage is unavailable.
    }
  }, [favorites, favoritesReady])

  const filteredBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('pl')
    const result = books.filter((book) => {
      const matchesText = !normalizedQuery || `${book.title} ${book.author}`.toLocaleLowerCase('pl').includes(normalizedQuery)
      const matchesGenre = genre === 'Wszystkie' || book.genre === genre
      const matchesAuthor = author === 'Wszyscy autorzy' || book.author === author
      const matchesYear = year === 'Dowolny rok' || String(book.year) === year
      const matchesRating = minRating === 'Dowolne' || book.rating >= Number(minRating)
      const matchesFavorites = !favoritesOnly || favorites.includes(book.id)
      return matchesText && matchesGenre && matchesAuthor && matchesYear && matchesRating && matchesFavorites
    })
    return sortBest ? result.sort((a, b) => b.rating - a.rating) : result
  }, [author, favorites, favoritesOnly, genre, minRating, query, sortBest, year])

  function toggleFavorite(id: string) {
    setFavorites((current) => current.includes(id) ? current.filter((favorite) => favorite !== id) : [...current, id])
  }

  function resetFilters() {
    setQuery('')
    setGenre('Wszystkie')
    setAuthor('Wszyscy autorzy')
    setYear('Dowolny rok')
    setMinRating('Dowolne')
    setFavoritesOnly(false)
    setSortBest(false)
  }

  return (
    <main id="top" className="folio-page">
      <header className="site-header">
        <div className="header-inner">
          <Brand />
          <nav className="main-nav" aria-label="Nawigacja główna">
            <a className="nav-link active" href="#top" onClick={resetFilters}>Odkrywaj</a>
            <a className="nav-link" href="#katalog" onClick={() => { setFavoritesOnly(false); setSortBest(false) }}>Przeglądaj</a>
            <button className={`nav-link ${sortBest ? 'nav-selected' : ''}`} type="button" onClick={() => { setSortBest((value) => !value); setFavoritesOnly(false); document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' }) }}>Bestsellery</button>
            <button className={`nav-link nav-favorites ${favoritesOnly ? 'nav-selected' : ''}`} type="button" aria-pressed={favoritesOnly} onClick={() => { setFavoritesOnly((value) => !value); setSortBest(false); document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' }) }}>Ulubione <span className="favorite-count">{favorites.length}</span></button>
          </nav>
          <button className="profile-button" type="button" aria-label="Profil: AR">AR</button>
          <button className="mobile-favorites" type="button" aria-label={`Ulubione: ${favorites.length}`} onClick={() => { setFavoritesOnly((value) => !value); document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' }) }}><Heart aria-hidden="true" /><span>{favorites.length}</span></button>
        </div>
      </header>

      <section className="hero-section" aria-labelledby="hero-title">
        <div className="hero-orb hero-orb-peach" aria-hidden="true" />
        <div className="hero-orb hero-orb-blue" aria-hidden="true" />
        <div className="hero-inner page-shell">
          <div className="hero-copy">
            <p className="eyebrow"><Sparkles aria-hidden="true" /> Twoja następna ulubiona książka już czeka</p>
            <h1 id="hero-title">Znajdź historie,<br /><em>które zostają.</em></h1>
            <p className="hero-description">Starannie wybrane książki dla ciekawych świata. Odkrywaj nowe światy, świeże idee i niezapomniane głosy.</p>
            <div className="hero-actions">
              <a className="primary-cta" href="#katalog">Poznaj kolekcję <ArrowRight aria-hidden="true" /></a>
              <div className="reader-proof" aria-label="Ponad 12 tysięcy zadowolonych czytelników">
                <div className="avatar-stack" aria-hidden="true"><span>MK</span><span>JL</span><span>SA</span></div>
                <p><strong>12 tys.+</strong><span>zadowolonych czytelników</span></p>
              </div>
            </div>
          </div>
          <div className="hero-art" aria-label="Polecana książka: Cichy atlas">
            <div className="hero-ring" aria-hidden="true" />
            <div className="hero-book-wrap"><BookCover book={books[0]} large /></div>
            <div className="rating-float"><div><strong>Wybór czytelników</strong><span className="float-stars">★★★★★</span></div><strong>4.9</strong></div>
            <div className="new-badge"><Sparkles aria-hidden="true" /> Nowość</div>
          </div>
        </div>
        <a className="scroll-cue" href="#tygodnia" aria-label="Przewiń do książki tygodnia"><ArrowDown aria-hidden="true" /></a>
      </section>

      <section className="weekly-section" id="tygodnia" aria-labelledby="weekly-title">
        <div className="weekly-inner page-shell">
          <div className="weekly-copy">
            <p className="eyebrow weekly-eyebrow">W środku książki tygodnia</p>
            <h2 id="weekly-title">Historia, którą<br />warto otworzyć</h2>
            <p>Przewiń do nowego rozdziału. Co tydzień nasi redaktorzy wybierają jedną niezwykłą lekturę.</p>
            <button className="chapter-button" type="button" onClick={() => setChapterIndex((current) => (current + 1) % chapters.length)} aria-label="Otwórz następny rozdział"><span>{chapterIndex === 0 ? 'Odkryj fragment' : 'Wróć do fragmentu'}</span><ArrowRight aria-hidden="true" /></button>
          </div>
          <button className="open-book" type="button" onClick={() => setChapterIndex((current) => (current + 1) % chapters.length)} aria-label="Zmień fragment książki">
            <span className="book-page left-page">
              <span className="chapter-label">{chapters[chapterIndex].eyebrow}</span>
              <strong className="chapter-title">{chapters[chapterIndex].title}</strong>
              <span className="chapter-excerpt">{chapters[chapterIndex].excerpt}</span>
            </span>
            <span className="book-page right-page">
              <span className="chapter-quote">{chapters[chapterIndex].quote}</span>
              <span className="page-number">— {chapters[chapterIndex].page} —</span>
            </span>
            <span className="page-hint"><ArrowRight aria-hidden="true" /> kolejny rozdział</span>
          </button>
        </div>
      </section>

      <section className="catalog-section" id="katalog" aria-labelledby="catalog-title">
        <div className="page-shell">
          <div className="catalog-heading">
            <div><p className="eyebrow catalog-eyebrow">Wybrane dla ciekawych czytelników</p><h2 id="catalog-title">Odkryj kolejną<br className="mobile-break" /> lekturę</h2></div>
            <p className="catalog-intro">Od subtelnych literackich perełek po odważne nowe światy — każdy czytelnik znajdzie tu coś dla siebie.</p>
          </div>

          <div className="filter-panel" aria-label="Filtry książek">
            <label className="search-field"><span>Szukaj według tytułu lub autora</span><div className="search-input-wrap"><Search aria-hidden="true" /><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Szukaj „Cichy atlas”" /></div></label>
            <label className="select-field"><span>Autor</span><span className="select-wrap"><select value={author} onChange={(event) => setAuthor(event.target.value)}><option>Wszyscy autorzy</option>{books.map((book) => <option key={book.author}>{book.author}</option>)}</select><ChevronDown aria-hidden="true" /></span></label>
            <label className="select-field"><span>Rok wydania</span><span className="select-wrap"><select value={year} onChange={(event) => setYear(event.target.value)}><option>Dowolny rok</option>{[2025, 2024, 2023, 2022, 2021, 2020].map((value) => <option key={value}>{value}</option>)}</select><ChevronDown aria-hidden="true" /></span></label>
            <fieldset className="rating-filter"><legend>Minimalna ocena</legend><div className="rating-options">{['Dowolne', '4+', '4.5+'].map((value) => <button key={value} className={minRating === value ? 'filter-option selected' : 'filter-option'} type="button" aria-pressed={minRating === value} onClick={() => setMinRating(value)}>{value}</button>)}</div></fieldset>
            <div className="genre-filter"><span className="filter-label">Odkrywaj według gatunku</span><div className="genre-list" role="group" aria-label="Gatunek">{genres.map((value) => <button key={value} className={genre === value ? 'genre-pill selected' : 'genre-pill'} type="button" aria-pressed={genre === value} onClick={() => setGenre(value)}>{value}</button>)}</div></div>
          </div>

          <div className="results-heading"><p><span className="results-dot" /> {favoritesOnly ? 'Twoje ulubione' : sortBest ? 'Czytelnicze bestsellery' : 'Książki do odkrycia'} <span className="result-total">{filteredBooks.length}</span></p>{(query || genre !== 'Wszystkie' || author !== 'Wszyscy autorzy' || year !== 'Dowolny rok' || minRating !== 'Dowolne' || favoritesOnly || sortBest) && <button className="clear-filters" type="button" onClick={resetFilters}>Wyczyść filtry</button>}</div>

          {filteredBooks.length > 0 ? <div className="book-grid">{filteredBooks.map((book) => {
            const isFavorite = favorites.includes(book.id)
            return <article className="book-card" key={book.id}>
              <div className="card-cover-wrap"><BookCover book={book} /><button className={`heart-button ${isFavorite ? 'is-favorite' : ''}`} type="button" onClick={() => toggleFavorite(book.id)} aria-label={isFavorite ? `Usuń ${book.title} z ulubionych` : `Dodaj ${book.title} do ulubionych`} aria-pressed={isFavorite}><Heart fill={isFavorite ? 'currentColor' : 'none'} aria-hidden="true" /></button>{book.tag && <span className="cover-tag">{book.tag}</span>}</div>
              <div className="card-title-row"><h3>{book.title}</h3><Rating value={book.rating} /></div>
              <p className="book-byline">{book.author}</p>
              <p className="book-meta">{book.genre}<span>·</span>{book.year}</p>
            </article>
          })}</div> : <div className="empty-state"><div className="empty-icon"><BookOpen aria-hidden="true" /></div><h3>Jeszcze tu cicho</h3><p>Nie znaleźliśmy książek z tymi filtrami. Spróbuj zmienić kryteria albo wróć do całej kolekcji.</p><button className="primary-cta compact-cta" type="button" onClick={resetFilters}>Pokaż wszystkie książki <ArrowRight aria-hidden="true" /></button></div>}

          <div className="catalog-footer"><span>Małe wydawnictwa. Wielkie historie.</span><span>Wybieramy z myślą o Tobie <Check aria-hidden="true" /></span></div>
        </div>
      </section>
      <footer className="site-footer"><div className="page-shell"><Brand /><p>Historie, które zostają. © 2025 folio</p><a href="#top">Wróć na górę <ArrowRight aria-hidden="true" /></a></div></footer>
    </main>
  )
}
