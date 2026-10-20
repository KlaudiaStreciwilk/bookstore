import { Check } from 'lucide-react'
import { BookFilters } from '@/components/catalog/book-filters'
import { BookGrid } from '@/components/catalog/book-grid'

export function CatalogSection({ genres }: { genres: string[] }) {
  return (
    <section className="catalog-section" id="katalog" aria-labelledby="catalog-title">
      <div className="page-shell">
        <div className="catalog-heading">
          <div><p className="eyebrow catalog-eyebrow">Wybrane dla ciekawych czytelników</p><h2 id="catalog-title">Odkryj kolejną<br className="mobile-break" /> lekturę</h2></div>
          <p className="catalog-intro">Od subtelnych literackich perełek po odważne nowe światy — każdy czytelnik znajdzie tu coś dla siebie.</p>
        </div>

        <BookFilters genres={genres} />

        <BookGrid />

        <div className="catalog-footer"><span>Małe wydawnictwa. Wielkie historie.</span><span>Wybieramy z myślą o Tobie <Check aria-hidden="true" /></span></div>
      </div>
    </section>
  )
}
