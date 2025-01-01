import React, { useState } from "react";
import { Button, Input, message } from "antd";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:9999/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();

      if (response.ok) {
        message.success("Login successful!");
        console.log("Response Data:", result);

      localStorage.setItem("token", result.token);
      localStorage.setItem("username", result.admin.username);
      localStorage.setItem("user_id", result.admin._id);
      navigate("/");

      } else {
        message.error(result.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      message.error("An error occurred while logging in.");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full fade-in">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">Admin Login</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Username Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="username">
              Username
            </label>
            <Input
              id="username"
              type="text"
              placeholder="Enter your username"
              className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md"
              required
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-gray-700 font-semibold mb-1" htmlFor="password">
              Password
            </label>
            <Input.Password
              id="password"
              placeholder="Enter your password"
              className="w-full border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md"
              required
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          {/* Submit Button */}
          <Button
            type="primary"
            htmlType="submit"
            className="w-full text-lg py-2 flex items-center justify-center"
          >
            Login
          </Button>
        </form>

      </div>
    </div>
  );
};

export default AdminLogin;
