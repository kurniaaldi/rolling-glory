"use client";
import React from "react";

interface Meta {
  totalItems: number;
  currentPage: number;
  itemPerPage: number;
  totalPages: number;
}

interface IPropsPagination {
  meta: Meta;
  currentPage: number;
  handlePageChange: (page: number) => void;
}

function Pagination({ meta, currentPage, handlePageChange }: IPropsPagination) {
  return (
    <div className="col-span-12 flex justify-center mt-8 relative z-30">
      <div className="flex items-center gap-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded border text-sm text-gray-600 disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(meta.totalPages)].map((_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded border text-sm ${
                page === currentPage
                  ? "bg-gray-800 text-white"
                  : "text-gray-600 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === meta.totalPages}
          className="px-3 py-1 rounded border text-sm text-gray-600 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
