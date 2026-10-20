'use server'

import type { AuthResult, ResetPasswordValues, SignInValues, SignUpValues } from '@/lib/auth/types'
import { hasErrors, validateResetPassword, validateSignIn, validateSignUp } from '@/lib/auth/validation'

// Placeholder auth layer: validates input but stores nothing.
// Each function keeps the final signature, so wiring Supabase only means replacing the TODO blocks.

const COMING_SOON = 'Logowanie będzie dostępne wkrótce'

export async function signIn(values: SignInValues): Promise<AuthResult<keyof SignInValues>> {
  const fieldErrors = validateSignIn(values)
  if (hasErrors(fieldErrors)) return { status: 'error', fieldErrors }

  // TODO: Supabase — `await supabase.auth.signInWithPassword({ email, password })`,
  // then map errors (e.g. invalid credentials) to a Polish message and redirect on success.
  return { status: 'info', message: COMING_SOON }
}

export async function signUp(values: SignUpValues): Promise<AuthResult<keyof SignUpValues>> {
  const fieldErrors = validateSignUp(values)
  if (hasErrors(fieldErrors)) return { status: 'error', fieldErrors }

  // TODO: Supabase — `await supabase.auth.signUp({ email, password, options: { data: { display_name } } })`.
  return { status: 'info', message: COMING_SOON }
}

export async function resetPassword(values: ResetPasswordValues): Promise<AuthResult<keyof ResetPasswordValues>> {
  const fieldErrors = validateResetPassword(values)
  if (hasErrors(fieldErrors)) return { status: 'error', fieldErrors }

  // TODO: Supabase — `await supabase.auth.resetPasswordForEmail(email, { redirectTo })`.
  return { status: 'info', message: COMING_SOON }
}

export async function signOut(): Promise<AuthResult> {
  // TODO: Supabase — `await supabase.auth.signOut()`, then revalidate / redirect to "/".
  return { status: 'info', message: COMING_SOON }
}
