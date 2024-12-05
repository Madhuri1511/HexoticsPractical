import React from "react";
import CartList from "../components/Cart/CartList";

const CartPage = () => {
  const isAuthenticated = localStorage.getItem("authenticated") === "true";

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600 text-lg">
          Please <a href="/login" className="text-blue-500 underline">log in</a> to access your cart.
        </p>
      </div>
    );
  }

  return <CartList />;
};

export default CartPage