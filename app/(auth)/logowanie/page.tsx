import type { Metadata } from 'next'
import Link from 'next/link'
import { SignInForm } from '@/components/auth/sign-in-form'

export const metadata: Metadata = {
  title: 'Zaloguj się — Książkarnia',
}

export default function SignInPage() {
  return (
    <>
      <p className="eyebrow auth-eyebrow">Witaj ponownie</p>
      <h1 className="auth-title">Zaloguj się</h1>
      <p className="auth-lead">Wróć do swojej półki, ulubionych książek i rozpoczętych lektur.</p>
      <SignInForm />
      <p className="auth-switch">Nie masz konta? <Link href="/rejestracja">Załóż je</Link></p>
    </>
  )
}
