import { Marquee } from '@/components/motion/marquee'

const slogans = ['Nowości co miesiąc', 'Książka tygodnia', 'Małe wydawnictwa', 'Wielkie historie']

export function MarqueeBand() {
  return (
    <section className="marquee-band" aria-label={slogans.join(', ')}>
      <Marquee speed={45}>
        {slogans.map((slogan) => (
          <span className="marquee-item" key={slogan}>{slogan}<span className="marquee-star" aria-hidden="true">✦</span></span>
        ))}
      </Marquee>
    </section>
  )
}
