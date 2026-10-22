// Dark academia props drawn in SVG. Decorative only: hidden from screen readers, and the
// animations (flame flicker, cat breathing) switch off with prefers-reduced-motion.

import { useId } from 'react'

export { SleepingCat } from '@/components/sleeping-cat'

type DecorProps = { className?: string }

export function Candle({ className = '', height = 'tall' }: DecorProps & { height?: 'tall' | 'short' }) {
  const wax = height === 'tall' ? 96 : 60
  const top = 150 - wax
  const id = useId()
  return (
    <span className={`decor candle candle-${height} ${className}`} aria-hidden="true">
      <span className="candle-glow" />
      <svg viewBox="0 0 60 190" width="60" height="190">
        <defs>
          <linearGradient id={`${id}candle-wax`} x1="0" x2="1"><stop offset="0" stopColor="#D9C9A3" /><stop offset=".35" stopColor="#F6EBD0" /><stop offset="1" stopColor="#BFAE88" /></linearGradient>
          <radialGradient id={`${id}candle-flame`} cx=".5" cy=".7" r=".6"><stop offset="0" stopColor="#FFFBE6" /><stop offset=".35" stopColor="#FFD36B" /><stop offset=".8" stopColor="#F28C28" /><stop offset="1" stopColor="#C2410C" stopOpacity="0" /></radialGradient>
          <linearGradient id={`${id}candle-brass`} x1="0" x2="1"><stop offset="0" stopColor="#7A5522" /><stop offset=".45" stopColor="#E3BC6A" /><stop offset="1" stopColor="#6B4518" /></linearGradient>
        </defs>
        <rect x="18" y={top} width="24" height={wax} rx="3" fill={`url(#${id}candle-wax)`} />
        <path d={`M18 ${top + 4}q3 10 0 18M38 ${top + 2}q4 14 1 26`} stroke="#E9DDBD" strokeWidth="3" strokeLinecap="round" fill="none" />
        <ellipse cx="30" cy={top} rx="12" ry="3" fill="#FBF3DD" />
        <path d={`M30 ${top}v-7`} stroke="#2A1D12" strokeWidth="1.6" />
        <g className="candle-flame-g" style={{ transformOrigin: `30px ${top - 4}px` }}>
          <path d={`M30 ${top - 34}c-7 12-10 20-7 26 2 4 12 4 14 0 3-6 0-14-7-26Z`} fill={`url(#${id}candle-flame)`} />
          <ellipse cx="30" cy={top - 9} rx="2.4" ry="4" fill="#5B7BD8" opacity=".55" />
        </g>
        <path d="M10 150h40l-4 8H14Z" fill={`url(#${id}candle-brass)`} />
        <path d="M24 158h12v14H24Z" fill={`url(#${id}candle-brass)`} />
        <ellipse cx="30" cy="180" rx="24" ry="6" fill={`url(#${id}candle-brass)`} />
        <path d="M50 160c10 0 10 14 0 14" stroke="#B08A45" strokeWidth="3" fill="none" />
      </svg>
    </span>
  )
}

