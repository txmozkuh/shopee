import { useState } from 'react'
import { purchaseStatus } from '@constants/purchase'
import { PurchaseListStatus } from '../../../types/purchases.type'
import { useQuery } from '@tanstack/react-query'
import { getPurchase } from '@apis/purchases.api'
import { formatPrice } from '@utils/utils'
import LazyLoading from '@/components/LazyLoading'

export default function PurchaseManagement() {
  const [curStatus, setcurStatus] = useState<PurchaseListStatus>(purchaseStatus.all.value)
  const { data: purchaseListData, isLoading } = useQuery({
    queryKey: ['purchase', { status: curStatus }],
    queryFn: () => getPurchase({ status: curStatus })
  })
  const purchaseList = purchaseListData?.data.data
  const List = () => {
    if (purchaseList?.length === 0) {
      return (
        <div className='bg-white w-full flex justify-center items-center h-[60vh] mt-2'>
          <img
            src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/orderlist/5fafbb923393b712b964.png'
            alt=''
            className='size-32'
          />
          <p>Chưa có đơn hàng</p>
        </div>
      )
    }
    if (isLoading) {
      return (
        <div className='bg-white text-xl animate-pulse w-full flex justify-center items-center h-[60vh] mt-2 '>
          Loading...
        </div>
      )
    }
    return (
      <div className='w-full mt-2 rounded-sm shadow-sm'>
        {/* {purchaseList?.map((item) => (
          <div className='grid grid-cols-12 px-6 py-8 my-2 bg-white gap-4' key={item._id}>
            <div className='col-span-1 border overflow-hidden relative pt-[100%] rounded-sm'>
              <img
                src={item.product.image}
                alt={item.product.name}
                className='absolute top-0 left-0 size-full object-cover'
              />
            </div>
            <div className='col-span-8 lg:col-span-9 flex-col'>
              <p className='underline text-sm md:text-base'>{item.product.name}</p>
              <p className='text-sm mt-1 text-blue-600'>Số lượng: {item.buy_count}</p>
            </div>
            <div className='lg:col-span-2 col-span-3 flex md:gap-2 justify-center items-center flex-col md:flex-row'>
              <p className='text-xs line-through text-neutral-400'>₫{formatPrice(item.price_before_discount, 0)}</p>
              <p className='text-shopee'>₫{formatPrice(item.price, 0)}</p>
            </div>
            <div className='col-span-12 flex justify-end items-center border-t pt-8'>
              <div className='flex items-end gap-2 '>
                <p className='text-sm'>Thành tiền: </p>
                <p className='text-shopee md:text-xl lg:text-2xl text-lg'>
                  ₫{formatPrice(item.buy_count * item.price, 0)}
                </p>
              </div>
            </div>
          </div>
        ))} */}
        <LazyLoading
          data={purchaseList!}
          numbersPerLoad={5}
          renderItem={(item) => (
            <div className='grid grid-cols-12 px-6 py-8 my-2 bg-white gap-4' key={item._id}>
              <div className='col-span-1 border overflow-hidden relative pt-[100%] rounded-sm'>
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className='absolute top-0 left-0 size-full object-cover'
                />
              </div>
              <div className='col-span-8 lg:col-span-9 flex-col'>
                <p className='underline text-sm md:text-base'>{item.product.name}</p>
                <p className='text-sm mt-1 text-blue-600'>Số lượng: {item.buy_count}</p>
              </div>
              <div className='lg:col-span-2 col-span-3 flex md:gap-2 justify-center items-center flex-col md:flex-row'>
                <p className='text-xs line-through text-neutral-400'>₫{formatPrice(item.price_before_discount, 0)}</p>
                <p className='text-shopee'>₫{formatPrice(item.price, 0)}</p>
              </div>
              <div className='col-span-12 flex justify-end items-center border-t pt-8'>
                <div className='flex items-end gap-2 '>
                  <p className='text-sm'>Thành tiền: </p>
                  <p className='text-shopee md:text-xl lg:text-2xl text-lg'>
                    ₫{formatPrice(item.buy_count * item.price, 0)}
                  </p>
                </div>
              </div>
            </div>
          )}
        />
      </div>
    )
  }
  return (
    <div className='col-span-10'>
      <div className='flex justify-between bg-white'>
        {Object.entries(purchaseStatus)
          .filter(([_, { name }]) => name !== purchaseStatus.inCart.name)
          .map(([key, { value, name }]) => {
            return (
              <button
                key={key}
                onClick={() => setcurStatus(value)}
                className={`w-full py-4 text-center cursor-pointer hover:text-shopee text-sm lg:text-base ${
                  value === curStatus ? 'text-shopee border-b-2 border-shopee' : ''
                }`}
              >
                {name}
              </button>
            )
          })}
      </div>
      <List />
    </div>
  )
}
