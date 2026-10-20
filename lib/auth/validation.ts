import type { FieldErrors, ResetPasswordValues, SignInValues, SignUpValues } from '@/lib/auth/types'

// Pure validators shared by the forms (instant feedback) and the server actions (trust boundary).
// Errors are returned in field order, so the first key is the first invalid field.

export const MIN_PASSWORD_LENGTH = 8
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function emailError(email: string) {
  if (!email.trim()) return 'Podaj adres e-mail'
  if (!EMAIL_PATTERN.test(email.trim())) return 'Podaj poprawny adres e-mail'
}

export function hasErrors(errors: FieldErrors<string>) {
  return Object.values(errors).some(Boolean)
}

function compact<Field extends string>(errors: Record<Field, string | undefined>): FieldErrors<Field> {
  return Object.fromEntries(Object.entries(errors).filter(([, message]) => message)) as FieldErrors<Field>
}

export function validateSignIn(values: SignInValues) {
  return compact<keyof SignInValues>({
    email: emailError(values.email),
    password: values.password ? undefined : 'Podaj hasło',
  })
}

export function validateSignUp(values: SignUpValues) {
  const name = values.displayName.trim()
  return compact<keyof SignUpValues>({
    displayName: !name ? 'Podaj nazwę wyświetlaną' : name.length < 2 ? 'Nazwa musi mieć co najmniej 2 znaki' : name.length > 40 ? 'Nazwa może mieć najwyżej 40 znaków' : undefined,
    email: emailError(values.email),
    password: !values.password ? 'Wpisz hasło' : values.password.length < MIN_PASSWORD_LENGTH ? `Hasło musi mieć co najmniej ${MIN_PASSWORD_LENGTH} znaków` : undefined,
    confirmPassword: !values.confirmPassword ? 'Powtórz hasło' : values.confirmPassword !== values.password ? 'Hasła nie są takie same' : undefined,
    acceptTerms: values.acceptTerms ? undefined : 'Zaakceptuj regulamin, aby założyć konto',
  })
}

export function validateResetPassword(values: ResetPasswordValues) {
  return compact<keyof ResetPasswordValues>({
    email: emailError(values.email),
  })
}
