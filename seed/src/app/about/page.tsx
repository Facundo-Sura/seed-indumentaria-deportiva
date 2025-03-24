// app/about/page.tsx
import React from 'react';
import Image from 'next/image';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre Nosotros</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Conoce la historia detrás de nuestra pasión por ofrecerte los mejores productos
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Nuestra Historia</h2>
              <p className="text-gray-700 mb-4">
                Fundada en 2023, nuestra tienda nació de la simple idea de ofrecer productos
                de calidad a precios accesibles. Lo que comenzó como un pequeño proyecto se ha
                convertido en un referente para nuestros clientes.
              </p>
              <p className="text-gray-700 mb-4">
                Cada día trabajamos para mejorar y ampliar nuestro catálogo, manteniendo
                siempre nuestros valores de transparencia y servicio al cliente.
              </p>
              <p className="text-gray-700">
                Hoy contamos con un equipo apasionado que comparte la misma visión: hacer tu
                experiencia de compra sencilla y satisfactoria.
              </p>
            </div>
            <div className="relative h-80 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/about-team.jpg" // Reemplaza con tu imagen
                alt="Nuestro equipo"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Nuestros Valores</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Calidad",
                description: "Productos seleccionados con los más altos estándares",
                icon: "⭐"
              },
              {
                title: "Transparencia",
                description: "Precios claros y sin sorpresas",
                icon: "🔍"
              },
              {
                title: "Servicio",
                description: "Atención personalizada antes, durante y después de tu compra",
                icon: "💬"
              }
            ].map((value, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg text-center">
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section (Opcional) */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Conoce al Equipo</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { name: "María García", role: "Fundadora", image: "/team1.jpg" },
              { name: "Carlos López", role: "Director Comercial", image: "/team2.jpg" },
              { name: "Ana Martínez", role: "Servicio al Cliente", image: "/team3.jpg" }
            ].map((member, index) => (
              <div key={index} className="text-center">
                <div className="relative h-64 w-64 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-blue-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;