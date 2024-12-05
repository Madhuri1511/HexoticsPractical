import React from "react";

const CartItem = ({ item, onRemove, onQuantityChange }) => {
  return (
    <div className="flex items-center justify-between border-b py-4">
      <div>
        <h3 className="text-lg font-semibold">{item.title}</h3>
        <p className="text-gray-600">${item.price}</p>
        <div className="flex items-center space-x-2 mt-2">
          <button
            onClick={() => onQuantityChange(item.id, -1)}
            className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            onClick={() => onQuantityChange(item.id, 1)}
            className="bg-gray-300 px-2 py-1 rounded hover:bg-gray-400"
          >
            +
          </button>
        </div>
      </div>
      <button
        onClick={() => onRemove(item.id)}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;