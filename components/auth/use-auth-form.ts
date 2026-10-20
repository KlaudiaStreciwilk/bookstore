'use client'

import { useRef, useState, useTransition, type FormEvent } from 'react'
import type { AuthResult, FieldErrors } from '@/lib/auth/types'
import { hasErrors } from '@/lib/auth/validation'

type Options<Values extends Record<string, unknown>> = {
  initialValues: Values
  validate: (values: Values) => FieldErrors<Extract<keyof Values, string>>
  submit: (values: Values) => Promise<AuthResult<Extract<keyof Values, string>>>
}

// Shared form state: validates on submit, then live while the user fixes fields,
// moves focus to the first invalid field and exposes a pending flag for the button.
export function useAuthForm<Values extends Record<string, unknown>>({ initialValues, validate, submit }: Options<Values>) {
  type Field = Extract<keyof Values, string>
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<FieldErrors<Field>>({})
  const [attempted, setAttempted] = useState(false)
  const [result, setResult] = useState<AuthResult<Field> | null>(null)
  const [pending, startTransition] = useTransition()
  const formRef = useRef<HTMLFormElement>(null)

  function focusField(field: string | undefined) {
    if (!field) return
    const element = formRef.current?.elements.namedItem(field)
    if (element instanceof HTMLElement) element.focus()
  }

  function setValue<Key extends Field>(field: Key, value: Values[Key]) {
    const next = { ...values, [field]: value }
    setValues(next)
    if (attempted) setErrors(validate(next))
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAttempted(true)
    setResult(null)
    const nextErrors = validate(values)
    setErrors(nextErrors)
    if (hasErrors(nextErrors)) {
      focusField(Object.keys(nextErrors)[0])
      return
    }
    startTransition(async () => {
      const response = await submit(values)
      if (response.fieldErrors) {
        setErrors(response.fieldErrors)
        focusField(Object.keys(response.fieldErrors)[0])
      }
      setResult(response)
    })
  }

  return { values, errors, pending, result, formRef, setValue, handleSubmit }
}
