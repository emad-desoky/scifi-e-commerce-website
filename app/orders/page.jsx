"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../../components/navbar/NavBar";

const OrdersPage = () => {
  const [orderData, setOrderData] = useState(null);

  useEffect(() => {
    // Retrieve order data from local storage only on the client side
    const storedOrderData = localStorage.getItem("order");
    if (storedOrderData) {
      setOrderData(JSON.parse(storedOrderData));
    }
  }, []);

  if (!orderData) {
    return (
      <div className="flex items-center justify-center h-screen text-lg text-gray-700">
        <p>No orders found.</p>
      </div>
    );
  }

  return (
    <>
      <NavBar />
      <div className="min-h-screen bg-gradient-to-r from-gray-900 via-purple-800 to-blue-900 p-8">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          Your Order Details
        </h1>
        <div className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-lg p-6">
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-white">Order Summary</h2>
            <p className="text-lg text-gray-300">
              Order Date: {new Date(orderData.date).toLocaleString()}
            </p>
            <p className="text-lg text-gray-300">
              Total Amount: ${orderData.amount.toFixed(2)}
            </p>
          </div>

          <h3 className="text-xl font-semibold text-white">Items:</h3>
          <ul className="space-y-4 mt-4">
            {orderData.items.map((item) => (
              <li
                key={item.id}
                className="flex items-center bg-gray-700 rounded-md p-4"
              >
                <img
                  src={item.images[0]} // Displaying the first image
                  alt={item.title}
                  className="h-20 w-20 object-cover rounded-md mr-4"
                />
                <div className="flex-grow">
                  <h4 className="text-lg font-semibold text-white">
                    {item.title}
                  </h4>
                  <p className="text-gray-300">Brand: {item.brand}</p>
                  <p className="text-gray-300">
                    Price: ${item.price.toFixed(2)}
                  </p>
                  <p className="text-gray-300">Quantity: {item.quantity}</p>
                  <p className="text-gray-300">
                    Total: ${item.total?.toFixed(2)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
