import axios, { AxiosError } from 'axios'
import { config } from '../constants/config'
import { ResponseApi } from '@/types/utils.types'

export function isAxiosError<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error)
}

export function isAxiosUnprocessableEntityError<FormError>(error: unknown): error is AxiosError<FormError> {
  // ! Check if error is 422
  return isAxiosError(error) && error.response?.status === axios.HttpStatusCode.UnprocessableEntity
}

export function isAxiosUnauthorizedError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return isAxiosError(error) && error.response?.status === axios.HttpStatusCode.Unauthorized
}

export function isAxiosExpiredTokenError<UnauthorizedError>(error: unknown): error is AxiosError<UnauthorizedError> {
  return (
    isAxiosUnauthorizedError<ResponseApi<{ name: string; message: string }>>(error) &&
    error.response?.data?.data?.name === 'EXPIRED_TOKEN'
  )
}

export const formatPrice = (num: number, digit: number) => {
  return Intl.NumberFormat('de-DE', { minimumFractionDigits: digit }).format(num)
}

export const formatNumber = (num: number, digit: number) => {
  return Intl.NumberFormat('en', { notation: 'compact', minimumFractionDigits: digit }).format(num).replace('.', ',')
}

// export const formatDate = (isoDate: string) => {
//   const date = new Date(isoDate)
//   const day = String(date.getDate()).padStart(2, '0')
//   const month = String(date.getMonth() + 1).padStart(2, '0')
//   const year = date.getFullYear()
//   return `${year}-${month}-${day}`
// }

export const generateNameId = (name: string, id: string) => {
  let _name = name
    .toLowerCase()
    .replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')
    .replace(/\s/g, '-')
  _name += '-i:' + id
  return _name
}

export const getIdFromPath = (url: string) => {
  return url.split('-i:')[1]
}

export const getAvatarUrl = (avatarName: string) => {
  return `${config.baseUrl}images/${avatarName}`
}
