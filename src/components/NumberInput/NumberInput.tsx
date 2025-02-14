import { RegisterOptions } from 'react-hook-form'
import FormData from '../../types/types'
import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameError?: string
  noError?: boolean
  rules?: RegisterOptions<FormData>
  errorMessage?: string
}

export default function NumberInput({
  type,
  className,
  classNameInput,
  classNameError = 'pl-3 mt-1 text-red-600 min-h-[1rem] text-xs',
  placeholder,
  noError = true,
  errorMessage
}: InputProps) {
  const classErrorMessage = !noError ? classNameError : ''
  return (
    <div className={className}>
      <input type={type} className={classNameInput} placeholder={placeholder} />
      <div className={classErrorMessage}>{errorMessage}</div>
    </div>
  )
}
