"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import app from "../../init-firebase"; // Firebase initialization

const SignUpForm = () => {
  const [message, setMessage] = useState(null); // State for success/error message
  const [isError, setIsError] = useState(false); // State to track if message is an error
  const auth = getAuth(app); // Initialize Firebase auth

  async function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);
    const { fullName, email, password, confirmPassword } = Object.fromEntries(
      formData.entries()
    );

    // Clear any previous message
    setMessage(null);

    if (password !== confirmPassword) {
      setIsError(true);
      setMessage("Passwords do not match.");
      return;
    }

    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User created:", userCredential.user);
      setIsError(false);
      setMessage("Sign up successful.");
      // Handle successful signup (e.g., store full name in the database)
    } catch (error) {
      console.error("Error signing up:", error.message);
      setIsError(true);
      setMessage("Error signing up: " + error.message);
    }
  }

  return (
    <div
      className="relative min-h-screen flex items-center justify-center bg-black bg-cover bg-center"
      style={{ backgroundImage: `url('/test4.jpg')` }} // Space-themed background
    >
      <div className="absolute flex items-center justify-between w-full bottom-6 top-6">
        <motion.div
          className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full shadow-lg"
          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ marginRight: "auto", marginLeft: "2rem" }} // Adjust spacing as needed
        />
        <motion.div
          className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full shadow-lg"
          animate={{ scale: [1, 1.1, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ marginLeft: "auto", marginRight: "2rem" }} // Adjust spacing as needed
        />
      </div>

      <motion.div
        className="relative bg-black bg-opacity-90 border border-gray-900 p-8 sm:p-10 md:p-12 rounded-3xl shadow-lg w-11/12 max-w-lg"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-700 opacity-80 blur-lg rounded-3xl"></div>

        <h2 className="relative text-3xl sm:text-4xl font-bold text-center text-white mb-6 tracking-widest uppercase">
          Create Account
        </h2>

        {/* Conditional message rendering */}
        {message && (
          <motion.div
            className={`relative text-center mb-4 text-lg font-semibold ${
              isError ? "text-red-500" : "text-green-500"
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {message}
          </motion.div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative space-y-6">
          {/* Full Name */}
          <div className="relative flex items-center">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              autoComplete="off"
              required
              className="w-full bg-transparent border-b-2 border-gray-600 py-3 px-2 text-white placeholder-gray-400 outline-none focus:border-blue-500 transition-colors duration-300"
            />
            <motion.span
              className="absolute right-0 bottom-0 w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-700 rounded-full shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
          </div>

          {/* Email */}
          <div className="relative flex items-center">
            <input
              type="email"
              name="email"
              placeholder="Email"
              autoComplete="off"
              required
              className="w-full bg-transparent border-b-2 border-gray-600 py-3 px-2 text-white placeholder-gray-400 outline-none focus:border-blue-500 transition-colors duration-300"
            />
            <motion.span
              className="absolute right-0 bottom-0 w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-700 rounded-full shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
          </div>

          {/* Password */}
          <div className="relative flex items-center">
            <input
              type="password"
              name="password"
              placeholder="Password"
              autoComplete="off"
              required
              minLength={6}
              className="w-full bg-transparent border-b-2 border-gray-600 py-3 px-2 text-white placeholder-gray-400 outline-none focus:border-blue-500 transition-colors duration-300"
              onFocus={(e) =>
                e.target.setAttribute("autocomplete", "new-password")
              }
            />
            <motion.span
              className="absolute right-0 bottom-0 w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-700 rounded-full shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
          </div>

          {/* Confirm Password */}
          <div className="relative flex items-center">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              autoComplete="off"
              required
              minLength={6}
              className="w-full bg-transparent border-b-2 border-gray-600 py-3 px-2 text-white placeholder-gray-400 outline-none focus:border-blue-500 transition-colors duration-300"
              onFocus={(e) =>
                e.target.setAttribute("autocomplete", "new-password")
              }
            />
            <motion.span
              className="absolute right-0 bottom-0 w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-700 rounded-full shadow-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            />
          </div>

          <motion.button
            type="submit" // Set button type to submit
            className="relative w-full mt-8 py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold uppercase rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 hover:from-blue-500 hover:to-purple-500"
            whileHover={{ scale: 1.05 }}
          >
            Sign Up
          </motion.button>
        </form>

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <motion.div
            style={{ marginBottom: "50px" }}
            animate={{ opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default SignUpForm;
