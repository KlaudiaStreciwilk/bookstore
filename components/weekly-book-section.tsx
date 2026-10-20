'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import type { Chapter } from '@/lib/types'

export function WeeklyBookSection({ chapters }: { chapters: Chapter[] }) {
  const [chapterIndex, setChapterIndex] = useState(0)
  const chapter = chapters[chapterIndex]

  function nextChapter() {
    setChapterIndex((current) => (current + 1) % chapters.length)
  }

  return (
    <section className="weekly-section" id="tygodnia" aria-labelledby="weekly-title">
      <div className="weekly-inner page-shell">
        <div className="weekly-copy">
          <p className="eyebrow weekly-eyebrow">W środku książki tygodnia</p>
          <h2 id="weekly-title">Historia, którą<br />warto otworzyć</h2>
          <p>Przewiń do nowego rozdziału. Co tydzień nasi redaktorzy wybierają jedną niezwykłą lekturę.</p>
          <button className="chapter-button" type="button" onClick={nextChapter} aria-label="Otwórz następny rozdział"><span>{chapterIndex === 0 ? 'Odkryj fragment' : 'Wróć do fragmentu'}</span><ArrowRight aria-hidden="true" /></button>
        </div>
        {chapter && (
          <button className="open-book" type="button" onClick={nextChapter} aria-label="Zmień fragment książki">
            <span className="book-page left-page">
              <span className="chapter-label">{chapter.eyebrow}</span>
              <strong className="chapter-title">{chapter.title}</strong>
              <span className="chapter-excerpt">{chapter.excerpt}</span>
            </span>
            <span className="book-page right-page">
              <span className="chapter-quote">{chapter.quote}</span>
              <span className="page-number">— {chapter.page} —</span>
            </span>
            <span className="page-hint"><ArrowRight aria-hidden="true" /> kolejny rozdział</span>
          </button>
        )}
      </div>
    </section>
  )
}
