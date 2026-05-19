import { useState } from 'react'
import "./index.css"
import { Route, Routes, Navigate } from 'react-router'

import Home from './pages/Home';
import LoginSignUp from './components/LoginSignUp';
import BloggerProfile from './pages/BloggerProfile';
import Blogs from './pages/Blogs';
import Comments from './pages/Comments';
import CreateBlog from './pages/CreateBlog';
import SideNav from './components/SideNav';
import BloggerLayout from './pages/BloggerLayout';
import ProtectedRoute from './components/ProtectedRoute';


const App = ()=>{
  

  return (
    <div className=" ">
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/loginSignUp" element={<LoginSignUp />}></Route>
        
       
        <Route path="/blogger" element={<ProtectedRoute />}>
          <Route index element={<Navigate to="profile" replace />} />
          <Route element={<BloggerLayout />}>
            <Route path="profile" element={<BloggerProfile />} />
            <Route path="blog" element={<Blogs />} />
            <Route path="comment" element={<Comments />} />
            <Route path="createBlog" element={<CreateBlog />} />
          </Route>
        </Route>
        
        <Route path="/sideNav" element={<SideNav />}></Route>
      </Routes>
    </div>
  );
}

export default App
