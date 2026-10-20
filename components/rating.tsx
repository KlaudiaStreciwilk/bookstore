import { Star } from 'lucide-react'

export function Rating({ value }: { value: number }) {
  return <span className="rating"><span className="rating-stars" aria-label={`${value} na 5`}><Star fill="currentColor" aria-hidden="true" /></span><span>{value.toFixed(1)}</span></span>
}
