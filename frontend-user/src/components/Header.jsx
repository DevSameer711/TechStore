import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SearchOutlined, HeartOutlined, ShoppingCartOutlined, UserOutlined, LogoutOutlined, LoginOutlined } from '@ant-design/icons';
import { Dropdown, Menu, Avatar, Badge } from 'antd';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const url = window.location.href;

    const params = new URLSearchParams(window.location.search);
    const userParam = params.get('user');


    if (userParam) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(userParam));
        localStorage.setItem('user', JSON.stringify(parsedUser)); // Store user in localStorage
        setUser(parsedUser);
        navigate('/', { replace: true }); // Clear URL params after handling
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    } else {
      const savedUser = localStorage.getItem('user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }


  }, [navigate]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/productsearch?query=${searchQuery}`);
    }
  };

  const handleGoogleLogin = () => {
    const currentUrl = window.location.href;
    window.location.href = `http://localhost:9999/auth/google?redirectUrl=${encodeURIComponent(currentUrl)}`;
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setCartItemsCount(0); // Reset cart count on logout
    navigate('/'); // Redirect to homepage
  };

  // Dropdown menu for user
  const menu = (
    <Menu>
      {user ? (
        <>
          <Menu.Item key="profile" onClick={() => navigate('/profile')}>
            <UserOutlined /> Profile
          </Menu.Item>
          <Menu.Item key="logout" onClick={handleLogout}>
            <LogoutOutlined /> Logout
          </Menu.Item>
        </>
      ) : (
        <Menu.Item key="login" onClick={handleGoogleLogin}>
          <LoginOutlined /> Login
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-blue-400 to-blue-600 text-white py-6 px-3 md:px-2">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Logo */}
        <div className="text-3xl font-bold mb-4 md:mb-0 cursor-pointer" onClick={() => navigate('/')}>
          TechStore
        </div>

        {/* Search Bar */}
        <div className="flex items-center space-x-4 w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search products..."
            className="px-4 py-2 rounded-lg w-full text-black outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button className="bg-yellow-400 px-4 py-2 rounded-lg ml-2" onClick={handleSearch}>
            <SearchOutlined className="text-black" />
          </button>
        </div>

        {/* Wishlist, Cart, Profile */}
        <div className="flex items-center space-x-6 mt-4 md:mt-0">
          <button className="text-white hover:text-yellow-400 flex items-center space-x-2"
          onClick={() => navigate('/wishlist')}>
            <HeartOutlined className="text-2xl" />
            <span className="hidden md:block">Wishlist</span>
          </button>
          
          {/* Updated Cart Button */}
          <button 
  className="text-white hover:text-yellow-400 flex items-center space-x-2"
  onClick={() => navigate('/cartpage')} // Navigate to CartPage
>
    <ShoppingCartOutlined className="text-2xl" style={{ color: 'white' }} />
  <span className="hidden md:block">Cart</span>
</button>
          
          <Dropdown overlay={menu} trigger={['click']} placement="bottomRight">
            <div className="cursor-pointer flex items-center space-x-2">
              <Avatar
                style={{ backgroundColor: user ? '#87d068' : '#1890ff' }}
                icon={<UserOutlined />}
              />
              {user && <span className="hidden md:block">{user.name}</span>}
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
};

export default Header;
