"use client";
import { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model"; // Adjust the import path based on your file structure
import { motion } from "framer-motion"; // Import Framer Motion

const ModelSection = () => {
  const modelRef = useRef();

  // Function to handle mouse movement and rotate the model
  const handleMouseMove = (event) => {
    const { clientX, clientY } = event;
    const x = (clientX / window.innerWidth) * 2 - 1; // Normalize to -1 to 1
    const y = -(clientY / window.innerHeight) * 2 + 1; // Normalize to -1 to 1

    if (modelRef.current) {
      // Rotate the model based on mouse position
      modelRef.current.rotation.y = x * Math.PI; // Control left-right rotation
      modelRef.current.rotation.x = (y * Math.PI) / 2; // Control up-down rotation
    }
  };

  return (
    <div
      className="flex flex-col lg:flex-row h-[600px] relative overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Background with gradient and animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-purple-900 to-blue-900 opacity-60 animate-gradient-x"></div>

      {/* Left Side for 3D Model */}
      <div className="flex-1 flex justify-center items-end relative">
        {/* Floating Glow Animation around the model */}
        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 opacity-90 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
          style={{ zIndex: -1 }}
        />
        <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[1, 1, 1]} />
          <Model
            url="/scooter.glb"
            position={[0, -2, 0]} // Lower the model
            scale={[2, 2, 2]} // Scale as needed
          />
          <OrbitControls />
        </Canvas>
      </div>

      {/* Right Side for Sale Information */}
      <div className="flex-1 flex flex-col justify-center items-center p-4 text-white space-y-6 z-10 lg:items-start lg:pl-12">
        <motion.div
          className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-400 glow-text"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🚀 Sci-Fi Scooter Sale!
        </motion.div>
        <motion.div
          className="text-6xl sm:text-7xl font-extrabold text-red-500 glow-text"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          50% OFF!
        </motion.div>
        <motion.p
          className="text-base sm:text-lg text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          Unlock intergalactic adventures with the latest scooter tech.
        </motion.p>
        <motion.button
          className="mt-6 px-6 sm:px-8 py-3 bg-purple-700 hover:bg-purple-600 text-white rounded-full transition duration-300 shadow-lg hover:shadow-purple-500/50"
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05, backgroundColor: "#6C63FF" }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          Get Your Ride Now
        </motion.button>

        {/* Futuristic floating sale tag */}
        <motion.div
          className="absolute top-6 right-6 px-4 sm:px-6 py-1 sm:py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-base sm:text-lg font-bold text-white rounded-full shadow-lg glow-text"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          🚀 50% Off - Limited Time!
        </motion.div>
      </div>

      {/* Floating Star Animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{
          duration: 2,
          yoyo: Infinity,
          ease: "easeInOut",
        }}
        style={{ pointerEvents: "none" }} // Prevent interaction
      >
        <div className="w-full h-full bg-black bg-opacity-40">
          <div className="absolute top-0 left-0 right-0 bottom-0 bg-[url('/twinkling-stars.gif')] bg-cover opacity-30"></div>
        </div>
      </motion.div>
    </div>
  );
};

ModelSection.displayName = "ModelSection";

export default ModelSection;
