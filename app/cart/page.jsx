"use client";
import React from "react";
import NavBar from "../../components/navbar/NavBar";
import CartContent from "../../components/cart-components/CartContent";
import Background from "../../components/cart-components/BackGround"; // Adjust the path as necessary
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "../../context/AuthContext"; // Import the AuthContext

const Page = () => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Background /> {/* Add the Background component here */}
      <NavBar />
      <AuthProvider>
        <CartContent />
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default Page;
