'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'
import { UserMenu } from '@/components/auth/user-menu'
import { Brand } from '@/components/brand'
import { useOptionalCatalog } from '@/components/catalog/catalog-provider'
import { ThemeToggle } from '@/components/theme-toggle'
import type { User } from '@/lib/auth/types'

function scrollToCatalog() {
  document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' })
}

// On the home page the nav drives the catalog filters; elsewhere (auth pages) it links back to the home page.
export function SiteHeader({ user }: { user: User | null }) {
  const catalog = useOptionalCatalog()

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand href={catalog ? '#top' : '/'} />
        <nav className="main-nav" aria-label="Nawigacja główna">
          {catalog ? (
            <>
              <a className="nav-link active" href="#top" onClick={catalog.resetFilters}>Odkrywaj</a>
              <a className="nav-link" href="#katalog" onClick={() => catalog.setFavoritesOnly(false)}>Przeglądaj katalog</a>
              <a className="nav-link" href="#ulubiency">Książki miesiąca</a>
              {catalog.favoritesEnabled && <button className={`nav-link nav-favorites ${catalog.favoritesOnly ? 'nav-selected' : ''}`} type="button" aria-pressed={catalog.favoritesOnly} onClick={() => { catalog.setFavoritesOnly((value) => !value); scrollToCatalog() }}>Ulubione <span className="favorite-count">{catalog.favorites.length}</span></button>}
            </>
          ) : (
            <>
              <a className="nav-link" href="/">Odkrywaj</a>
              <a className="nav-link" href="/#katalog">Przeglądaj katalog</a>
              <a className="nav-link" href="/#ulubiency">Książki miesiąca</a>
              {user && <a className="nav-link nav-favorites" href="/#katalog">Ulubione</a>}
            </>
          )}
        </nav>
        <div className="header-actions">
          <ThemeToggle />
          {user ? <UserMenu user={user} /> : (
            <>
              <Link className="header-login" href="/logowanie">Zaloguj się</Link>
              <Link className="header-signup" href="/rejestracja">Załóż konto</Link>
            </>
          )}
        </div>
        {catalog?.favoritesEnabled && <button className="mobile-favorites" type="button" aria-label={`Ulubione: ${catalog.favorites.length}`} onClick={() => { catalog.setFavoritesOnly((value) => !value); scrollToCatalog() }}><Heart aria-hidden="true" /><span>{catalog.favorites.length}</span></button>}
      </div>
    </header>
  )
}
