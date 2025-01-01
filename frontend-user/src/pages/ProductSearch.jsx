import React, { useState, useEffect } from "react";
import { Card, Pagination, Spin, Alert, message } from "antd";
import { useLocation } from "react-router-dom";
import { HeartOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import axios from "axios";

const ProductSearch = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      const fetchProducts = async () => {
        setLoading(true);
        setError(null);

        try {
          const response = await axios.get(
            `http://localhost:9999/product/search?search=${query}&page=${currentPage}&limit=${productsPerPage}`
          );

          setProducts(response.data.products);
          setTotalProducts(response.data.totalProducts);
        } catch (error) {
          setError("An error occurred while fetching products. Please try again later.");
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProducts();
    }
  }, [query, currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle "Add to Cart"
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

  // Handle "Add to wishlist"
  const handleAddToWishlist = (product) => {
    const user = localStorage.getItem("user");
  
    if (user) {
      // If the user is logged in, proceed with adding the product to the wishlist
      const userData = JSON.parse(user);
      const userId = userData._id;
  
      axios
        .post(`http://localhost:9999/wishlist/add/`, {
          userId: userId,
          productId: product._id,
        })
        .then((response) => {
          if (response.data.message === "Item added to wishlist") {
            message.success("Product added to wishlist!");
          } else if (response.data.message === "Product is already in the wishlist.") {
            message.info("Product is already in your wishlist.");
          } else {
            message.error("Failed to add product to wishlist.");
          }
        })
        .catch((error) => {
          if (error.response && error.response.status === 400) {
            // Handle the case when the product is already in the wishlist
            if (error.response.data.message === "Product is already in the wishlist.") {
              message.info("This product is already in your wishlist.");
            } else {
              message.error("An error occurred while adding the product to the wishlist.");
            }
          } else {
            message.error("An error occurred while adding the product to the wishlist.");
          }
          console.error("Error adding to wishlist:", error);
        });
    } else {
      // If the user is not logged in, show a login message
      message.error("Please log in to add products to your wishlist.");
    }
  };
  
  
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold mb-6">Search results for: {query}</h1>

      {error && <Alert message={error} type="error" className="mb-4" />}

      {loading ? (
        <div className="flex justify-center">
          <Spin size="large" />
        </div>
      ) : (
        <>
          {products.length === 0 ? (
            <div className="text-center text-xl">No products found for "{query}".</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
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
                  <div className="flex justify-between items-center mt-4">
                    <button className="text-yellow-400 flex items-center" onClick={() => handleAddToWishlist(product)}>
                      <HeartOutlined className="text-xl" />
                      <span className="ml-2">Add to Wishlist</span>
                    </button>
                    <button
                      className="text-yellow-400 flex items-center"
                      onClick={() => handleAddToCart(product)}
                    >
                      <ShoppingCartOutlined className="text-xl" />
                      <span className="ml-2">Add to Cart</span>
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}

          <div className="mt-8 flex justify-center">
            <Pagination
              current={currentPage}
              total={totalProducts}
              pageSize={productsPerPage}
              onChange={handlePageChange}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductSearch;
