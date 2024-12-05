import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import Filters from "./Filters";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const [sortOrder, setSortOrder] = useState("asc"); // Sorting state
  const [loading, setLoading] = useState(true); // Loading state
  const productsPerPage = 5;

  useEffect(() => {
    // Fetch products
    axios.get("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products);
        setFilteredProducts(res.data.products);
        const uniqueCategories = [
          ...new Set(res.data.products.map((product) => product.category)),
        ];
        setCategories(uniqueCategories);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleFilter = (category) => {
    let filtered = products;
    if (category !== "All") {
      filtered = products.filter((product) => product.category === category);
    }
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to page 1 after filtering
  };

  // Handle search query change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // Filter products based on search query
    let filtered = products.filter((product) =>
      product.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to page 1 on search
  };

  // Handle sorting
  const handleSort = (order) => {
    setSortOrder(order);
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      if (order === "asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
    setFilteredProducts(sortedProducts);
  };

  // Calculate the index of the first product for the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculate total number of pages
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <Filters categories={categories} onFilter={handleFilter} />
        <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 w-full sm:w-auto mt-4 sm:mt-0">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 border rounded-lg w-full sm:w-64 mb-2 sm:mb-0"
          />
          <select
            value={sortOrder}
            onChange={(e) => handleSort(e.target.value)}
            className="px-4 py-2 border rounded-lg w-full sm:w-48"
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>
      </div>
      
      {/* Loading Spinner */}
      {loading ? (
       <div className="flex justify-center items-center mt-10 space-x-2">
       <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"></div>
       <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce200"></div>
       <div className="w-4 h-4 bg-blue-500 rounded-full animate-bounce400"></div>
     </div>
      ) : (
        <>
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-6">
            {currentProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex flex-wrap justify-center items-center mt-8 space-x-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-4 py-2 transition ${currentPage === index + 1 ? "MainPageColor text-white" : "bg-gray-300 text-gray-700"}`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
