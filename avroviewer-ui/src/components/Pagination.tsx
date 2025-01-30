import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import { useTheme } from "../context/theme";

type Props = {
  itemsCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  isDark: boolean;
};

const Pagination = ({
  itemsCount,
  currentPage,
  pageSize,
  onPageChange,
  isDark,
}: Props) => {
  const totalPages = Math.ceil(itemsCount / pageSize);

  const { theme } = useTheme();

  const getPageNumbers = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | string)[] = [];

    if (currentPage <= 3) {
      pages.push(1, 2, 3, 4, "...", totalPages - 1, totalPages);
    } else if (currentPage >= totalPages - 2) {
      pages.push(
        1,
        2,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages
      );
    } else {
      pages.push(
        1,
        2,
        "...",
        currentPage - 1,
        currentPage,
        currentPage + 1,
        "...",
        totalPages - 1,
        totalPages
      );
    }

    return pages;
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex items-center justify-between px-4 py-3 sm:px-6">
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-700"}`}
          >
            Showing{" "}
            <span className="font-medium">
              {Math.min((currentPage - 1) * pageSize + 1, itemsCount)}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(currentPage * pageSize, itemsCount)}
            </span>{" "}
            of <span className="font-medium">{itemsCount}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px"
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              className={`relative inline-flex items-center rounded px-2 py-2 ${
                isDark
                  ? "text-gray-300 hover:bg-gray-700 disabled:text-gray-500"
                  : "text-gray-800 hover:bg-gray-50 disabled:text-gray-300"
              }  focus:outline-offset-0 disabled:cursor-not-allowed disabled:hover:bg-transparent`}
              disabled={currentPage === 1}
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="size-5" />
            </button>
            {pageNumbers.map((page, index) =>
              typeof page === "number" ? (
                <button
                  key={index}
                  onClick={() => handlePageChange(page)}
                  className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-semibold ${
                    page === currentPage
                      ? `${theme.selectedBg} ${theme.selectedText} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`
                      : `${
                          isDark
                            ? "text-gray-300 hover:bg-gray-700"
                            : "text-gray-800 hover:bg-gray-50"
                        } focus:outline-offset-0`
                  }`}
                >
                  {page}
                </button>
              ) : (
                <span
                  key={index}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-300 focus:outline-offset-0"
                >
                  ...
                </span>
              )
            )}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              className={`relative inline-flex items-center rounded px-2 py-2 ${
                isDark
                  ? "text-gray-300 hover:bg-gray-700 disabled:text-gray-500"
                  : "text-gray-800 hover:bg-gray-50 disabled:text-gray-300"
              } focus:z-20 focus:outline-offset-0 disabled:cursor-not-allowed disabled:hover:bg-transparent`}
              disabled={currentPage === totalPages}
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="size-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
