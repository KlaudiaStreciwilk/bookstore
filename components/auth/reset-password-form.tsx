'use client'

import { FormField, FormStatus, SubmitButton, fieldA11y } from '@/components/auth/form-field'
import { useAuthForm } from '@/components/auth/use-auth-form'
import { resetPassword } from '@/lib/auth/actions'
import { validateResetPassword } from '@/lib/auth/validation'

export function ResetPasswordForm() {
  const { values, errors, pending, result, formRef, setValue, handleSubmit } = useAuthForm({
    initialValues: { email: '' },
    validate: validateResetPassword,
    submit: resetPassword,
  })

  return (
    <form ref={formRef} className="auth-form" onSubmit={handleSubmit} noValidate>
      <FormField id="email" label="E-mail" error={errors.email}>
        <input className="auth-input" name="email" type="email" autoComplete="email" inputMode="email" placeholder="ty@przyklad.pl" value={values.email} onChange={(event) => setValue('email', event.target.value)} {...fieldA11y('email', errors.email)} />
      </FormField>
      <SubmitButton pending={pending} label="Wyślij link" pendingLabel="Wysyłanie…" />
      <FormStatus result={result} />
    </form>
  )
}
