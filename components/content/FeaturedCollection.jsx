"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import useFetch from "../../hooks/useFetch";
import Countdown from "react-countdown";
import { Swiper, SwiperSlide } from "swiper/react"; // Import Swiper components
import { Navigation, Pagination } from "swiper/modules"; // Import necessary modules
import "swiper/css"; // Import core styles
import "swiper/css/navigation"; // Import navigation styles
import "swiper/css/pagination"; // Import pagination styles

const FeaturedSpaceMissions = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const { data, isLoading, error } = useFetch(
    "GET",
    "/api/products",
    "products"
  );

  useEffect(() => {
    if (data && data.products) {
      const filtered = data.products.filter((product) => product.rating >= 4.0);
      setFeaturedProducts(filtered);
    }
  }, [data]);

  if (isLoading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-red-500 text-center">
        Error fetching featured products: {error.message}
      </div>
    );
  }

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <span className="text-red-400">Offer Expired!</span>;
    } else {
      return (
        <span className="text-lg text-blue-500">
          {hours}h {minutes}m {seconds}s
        </span>
      );
    }
  };

  return (
    <section className="relative py-12 px-4 md:px-8">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 opacity-30 animate-gradient-x z-0"></div>
      <motion.h2
        className="text-4xl md:text-5xl text-white text-center mb-8 z-10 relative"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        Explore the Galaxy Collection
      </motion.h2>

      <div className="mb-8 text-lg md:text-2xl text-center text-gray-300 z-10 relative">
        <p>Check out our featured space missions and special offers!</p>
      </div>

      <Swiper
        spaceBetween={20}
        slidesPerView={1} // Mobile default: 1 slide per view
        breakpoints={{
          640: { slidesPerView: 2 }, // 2 slides for screens larger than 640px
          1024: { slidesPerView: 3 }, // 3 slides for screens larger than 1024px
          1280: { slidesPerView: 4 }, // 4 slides for large screens
        }}
        navigation
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination]}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {featuredProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <motion.div
              className="relative bg-gray-800 p-4 md:p-6 shadow-lg transition-all duration-300 overflow-hidden border-4 border-x-blue-500 border-y-violet-500 rounded-3xl h-[500px] md:h-[570px]"
              whileHover={{
                boxShadow: "0 0 20px rgba(255,255,255,0.8)",
                filter: "brightness(1.1)",
              }}
            >
              {product.onSale && (
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  On Sale!
                </div>
              )}
              <div className="relative h-36 md:h-48 w-full mb-4 md:mb-6 overflow-hidden">
                <Image
                  src={
                    product.images[0].startsWith("http")
                      ? product.images[0]
                      : `https://${product.images[0]}`
                  }
                  alt={product.title}
                  width={500}
                  height={300}
                  layout="responsive"
                  objectFit="cover"
                  loading="lazy"
                />
              </div>
              <h2 className="text-xl md:text-2xl font-bold text-zinc-300 mb-2">
                {product.title}
              </h2>
              <div className="flex items-center mb-2">
                <span className="text-violet-400">
                  {"★".repeat(Math.floor(product.rating))}
                  {product.rating % 1 ? "☆" : ""}
                </span>
                <span className="ml-2 text-zinc-400">({product.rating})</span>
              </div>
              <p className="text-lg text-blue-300">
                ${product.price.toFixed(2)}
              </p>
              <div className="mt-4 text-yellow-400">
                <Countdown
                  date={Date.now() + 1000 * 60 * 60 * 24}
                  renderer={renderer}
                />
              </div>
              <motion.button className="mt-4 px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-700 text-white rounded-lg shadow-[0_0_10px_rgba(255,255,255,0.7)] hover:bg-opacity-80 transition duration-300">
                Add to Cart
              </motion.button>
              <motion.button className="mt-2 w-full px-6 py-2 border border-white text-white rounded-lg transition duration-300 hover:bg-white hover:text-black">
                Quick View
              </motion.button>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeaturedSpaceMissions;
