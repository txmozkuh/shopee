import { Purchase, PurchaseListStatus } from '../types/purchases.type'
import { ResponseApi } from '../types/utils.types'
import http from '../utils/http'

const URL = 'purchases'

export const addToCart = (body: { product_id: string; buy_count: number }) =>
  http.post<ResponseApi<Purchase>>(URL + '/add-to-cart', body)

export const getPurchase = (params: { status: PurchaseListStatus }) =>
  http.get<ResponseApi<Purchase[]>>(URL, {
    params
  })

export const updatePurchase = (body: { product_id: string; buy_count: number }) =>
  http.put<ResponseApi<Purchase>>(URL + '/update-purchase', body)

export const buyProducts = (body: { product_id: string; buy_count: number }[]) =>
  http.post<ResponseApi<Purchase>>(URL + '/buy-products', body)
