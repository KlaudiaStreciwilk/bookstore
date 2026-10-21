'use client'

import { useRef, useState, type KeyboardEvent } from 'react'
import { AnimatePresence, motion, useReducedMotion, type Variants } from 'motion/react'
import { BookCard } from '@/components/catalog/book-card'
import { useCatalog } from '@/components/catalog/catalog-provider'
import { Candle, SleepingCat } from '@/components/decor'
import { gentleSpring } from '@/components/motion/springs'
import type { MonthlyPickWithBooks } from '@/lib/types'

const PANEL_ID = 'monthly-picks-panel'
const tabId = (month: string) => `monthly-tab-${month}`

// Editors' monthly picks with month tabs (WAI-ARIA tabs pattern) and an animated card swap.
export function MonthlyPicksSection({ picks }: { picks: MonthlyPickWithBooks[] }) {
  const { isFavorite, toggleFavorite } = useCatalog()
  const reduceMotion = useReducedMotion()
  const [activeMonth, setActiveMonth] = useState(picks.at(-1)?.month)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const active = picks.find((pick) => pick.month === activeMonth) ?? picks.at(-1)

  if (!active) return null

  function selectTab(index: number) {
    setActiveMonth(picks[index].month)
    tabRefs.current[index]?.focus()
  }

  function handleKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const last = picks.length - 1
    const next = { ArrowRight: index === last ? 0 : index + 1, ArrowLeft: index === 0 ? last : index - 1, Home: 0, End: last }[event.key]
    if (next === undefined) return
    event.preventDefault()
    selectTab(next)
  }

  const grid: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.07 } },
    exit: { opacity: 0, y: reduceMotion ? 0 : -12, transition: { duration: 0.2 } },
  }

  return (
    <section className="monthly-section" id="ulubiency" aria-labelledby="monthly-title">
      <div className="page-shell">
        <div className="monthly-heading">
          <div>
            <p className="eyebrow monthly-eyebrow">Wybór redakcji</p>
            <h2 id="monthly-title">Ulubieńcy miesiąca</h2>
            <p className="monthly-intro">Co miesiąc wybieramy 4 książki, które warto przeczytać.</p>
          </div>
          <div className="month-tabs" role="tablist" aria-label="Wybierz miesiąc">
            {picks.map((pick, index) => {
              const selected = pick.month === active.month
              return (
                <button
                  key={pick.month}
                  ref={(element) => { tabRefs.current[index] = element }}
                  id={tabId(pick.month)}
                  className="month-tab"
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={PANEL_ID}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActiveMonth(pick.month)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                >
                  {selected && <motion.span className="month-tab-pill" layoutId="month-tab-pill" transition={gentleSpring} aria-hidden="true" />}
                  <span className="month-tab-label">{pick.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        <div className="bookcase">
          <Candle className="bookcase-candle" height="short" />
          <SleepingCat className="bookcase-cat bookcase-cat-left" tone="grey" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={active.month} id={PANEL_ID} className="monthly-grid" role="tabpanel" aria-labelledby={tabId(active.month)} initial="hidden" animate="visible" exit="exit" variants={grid}>
              {active.books.map((book) => (
                <BookCard key={book.id} book={book} isFavorite={isFavorite(book.id)} onToggleFavorite={toggleFavorite} showDescription />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
