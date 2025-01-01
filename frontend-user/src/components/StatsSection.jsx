import React, { useState, useEffect } from 'react';
import { LikeOutlined, UserOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const StatsSection = () => {
  const [threshold, setThreshold] = useState(0.7);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setThreshold(0.3);
      } else {
        setThreshold(0.7);
      }
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { ref, inView } = useInView({
    threshold,
  });

  return (
    <div ref={ref} className="py-16 bg-gradient-to-r from-blue-500 to-blue-700 text-white">
      <div className="container mx-auto">
        <h2 className="text-center text-4xl font-bold mb-8 text-yellow-400">Our Achievements</h2>
        <div className="flex flex-wrap justify-center gap-y-10">
          <div className="w-full lg:w-1/3 text-center">
            <UserOutlined className="text-4xl text-yellow-300 mb-2" />
            <h3 className="text-xl text-yellow-300">Happy Customers</h3>
            {inView ? (
              <CountUp
                start={0}
                end={5000}
                duration={2}
                className="text-3xl font-bold text-white"
              />
            ) : (
              <span className="text-3xl font-bold text-white">0</span>
            )}
          </div>
          <div className="w-full lg:w-1/3 text-center">
            <ShoppingCartOutlined className="text-4xl text-yellow-300 mb-2" />
            <h3 className="text-xl text-yellow-300">Products Sold</h3>
            {inView ? (
              <CountUp
                start={0}
                end={12000}
                duration={2}
                className="text-3xl font-bold text-white"
              />
            ) : (
              <span className="text-3xl font-bold text-white">0</span>
            )}
          </div>
          <div className="w-full lg:w-1/3 text-center">
            <LikeOutlined className="text-4xl text-yellow-300 mb-2" />
            <h3 className="text-xl text-yellow-300">Positive Reviews</h3>
            {inView ? (
              <CountUp
                start={0}
                end={4500}
                duration={2}
                className="text-3xl font-bold text-white"
              />
            ) : (
              <span className="text-3xl font-bold text-white">0</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsSection;
