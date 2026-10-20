import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react'
import { BookCover } from '@/components/catalog/book-cover'
import type { Book } from '@/lib/types'

export function HeroSection({ featuredBook }: { featuredBook?: Book }) {
  return (
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
        {featuredBook && (
          <div className="hero-art" aria-label={`Polecana książka: ${featuredBook.title}`}>
            <div className="hero-ring" aria-hidden="true" />
            <div className="hero-book-wrap"><BookCover book={featuredBook} large /></div>
            <div className="rating-float"><div><strong>Wybór czytelników</strong><span className="float-stars">★★★★★</span></div><strong>{featuredBook.rating}</strong></div>
            <div className="new-badge"><Sparkles aria-hidden="true" /> Nowość</div>
          </div>
        )}
      </div>
      <a className="scroll-cue" href="#tygodnia" aria-label="Przewiń do książki tygodnia"><ArrowDown aria-hidden="true" /></a>
    </section>
  )
}
