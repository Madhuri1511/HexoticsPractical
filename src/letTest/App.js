
import "../src/App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React from "react";
import Header from "./Components/Header/Header";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import ProductGrid from "./Components/Products/ProductGrid";
const App = () => {

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
      <Header/>

        {/* Main Content */}
        <main className="flex-grow bg-gray-100">
          <Routes>
            <Route path="/" element={<ProductGrid /> } />
            <Route path="/products" element={<ProductGrid />} />
           
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