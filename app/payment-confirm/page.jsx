"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import NavBar from "../../components/navbar/NavBar";
import { motion } from "framer-motion"; // Import Framer Motion for animations

const page = () => {
  return (
    <>
      <NavBar />
      {/* Main container */}
      <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-purple-900 flex flex-col items-center justify-center py-12 px-4">
        {/* Success Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image src="/verified11.gif" alt="check" width={150} height={150} />
        </motion.div>

        {/* Success Message */}
        <motion.h2
          className="text-[28px] font-extrabold text-white mt-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Payment Successful!
        </motion.h2>

        {/* Confirmation Text */}
        <motion.p
          className="text-[18px] text-center mt-4 text-gray-300 max-w-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          Weve sent you an email with your order confirmation and digital
          content. Thank you for your purchase!
        </motion.p>

        {/* Go To Home Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Link href="/">
            <button className="mt-8 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full shadow-md hover:shadow-lg hover:from-blue-500 hover:to-cyan-500 transition-all duration-300 ease-in-out">
              Go to Home
            </button>
          </Link>
        </motion.div>
      </div>
    </>
  );
};

export default page;
