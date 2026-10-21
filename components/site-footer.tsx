import { ArrowRight } from 'lucide-react'
import { Brand } from '@/components/brand'

export function SiteFooter() {
  const year = new Date().getFullYear()
  return <footer className="site-footer"><div className="page-shell"><Brand /><p>Historie, które zostają. © {year} Książkarnia</p><a href="#top">Wróć na górę <ArrowRight aria-hidden="true" /></a></div></footer>
}
