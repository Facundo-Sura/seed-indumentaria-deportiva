import React from "react";
import Card from "./Card";

interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
}

interface CardsProps {
    products: Product[];
}

const Cards: React.FC<CardsProps> = ({ products }) => {
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 justify-items-center'>
            {products.map((product) => (
                <Card 
                    key={product.id} 
                    id={product.id} 
                    name={product.name} 
                    price={product.price} 
                    image={product.image} 
                />
            ))}
        </div>
    );
};

export default Cards;