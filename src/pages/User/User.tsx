import { Link } from 'react-router-dom'
import { path } from '@constants/path'
import { useEffect, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getUserInfo } from '@/apis/user.api'
import { getAvatarUrl } from '@utils/utils'
import UserImage from '@images/user.svg'
interface Props {
  children: React.ReactNode
}
export default function User({ children }: Props) {
  const [curPath, setCurPath] = useState<string>(window.location.pathname)
  const { data: userData } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getUserInfo()
  })
  const userInfo = userData?.data.data
  const userName = userInfo?.name ?? 'New User'
  const avatarImage = userInfo?.avatar ? getAvatarUrl(userInfo.avatar) : UserImage
  useEffect(() => {
    setCurPath(window.location.pathname)
  }, [window.location.pathname])
  return (
    <div className=''>
      <div className='max-w-7xl m-auto md:p-4 p-2 grid grid-cols-12 gap-2'>
        <div className='col-span-12 md:col-span-3 lg:col-span-2 gap-2 bg-white shadow-sm px-4 h-fit'>
          <div className='flex justify-center items-center gap-3 border-b py-4'>
            <img src={avatarImage} alt='' className='rounded-[50%] size-12' />
            <span className='text-sm font-medium leading-loose'>{userName}</span>
          </div>
          <div className='py-4 flex md:flex-col justify-evenly gap-5'>
            <Link
              to={path.profile}
              onClick={() => setCurPath(path.profile)}
              className={`flex gap-2 hover:text-shopee ${curPath === path.profile ? 'text-shopee' : ''}`}
            >
              <img src='https://down-vn.img.susercontent.com/file/ba61750a46794d8847c3f463c5e71cc4' className='h-5' />
              <span className='text-sm font-medium'>Tài khoản của tôi</span>
            </Link>
            <Link
              to={path.change_password}
              onClick={() => setCurPath(path.change_password)}
              className={`flex gap-2 hover:text-shopee ${curPath === path.change_password ? 'text-shopee' : ''}`}
            >
              <img src='https://cdn-icons-png.flaticon.com/128/2889/2889676.png' className='h-5' />
              <span className='text-sm font-medium'>Đổi mật khẩu</span>
            </Link>
            <Link
              to={path.purchase}
              onClick={() => setCurPath(path.purchase)}
              className={`flex gap-2 hover:text-shopee ${curPath === path.purchase ? 'text-shopee' : ''}`}
            >
              <img src='https://down-vn.img.susercontent.com/file/f0049e9df4e536bc3e7f140d071e9078' className='h-5' />
              <span className='text-sm font-medium'>Đơn mua</span>
            </Link>
          </div>
        </div>
        <div className='col-span-full md:col-span-9 lg:col-span-10'>{children}</div>
      </div>
    </div>
  )
}
