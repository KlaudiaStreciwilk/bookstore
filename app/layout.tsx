import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Cinzel, Cormorant_Garamond, Lora } from 'next/font/google'
import { FavoritesProvider } from '@/components/favorites-provider'
import { getCurrentUser } from '@/lib/auth/session'
import { MotionProvider } from '@/components/motion/motion-provider'
import { FontSizeControls } from '@/components/font-size-controls'
import { fontScaleInitScript } from '@/lib/font-scale'
import { themeInitScript } from '@/lib/theme'
import './globals.css'

// Dark academia type: Cormorant for display, Lora for reading, Cinzel for engraved labels.
const display = Cormorant_Garamond({ subsets: ['latin', 'latin-ext'], weight: ['500', '600', '700'], style: ['normal', 'italic'], variable: '--font-display' })
const body = Lora({ subsets: ['latin', 'latin-ext'], style: ['normal', 'italic'], variable: '--font-body' })
const engraved = Cinzel({ subsets: ['latin', 'latin-ext'], weight: ['500', '600', '700'], variable: '--font-engraved' })

export const metadata: Metadata = {
  title: 'Książkarnia — historie, które zostają',
  description: 'Odkrywaj starannie wybrane książki, nowe światy i niezapomniane głosy. Znajdź swoją następną ulubioną lekturę z Książkarnią.',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f4ecdc' },
    { media: '(prefers-color-scheme: dark)', color: '#16100b' },
  ],
}

export default async function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  /** Parallel route slot: the opened book shown over the current page. */
  modal: React.ReactNode
}>) {
  const user = await getCurrentUser()

  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript + fontScaleInitScript }} />
      </head>
      <body className={`antialiased ${display.variable} ${body.variable} ${engraved.variable}`}>
        <MotionProvider>
          <FavoritesProvider enabled={Boolean(user)}>
            {children}
            {modal}
          </FavoritesProvider>
        </MotionProvider>
        <FontSizeControls />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
