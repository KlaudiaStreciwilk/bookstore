'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'
import { THEME_STORAGE_KEY, type Theme } from '@/lib/theme'

function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.dataset.theme = theme
  root.classList.toggle('dark', theme === 'dark')
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {}
}

// High-contrast dark mode for readers who find the bright page tiring.
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
  }, [])

  const isDark = theme === 'dark'

  function toggle() {
    const next: Theme = isDark ? 'light' : 'dark'
    applyTheme(next)
    setTheme(next)
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggle} aria-pressed={isDark} aria-label={isDark ? 'Wyłącz tryb ciemny' : 'Włącz tryb ciemny'} title={isDark ? 'Wyłącz tryb ciemny' : 'Włącz tryb ciemny'}>
      {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
      <span className="theme-toggle-label">{isDark ? 'Jasny' : 'Ciemny'}</span>
    </button>
  )
}
