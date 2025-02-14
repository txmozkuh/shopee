import { useSearchParams } from 'react-router-dom'
import { ProductListConfig } from '../types/product.type'

export default function useQueryParams() {
  const [searchParam] = useSearchParams()
  const validKeys: string[] = Object.keys({
    page: 1,
    limit: null,
    sort_by: 'createAt',
    order: 'asc',
    exclude: null,
    rating_filter: null,
    price_min: null,
    price_max: null,
    name: null
  })
  const param = Object.fromEntries([...searchParam])
  Object.keys(param).forEach((key) => {
    if (!validKeys.includes(key)) {
      delete param[key]
    }
  })
  return param as ProductListConfig
}
