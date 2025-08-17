function getPageNumbers(page, totalPages, delta = 2) {
  const range = [];
  for (
    let i = Math.max(1, page - delta);
    i <= Math.min(totalPages, page + delta);
    i++
  ) {
    range.push(i);
  }
  return range;
}

function handlePreviousPage(page, onPageChange) {
  if (page > 1) {
    onPageChange(page - 1);
  }
}

function handleNextPage(page, totalPages, onPageChange) {
  if (page < totalPages) {
    onPageChange(page + 1);
  }
}

export default function Pagination({ page, totalPages, onPageChange }) {
  const pageNumbers = getPageNumbers(page, totalPages);

  return (
    <div className="flex items-center justify-around gap-2 mt-6">
      <span className="text-gray-500 text-md font-semibold">
        Page {page} of {totalPages}
      </span>
      <div className="">
        {/* Prev (hidden if page === 1) */}
        {page > 1 && (
          <button
            onClick={() => handlePreviousPage(page, onPageChange)}
            className="text-blue-600"
          >
            PREVIOUS
          </button>
        )}

        {/* Page numbers */}
        {pageNumbers.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-1 rounded-full ${
              p === page ? 'bg-blue-600 text-white' : 'hover:bg-gray-200'
            }`}
          >
            {p}
          </button>
        ))}

        {/* Right ellipsis */}
        {page < totalPages - 2 && (
          <>
            <span>...</span>
            <button
              onClick={() => onPageChange(totalPages)}
              className="px-3 py-1 rounded"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* Next (hidden if page === totalPages) */}
        {page < totalPages && (
          <button
            onClick={() => handleNextPage(page, totalPages, onPageChange)}
            className="text-blue-600"
          >
            NEXT
          </button>
        )}
      </div>
    </div>
  );
}
