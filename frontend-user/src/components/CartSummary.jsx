import React, { useState } from "react";
import { Button } from "antd";
import CheckoutModal from "../components/CheckOutModal";

const CartSummary = ({ total, onClearCart, userId, products }) => {
  const [visible, setVisible] = useState(false);

  const showModal = () => {
    setVisible(true); // Show the modal
  };

  const handleModalClose = () => {
    setVisible(false); // Hide the modal
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold text-gray-800">Cart Summary</h2>
      <div className="flex justify-between mt-4">
        <span className="text-lg font-medium text-gray-700">Subtotal:</span>
        <span className="text-lg font-semibold text-blue-600">${total}</span>
      </div>
      <div className="flex justify-between mt-4">
        <span className="text-lg font-medium text-gray-700">Shipping:</span>
        <span className="text-lg font-semibold text-blue-600">Free</span>
      </div>
      <div className="flex justify-between mt-4">
        <span className="text-xl font-semibold text-gray-800">Total:</span>
        <span className="text-xl font-bold text-blue-600">${total}</span>
      </div>
      <div className="mt-6 flex flex-col lg:flex-row gap-4">
        <Button
          onClick={showModal} // Trigger the modal
          type="primary"
          className="w-full"
          size="large"
          disabled={products.length === 0} // Disable button if cart is empty
        >
          Proceed to Checkout
        </Button>
        <Button
          onClick={onClearCart}
          type="danger"
          className="w-full sm:w-auto bg-red-400 text-white hover:bg-red-500"
          size="large"
        >
          Clear Cart
        </Button>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        visible={visible}
        onClose={handleModalClose}
        userId={userId}
        onPaymentSuccess={onClearCart}
        products={products} // Pass products as a prop
      />
    </div>
  );
};

export default CartSummary;
