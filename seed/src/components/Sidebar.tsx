import { FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useState } from 'react';
import useFilters from '@/hooks/useFilters';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    filterOptions,
    activeFilters,
    updateFilters,
    isLoading
  } = useFilters();

  const toggleFilter = async (filterType: keyof typeof activeFilters, value: any) => {
    const currentValues = activeFilters[filterType] || [];
    let newValues: any[];

    if (Array.isArray(currentValues)) {
      newValues = currentValues.includes(value)
        ? currentValues.filter(v => v !== value)
        : [...currentValues, value];
    } else {
      newValues = currentValues === value ? null : value;
    }

    await updateFilters({
      ...activeFilters,
      [filterType]: newValues.length > 0 ? newValues : undefined
    });
  };

  const clearFilters = async () => {
    await updateFilters({});
  };

  return (
    <div className="relative">
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
        className={`${isOpen ? 'block' : 'hidden'} md:block fixed md:static inset-0 z-40 md:z-auto bg-white md:bg-transparent p-4 md:p-0 overflow-y-auto`}
      >
        {/* Mobile header */}
        <div className="flex justify-between items-center mb-4 md:hidden">
          <h2 className="text-xl font-bold">Filtros</h2>
          <button onClick={() => setIsOpen(false)} className="p-2">
            <FiX size={24} />
          </button>
        </div>

        {/* Filter sections */}
        <div className="space-y-6">
          <SortSection 
            activeSort={activeFilters.sort}
            onSortChange={(value) => toggleFilter('sort', value)}
            disabled={isLoading}
          />

          <FilterSection 
            title="Categorías"
            items={filterOptions.categories}
            activeItems={activeFilters.category || []}
            onToggle={(item) => toggleFilter('category', item)}
            disabled={isLoading}
          />

          <FilterSection 
            title="Género"
            items={filterOptions.genders}
            activeItems={activeFilters.gender || []}
            onToggle={(item) => toggleFilter('gender', item)}
            disabled={isLoading}
          />

          <FilterSection 
            title="Tallas"
            items={filterOptions.sizes}
            activeItems={activeFilters.size || []}
            onToggle={(item) => toggleFilter('size', item)}
            disabled={isLoading}
          />

          <RatingFilter 
            activeRating={activeFilters.minRating}
            onRatingChange={(value) => toggleFilter('minRating', value)}
            disabled={isLoading}
          />

          <button
            onClick={clearFilters}
            disabled={isLoading}
            className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium disabled:opacity-50"
          >
            {isLoading ? 'Limpiando...' : 'Limpiar filtros'}
          </button>
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

// Componentes auxiliares
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

const FilterSection = ({ title, items, activeItems, onToggle, disabled }: {
  title: string;
  items: string[];
  activeItems: string[];
  onToggle: (item: string) => void;
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
          {items.map(item => (
            <button
              key={item}
              onClick={() => onToggle(item)}
              disabled={disabled}
              className={`flex items-center w-full text-left px-3 py-2 rounded ${activeItems.includes(item) ? 'bg-gray-200' : 'hover:bg-gray-100'} disabled:opacity-50`}
            >
              <span className="flex-1">{item}</span>
              {activeItems.includes(item) && (
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
    <h3 className="font-semibold mb-2">Valoración</h3>
    <div className="space-y-2">
      {[4, 3, 2, 1].map(rating => (
        <button
          key={rating}
          onClick={() => onRatingChange(rating)}
          disabled={disabled}
          className={`flex items-center w-full text-left px-3 py-2 rounded ${activeRating === rating ? 'bg-gray-200' : 'hover:bg-gray-100'} disabled:opacity-50`}
        >
          {[...Array(5)].map((_, i) => (
            <span key={i} className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
          ))}
          <span className="ml-2 text-sm text-gray-600">y más</span>
        </button>
      ))}
    </div>
  </div>
);

export default Sidebar;