// import type { RegisterOptions, UseFormGetValues } from 'react-hook-form'
// import FormData from '../types/types'
import * as yup from 'yup'

// type Rules = { [key in 'email' | 'password' | 'confirm_password']?: RegisterOptions<FormData> }

// export const getRules = (getValues?: UseFormGetValues<FormData>) =>
//   <Rules>{
//     email: {
//       required: {
//         value: true,
//         message: 'Yêu cầu nhập email'
//       },
//       pattern: {
//         value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
//         message: 'Email không đúng định dạng'
//       }
//     },
//     password: {
//       required: {
//         value: true,
//         message: 'Yêu cầu nhập password'
//       },
//       minLength: {
//         value: 6,
//         message: 'Password cần tối thiểu 6 ký tự'
//       },
//       maxLength: {
//         value: 160,
//         message: 'Password chỉ có tối thiểu 160 ký tự'
//       }
//     },
//     confirm_password: {
//       required: {
//         value: true,
//         message: 'Yêu cầu nhập lại password'
//       },
//       minLength: {
//         value: 6,
//         message: 'Password cần tối thiểu 6 ký tự'
//       },
//       maxLength: {
//         value: 160,
//         message: 'Password chỉ có tối thiểu 160 ký tự'
//       },
//       validate: getValues ? (value) => value == getValues('password') || 'Mật khẩu không khớp' : undefined
//     }
//   }

export const registerSchema = yup.object({
  email: yup.string().required('Yêu cầu nhập email').email('Email không đúng định dạng'),
  password: yup
    .string()
    .required('Yêu cầu nhập password')
    .min(6, 'Mật khẩu cần tối thiểu 6 ký tự')
    .max(160, 'Mật khẩu chỉ có tối thiểu 160 ký tự'),
  confirm_password: yup
    .string()
    .required('Yêu cầu nhập lại mật khẩu')
    .min(6, 'Mật khẩu cần tối thiểu 6 ký tự')
    .max(160, 'Mật khẩu chỉ có tối thiểu 160 ký tự')
    .oneOf([yup.ref('password')], 'Mật khẩu không khớp')
})

export const loginSchema = registerSchema.omit(['confirm_password'])

export type SchemaForm = yup.InferType<typeof registerSchema>
export type LoginSchemaForm = yup.InferType<typeof loginSchema>

export const updateUserSchema = yup.object({
  name: yup.string().max(160, 'Tối đa 160 ký tự'),
  phone: yup.string().max(20, 'Tối đa 20 ký tự'),
  address: yup.string().max(160, 'Tối đa 160 ký tự'),
  date_of_birth: yup.string(),
  avatar: yup.string().max(1000, 'Tối đa 1000 ký tự'),
  password: yup.string().min(6, 'Tối thiểu 6 ký tự').max(160, 'Tối đa 160 ký tự'),
  new_password: yup.string().min(6, 'Tối thiểu 6 ký tự').max(160, 'Tối đa 160 ký tụ')
})

export type UpdateUserForm = yup.InferType<typeof updateUserSchema>

export const changePasswordSchema = yup.object({
  password: yup
    .string()
    .required('Yêu cầu nhập mật khẩu')
    .min(6, 'Mật khẩu cần tối thiểu 6 ký tự')
    .max(160, 'Mật khẩu chỉ có tối thiểu 160 ký tự'),
  new_password: yup
    .string()
    .required('Yêu cầu nhập mật khẩu mới')
    .min(6, 'Mật khẩu cần tối thiểu 6 ký tự')
    .max(160, 'Mật khẩu chỉ có tối thiểu 160 ký tự'),
  confirm_password: yup
    .string()
    .required('Xác nhận lại mật khẩu mới')
    .min(6, 'Mật khẩu cần tối thiểu 6 ký tự')
    .max(160, 'Mật khẩu chỉ có tối thiểu 160 ký tự')
    .oneOf([yup.ref('new_password')], 'Mật khẩu mới không khớp')
})
export type ChangePasswordForm = yup.InferType<typeof changePasswordSchema>
