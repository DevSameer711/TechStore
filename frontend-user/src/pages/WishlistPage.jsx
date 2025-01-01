import React, { useState, useEffect } from "react";
import { Card, Spin, message, Button } from "antd";
import axios from "axios";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]); // List of product IDs in wishlist
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productDetails, setProductDetails] = useState([]); // List of full product details

  // Fetch wishlist when the component mounts
  useEffect(() => {
    const fetchWishlist = async () => {
      setLoading(true);
      setError(null);

      try {
        const userId = JSON.parse(localStorage.getItem("user"))?._id; // Assuming the user is stored in localStorage
        const response = await axios.get(`http://localhost:9999/wishlist/${userId}`);
        setWishlist(response.data.items); // Assuming response contains "items" array with productId
      } catch (error) {
        setError("An error occurred while fetching the wishlist.");
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchWishlist();
  }, []);

  // Fetch product details for each productId in the wishlist
  useEffect(() => {
    const fetchProductDetails = async () => {
      const productDetailsPromises = wishlist.map(async (item) => {
        try {
          const response = await axios.get(`http://localhost:9999/product/${item.productId._id}`);
          return response.data; // Return product details
        } catch (error) {
          console.error("Error fetching product details:", error);
          message.error("Failed to load product details.");
        }
      });

      // Wait for all product details to be fetched
      const results = await Promise.all(productDetailsPromises);
      setProductDetails(results.filter(Boolean)); // Filter out undefined results
    };

    if (wishlist.length > 0) {
      fetchProductDetails();
    } else {
      setProductDetails([]);
    }
  }, [wishlist]);

  const handleDelete = async (wishlistItemId) => {
    try {
      const userId = JSON.parse(localStorage.getItem("user"))?._id;
      await axios.delete(`http://localhost:9999/wishlist/remove/${userId}/${wishlistItemId}`);
      setWishlist(wishlist.filter((item) => item.productId._id !== wishlistItemId));
      message.success("Product removed from wishlist");
    } catch (error) {
      message.error("Failed to remove product from wishlist");
      console.error("Error deleting product:", error);
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const userId = JSON.parse(localStorage.getItem("user"))?._id;
      const quantity = 1; // You can modify this based on your UI (e.g., a quantity input field)
      await axios.post("http://localhost:9999/cart/add/", {
        userId,
        productId: product._id,
        quantity,
      });
      message.success("Product added to cart");
    } catch (error) {
      message.error("Failed to add product to cart");
      console.error("Error adding to cart:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Spin size="large" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 text-xl">
        {error}
      </div>
    );
  }

  if (productDetails.length === 0) {
    return (
      <div className="flex justify-center h-screen mt-10">
        <h1 className="text-2xl font-bold text-blue-600">Your Wishlist is Empty</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {productDetails.map((product) => (
          <Card
            key={product._id}
            hoverable
            cover={
              <div className="w-full h-64 overflow-hidden">
                <img
                  src={`http://localhost:9999/${product.images && product.images.length > 0 ? product.images[0] : ""}`}
                  alt={product.name}
                  className="h-full w-full rounded-t-xl mb-4 p-3 transition-all duration-300 group-hover:opacity-70 object-contain"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/640x480.png?text=No+Image+Available";
                  }}
                />
              </div>
            }
            className="shadow-lg"
          >
            <Card.Meta title={product.name} description={`$${product.price}`} />
            <div className="mt-4">
              <h3>Description:</h3>
              <p>{product.description}</p>
            </div>
            <div className="mt-4 flex justify-between">
              <Button type="primary" onClick={() => handleAddToCart(product)}>
                Add to Cart
              </Button>
              <Button
                type="danger"
                className="bg-red-500 hover:bg-red-400 text-white border-none"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
