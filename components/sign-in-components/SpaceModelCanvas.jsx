"use client"; // Ensure this component runs on the client-side
import { useEffect, useRef, useState, memo } from "react"; // Import necessary hooks
import { Canvas, useFrame } from "@react-three/fiber"; // Import Canvas and useFrame from R3F
import { OrbitControls } from "@react-three/drei"; // Import OrbitControls for camera manipulation
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // Import GLTFLoader for loading models

// Component to load the GLTF model
const SpaceModel = memo(({ url, onLoad }) => {
  const modelRef = useRef();

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(
      url,
      (gltf) => {
        modelRef.current = gltf.scene; // Set the loaded model
        modelRef.current.scale.set(1, 1, 1); // Adjust scale as needed
        modelRef.current.position.set(0, 0, 0); // Adjust position as needed
        onLoad(); // Notify parent component that loading is complete
      },
      undefined,
      (error) => {
        console.error("An error happened:", error); // Log any errors
      }
    );
  }, [url, onLoad]);

  // Rotate the model in each frame
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.001; // Rotate model for effect
    }
  });

  // Render the model if loaded
  return modelRef.current ? <primitive object={modelRef.current} /> : null;
});

// Set display name for debugging purposes
SpaceModel.displayName = "SpaceModel";

// Component to render the Canvas
const SpaceModelCanvas = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      <Canvas
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100vh", // Set height to viewport height
          width: "100vw", // Set width to viewport width
          zIndex: 0,
        }} // Set canvas to full screen
        camera={{ position: [0, 0, 5] }} // Set initial camera position
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 1); // Set the background color of the canvas
        }}
      >
        {/* Ambient light for basic illumination */}
        <ambientLight intensity={0.5} />
        {/* Point light for better visibility */}
        <pointLight position={[10, 10, 10]} intensity={1} />
        {/* Load the model from the specified URL */}
        <SpaceModel url="/bg.glb" onLoad={() => setLoading(false)} />
        {/* Enable orbit controls for camera movement */}
        <OrbitControls enableZoom={false} />
      </Canvas>
      {/* Show loading text while the model is being loaded */}
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            zIndex: 10,
            textAlign: "center", // Center the text horizontally
            fontSize: "1.5rem", // Adjust font size for better visibility
            padding: "1rem", // Add some padding
          }}
        >
          <span>Loading...</span>
        </div>
      )}
    </>
  );
};

// Set display name for debugging purposes
SpaceModelCanvas.displayName = "SpaceModelCanvas";

export default SpaceModelCanvas; // Export the SpaceModelCanvas component
