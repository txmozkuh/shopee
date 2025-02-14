export const purchaseStatus = {
  inCart: { value: -1, name: 'Trong giỏ hàng' },
  all: { value: 0, name: 'Tất cả' },
  waitForConfirmation: { value: 1, name: 'Chờ xác nhận' },
  waitForGetting: { value: 2, name: 'Chờ lấy hàng' },
  inProgessing: { value: 3, name: 'Đang vận chuyển' },
  delivered: { value: 4, name: 'Đã được giao' },
  cancel: { value: 5, name: 'Bị hủy' }
} as const
