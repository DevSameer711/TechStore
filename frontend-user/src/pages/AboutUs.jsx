import React from "react";
import { SafetyOutlined, AppstoreAddOutlined, CustomerServiceOutlined } from "@ant-design/icons";
import logo from '../assets/icon.png';

const AboutUsPage = () => {
  return (
    <div>
      <section className="bg-white text-gray-800 py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-extrabold mb-4">About Us</h1>
          <p className="text-xl mb-8">
            Welcome to <span className="text-blue-600">TechStore</span>, where
            innovation meets style. We bring the latest gadgets, tech, and
            accessories to enhance your digital life.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div className="flex justify-center items-center">
            <img
                src={logo} 
                alt="TechStore Logo"
                className="w-52 h-64 object-fit"
              />
            </div>

            <div className="text-left">
              <h2 className="text-3xl font-semibold mb-4">Who We Are</h2>
              <p className="mb-4">
                At <span className="text-blue-600">TechStore</span>, we’re a
                passionate team of tech enthusiasts, engineers, and designers
                who believe that the future is digital, and we’re here to make it
                easier for you to stay ahead. We’re not just a tech store—we’re
                your go-to source for cutting-edge innovations.
              </p>
              <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
              <p>
                Our mission is simple: deliver the best tech products with
                unmatched customer service. Whether you're a gadget lover or a
                professional looking for quality, we aim to make your tech dreams
                a reality.
              </p>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-3xl font-semibold mb-4">Why Choose Us?</h2>
            <div className="flex justify-center space-x-16">
              <div className="text-center">
                <SafetyOutlined className="text-4xl mb-4" />
                <p className="font-semibold">Secure & Reliable</p>
              </div>
              <div className="text-center">
                <AppstoreAddOutlined className="text-4xl mb-4" />
                <p className="font-semibold">Cutting-Edge Technology</p>
              </div>
              <div className="text-center">
                <CustomerServiceOutlined className="text-4xl mb-4" />
                <p className="font-semibold">24/7 Customer Support</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AboutUsPage;
