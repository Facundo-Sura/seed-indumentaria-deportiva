// src/components/Pagination.tsx
import React from 'react';
import { FaAngleDoubleLeft, FaAngleLeft, FaAngleRight, FaAngleDoubleRight } from 'react-icons/fa';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  // Función para ir a la primera página
  const goToFirstPage = () => {
    onPageChange(1);
  };

  // Función para ir a la página anterior
  const goToPreviousPage = () => {
    onPageChange(currentPage - 1);
  };

  // Función para ir a la página siguiente
  const goToNextPage = () => {
    onPageChange(currentPage + 1);
  };

  // Función para ir a la última página
  const goToLastPage = () => {
    onPageChange(totalPages);
  };

  return (
    <div className="flex justify-center items-center space-x-2 my-4">
      {/* Botón para ir a la primera página */}
      <button
        onClick={goToFirstPage}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
        aria-label="Ir a la primera página"
      >
        <FaAngleDoubleLeft />
      </button>

      {/* Botón para ir a la página anterior */}
      <button
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg ${
          currentPage === 1
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-blue-500 text-white hover:bg-blue-600'
        }`}
        aria-label="Ir a la página anterior"
      >
        <FaAngleLeft />
      </button>

      {/* Números de página */}
      {Array.from({ length: totalPages }, (_, index) => (
        <button
          key={index + 1}
          onClick={() => onPageChange(index + 1)}
          disabled={currentPage === index + 1}
          className={`px-3 py-2 rounded-lg ${
            currentPage === index + 1
              ? 'bg-black text-white'
              : 'bg-white text-black hover:bg-slate-100'
          }`}
          aria-label={`Ir a la página ${index + 1}`}
        >
          {index + 1}
        </button>
      ))}

      {/* Botón para ir a la página siguiente */}
      <button
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-black text-white hover:bg-slate-600'
        }`}
        aria-label="Ir a la página siguiente"
      >
        <FaAngleRight />
      </button>

      {/* Botón para ir a la última página */}
      <button
        onClick={goToLastPage}
        disabled={currentPage === totalPages}
        className={`p-2 rounded-lg ${
          currentPage === totalPages
            ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
            : 'bg-black text-white hover:bg-slate-600'
        }`}
        aria-label="Ir a la última página"
      >
        <FaAngleDoubleRight />
      </button>
    </div>
  );
};

export default Pagination;