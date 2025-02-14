import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { getProductDetail, getProductList } from '../../apis/prodcut.api'
import RatingStar from '../../components/RatingStar'
import { formatNumber, formatPrice, getIdFromPath } from '../../utils/utils'
import DOMPurify from 'dompurify'
import { useContext, useEffect, useMemo, useRef, useState } from 'react'
import Product from '../ProductList/Product'
import QuantityController from '../../components/QuantityController'
import { addToCart } from '../../apis/purchases.api'
import { toast } from 'react-toastify'
import { purchaseStatus } from '../../constants/purchase'
import { path } from '../../constants/path'
import { AppContext } from '../../contexts/app.context'

export default function ProductDetail() {
  const { profile } = useContext(AppContext)
  const queryClient = useQueryClient()
  //?Get product detail
  const { nameId } = useParams()
  const id = getIdFromPath(nameId as string)
  const { data: productDetailData } = useQuery({
    queryKey: ['/productDetail', id],
    queryFn: () => getProductDetail(id as string)
  })
  const productDetail = productDetailData?.data.data

  //?Image zoom
  const [isHovered, setIsHovered] = useState(false)
  const [imgPosition, setImgPosition] = useState({ x: 0, y: 0 })
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const imgRef = useRef<HTMLImageElement | null>(null)
  const [imgIndex, setImgIndex] = useState([0, 5])
  const [activeImg, setActiveImg] = useState('')
  const currentImg = useMemo(
    () => (productDetail ? productDetail.images.slice(...imgIndex) : []),
    [productDetail, imgIndex]
  )

  //?Get related products
  const { data: relatedListData } = useQuery({
    queryKey: ['/products'],
    queryFn: () => {
      return getProductList({
        limit: 20,
        page: 1,
        category: productDetail?.category._id
      })
    },
    enabled: Boolean(productDetail),
    staleTime: 3 * 60 * 1000
  })
  const relatedProductList = relatedListData?.data.data

  //?Product Quantity
  const [quantity, setQuantity] = useState(1)

  //?Add product to cart
  const addToCartMutation = useMutation({
    mutationFn: (body: { product_id: string; buy_count: number }) => addToCart(body)
  })
  const handleAddToCart = () => {
    if (profile) {
      addToCartMutation.mutate(
        {
          product_id: productDetail?._id!,
          buy_count: quantity
        },
        {
          onSuccess: (res) => {
            queryClient.invalidateQueries({
              queryKey: ['purchases', { status: purchaseStatus.inCart }],
              exact: true
            })
            toast.info(res.data.message)
          }
        }
      )
    } else {
      toast.error('Vui lòng đăng nhập')
    }
  }
  //?Buy product immediately
  const navigate = useNavigate()
  const handleBuyProduct = () => {
    if (profile) {
      handleAddToCart()
      navigate(`${path.cart}/${productDetail?._id}`)
    } else {
      toast.error('Vui lòng đăng nhập')
    }
  }
  useEffect(() => {
    if (productDetail && productDetail.image.length > 0) {
      setActiveImg(productDetail.images[0])
    }
  }, [productDetail])

  const handleActiveImg = (img: string) => {
    setActiveImg(img)
  }

  if (!productDetail) return null
  const handleNextImg = () => {
    if (imgIndex[1] < productDetail.images.length) {
      setImgIndex((prev) => [prev[0] + 1, prev[1] + 1])
    }
  }
  const handlePrevImg = () => {
    if (imgIndex[0] > 0) {
      setImgIndex((prev) => [prev[0] - 1, prev[1] - 1])
    }
  }
  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { offsetX, offsetY } = e.nativeEvent
    setImgPosition({ x: offsetX, y: offsetY })
    if (imgRef.current) {
      const rect = imgRef.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setMousePosition({ x, y })
    }
  }
  const discountPercent = Math.floor(
    ((productDetail.price_before_discount - productDetail.price) * 100) / productDetail.price_before_discount
  )

  return (
    <div className='bg-neutral-50 py-4'>
      <div className='max-w-7xl py-6 px-4 m-auto bg-white '>
        <div className='grid grid-cols-1 lg:grid-cols-12 lg:gap-9'>
          <div className='col-span-5'>
            <div
              className='relative pt-[100%] w-full shadow inline-block'
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onMouseMove={handleMouseMove}
            >
              <img
                ref={imgRef}
                src={activeImg}
                alt={productDetail.name}
                className='absolute top-0 left-0 size-full bg-white object-cover drop-shadow-sm'
              />
              {isHovered && (
                <div
                  className='absolute pointer-events-none border rounded-sm overflow-hidden'
                  style={{
                    top: `${mousePosition.y}px`,
                    left: `${mousePosition.x}px`,
                    transform: 'translate(-50%,-50%)',
                    backgroundImage: `url(${activeImg})`,
                    backgroundPosition: `${(imgPosition.x / 500) * 100}% ${(imgPosition.y / 500) * 100}%`,
                    backgroundSize: '500%',
                    width: '30%',
                    height: '30%',
                    zIndex: 99
                  }}
                />
              )}
            </div>
            <div className='mt-2 relative grid grid-cols-5 gap-1 shadow-md '>
              {currentImg.map((image: any) => (
                <div className='relative pt-[100%] w-full' key={image}>
                  <img
                    src={image}
                    className='absolute left-0 top-0 size-full object-cover bg-white col-span-1 inline-block overflow-hidden  '
                    onMouseEnter={() => handleActiveImg(image)}
                  />
                  {image === activeImg && (
                    <div className='absolute top-0 size-full rounded-sm border-orange-500 border-2'></div>
                  )}
                </div>
              ))}
              <button
                className='py-3 px-1  bg-neutral-500/50 absolute top-[50%] left-0 -translate-y-1/2 transition-transform hover:bg-neutral-500/70'
                onClick={handlePrevImg}
              >
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' className='size-6'>
                  <path
                    fillRule='evenodd'
                    d='M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
              <button
                className='py-3 px-1 bg-neutral-500/50 absolute top-[50%] right-0 -translate-y-1/2 hover:bg-neutral-500/70 transition-transform'
                onClick={handleNextImg}
              >
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white' className='size-6'>
                  <path
                    fillRule='evenodd'
                    d='M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z'
                    clipRule='evenodd'
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className='col-span-7'>
            <h1 className='text-xl font-medium'>{productDetail.name}</h1>
            <div className='flex text-base divide-x my-2 '>
              <div className='flex justify-center items-center gap-1 px-2'>
                <span className=' text-shopee border-b border-b-shopee'>{productDetail.rating}</span>
                <RatingStar rating={productDetail.rating} color='#ee4d2d' style='size-4' />
              </div>
              <div className=' flex gap-2 items-end justify-center px-2'>
                <span className='border-b border-b-black'>{formatNumber(productDetail.view, 0)}</span>
                <span className='text-sm text-neutral-500'>Đánh giá</span>
              </div>
              <div className=' flex gap-2 items-end justify-center px-2'>
                <span className='border-b border-b-black'>{formatNumber(productDetail.sold, 0)}</span>
                <span className='text-sm text-neutral-500'>Đã bán</span>
              </div>
            </div>
            <div className='flex items-center my-8 gap-4'>
              <div className=' text-gray-500 line-through '>
                <span>₫</span>
                {formatPrice(productDetail.price_before_discount, 0)}
              </div>
              <div className=' text-shopee font-medium text-3xl '>
                <span>₫</span>
                {formatPrice(productDetail.price, 0)}
              </div>
              <div className='bg-shopee rounded px-1 text-xs font-semibold text-white'>{discountPercent}% GIẢM</div>
            </div>
            <div className='grid grid-cols-6 mt-16 gap-y-8 text-sm place-items-center lg:place-items-start '>
              <div className='col-span-1  text-neutral-500 '>Mã giảm giá của Shop</div>
              <div className='col-span-5 px-4'>
                <div className='px-2 py-1 rounded-sm bg-orange-200'>
                  Giảm <span>₫</span>1k
                </div>
              </div>
              <div className='col-span-1  text-neutral-500 '>Vận chuyển</div>
              <div className='col-span-5 flex flex-col gap-1 '>
                <div className='flex gap-2'>
                  <img
                    src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/d9e992985b18d96aab90.png'
                    alt='freeship'
                    className='size-6'
                  />
                  <span>Miễn phí vận chuyển</span>
                </div>
                <div className='flex gap-2 items-center'>
                  <svg
                    data-icon-name='truck'
                    data-style='line'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    id='truck'
                    className='icon line size-6'
                  >
                    <path
                      style={{
                        fill: 'none',
                        stroke: 'rgb(0, 0, 0)',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: 1
                      }}
                      d='M7,15a2,2,0,1,0,2,2A2,2,0,0,0,7,15Zm10,0a2,2,0,1,0,2,2A2,2,0,0,0,17,15Z'
                      id='primary'
                    />
                    <path
                      style={{
                        fill: 'none',
                        stroke: 'rgb(0, 0, 0)',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: 1
                      }}
                      d='M5,17H4a1,1,0,0,1-1-1V6A1,1,0,0,1,4,5h8a1,1,0,0,1,1,1V17H9'
                      data-name='primary'
                      id='primary-2'
                    />
                    <path
                      style={{
                        fill: 'none',
                        stroke: 'rgb(0, 0, 0)',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: 1
                      }}
                      d='M15,17H13V7h4.25a1,1,0,0,1,1,.73L19,10.5l1.24.31a1,1,0,0,1,.76,1V16a1,1,0,0,1-1,1H19'
                      data-name='primary'
                      id='primary-3'
                    />
                  </svg>
                  <span className='text-neutral-500'>Vận chuyển tới </span>
                </div>
                <div className='flex gap-2 items-center'>
                  <svg
                    data-icon-name='box'
                    data-style='line'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                    id='box'
                    className='icon line size-6'
                  >
                    <rect
                      style={{
                        fill: 'none',
                        stroke: 'rgb(0, 0, 0)',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: 1
                      }}
                      rx={1}
                      height={18}
                      width={18}
                      y={3}
                      x={3}
                      id='primary'
                    />
                    <polygon
                      style={{
                        fill: 'none',
                        stroke: 'rgb(0, 0, 0)',
                        strokeLinecap: 'round',
                        strokeLinejoin: 'round',
                        strokeWidth: 1
                      }}
                      points='16 3 8 3 8 12 12 11 16 12 16 3'
                      data-name='primary'
                      id='primary-2'
                    />
                  </svg>
                  <span className='text-neutral-500'>Phí vận chuyển</span>
                </div>
              </div>

              <div className='col-span-1  text-neutral-500 '>Số lượng</div>
              <div className='col-span-5'>
                <QuantityController maxValue={productDetail?.quantity} setValue={setQuantity} value={quantity} />
              </div>
            </div>
            <div className='flex gap-3 my-8 justify-center lg:justify-start'>
              <button
                className='flex items-center justify-center px-4 py-3 border border-shopee rounded text-shopee gap-1 bg-orange-100 hover:bg-orange-200 '
                onClick={handleAddToCart}
              >
                <svg
                  data-icon-name='cart-add'
                  data-style='line'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'
                  id='cart-add'
                  className='icon line size-6 '
                >
                  <path
                    style={{
                      fill: 'none',
                      stroke: '#ee4d2d',
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                      strokeWidth: 1
                    }}
                    d='M3,3H5.2a1,1,0,0,1,1,.78L8.82,15.22a1,1,0,0,0,1,.78h8.42a1,1,0,0,0,1-.76L21,8'
                    id='primary'
                  />
                  <path
                    style={{
                      fill: 'none',
                      stroke: '#ee4d2d',
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                      strokeWidth: 1
                    }}
                    d='M14,5v6m3-3H11'
                    data-name='primary'
                    id='primary-2'
                  />
                  <line
                    style={{
                      fill: 'none',
                      stroke: '#ee4d2d',
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                      strokeWidth: '1.35'
                    }}
                    y2='20.5'
                    x2='11.05'
                    y1='20.5'
                    x1='10.95'
                    id='primary-upstroke'
                  />
                  <line
                    style={{
                      fill: 'none',
                      stroke: '#ee4d2d',
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                      strokeWidth: '1.35'
                    }}
                    y2='20.5'
                    x2='17.05'
                    y1='20.5'
                    x1='16.95'
                    data-name='primary-upstroke'
                    id='primary-upstroke-2'
                  />
                </svg>
                Thêm vào giỏ hàng
              </button>
              <button
                className='px-16 py-3 border rounded text-white bg-shopee hover:-translate-y-[0.1rem]  shadow-lg transition-transform'
                onClick={handleBuyProduct}
              >
                Mua ngay
              </button>
            </div>
            <div className='flex py-6 gap-3 text-sm border-t lg:text-base lg:justify-around '>
              <div className='flex gap-1 items-center'>
                <img
                  src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/2bcf834c40468ebcb90b.svg'
                  alt='secure'
                  className='size-5'
                />
                <span>Đổi ý miễn phí 15 ngày</span>
              </div>
              <div className='flex gap-1 items-center'>
                <img
                  src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/511aca04cc3ba9234ab0.png'
                  alt='secure'
                  className='size-5'
                />
                <span>Hàng chính hãng 100%</span>
              </div>
              <div className='flex gap-1 items-center'>
                <img
                  src='https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/16ead7e0a68c3cff9f32.png'
                  alt='secure'
                  className='size-5'
                />
                <span>Miễn phí vận chuyển</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='max-w-7xl mt-4 p-3 mx-auto leading-loose bg-white'>
        <h2 className='font-bold text-center'>Mô tả sản phẩm</h2>
        <div
          className='bg-white p-4 col-span-9'
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(productDetail.description) }}
        ></div>
      </div>
      <div className='bg-white max-w-7xl mx-auto mt-2 py-2'>
        <h2 className='font-bold text-center'>Sản phẩm cùng loại</h2>
        <div className='mt-6 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 gap-2 place-items-center'>
          {relatedProductList &&
            relatedProductList.products.map((product) => {
              return (
                <div key={product._id}>
                  <Product product={product} />
                </div>
              )
            })}
        </div>
      </div>
    </div>
  )
}
