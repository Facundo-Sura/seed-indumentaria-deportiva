import React from "react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 md:p-12 font-[family-name:var(--font-geist-sans)]">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        
        {/* Sección Football */}
        <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative h-64 w-full">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/football.mp4" type="video/mp4" />
              Tu navegador no soporta videos HTML5
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-between p-6">
              <h2 className="text-white text-2xl sm:text-3xl font-bold drop-shadow-md">Football</h2>
              <Link 
                href="/products/football" 
                className="inline-block bg-white text-black px-6 py-2 rounded-full font-medium 
                hover:bg-black hover:text-white transition-colors duration-300 w-fit cursor-pointer"
              >
                Ver más
              </Link>
            </div>
          </div>
          <div className="bg-white p-4">
            <h3 className="text-lg font-semibold">Productos destacados</h3>
          </div>
        </div>

        {/* Sección Basquetball */}
        <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative h-64 w-full">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/basquetball.mp4" type="video/mp4" />
              Tu navegador no soporta videos HTML5
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-between p-6">
              <h2 className="text-white text-2xl sm:text-3xl font-bold drop-shadow-md">Basquetball</h2>
              <Link 
                href="/products/basquetball" 
                className="inline-block bg-white text-black px-6 py-2 rounded-full font-medium 
                hover:bg-black hover:text-white transition-colors duration-300 w-fit cursor-pointer"
              >
                Ver más
              </Link>
            </div>
          </div>
          <div className="bg-white p-4">
            <h3 className="text-lg font-semibold">Productos destacados</h3>
          </div>
        </div>

        {/* Sección Running */}
        <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
          <div className="relative h-64 w-full">
            <video 
              autoPlay 
              loop 
              muted 
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/videos/running.mp4" type="video/mp4" />
              Tu navegador no soporta videos HTML5
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col justify-between p-6">
              <h2 className="text-white text-2xl sm:text-3xl font-bold drop-shadow-md">Running</h2>
              <Link 
                href="/products/running" 
                className="inline-block bg-white text-black px-6 py-2 rounded-full font-medium 
                hover:bg-black hover:text-white transition-colors duration-300 w-fit cursor-pointer"
              >
                Ver más
              </Link>
            </div>
          </div>
          <div className="bg-white p-4">
            <h3 className="text-lg font-semibold">Productos destacados</h3>
          </div>
        </div>
      </div>
    </div>
  );
}