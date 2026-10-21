'use client'

import { useEffect, useState } from 'react'
import { DEFAULT_FONT_SCALE, FONT_SCALES, FONT_SCALE_STORAGE_KEY } from '@/lib/font-scale'

function applyFontScale(scale: number) {
  document.documentElement.style.setProperty('--font-scale', String(scale))
  try {
    localStorage.setItem(FONT_SCALE_STORAGE_KEY, String(scale))
  } catch {}
}

// Floating A−/A+ bar so low-vision readers can resize text on every page.
export function FontSizeControls() {
  const [index, setIndex] = useState<number>(FONT_SCALES.indexOf(DEFAULT_FONT_SCALE))

  useEffect(() => {
    const saved = Number(getComputedStyle(document.documentElement).getPropertyValue('--font-scale'))
    const savedIndex = FONT_SCALES.findIndex((scale) => scale === saved)
    if (savedIndex > -1) setIndex(savedIndex)
  }, [])

  function change(nextIndex: number) {
    applyFontScale(FONT_SCALES[nextIndex])
    setIndex(nextIndex)
  }

  const percent = Math.round(FONT_SCALES[index] * 100)
  const isDefault = FONT_SCALES[index] === DEFAULT_FONT_SCALE

  return (
    <div className="font-size-controls" role="group" aria-label="Rozmiar tekstu">
      <button className="font-size-button" type="button" onClick={() => change(index - 1)} disabled={index === 0} aria-label="Zmniejsz tekst" title="Zmniejsz tekst">
        A<span aria-hidden="true">−</span>
      </button>
      <button className="font-size-value" type="button" onClick={() => change(FONT_SCALES.indexOf(DEFAULT_FONT_SCALE))} disabled={isDefault} aria-label={`Rozmiar tekstu ${percent}%. Przywróć domyślny`} title="Przywróć domyślny rozmiar">
        <span aria-live="polite">{percent}%</span>
      </button>
      <button className="font-size-button font-size-button-large" type="button" onClick={() => change(index + 1)} disabled={index === FONT_SCALES.length - 1} aria-label="Powiększ tekst" title="Powiększ tekst">
        A<span aria-hidden="true">+</span>
      </button>
    </div>
  )
}
