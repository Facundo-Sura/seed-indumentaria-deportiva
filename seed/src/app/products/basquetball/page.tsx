"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "@/components/Cards";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
}

const Basquetball: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]); //defino el estado de los productos
    const [currentPage, setCurrentPage] = useState(1);//defino el estado de la pagina actual
    const [productsPerPage] = useState(9);//defino el estado de la cantidad de productos por pagina

    //Funcion para obrener los productos
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/products/filter?category=basket');
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

    return (
        <div className="grid grid-cols-6 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <main className="col-span-5">
                <Cards products={products} />
            </main>
        </div>
    )
}

export default Basquetball;