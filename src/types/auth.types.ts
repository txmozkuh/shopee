import { ResponseApi } from './utils.types'
import { User } from './user.types'

export type AuthResponse = ResponseApi<{
  access_token: string
  expires: string
  expires_refresh_token: number
  user: User
}>
