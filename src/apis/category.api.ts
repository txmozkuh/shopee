import { Category } from '../types/category.types'
import { ResponseApi } from '../types/utils.types'
import http from '../utils/http'

const URL = '/categories'

export const getCatagories = () => http.get<ResponseApi<Category[]>>(URL)
