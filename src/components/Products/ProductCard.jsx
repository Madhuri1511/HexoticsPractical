import React from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleAddToCart = () => {
    const isAuthenticated = localStorage.getItem("authenticated") === "true";
    if (!isAuthenticated) {
      swal({
        title: "Login Required",
        text: "Please log in to add items to your cart.",
        icon: "warning",
        buttons: {
          cancel: {
            text: "Cancel",
            visible: true,
            className: "swal-button-cancel",
          },
          confirm: {
            text: "Login",
            visible: true,
            className: "swal-button-confirm MainPageColor",
          },
        },
      }).then((willLogin) => {
        if (willLogin) {
          navigate("/login");
        }
      });

      // Inject CSS for centering buttons in one line
      const swalStyles = document.createElement("style");
      swalStyles.innerHTML = `
        .swal-footer {
          display: flex;
          justify-content: center;
          gap: 10px; /* Space between buttons */
        }
        .swal-button {
          padding: 8px 16px;
          font-size: 14px;
        }
      `;
      document.head.appendChild(swalStyles);

      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProduct = cart.find((item) => item.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    swal({
      title: "Added to Cart",
      text: `${product.title} has been added to your cart.`,
      icon: "success",
      buttons: {
        confirm: {
          text: "OK",
          className: "swal-button-ok MainPageColor",
        },
      },
    });

    // Center the 'OK' button in the alert
    const swalSuccessStyles = document.createElement("style");
    swalSuccessStyles.innerHTML = `
      .swal-footer {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 10px;
      }
      .swal-button-ok {
        padding: 8px 16px;
        font-size: 14px;
      }
    `;
    document.head.appendChild(swalSuccessStyles);


  };

  return (
    <div className="border rounded-lg p-4 shadow-md flex flex-col h-full">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-40 object-cover rounded-md"
      />
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mt-2 truncate">{product.title}</h3>
        <p className="text-gray-600">${product.price}</p>
      </div>
      <button
        onClick={handleAddToCart}
        className="w-full mt-2 MainPageColor text-white py-2 rounded-lg hover:bg-blue-600"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
