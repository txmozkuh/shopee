import axios, { AxiosError, AxiosInstance } from 'axios'

import {
  clearLocalStorage,
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
  saveRefreshToken,
  saveProfile,
  getProfile
} from './auth'
import { path } from '@constants/path'
import { User } from '../types/user.types'
import { config } from '@constants/config'
import { RefreshTokenResponse } from '@/types/auth.types'
import { isAxiosExpiredTokenError, isAxiosUnauthorizedError } from '@/utils/utils'
import { toast } from 'react-toastify'
import { ResponseApi } from '@/types/utils.types'
class Http {
  instance: AxiosInstance
  private access_token: string
  private refresh_token: string
  private profile: User | null
  private refreshTokenRequest: Promise<string> | null
  constructor() {
    this.access_token = getAccessToken()
    this.refresh_token = getRefreshToken()
    this.profile = getProfile()
    this.refreshTokenRequest = null
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
        'expire-access-token': 10,
        'expire-refresh-token': 10
      }
    })

    this.instance.interceptors.request.use(
      (config) => {
        if (this.access_token) {
          config.headers.Authorization = this.access_token
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    this.instance.interceptors.response.use(
      (response) => {
        //! save access_token when login
        if (response.config.url === path.login || response.config.url === path.register) {
          this.access_token = response.data.data.access_token
          this.refresh_token = response.data.data.refresh_token
          this.profile = response.data.data.user
          saveAccessToken(this.access_token)
          saveRefreshToken(this.refresh_token)
          saveProfile(this.profile)
        } else if (response.config.url === '/logout') {
          //! clear access_token when logout
          this.access_token = ''
          this.refresh_token = ''
          this.profile = null
          this.refreshTokenRequest = null
          clearLocalStorage()
        }
        return response
      },
      (error: AxiosError) => {
        if (
          error.status !== axios.HttpStatusCode.UnprocessableEntity &&
          error.status !== axios.HttpStatusCode.Unauthorized
        ) {
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        if (isAxiosUnauthorizedError<ResponseApi<{ name: string; message: string }>>(error)) {
          //Không phải lỗi gọi request_refresh_token và access_token hết hạn
          const config = error.response!.config
          const { url } = config
          if (isAxiosExpiredTokenError(error) && url !== 'refresh-access-token') {
            this.refreshTokenRequest = this.refreshTokenRequest
              ? this.refreshTokenRequest
              : this.handleRefreshToken().finally(() => {
                  this.refreshTokenRequest = null
                })
            return this.refreshTokenRequest.then((access_token) => {
              config.headers.Authorization = access_token
              return this.instance.request(config)
            })
          }
          clearLocalStorage()
          this.access_token = ''
          this.refresh_token = ''
          this.profile = null
          toast.error('Vui lòng đăng nhập lại!')
          window.location.reload()
        }
        return Promise.reject(error)
      }
    )
  }
  private handleRefreshToken() {
    return this.instance
      .post<RefreshTokenResponse>('refresh-access-token', {
        refresh_token: this.refresh_token
      })
      .then((response) => {
        const { access_token } = response.data.data!
        this.access_token = access_token
        saveAccessToken(access_token)
        return access_token
      })
      .catch((error) => {
        clearLocalStorage()
        this.access_token = ''
        this.refresh_token = ''
        throw error
      })
  }
}

const http = new Http().instance

export default http
