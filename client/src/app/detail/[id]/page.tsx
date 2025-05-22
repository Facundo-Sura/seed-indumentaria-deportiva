"use client"
import React, { useState, useEffect } from "react"
import axios from "axios"
import { useParams } from "next/navigation";
import { StarIcon } from "@heroicons/react/24/solid"
import Paybutton from "@/components/PayButton"

interface Product {
    id: string;
    image: string;
    name: string;
    rating: number;
    category: string;
    description: string;
    price: number;
}

const Detail: React.FC = () => {
    const params = useParams()
    const id = params.id ? String(params.id) : null

    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchProduct = async (id: string) => {
        try {
            setLoading(true)
            setError(null)
            const response = await axios.get(`http://localhost:5000/products/${id}`);
            setProduct(response.data);
            console.log(response.data);
        } catch (err) {
            console.error('Error fetching product: ', err);
            setError('Failed to load product details')
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (id) {
            fetchProduct(id)
        } else {
            setError('Product ID not found')
            setLoading(false)
        }
    }, [id])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="text-center py-10">
                <p className="text-red-500">{error}</p>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="text-center py-10">
                <p>Product not found</p>
            </div>
        )
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Imagen del producto */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden max-w-96 max-h-96">
                    <img src={product.image} alt={product.name} className="w-fit h-fit object-cover"></img>
                </div>

                {/* Detalles del producto */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="bg-green-100 text-green-400 text-xs font-medium px-2.5 py-0.5 rounded">
                            {product.category}
                        </span>
                        <div className="flex items-center">
                            <StarIcon className="w-5 h-5 text-yellow-400" />
                            <span className="ml-1 text-gray-600"><p>{product.rating}</p></span>
                        </div>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

                    <p className="text-2xl font-semibold text-gray-900">${product.price.toFixed(2)}</p>

                    <div className="prose max-w-none text-gray-700">
                        <p>{product.description}</p>
                    </div>
                    <div className="w-full flex justify-evenly">
                        <button className="w-full md:w-auto bg-green-400 hover:bg-green-800 text-white font-medium py-2 px-6 rounded-lg transition duration-200">
                            Al Carito
                        </button>
                        <Paybutton product={product} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail;