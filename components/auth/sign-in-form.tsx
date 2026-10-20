'use client'

import Link from 'next/link'
import { FormField, FormStatus, PasswordInput, SubmitButton, fieldA11y } from '@/components/auth/form-field'
import { useAuthForm } from '@/components/auth/use-auth-form'
import { signIn } from '@/lib/auth/actions'
import { validateSignIn } from '@/lib/auth/validation'

export function SignInForm() {
  const { values, errors, pending, result, formRef, setValue, handleSubmit } = useAuthForm({
    initialValues: { email: '', password: '' },
    validate: validateSignIn,
    submit: signIn,
  })

  return (
    <form ref={formRef} className="auth-form" onSubmit={handleSubmit} noValidate>
      <FormField id="email" label="E-mail" error={errors.email}>
        <input className="auth-input" name="email" type="email" autoComplete="email" inputMode="email" placeholder="ty@przyklad.pl" value={values.email} onChange={(event) => setValue('email', event.target.value)} {...fieldA11y('email', errors.email)} />
      </FormField>
      <FormField id="password" label="Hasło" error={errors.password} aside={<Link className="auth-inline-link" href="/reset-hasla">Nie pamiętasz hasła?</Link>}>
        <PasswordInput name="password" autoComplete="current-password" value={values.password} onChange={(event) => setValue('password', event.target.value)} {...fieldA11y('password', errors.password)} />
      </FormField>
      <SubmitButton pending={pending} label="Zaloguj się" pendingLabel="Logowanie…" />
      <FormStatus result={result} />
    </form>
  )
}
