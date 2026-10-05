interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

type PageItem = number | "ellipsis-start" | "ellipsis-end";

const getPageItems = (current: number, total: number): PageItem[] => {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const items: PageItem[] = [1];
  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  if (start > 2) items.push("ellipsis-start");
  for (let page = start; page <= end; page++) items.push(page);
  if (end < total - 1) items.push("ellipsis-end");

  items.push(total);
  return items;
};

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹ Prev
      </button>

      {getPageItems(currentPage, totalPages).map((item) =>
        typeof item === "string" ? (
          <span key={item} className="pagination-ellipsis">
            …
          </span>
        ) : (
          <button
            key={item}
            className={item === currentPage ? "page-btn active" : "page-btn"}
            aria-current={item === currentPage ? "page" : undefined}
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        ),
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next ›
      </button>
    </nav>
  );
};

export default Pagination;
