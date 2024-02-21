import Link from 'next/link'

interface PaginationBarProps {
  currentPage: number
  totalPages: number
}

export default function PaginationComponent({
  currentPage,
  totalPages,
}: PaginationBarProps) {
  const maxPage = Math.min(totalPages, currentPage + 4)
  const minPage = Math.max(1, Math.min(currentPage - 5, maxPage - 9))
  const numberedPageItems: JSX.Element = []

  for (let page = minPage; page <= maxPage; page++) {
    numberedPageItems.push(
      <Link
        href={'?page=' + page}
        key={page}
        className={`join-item btn ${page === currentPage ? 'btn-active' : ''}`}
      >
        {page}
      </Link>
    )
  }

  return (
    <>
      <div className="join hidden sm:block">{numberedPageItems}</div>

      <div className="join block sm:hidden">
        {currentPage > 1 && (
          <Link href={'?page=' + (currentPage - 1)} className="btn join-item">
            «
          </Link>
        )}
        <button className="join-item btn pointer-events-none">
          {currentPage}
        </button>
        {currentPage < totalPages && (
          <Link href={'?page=' + (currentPage + 1)} className="join-item btn">
            »
          </Link>
        )}
      </div>
    </>
  )
}
