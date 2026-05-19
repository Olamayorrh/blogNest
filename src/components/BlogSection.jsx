import React, { useState } from 'react';
import blogData from '../data/blogData.json';
import { CiSearch } from "react-icons/ci";
import { Link } from 'react-router'; 

// Image imports — swap these out when using real API URLs from the backend
import articleBusiness from '../assets/images/article_business.png';
import articleTechnology from '../assets/images/article_technology.png';
import write1 from '../assets/images/write1.jpg';
import authorLiam from '../assets/images/author_liam.png';
import authorMaya from '../assets/images/author_maya.png';
import authorSimon from '../assets/images/author_simon.png';

// Map JSON image keys to imported assets
const imageMap = {
  'article_business': articleBusiness,
  'article_technology': articleTechnology,
  'write1': write1,
  'author_liam': authorLiam,
  'author_maya': authorMaya,
  'author_simon': authorSimon,
};

// Helper: resolve image key or fall back to the raw value (works with real URLs too)
const resolveImage = (key) => imageMap[key] ?? key;

const BlogSection = () => {
  const { articles, featuredAuthors } = blogData;

  // Will eventually come from an API call (e.g. GET /api/categories)
  const categories = ["Technology", "Lifestyle", "Design", "Business", "Culture"];
  const [activeFilter, setActiveFilter] = useState("Design");

  return (
    <section className="bg-[#f8faff] dark:bg-[#0f1115] pt-16 transition-colors duration-300 w-full flex flex-col">
      {/* Top Bar: Explore and Search - 50/50 Split */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-0 w-full border-b border-gray-200 dark:border-gray-800 pb-8 px-6 md:px-16 lg:px-24">
        <div className="flex items-center gap-4 overflow-x-auto w-full md:w-1/2 pb-2 md:pb-0 hide-scrollbar">
          <span className="text-gray-500 font-semibold text-sm whitespace-nowrap">Explore:</span>
          {categories.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter
                ? "bg-[#003DE0] text-white shadow-lg shadow-blue-500/30 scale-105"
                : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-blue-50 dark:hover:bg-gray-700 hover:text-[#003DE0] dark:hover:text-blue-400"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-1/2 md:pl-12">
          <CiSearch className="absolute left-4 md:left-16 top-1/2 -translate-y-1/2 text-gray-400" size="1.2rem" />
          <input
            type="text"
            placeholder="Search articles..."
            className="w-full pl-12 md:pl-12 pr-4 py-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all text-sm shadow-sm"
          />
        </div>
      </div>

      {/* Main Content & Sidebar Container */}
      <div className="flex flex-col md:flex-row w-full items-stretch flex-grow">
        
        {/* Main Content: Recommended for you - 50% width */}
        <div className="w-full md:w-1/2 space-y-8 px-6 md:px-16 lg:px-24 py-8 bg-white dark:bg-[#0a0a0a] border-r border-gray-100 dark:border-gray-800">
          <h2 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">Recommended for you</h2>
          <div className="space-y-8">
            {articles.slice(0, 3).map((article) => (
              <div 
                key={article.id} 
                className="group bg-white dark:bg-gray-800 rounded-3xl overflow-hidden flex flex-col gap-6 p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-white/5 cursor-pointer"
              >
                <Link to={`/article/${article.id}`} className="block w-full aspect-[16/9] overflow-hidden rounded-2xl relative">
                  <img
                    src={resolveImage(article.image)}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </Link>
                <div className="flex-1 flex flex-col justify-between py-2">
                  <div className="space-y-3">
                    <span className="text-[#003DE0] dark:text-blue-400 font-bold text-xs tracking-widest uppercase">
                      {article.category}
                    </span>
                    <Link to={`/article/${article.id}`} className="block">
                      <h3 className="text-xl md:text-2xl font-bold leading-tight group-hover:text-[#003DE0] transition-colors text-gray-900 dark:text-white">
                        {article.title}
                      </h3>
                    </Link>
                    <p className="text-gray-500 dark:text-gray-400 text-sm line-clamp-3 leading-relaxed">
                      {article.description}
                    </p>
                    <Link to={`/article/${article.id}`} className="inline-block text-[#003DE0] dark:text-blue-400 text-sm font-bold mt-2 hover:underline">
                      Read More →
                    </Link>
                  </div>
                  <div className="flex items-center gap-3 mt-6">
                    <img
                      src={resolveImage(article.author.avatar)}
                      alt={article.author.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-white dark:border-gray-700"
                    />
                    <div className="text-xs">
                      <span className="font-bold block text-gray-900 dark:text-white">{article.author.name}</span>
                      <span className="text-gray-400">{article.author.readTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar - Featured Authors - 50% width */}
        <div className="w-full md:w-1/2 px-6 md:px-16 lg:px-24 py-8 bg-[#f8faff] dark:bg-[#0f1115]">
          <div className="bg-blue-50/50 dark:bg-blue-900/10 rounded-3xl p-8 border border-blue-100 dark:border-blue-900/20 sticky top-24">
            <div className="flex justify-between items-center mb-8">
              <h4 className="font-bold text-lg text-gray-900 dark:text-white">Featured Authors</h4>
              <button className="text-[#003DE0] dark:text-blue-400 text-xs font-bold hover:underline">View all</button>
            </div>
            <div className="space-y-6">
              {featuredAuthors.map((author) => (
                <div key={author.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={resolveImage(author.avatar)} alt={author.name} className="w-10 h-10 rounded-full object-cover" />
                    <div>
                      <h5 className="text-sm font-bold leading-none text-gray-900 dark:text-white">{author.name}</h5>
                      <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-1">{author.role}</p>
                    </div>
                  </div>
                  <button className={`px-4 py-1.5 rounded-full text-[10px] font-bold transition-all ${
                    author.isFollowing 
                    ? "bg-[#003DE0] text-white" 
                    : "border border-[#003DE0] text-[#003DE0] hover:bg-[#003DE0] hover:text-white"
                  }`}>
                    {author.isFollowing ? "Following" : "Follow"}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Full Width Newsletter Section (Edge-to-Edge) */}
      <div className="w-full px-6 md:px-16 lg:px-24 py-20 bg-[#003DE0] dark:bg-[#0b1222] text-white mt-8 transition-colors duration-300">
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-12 max-w-[1400px] mx-auto">
          <div className="md:w-1/2 space-y-4">
            <h4 className="text-3xl md:text-4xl font-bold leading-tight">Join the BlogNest weekly digest</h4>
            <p className="text-white/80 dark:text-gray-400 text-base md:text-lg leading-relaxed">
              The best of modern thinking, delivered straight to your inbox. No spam, ever.
            </p>
          </div>
          <div className="w-full md:w-1/2 flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-5 py-4 bg-white/10 rounded-xl border border-white/20 dark:border-white/10 focus:ring-2 focus:ring-white dark:focus:ring-blue-500 focus:outline-none text-sm md:text-base transition-all placeholder:text-white/50 dark:placeholder:text-gray-500"
            />
            <button className="w-full sm:w-auto px-8 py-4 bg-white text-[#003DE0] dark:text-[#0b1222] rounded-xl font-bold text-sm md:text-base hover:bg-gray-100 dark:hover:bg-gray-200 transition-all shadow-lg hover:shadow-white/20 whitespace-nowrap">
              Subscribe Now
            </button>
          </div>
        </div>
      </div>

    </section>
  );
};

export default BlogSection;
