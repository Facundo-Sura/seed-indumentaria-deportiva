import React from 'react';
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const goToFirstPage = () => onPageChange(1);
  const goToPreviousPage = () => onPageChange(currentPage - 1);
  const goToNextPage = () => onPageChange(currentPage + 1);
  const goToLastPage = () => onPageChange(totalPages);

  // Mostrar solo un subconjunto de páginas en móvil
  const getVisiblePages = () => {
    const visiblePages = [];
    const maxVisible = window.innerWidth < 768 ? 3 : 5;

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  };

  return (
    <div className="flex justify-center items-center flex-wrap gap-1 sm:gap-2 my-4">
      {/* Botón para ir a la primera página */}
      <button
        onClick={goToFirstPage}
        disabled={currentPage === 1}
        className={`p-1 sm:p-2 rounded-full text-xs sm:text-base hover:cursor-pointer ${currentPage === 1
            ? 'bg-black text-white cursor-not-allowed'
            : 'bg-gray-200 text-gray-400 hover:bg-slate-600'
          }`}
        aria-label="Ir a la primera página"
      >
        <FaAngleDoubleLeft />
      </button>

      {/* Botón para ir a la página anterior */}
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className={`p-1 sm:p-2 rounded-full text-xs sm:text-base hover:cursor-pointer ${currentPage === 1
            ? 'bg-black text-white cursor-not-allowed'
            : 'bg-gray-200 text-gray-400 hover:bg-slate-600'
          }`}
        aria-label="Ir a la página anterior"
      >
        <FaAngleLeft />
      </button>

      {/* Mostrar "..." si hay páginas anteriores no visibles */}
      {getVisiblePages()[0] > 1 && (
        <span className="px-2 py-1">...</span>
      )}

      {/* Números de página */}
      {getVisiblePages().map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          disabled={currentPage === page}
          className={`px-2 sm:px-3 py-1 sm:py-2 rounded-full text-xs sm:text-base hover:cursor-pointer ${currentPage === page
              ? 'bg-black text-white hover:bg-slate-600'
              : 'bg-white text-black border border-black hover:bg-slate-600 hover:text-white'
            }`}
          aria-label={`Ir a la página ${page}`}
        >
          {page}
        </button>
      ))}

      {/* Mostrar "..." si hay páginas posteriores no visibles */}
      {getVisiblePages()[getVisiblePages().length - 1] < totalPages && (
        <span className="px-2 py-1">...</span>
      )}

      {/* Botón para ir a la página siguiente */}
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={`p-1 sm:p-2 rounded-full text-xs sm:text-base hover:cursor-pointer ${currentPage === totalPages
            ? 'bg-black text-white cursor-not-allowed'
            : 'bg-gray-200 text-gray-400 hover:bg-slate-600'
          }`}
        aria-label="Ir a la página siguiente"
      >
        <FaAngleRight />
      </button>

      {/* Botón para ir a la última página */}
      <button
        onClick={goToLastPage}
        disabled={currentPage === totalPages}
        className={`p-1 sm:p-2 rounded-full text-xs sm:text-base hover:cursor-pointer ${currentPage === totalPages
            ? 'bg-black text-white cursor-not-allowed'
            : 'bg-gray-200 text-gray-400 hover:bg-slate-600'
          }`}
        aria-label="Ir a la última página"
      >
        <FaAngleDoubleRight />
      </button>
    </div>
  );
};

export default Pagination;