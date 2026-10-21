// The Książkarnia logo, painted through a mask so it takes the theme's ink colour (dark on parchment, light at night).
export function Brand({ href = '#top' }: { href?: string }) {
  return <a className="brand" href={href} aria-label="Książkarnia — strona główna"><span className="brand-logo" aria-hidden="true" /></a>
}
