import { Category } from './category.types'

export interface ProductType {
  _id: string
  images: string[]
  price: number
  rating: number
  description: string
  price_before_discount: number
  quantity: number
  sold: number
  view: number
  name: string
  category: Category
  image: string
  createdAt: string
  updatedAt: string
}

export interface ProductList {
  products: ProductType[]
  pagination: {
    page: number
    limit: number
    page_size: number
  }
}

export interface ProductListConfig {
  name?: string
  page?: number
  limit?: number
  sort_by?: 'createAt' | 'view' | 'sold' | 'price'
  order?: 'asc' | 'desc'
  exclude?: string
  rating_filter?: string
  price_min?: number
  price_max?: number
  category?: string
}
