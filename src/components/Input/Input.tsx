import { RegisterOptions, UseFormRegister } from 'react-hook-form'
import FormData from '../../types/types'
import { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  classNameInput?: string
  classNameError?: string
  noError?: boolean
  register?: UseFormRegister<any>
  rules?: RegisterOptions<FormData>
  errorMessage?: string
}

export default function Input({
  name,
  type,
  className,
  classNameInput,
  classNameError = 'pl-3 mt-1 text-red-600 min-h-[1rem] text-xs',
  placeholder,
  noError = true,
  errorMessage,
  register,
  rules,
  ...rest
}: InputProps) {
  const registerProps = name && register ? register(name, rules) : {}
  const classErrorMessage = !noError ? classNameError : ''
  return (
    <div className={className}>
      <input type={type} className={classNameInput} placeholder={placeholder} {...registerProps} {...rest} />

      <div className={classErrorMessage}>{errorMessage}</div>
    </div>
  )
}
