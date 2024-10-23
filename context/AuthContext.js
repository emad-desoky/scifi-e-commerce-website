"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from "../init-firebase"; // Your Firebase initialization

const AuthContext = createContext();

// Provider component to wrap the app and manage the user state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Loading is done once the user state is known
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, [auth]);

  // If loading, you could show a loading spinner or something similar
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

// Hook to use the AuthContext in any component
export const useAuth = () => {
  return useContext(AuthContext);
};
