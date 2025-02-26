import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import { Suspense, lazy, useContext } from 'react'
import { AppContext } from './contexts/app.context'
import { path } from './constants/path'

const Login = lazy(() => import('@pages/Login'))
const Register = lazy(() => import('@pages/Register'))
const ProductList = lazy(() => import('@pages/ProductList'))
const RegisterLayout = lazy(() => import('@layouts/RegisterLayout'))
const MainLayout = lazy(() => import('@layouts/MainLayout'))
const User = lazy(() => import('@pages/User'))
const ProductDetail = lazy(() => import('@pages/ProductDetail'))
const Cart = lazy(() => import('@pages/Cart'))
const Profile = lazy(() => import('@pages/User/Profile'))
const PasswordChange = lazy(() => import('@pages/User/PasswordChange'))
const NotFound404 = lazy(() => import('@/pages/NotFound404'))
const PurchaseManagement = lazy(() => import('@pages/User/PurchaseManagement'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? (
    <Suspense>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to='/login' />
  )
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? (
    <Suspense>
      <Outlet />
    </Suspense>
  ) : (
    <Navigate to='/' />
  )
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: '*',
      element: (
        <MainLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <NotFound404 />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.home,
      element: (
        <MainLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <ProductList />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <ProductDetail />
          </Suspense>
        </MainLayout>
      )
    },
    {
      path: '',
      element: (
        <MainLayout>
          <ProtectedRoute />
        </MainLayout>
      ),
      children: [
        {
          path: path.user,
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <User>
                <Outlet />
              </User>
            </Suspense>
          ),

          children: [
            { index: true, element: <Navigate to={path.profile} /> },

            {
              path: path.profile,
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <Profile />
                </Suspense>
              )
            },
            {
              path: path.change_password,
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <PasswordChange />
                </Suspense>
              )
            },
            {
              path: path.purchase,
              element: (
                <Suspense fallback={<div>Loading...</div>}>
                  <PurchaseManagement />
                </Suspense>
              )
            }
          ]
        },
        {
          path: path.cart,
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          )
        },
        {
          path: path.cart_with_id,
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <Cart />
            </Suspense>
          )
        }
      ]
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <Login />
              </Suspense>
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Suspense fallback={<div>Loading...</div>}>
                <Register />
              </Suspense>
            </RegisterLayout>
          )
        }
      ]
    }
  ])
  return routeElements
}
