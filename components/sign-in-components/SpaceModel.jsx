// "use client"; // Ensure this component runs on the client-side
// import { useEffect, useRef } from "react"; // Import necessary hooks
// import { Canvas, useFrame, extend } from "@react-three/fiber"; // Import Canvas and useFrame from R3F
// import { OrbitControls } from "@react-three/drei"; // Import OrbitControls for camera manipulation
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"; // Import GLTFLoader for loading models

// // Extend R3F with the GLTFLoader
// extend({ GLTFLoader });

// // Component to load the GLTF model
// const SpaceModel = ({ url }) => {
//   const modelRef = useRef();

//   // Load model only when the URL changes
//   useEffect(() => {
//     const loader = new GLTFLoader();
//     loader.load(
//       url,
//       (gltf) => {
//         modelRef.current = gltf.scene; // Set the loaded model
//         modelRef.current.scale.set(1, 1, 1); // Adjust scale as needed
//         modelRef.current.position.set(0, 0, 0); // Adjust position as needed
//       },
//       undefined,
//       (error) => {
//         console.error("An error occurred while loading the model:", error); // Log any errors
//       }
//     );

//     return () => {
//       modelRef.current = null; // Cleanup model reference
//     };
//   }, [url]);

//   // Rotate the model in each frame
//   useFrame(() => {
//     if (modelRef.current) {
//       modelRef.current.rotation.y += 0.001; // Rotate model for effect
//     }
//   });

//   // Render the model if loaded
//   return modelRef.current ? <primitive object={modelRef.current} /> : null;
// };

// // Component to render the Canvas
// const SpaceModelCanvas = () => {
//   return (
//     <div className="relative w-full h-screen">
//       {" "}
//       {/* Ensures the canvas takes up the full screen */}
//       <Canvas
//         camera={{ position: [0, 0, 5] }} // Set initial camera position
//         style={{ width: "100%", height: "100%" }} // Set canvas to full screen
//         onCreated={({ gl }) => {
//           gl.setClearColor(0x000000, 1); // Set the background color of the canvas
//         }}
//       >
//         {/* Ambient light for basic illumination */}
//         <ambientLight intensity={0.5} />
//         {/* Point light for better visibility */}
//         <pointLight position={[1, 1, 1]} intensity={1} />
//         {/* Load the model from the specified URL */}
//         <SpaceModel url="/bg.glb" />
//         {/* Enable orbit controls for camera movement */}
//         <OrbitControls enableZoom={false} />
//       </Canvas>
//       {/* Optionally show loading text while the model is being loaded */}
//       <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white z-10">
//         {/* Loading text could be controlled by a state */}
//       </div>
//     </div>
//   );
// };

// export default SpaceModelCanvas; // Export the SpaceModelCanvas component
