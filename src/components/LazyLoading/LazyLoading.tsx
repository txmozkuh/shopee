import { useEffect, useRef, useState } from 'react'

interface LazyLoadingProps<T> {
  data: T[]
  numbersPerLoad: number
  renderItem: (item: T, index: number) => JSX.Element
}

export default function LazyLoading<T>({ data, numbersPerLoad, renderItem }: LazyLoadingProps<T>) {
  const [visibleItems, setVisibleItems] = useState<T[]>(data.slice(0, numbersPerLoad))
  const [loading, setLoading] = useState<boolean>(false)
  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading) {
          setLoading(true)
          setTimeout(() => {
            setVisibleItems((prev) => {
              return data.slice(0, prev.length + numbersPerLoad)
            })
          }, 1000)
          setLoading(false)
        }
      },
      { threshold: 1 }
    )
    if (loadMoreRef.current) observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [loading, data, numbersPerLoad])
  return (
    <>
      <div className=''>{visibleItems.map((item, index) => renderItem(item, index))}</div>

      {loading && <p className='text-center mt-4 text-red'>Loading more...</p>}
      <div ref={loadMoreRef} />
    </>
  )
}
