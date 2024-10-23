"use client";
import React from "react";
import { motion } from "framer-motion";
import { Button } from "../ui/button";

const Hero = () => {
  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-center text-white px-4 overflow-hidden z-10">
      {/* Sci-Fi Glowing HUD Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage:
            "url('https://cdn.vectorstock.com/i/1000v/01/28/synthwave-grid-background-80s-retro-future-vector-28200128.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4, // Adjust opacity to blend with content
          filter: "brightness(0.7) contrast(1.2)", // Optional for a futuristic effect
        }}
      ></div>

      {/* Deep Space Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 opacity-30 z-10"></div>

      {/* Starry Background */}
      <div className="absolute inset-0 bg-stars opacity-60 z-10"></div>

      {/* Hero Title with Dark Gradient */}
      <motion.h1
        className="relative z-20 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-purple-700 to-black drop-shadow-[0_0_15px_rgba(255,255,255,0.8)]"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Welcome to Our Space
      </motion.h1>

      {/* Hero Subtitle */}
      <motion.p
        className="relative z-20 mt-4 text-base sm:text-lg md:text-xl lg:text-2xl max-w-lg mx-auto text-blue-300 drop-shadow-[0_0_8px_rgba(0,183,255,0.8)]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Explore unique products inspired by the cosmos and elevate your style.
      </motion.p>

      {/* Buttons */}
      <div className="relative z-20 mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <Button className="px-6 py-2 sm:px-8 sm:py-3 bg-gradient-to-r from-indigo-500 to-purple-700 text-black rounded-lg shadow-[0_0_10px_rgba(255,255,255,0.7)] hover:bg-opacity-80 transition duration-300 transform hover:scale-110">
          Shop Now
        </Button>
        <Button className="px-6 py-2 sm:px-8 sm:py-3 bg-transparent border border-white text-white rounded-lg shadow-[0_0_10px_rgba(255,255,255,0.5)] hover:bg-violet hover:text-black transition duration-300 transform hover:scale-110">
          Explore Categories
        </Button>
      </div>
    </section>
  );
};

export default Hero;
