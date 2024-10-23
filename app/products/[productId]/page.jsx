"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // Import useParams from next/navigation
import axios from "axios";
import Image from "next/image";

const ProductDetails = () => {
  const { productId } = useParams(); // Use useParams to get productId from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return; // Exit if productId is not available yet

    const url = `/api/products/${productId}`; // Correct URL to match the API

    // Fetch product data using axios
    axios
      .get(url)
      .then((response) => {
        setProduct(response.data); // Store product data in state
      })
      .catch((error) => {
        setError(error.message); // Handle error
      })
      .finally(() => {
        setLoading(false); // Set loading to false after request completes
      });
  }, [productId]);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error fetching product: {error}</div>;
  }

  // Render product details
  return (
    <div>
      {product && (
        <>
          <h1>{product.title}</h1>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <Image
            src={product.images[0]} // Use the first image from the product images array
            alt={product.title}
            width={500} // Set the width of the image
            height={500} // Set the height of the image
            layout="responsive" // Make the image responsive
          />
          {/* Add any other product details you want to display */}
        </>
      )}
    </div>
  );
};

export default ProductDetails;
