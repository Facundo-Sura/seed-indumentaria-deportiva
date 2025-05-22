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
      <ul className="bg-green-300 w-2/3 flex justify-evenly">
        <li className="">
          <h3 className="">Productos</h3>
        </li>
        <li>
          <h3 className="">Precio</h3>
        </li>
      </ul>
      <ol>
        <li>Producto 1</li>
        <li>Producto 2</li>
        <li>Producto 3</li>
      </ol>
      <ol>
        <li>Precio 1</li>
        <li>Precio 2</li>
        <li>Precio 3</li>
      </ol>
    </div>
  );
};

export default CartPage;
