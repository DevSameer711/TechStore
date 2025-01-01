import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css'; // Import Swiper styles
import 'swiper/css/pagination'; // Import pagination styles
import Logo1 from '../assets/logos/Apple.png';
import Logo2 from '../assets/logos/Acer.png';
import Logo3 from '../assets/logos/Dell.png';
import Logo4 from '../assets/logos/Hp.png';
import Logo5 from '../assets/logos/Lenovo.png';
import Logo6 from '../assets/logos/Samsung.png';
import Logo7 from '../assets/logos/Xiaomi.svg';
import Logo8 from '../assets/logos/Realme.png';
import Logo9 from '../assets/logos/HyperX.png';
import Logo10 from '../assets/logos/Logitech.png';
import Logo11 from '../assets/logos/Steelseries.png';
import Logo12 from '../assets/logos/corsair.png';
import Logo13 from '../assets/logos/Alienware.png';


const CenteredSlideCarousel = () => {
  return (
    <>
      <div className="text-center my-16">
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-blue-600 to-purple-700 animate-text p-5">
          Our Amazing Sponsors
        </h2>
        <p className="text-lg text-gray-500 mt-4">
          We're proud to be partnered with these incredible companies.
        </p>
      </div>
      <div className="container relative m-auto py-5">
        <Swiper
          className="centered-slide-carousel"
          centeredSlides={true} // Keep this if you want centering
          pagination={{
            el: '.swiper-pagination',
            clickable: true,
          }}
          loop={true}
          spaceBetween={0}
          slideToClickedSlide={true}
          breakpoints={{
            1400: {
              slidesPerView: 6,
            },
            1200: {
              slidesPerView: 5,
            },
            480: {
              slidesPerView: 4,
            },
            320: {
              slidesPerView: 2,
            },
          }}
        >
          {[Logo1, Logo2, Logo3, Logo4, Logo5, Logo6, Logo7, Logo8, Logo9, Logo10, Logo11, Logo12, Logo13].map((logo, index) => (
            <SwiperSlide key={index}>
              <div className="flex justify-center items-center h-24 md:h-32 w-24 md:w-32 mx-auto ">
                <img
                  src={logo}
                  alt={`Logo ${index + 1}`}
                  className="object-contain h-full w-full rounded-md"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="swiper-pagination"></div>
      </div>
    </>
  );
};

export default CenteredSlideCarousel;
