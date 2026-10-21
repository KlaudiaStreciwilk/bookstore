import type { ReactNode } from 'react'
import { AuthShowcase } from '@/components/auth/auth-showcase'
import { SiteHeader } from '@/components/site-header'
import { getCurrentUser } from '@/lib/auth/session'
import { getBooks } from '@/lib/data'

export default async function AuthLayout({ children }: { children: ReactNode }) {
  const [user, books] = await Promise.all([getCurrentUser(), getBooks()])

  return (
    <div id="top" className="auth-page">
      <SiteHeader user={user} />
      <main className="auth-main page-shell">
        <div className="auth-card">{children}</div>
        <AuthShowcase books={books} />
      </main>
    </div>
  )
}
