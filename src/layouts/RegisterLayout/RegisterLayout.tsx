import React from 'react'
import RegisterHeader from '@components/RegisterHeader'
import Footer from '@components/Footer'
interface Props {
  children?: React.ReactNode
}

export default function RegisterLayout({ children }: Props) {
  return (
    <>
      <RegisterHeader />
      <div className='bg-shopee flex justify-center '>
        <div className='h-[600px] w-[1040px] px-10 bg-shopee-99 bg-no-repeat bg-cover flex align-middle justify-center'>
          <div className='w-full grid grid-cols-1 lg:grid-cols-5 md:grid-cols-4 place-content-center'>
            <div className=' lg:col-span-2 lg:col-start-4 md:col-span-2 md:col-start-2 '>{children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
