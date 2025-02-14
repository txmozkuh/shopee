/* eslint-disable react-refresh/only-export-components */
import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import Login from '@pages/Login'
import ProductList from '@pages/ProductList'
import Register from '@pages/Register'
import RegisterLayout from '@layouts/RegisterLayout'
import MainLayout from '@layouts/MainLayout'
import User from '@pages/User'

import { Suspense, lazy, useContext } from 'react'
import { AppContext } from './contexts/app.context'
import { path } from './constants/path'
import ProductDetail from '@pages/ProductDetail'
import Cart from '@pages/Cart'
import Profile from '@pages/User/Profile'
import PasswordChange from '@pages/User/PasswordChange'
const PurchaseManagement = lazy(() => import('@pages/User/PurchaseManagement'))

function ProtectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return isAuthenticated ? <Outlet /> : <Navigate to='/login' />
}

function RejectedRoute() {
  const { isAuthenticated } = useContext(AppContext)
  return !isAuthenticated ? <Outlet /> : <Navigate to='/' />
}

export default function useRouteElements() {
  const routeElements = useRoutes([
    {
      path: path.home,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      )
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
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
            <User>
              <Outlet />
            </User>
          ),

          children: [
            { index: true, element: <Navigate to={path.profile} /> },

            {
              path: path.profile,
              element: <Profile />
            },
            {
              path: path.change_password,
              element: <PasswordChange />
            },
            {
              path: path.purchase,
              element: (
                <Suspense>
                  <PurchaseManagement />
                </Suspense>
              )
            }
          ]
        },
        {
          path: path.cart,
          element: <Cart />
        },
        {
          path: path.cart_with_id,
          element: <Cart />
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
              <Login />
            </RegisterLayout>
          )
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          )
        }
      ]
    }
  ])
  return routeElements
}
