import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { FavoritesProvider } from '@/components/favorites-provider'
import { MotionProvider } from '@/components/motion/motion-provider'
import { FontSizeControls } from '@/components/font-size-controls'
import { fontScaleInitScript } from '@/lib/font-scale'
import { themeInitScript } from '@/lib/theme'
import './globals.css'

export const metadata: Metadata = {
  title: 'folio — historie, które zostają',
  description: 'Odkrywaj starannie wybrane książki, nowe światy i niezapomniane głosy. Znajdź swoją następną ulubioną lekturę z folio.',
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
    { media: '(prefers-color-scheme: light)', color: '#fffbf4' },
    { media: '(prefers-color-scheme: dark)', color: '#14111f' },
  ],
}

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode
  /** Parallel route slot: the opened book shown over the current page. */
  modal: React.ReactNode
}>) {
  return (
    <html lang="pl" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript + fontScaleInitScript }} />
      </head>
      <body className="antialiased">
        <MotionProvider>
          <FavoritesProvider>
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
