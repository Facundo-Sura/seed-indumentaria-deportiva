import React from "react";

const CartPage = () => {
  return (
    <div className="w-full min-h-screen grid justify-items-center content-center">
      <h1
        className="bg-bl
            ue-500"
      >
        Carrito de compras
      </h1>
      <ul className="bg-yellow-100 w-1/2 flex justify-evenly flex-wrap">
        <ol className="w-3/4">
          <li className="">
            <h3 className="bg-green-300">Productos</h3>
          </li>
          <li>Precio 1</li>
          <li>Precio 2</li>
          <li>Precio 3</li>
        </ol>
        <ol className="w-1/4">
          <li>
            <h3 className="bg-green-300">Precio</h3>
          </li>
          <li>Precio 1</li>
          <li>Precio 2</li>
          <li>Precio 3</li>
        </ol>
      </ul>
    </div>
  );
};

export default CartPage;
