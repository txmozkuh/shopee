interface Props {
  rating: number
  color: string
  style: string
}
export default function RatingStar({ rating, color, style }: Props) {
  return (
    <div className='flex'>
      {Array(5)
        .fill(0)
        .map((_, index) => (
          <div key={index}>
            {index <= rating && (
              <div className='relative'>
                <div
                  style={{ width: rating - index >= 1 ? 100 : (rating - Math.floor(rating)) * 100 + '%' }}
                  className={`bg-red overflow-hidden absolute`}
                >
                  <svg
                    className={`${style}`}
                    aria-hidden='true'
                    key={index}
                    xmlns='http://www.w3.org/2000/svg'
                    fill={color}
                    viewBox='0 0 22 20'
                    clipPath='polygon'
                  >
                    <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
                  </svg>
                </div>
              </div>
            )}
            <svg
              className={`${style} text-neutral-400`}
              aria-hidden='true'
              key={index}
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 22 20'
            >
              <path d='M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z' />
            </svg>
          </div>
        ))}
    </div>
  )
}
