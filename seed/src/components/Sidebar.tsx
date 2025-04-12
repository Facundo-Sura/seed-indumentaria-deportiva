import { FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import useFilters from '../hooks/useFilters';

// Definimos primero los componentes auxiliares
const SortSection = ({ activeSort, onSortChange, disabled }: {
  activeSort: string | undefined;
  onSortChange: (value: 'price-asc' | 'price-desc') => void;
  disabled: boolean;
}) => (
  <div>
    <h3 className="font-semibold mb-2">Ordenar por</h3>
    <div className="space-y-2">
      <button
        onClick={() => onSortChange('price-asc')}
        disabled={disabled}
        className={`block w-full text-left px-3 py-2 rounded ${activeSort === 'price-asc' ? 'bg-gray-200' : 'hover:bg-gray-100'} disabled:opacity-50`}
      >
        Precio: Menor a mayor
      </button>
      <button
        onClick={() => onSortChange('price-desc')}
        disabled={disabled}
        className={`block w-full text-left px-3 py-2 rounded ${activeSort === 'price-desc' ? 'bg-gray-200' : 'hover:bg-gray-100'} disabled:opacity-50`}
      >
        Precio: Mayor a menor
      </button>
    </div>
  </div>
);

const FilterSection = ({ title, items, activeItem, onSelect, disabled }: {
  title: string;
  items: string[];
  activeItem: string | undefined;
  onSelect: (item: string) => void;
  disabled: boolean;
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div>
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center justify-between w-full font-semibold mb-2"
        disabled={disabled}
      >
        <span>{title}</span>
        {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
      </button>
      
      {isExpanded && (
        <div className="space-y-2">
          {items.map((item, index) => (
            <button
              key={`${title}-${item}-${index}`}
              onClick={() => onSelect(item)}
              disabled={disabled}
              className={`flex items-center w-full text-left px-3 py-2 rounded ${activeItem === item ? 'bg-gray-200' : 'hover:bg-gray-100'} disabled:opacity-50`}
            >
              <span className="flex-1">{item}</span>
              {activeItem === item && (
                <span className="text-gray-500">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

const RatingFilter = ({ activeRating, onRatingChange, disabled }: {
  activeRating: number | undefined;
  onRatingChange: (value: number) => void;
  disabled: boolean;
}) => (
  <div>
    <h3 className="font-semibold mb-2">Valoración mínima</h3>
    <div className="space-y-2">
      {[4, 3, 2, 1].map(rating => (
        <button
          key={`rating-${rating}`}
          onClick={() => onRatingChange(rating)}
          disabled={disabled}
          className={`flex items-center w-full text-left px-3 py-2 rounded ${activeRating === rating ? 'bg-gray-200' : 'hover:bg-gray-100'} disabled:opacity-50`}
        >
          {[...Array(5)].map((_, i) => (
            <span key={`star-${rating}-${i}`} className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
          ))}
          <span className="ml-2 text-sm text-gray-600">y más</span>
        </button>
      ))}
    </div>
  </div>
);

// Componente principal Sidebar
interface SidebarProps {
  initialProducts: any[];
  onProductsFiltered: (products: any[]) => void;
}

const Sidebar = ({ initialProducts, onProductsFiltered }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    filterOptions,
    activeFilters,
    updateFilters,
    isLoading,
    products
  } = useFilters(initialProducts);

  // Notificar cuando los productos cambien
  useEffect(() => {
    onProductsFiltered(products);
  }, [products, onProductsFiltered]);

  const toggleFilter = async (filterType: keyof typeof activeFilters, value: string) => {
    const newValue = activeFilters[filterType] === value ? undefined : value;
    await updateFilters({
      ...activeFilters,
      [filterType]: newValue
    });
  };

  const clearFilters = async () => {
    await updateFilters({});
  };

  return (
    <div className="relative h-full">
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg mb-4"
        disabled={isLoading}
      >
        <FiFilter /> {isLoading ? 'Cargando...' : 'Filtros'}
      </button>

      {/* Sidebar content */}
      <div
        className={`${isOpen ? 'block' : 'hidden'} md:block fixed md:relative inset-0 z-40 md:z-auto bg-white md:bg-transparent p-4 md:p-0 h-full`}
      >
        {/* Mobile header */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h2 className="text-xl font-bold">Filtros</h2>
          <button onClick={() => setIsOpen(false)} className="p-2">
            <FiX size={24} />
          </button>
        </div>

        {/* Container con scroll */}
        <div className="h-full flex flex-col">
          {/* Filtros con scroll */}
          <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
            <div className="space-y-6 pb-4">
              <SortSection 
                activeSort={activeFilters.sort}
                onSortChange={(value) => updateFilters({
                  ...activeFilters,
                  sort: value
                })}
                disabled={isLoading}
              />

              {filterOptions.categories && filterOptions.categories.length > 0 && (
                <FilterSection 
                  title="Categorías"
                  items={filterOptions.categories}
                  activeItem={activeFilters.category}
                  onSelect={(item) => toggleFilter('category', item)}
                  disabled={isLoading}
                />
              )}

              {filterOptions.genders && filterOptions.genders.length > 0 && (
                <FilterSection 
                  title="Género"
                  items={filterOptions.genders}
                  activeItem={activeFilters.gender}
                  onSelect={(item) => toggleFilter('gender', item)}
                  disabled={isLoading}
                />
              )}

              {filterOptions.sizes && filterOptions.sizes.length > 0 && (
                <FilterSection 
                  title="Tallas"
                  items={filterOptions.sizes}
                  activeItem={activeFilters.size}
                  onSelect={(item) => toggleFilter('size', item)}
                  disabled={isLoading}
                />
              )}

              {filterOptions.colors && filterOptions.colors.length > 0 && (
                <FilterSection 
                  title="Colores"
                  items={filterOptions.colors}
                  activeItem={activeFilters.color}
                  onSelect={(item) => toggleFilter('color', item)}
                  disabled={isLoading}
                />
              )}

              <RatingFilter 
                activeRating={activeFilters.minRating}
                onRatingChange={(value) => updateFilters({
                  ...activeFilters,
                  minRating: value
                })}
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Botón limpiar (fijo en la parte inferior) */}
          <div className="pt-4 border-t border-gray-200">
            <button
              onClick={clearFilters}
              disabled={isLoading}
              className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium disabled:opacity-50"
            >
              {isLoading ? 'Limpiando...' : 'Limpiar filtros'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div 
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        />
      )}
    </div>
  );
};

export default Sidebar;