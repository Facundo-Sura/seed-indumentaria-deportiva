import React from 'react';
import Link from 'next/link';

interface CardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  layout?: 'flex' | 'grid'; // Prop opcional para especificar el diseño
}

const Card: React.FC<CardProps> = ({ id, name, price, image, layout }) => {
  const isFlexLayout = layout === 'flex';

  return (
    <div
      className={`${isFlexLayout
          ? 'w-48 h-64 flex-shrink-0 bg-white rounded-lg shadow-md overflow-hidden'
          : 'w-full sm:w-56 lg:w-64 m-1 sm:m-2 p-0 hover:cursor-pointer hover:bg-zinc-300 transition-colors duration-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg'
        }`}
    >
      <img
        src={image}
        alt={name}
        className={`${isFlexLayout ? 'w-full h-32 object-cover' : 'w-full h-48 sm:h-56 object-cover'}`}
      />
      <div className="p-2">
        <div className='flex justify-between items-center'>
          <h3 className="my-2 mx-0 text-sm sm:text-base line-clamp-2">{name}</h3>
          <p className="text-gray-500 text-sm sm:text-base">${price}</p>
        </div>
        <div className="grid items-center justify-items-center mt-2">
          <Link
            href={`/detail/${id}`}
            className="text-sm sm:text-base text-green-600 hover:text-green-800 hover:underline"
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;