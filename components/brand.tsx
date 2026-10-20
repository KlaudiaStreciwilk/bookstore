import { BookOpen } from 'lucide-react'

export function Brand({ href = '#top' }: { href?: string }) {
  return <a className="brand" href={href} aria-label="folio — strona główna"><span className="brand-mark"><BookOpen aria-hidden="true" /></span><span>folio<span className="brand-dot">.</span></span></a>
}
