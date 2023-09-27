import { PAGE_SIZE } from '../../utils/constant';
import { IPaginationProps } from '../../utils/types';

const Pagination: React.FC<IPaginationProps> = ({
  total,
  totalPages,
  page,
  currentNumberOfResults,
  setPage,
}) => {

  // GOAL: showing k to n of m result
  // I assumed a fixed number of results sent back by the server which is PAGE_SIZE.
  // If currentResults is less than PAGE_SIZE then that's the last result n = total results
  const n = currentNumberOfResults === PAGE_SIZE ? page * currentNumberOfResults : total;
  const k = n - currentNumberOfResults + 1;

  return (
    <>
      <nav
        className="w-full flex items-center justify-between border-t border-gray-200  px-4 py-3 sm:px-6"
        aria-label="Pagination"
      >
        <div className="hidden sm:block">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{k}</span> to{' '}
            <span className="font-medium">{n}</span> of <span className="font-medium">{total}</span>{' '}
            results
          </p>
        </div>
        <div className="flex flex-1 justify-between sm:justify-end">
          <button
            disabled={page <= 1}
            onClick={() => setPage(page - 1)}
            className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          >
            Previous
          </button>
          <button
            disabled={page >= totalPages}
            onClick={() => setPage(page + 1)}
            className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
          >
            Next
          </button>
        </div>
      </nav>
    </>
  );
};

export default Pagination;
