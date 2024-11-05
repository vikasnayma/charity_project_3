import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

function Layout() {
  return (
    <div className="flex flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <Header />
        {/* Main Content */}
        <div className="p-4 flex-grow overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;