import { BookOpen } from 'lucide-react'

export function Brand() {
  return <a className="brand" href="#top" aria-label="folio — strona główna"><span className="brand-mark"><BookOpen aria-hidden="true" /></span><span>folio<span className="brand-dot">.</span></span></a>
}
