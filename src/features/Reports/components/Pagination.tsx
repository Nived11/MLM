interface PaginationProps {
  currentPage: number;
  totalCount: number;
  rowsPerPage: number;
  next: string | null;
  previous: string | null;
  onPageChange: (page: number, type?: "first" | "last" | "next" | "prev", url?: string) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalCount,
  rowsPerPage,
  next,
  previous,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalCount / rowsPerPage);
  const start = (currentPage - 1) * rowsPerPage + 1;
  const end = Math.min(currentPage * rowsPerPage, totalCount);

  return (
    <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center mt-6 text-sm text-gray-400 gap-3">
      <span className="text-xs sm:text-sm">
        Showing {totalCount === 0 ? 0 : start} to {end} of {totalCount} entries
      </span>

      <div className="flex gap-4 sm:gap-6">
        <button
          disabled={currentPage === 1}
          onClick={() => onPageChange(1, "first")}
          className="hover:text-white text-sm disabled:opacity-50"
        >
          First
        </button>

        <button
          disabled={!previous}
          onClick={() => onPageChange(currentPage - 1, "prev", previous || undefined)}
          className="hover:text-white text-sm disabled:opacity-50"
        >
          Previous
        </button>

        <button
          disabled={!next}
          onClick={() => onPageChange(currentPage + 1, "next", next || undefined)}
          className="hover:text-white text-sm disabled:opacity-50"
        >
          Next
        </button>

        <button
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => onPageChange(totalPages, "last")}
          className="hover:text-white text-sm disabled:opacity-50"
        >
          Last
        </button>
      </div>
    </div>
  );
};
export default Pagination;