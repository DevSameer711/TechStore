import React from "react";
import { CheckCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-100">
      <div className="flex flex-col items-center space-y-6">
        <CheckCircleOutlined
          className="text-green-500 text-8xl animate-bounce"
          style={{ animationDuration: "2s" }}
        />
        <h1 className="text-4xl font-bold text-green-600 animate-fade-in">
          Payment Successful!
        </h1>
        <p className="text-lg text-gray-700 text-center">
          Thank you for your purchase. Your order is being processed, and you
          will receive a confirmation email shortly.
        </p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 mt-4 text-white bg-green-500 rounded-md hover:bg-green-600 transition ease-in"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
