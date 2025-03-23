"use client"
import axios from "axios";
import React, { useEffect, useState } from "react";

//defino la interfaz para los producos
interface Product {
  id: number;
  title: string;
  image: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  //Funcion para obrener los productos
  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  }

  //Ejecutar la funcion al vargar la página
  useEffect(() => {
    fetchProducts()
  }, [])
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>Productos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img src={product.image} alt={product.title} />
            {product.title}
            </li>
        ))}
      </ul>
    </div>
  );
}
