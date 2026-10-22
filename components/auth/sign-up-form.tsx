'use client'

import { AlertCircle } from 'lucide-react'
import { FormField, FormStatus, PasswordInput, SubmitButton, fieldA11y } from '@/components/auth/form-field'
import { useAuthForm } from '@/components/auth/use-auth-form'
import { signUp } from '@/lib/auth/actions'
import { MIN_PASSWORD_LENGTH, validateSignUp } from '@/lib/auth/validation'

export function SignUpForm() {
  const { values, errors, pending, result, formRef, setValue, handleSubmit } = useAuthForm({
    initialValues: { displayName: '', email: '', password: '', confirmPassword: '', acceptTerms: false },
    validate: validateSignUp,
    submit: signUp,
  })
  const passwordHint = `Co najmniej ${MIN_PASSWORD_LENGTH} znaków`

  return (
    <form ref={formRef} className="auth-form" onSubmit={handleSubmit} noValidate>
      <FormField id="displayName" label="Nazwa wyświetlana" error={errors.displayName}>
        <input className="auth-input" name="displayName" type="text" autoComplete="nickname" placeholder="np. Ania czyta" value={values.displayName} onChange={(event) => setValue('displayName', event.target.value)} {...fieldA11y('displayName', errors.displayName)} />
      </FormField>
      <FormField id="email" label="E-mail" error={errors.email}>
        <input className="auth-input" name="email" type="email" autoComplete="email" inputMode="email" placeholder="ty@przyklad.pl" value={values.email} onChange={(event) => setValue('email', event.target.value)} {...fieldA11y('email', errors.email)} />
      </FormField>
      <FormField id="password" label="Hasło" error={errors.password} hint={passwordHint}>
        <PasswordInput name="password" autoComplete="new-password" value={values.password} onChange={(event) => setValue('password', event.target.value)} {...fieldA11y('password', errors.password, passwordHint)} />
      </FormField>
      <FormField id="confirmPassword" label="Powtórz hasło" error={errors.confirmPassword}>
        <PasswordInput name="confirmPassword" autoComplete="new-password" value={values.confirmPassword} onChange={(event) => setValue('confirmPassword', event.target.value)} {...fieldA11y('confirmPassword', errors.confirmPassword)} />
      </FormField>
      <div className="auth-field">
        <label className="auth-checkbox" htmlFor="acceptTerms">
          <input name="acceptTerms" type="checkbox" checked={values.acceptTerms} onChange={(event) => setValue('acceptTerms', event.target.checked)} {...fieldA11y('acceptTerms', errors.acceptTerms)} />
          <span>Akceptuję regulamin serwisu Książkarnia i politykę prywatności.</span>
        </label>
        {errors.acceptTerms && <p className="auth-error" id="acceptTerms-error"><AlertCircle aria-hidden="true" />{errors.acceptTerms}</p>}
      </div>
      <SubmitButton pending={pending} label="Załóż konto" pendingLabel="Zakładanie konta…" />
      <FormStatus result={result} />
    </form>
  )
}
