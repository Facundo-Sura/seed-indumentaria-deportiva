"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "@/components/Cards";
import Pagination from "@/components/Pagination";

//defino la interfaz para los producos
interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}

const Products: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]); //defino el estado de los productos
    const [currentPage, setCurrentPage] = useState(1);//defino el estado de la pagina actual
    const [productsPerPage] = useState(10);//defino el estado de la cantidad de productos por pagina

    //Funcion para obrener los productos
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/products');
            setProducts(response.data);
            console.log(response);
        } catch (error) {
            console.error('Error fetching products: ', error);
        }
    };

    //Ejecutar la funcion al vargar la página
    useEffect(() => {
        fetchProducts()
    }, [])

    //Calcular el indice del ultimo producto de la pagina actual
    const indexOfLastProduct = currentPage * productsPerPage;
    //Calcular el indice del primer producto de la pagina actual
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    //Obtener los productos de la pagina actual
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
    //Funcion para cambiar de pagina
    const handlePageChange = (page: number) => setCurrentPage(page);

    return (
        <div className="grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1>Productos</h1>
            <Cards products={currentProducts} />
            <Pagination currentPage={currentPage} totalPages={Math.ceil(products.length / productsPerPage)} onPageChange={handlePageChange} />
        </div>
    )
}

export default Products;