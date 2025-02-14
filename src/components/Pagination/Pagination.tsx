interface PropsPagination {
  page: number
  setPage: React.Dispatch<React.SetStateAction<number>>
  pageSize: number
}

const RANGE = 2

export default function Pagination({ page, setPage, pageSize }: PropsPagination) {
  const renderPagination = () => {
    let dotBefore = false
    let dotAfter = false

    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <button className={`mx-1 ${page == index + 1 && 'font-semibold '}`} key={index}>
            ...
          </button>
        )
      }
      return null
    }
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <button className={`mx-1 ${page == index + 1 && 'font-semibold '}`} key={index}>
            ...
          </button>
        )
      }
      return null
    }

    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const page_number = index + 1
        if (page <= RANGE * 2 + 1 && page_number > page + RANGE && page_number < pageSize - RANGE + 1) {
          return renderDotBefore(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (page_number < page - RANGE && page_number > RANGE) {
            return renderDotBefore(index)
          } else if (page_number > page + RANGE && page_number < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE * 2 && page_number > RANGE && page_number < page - RANGE) {
          return renderDotBefore(index)
        }
        return (
          <button
            className={`px-2 py-1 border rounded-sm mx-1 ${page == index + 1 && 'font-semibold text-orange-500 bg-slate-100'}`}
            key={index}
            onClick={() => setPage(page_number)}
          >
            {page_number}
          </button>
        )
      })
  }
  return (
    <div className='w-2/3 m-auto my-4 flex justify-between items-center '>
      <button className='px-2 py-1 mx-2 text-white bg-orange-500 rounded-sm' onClick={() => setPage(page - 1)}>
        Prev
      </button>
      {renderPagination()}
      <button className='px-2 py-1 mx-2 text-white bg-orange-500 rounded-sm' onClick={() => setPage(page + 1)}>
        Next
      </button>
    </div>
  )
}
