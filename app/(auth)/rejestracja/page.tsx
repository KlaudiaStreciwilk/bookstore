import type { Metadata } from 'next'
import Link from 'next/link'
import { SignUpForm } from '@/components/auth/sign-up-form'

export const metadata: Metadata = {
  title: 'Załóż konto — folio',
}

export default function SignUpPage() {
  return (
    <>
      <p className="eyebrow auth-eyebrow">Dołącz do folio</p>
      <h1 className="auth-title">Załóż konto</h1>
      <p className="auth-lead">Kilka sekund i masz własną półkę z ulubionymi książkami.</p>
      <SignUpForm />
      <p className="auth-switch">Masz już konto? <Link href="/logowanie">Zaloguj się</Link></p>
    </>
  )
}
