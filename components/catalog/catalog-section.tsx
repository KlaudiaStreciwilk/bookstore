import { Check } from 'lucide-react'
import { BookFilters } from '@/components/catalog/book-filters'
import { BookGrid } from '@/components/catalog/book-grid'

export function CatalogSection({ genres }: { genres: string[] }) {
  return (
    <section className="catalog-section" id="katalog" aria-labelledby="catalog-title">
      <div className="page-shell">
        <div className="catalog-heading">
          <div><p className="eyebrow catalog-eyebrow">Cała kolekcja folio</p><h2 id="catalog-title">Szukasz czegoś<br className="mobile-break" /> konkretnego?</h2></div>
          <p className="catalog-intro">Przeszukaj katalog po tytule lub autorze albo zawęź wyniki według gatunku, roku wydania i oceny.</p>
        </div>

        <BookFilters genres={genres} />

        <BookGrid />

        <div className="catalog-footer"><span>Małe wydawnictwa. Wielkie historie.</span><span>Wybieramy z myślą o Tobie <Check aria-hidden="true" /></span></div>
      </div>
    </section>
  )
}
