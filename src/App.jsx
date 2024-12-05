import Header from "./components/Header/Header";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import "../src/App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
const App = () => {

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow bg-gray-100 py-6">
          <Routes>
            <Route path="/" element={<ProductPage />} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="MainPageColor text-white text-center py-4">
          <p>© 2024 Product Management System. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;