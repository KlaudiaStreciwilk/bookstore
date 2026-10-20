import { CatalogProvider } from '@/components/catalog/catalog-provider'
import { CatalogSection } from '@/components/catalog/catalog-section'
import { HeroSection } from '@/components/hero-section'
import { MarqueeBand } from '@/components/marquee-band'
import { MonthlyPicksSection } from '@/components/monthly-picks-section'
import { MotionProvider } from '@/components/motion/motion-provider'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'
import { WeeklyBookSection } from '@/components/weekly-book-section'
import { getCurrentUser } from '@/lib/auth/session'
import { getBooks, getGenres, getMonthlyPicks, getWeeklyBook } from '@/lib/data'

export default async function Page() {
  const [books, genres, weeklyBook, monthlyPicks, user] = await Promise.all([getBooks(), getGenres(), getWeeklyBook(), getMonthlyPicks(), getCurrentUser()])

  return (
    <main id="top" className="folio-page">
      <MotionProvider>
        <CatalogProvider books={books}>
          <SiteHeader user={user} />
          <HeroSection featuredBook={weeklyBook?.book} />
          <MarqueeBand />
          <MonthlyPicksSection picks={monthlyPicks} />
          <WeeklyBookSection chapters={weeklyBook?.chapters ?? []} />
          <CatalogSection genres={genres} />
          <SiteFooter />
        </CatalogProvider>
      </MotionProvider>
    </main>
  )
}
