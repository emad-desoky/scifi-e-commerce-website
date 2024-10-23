"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import RecommendedProducts from "./RecommendedProducts"; // Import the recommended products component
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext"; // Import the hook
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const CartContent = () => {
  const [cart, setCart] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State to manage snackbar visibility
  const { user } = useAuth(); // Get the current user

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const parsedCart = storedCart ? JSON.parse(storedCart) : [];
    setCart(parsedCart);
  }, []);

  const calculateTotalPrice = () => {
    return cart.reduce((total, { price, quantity }) => {
      const validPrice = parseFloat(price);
      const validQuantity = parseInt(quantity, 10) || 1;

      if (!isNaN(validPrice) && validQuantity > 0) {
        return total + validPrice * validQuantity;
      }

      return total;
    }, 0);
  };

  const updateQuantity = (id, quantityChange) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) => {
        if (item.id === id) {
          const newQuantity = (item.quantity || 1) + quantityChange;
          const updatedItem = { ...item, quantity: Math.max(newQuantity, 1) };

          console.log(
            `Updating item ${item.id}: Quantity changed from ${item.quantity} to ${updatedItem.quantity}`
          );
          return updatedItem;
        }
        return item;
      });

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

  const clearCart = () => {
    if (window.confirm("Are you sure you want to clear the cart?")) {
      setCart([]);
      localStorage.removeItem("cart");
    }
  };

  const removeFromCart = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const router = useRouter();

  const handleProceedToCheckout = () => {
    console.log("Current user:", user); // Log user state for debugging
    if (!user) {
      console.log("User not logged in, showing snackbar");
      setSnackbarOpen(true); // Show snackbar if not logged in
    } else {
      console.log("Proceeding to checkout with amount:", calculateTotalPrice());
      router.push(`./checkout?amount=${calculateTotalPrice()}`);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false); // Close snackbar
  };

  return (
    <motion.div
      className="bg-gradient-to-r from-gray-800 via-blue-900 to-purple-900 text-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto border border-blue-600"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-3xl font-bold mb-4 border-b border-blue-500 pb-2">
        Your Cart
      </h2>

      {/* User greeting and cart content */}
      <div>
        {user ? (
          <p className="mb-4">Welcome, {user.email}!</p>
        ) : (
          <p className="mb-4">Please log in to proceed to checkout.</p>
        )}
      </div>

      {cart.length > 0 ? (
        cart.map((item) => (
          <motion.div
            key={item.id}
            className="flex items-center border-b border-gray-700 pb-4 mb-4 last:border-0 hover:bg-gray-700 transition duration-300"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <div className="relative w-32 h-32 mr-4">
              <Image
                src={item.thumbnail}
                alt={item.title}
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-lg border border-blue-400 transition-transform transform hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.description}</p>
              <div className="flex items-center justify-between mt-2">
                <p className="text-lg font-bold">
                  Price:{" "}
                  <span className="text-green-400">
                    ${!isNaN(item.price) ? item.price.toFixed(2) : "0.00"}
                  </span>
                </p>
                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    className="bg-gray-700 text-white px-2 py-1 rounded-lg disabled:opacity-50 hover:bg-blue-600 transition duration-300 shadow-lg hover:shadow-xl"
                    disabled={item.quantity <= 1}
                  >
                    -
                  </button>
                  <span className="mx-2 text-lg">{item.quantity || 1}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    className="bg-gray-700 text-white px-2 py-1 rounded-lg hover:bg-blue-600 transition duration-300 shadow-lg hover:shadow-xl"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition duration-300 shadow-lg hover:shadow-xl"
              >
                Remove
              </button>
            </div>
          </motion.div>
        ))
      ) : (
        <p className="text-center text-gray-400">Your cart is empty.</p>
      )}
      <div className="mt-4 border-t border-gray-700 pt-4">
        <p className="text-lg font-bold">
          Total Price:{" "}
          <span className="text-green-400">
            $
            {!isNaN(calculateTotalPrice())
              ? calculateTotalPrice().toFixed(2)
              : "0.00"}
          </span>
        </p>
        <div className="flex justify-between mt-4">
          <button
            onClick={clearCart}
            className="w-1/2 mr-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition duration-300 shadow-lg hover:shadow-xl"
          >
            Clear Cart
          </button>
          <motion.button
            className="w-1/2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-300 shadow-lg hover:shadow-xl"
            onClick={handleProceedToCheckout}
          >
            Proceed to Checkout
          </motion.button>
        </div>
      </div>

      {/* Recommended Products Section */}
      <RecommendedProducts cartItems={cart} />

      {/* Snackbar for login prompt */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }} // Changed to show at the top
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="warning"
          sx={{ width: "100%" }}
        >
          Please login to proceed to checkout.
        </Alert>
      </Snackbar>
    </motion.div>
  );
};

export default CartContent;
