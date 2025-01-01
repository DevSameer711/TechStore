import React, { useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";
import CartCard from "../components/CartCard";
import CartSummary from "../components/CartSummary";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        const userData = JSON.parse(user);
        setUserId(userData._id);
        fetchCartItems(userData._id);
      } catch (error) {
        console.error("Error parsing user data from localStorage:", error);
        message.error("Cart is empty.");
      }
    } else {
      message.error("User not logged in. Please log in to view your cart.");
    }
  }, []);

  const fetchCartItems = async (userId) => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:9999/cart/${userId}`);
      const items = response.data.items.map((item) => ({
        ...item.productId,
        quantity: item.quantity,
        cartItemId: item._id,
      }));
      setCartItems(items);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (cartItemId, quantity) => {
    setLoading(true);
    const user = localStorage.getItem("user");
    if (!user) {
      message.error("User not logged in.");
      setLoading(false);
      return;
    }

    const userData = JSON.parse(user);
    try {
      await axios.put(`http://localhost:9999/cart/update/${userData._id}/${cartItemId}`, { quantity });
      const updatedCart = cartItems.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      );
      setCartItems(updatedCart);
      message.success("Quantity updated successfully!");
    } catch (error) {
      console.error("Error updating quantity:", error);
      message.error("Failed to update quantity.");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (cartItemId) => {
    setLoading(true);
    const user = localStorage.getItem("user");
    if (!user) {
      message.error("User not logged in.");
      setLoading(false);
      return;
    }

    const userData = JSON.parse(user);
    try {
      await axios.delete(`http://localhost:9999/cart/remove/${userData._id}/${cartItemId}`);
      const updatedCart = cartItems.filter((item) => item.cartItemId !== cartItemId);
      setCartItems(updatedCart);
      message.success("Item removed from cart.");
    } catch (error) {
      console.error("Error removing item:", error);
      message.error("Failed to remove item.");
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    try {
      const user = localStorage.getItem("user");
      if (user) {
        const userData = JSON.parse(user);
        await axios.delete(`http://localhost:9999/cart/clear/${userData._id}`);
        setCartItems([]);
        message.success("Cart cleared.");
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      message.error("Failed to clear cart.");
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-50 p-6 flex flex-col items-center">
        <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">Your Cart</h1>
        <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left Panel - Cart Items */}
          <div className="md:col-span-2 p-6">
            {loading ? (
              <p className="text-center">Loading cart items...</p>
            ) : cartItems && cartItems.length > 0 ? (
              <div>
                {cartItems.map((item) => (
                  <CartCard
                    key={item.cartItemId}
                    item={item}
                    onRemove={removeItem}
                    onUpdateQuantity={updateQuantity}
                  />
                ))}
              </div>
            ) : (
              <p className="text-center text-lg">Your cart is empty.</p>
            )}
          </div>

          {/* Right Panel - Cart Summary */}
          <div className="p-6">
            <CartSummary
              total={calculateTotal()}
              onCheckout={() => message.info("Proceeding to checkout...")}
              onClearCart={clearCart}
              userId={userId} // Pass userId here
              products={cartItems}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
