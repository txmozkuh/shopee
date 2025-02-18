import { Link, createSearchParams, useNavigate } from 'react-router-dom'
import { path } from '@constants/path'
import Button from '@components/Button'
import { Category } from '../../../types/category.types'
import { useState } from 'react'
import RatingStar from '@components/RatingStar'

interface Props {
  queryParam: any
  categories: Category[]
}

interface PriceRange {
  price_min?: number
  price_max?: number
}

export default function FilterSection({ queryParam, categories }: Props) {
  const [priceRange, setPriceRange] = useState<PriceRange>({ price_min: undefined, price_max: undefined })
  const navigate = useNavigate()
  const handleFilterPriceRange = () => {
    if (Object.values(priceRange).some((v) => v === undefined)) {
      navigate({
        pathname: path.home,
        search: createSearchParams(queryParam).toString()
      })
      return
    }
    navigate({
      pathname: path.home,
      search: createSearchParams({
        ...queryParam,
        price_min: priceRange.price_min || ' ',
        price_max: priceRange.price_max || ' '
      }).toString()
    })
  }

  const handleClearSearchParam = () => {
    navigate('/')
  }
  return (
    <div className='h-fit pb-4 mx-4  col-span-6 lg:col-span-1 px-2 text-sm lg:text-base md:mx-4 lg:mx-0'>
      <Link to={path.home} className='py-4 flex items-center gap-2 font-semibold border-b'>
        <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='currentColor' className='size-6'>
          <path
            fillRule='evenodd'
            d='M3 6.75A.75.75 0 0 1 3.75 6h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 6.75ZM3 12a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75A.75.75 0 0 1 3 12Zm0 5.25a.75.75 0 0 1 .75-.75h16.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75Z'
            clipRule='evenodd'
          />
        </svg>
        <p>Tất cả danh mục</p>
      </Link>
      <ul className='text-sm flex justify-around lg:block'>
        {categories.map((category, index) => (
          <li
            key={index}
            className={queryParam.name === category.name ? ' px-2 font-bold text-shopee bg-neutral-200 rounded-sm' : ''}
          >
            <Link
              to={{
                pathname: path.home,
                search: createSearchParams({
                  ...queryParam,
                  page: 1,
                  name: category.name
                }).toString()
              }}
              className='p-2 flex gap-2 items-center  '
            >
              {queryParam.name === category.name && (
                <svg viewBox='0 0 4 7' className='size-2 fill-shopee'>
                  <polygon points='4 3.5 0 0 0 7'></polygon>
                </svg>
              )}
              <span>{category.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className='py-4 flex items-center gap-2 font-semibold border-b'>
        <svg
          className='w-6 h-6 '
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          width='24'
          height='24'
          fill='none'
          viewBox='0 0 24 24'
        >
          <path
            stroke='currentColor'
            strokeLinecap='round'
            strokeWidth='2'
            d='M18.796 4H5.204a1 1 0 0 0-.753 1.659l5.302 6.058a1 1 0 0 1 .247.659v4.874a.5.5 0 0 0 .2.4l3 2.25a.5.5 0 0 0 .8-.4v-7.124a1 1 0 0 1 .247-.659l5.302-6.059c.566-.646.106-1.658-.753-1.658Z'
          />
        </svg>
        <p>Bộ lọc tìm kiếm</p>
      </div>

      <div className='flex justify-around lg:block'>
        <div className='mt-2 py-4 border-b '>
          <span>Khoảng giá</span>
          <div className='mt-2 py-2 flex items-center justify-between'>
            <input
              name='fromPrice'
              placeholder='₫ TỪ'
              className='w-20 text-sm px-2 py-1 border rounded-sm border-neutral-300 outline-none focus:border-neutral-500 '
              onChange={(e) => setPriceRange({ ...priceRange, price_min: Number(e.target.value) })}
              value={priceRange.price_min}
            />
            <span className='text-neutral-400'>-</span>
            <input
              name='toPrice'
              placeholder='₫ ĐẾN'
              className='w-20 text-sm px-2 py-1 border rounded-sm border-neutral-300 outline-none focus:border-neutral-500 '
              onChange={(e) => setPriceRange({ ...priceRange, price_max: Number(e.target.value) })}
              value={priceRange.price_max}
            />
          </div>
          <Button
            className=' w-full mt-2 py-1 bg-[#f63] uppercase text-sm text-white rounded-sm'
            onClick={handleFilterPriceRange}
          >
            Áp dụng
          </Button>
        </div>
        <div className='mt-2 py-4 border-b '>
          <span>Đánh giá</span>
          <div className='mt-2 flex-col '>
            {Array(5)
              .fill(0)
              .map((_, index) => {
                return (
                  <Link
                    to={{
                      pathname: path.home,
                      search: createSearchParams({
                        ...queryParam,
                        rating_filter: 5 - index
                      }).toString()
                    }}
                    key={index}
                    className='flex gap-2 my-2'
                  >
                    <RatingStar rating={5 - index} color='#ee4d2d' style='size-5 mr-2' />
                    {index !== 0 ? <span className='text-sm'>trở lên</span> : <></>}
                  </Link>
                )
              })}
          </div>
        </div>
      </div>
      <Button
        className=' w-full mt-4 py-1 bg-[#f63] uppercase text-sm text-white rounded-sm'
        onClick={handleClearSearchParam}
      >
        Xóa bộ lọc
      </Button>
    </div>
  )
}
