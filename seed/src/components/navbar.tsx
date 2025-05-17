'use client'
import Link from 'next/link';
import { SearchBar } from './Search';

const Navbar = () => {
    const sliders = [
        "","",""
    ]
    return (
        <header className="bg-white shadow-lg sticky top-0 z-50">
            <div className='bg-black h-6'>
                <h1 className='text-white text-center'>sliders</h1>
            </div>
            <nav className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0 w-24">
                        <img src="/imagenes/logo.png" alt="Seed Indumentaria Deportiva" />
                    </Link>

                    {/* Menú principal */}
                    <div className="hidden md:flex space-x-8">
                        <Link href="/products" className="text-gray-800 hover:text-green-400 transition">
                            Productos
                        </Link>
                        <Link href="/about" className="text-gray-800 hover:text-green-400 transition">
                            Nosotros
                        </Link>
                        <Link href="/contact" className="text-gray-800 hover:text-green-400 transition">
                            Contacto
                        </Link>
                    </div>

                    {/* Iconos de acción */}
                    <div className="flex items-center space-x-4">
                        <SearchBar />
                        <Link href="/account" className="p-2 hover:text-green-400">
                            👤
                        </Link>
                        <Link href="/cart" className="p-2 hover:text-green-400">
                            🛒
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;