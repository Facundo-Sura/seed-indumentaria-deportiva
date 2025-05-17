"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "@/components/Cards";
import Pagination from "@/components/Pagination";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<any[]>([]);
    const [initialLoad, setInitialLoad] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(9);

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
        <div className="grid">
            <Cards products={currentProducts} />
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(products.length / productsPerPage)}
                onPageChange={handlePageChange}
            />
        </div>
    )
}

export default Products;