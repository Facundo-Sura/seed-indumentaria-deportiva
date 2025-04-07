import React from "react";
import Card from "./Card";

//Defino la interfaz para las props del componente
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
        <div className='grid grid-cols-3 items-stretch justify-items-center '>
            {products.map((product) => (
                <Card key={product.id} id={product.id} name={product.name} price={product.price} image={product.image} />
            ))}
        </div>
    );
};

export default Cards;