import { ProductType, ProductList, ProductListConfig } from '../types/product.type'
import { ResponseApi } from '../types/utils.types'
import http from '@utils/http'

const URL = '/products'

export const getProductList = (params: ProductListConfig) => http.get<ResponseApi<ProductList>>(URL, { params })

export const getProductDetail = (id: string) => http.get<ResponseApi<ProductType>>(`${URL}/${id}`)
