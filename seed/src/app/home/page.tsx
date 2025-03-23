"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "@/components/Cards";

//defino la interfaz para los producos
interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}

const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);

    //Funcion para obrener los productos
    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/products');
            setProducts(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    //Ejecutar la funcion al vargar la página
    useEffect(() => {
        fetchProducts()
    }, [])
    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
            <h1>Productos</h1>
            <Cards products={products} />
        </div>
    )
}

export default Home;