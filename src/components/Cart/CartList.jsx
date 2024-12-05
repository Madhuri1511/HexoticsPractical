import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import CartSummary from "./CartSummary";

const CartList = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
    window.dispatchEvent(new Event('storage'));
  }, []);

  const handleRemove = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage')); 
  };

  const handleQuantityChange = (id, delta) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('storage')); 
  };

  return (
    <div className="container mx-auto p-3 space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Cart</h2>
      
      {cart.length === 0 ? (
        <p className="text-gray-600 text-center">Your cart is empty.</p>
      ) : (
        <>
          {/* Cart Items */}
          <div className="space-y-6">
            {cart.map((item) => (
              <div className="bg-white rounded-lg shadow-md p-4">
                <CartItem
                  key={item.id}
                  item={item}
                  onRemove={handleRemove}
                  onQuantityChange={handleQuantityChange}
                />
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="mt-6 bg-white p-6 rounded-lg shadow-md">
            <CartSummary cart={cart} />
          </div>
        </>
      )}
    </div>
  );
};

export default CartList;
