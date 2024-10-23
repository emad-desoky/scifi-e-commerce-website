"use client";
import { useState, useEffect } from "react"; // Import useEffect
import { motion } from "framer-motion";
import { FaBars, FaTimes, FaShoppingCart, FaHeart } from "react-icons/fa"; // Importing icons for the menu, cart, and wishlist
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../../init-firebase"; // Firebase initialization
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for managing menu open/close
  const [user, setUser] = useState(null); // State for user authentication
  const router = useRouter();
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen); // Toggle function for the menu

  const auth = getAuth(app); // Use the initialized Firebase app here

  // Check for user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe(); // Cleanup subscription on unmount
  }, [auth]);

  const handleSignOut = () => {
    auth.signOut(); // Sign out the user
  };

  return (
    <motion.nav
      className="w-full h-16 bg-gradient-to-r from-blue-900 to-purple-900 text-white flex items-center justify-between px-4 md:px-6 lg:px-8 shadow-lg shadow-violet-600"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Logo on the left */}
      <motion.div
        className="text-xl sm:text-2xl font-bold cursor-pointer bg-gradient-to-r from-gray-500 via-purple-700 to-gray-900 bg-clip-text text-transparent"
        whileHover={{ scale: 1.1, rotate: 15 }}
        onClick={() => router.push("/")}
      >
        Space E-Commerce
      </motion.div>

      {/* Hamburger Menu Icon for small screens */}
      <div className="sm:hidden">
        <motion.button
          onClick={toggleMenu}
          className="text-3xl focus:outline-none"
          whileHover={{ scale: 1.1 }}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}{" "}
          {/* Toggle between open and close icons */}
        </motion.button>
      </div>

      {/* Navigation Links for larger screens */}
      <motion.ul
        className="hidden sm:flex space-x-4 md:space-x-6 lg:space-x-8 text-sm md:text-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {[
          "Home",
          "About",
          "Galactic Goods",
          "Starship Registration",
          "Cosmic Blog",
        ].map((item, index) => (
          <motion.li
            key={index}
            whileHover={{
              scale: 1.1,
              textShadow: "0px 0px 8px rgba(255,255,255,0.8)",
            }}
            className="cursor-pointer hover:text-blue-400"
          >
            {item}
          </motion.li>
        ))}
      </motion.ul>

      {/* Authentication Area - visible on all screen sizes */}
      <motion.div
        className="flex space-x-2 md:space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        {user ? (
          <>
            <motion.button
              className="px-2 py-1 text-sm md:px-4 md:py-2 border border-blue-400 text-blue-400 rounded hover:bg-gradient-to-r from-blue-500 to-blue-300 hover:text-black transition duration-300"
              whileHover={{ scale: 1.05 }}
              onClick={handleSignOut} // Sign out button
            >
              Sign Out
            </motion.button>
            <motion.button
              className="flex items-center space-x-2 px-2 py-1 text-sm md:px-4 md:py-2 border border-blue-400 text-blue-400 rounded hover:bg-gradient-to-r from-blue-500 to-blue-300 hover:text-black transition duration-300"
              whileHover={{ scale: 1.05 }}
              onClick={() => router.push("/cart")}
            >
              <FaShoppingCart />
              <span>Cart</span>
            </motion.button>
            <motion.button
              className="flex items-center space-x-2 px-2 py-1 text-sm md:px-4 md:py-2 border border-blue-400 text-blue-400 rounded hover:bg-gradient-to-r from-blue-500 to-blue-300 hover:text-black transition duration-300"
              whileHover={{ scale: 1.05 }}
              onClick={() => router.push("/orders")}
            >
              <WorkspacePremiumIcon />
              <span>MY ORDERS</span>
            </motion.button>
          </>
        ) : (
          <>
            <motion.button
              className="flex items-center space-x-2 px-2 py-1 text-sm md:px-4 md:py-2 border border-blue-400 text-blue-400 rounded hover:bg-gradient-to-r from-blue-500 to-blue-300 hover:text-black transition duration-300"
              whileHover={{ scale: 1.05 }}
              onClick={() => router.push("/cart")}
            >
              <FaShoppingCart />
              <span>Cart</span>
            </motion.button>
            <motion.button
              className="px-2 py-1 text-sm md:px-4 md:py-2 border border-blue-400 text-blue-400 rounded hover:bg-gradient-to-r from-blue-500 to-blue-300 hover:text-black transition duration-300"
              whileHover={{ scale: 1.05 }}
              onClick={() => router.push("/sign-in")}
            >
              Sign In
            </motion.button>
            <motion.button
              className="px-2 py-1 text-sm md:px-4 md:py-2 bg-gradient-to-r from-blue-500 to-blue-700 text-black rounded hover:bg-blue-500 transition duration-300"
              whileHover={{ scale: 1.05 }}
              onClick={() => router.push("/sign-up")}
            >
              Sign Up
            </motion.button>
          </>
        )}
      </motion.div>

      {/* Mobile menu for small screens */}
      <motion.div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-16 left-0 w-full bg-gradient-to-r from-blue-900 to-purple-900 text-white sm:hidden shadow-lg`}
        initial={{ opacity: 0 }}
        animate={{ opacity: isMenuOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <motion.ul
          className="flex flex-col space-y-4 p-4 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isMenuOpen ? 1 : 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
        >
          {[
            "Home",
            "About",
            "Galactic Goods",
            "Starship Registration",
            "Cosmic Blog",
          ].map((item, index) => (
            <motion.li
              key={index}
              whileHover={{
                scale: 1.1,
                textShadow: "0px 0px 8px rgba(255,255,255,0.8)",
              }}
              className="cursor-pointer hover:text-blue-400"
              onClick={toggleMenu} // Close the menu when clicking on a link
            >
              {item}
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </motion.nav>
  );
};

export default NavBar;
