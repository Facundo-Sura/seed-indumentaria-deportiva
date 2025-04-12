"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "@/components/Cards";
import Sidebar from "@/components/Sidebar";
import Pagination from "@/components/Pagination";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
}

const Products: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(9);
    const [products, setProducts] = useState<any[]>([]);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error loading products:', error);
            } finally {
                setInitialLoad(false);
            }
        };

        fetchProducts();
    }, []);

    if (initialLoad) return <div>Cargando productos...</div>;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const handlePageChange = (page: number) => setCurrentPage(page);

    return (
        <div className="flex flex-col min-h-screen p-8 pb-20 gap-8 sm:p-6 font-[family-name:var(--font-geist-sans)]">
            {/* Contenedor principal */}
            <div className="flex flex-1 gap-8">
                {/* Sidebar - ahora con ancho fijo y alineación perfecta */}
                <div className="hidden md:block w-64 h-[calc(100vh-180px)] sticky top-28">
                    <Sidebar
                        initialProducts={products}
                        onProductsFiltered={setProducts}
                    />
                </div>
                
                {/* Contenido principal */}
                <main className="flex-1">
                    <Cards products={currentProducts} />
                </main>
            </div>
            
            {/* Paginación - ahora fuera del main para mejor alineación */}
            <div className="mt-auto">
                <Pagination 
                    currentPage={currentPage} 
                    totalPages={Math.ceil(products.length / productsPerPage)} 
                    onPageChange={handlePageChange} 
                />
            </div>
        </div>
    )
}

export default Products;