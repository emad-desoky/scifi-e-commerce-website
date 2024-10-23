"use client";
import { useEffect, useRef, useState } from "react"; // Import useState
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // Import the GLTFLoader
import { useFrame } from "@react-three/fiber";

const Model = ({ url, position, scale }) => {
  const modelRef = useRef();
  const [isLoaded, setIsLoaded] = useState(false); // State to track loading

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(url, (gltf) => {
      modelRef.current = gltf.scene;
      modelRef.current.position.set(...position);
      modelRef.current.scale.set(...scale);
      modelRef.current.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true; // Enable shadows for the model
          child.receiveShadow = true; // Enable shadows for the model
        }
      });
      setIsLoaded(true); // Set loading to true after loading
    });

    return () => {
      // Clean up when the component unmounts
      modelRef.current = null;
    };
  }, [url, position, scale]);

  // Animation loop for rotation
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.01; // Spin the model
    }
  });

  return isLoaded ? <primitive object={modelRef.current} /> : null; // Render primitive only when loaded
};

// Set the display name for the Model component
Model.displayName = "Model";

export default Model;
