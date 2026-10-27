// The Książkarnia logo: the cat mark (painted through a mask) plus the name set in the site's display face.
// Both take --logo-color: brown on parchment, gold at night.
export function Brand({ href = '#top' }: { href?: string }) {
  return (
    <a className="brand" href={href} aria-label="Książkarnia — strona główna">
      <span className="brand-logo" aria-hidden="true" />
      <span className="brand-name" aria-hidden="true">KSiążkarnia</span>
    </a>
  )
}
