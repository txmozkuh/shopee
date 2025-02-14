export const path = {
  home: '/',
  login: '/login',
  register: '/register',
  user: '/user',
  logout: '/logout',
  profile: '/user/profile',
  purchase: '/user/purchase',
  change_password: '/user/password',
  cart_with_id: '/cart/:product_id',
  cart: '/cart',
  productDetail: ':nameId'
} as const
