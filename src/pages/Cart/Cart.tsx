import { useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { buyProducts, getPurchase, updatePurchase } from '../../apis/purchases.api'
import { purchaseStatus } from '../../constants/purchase'
import QuantityController from '../../components/QuantityController'
import { formatPrice } from '../../utils/utils'
import { useEffect, useState } from 'react'
import { Purchase } from '../../types/purchases.type'
import { toast } from 'react-toastify'

export default function Cart() {
  const queryClient = useQueryClient()
  const [selectedItem, setSelectedItem] = useState<Purchase[] | undefined>([])
  const { product_id } = useParams()

  const { data: cartListData } = useQuery({
    queryKey: ['cart', { status: purchaseStatus.inCart }],
    queryFn: () => getPurchase({ status: purchaseStatus.inCart.value })
  })
  const cartList = cartListData?.data.data

  useEffect(() => {
    if (cartList && product_id) {
      const curProduct = cartList.filter((item) => item.product._id === product_id)
      setSelectedItem(curProduct)
    }
  }, [cartList, product_id])

  const updateCartMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => updatePurchase(body)
  })
  const buyProductsMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }[]) => buyProducts(body)
  })
  const handleUpdateCart = (product_id: string, buy_count: number) => {
    updateCartMutation.mutate({
      product_id,
      buy_count
    })
  }

  const handleSelectedItem = (item: Purchase) => {
    setSelectedItem((prevSelectedItems) => {
      if (prevSelectedItems!.includes(item)) {
        // If item is already selected, remove it
        return prevSelectedItems!.filter((i) => i !== item)
      } else {
        // If item is not selected, add it
        return [...prevSelectedItems!, item]
      }
    })
  }

  const handleSelectedAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      setSelectedItem(cartList)
    } else {
      setSelectedItem([])
    }
  }

  const handleBuyProducts = () => {
    if (selectedItem) {
      const selectedProducts = selectedItem.map(({ product: { _id }, buy_count }) => {
        return { product_id: _id, buy_count }
      })
      buyProductsMutation.mutate(selectedProducts, {
        onSuccess: (res) => {
          queryClient.invalidateQueries({
            //Call lại API từ theo queryKey ở một nhánh khác
            queryKey: ['cart', { status: purchaseStatus.inCart.value }],
            exact: true
          })
          setSelectedItem([])
          toast.info(res.data.message)
        }
      })
    }
  }

  return (
    <div className='max-w-7xl mx-auto'>
      <div className='w-full my-2'>
        <div className='grid grid-cols-12 bg-white py-6 px-2 rounded-sm shadow-sm mb-2 place-items-center text-sm'>
          <input
            type='checkbox'
            className='col-span-1 accent-shopee scale-125'
            onChange={handleSelectedAll}
            checked={cartList?.length === selectedItem?.length}
          />
          <div className='col-span-4 md:col-span-5'>Sản phẩm</div>
          <div className='col-span-2'>Đơn giá</div>
          <div className='col-span-2'>Số lượng</div>
          <div className='col-span-2 md:col-span-1'>Số tiền</div>
          <div className='col-span-1'>Thao tác</div>
        </div>
        <div className='flex-col bg-white shadow-sm rounded-sm divide-y text-sm place-items-center'>
          {cartList?.map((item) => (
            <div className='grid grid-cols-12 place-items-center w-full' key={item._id}>
              <input
                type='checkbox'
                className='col-span-1 accent-shopee scale-125'
                onChange={() => handleSelectedItem(item)}
                checked={selectedItem?.includes(item)}
              />

              <div className='flex col-span-4 md:col-span-5  place-self-start px-4 py-6 gap-2 flex-col md:flex-row'>
                <img src={item.product.image} alt={item.product.name} className='size-12' />
                <p className='font-normal text-xs md:text-sm'>{item.product.name}</p>
              </div>
              <div className='col-span-2 flex gap-2 items-center text-sm flex-col md:flex-row'>
                <p className='line-through text-neutral-500 text-xs '>₫{formatPrice(item.price_before_discount, 0)}</p>
                <p className='text-shopee'>₫{formatPrice(item.price, 0)}</p>
              </div>
              <div className='col-span-2'>
                <QuantityController
                  value={item.buy_count}
                  maxValue={item.product.quantity}
                  action={handleUpdateCart}
                  actionValue={item.product._id}
                />
              </div>
              <div className=' text-shopee col-span-2 md:col-span-1 text-sm'>
                ₫{formatPrice(item.price * item.buy_count, 0)}
              </div>
              <div className='col-span-1'>
                <button className='col-span-1 hover:underline hover:font-medium text-xs md:text-sm'>Xóa </button>
              </div>
            </div>
          ))}
        </div>
        <div className='mt-2 sticky bottom-0 bg-white py-4 md:p-8 rounded-sm shadow-inner flex mb-2 justify-between border-t-2 border-shopee'>
          <div className='flex md:gap-8 justify-center items-center'>
            <label className='flex md:gap-8 px-4 gap-2'>
              <input
                type='checkbox'
                className='accent-shopee scale-125'
                onChange={handleSelectedAll}
                checked={cartList?.length === selectedItem?.length}
              />
              <p className='cursor-pointer hover:underline text-sm md:text-lg'>
                Chọn tất cả {`(${cartList?.reduce((acc, cur) => acc + cur.buy_count, 0)})`}
              </p>
            </label>
            <button className='hover:underline mx-4 text-sm md:text-base'>Xóa</button>
          </div>
          <div className=' gap-8 flex justify-center items-center '>
            <p className='md:text-lg text-sm text-center'>
              Tổng thanh toán {`(${selectedItem?.reduce((acc, cur) => acc + cur.buy_count, 0)}) sản phẩm: `}
            </p>
            <span className='text-shopee font-medium md:text-xl'>
              ₫{formatPrice(selectedItem?.reduce((acc, cur) => acc + cur.buy_count * cur.price, 0)!, 0)}
            </span>
            <button
              className='bg-shopee text-white font-light px-4 py-2 md:px-8 md:py-4 rounded-sm'
              onClick={handleBuyProducts}
              disabled={buyProductsMutation.isPending}
            >
              {buyProductsMutation.isPending ? 'Đang mua hàng ' : 'Mua hàng'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
