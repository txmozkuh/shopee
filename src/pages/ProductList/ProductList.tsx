import { useQuery } from '@tanstack/react-query'
import FilterSection from './FilterSection'
import Product from './Product'
import SortSection from './SortSection'
import { getProductList } from '@apis/prodcut.api'
import useQueryParams from '@hooks/useQueryParams'
import Pagination from '@mui/material/Pagination'
import { useSearchParams } from 'react-router-dom'
import { getCatagories } from '@apis/category.api'

export default function ProductList() {
  const queryParams = useQueryParams()
  const [param, setSearchParam] = useSearchParams()

  const { data: productData, isLoading } = useQuery({
    queryKey: ['products', queryParams],
    queryFn: () => getProductList(queryParams),
    staleTime: 3 * 60 * 1000
  })

  const page_size = productData?.data.data?.pagination.page_size || 1
  const products = productData?.data.data?.products
  const current_page = Number(param.get('page'))

  const { data: categoryData } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCatagories()
  })

  const handleChangePage = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log(event)
    param.set('page', page.toString())
    setSearchParam(param)
  }
  return (
    <div className=' '>
      <div className='max-w-7xl py-2 px-2 m-auto grid grid-cols-6 bg-white '>
        <FilterSection queryParam={queryParams} categories={categoryData?.data.data || []} />
        <div className='px-2 col-span-6 lg:col-span-5 flex flex-col'>
          <SortSection page_size={page_size} queryParam={queryParams} />
          <div className='m-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-3 place-items-center md:place-items-start flex-grow'>
            {isLoading ? (
              <div className='text-sm md:text-lg lg:text-xl size-full col-span-full animate-pulse flex items-center justify-center'>
                Loading...
              </div>
            ) : (
              products &&
              products.map((product) => {
                return (
                  <div key={product._id}>
                    <Product product={product} />
                  </div>
                )
              })
            )}
          </div>
          <div className='mt-4 flex justify-center'>
            <Pagination count={page_size} shape='rounded' onChange={handleChangePage} page={current_page} />
          </div>
        </div>
      </div>
    </div>
  )
}
