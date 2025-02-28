import { ResponseApi } from './utils.types'
import { User } from './user.types'

export type AuthResponse = ResponseApi<{
  access_token: string
  refresh_token: string
  expires: number
  expires_refresh_token: number
  user: User
}>

export type RefreshTokenResponse = ResponseApi<{
  access_token: string
}>
