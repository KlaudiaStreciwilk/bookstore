'use client'

import { ArrowRight, BookOpen } from 'lucide-react'

export function EmptyState({ onReset }: { onReset: () => void }) {
  return <div className="empty-state"><div className="empty-icon"><BookOpen aria-hidden="true" /></div><h3>Jeszcze tu cicho</h3><p>Nie znaleźliśmy książek z tymi filtrami. Spróbuj zmienić kryteria albo wróć do całej kolekcji.</p><button className="primary-cta compact-cta" type="button" onClick={onReset}>Pokaż wszystkie książki <ArrowRight aria-hidden="true" /></button></div>
}
