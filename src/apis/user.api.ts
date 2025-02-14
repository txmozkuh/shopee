import { User } from '../types/user.types'
import { ResponseApi } from '../types/utils.types'
import http from '../utils/http'
import { UpdateUserForm } from '../utils/rules'

export const getUserInfo = () => http.get<ResponseApi<User>>('/me')

export const updateUserInfo = (body: UpdateUserForm) => http.put<ResponseApi<User>>('/user', body)

export const uploadUserAvatar = (body: FormData) =>
  http.post<ResponseApi<string>>('/user/upload-avatar', body, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
