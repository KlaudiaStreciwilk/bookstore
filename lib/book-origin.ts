// Remembers which cover was clicked, so the opened book can fly out of it (and back on close).
// Module state is enough: only one book can be opened at a time.

type BookOrigin = {
  slug: string
  rect: DOMRect
  /** The cover element in the card; hidden while its "copy" is open. */
  cover: HTMLElement
  /** Element to refocus after closing. */
  trigger: HTMLElement
}

let current: BookOrigin | null = null

export function setBookOrigin(slug: string, cover: HTMLElement, trigger: HTMLElement) {
  current = { slug, rect: cover.getBoundingClientRect(), cover, trigger }
}

export function getBookOrigin(slug: string) {
  return current?.slug === slug ? current : null
}

export function clearBookOrigin() {
  current = null
}
