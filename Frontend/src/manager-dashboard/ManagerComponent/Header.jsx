import React from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';


const Header = () => {
  const handleProfileClick = () => {
    window.location.href = '/manager/profile';  // Redirect to the profile page
  };
  const handleNotifiClick = () => {
    window.location.href = '/manager/notification';  // Redirect to the notifi page
  };
  return (
    <header className="flex items-center justify-between bg-white px-6 py-4 shadow-md">
      {/* Dashboard Title */}
      <h1 className="text-2xl font-bold text-[#5f1515]">Admin Dashboard</h1>
      
      {/* Right Side - User Info and Notifications */}
      <div className="flex items-center space-x-4">
        {/* Notifications */}
        <button className="text-gray-600 hover:text-[#910b0b]">
          <FaBell className="text-2xl" onClick={handleNotifiClick} />
        </button>
        
        {/* User Profile */}
        <div className="flex items-center space-x-2 text-gray-700">
          <FaUserCircle className="text-3xl" onClick={handleProfileClick} />
          <span className="font-medium">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;