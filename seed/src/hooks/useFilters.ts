import { useState, useEffect } from "react";
import axios from "axios"; // o tu cliente HTTP preferido

interface FilterOptions {
  categories: string[];
  genders: string[];
  colors: string[];
  sizes: string[];
}

interface ActiveFilters {
  category?: string[];
  gender?: string[];
  color?: string[];
  size?: string[];
  minRating?: number;
  sort?: "price-asc" | "price-desc";
}

const useFilters = () => {
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    categories: [],
    genders: [],
    colors: [],
    sizes: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});

  // Reemplaza con tus endpoints reales
  const ENDPOINTS = {
    FILTER_OPTIONS: `http://localhost:5000/products/filter`,
    PRODUCTS: `http://localhost:5000/products`,
  };

  // Cargar opciones de filtro al montar
  useEffect(() => {
    const fetchFilterOptions = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(ENDPOINTS.FILTER_OPTIONS);
        setFilterOptions(response.data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilterOptions();
  }, []);

  // Función para aplicar filtros (se puede exponer si necesitas trigger manual)
  const applyFilters = async (filters: ActiveFilters) => {
    try {
      setIsLoading(true);
      const response = await axios.get(ENDPOINTS.PRODUCTS, {
        params: filters,
      });
      return response.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Actualizar filtros y disparar búsqueda automáticamente
  const updateFilters = async (newFilters: ActiveFilters) => {
    setActiveFilters(newFilters);
    return await applyFilters(newFilters);
  };

  return {
    filterOptions,
    activeFilters,
    isLoading,
    error,
    updateFilters,
    applyFilters,
  };
};

export default useFilters;
