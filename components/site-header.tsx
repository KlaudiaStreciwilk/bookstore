'use client'

import { Heart } from 'lucide-react'
import { Brand } from '@/components/brand'
import { useCatalog } from '@/components/catalog/catalog-provider'

function scrollToCatalog() {
  document.getElementById('katalog')?.scrollIntoView({ behavior: 'smooth' })
}

export function SiteHeader() {
  const { favorites, favoritesOnly, setFavoritesOnly, sortBest, setSortBest, resetFilters } = useCatalog()

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="main-nav" aria-label="Nawigacja główna">
          <a className="nav-link active" href="#top" onClick={resetFilters}>Odkrywaj</a>
          <a className="nav-link" href="#katalog" onClick={() => { setFavoritesOnly(false); setSortBest(false) }}>Przeglądaj</a>
          <button className={`nav-link ${sortBest ? 'nav-selected' : ''}`} type="button" onClick={() => { setSortBest((value) => !value); setFavoritesOnly(false); scrollToCatalog() }}>Bestsellery</button>
          <button className={`nav-link nav-favorites ${favoritesOnly ? 'nav-selected' : ''}`} type="button" aria-pressed={favoritesOnly} onClick={() => { setFavoritesOnly((value) => !value); setSortBest(false); scrollToCatalog() }}>Ulubione <span className="favorite-count">{favorites.length}</span></button>
        </nav>
        <button className="profile-button" type="button" aria-label="Profil: AR">AR</button>
        <button className="mobile-favorites" type="button" aria-label={`Ulubione: ${favorites.length}`} onClick={() => { setFavoritesOnly((value) => !value); scrollToCatalog() }}><Heart aria-hidden="true" /><span>{favorites.length}</span></button>
      </div>
    </header>
  )
}
