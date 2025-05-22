// components/Footer.tsx
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 ">
      <main className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sección 1: Logo y descripción */}
          <div>
            <h3 className="text-xl font-bold mb-4">SE<span className='text-green-400'>E</span>D - Indumentaria Deportiva</h3>
            <p className="text-gray-400">
              Tu destino para comprar productos de calidad a precios increíbles.
            </p>
          </div>

          {/* Sección 2: Enlaces rápidos */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Enlaces</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition">
                  Sobre nosotros
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white transition">
                  Política de privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Sección 3: Contacto */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Contacto</h4>
            <p className="text-gray-400">contacto@mitienda.com</p>
            <p className="text-gray-400">+54 9 3547 523108</p>
          </div>
        </div>

        {/* Derechos de autor */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Seed. Todos los derechos reservados.</p>
        </div>
      </main>
    </footer>
  );
};

export default Footer;