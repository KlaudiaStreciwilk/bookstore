import { CatalogProvider } from '@/components/catalog/catalog-provider'
import { CatalogSection } from '@/components/catalog/catalog-section'
import { HeroSection } from '@/components/hero-section'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { WeeklyBookSection } from '@/components/weekly-book-section'
import { getBooks, getGenres, getWeeklyBook } from '@/lib/data'

export default async function Page() {
  const [books, genres, weeklyBook] = await Promise.all([getBooks(), getGenres(), getWeeklyBook()])

  return (
    <main id="top" className="folio-page">
      <CatalogProvider books={books}>
        <SiteHeader />
        <HeroSection featuredBook={weeklyBook?.book} />
        <WeeklyBookSection chapters={weeklyBook?.chapters ?? []} />
        <CatalogSection genres={genres} />
        <SiteFooter />
      </CatalogProvider>
    </main>
  )
}
