"use client";
import React from "react";

const Background = () => {
  return (
    <div className="fixed inset-0 z-[-1]">
      <img
        src="/cart.jpg" // Replace with your image path in the public directory
        alt="Background"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default Background;
