import { Link } from 'react-router-dom'
import { path } from '@constants/path'
import { ProductType } from '../../../types/product.type'
import { formatNumber, formatPrice, generateNameId } from '@utils/utils'
import RatingStar from '@components/RatingStar'

interface ProductProps {
  product: ProductType
}

export default function Product({ product }: ProductProps) {
  const { name, _id, price, price_before_discount, rating, sold, image } = product
  const _price = formatPrice(price, 0)
  const _price_before_discount = formatPrice(price_before_discount, 0)
  const _sold = formatNumber(sold, 0)
  return (
    <Link to={`${path.home + generateNameId(name, _id)}`}>
      <div className='h-full bg-white rounded-sm shadow size-48 hover:-translate-y-[2px] duration-75 hover:shadow-md transition-transformw'>
        <div className='w-full pt-[100%] relative '>
          <img src={image} className='size-full absolute top-0 left-0 bg-white object-cover ' />
        </div>
        <div className=' p-2 overflow-hidden flex flex-col gap-4'>
          <span className='min-h-7 line-clamp-2 text-xs'>{name} </span>
          <div className='text-[#f64] text-md flex items-center'>
            <div className='line-through text-xs mr-1 text-neutral-500'>
              <span className='text-[0.6rem]'>₫</span>
              <span>{_price_before_discount} </span>
            </div>
            <div>
              <span className='text-[0.6rem]'>₫</span>
              <span>{_price}</span>
            </div>
          </div>
          <div className='text-xs self-end flex gap-2'>
            <RatingStar rating={rating} color={'#ee4d2d'} style='size-3' />
            <span className='lowercase'>{_sold} Đã bán</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
