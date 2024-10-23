"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Define animation variants for the modal
const modalVariants = {
  open: { opacity: 1, x: 0 }, // Open state: fully visible and in position
  closed: { opacity: 0, x: "-100%" }, // Closed state: fade out and slide left
};

const ProductModal = ({ product, onClose }) => {
  const [isVisible, setIsVisible] = useState(true); // State to control modal visibility
  const router = useRouter(); // Initialize router

  const handleOutsideClick = (event) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  const closeModal = () => {
    setIsVisible(false); // Set to false to trigger exit animation
    setTimeout(onClose, 300); // Call onClose after exit animation duration
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeModal();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, []);

  if (!product) return null; // If there's no product, don't render anything

  return (
    <AnimatePresence>
      {isVisible && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75 backdrop-blur-md"
          onClick={handleOutsideClick}
        >
          <motion.div
            className="relative bg-gray-900 p-4 md:p-6 rounded-lg shadow-lg w-11/12 max-w-sm sm:max-w-md lg:max-w-2xl mx-auto"
            initial="closed"
            animate="open"
            exit="closed"
            variants={modalVariants}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-white text-xl focus:outline-none"
            >
              &times;
            </button>

            <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
              {/* Responsive Image */}
              <Image
                src={product.images[0]}
                alt={product.title}
                width={250}
                height={300}
                layout="intrinsic"
                loading="lazy"
                className="rounded-lg w-full sm:w-auto"
              />
              <div className="flex flex-col items-start text-left w-full">
                <h2 className="text-xl sm:text-2xl font-bold text-zinc-400 mb-2">
                  {product.title}
                </h2>
                <p className="text-lg sm:text-xl text-blue-300 mb-2">
                  ${product.price.toFixed(2)}
                </p>

                <div className="flex items-center mb-4">
                  {Array(Math.round(product.rating))
                    .fill(0)
                    .map((_, index) => (
                      <FaStar key={index} className="text-yellow-400 mr-1" />
                    ))}
                </div>

                <p className="text-sm sm:text-base text-gray-400 mb-4">
                  {product.description}
                </p>

                {product.discountPercentage > 0 && (
                  <div className="text-red-500 text-sm sm:text-base">
                    Discount: {product.discountPercentage}%
                  </div>
                )}

                <div className="text-sm sm:text-base text-gray-300 mt-4">
                  <p>
                    <strong>Brand:</strong> {product.brand}
                  </p>
                  <p>
                    <strong>SKU:</strong> {product.sku}
                  </p>
                  <p>
                    <strong>Stock:</strong> {product.stock} available
                  </p>
                  <p>
                    <strong>Weight:</strong> {product.weight}g
                  </p>
                  <p>
                    <strong>Dimensions:</strong> {product.dimensions.width}x
                    {product.dimensions.height}x{product.dimensions.depth} mm
                  </p>
                  <p>
                    <strong>Warranty:</strong> {product.warrantyInformation}
                  </p>
                  <p>
                    <strong>Shipping:</strong> {product.shippingInformation}
                  </p>
                  <p>
                    <strong>Return Policy:</strong> {product.returnPolicy}
                  </p>
                  <p>
                    <strong>Availability:</strong> {product.availabilityStatus}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row justify-between space-x-0 sm:space-x-6 w-full">
                  <motion.button className="mt-4 px-6 py-2 w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-700 text-black rounded-lg shadow-[0_0_10px_rgba(255,255,255,0.7)] hover:bg-opacity-50 transition duration-300">
                    Add to Cart
                  </motion.button>

                  <motion.button
                    onClick={() => router.push(`/products/${product.id}`)}
                    className="mt-4 px-6 py-2 w-full sm:w-auto bg-gradient-to-r from-indigo-500 to-purple-700 text-black rounded-lg shadow-[0_0_10px_rgba(255,255,255,0.7)] hover:bg-opacity-50 transition duration-300"
                  >
                    Review Product
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
