import React from "react";
import Card from "./Card";

//Defino la interfaz para las props del componente
interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
}

interface CardsProps {
    products: Product[];
}

const Cards: React.FC<CardsProps> = ({ products }) => {
    return (
        <div className='grid grid-cols-4 items-stretch justify-items-center '>
            {products.map((product) => (
                <Card key={product.id} id={product.id} title={product.title} price={product.price} image={product.image} />
            ))}
        </div>
    );
};

export default Cards;