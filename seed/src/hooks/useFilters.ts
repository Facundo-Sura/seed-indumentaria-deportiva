import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string[];
  category: string;
  gender: string;
  size: string[];
  color: string[];
  rating: number;
  isOnSale?: boolean;
  discountPercentage?: number;
}

interface FilterOptions {
  categories: string[];
  genders: string[];
  sizes: string[];
  colors: string[];
}

interface ActiveFilters {
  category?: string;
  gender?: string;
  size?: string; // Ahora es string individual
  color?: string; // Ahora es string individual
  minRating?: number;
  sort?: 'price-asc' | 'price-desc';
}

const useFilters = (initialProducts: Product[] = []) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [activeFilters, setActiveFilters] = useState<ActiveFilters>({});
  
  const BASE_URL = 'http://localhost:5000/products';
  const FILTER_ENDPOINT = `${BASE_URL}/filter`;

  // Extraemos las opciones de filtro de los productos
  const filterOptions: FilterOptions = useMemo(() => {
    const categories = new Set<string>();
    const genders = new Set<string>();
    const sizes = new Set<string>();
    const colors = new Set<string>();

    initialProducts.forEach(product => {
      if (product.category) categories.add(product.category);
      if (product.gender) genders.add(product.gender);
      // Para sizes y colors, aplanamos los arrays
      if (product.size) product.size.forEach(size => sizes.add(size));
      if (product.color) product.color.forEach(color => colors.add(color));
    });

    return {
      categories: Array.from(categories),
      genders: Array.from(genders),
      sizes: Array.from(sizes),
      colors: Array.from(colors),
    };
  }, [initialProducts]);

  // Función para formatear los parámetros
  const formatFilters = (filters: ActiveFilters) => {
    const params: Record<string, string> = {};
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        const paramName = key === 'minRating' ? 'rating' : key;
        params[paramName] = String(value);
      }
    });

    return params;
  };

  // Función para aplicar filtros
  const applyFilters = async (filters: ActiveFilters) => {
    try {
      setIsLoading(true);
      const params = formatFilters(filters);
      
      const response = await axios.get(FILTER_ENDPOINT, {
        params,
        paramsSerializer: (params) => {
          return Object.entries(params)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');
        }
      });
      
      setProducts(response.data);
      return response.data;
    } catch (err) {
      setError(err as Error);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  // Actualizar filtros y disparar búsqueda
  const updateFilters = async (newFilters: ActiveFilters) => {
    setActiveFilters(newFilters);
    return await applyFilters(newFilters);
  };

  return {
    products,
    filterOptions,
    activeFilters,
    isLoading,
    error,
    updateFilters,
    applyFilters
  };
};

export default useFilters;