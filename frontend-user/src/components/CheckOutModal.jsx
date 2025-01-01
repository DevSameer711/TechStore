import React, { useState, useEffect } from "react";
import { Modal, Form, Button, message, Input } from "antd";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";  // Import EmailJS

const CheckoutModal = ({ visible, onClose, userId, products }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [address, setAddress] = useState(""); // State for address
  const [phoneNumber, setPhoneNumber] = useState(""); // State for phone number
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  // Fetch cart items on mount or when `visible` changes
  useEffect(() => {
    if (visible) {
      loadCartItems();
    }
  }, [visible, products]);

  const loadCartItems = () => {
    try {
      // Set the cartItems from the passed products prop
      const items = products;
      setCartItems(items);

      // Calculate total amount based on the price and quantity of each product
      const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotalAmount(total);
    } catch (error) {
      console.error("Error processing cart items:", error);
      message.error("Failed to load cart items.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      message.error(error.message);
      return;
    }

    try {
      const paymentResponse = await fetch("http://localhost:9999/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethodId: paymentMethod.id,
          userId: userId,
        }),
      });

      const paymentIntent = await paymentResponse.json();

      const { error: confirmError } = await stripe.confirmCardPayment(
        paymentIntent.client_secret
      );

      if (confirmError) {
        message.error(confirmError.message);
      } else {
        // Save order data to the database
        await fetch("http://localhost:9999/orders/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userId: userId,
            items: cartItems.map((item) => ({
              productId: item._id, // Use _id for productId
              quantity: item.quantity,
            })),
            totalAmount: totalAmount,
            address: address, // Use the address from input field
            phoneNumber: phoneNumber, // Use the phone number from input field
          }),
        });

        message.success("Payment successful!");

        // Retrieve user data from localStorage
        const userData = JSON.parse(localStorage.getItem("user"));

        // Send email to the user using EmailJS
        emailjs
          .send(
            "service_xgbbn1q", // Replace with your Service ID
            "template_b0sgsab", // Replace with your Template ID
            {
              user_email: userData.email, // Retrieve email from localStorage
              name: userData.name, // Retrieve name from localStorage
              order_id: "ORD" + new Date().getTime(), // Generate a unique order ID
              order_total: totalAmount,
            },
            "gCbCAZcFUYsrz3W0Y" // Replace with your User ID
          )
          .then(
            (response) => {
              console.log("Email sent successfully:", response);
            },
            (error) => {
              console.error("Error sending email:", error);
              message.error("Failed to send confirmation email.");
            }
          );

        onClose();
        navigate("/paymentsuccess");
      }
    } catch (error) {
      console.error("Error processing payment or saving order:", error);
      message.error("Payment failed. Please try again.");
    }
  };

  return (
    <Modal visible={visible} onCancel={onClose} footer={null} title="Checkout">
      <Form layout="vertical" onSubmit={handleSubmit}>
        {/* Address and Phone Number Fields */}
        <Form.Item label="Address" name="address" required>
          <Input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your address"
            maxLength={255}
          />
        </Form.Item>

        <Form.Item
          label="Phone Number"
          name="phoneNumber"
          required
          rules={[{ required: true, message: "Please enter your phone number!" }]}
        >
          <Input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter your phone number"
            maxLength={15}
            type="tel"
          />
        </Form.Item>

        {/* Stripe CardInput (CardElement) */}
        <Form.Item label="Card Details" required>
          <CardElement options={{ hidePostalCode: true }} />
        </Form.Item>

        {/* Total Amount */}
        <Form.Item>
          <div>
            <strong>Total Amount:</strong> ${totalAmount.toFixed(2)}
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleSubmit} disabled={!stripe}>
            Submit Payment
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CheckoutModal;
