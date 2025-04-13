import React from 'react';
import Link from 'next/link';

interface CardProps {
    id: string;
    name: string;
    price: number;
    image: string;
}

const Card: React.FC<CardProps> = ({ id, name, price, image }) => {
    return (
        <div className="w-full sm:w-56 lg:w-64 m-1 sm:m-2 p-0 hover:cursor-pointer hover:bg-zinc-300 transition-colors duration-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg">
            <img 
                src={image} 
                alt={name} 
                className='w-full h-48 sm:h-56 object-cover' 
            />
            <div className='p-2'>
                <h3 className='my-2 mx-0 text-sm sm:text-base line-clamp-2'>{name}</h3>
                <p className='text-gray-500 text-sm sm:text-base'>${price}</p>
                <div className='grid grid-cols-2 items-center justify-items-center mt-2'>
                    <Link 
                        href={`/detail/${id}`}
                        className="text-sm sm:text-base text-blue-600 hover:text-blue-800 hover:underline"
                    >
                        Ver más
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Card;