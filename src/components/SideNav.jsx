import React from 'react'
import { LuSquareUser } from "react-icons/lu";
import { BsClipboardDataFill } from "react-icons/bs";
import { LiaCommentSolid } from "react-icons/lia";
import { IoCreate } from "react-icons/io5";
import { NavLink } from 'react-router';

const SideNav = () => {
    const paths = [
      {
        to: "/blogger/profile",
        icon: <LuSquareUser />,
        label: "Profile",
      },
      {
        to: "/blogger/blog",
        icon: <BsClipboardDataFill />,
        label: "Your Blogs",
      },
      {
        to: "/blogger/comment",
        icon: <LiaCommentSolid />,
        label: "Comments",
      },
      {
        to: "/blogger/createBlog",
        icon: <IoCreate />,
        label: "Create Blog",
      },
    ];
  return (
    <div className="h-full py-6">
      <ul className='px-4 space-y-2'>
        {paths.map((val, index) => (
          <li key={index}>
            <NavLink 
              to={val.to} 
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                  isActive
                    ? "bg-[#003DE0]/10 text-[#003DE0] dark:bg-[#003DE0]/20"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white"
                }`
              }
            >
              <span className="text-2xl">{val.icon}</span>
              <span className="text-lg">{val.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SideNav