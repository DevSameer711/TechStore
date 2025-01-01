import React from 'react';
import { Carousel } from 'antd';
import img3 from '../assets/Banner/img1.png';
import img2 from '../assets/Banner/img2.png';
import img1 from '../assets/Banner/img3.png';

const CarouselSlider = () => (
  <Carousel arrows infinite={true} autoplay={true} draggable={true}>
    <div>
      <img
        src={img1}
        alt="Smartphone"
        style={{ width: '100%', height: '80vh', objectFit: 'fill' }}
      />
    </div>
    <div>
      <img
        src={img2}
        alt="Earbuds"
        style={{ width: '100%', height: '80vh', objectFit: 'fill' }}
      />
    </div>
    <div>
      <img
        src={img3}
        alt="Laptop"
        style={{ width: '100%', height: '80vh', objectFit: 'fill' }}
      />
    </div>
  </Carousel>
);

export default CarouselSlider;
