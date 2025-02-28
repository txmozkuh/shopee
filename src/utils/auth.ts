import { User } from '../types/user.types'

//? Endpoint: Local Storage
export const saveAccessToken = (access_token: string) => {
  localStorage.setItem('access_token', access_token)
}
export const saveRefreshToken = (refresh_token: string) => {
  localStorage.setItem('refresh_token', refresh_token)
}

export const getAccessToken = () => {
  return localStorage.getItem('access_token') || ''
}

export const getRefreshToken = () => {
  return localStorage.getItem('refresh_token') || ''
}

export const getProfile = () => {
  const profile = localStorage.getItem('profile')
  return profile ? JSON.parse(profile) : null
}

export const saveProfile = (profile: User | null) => {
  localStorage.setItem('profile', JSON.stringify(profile))
}

export const clearLocalStorage = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('profile')
}
