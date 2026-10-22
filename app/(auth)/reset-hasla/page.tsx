import type { Metadata } from 'next'
import Link from 'next/link'
import { ResetPasswordForm } from '@/components/auth/reset-password-form'

export const metadata: Metadata = {
  title: 'Reset hasła — Książkarnia',
}

export default function ResetPasswordPage() {
  return (
    <>
      <p className="eyebrow auth-eyebrow">Reset hasła</p>
      <h1 className="auth-title">Nie pamiętasz hasła?</h1>
      <p className="auth-lead">Podaj adres e-mail powiązany z kontem, a wyślemy Ci link do ustawienia nowego hasła.</p>
      <ResetPasswordForm />
      <p className="auth-switch">Pamiętasz jednak? <Link href="/logowanie">Wróć do logowania</Link></p>
    </>
  )
}
