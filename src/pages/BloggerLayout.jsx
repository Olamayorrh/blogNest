import React from 'react';
import NavBar from '../components/NavBar';
import SideNav from '../components/SideNav';
import { Outlet } from 'react-router';

const BloggerLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300 flex flex-col">
      {/* Top Navigation */}
      <NavBar />
      
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 flex-shrink-0 hidden md:block bg-white dark:bg-[#121212] border-r border-gray-200 dark:border-gray-800 transition-colors duration-300 overflow-y-auto">
          <SideNav />
        </aside>
        
        {/* Main Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BloggerLayout;