/** A bundle of old letters: textured paper, a folded note, twine and a raised wax seal. */
export function Letters({ className = '' }: DecorProps) {
  const id = useId()
  const ref = (name: string) => `url(#${id}${name})`
  return (
    <span className={`decor letters ${className}`} aria-hidden="true">
      <svg viewBox="0 0 180 104" width="180" height="104">
        <defs>
          <filter id={`${id}shadow`} x="-20%" y="-30%" width="140%" height="170%"><feDropShadow dx="1.5" dy="3" stdDeviation="2.4" floodColor="#1A0E06" floodOpacity=".45" /></filter>
          <filter id={`${id}paper`} x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency=".75" numOctaves="3" seed="9" result="n" />
            <feDiffuseLighting in="n" surfaceScale="1.2" lightingColor="#fff"><feDistantLight azimuth="225" elevation="58" /></feDiffuseLighting>
            <feComposite in2="SourceGraphic" operator="in" />
          </filter>
          <linearGradient id={`${id}env1`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#F6EBD2" /><stop offset=".6" stopColor="#E6D3AC" /><stop offset="1" stopColor="#C9B184" /></linearGradient>
          <linearGradient id={`${id}env2`} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#E8D6B0" /><stop offset="1" stopColor="#B99E70" /></linearGradient>
          <linearGradient id={`${id}note`} x1="0" y1="0" x2="1" y2="0"><stop offset="0" stopColor="#FBF4E4" /><stop offset=".7" stopColor="#EFE2C6" /><stop offset="1" stopColor="#D6C29C" /></linearGradient>
          <linearGradient id={`${id}flap`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#000" stopOpacity="0" /><stop offset="1" stopColor="#000" stopOpacity=".12" /></linearGradient>
          <radialGradient id={`${id}wax`} cx=".38" cy=".32" r=".75"><stop offset="0" stopColor="#D9545C" /><stop offset=".5" stopColor="#9C1F2A" /><stop offset="1" stopColor="#4E0A12" /></radialGradient>
          <linearGradient id={`${id}twine`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#C9A877" /><stop offset="1" stopColor="#7E5F38" /></linearGradient>
        </defs>

        <g filter={ref('shadow')} transform="rotate(-7 90 66)">
          <rect x="22" y="44" width="124" height="58" rx="2" fill={ref('env2')} />
        </g>
        <g filter={ref('shadow')} transform="rotate(9 110 40)">
          <path d="M96 10h66v74H96Z" fill={ref('note')} />
          <path d="M96 46h66" stroke="#B9A47C" strokeOpacity=".6" />
          <path d="M96 46h66v38H96Z" fill="#000" opacity=".05" />
          {[20, 27, 34, 54, 61, 68].map((y, i) => <path key={y} d={`M${103 + (i % 2) * 2} ${y}q4-3 8 0t8 0t8 0t8 0${i % 3 ? 't8 0t8 0' : ''}`} fill="none" stroke="#3A2A6A" strokeOpacity=".55" strokeWidth=".9" strokeLinecap="round" />)}
        </g>
        <g filter={ref('shadow')} transform="rotate(-3 80 50)">
          <rect x="14" y="20" width="134" height="64" rx="2" fill={ref('env1')} />
          <rect x="14" y="20" width="134" height="64" rx="2" fill="#fff" filter={ref('paper')} opacity=".35" style={{ mixBlendMode: 'multiply' }} />
          <path d="M14 20l67 40 67-40" fill={ref('flap')} stroke="#B49B6B" strokeOpacity=".8" />
          <path d="M14 84l52-30M148 84l-52-30" stroke="#B49B6B" strokeOpacity=".45" fill="none" />
          <path d="M96 72q8-4 16 0t16 0M100 77q6-3 12 0" stroke="#3A2A6A" strokeOpacity=".5" strokeWidth=".9" fill="none" strokeLinecap="round" />
          <rect x="120" y="26" width="20" height="14" fill="#7E9C86" stroke="#F6EBD2" strokeWidth="1.5" strokeDasharray="2 1.5" />
          <path d="M14 42h134" stroke={ref('twine')} strokeWidth="2.6" />
          <path d="M14 41h134" stroke="#E6CFA2" strokeOpacity=".5" strokeWidth=".8" />
          <path d="M56 20v64" stroke={ref('twine')} strokeWidth="2.6" />
          <path d="M56 42c-10 10-14 22-8 30M56 42c8 10 16 18 22 18" stroke={ref('twine')} strokeWidth="2" fill="none" strokeLinecap="round" />
          <g filter={ref('shadow')}>
            <path d="M81 48c6-2 13 1 14 7 2 5-1 11-4 13-5 4-12 3-16 0-4-4-5-10-2-14 2-4 5-5 8-6Z" fill={ref('wax')} />
            <circle cx="82" cy="58" r="7.5" fill="none" stroke="#5E0E17" strokeOpacity=".6" strokeWidth="1.4" />
            <path d="M78 58l4-5 4 5-4 5Z" fill="#B8343C" stroke="#5E0E17" strokeOpacity=".5" strokeWidth=".8" />
            <ellipse cx="78" cy="52" rx="3" ry="1.6" fill="#fff" opacity=".45" transform="rotate(-25 78 52)" />
          </g>
        </g>
      </svg>
    </span>
  )
}

export function Quill({ className = '' }: DecorProps) {
  return (
    <span className={`decor quill ${className}`} aria-hidden="true">
      <svg viewBox="0 0 90 170" width="90" height="170">
        <path d="M60 4C30 30 22 72 34 118l6-2C34 78 42 40 60 4Z" fill="#EFE6D2" />
        <path d="M60 4C74 36 64 84 40 116l-4-2C56 82 64 42 60 4Z" fill="#D9CCB0" />
        <path d="M60 4C50 42 42 80 37 132" stroke="#8B7A5C" strokeWidth="1.4" fill="none" />
        {[24, 36, 48, 60, 72, 84, 96].map((y) => <path key={y} d={`M${56 - y / 6} ${y}l-10 8M${58 - y / 7} ${y + 4}l9 6`} stroke="#BBAE90" strokeWidth=".8" />)}
        <path d="M20 132h40l4 30H16Z" fill="#1B1E2A" />
        <ellipse cx="40" cy="132" rx="20" ry="5" fill="#2A2F40" />
        <ellipse cx="40" cy="131" rx="12" ry="2.6" fill="#0A0C14" />
        <path d="M24 140h32" stroke="#9AA3C2" strokeOpacity=".35" strokeWidth="2" />
      </svg>
    </span>
  )
}
