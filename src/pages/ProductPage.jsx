// src/pages/ProductPage.js
import React from "react";
import ProductList from "../components/Products/ProductList";

const ProductPage = () => {
  return (
    <div className="container mx-auto p-3">
      <h1 className="text-3xl font-bold text-center mb-6">Our Products</h1>
      {/* Product list component with pagination and filter */}
      <ProductList />
    </div>
  );
};

export default ProductPage;
