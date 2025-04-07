import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 font-[family-name:var(--font-geist-sans)]">
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Aquí irían tus productos de football */}
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              Producto 1
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              Producto 2
            </div>
            {/* Añade más productos según necesites */}
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Aquí irían tus productos de basquetball */}
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              Producto 1
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              Producto 2
            </div>
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
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Aquí irían tus productos de gym */}
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              Producto 1
            </div>
            <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              Producto 2
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}