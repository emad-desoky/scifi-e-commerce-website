import React from "react";
import Image from "next/image";
import useFetch from "../../hooks/useFetch";

const RecommendedProducts = ({ cartItems }) => {
  // Fetch recommended products from the API
  const { data, isLoading, error } = useFetch(
    "GET",
    "/api/products/recommended",
    "products"
  );

  // Handle loading and error states
  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading products.</p>;

  // Check if data is an array
  if (!Array.isArray(data)) {
    console.error("Expected an array but got:", data);
    return <p>No products found.</p>;
  }

  // Simulate filtering related products based on cart items
  const recommendedProducts = data.filter((product) =>
    cartItems.some((cartItem) => product.category === cartItem.category)
  );

  // If no matching recommendations, show all recommended products
  const productsToDisplay =
    recommendedProducts.length > 0 ? recommendedProducts : data;

  return (
    <div className="mt-6">
      <h3 className="text-xl font-bold mb-4">Recommended Products</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {productsToDisplay.length === 0 ? (
          <p>No products available.</p>
        ) : (
          productsToDisplay.map((product) => (
            <div
              key={product.id}
              className="bg-gray-800 p-4 rounded-lg shadow-md"
            >
              <div className="relative w-full h-32 mb-4">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <h4 className="text-lg font-semibold">{product.title}</h4>
              <p className="text-gray-400">${product.price.toFixed(2)}</p>
              <button className="mt-2 w-full bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-500 transition duration-300">
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecommendedProducts;
