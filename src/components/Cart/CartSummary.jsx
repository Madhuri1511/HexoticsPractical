import React from "react";

const CartSummary = ({ cart }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="mt-6 border-t pt-4">
      <h3 className="text-xl font-bold">Total Price: ${total.toFixed(2)}</h3>
    </div>
  );
};

export default CartSummary;