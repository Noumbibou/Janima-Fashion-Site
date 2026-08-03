import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <nav className="pagination" aria-label="Pagination">
      {currentPage > 1 ? (
        <Link className="pagination-link" href={`${basePath}?page=${prevPage}`}>
          Précédent
        </Link>
      ) : (
        <span className="pagination-disabled">Précédent</span>
      )}

      {Array.from({ length: totalPages }, (_, index) => {
        const pageNumber = index + 1;
        return pageNumber === currentPage ? (
          <span key={pageNumber} className="pagination-current">
            {pageNumber}
          </span>
        ) : (
          <Link key={pageNumber} className="pagination-link" href={`${basePath}?page=${pageNumber}`}>
            {pageNumber}
          </Link>
        );
      })}

      {currentPage < totalPages ? (
        <Link className="pagination-link" href={`${basePath}?page=${nextPage}`}>
          Suivant
        </Link>
      ) : (
        <span className="pagination-disabled">Suivant</span>
      )}
    </nav>
  );
}
