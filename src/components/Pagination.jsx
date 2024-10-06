import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../store/slices/productSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage, totalPages } = useSelector((state) => state.products);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  const renderPagination = () => {
    const paginationItems = [];
    const maxPagesToShow = 5;

    paginationItems.push(
      <button
        key={1}
        className={`px-3 py-1 rounded-lg mx-1 hover:text-primary ${
          currentPage === 1
            ? "bg-white text-primary shadow-md"
            : "text-gray-500"
        }`}
        onClick={() => handlePageChange(1)}
      >
        1
      </button>,
    );

    if (currentPage > maxPagesToShow) {
      paginationItems.push(
        <span key="dots1" className="px-2 text-gray-400">
          ...
        </span>,
      );
    }

    for (
      let i = Math.max(2, currentPage - 1);
      i <= Math.min(totalPages - 1, currentPage + 1);
      i++
    ) {
      paginationItems.push(
        <button
          key={i}
          className={`px-3 py-1 rounded-lg mx-1 hover:text-primary ${
            currentPage === i
              ? "bg-white text-primary shadow-md"
              : "text-gray-500"
          }`}
          onClick={() => handlePageChange(i)}
        >
          {i}
        </button>,
      );
    }

    if (currentPage < totalPages - maxPagesToShow) {
      paginationItems.push(
        <span key="dots2" className="px-2 text-gray-400">
          ...
        </span>,
      );
    }

    paginationItems.push(
      <button
        key={totalPages}
        className={`px-3 py-1 rounded-lg mx-1 hover:text-primary ${
          currentPage === totalPages
            ? "bg-white text-primary shadow-md"
            : "text-gray-500"
        }`}
        onClick={() => handlePageChange(totalPages)}
      >
        {totalPages}
      </button>,
    );

    return paginationItems;
  };

  return (
    <div className="flex justify-center items-center space-x-2 my-4">
      <button
        className={`px-3 py-1 rounded-lg disabled:pointer-events-none ${
          currentPage === 1 ? "text-gray-400" : "text-gray-500"
        }`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1"
          stroke="currentColor"
          className="w-5 h-5 hover:stroke-purple-400 "
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {renderPagination()}

      <button
        className={`px-3 py-1 rounded-lg disabled:pointer-events-none ${
          currentPage === totalPages ? "text-gray-400" : "text-gray-500"
        }`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1"
          stroke="currentColor"
          className="w-5 h-5 hover:stroke-purple-400"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;
