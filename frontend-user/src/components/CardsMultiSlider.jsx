import React, { useEffect, useState } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import axios from 'axios';
import { message } from 'antd'; // Make sure to import message for notifications

const CustomLeftArrow = ({ onClick }) => (
  <button
    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-indigo-500 text-white p-3 rounded-full shadow-lg hover:bg-indigo-600 transition hidden md:block"
    onClick={onClick}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
    </svg>
  </button>
);

const CustomRightArrow = ({ onClick }) => (
  <button
    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-indigo-500 text-white p-3 rounded-full shadow-lg hover:bg-indigo-600 transition hidden md:block"
    onClick={onClick}
  >
    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
    </svg>
  </button>
);

const ProductCarousel = ({ category }) => {
  const [products, setProducts] = useState([]);

  // Fetch products based on category
  const fetchProducts = async () => {
    try {
      let response;
      if (category === 'Featured') {
        response = await axios.get('http://localhost:9999/product/random');
      } else {
        response = await axios.get(`http://localhost:9999/product/category/${category}`);
      }
      setProducts(response.data); // Store the fetched products
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };
  
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

  useEffect(() => {
    // Fetch products on initial load
    fetchProducts();
  
    let intervalId;
  
    // Only set up polling if the category is not "Featured"
    if (category !== 'Featured') {
      intervalId = setInterval(() => {
        fetchProducts(); // Fetch updated products
      }, 5000); // 5 seconds interval
    }
  
    // Cleanup the interval on component unmount
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [category]); // Re-fetch when category changes
  
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1280 },
      items: 5,
      slidesToSlide: 1,
    },
    laptop: {
      breakpoint: { max: 1280, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  return (
    <div className="container mx-auto my-16 flex justify-center items-center">
      <div className="w-full">
        <Carousel
          responsive={responsive}
          infinite={true}
          swipeable={true}
          draggable={true}
          keyBoardControl={true}
          customTransition="transform 0.5s ease-in-out"
          transitionDuration={500}
          containerClass="carousel-container"
          itemClass="px-5 mx-0"
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
        >
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product._id}
                className="bg-white shadow-2xl rounded-3xl border transform hover:scale-105 transition-all duration-300 ease-in-out w-full relative overflow-hidden group"
                style={{ margin: '0 2px' }} // 2px gap between items
              >
                <div className="w-full h-64 overflow-hidden group-hover:bg-gray-50 transition-all duration-300 cursor-pointer">
                  <img
                    src={`http://localhost:9999/${product.images && product.images.length > 0 ? product.images[0] : ''}`}
                    alt={product.name}
                    className="h-full w-full rounded-t-xl mb-4 p-3 transition-all duration-300 group-hover:opacity-70 object-contain"
                    onError={(e) => {
                      // Set a fallback image if product image is not found
                      e.target.src = 'https://via.placeholder.com/640x480.png?text=No+Image+Available';
                    }}
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-2xl font-semibold text-gray-800 group-hover:text-indigo-600 transition-all duration-300">
                    {product.name}
                  </h3>
                  <p className="text-lg font-semibold text-gray-600 group-hover:text-indigo-500 transition-all duration-300">
                    Price: ${product.price}
                  </p>
                  <div className="pt-4">
                    <button 
                      onClick={() => handleAddToCart(product)} // Add onClick handler
                      className="mt-6 w-full p-4 text-lg font-bold text-white bg-black rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gray-800 focus:outline-none focus:ring-4 focus:ring-black"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No products available in this category</p>
          )}
        </Carousel>
      </div>
    </div>
  );
};

export default ProductCarousel;
