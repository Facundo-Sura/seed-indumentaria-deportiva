"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51RB2AoGhMCA6aaHXAEqMcQiLfpRRrxATrvgMjdu9QCS4MMpfbjAUP2AId0EdKuQoaxIVZ5C9s6FLkiEQ7qNvchtt00PKjlhaA7");

interface PayButtonProps {
  cartProducts: any[];
  totalPrice: number;
}

const ButtonPay = ({ cartProducts, totalPrice }: PayButtonProps) => {
  const handleCheckout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/pay/", {
        cartProducts,
        totalPrice,
      });

      const { sessionId } = response.data;
      const stripe = await stripePromise;
      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error("Error in redirecting to checkout:", error);
        } else {
          const clearCart = await axios.delete("http://localhost:5000/order/deleteAll")
        }
      }
    } catch (error) {
      console.error("Error in handleCheckout:", error);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="w-full md:w-auto bg-green-400 hover:bg-green-800 text-white font-medium py-2 px-6 rounded-lg transition duration-200"
    >
      Comprar
    </button>
  );
};

export default ButtonPay;