import React from 'react';
import { Link } from 'react-router';
import { FaTwitter, FaLinkedinIn, FaGithub, FaDribbble } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#050505] text-gray-600 dark:text-gray-400 border-t border-gray-100 dark:border-gray-900 transition-colors duration-300 mt-auto w-full">
      <div className="w-full px-6 md:px-16 lg:px-24 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-8">
          
          {/* Brand & Description */}
          <div className="md:col-span-2 space-y-6">
            <div className="text-[#003DE0] dark:text-blue-500 font-bold tracking-tight text-2xl">
              BlogNest
            </div>
            <p className="text-sm leading-relaxed max-w-sm">
              A minimalist sanctuary for deep thought, technical mastery, and creative storytelling. 
              Join a community of modern thinkers shaping the digital broadsheet.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="p-2 bg-gray-50 dark:bg-gray-900 rounded-full hover:bg-blue-50 hover:text-[#003DE0] dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-all">
                <FaTwitter size="1.2rem" />
              </a>
              <a href="#" className="p-2 bg-gray-50 dark:bg-gray-900 rounded-full hover:bg-blue-50 hover:text-[#003DE0] dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-all">
                <FaLinkedinIn size="1.2rem" />
              </a>
              <a href="#" className="p-2 bg-gray-50 dark:bg-gray-900 rounded-full hover:bg-blue-50 hover:text-[#003DE0] dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-all">
                <FaGithub size="1.2rem" />
              </a>
              <a href="#" className="p-2 bg-gray-50 dark:bg-gray-900 rounded-full hover:bg-blue-50 hover:text-[#003DE0] dark:hover:bg-blue-900/30 dark:hover:text-blue-400 transition-all">
                <FaDribbble size="1.2rem" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-gray-900 dark:text-white font-bold text-lg">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-[#003DE0] dark:hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link to="/articles" className="hover:text-[#003DE0] dark:hover:text-blue-400 transition-colors">Articles</Link></li>
              <li><Link to="/about" className="hover:text-[#003DE0] dark:hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-[#003DE0] dark:hover:text-blue-400 transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h4 className="text-gray-900 dark:text-white font-bold text-lg">Categories</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/category/technology" className="hover:text-[#003DE0] dark:hover:text-blue-400 transition-colors">Technology</Link></li>
              <li><Link to="/category/business" className="hover:text-[#003DE0] dark:hover:text-blue-400 transition-colors">Business</Link></li>
              <li><Link to="/category/design" className="hover:text-[#003DE0] dark:hover:text-blue-400 transition-colors">Design</Link></li>
              <li><Link to="/category/culture" className="hover:text-[#003DE0] dark:hover:text-blue-400 transition-colors">Culture</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p>© {new Date().getFullYear()} BlogNest. All rights reserved.</p>
          <div className="flex gap-6">
            <Link to="/privacy" className="hover:text-gray-900 dark:hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-gray-900 dark:hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
