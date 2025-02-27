import { useSearchParams } from 'react-router-dom'
import Popover from '@components/Popover'
import { sortBy, order } from '@constants/product'
import { ProductListConfig } from '../../../types/product.type'

interface PaginationProps {
  queryParam: ProductListConfig
  page_size: number
}

export default function SortSection({ page_size, queryParam }: PaginationProps) {
  const { sort_by = sortBy.createAt } = queryParam
  const [param, setSearchParam] = useSearchParams()
  const current_page = Number(queryParam.page) || 1

  const isActiveSortByClassName = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    return sortByValue === sort_by && ' bg-orange-600 text-white'
  }
  const handleChangeSortBy = (sortByValue: Exclude<ProductListConfig['sort_by'], undefined>) => {
    param.set('sort_by', sortByValue)
    param.set('page', '1')
    param.delete('order')
    setSearchParam(param)
  }

  const handleChangeSortPriceOrder = (sortOrder: Exclude<ProductListConfig['order'], undefined>) => {
    param.set('sort_by', sortBy.price)
    param.set('order', sortOrder)
    param.set('page', '1')

    setSearchParam(param)
  }

  const handleChangePageDir = (direction: 'forward' | 'backward') => {
    if (direction === 'forward') {
      if (current_page !== page_size) {
        param.set('page', (current_page + 1).toString())
      }
    } else {
      if (current_page > 1) param.set('page', (current_page - 1).toString())
    }
    setSearchParam(param)
  }
  return (
    <div className='px-4 py-3 relative z-10 flex justify-between '>
      <div className='text-xs md:text-sm flex gap-1 items-center flex-wrap'>
        <span className='hidden md:block px-2 font-medium'>Sắp xếp theo</span>
        <button
          className={'px-4 py-2 rounded-sm' + isActiveSortByClassName(sortBy.view)}
          onClick={() => handleChangeSortBy(sortBy.view)}
        >
          Phổ biến
        </button>
        <button
          className={'px-4 py-2 rounded-sm' + isActiveSortByClassName(sortBy.createAt)}
          onClick={() => handleChangeSortBy(sortBy.createAt)}
        >
          Mới nhất
        </button>
        <button
          className={'px-4 py-2 rounded-sm' + isActiveSortByClassName(sortBy.sold)}
          onClick={() => handleChangeSortBy(sortBy.sold)}
        >
          Bán chạy
        </button>
        <Popover
          offsetValue={0}
          children={
            <div className='bg-white'>
              <div
                className={
                  'w-36 md:w-48 flex justify-between items-center px-4 py-2 rounded-sm' +
                  isActiveSortByClassName(sortBy.price)
                }
              >
                {!queryParam.order ? 'Giá' : queryParam.order === 'asc' ? 'Giá: thấp đến cao' : 'Giá: cao đến thấp'}
                <svg
                  className='w-2.5 h-2.5 ms-3'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 10 6'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='m1 1 4 4 4-4'
                  />
                </svg>
              </div>
            </div>
          }
          renderPopover={
            <div id='mega-menu-dropdown' className='relative w-36 md:w-48 bg-white text-neutral-800 shadow-md'>
              <div className='p-4 '>
                <ul className='space-y-4' aria-labelledby='mega-menu-dropdown-button'>
                  <li
                    className='hover:text-orange-600 cursor-pointer'
                    onClick={() => handleChangeSortPriceOrder(order.asc)}
                  >
                    Giá: thấp đến cao
                  </li>
                  <li
                    className='hover:text-orange-600 cursor-pointer'
                    onClick={() => handleChangeSortPriceOrder(order.desc)}
                  >
                    Giá: cao đến thấp
                  </li>
                </ul>
              </div>
            </div>
          }
        />
      </div>
      <div className=' justify-center items-center hidden md:flex'>
        <span className='text-sm text-orange-500 '>{queryParam.page || 1}/</span>
        <span className='text-sm'>{page_size}</span>
        <div className=' flex ml-2 '>
          <div
            className={`p-2 border border-neutral-300 cursor-pointer  ${current_page > 1 ? 'bg-white' : 'bg-slate-300'}`}
            onClick={() => handleChangePageDir('backward')}
          >
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-3'>
              <path
                fillRule='evenodd'
                d='M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z'
                clipRule='evenodd'
              />
            </svg>
          </div>
          <div
            className={`p-2 border border-neutral-300 cursor-pointer  ${current_page < page_size ? 'bg-white' : 'bg-slate-300'}`}
            onClick={() => handleChangePageDir('forward')}
          >
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-3  '>
              <path
                fillRule='evenodd'
                d='M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z'
                clipRule='evenodd'
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
