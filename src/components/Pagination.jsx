import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../store/slices/productSlice";

const Pagination = () => {
  const dispatch = useDispatch();
  const { currentPage, totalPages } = useSelector((state) => state.products);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
  };

  return (
    <div className="flex justify-center my-4">
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index}
          className={`px-4 py-2 mx-1 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
