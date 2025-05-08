'use client'
import React, { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import TopProducts from "@/components/TopProducts";
import Carrousell from "@/components/Carrousell";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

export default function Home() {
  const [topProductsFutbol, setTopProductsFutbol] = useState<Product[]>([]);
  const [topProductsBasket, setTopProductsBasket] = useState<Product[]>([]);
  const [topProductsGimnasio, setTopProductsGimnasio] = useState<Product[]>([]);
  // Función para obtener los productos
  const fetchProductsFutbol = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products/filter?category=futbol');
      setTopProductsFutbol(response.data);
      console.log(setTopProductsFutbol);
    } catch (error) {
      console.error('Error fetching products: ', error)
    }
  };

  const fetchProductsBasket = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products/filter?category=basket');
      setTopProductsBasket(response.data);
      console.log(setTopProductsBasket);
    } catch (error) {
      console.error('Error fetching products: ', error)
    }
  };

  const fetchProductsGimnasio = async () => {
    try {
      const response = await axios.get('http://localhost:5000/products/filter?category=gimnasio');
      setTopProductsGimnasio(response.data);
      console.log(setTopProductsGimnasio);
    } catch (error) {
      console.error('Error fetching products: ', error)
    }
  };
  // Ejecutar la función al cargar la página
  useEffect(() => {
    fetchProductsFutbol()
    fetchProductsBasket()
    fetchProductsGimnasio()
  }, [])

  // Imágenes para el carrusel
  const images = [
    '/imagenes/promo.jpg',
    '/imagenes/ubi.jpg',
    '/imagenes/cole.jpg'
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-[family-name:var(--font-geist-sans)]">
      <Carrousell images={images} autoPlayInterval={5000} />
      {/* Secciín de Coleccionaes */}
      <h1 className="text-center font-bold text-6xl pb-16">
        Nu<span className="text-green-500">e</span>stras Col<span className="text-green-500">e</span>cciones
      </h1>
      {/* Sección Football */}
      <section className="mb-16">
        <div className="relative h-96 w-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/football.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-8 md:px-16 lg:px-32">
            <div className="max-w-2xl">
              <h2 className="text-white text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Fútbol</h2>
              <p className="text-white text-lg md:text-xl mb-6 drop-shadow-md">
                Descubre nuestra colección de productos para fútbol de alto rendimiento
              </p>
              <Link
                href="/products/football"
                className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold 
                hover:bg-black hover:text-white transition-all duration-300 hover:scale-105"
              >
                Ver colección completa →
              </Link>
            </div>
          </div>
        </div>

        {/* Área de productos Football */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h3 className="text-2xl font-bold mb-8 text-gray-800">Productos destacados de Fútbol</h3>
          <div>
            {/* Aquí irían tus productos de football */}
            <TopProducts products={topProductsFutbol} />
          </div>
        </div>
      </section>

      {/* Sección Basquetball */}
      <section className="mb-16">
        <div className="relative h-96 w-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/basquetball.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-l from-black/60 to-transparent flex items-center justify-end px-8 md:px-16 lg:px-32">
            <div className="max-w-2xl text-right">
              <h2 className="text-white text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Basket</h2>
              <p className="text-white text-lg md:text-xl mb-6 drop-shadow-md">
                Equípate con lo mejor para la cancha
              </p>
              <Link
                href="/products/basquetball"
                className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold 
                hover:bg-black hover:text-white transition-all duration-300 hover:scale-105"
              >
                Ver colección completa →
              </Link>
            </div>
          </div>
        </div>

        {/* Área de productos Basquetball */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h3 className="text-2xl font-bold mb-8 text-gray-800">Productos destacados de Basket</h3>
          <div>
            {/* Aquí irían tus productos de basquetball */}
            <TopProducts products={topProductsBasket} />
          </div>
        </div>
      </section>

      {/* Sección Gym */}
      <section className="mb-16">
        <div className="relative h-96 w-full overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/gimnasio.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent flex items-center px-8 md:px-16 lg:px-32">
            <div className="max-w-2xl">
              <h2 className="text-white text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">Gimnasio</h2>
              <p className="text-white text-lg md:text-xl mb-6 drop-shadow-md">
                Todo lo que necesitas para correr más lejos y más rápido
              </p>
              <Link
                href="/products/gym"
                className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold 
                hover:bg-black hover:text-white transition-all duration-300 hover:scale-105"
              >
                Ver colección completa →
              </Link>
            </div>
          </div>
        </div>

        {/* Área de productos Gym */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h3 className="text-2xl font-bold mb-8 text-gray-800">Productos destacados de Gimnasio</h3>
          <div>
            {/* Aquí irían tus productos de gym */}
            <TopProducts products={topProductsGimnasio} />
          </div>
        </div>
      </section>
    </div>
  );
}