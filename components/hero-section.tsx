import { ArrowDown, ArrowRight, Sparkles } from 'lucide-react'
import { HeroArt } from '@/components/hero-art'
import { HeroHeadline } from '@/components/hero-headline'
import type { Book } from '@/lib/types'

export function HeroSection({ featuredBook }: { featuredBook?: Book }) {
  return (
    <section className="hero-section" aria-labelledby="hero-title">
      <div className="hero-orb hero-orb-peach" aria-hidden="true" />
      <div className="hero-orb hero-orb-blue" aria-hidden="true" />
      <div className="hero-inner page-shell">
        <div className="hero-copy">
          <p className="eyebrow"><Sparkles aria-hidden="true" /> Twoja następna ulubiona książka już czeka</p>
          <HeroHeadline />
          <p className="hero-description">Starannie wybrane książki dla ciekawych świata. Odkrywaj nowe światy, świeże idee i niezapomniane głosy.</p>
          <div className="hero-actions">
            <a className="primary-cta" href="#katalog">Poznaj kolekcję <ArrowRight aria-hidden="true" /></a>
            <div className="reader-proof" aria-label="Ponad 12 tysięcy zadowolonych czytelników">
              <div className="avatar-stack" aria-hidden="true"><span>MK</span><span>JL</span><span>SA</span></div>
              <p><strong>12 tys.+</strong><span>zadowolonych czytelników</span></p>
            </div>
          </div>
        </div>
        {featuredBook && <HeroArt book={featuredBook} />}
      </div>
      <a className="scroll-cue" href="#tygodnia" aria-label="Przewiń do książki tygodnia"><ArrowDown aria-hidden="true" /></a>
    </section>
  )
}
