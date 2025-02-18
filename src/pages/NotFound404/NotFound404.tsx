import { path } from '@/constants/path'
import { Link } from 'react-router-dom'

export default function NotFound404() {
  return (
    <div className='w-full h-[50vh] flex justify-center items-center flex-col gap-4'>
      <img
        src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/shopmicrofe/6202cbd8f3f78638666d.png'
        alt='404'
      />
      <h1 className='text-neutral-400 text-xl'>Không tìm thấy trang</h1>
      <Link to={path.home} className='bg-shopee text-white px-4 py-2 rounded-sm'>
        Trở về trang chủ
      </Link>
    </div>
  )
}
