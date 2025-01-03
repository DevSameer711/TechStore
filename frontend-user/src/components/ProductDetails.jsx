import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { message } from 'antd'; // Importing message for notifications

const ProductDetailsPage = () => {
  const { id } = useParams(); // Use useParams to get the product ID from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/product/${id}`);
        setProduct(response.data);
      } catch (error) {
        setError("Failed to fetch product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = (product) => {
    const user = localStorage.getItem("user");

    if (user) {
      // If the user is logged in, proceed with adding the product to the cart
      const userData = JSON.parse(user);
      const userId = userData._id;

      // You can set the quantity to 1 or get it dynamically from your UI
      const quantity = 1;

      axios
        .post(`http://localhost:9999/cart/add/`, {
          userId: userId,
          productId: product._id,
          quantity,
        })
        .then((response) => {
          message.success("Product added to cart!");
        })
        .catch((error) => {
          message.error("An error occurred while adding the product to the cart.");
          console.error("Error adding to cart:", error);
        });
    } else {
      // If the user is not logged in, show a login message
      message.error("Please log in to add products to your cart.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex">
        <div className="w-1/2">
          <img
            src={`http://localhost:9999/${product.images[0]}`}
            alt={product.name}
            className="w-full h-auto object-contain"
          />
        </div>
        <div className="w-1/2 pl-8">
          <h1 className="text-3xl font-semibold">{product.name}</h1>
          <p className="text-lg font-semibold">Price: ${product.price}</p>
          <p className="mt-4">{product.description}</p>
          {/* Add "Add to Cart" button */}
          <button
            onClick={() => handleAddToCart(product)} // Add onClick handler
            className="mt-6 w-full p-4 text-lg font-bold text-white bg-black rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-black"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
