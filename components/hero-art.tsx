'use client'

import type { CSSProperties, PointerEvent } from 'react'
import { Feather } from 'lucide-react'
import { motion, useReducedMotion, useSpring } from 'motion/react'
import { BookCover } from '@/components/catalog/book-cover'
import { Candle, SleepingCat } from '@/components/decor'
import { useMediaQuery } from '@/lib/hooks/use-media-query'
import type { Book } from '@/lib/types'

const MAX_TILT = 6
const tiltSpring = { stiffness: 140, damping: 18, mass: 0.6 }

// Neighbouring volumes shown spine-out: [height %, width px, leather colour, leans on its left neighbour].
const spineShapes: [number, number, string, boolean][] = [[88, 40, '#4A3424', false], [80, 34, '#2F4A3A', false], [84, 38, '#6B2A30', false], [76, 32, '#5A3A22', true]]

function bob(duration: number, delay: number, distance = 6) {
  return {
    animate: { y: [0, -distance, 0] },
    transition: { duration, delay, repeat: Infinity, ease: 'easeInOut' as const },
  }
}

/** A leather-bound book seen from its spine: rounded shading, leather grain and rubbed edges, headband, raised bands, gilt rules and a blank tooled label. */
function Spine({ shape }: { shape: [number, number, string, boolean] }) {
  const [height, width, cloth, leaning] = shape
  return (
    <span className={`shelf-spine ${leaning ? 'is-leaning' : ''}`} style={{ height: `${height}%`, width, '--cloth': cloth } as CSSProperties} aria-hidden="true">
      <span className="spine-grain" />
      <span className="spine-label" />
    </span>
  )
}

// Featured book on a candlelit shelf between other volumes, a cat asleep at the end; cursor tilt on desktop.
export function HeroArt({ book }: { book: Book }) {
  const reduceMotion = useReducedMotion()
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const canTilt = finePointer && !reduceMotion
  const rotateX = useSpring(0, tiltSpring)
  const rotateY = useSpring(0, tiltSpring)

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!canTilt) return
    const rect = event.currentTarget.getBoundingClientRect()
    const px = (event.clientX - rect.left) / rect.width - 0.5
    const py = (event.clientY - rect.top) / rect.height - 0.5
    rotateY.set(px * MAX_TILT * 2)
    rotateX.set(-py * MAX_TILT)
  }

  function resetTilt() {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <div className="hero-art" aria-label={`Polecana książka: ${book.title}`} onPointerMove={handlePointerMove} onPointerLeave={resetTilt}>
      <div className="hero-lamp" aria-hidden="true" />
      <div className="hero-shelf">
        <div className="hero-shelf-row">
          <Candle className="hero-candle" />
          <Spine shape={spineShapes[0]} />
          <Spine shape={spineShapes[1]} />
          <motion.div className="hero-tilt" style={{ rotateX, rotateY, transformPerspective: 900, transformOrigin: '50% 100%' }}>
            <div className="hero-book-wrap"><BookCover book={book} large /></div>
          </motion.div>
          <Spine shape={spineShapes[2]} />
          <Spine shape={spineShapes[3]} />
          <SleepingCat className="hero-cat" tone="ginger" />
        </div>
        <div className="shelf-plank" aria-hidden="true" />
      </div>
      <motion.div className="rating-float" {...(reduceMotion ? {} : bob(4.4, 0.5))}><div><strong>Wybór czytelników</strong><span className="float-stars">★★★★★</span></div><strong>{book.rating}</strong></motion.div>
      <motion.div className="new-badge" {...(reduceMotion ? {} : bob(5, 1.4))}><Feather aria-hidden="true" /> Nowość</motion.div>
    </div>
  )
}
