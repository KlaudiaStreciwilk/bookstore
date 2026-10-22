'use client'

import { useEffect, useId, useRef, useState } from 'react'

type Tone = 'black' | 'ginger' | 'grey'

// [base, light, dark, stripe, muzzle] per coat.
const coats: Record<Tone, [string, string, string, string, string]> = {
  black: ['#1E1915', '#4A3F37', '#0A0807', '#141110', '#2E2723'],
  ginger: ['#C8783A', '#F1B477', '#7E3F17', '#9A5222', '#F6DDB8'],
  grey: ['#6E6B73', '#A8A5AE', '#3C3A41', '#4D4A52', '#D9D6DC'],
}

// Short fur strands along the back and the tail, [x, y, angle].
const strands = [[56, 40, -60], [66, 35, -70], [76, 31, -78], [86, 29, -84], [96, 28, -90], [106, 28, -96], [116, 29, -102], [126, 31, -108], [136, 35, -116], [145, 41, -124], [152, 49, -134], [157, 58, -148], [44, 52, -40], [38, 60, -30]]

const AWAKE_MS = 2600
// Rounded so server and browser render identical numbers (trig can differ in the last digit).
const strandPaths = strands.map(([x, y, a]) => `M${x} ${y}l${(Math.cos((a * Math.PI) / 180) * 7).toFixed(2)} ${(Math.sin((a * Math.PI) / 180) * 7).toFixed(2)}`)

