"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import Image from "next/image";
import useFetch from "../../hooks/useFetch";
import ProductModal from "./ProductModal";

const Products = () => {
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const productsPerPage = 6;

  const { data, isLoading, error } = useFetch(
    "GET",
    "/api/products",
    "products"
  );

  if (isLoading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error fetching products: {error.message}
      </div>
    );
  }

  const filteredProducts = data.products.filter((product) => {
    if (filter === "On Sale") return product.discountPercentage > 0;
    if (filter === "High Rating") return product.rating >= 4;
    return true;
  });

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const handleQuickView = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const handleAddToCart = (product) => {
    // Get existing cart from local storage or initialize an empty array
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    // Check if the product is already in the cart
    const isProductInCart = existingCart.some((item) => item.id === product.id);

    if (!isProductInCart) {
      // Add product to cart
      existingCart.push(product);
      // Update local storage
      localStorage.setItem("cart", JSON.stringify(existingCart));
      alert("Product added to cart!");
    } else {
      alert("Product is already in the cart.");
    }
  };

  return (
    <section className="relative h-full w-full max-w-full overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 opacity-30 animate-gradient-x"></div>

      <motion.h1
        className="text-3xl sm:text-4xl lg:text-5xl text-white text-center mb-8"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        Featured Products
      </motion.h1>

      <motion.div
        className="flex flex-wrap justify-center mb-12 space-x-2 sm:space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.3 }}
      >
        <button
          onClick={() => setFilter("All")}
          className="px-4 sm:px-6 py-2 bg-gradient-to-r from-indigo-800 to-purple-400 text-black rounded-lg shadow-md hover:bg-opacity-80 transition duration-300 transform hover:scale-110"
        >
          All
        </button>
        <button
          onClick={() => setFilter("On Sale")}
          className="px-4 sm:px-6 py-2 bg-gradient-to-r from-indigo-800 to-purple-400 text-black rounded-lg shadow-md hover:bg-opacity-80 transition duration-300 transform hover:scale-110"
        >
          On Sale
        </button>
        <button
          onClick={() => setFilter("High Rating")}
          className="px-4 sm:px-6 py-2 bg-gradient-to-r from-indigo-800 to-purple-400 text-black rounded-lg shadow-md hover:bg-opacity-80 transition duration-300 transform hover:scale-110"
        >
          High Rating
        </button>
      </motion.div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: {
              delayChildren: 0.5,
              staggerChildren: 0.2,
            },
          },
        }}
      >
        {currentProducts.map((product) => (
          <motion.div
            key={product.id}
            className="relative bg-gray-900 p-4 sm:p-6 shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.6)] transition-all duration-300 overflow-hidden border-4 border-x-blue-500 border-y-violet-500 rounded-3xl"
            whileHover={{ scale: 1.05, y: -10 }}
            variants={{
              hidden: { opacity: 0, y: 50 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            {product.discountPercentage > 0 && (
              <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                Sale
              </div>
            )}
            <div className="relative h-36 sm:h-48 w-full mb-36 p-2">
              <Image
                src={product.images[0]}
                alt={product.title}
                width={500}
                height={500}
                layout="responsive"
                loading="lazy"
              />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-zinc-400 mb-2 sm:mb-4 drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">
              {product.title}
            </h2>
            <p className="text-lg sm:text-xl text-blue-300 drop-shadow-[0_0_8px_rgba(0,183,255,0.8)]">
              ${product.price.toFixed(2)}
            </p>
            <div className="flex items-center mb-2 sm:mb-4">
              {Array(Math.round(product.rating))
                .fill(0)
                .map((_, index) => (
                  <FaStar key={index} className="text-violet-400 mr-1" />
                ))}
            </div>
            <motion.button
              onClick={() => handleAddToCart(product)} // Add to cart
              className="mt-2 sm:mt-4 px-4 sm:px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-700 text-black rounded-lg shadow-md hover:bg-opacity-80 hover:scale-105 transition duration-300"
            >
              Add to Cart
            </motion.button>
            <motion.button
              onClick={() => handleQuickView(product)} // Open modal on click
              className="mt-2 sm:mt-2 px-3 sm:px-4 py-2 bg-transparent border border-black text-white rounded-lg shadow-[0_0_10px_rgba(255,255,255,0.5)] hover:bg-white hover:text-black transition duration-300 transform hover:scale-105"
            >
              Quick View
            </motion.button>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        className="flex justify-center mt-6 sm:mt-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.7 }}
      >
        {Array.from({ length: totalPages }, (_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`mx-1 sm:mx-2 px-2 sm:px-4 py-2 rounded-lg transition duration-300 ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-700 text-white"
            }`}
            whileHover={{ scale: 1.1 }}
          >
            {index + 1}
          </motion.button>
        ))}
      </motion.div>

      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
    </section>
  );
};

export default Products;
