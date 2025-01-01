import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserOutlined } from '@ant-design/icons'; // Ant Design icon for default avatar

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      navigate('/login'); // Redirect to login if no user is found
    }
  }, [navigate]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white shadow-xl rounded-3xl p-8 md:p-12 flex flex-col md:flex-row">
        {/* Profile Image Section */}
        <div className="flex justify-center md:justify-start md:w-1/3 mb-6 md:mb-0">
          {user.picture ? (
            <img
              src={user.picture}
              alt="Profile"
              className="w-32 h-32 md:w-48 md:h-48 object-cover rounded-full border-4 border-blue-500 shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 md:w-48 md:h-48 flex items-center justify-center bg-stone-300 rounded-full shadow-lg">
              <UserOutlined className="text-gray-500 text-8xl" />
            </div>
          )}
        </div>

        {/* Profile Info Section */}
        <div className="w-auto md:pl-12">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">User Profile</h1>
          <div className="space-y-4">
            <div className="flex items-center text-lg text-gray-800">
              <span className="font-semibold w-28">Name:</span>
              <span className="text-gray-600">{user.name}</span>
            </div>
            <div className="flex items-center text-lg text-gray-800">
              <span className="font-semibold w-28">Email:</span>
              <span className="text-gray-600">{user.email}</span>
            </div>
            <div className="flex items-center text-lg text-gray-800">
              <span className="font-semibold w-28">Phone No:</span>
              <span className="text-gray-600">{user.phoneNumber || 'Not provided'}</span>
            </div>
            <div className="flex items-center text-lg text-gray-800">
              <span className="font-semibold w-28">Address:</span>
              <span className="text-gray-600">{user.address || 'Not provided'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
