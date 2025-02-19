export default function Footer() {
  return (
    <footer className='bg-[#fbfbfb] border-t-4 border-shopee'>
      <div className='py-8'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className=' my-10 hidden lg:grid grid-cols-5 gap-4  text-sm '>
            <div className=' col-span-1'>
              <h3 className='mb-6 text-xs font-bold uppercase'>Chăm sóc khách hàng</h3>
              <span className='text-xs leading-7 text-neutral-500'>
                <p>Trung tâm trợ giúp</p>
                <p>Shopee Blog</p>
                <p>Shopee Email</p>
                <p>Hướng dẫn bán hàng</p>
                <p>Hướng dẫn mua hàng</p>
                <p>Thanh toán</p>
                <p>Shopee xu</p>
                <p>Vận chuyển</p>
                <p>Trả hàng & Hoàn tiền</p>
                <p>Chăm sóc khách hàng</p>
                <p>Chính sách bảo hành</p>
              </span>
            </div>
            <div className=' col-span-1'>
              <h3 className='mb-6 text-xs font-bold uppercase'>Về shopee</h3>
              <span className='text-xs leading-7 text-neutral-500'>
                <p>Giới thiệu về Shopee Việt Nam</p>
                <p>Tuyển dụng</p>
                <p>Điều khoản shopee</p>
                <p>Chính sách bảo mật</p>
                <p>Chính hãng</p>
                <p>Kênh người bán</p>
                <p>Flash Sales</p>
                <p>Chương trình tiếp thị</p>
                <p>Liên hệ truyền thông</p>
              </span>
            </div>
            <div className=' col-span-1'>
              <h3 className='mb-6 text-xs font-bold uppercase'>Thanh toán</h3>
              <div className='flex flex-wrap gap-2'>
                <img src='/payment/visa.png' className=' p-1 bg-white drop-shadow-md ' />
                <img src='/payment/mastercard.png' className=' p-1 bg-white drop-shadow-md ' />
                <img src='/payment/ucb.png' className=' p-1 bg-white drop-shadow-md ' />
                <img src='/payment/ae.png' className=' p-1 bg-white drop-shadow-md ' />
                <img src='/payment/cod.png' className=' p-1 bg-white drop-shadow-md ' />
                <img src='/payment/payment.png' className=' p-1 bg-white drop-shadow-md ' />
                <img src='/payment/shopee_pay.png' className=' p-1 bg-white drop-shadow-md ' />
                <img src='/payment/spay_later.png' className=' p-1 bg-white drop-shadow-md ' />
              </div>
              <h3 className='my-6 text-xs font-bold uppercase'>Đơn vị vận chuyển</h3>
              <div className='flex flex-wrap gap-2'>
                <img src='/shipment/spx.png' className=' p-1 bg-white drop-shadow-md ' />
                <img src='/shipment/ghtk.png' className=' p-1 bg-white drop-shadow-md ' />
                <img src='/shipment/ghn.png' className=' p-1 bg-white drop-shadow-md ' />
                <img src='/shipment/viettel_post.png' className=' p-1 bg-white drop-shadow-md ' />
                <img src='/shipment/viettel_post2.png' className=' p-1 bg-white drop-shadow-md ' />
                <img src='/shipment/jt.png' className=' p-1 bg-white drop-shadow-md ' />
                <img src='/shipment/grab.png' className=' p-1 bg-white drop-shadow-md ' />
                <img src='/shipment/ninja_van.png' className=' p-1 bg-white drop-shadow-md ' />
                <img src='/shipment/best.png' className=' p-1 bg-white drop-shadow-md ' />
                <img src='/shipment/be.png' className=' p-1 bg-white drop-shadow-md ' />
                <img src='/shipment/aha.png' className=' p-1 bg-white drop-shadow-md ' />
              </div>
            </div>
            <div className=' col-span-1'>
              <h3 className='mb-6 text-xs font-bold uppercase'>Theo dõi chúng tôi</h3>
              <span className='text-xs leading-7 text-neutral-500'>
                <span className='flex cursor-pointer'>
                  <img src='/social/icons8-facebook.svg' className='self-center size-4 mr-2' />
                  <p>Facebook</p>
                </span>
                <span className='flex cursor-pointer'>
                  <img src='/social/icons8-instagram.svg' className='self-center size-4 mr-2' />
                  <p>Instagram</p>
                </span>
                <span className='flex cursor-pointer'>
                  <img src='/social/icons8-linkedin.svg' className='self-center size-4 mr-2' />
                  <p>Linkedin</p>
                </span>
              </span>
            </div>
            <div className=' col-span-1'>
              <h3 className='mb-6 text-xs font-bold uppercase'>Tải ứng dụng Shopee ngay</h3>
              <div className='flex gap-2'>
                <img src='/download/qr_code.png' className='col-span-1 drop-shadow-md' />
                <div className='columns-1 grid grid-rows-3 gap-1'>
                  <img src='/download/app_store.png' className='drop-shadow-md bg-white py-1 px-2 rounded-sm' />
                  <img src='/download/google_play.png ' className='drop-shadow-md bg-white py-1 px-2 rounded-sm' />
                  <img src='/download/app_gallery.png' className='drop-shadow-md bg-white py-1 px-2 rounded-sm' />
                </div>
              </div>
            </div>
          </div>
          <hr />
          <div className='mt-10 lg:flex justify-between text-sm text-neutral-500 text-center '>
            <div>
              <span>© 2024 Shopee. Tất cả các quyền được bảo lưu.</span>
            </div>
            <div>
              <span>
                Quốc gia & Khu vực: Singapore | Indonesia | Thái Lan | Malaysia | Việt Nam | Philippines | Brazil |
                México | Colombia | Chile | Đài Loan
              </span>
            </div>
          </div>
          <div className=''>
            <div className='w-full leading-tight mt-20 px-20 flex justify-center text-neutral-500 uppercase divide-x text-xs text-center'>
              <span className='px-10'>Chính sách bảo mật</span>
              <span className='px-10'>Quy chế hoạt động </span>
              <span className='px-10'>Chính sách vận chuyển</span>
              <span className='px-10'>CHÍNH SÁCH TRẢ HÀNG VÀ HOÀN TIỀN</span>
            </div>
            <div className='text-center mt-10 text-xs leading-7 text-neutral-700'>
              <p>
                Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình,
                Thành phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
              </p>
              <p>Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Bùi Anh Tuấn</p>
              <p>Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015</p>
              <p>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
