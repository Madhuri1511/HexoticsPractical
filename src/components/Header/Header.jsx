import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authenticated");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // React.useEffect(() => {
  //   console.log("items", JSON.parse(localStorage.getItem("cart")));
  //   let totalCart = JSON.parse(localStorage.getItem("cart"));
  //   setCount(totalCart ? totalCart.length : 0); // Ensure there's no error if cart is null
  // }, []);
  React.useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCount(cart.length);
    };

    // Initial load
    updateCartCount();

    // Listen for changes in localStorage (triggered when items are added/removed)
    window.addEventListener('storage', updateCartCount);

    // Cleanup listener
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);


  const isAuthenticated = localStorage.getItem("authenticated") === "true";

  return (
    <header className="MainPageColor text-white">
      <div className="container mx-auto flex flex-wrap items-center justify-between py-4 px-4 md:px-8">
        {/* Logo */}
        <h1 className="text-xl font-bold">Product Management System</h1>

        {/* Mobile Menu Toggle */}
        <button
          className="block md:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Navigation Menu */}
        <nav
          className={`w-full md:w-auto md:flex items-center ${
            menuOpen ? "block" : "hidden"
          }`}
        >
          <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
            <li>
              <Link to="/" className="hover:underline">
                Products
              </Link>
            </li>
            {/* <li>
              <Link to="/cart" className="hover:underline relative">
                Cart
                {count > 0 && (
                  <span className="absolute top-0 right-0 inline-block w-5 h-5 bg-red-600 ml-5 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Link>
            </li> */}
             <li className="relative">
              <Link to="/cart" className="hover:underline">
                Cart
              </Link>
              {count > 0 && (
                <span className="cartCount top-0 right-0 h-5 w-5 bg-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {count}
                </span>
              )}
            </li>
            {isAuthenticated ? (
              <li>
                <button onClick={handleLogout} className="hover:underline">
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li>
                  <Link to="/login" className="hover:underline">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="hover:underline">
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
