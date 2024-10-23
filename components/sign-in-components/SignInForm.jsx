"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import {
  getAuth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";
import app from "../../init-firebase"; // Firebase initialization
import SpaceModelCanvas from "./SpaceModelCanvas"; // Import your 3D model component
import TypingText from "./TypingText"; // Import your typing effect component

const InputField = ({ type, placeholder, value, setValue, index }) => (
  <div className="relative flex items-center">
    <input
      type={type}
      placeholder={placeholder}
      autoComplete="off"
      className="w-full bg-transparent border-b-2 border-gray-600 py-3 px-2 text-white placeholder-gray-400 outline-none focus:border-blue-500 transition-colors duration-300"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      required
    />
    <motion.span
      className="absolute right-0 bottom-0 w-5 h-5 bg-gradient-to-r from-blue-500 to-purple-700 rounded-full shadow-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: index * 0.2, duration: 0.8 }}
    />
  </div>
);

export default function SignInForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [resetEmailSent, setResetEmailSent] = useState(false);

  const auth = getAuth(app); // Use the initialized Firebase app here

  // Track the authentication state of the user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the user if already logged in
      } else {
        setUser(null); // Clear the user if logged out
      }
    });
    return () => unsubscribe(); // Clean up the listener when the component unmounts
  }, [auth]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setResetEmailSent(false); // Reset status when trying to log in

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user); // Set the logged-in user
      setError(""); // Clear any error on successful login
    } catch (error) {
      setError(error.message); // Display error message
    } finally {
      setLoading(false); // Stop loading animation
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      setError("Please enter your email to reset your password.");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setResetEmailSent(true);
      setError(""); // Clear error message on success
    } catch (error) {
      setError(error.message); // Display error message
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear the user after logging out
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      <SpaceModelCanvas />

      <motion.div
        className="relative bg-black bg-opacity-90 border border-gray-900 p-6 sm:p-8 md:p-10 lg:p-12 rounded-3xl shadow-lg w-11/12 max-w-md z-10 mx-auto mt-32"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-700 opacity-80 blur-lg rounded-3xl" />

        {user ? (
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Welcome, {user.email}!
            </h2>
            <motion.button
              onClick={handleLogout}
              className="relative w-full mt-8 py-3 px-6 text-white font-bold uppercase rounded-lg shadow-xl bg-gradient-to-r from-red-500 to-red-700 hover:from-red-400 hover:to-red-600"
              whileHover={{ scale: 1.05 }}
            >
              Sign Out
            </motion.button>
          </div>
        ) : (
          <>
            <h2 className="relative text-3xl sm:text-4xl font-bold text-center text-white mb-6 tracking-widest uppercase">
              Sign In
            </h2>

            {error && (
              <motion.p
                className="text-red-500 text-sm mb-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {error}
              </motion.p>
            )}

            {resetEmailSent && (
              <motion.p
                className="text-green-500 text-sm mb-4 text-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                Password reset email sent! Check your inbox.
              </motion.p>
            )}

            <form onSubmit={handleLogin} className="relative space-y-6">
              {[
                {
                  placeholder: "Email",
                  type: "text",
                  value: email,
                  setValue: setEmail,
                },
                {
                  placeholder: "Password",
                  type: "password",
                  value: password,
                  setValue: setPassword,
                },
              ].map((field, index) => (
                <InputField
                  key={index}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={field.value}
                  setValue={field.setValue}
                  index={index}
                />
              ))}

              <motion.button
                type="submit"
                className={`relative w-full mt-8 py-3 px-6 text-white font-bold uppercase rounded-lg shadow-xl transition-transform duration-300 hover:scale-105 ${
                  loading
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-700 hover:from-blue-500 hover:to-purple-500"
                }`}
                whileHover={!loading ? { scale: 1.05 } : {}}
                disabled={loading}
              >
                {loading ? (
                  <motion.div
                    className="w-5 h-5 border-4 border-t-transparent border-white rounded-full animate-spin mx-auto"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                  />
                ) : (
                  "Sign In"
                )}
              </motion.button>

              <motion.button
                type="reset"
                onClick={handlePasswordReset}
                className="mt-4 w-full text-sm text-blue-400 hover:underline"
                whileHover={{ scale: 1.05 }}
              >
                Forgot your password?
              </motion.button>
            </form>
          </>
        )}

        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <motion.div
            className="w-full h-full bg-[url('/path-to-your-stars-image.png')] bg-no-repeat bg-cover opacity-20"
            animate={{ opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </div>
      </motion.div>

      <TypingText />
    </div>
  );
}
