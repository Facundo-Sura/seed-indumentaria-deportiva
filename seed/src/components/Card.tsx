import React from 'react';
import Link from 'next/link';

//Definimos la interfaz para las props del componente
interface CardProps {
    id: string;
    name: string;
    price: number;
    image: string;
}

//Definimos el componente Card

const Card: React.FC<CardProps> = ({ id, name, price, image }) => {
    return (
        <div className="w-64 m-2 p-0 hover:cursor-pointer hover:bg-zinc-300">

            <img src={image} alt={name} className='w-full h-2/3' />
            <div className='p-2 h-1/3'>
                <h3 className='my-2 mx-0'>{name}</h3>
                <p className='text-gray-500'>${price}</p>
                <div className='grid grid-cols-2 items-center justify-items-center'>
                    <Link href={`/detail/${id}`}>
                        Ver mas
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Card;