/** A fluffy cat asleep on the shelf. Tap or click it and it lifts its head, looks around and purrs. */
export function SleepingCat({ className = '', tone = 'black', interactive = true }: { className?: string; tone?: Tone; interactive?: boolean }) {
  const id = useId()
  const [awake, setAwake] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined)
  const [base, light, dark, stripe, muzzle] = coats[tone]
  const ref = (name: string) => `url(#${id}${name})`

  useEffect(() => () => clearTimeout(timer.current), [])

  function wake() {
    clearTimeout(timer.current)
    setAwake(true)
    timer.current = setTimeout(() => setAwake(false), AWAKE_MS)
  }

  const art = (
    <svg viewBox="0 0 200 112" width="200" height="112">
      <defs>
        {/* Fur: displacing the outline with fine noise makes every edge fluffy instead of smooth. */}
        <filter id={`${id}fur`} x="-10%" y="-20%" width="120%" height="140%">
          <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" xChannelSelector="R" yChannelSelector="G" />
        </filter>
        <filter id={`${id}coat`} x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency=".06 .9" numOctaves="2" seed="3" result="n" />
          <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1.4 0 0 0 -.55" />
        </filter>
        <filter id={`${id}blur`}><feGaussianBlur stdDeviation="3" /></filter>
        <radialGradient id={`${id}body`} cx=".45" cy=".2" r=".85"><stop offset="0" stopColor={light} /><stop offset=".45" stopColor={base} /><stop offset="1" stopColor={dark} /></radialGradient>
        <radialGradient id={`${id}head`} cx=".4" cy=".25" r=".8"><stop offset="0" stopColor={light} /><stop offset=".55" stopColor={base} /><stop offset="1" stopColor={dark} /></radialGradient>
        <linearGradient id={`${id}ear`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#E7A39A" /><stop offset="1" stopColor="#9A5A55" /></linearGradient>
        <radialGradient id={`${id}iris`} cx=".4" cy=".35" r=".7"><stop offset="0" stopColor="#F6D46A" /><stop offset="1" stopColor="#B07A16" /></radialGradient>
        <clipPath id={`${id}bodyclip`}><path d="M40 86C34 50 76 26 116 28C150 30 172 50 168 76C165 94 146 100 116 100H56C46 100 42 96 40 86Z" /></clipPath>
      </defs>

      <ellipse cx="102" cy="104" rx="80" ry="7" fill="#000" opacity=".4" filter={`url(#${id}blur)`} />

      <g className="cat-breath">
        <g filter={ref('fur')}>
          <path d="M40 86C34 50 76 26 116 28C150 30 172 50 168 76C165 94 146 100 116 100H56C46 100 42 96 40 86Z" fill={ref('body')} />
          <ellipse cx="146" cy="78" rx="24" ry="20" fill={base} opacity=".55" />
        </g>
        <g clipPath={ref('bodyclip')}>
          {tone !== 'black' && [70, 88, 106, 124, 142].map((x, i) => <path key={x} d={`M${x} 26q${8 - i} 16 ${2 + i} 34`} stroke={stripe} strokeWidth="6" strokeLinecap="round" fill="none" opacity=".55" filter={ref('fur')} />)}
          <rect x="30" y="20" width="150" height="90" filter={ref('coat')} opacity={tone === 'black' ? 0.6 : 0.35} />
          <ellipse cx="100" cy="36" rx="54" ry="10" fill="#fff" opacity={tone === 'black' ? 0.1 : 0.16} />
        </g>
        {strandPaths.map((d, i) => <path key={i} d={d} stroke={i % 2 ? light : base} strokeWidth="1.4" strokeLinecap="round" opacity=".75" />)}
        {tone === 'black' && <path d="M62 38C86 26 126 26 150 46C158 54 162 62 162 70" fill="none" stroke="#F0B872" strokeOpacity=".4" strokeWidth="2" strokeLinecap="round" />}
      </g>

      <g className="cat-tail" filter={ref('fur')}>
        <path d="M164 80C172 100 128 108 82 104C64 103 56 100 58 93" stroke={base} strokeWidth="15" strokeLinecap="round" fill="none" />
        <path d="M164 80C172 100 128 108 82 104" stroke={light} strokeOpacity=".35" strokeWidth="5" strokeLinecap="round" fill="none" transform="translate(0 -4)" />
        {tone !== 'black' && [150, 132, 112, 92].map((x) => <path key={x} d={`M${x} ${x > 140 ? 94 : 100}v12`} stroke={stripe} strokeWidth="5" opacity=".6" />)}
      </g>

      <g className="cat-paws" filter={ref('fur')}>
        <ellipse cx="66" cy="99" rx="14" ry="7" fill={tone === 'black' ? base : muzzle} />
        <ellipse cx="84" cy="101" rx="12" ry="6" fill={tone === 'black' ? base : muzzle} opacity=".9" />
      </g>

      <g className="cat-head">
        <g filter={ref('fur')}>
          <path d="M20 66L17 40L38 56Z" fill={base} className="cat-ear cat-ear-l" />
          <path d="M50 52L64 32L68 58Z" fill={base} className="cat-ear cat-ear-r" />
          <ellipse cx="44" cy="76" rx="30" ry="24" fill={ref('head')} />
          <ellipse cx="30" cy="88" rx="12" ry="9" fill={base} />
          <ellipse cx="58" cy="88" rx="12" ry="9" fill={base} />
        </g>
        <path d="M23 60L21 46L33 56Z" fill={ref('ear')} opacity=".85" />
        <path d="M54 54L62 40L64 57Z" fill={ref('ear')} opacity=".85" />
        <path d="M22 50l4 6M60 42l-2 7" stroke={light} strokeOpacity=".7" strokeWidth="1" />
        <ellipse cx="44" cy="88" rx="13" ry="9" fill={muzzle} opacity={tone === 'black' ? 0.6 : 0.95} filter={ref('fur')} />
        <ellipse cx="38" cy="66" rx="12" ry="6" fill="#fff" opacity=".12" />
        {tone !== 'black' && <path d="M36 56q4 6 2 12M44 54v12M52 56q-4 6-2 12" stroke={stripe} strokeWidth="2.4" strokeLinecap="round" fill="none" opacity=".65" />}
        <g className="cat-eyes-closed">
          <path d="M28 76q6 5 12 0M48 76q6 5 12 0" stroke={tone === 'black' ? '#A08E7C' : '#2A1A10'} strokeWidth="2" strokeLinecap="round" fill="none" />
        </g>
        <g className="cat-eyes-open">
          <ellipse cx="34" cy="75" rx="6" ry="5" fill={ref('iris')} /><ellipse cx="34" cy="75" rx="1.6" ry="4.4" fill="#120C08" /><circle cx="32.4" cy="73" r="1.3" fill="#fff" />
          <ellipse cx="54" cy="75" rx="6" ry="5" fill={ref('iris')} /><ellipse cx="54" cy="75" rx="1.6" ry="4.4" fill="#120C08" /><circle cx="52.4" cy="73" r="1.3" fill="#fff" />
        </g>
        <path d="M41 84l3 3 3-3Z" fill="#D58C88" />
        <path d="M44 87v3M44 90q-3 3-6 1M44 90q3 3 6 1" stroke={tone === 'black' ? '#6E6055' : '#5A3A2A'} strokeWidth="1" fill="none" strokeLinecap="round" />
        <path d="M32 88l-22-1M32 91l-21 5M56 88l22-2M56 91l21 5" stroke={tone === 'black' ? '#A6998C' : '#FFF6E6'} strokeOpacity=".75" strokeWidth=".8" strokeLinecap="round" />
      </g>
    </svg>
  )

  if (!interactive) {
    return <span className={`decor sleeping-cat ${className}`} aria-hidden="true">{art}<span className="cat-z" aria-hidden="true">z</span><span className="cat-z cat-z-2" aria-hidden="true">z</span></span>
  }

  return (
    <button type="button" className={`decor sleeping-cat is-interactive ${awake ? 'is-awake' : ''} ${className}`} onClick={wake} aria-label="Pogłaszcz kota">
      {art}
      <span className="cat-z" aria-hidden="true">z</span><span className="cat-z cat-z-2" aria-hidden="true">z</span>
      <span className="cat-purr" aria-live="polite">{awake ? 'Mrrr… ♥' : ''}</span>
    </button>
  )
}
