'use client'

import { useState, type InputHTMLAttributes, type ReactNode } from 'react'
import { AlertCircle, Eye, EyeOff, LoaderCircle } from 'lucide-react'
import type { AuthResult } from '@/lib/auth/types'

// ARIA wiring for an input with an optional hint and error message.
export function fieldA11y(id: string, error?: string, hint?: string) {
  const describedBy = [hint && `${id}-hint`, error && `${id}-error`].filter(Boolean).join(' ')
  return { id, 'aria-invalid': error ? true : undefined, 'aria-describedby': describedBy || undefined }
}

type FormFieldProps = {
  id: string
  label: string
  error?: string
  hint?: string
  /** Extra element next to the label, e.g. a "forgot password" link. */
  aside?: ReactNode
  children: ReactNode
}

export function FormField({ id, label, error, hint, aside, children }: FormFieldProps) {
  return (
    <div className="auth-field">
      <div className="auth-label-row"><label className="auth-label" htmlFor={id}>{label}</label>{aside}</div>
      {children}
      {hint && !error && <p className="auth-hint" id={`${id}-hint`}>{hint}</p>}
      {error && <p className="auth-error" id={`${id}-error`}><AlertCircle aria-hidden="true" />{error}</p>}
    </div>
  )
}

export function PasswordInput(props: Omit<InputHTMLAttributes<HTMLInputElement>, 'type'>) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="password-wrap">
      <input className="auth-input" type={visible ? 'text' : 'password'} {...props} />
      <button className="password-toggle" type="button" aria-pressed={visible} aria-label={visible ? 'Ukryj hasło' : 'Pokaż hasło'} aria-controls={props.id} onClick={() => setVisible((value) => !value)}>
        {visible ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
      </button>
    </div>
  )
}

export function SubmitButton({ pending, label, pendingLabel }: { pending: boolean; label: string; pendingLabel: string }) {
  return (
    <button className="auth-submit" type="submit" disabled={pending} aria-busy={pending}>
      {pending ? <><LoaderCircle className="auth-spinner" aria-hidden="true" />{pendingLabel}</> : label}
    </button>
  )
}

// Always rendered so screen readers announce the message when it appears.
export function FormStatus({ result }: { result: AuthResult | null }) {
  return <p className={`auth-status auth-status-${result?.status ?? 'idle'}`} role="status" aria-live="polite">{result?.message}</p>
}
