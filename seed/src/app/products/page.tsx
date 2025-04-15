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
    const [showSidebar, setShowSidebar] = useState(false);

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

    if (initialLoad) return <div className="flex justify-center items-center h-screen">Cargando productos...</div>;

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    const handlePageChange = (page: number) => setCurrentPage(page);

    return (
        <div className="flex flex-col min-h-screen p-4 pb-20 gap-4 md:p-8 md:gap-8 font-[family-name:var(--font-geist-sans)]">
            {/* Mobile sidebar toggle button */}
            <button 
                className="md:hidden bg-black text-white p-2 rounded-lg self-start"
                onClick={() => setShowSidebar(!showSidebar)}
            >
                {showSidebar ? 'Ocultar filtros' : 'Mostrar filtros'}
            </button>

            {/* Contenedor principal */}
            <div className="flex flex-1 flex-col md:flex-row gap-4 md:gap-8">
                {/* Sidebar - responsive */}
                <div className={`${showSidebar ? 'block' : 'hidden'} md:block w-full md:w-64 h-auto md:h-[calc(100vh-180px)] md:sticky md:top-28`}>
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
            
            {/* Paginación */}
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