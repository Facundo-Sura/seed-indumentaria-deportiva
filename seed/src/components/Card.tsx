import React from 'react';
import Link from 'next/link';

//Definimos la interfaz para las props del componente
interface CardProps {
    id: number;
    title: string;
    price: number;
    image: string;
}

//Definimos el componente Card
const Card: React.FC<CardProps> = ({ id, title, price, image }) => {
    return (
        <div className="w-64 m-2 p-0 hover:cursor-pointer hover:bg-zinc-300">
            <Link href={`/product/${id}`}>
                <img src={image} alt={title} className='w-full h-2/3' />
                <div className='p-2 h-1/3'>
                    <h3 className='my-2 mx-0'>{title}</h3>
                    <p className='text-gray-500'>${price}</p>
                    <div className='grid grid-cols-2 items-center justify-items-center'>
                        <button className='w-fit p-2 rounded-2xl hover:bg-black hover:text-white hover:cursor-pointer'>Comprar</button>
                        <button className='w-fit p-2 rounded-2xl hover:bg-black hover:text-white hover:cursor-pointer'>Al carrito</button>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Card;