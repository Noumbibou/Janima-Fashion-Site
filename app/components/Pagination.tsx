import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  pageParam?: string;
  extraParams?: Record<string, string>;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  pageParam = "page",
  extraParams,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const hrefFor = (pageNumber: number) => {
    const params = new URLSearchParams(extraParams);
    params.set(pageParam, String(pageNumber));
    return `${basePath}?${params.toString()}`;
  };

  return (
    <nav className="pagination" aria-label="Pagination">
      {currentPage > 1 ? (
        <Link className="pagination-link" href={hrefFor(prevPage)} scroll={false}>
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
          <Link key={pageNumber} className="pagination-link" href={hrefFor(pageNumber)} scroll={false}>
            {pageNumber}
          </Link>
        );
      })}

      {currentPage < totalPages ? (
        <Link className="pagination-link" href={hrefFor(nextPage)} scroll={false}>
          Suivant
        </Link>
      ) : (
        <span className="pagination-disabled">Suivant</span>
      )}
    </nav>
  );
}
