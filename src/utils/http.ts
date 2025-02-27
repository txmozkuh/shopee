import axios, { AxiosError, AxiosInstance } from 'axios'
import { toast } from 'react-toastify'
import { clearLocalStorage, getAccessToken, saveAccessToken, saveProfile, getProfile } from './auth'
import { path } from '../constants/path'
import { User } from '../types/user.types'
import { config } from '../constants/config'
class Http {
  instance: AxiosInstance
  private access_token: string
  private profile: User | null
  constructor() {
    this.access_token = getAccessToken()
    this.profile = getProfile()
    this.instance = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
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
          this.profile = response.data.data.user
          saveAccessToken(this.access_token)
          saveProfile(this.profile)
        } else if (response.config.url === path.logout) {
          //! clear access_token when logout
          this.access_token = ''
          this.profile = null
          clearLocalStorage()
        }
        return response
      },
      (error: AxiosError) => {
        if (error.status !== axios.HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data
          const message = data.message || error.message
          toast.error(message)
        }
        if (error.status === axios.HttpStatusCode.Unauthorized) {
          this.access_token = ''
          this.profile = null
          clearLocalStorage()
        }
        return Promise.reject(error)
      }
    )
  }
}

const http = new Http().instance

export default http
