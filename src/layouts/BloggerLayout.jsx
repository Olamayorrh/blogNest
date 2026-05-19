import React from 'react'
import NavBar from '../components/NavBar';
import SideNav from '../components/SideNav';
import { Outlet } from 'react-router';

const BloggerLayout = () => {
  return (
    <div>
        <NavBar />
        <div>
            <SideNav />
            <Outlet />
        </div>
    </div>
  )
}

export default BloggerLayout;