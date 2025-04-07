import { useState } from 'react';
import { FiFilter, FiX, FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface SidebarProps {
    onFilterChange: (filters: any) => void;
}

const Sidebar = ({ onFilterChange }: SidebarProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeFilters, setActiveFilters] = useState({
        category: [] as string[],
        gender: [] as string[],
        size: [] as string[],
        rating: null as number | null,
        sort: '' as string,
    });

    // Datos de ejemplo - reemplaza con tus datos reales
    const categories = ['Camisetas', 'Pantalones', 'Vestidos', 'Chaquetas', 'Zapatos'];
    const genders = ['Hombre', 'Mujer', 'Unisex'];
    const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
    const ratings = [4, 3, 2, 1];

    const toggleFilter = (filterType: keyof typeof activeFilters, value: any) => {
        let newFilters = { ...activeFilters };

        if (filterType === 'category' || filterType === 'gender' || filterType === 'size') {
            const currentValues = newFilters[filterType] as string[];
            newFilters[filterType] = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
        } else {
            if (filterType === 'rating' || filterType === 'sort') {
                if (filterType === 'rating') {
                    newFilters.rating = value === newFilters.rating ? null : value;
                } else if (filterType === 'sort') {
                    newFilters.sort = value === newFilters.sort ? '' : value;
                }
            }
        }

        setActiveFilters(newFilters);
        onFilterChange(newFilters);
    };

    const clearFilters = () => {
        const clearedFilters = {
            category: [],
            gender: [],
            size: [],
            rating: null,
            sort: '',
        };
        setActiveFilters(clearedFilters);
        onFilterChange(clearedFilters);
    };

    return (
        <div className="relative col-span-1">
            {/* Botón para móvil */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg mb-4"
            >
                <FiFilter /> Filtros
            </button>

            {/* Sidebar */}
            <div
                className={`${isOpen ? 'block' : 'hidden'} md:block fixed md:static inset-0 z-40 md:z-auto bg-white md:bg-transparent p-4 md:p-0 overflow-y-auto`}
            >
                {/* Encabezado móvil */}
                <div className="flex justify-between items-center mb-4 md:hidden">
                    <h2 className="text-xl font-bold">Filtros</h2>
                    <button onClick={() => setIsOpen(false)} className="p-2">
                        <FiX size={24} />
                    </button>
                </div>

                {/* Contenido del sidebar */}
                <div className="space-y-6">
                    <div>
                        <h3 className="font-semibold mb-2">Ordenar por</h3>
                        <div className="space-y-2">
                            <button
                                onClick={() => toggleFilter('sort', 'price-asc')}
                                className={`block w-full text-left px-3 py-2 rounded ${activeFilters.sort === 'price-asc' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                            >
                                Precio: Menor a mayor
                            </button>
                            <button
                                onClick={() => toggleFilter('sort', 'price-desc')}
                                className={`block w-full text-left px-3 py-2 rounded ${activeFilters.sort === 'price-desc' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                            >
                                Precio: Mayor a menor
                            </button>
                        </div>
                    </div>

                    <FilterSection
                        title="Categorías"
                        items={categories}
                        activeItems={activeFilters.category}
                        onToggle={(item) => toggleFilter('category', item)}
                    />

                    <FilterSection
                        title="Género"
                        items={genders}
                        activeItems={activeFilters.gender}
                        onToggle={(item) => toggleFilter('gender', item)}
                    />

                    <FilterSection
                        title="Tallas"
                        items={sizes}
                        activeItems={activeFilters.size}
                        onToggle={(item) => toggleFilter('size', item)}
                    />

                    <div>
                        <h3 className="font-semibold mb-2">Valoración</h3>
                        <div className="space-y-2">
                            {ratings.map(rating => (
                                <button
                                    key={rating}
                                    onClick={() => toggleFilter('rating', rating)}
                                    className={`flex items-center w-full text-left px-3 py-2 rounded ${activeFilters.rating === rating ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                                >
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className={`${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}>★</span>
                                    ))}
                                    <span className="ml-2 text-sm text-gray-600">y más</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={clearFilters}
                        className="w-full py-2 px-4 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm font-medium"
                    >
                        Limpiar filtros
                    </button>
                </div>
            </div>

            {/* Overlay para móvil */}
            {isOpen && (
                <div
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
                />
            )}
        </div>
    );
};

interface FilterSectionProps {
    title: string;
    items: string[];
    activeItems: string[];
    onToggle: (item: string) => void;
}

const FilterSection = ({ title, items, activeItems, onToggle }: FilterSectionProps) => {
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className='relative'>
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between w-full font-semibold mb-2"
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
                            className={`flex items-center w-full text-left px-3 py-2 rounded ${activeItems.includes(item) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
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

export default Sidebar;