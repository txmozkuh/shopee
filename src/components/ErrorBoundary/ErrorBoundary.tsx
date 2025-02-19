import React, { ReactNode, useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

interface ErrorBoundaryProps {
  children: ReactNode
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => {
  const [hasError, setHasError] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      setHasError(true)
    }

    window.addEventListener('error', errorHandler)
    return () => {
      window.removeEventListener('error', errorHandler)
    }
  }, [])

  useEffect(() => {
    if (hasError) {
      setHasError(false)
    }
  }, [location.pathname])

  if (hasError) {
    return (
      <div className='h-screen w-full flex flex-col items-center justify-center gap-4'>
        <h1 className='text-xl text-neutral-400 font-bold '>Something went wrong!</h1>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          stroke='#a3a3a3'
          fill='none'
          stroke-width='2'
          stroke-linecap='round'
          stroke-linejoin='round'
          className='lucide lucide-shield-alert size-44 '
        >
          <path d='M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z' />
          <path d='M12 8v4' />
          <path d='M12 16h.01' />
        </svg>
        <button className='px-8 py-4 bg-shopee text-white rounded-sm gap-4' onClick={() => navigate('/')}>
          Go to Home
        </button>
      </div>
    )
  }

  return <>{children}</>
}

export default ErrorBoundary
