"use client";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./_components/CheckoutForm";
import { useSearchParams } from "next/navigation";
import { AuthProvider } from "../../context/AuthContext";
import NavBar from "../../components/navbar/NavBar";
import { motion } from "framer-motion";
import { Suspense } from "react";

// Load Stripe with your public key
const stripePromise = loadStripe(
  "pk_test_51QByq8Rx9JkW9yA5p9eVnTed1kffly6e40CZFKFbuhbH3wfgcCGvotZlwO3xXJDJvEmHzDvlMARcFXTOuzahWDaG00fhEefemA"
);

const Checkout = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CheckoutContent />
    </Suspense>
  );
};

const CheckoutContent = () => {
  const searchParams = useSearchParams();
  const amount = Number(searchParams.get("amount")) || 0;

  const roundedAmount = Math.round(amount);

  if (amount <= 0) {
    return (
      <div className="flex h-screen items-center justify-center text-red-500 text-2xl">
        Error: Invalid amount
      </div>
    );
  }

  const options = {
    mode: "payment",
    currency: "usd",
    amount: roundedAmount * 100, // Stripe requires the amount to be in cents
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-800 to-black">
      {/* Navbar */}
      <NavBar />

      {/* Checkout Section */}
      <div className="flex flex-col items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="bg-gradient-to-r from-indigo-900 via-purple-900 to-gray-900 p-10 rounded-lg shadow-lg max-w-lg w-full text-white"
        >
          <h1 className="text-4xl text-center font-bold mb-6">Checkout</h1>
          <Elements stripe={stripePromise} options={options}>
            <AuthProvider>
              <CheckoutForm amount={amount} />
            </AuthProvider>
          </Elements>
        </motion.div>
      </div>
    </div>
  );
};

export default Checkout;
