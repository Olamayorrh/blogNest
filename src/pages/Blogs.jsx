import React, { useState, useEffect, useContext } from 'react';
import { userContext } from '../components/Context';
import { useNavigate } from 'react-router';
import { HiDotsVertical } from 'react-icons/hi';
import { FiEdit, FiTrash2, FiPlus, FiSearch } from 'react-icons/fi';
import { BsClipboardDataFill } from 'react-icons/bs';

const API_URL = "http://localhost:5000/api";

const Blogs = () => {
  const { user } = useContext(userContext);
  const navigate = useNavigate();
  
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeMenu, setActiveMenu] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch blogs on mount
  useEffect(() => {
    fetchMyBlogs();
  }, []);

  const fetchMyBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/blogs/my-posts`, {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch blogs');
      }

      setBlogs(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to delete blog');
      }

      // Refresh the list
      setBlogs(blogs.filter(blog => blog._id !== id));
      setActiveMenu(null);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEdit = (id) => {
    navigate(`/blogger/createBlog?id=${id}`);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setActiveMenu(null);
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const filteredBlogs = blogs.filter(blog => 
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.category?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const publishedBlogs = filteredBlogs.filter(blog => blog.isPublished);
  const draftBlogs = filteredBlogs.filter(blog => !blog.isPublished);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#003DE0]"></div>
        <p className="text-gray-500 animate-pulse">Loading your blogs...</p>
      </div>
    );
  }

  const BlogTable = ({ blogs, title, subtitle }) => (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-800">
      <div className="p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
        </div>
        <span className="px-3 py-1 bg-gray-100 dark:bg-[#252525] rounded-full text-xs font-bold text-gray-600 dark:text-gray-400">
          {blogs.length}
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50/50 dark:bg-[#252525]/50 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-wider">
              <th className="px-6 py-4 font-semibold">Title</th>
              <th className="px-6 py-4 font-semibold">Category</th>
              <th className="px-6 py-4 font-semibold">Date</th>
              <th className="px-6 py-4 font-semibold text-center">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {blogs.length > 0 ? (
              blogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50/50 dark:hover:bg-[#252525]/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-10 md:w-20 md:h-12 rounded-lg overflow-hidden shrink-0 border border-gray-200 dark:border-gray-700">
                        <img 
                          src={blog.thumbnail ? `http://localhost:5000/${blog.thumbnail}` : 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=150&q=80'} 
                          alt={blog.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <div className="max-w-[200px] md:max-w-md">
                        <h3 className="font-bold text-gray-900 dark:text-white line-clamp-1">{blog.title}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-1 mt-0.5">{blog.subtitle || 'No subtitle provided'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-blue-900/20 text-[#003DE0] dark:text-blue-400 border border-blue-100 dark:border-blue-900/30">
                      {blog.category?.name || 'General'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                      {new Date(blog.createdAt).toLocaleDateString('en-GB')}
                    </div>
                    <div className="text-[10px] text-gray-400 dark:text-gray-500 mt-0.5 uppercase tracking-tighter">
                      {new Date(blog.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-center relative">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMenu(activeMenu === blog._id ? null : blog._id);
                      }}
                      className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors text-gray-500 dark:text-gray-400"
                    >
                      <HiDotsVertical size={18} />
                    </button>
                    {activeMenu === blog._id && (
                      <div className="absolute right-12 top-1/2 -translate-y-1/2 z-50 w-32 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-2xl border border-gray-100 dark:border-gray-800 py-1 animate-in fade-in zoom-in duration-200">
                        <button 
                          onClick={() => handleEdit(blog._id)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-[#252525] transition-colors"
                        >
                          <FiEdit size={14} className="text-blue-500" />
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(blog._id)}
                          className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                        >
                          <FiTrash2 size={14} />
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="px-6 py-20 text-center">
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="p-4 bg-gray-50 dark:bg-[#121212] rounded-full">
                      <BsClipboardDataFill size={32} className="text-gray-300" />
                    </div>
                    <p className="text-gray-500 dark:text-gray-400 font-medium">No blogs found in this category.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-7xl mx-auto space-y-12 pb-20">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">Your Blogs</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage, edit, and publish your stories.</p>
        </div>
        <button 
          onClick={() => navigate('/blogger/createBlog')}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-[#003DE0] hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-md active:scale-95"
        >
          <FiPlus size={20} />
          Create New Post
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-[#1a1a1a] p-4 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm">
        <div className="relative w-full sm:w-96">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search blogs..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-[#121212] border-none rounded-xl focus:ring-2 focus:ring-blue-500 text-sm dark:text-white outline-none"
          />
        </div>
        <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Total: {filteredBlogs.length} posts
        </div>
      </div>

      {/* Sections */}
      <div className="space-y-12">
        <BlogTable 
          blogs={publishedBlogs} 
          title="Published Blogs" 
          subtitle="Content currently live on the platform" 
        />
        
        <BlogTable 
          blogs={draftBlogs} 
          title="Saved Blogs (Drafts)" 
          subtitle="Work in progress - not yet visible to public" 
        />
      </div>
    </div>
  );
};

export default Blogs;