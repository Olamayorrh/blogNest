import React, { useContext, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdMoon, IoMdClose, IoMdMenu } from "react-icons/io";
import { userContext } from "./Context";
import { FaStarOfDavid } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router";

const NavBar = () => {
  const { navItems, hovered, setHovered, theme, toggleTheme, user, logout, setIsLogin } = useContext(userContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white text-black dark:bg-[#121212] dark:text-white w-full border-b border-gray-200 dark:border-gray-800 transition-all duration-300 shadow-sm relative z-50">
      {/* --- MOBILE VIEW: Top Bar --- */}
      <div className="flex md:hidden items-center justify-between p-4 w-full">
        {/* Left: Hamburger */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 -ml-2 text-gray-700 dark:text-gray-300"
        >
          {isMenuOpen ? (
            <IoMdClose size="1.5rem" />
          ) : (
            <IoMdMenu size="1.5rem" />
          )}
        </button>

        {/* Center: Logo */}
        <Link
          to="/"
          className="text-[#003DE0] font-bold tracking-tight text-lg absolute left-1/2 -translate-x-1/2"
        >
          BlogNest
        </Link>

        {/* Right: Search & Theme Toggle */}
        <div className="flex items-center gap-2">
          <button className="text-gray-700 dark:text-gray-300 p-2">
            <CiSearch size="1.3rem" strokeWidth={1} />
          </button>
          <button
            onClick={toggleTheme}
            className="text-gray-700 dark:text-gray-300 p-2"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <IoMdMoon size="1.2rem" />
            ) : (
              <FaStarOfDavid size="1.1rem" className="text-yellow-400" />
            )}
          </button>
        </div>
      </div>

      {/* --- DESKTOP VIEW & MOBILE MENU --- */}
      <div
        className={`${isMenuOpen ? "flex flex-col absolute top-full left-0 w-full bg-white dark:bg-[#121212] border-b border-gray-200 dark:border-gray-800 shadow-xl p-6 gap-6" : "hidden"} md:flex md:flex-row md:static md:w-full md:justify-between md:items-center md:px-6 lg:px-12 md:py-4 md:shadow-none md:border-none`}
      >
        {/* Logo + Nav Items (Desktop) / Just Nav Items (Mobile) */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-3 lg:gap-8 md:w-auto lg:w-1/3">
          <Link
            to="/"
            className="hidden md:block text-[#003DE0] font-bold tracking-tight text-xl lg:text-2xl 2xl:text-3xl"
          >
            BlogNest
          </Link>
          <ul className="flex flex-col md:flex-row gap-4 md:gap-3 lg:gap-6 ">
            {navItems.map((item) => (
              <li
                key={item}
                onMouseEnter={() => setHovered(item)}
                onMouseLeave={() => setHovered(null)}
                className={`cursor-pointer pb-1 md:border-b-2 transition-all duration-300 ease-in-out font-medium text-lg md:text-sm lg:text-base 2xl:text-3xl
              ${
                (item === "Home" && hovered === null) || hovered === item
                  ? "text-[#003DE0] md:border-[#003DE0]"
                  : "text-gray-700 dark:text-gray-300 md:border-transparent hover:text-[#003DE0]"
              }`}
              >
                <Link to="/">{item}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Search Bar (Desktop only, plus shown inside mobile menu) */}
        <div
          className={`${isMenuOpen ? "flex " : "hidden"} order-last md:order-none focus-within:outline-2 focus-within:outline-blue-500 md:flex w-full md:w-36 lg:w-1/3 items-center px-4 md:px-3 py-3 md:py-2 gap-2 md:gap-1 lg:gap-2 bg-gray-100 dark:bg-gray-800 rounded-full mx-0 my-2 md:my-0`}
        >
          <CiSearch className="text-gray-500 pointer-events-none" size="1.7rem" />
          <input
            type="text"
            placeholder="Search here..."
            className="bg-transparent border-none focus:outline-none text-sm lg:text-base 2xl:text-4xl"
          />
        </div>

        {/* Actions (Login / Signup / Desktop Theme) */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-6 md:gap-2 lg:gap-6 md:w-auto lg:w-1/3 px-2 md:px-0">
          {/* Desktop Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="hidden md:block p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-all duration-300"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? (
              <IoMdMoon size="1.5rem" />
            ) : (
              <FaStarOfDavid size="1.5rem" className="text-yellow-400" />
            )}
          </button>

          {user ? (
            <div className="flex flex-col md:flex-row md:items-center items-start gap-3 md:gap-4">
              <Link to="/blogger/profile" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700">
                  <img 
                    src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80"} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-medium text-sm lg:text-base">
                  {user.username?.split(' ')[0]}
                </span>
              </Link>
              <button
                onClick={logout}
                className="text-red-500 hover:text-red-600 font-medium text-sm lg:text-base transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/loginSignUp"
                onClick={() => setIsLogin(true)}
                className="cursor-pointer font-medium hover:text-[#003DE0] transition-colors text-lg md:text-sm lg:text-base 2xl:text-3xl"
              >
                Login
              </Link>
              <Link
                to="/loginSignUp"
                onClick={() => setIsLogin(false)}
                className="bg-[#003DE0] text-white text-center px-6 py-3 md:py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors w-full md:w-auto text-lg md:text-sm lg:text-base shadow-sm 2xl:text-3xl"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
