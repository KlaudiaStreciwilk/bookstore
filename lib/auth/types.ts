export type User = {
  name: string
  email: string
}

export type FieldErrors<Field extends string> = Partial<Record<Field, string>>

export type AuthResult<Field extends string = string> = {
  status: 'success' | 'error' | 'info'
  message?: string
  fieldErrors?: FieldErrors<Field>
}

export type SignInValues = {
  email: string
  password: string
}

export type SignUpValues = {
  displayName: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export type ResetPasswordValues = {
  email: string
}
