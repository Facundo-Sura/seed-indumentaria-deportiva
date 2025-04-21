import React, { useRef } from "react";
import Card from "./Card";

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
}

interface TopProductsProps {
  products: Product[];
}

const TopProducts: React.FC<TopProductsProps> = ({ products }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      {/* Flecha izquierda */}
      <button
        onClick={scrollLeft}
        className="absolute top-1/2 left-2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Contenedor de productos con scroll horizontal */}
      <div
        ref={scrollRef}
        className="flex overflow-x-scroll scroll-smooth w-full gap-4 px-4 py-2"
      >
        {products.length > 0 ? (
          products.slice(0, 7).map((product) => (
            <Card
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
              layout="flex" // Indicamos que este Card debe usar el diseño flex
            />
          ))
        ) : (
          <p className="text-center text-gray-500">No hay productos disponibles</p>
        )}
      </div>

      {/* Flecha derecha */}
      <button
        onClick={scrollRight}
        className="absolute top-1/2 right-2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md hover:bg-gray-200 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-600"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};

export default TopProducts;