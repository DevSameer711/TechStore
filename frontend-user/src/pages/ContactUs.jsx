import React, { useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import emailjs from "emailjs-com"; // Import EmailJS

const ContactUs = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phoneNumber: "", // Added phoneNumber to state
  });

  useEffect(() => {
    // Check if the user is in localStorage
    const user = localStorage.getItem("user");
    if (user) {
      const parsedUser = JSON.parse(user);
      setUserDetails({
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        phoneNumber: parsedUser.phoneNumber || "", // Set phone number
      });
      setIsUserLoggedIn(true);
    }
  }, []);

  const handleSubmit = async (values) => {
    const { name, email, phoneNumber, message: userMessage } = values;

    setLoading(true);

    // Send email using EmailJS
    emailjs
      .send(
        "service_xgbbn1q", // Replace with your Service ID
        "template_3shyx0q", // Replace with your Template ID
        {
          email: email, // User's email address
          name: name, // User's name
          phone_number: phoneNumber, // User's phone number
          message: userMessage,
        },
        "gCbCAZcFUYsrz3W0Y" // Replace with your User ID
      )
      .then(
        (response) => {
          console.log("Email sent successfully:", response);

          // Send feedback to the backend to save in the database
          fetch("http://localhost:9999/feedback", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name,
              email,
              phoneNumber,
              message: userMessage,
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              message.success("Your message has been sent successfully!");
              form.resetFields();
            })
            .catch((error) => {
              message.error("Error saving feedback. Please try again.");
            });

          setLoading(false);
        },
        (error) => {
          console.error("Error sending email:", error);
          message.error("Failed to send message. Please try again.");
          setLoading(false);
        }
      );
  };

  if (!isUserLoggedIn) {
    return <div>Loading...</div>; // Show loading until user details are available
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Contact Us</h2>
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          initialValues={{
            name: userDetails.name,
            email: userDetails.email,
            phoneNumber: userDetails.phoneNumber, // Pre-fill phone number
          }}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please enter your name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please enter your email!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: "Please enter your phone number!" }]}
          >
            <Input type="tel" />
          </Form.Item>

          <Form.Item
            label="Message"
            name="message"
            rules={[{ required: true, message: "Please enter your message!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              disabled={!isUserLoggedIn || loading}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg"
            >
              Send Message
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default ContactUs;
