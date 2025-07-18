"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export const SearchBar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            // Modificamos la URL para usar el parámetro 'name'
            router.push(`/products/?name=${encodeURIComponent(searchTerm)}`);
            setIsOpen(false);
            setSearchTerm('');
        }
    };

    return (
        <div className="relative">
            {!isOpen ? (
                <button 
                    onClick={() => setIsOpen(true)} 
                    className="p-2 hover:cursor-pointer"
                >
                    🔍
                </button>
            ) : (
                <form 
                    onSubmit={handleSearch}
                    className="flex items-center"
                >
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Buscar productos..."
                        className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-green-400"
                        autoFocus
                    />
                    <button 
                        type="button" 
                        onClick={() => setIsOpen(false)}
                        className="ml-2 text-gray-500 hover:text-red-500"
                    >
                        ✕
                    </button>
                </form>
            )}
        </div>
    );
};

export default SearchBar;