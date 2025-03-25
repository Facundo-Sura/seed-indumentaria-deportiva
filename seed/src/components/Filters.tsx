import { useState } from 'react';

type SortOption = 
  | 'price-asc'
  | 'price-desc'
  | 'rating-asc'
  | 'rating-desc'
  | 'name-asc'
  | 'name-desc';

interface SortDropdownProps {
  onSortChange: (sortOption: SortOption) => void;
  currentSort?: SortOption;
}

const SortDropdown: React.FC<SortDropdownProps> = ({ onSortChange, currentSort = 'price-asc' }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'price-asc', label: 'Precio: menor a mayor' },
    { value: 'price-desc', label: 'Precio: mayor a menor' },
    { value: 'rating-desc', label: 'Mejor puntuados' },
    { value: 'rating-asc', label: 'Peor puntuados' },
    { value: 'name-asc', label: 'Nombre: A-Z' },
    { value: 'name-desc', label: 'Nombre: Z-A' },
  ];

  const selectedOptionLabel = sortOptions.find(opt => opt.value === currentSort)?.label || 'Ordenar por';

  const handleOptionClick = (option: SortOption) => {
    onSortChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full sm:w-64">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span>{selectedOptionLabel}</span>
        <svg
          className={`w-5 h-5 ml-2 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg">
          <ul
            className="py-1 overflow-auto text-base rounded-md max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            role="listbox"
          >
            {sortOptions.map((option) => (
              <li
                key={option.value}
                onClick={() => handleOptionClick(option.value as SortOption)}
                className={`px-4 py-2 cursor-pointer hover:bg-indigo-100 ${currentSort === option.value ? 'bg-indigo-50 text-indigo-700' : 'text-gray-900'}`}
                role="option"
                aria-selected={currentSort === option.value}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SortDropdown;