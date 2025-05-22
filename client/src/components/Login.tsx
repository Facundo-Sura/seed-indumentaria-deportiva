"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export const LoginForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:5000/users/?email=${encodeURIComponent(email)}`);
            
            if (response.data) {
                // Aquí puedes agregar la lógica de verificación de contraseña
                console.log('Usuario encontrado:', response.data);
                setIsAuthenticated(true);
                setIsOpen(false);
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
            alert('Error al iniciar sesión. Por favor, verifica tus credenciales.');
        }
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        // Aquí puedes agregar lógica adicional de logout como limpiar el localStorage, etc.
    };

    return (
        <div className="relative">
            {!isOpen ? (
                <button 
                    onClick={() => setIsOpen(true)} 
                    className="p-2 hover:text-green-400"
                >
                    👤
                </button>
            ) : (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200">
                    <form onSubmit={handleSubmit} className="p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold text-gray-800">Iniciar Sesión</h2>
                            <button 
                                type="button"
                                onClick={() => setIsOpen(false)}
                                className="text-gray-500 hover:text-red-500 cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>
                        
                        <div className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    placeholder="tu@email.com"
                                    required
                                />
                            </div>
                            
                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200 cursor-pointer"
                            >
                                Iniciar Sesión
                            </button>
                            
                            <div className="text-center text-sm">
                                <button
                                    type="button"
                                    onClick={() => router.push('/register')}
                                    className="text-green-500 hover:text-green-600 cursor-pointer"
                                >
                                    ¿No tienes cuenta? Regístrate
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default LoginForm;