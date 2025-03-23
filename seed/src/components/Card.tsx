import React from 'react';

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
        <div className="card">
            <img src={image} alt={title} />
            <div className='card-content'>
                <h3>{title}</h3>
                <p>${price}</p>
            </div>
        </div>
    );
};

export default Card;