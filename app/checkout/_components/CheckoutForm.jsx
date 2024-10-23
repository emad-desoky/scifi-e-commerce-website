import { PaymentElement } from "@stripe/react-stripe-js";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useAuth } from "../../../context/AuthContext"; // Import the hook
import { motion } from "framer-motion";

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState();
  const { user } = useAuth(); // Get the current user

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    const order = {
      userId: user.id,
      items: cartItems.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        total: item.price * item.quantity,
        availabilityStatus: item.availabilityStatus,
        brand: item.brand,
        category: item.category,
        description: item.description,
        images: item.images,
      })),
      amount: amount,
      date: new Date().toISOString(),
    };

    localStorage.setItem("order", JSON.stringify(order));
    localStorage.removeItem("cart");

    sendEmail();
    const { error: submitError } = await elements.submit();
    if (submitError) {
      const messageContainer = document.querySelector("#error-message");
      messageContainer.textContent = submitError.message;
      return;
    }

    const res = await fetch("/api/create-intent", {
      method: "POST",
      body: JSON.stringify({
        amount: amount,
      }),
    });

    const { clientSecret } = await res.json();
    const result = await stripe.confirmPayment({
      clientSecret,
      elements,
      confirmParams: {
        return_url: "https://duoe-portfolio-e-commerce.vercel.app/payment-confirm",
      },
    });

    if (result.error) {
      console.log(result.error.message);
    } else {
      console.log("Payment successful!");
    }
  };

  const sendEmail = async () => {
    const res = await fetch("api/send-email", {
      method: "post",
    });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="mx-4 md:mx-[320px] mt-12 w-[500px] space-y-6">
        <motion.div
          className="p-6 rounded-lg shadow-lg bg-gradient-to-r from-indigo-900 via-purple-900 to-gray-900 text-white"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-xl font-bold text-center mb-4">
            Complete Your Payment
          </h2>
          <PaymentElement className="mb-4" />
          {errorMessage && (
            <div id="error-message" className="text-red-500 text-sm">
              {errorMessage}
            </div>
          )}
        </motion.div>

        <motion.button
          whileHover={{
            scale: 1.1,
            backgroundColor: "#00E0FF",
            boxShadow: "0px 0px 15px #00E0FF",
          }}
          whileTap={{ scale: 0.95 }}
          className="w-full mt-4 p-2 text-white rounded-md bg-gradient-to-r from-violet-800 to-blue-800 shadow-lg hover:shadow-cyan-500/50 transition-all duration-300"
        >
          Submit Payment
        </motion.button>
      </div>
    </motion.form>
  );
};

export default CheckoutForm;
