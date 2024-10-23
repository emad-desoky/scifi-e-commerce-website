"use client";
import React from "react";
import { FaTwitter, FaInstagram, FaFacebookF, FaLinkedinIn } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="w-full bg-[rgb(43,43,43,0.4)] text-white py-10 relative z-20 shadow-blue-600 shadow-lg"
      initial={{ opacity: 1, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Gradient Lamp Animation */}
      <div className="absolute inset-x-0 flex justify-center mt-4 z-0">
        {/* First Lamp Motion Div */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-violet-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top] z-0"
        />
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-violet-500 text-white [--conic-position:from_290deg_at_center_top] z-0"
        />
      </div>

      {/* Footer Content */}
      <div className="max-w-7xl mx-auto px-4 mt-20 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left space-y-6 md:space-y-0">
          {/* Brand Section */}
          <div className="flex-1 mb-6 md:mb-0">
            <motion.div
              className="text-4xl font-bold mb-2 cursor-pointer bg-gradient-to-r from-gray-500 via-purple-700 to-gray-900 bg-clip-text text-transparent"
              whileHover={{ scale: 1.1, rotate: 15 }}
            >
              Space E-Commerce
            </motion.div>
            <p className="drop-shadow-md mb-4 text-sm md:text-base">
              Your one-stop shop for all things space and sci-fi!
            </p>
            <p className="text-xs md:text-sm text-gray-400">
              © {new Date().getFullYear()} by ZeroBytes. All Rights Reserved.
            </p>
          </div>

          {/* Links Section */}
          <div className="flex-1 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 drop-shadow-md">
              Links
            </h4>
            <ul className="space-y-3">
              {["Products", "About Us", "Contact", "FAQ", "Blog", "Careers"].map((link) => (
                <li key={link}>
                  <motion.a
                    href={`#${link.toLowerCase().replace(" ", "")}`}
                    className="hover:underline transition duration-300 text-lg md:text-base"
                    whileHover={{
                      scale: 1.1,
                      textShadow: "0px 0px 8px rgba(255,255,255,0.8)",
                      color: "#60a5fa",
                    }}
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media Section */}
          <div className="flex-1 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 drop-shadow-md">
              Follow Us
            </h4>
            <div className="flex justify-center space-x-4 mb-4">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="text-2xl hover:text-blue-400 transition duration-300" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-2xl hover:text-pink-400 transition duration-300" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="text-2xl hover:text-blue-600 transition duration-300" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn className="text-2xl hover:text-blue-500 transition duration-300" />
              </a>
            </div>
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 w-full md:w-64 rounded-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>
        </div>

        {/* Additional Sections */}
        <div className="flex flex-col md:flex-row justify-between mt-10 space-y-6 md:space-y-0">
          {/* Newsletter Section */}
          <div className="flex-1 mb-6 md:mb-0">
            <h4 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 drop-shadow-md">
              Subscribe to Our Newsletter
            </h4>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 w-full rounded-l-lg bg-gray-800 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-r-lg bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:opacity-80 transition duration-300 shadow-lg"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Contact Section */}
          <div className="flex-1 mb-6 md:mb-0 text-right">
            <h4 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 drop-shadow-md">
              Contact Us
            </h4>
            <p className="mb-2 text-sm md:text-base">Email: support@spaceecommerce.com</p>
            <p className="mb-2 text-sm md:text-base">Phone: (123) 456-7890</p>
            <p className="mb-2 text-sm md:text-base">Address: 123 Galaxy St, Space City, SP 12345</p>
          </div>
        </div>

        {/* Additional Features */}
        <div className="flex justify-center space-x-6 mt-10 flex-wrap">
          <a href="#terms" className="text-sm hover:underline text-gray-400">
            Terms of Service
          </a>
          <a href="#privacy" className="text-sm hover:underline text-gray-400">
            Privacy Policy
          </a>
          <a href="#help" className="text-sm hover:underline text-gray-400">
            Help Center
          </a>
          <a href="#shipping" className="text-sm hover:underline text-gray-400">
            Shipping Info
          </a>
          <a href="#returns" className="text-sm hover:underline text-gray-400">
            Returns Policy
          </a>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
