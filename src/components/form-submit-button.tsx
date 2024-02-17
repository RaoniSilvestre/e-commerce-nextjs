'use client'

import { useFormStatus } from 'react-dom'

type FormSubitButtonProps = {
  children: React.ReactNode
  className?: string
} & ComponentProps<'button'>

export default function FormSubmitButton({
  children,
  className,
  ...props
}: FormSubitButtonProps) {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      className={`btn btn-primary ${className}`}
      {...props}
      disabled={pending}
    >
      {pending && <span className="loading loading-spinner" />}
      {children}
    </button>
  )
}
