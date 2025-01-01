import React from "react";
import Carousel from "../components/Carousel";
import Sponsors from "../components/Sponsors";
import CardsMultiSlider from "../components/CardsMultiSlider";
import StatsSection from "../components/StatsSection";
import Services from "../components/Services";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div>
      <Carousel />
      <Sponsors />
      <div>
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-600 to-purple-700 animate-text text-center">
          Featured Products
        </h2>
        <CardsMultiSlider category="Featured" />

        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-600 to-purple-700 animate-text text-center">
          Smart Phones
        </h2>
        <CardsMultiSlider category="Mobiles" />
{/* 
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-600 to-purple-700 animate-text text-center">
          Laptops
        </h2>
        <CardsMultiSlider category="Laptops" />

        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-600 to-purple-700 animate-text text-center">
          Accessories
        </h2>
        <CardsMultiSlider category="Accessories" /> */}
      </div>

      <StatsSection />
      <Services />
    </div>
  );
};

export default HomePage;
