import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useStateContext } from "../contexts/ContextProvider";

const Pagination = () => {
  const { totalPages, currentPage, setCurrentPage } = useStateContext();

  const defaultCss =
    "text-gray-900 ring-1 ring-inset ring-gray-300 focus:outline-offset-0";
  const currentPageCss =
    "z-10 bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";

  const genCss =
    "relative inline-flex items-center px-4 py-2 text-sm font-semibold focus:z-20 hover:bg-cyan-500";

  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  const goToPage = (page) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="flex items-center justify-between px-4 pt-3">
      <div>
        <p className="text-sm text-gray-700">
          Pagina <span className="font-medium">{currentPage}</span> din
          <span className="font-medium"> {totalPages}</span>
        </p>
      </div>

      {/** Paginare */}
      <div>
        <nav
          className="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            type="button"
            onClick={goToPreviousPage}
            className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <BsChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          {/* Current: "", 
              Default: "" */}
          {pageNumbers.map((page) => (
            <button
              type="button"
              key={page}
              onClick={() => goToPage(page)}
              className={`${genCss} ${
                page === currentPage ? currentPageCss : defaultCss
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={goToNextPage}
            className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
          >
            <BsChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </nav>
      </div>
    </div>
  );
};
export default Pagination;
