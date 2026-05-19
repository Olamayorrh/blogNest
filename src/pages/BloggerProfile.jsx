import React, { useContext, useState } from 'react';
import { userContext } from '../components/Context';
import { FaFacebookF, FaLinkedinIn, FaGithub, FaInstagram } from 'react-icons/fa';
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BsClipboardDataFill } from "react-icons/bs";
import { LiaCommentSolid } from "react-icons/lia";
import { BiLike } from "react-icons/bi";
import { IoMdClose } from "react-icons/io";

const BloggerProfile = () => {
  const { user, setUser } = useContext(userContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Parse username into First and Last name based on space separation
  const nameParts = user?.username ? user.username.split(" ") : ["", ""];
  const initialFirstName = nameParts[0] || "";
  const initialLastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "";

  const [formData, setFormData] = useState({
    firstName: initialFirstName,
    lastName: initialLastName,
    facebook: user?.socials?.facebook || "",
    instagram: user?.socials?.instagram || "",
    linkedin: user?.socials?.linkedin || "",
    github: user?.socials?.github || "",
    description: user?.bio || "",
    picture: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "picture") {
      const file = files[0];
      if (file) {
        setFormData({ ...formData, picture: file });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Construct updated user object
    const updatedUsername = `${formData.firstName} ${formData.lastName}`.trim();
    
    // Create a local object URL to display immediately if a file was chosen
    const updatedAvatar = formData.picture 
      ? URL.createObjectURL(formData.picture) 
      : user?.avatar;

    const updatedUser = {
      ...user,
      username: updatedUsername,
      bio: formData.description,
      avatar: updatedAvatar,
      socials: {
        facebook: formData.facebook,
        instagram: formData.instagram,
        linkedin: formData.linkedin,
        github: formData.github,
      }
    };

    // Update global context & local storage
    setUser(updatedUser);
    localStorage.setItem("blogNestUser", JSON.stringify(updatedUser));
    
    setIsModalOpen(false);
  };

  const stats = [
    { title: "Total Views", count: "24.8K", increase: "+12% from last month", icon: <MdOutlineRemoveRedEye size={24} /> },
    { title: "Total Blogs", count: "3", increase: "+4% from last month", icon: <BsClipboardDataFill size={20} /> },
    { title: "Comments", count: "3", increase: "+18% from last month", icon: <LiaCommentSolid size={24} /> },
    { title: "Likes", count: "4", increase: "+7% from last month", icon: <BiLike size={24} /> },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 relative">
      {/* Profile Banner */}
      <div className="bg-white dark:bg-[#121212] rounded-3xl p-6 md:p-10 flex flex-col md:flex-row gap-8 lg:gap-12 shadow-md border border-gray-100 dark:border-gray-800 transition-colors duration-300">
        
        {/* Left Side: Avatar & Socials */}
        <div className="flex flex-col items-center gap-4 md:w-1/4 shrink-0 justify-center">
          <div 
            onClick={() => setIsModalOpen(true)}
            className="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-[6px] border-gray-50 dark:border-gray-800 shadow-xl cursor-pointer hover:opacity-80 transition-opacity relative group"
          >
            <img 
              src={user?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80"} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 hidden group-hover:flex items-center justify-center text-white font-medium">
              Change
            </div>
          </div>
          <div className="text-center mt-2">
            <h3 className="font-semibold text-xl text-gray-800 dark:text-gray-200">{user?.role || "Web Developer"}</h3>
            <div className="flex justify-center gap-5 mt-4 text-gray-500 dark:text-gray-400">
              <a href={user?.socials?.facebook || "#"} target="_blank" rel="noreferrer" className="hover:text-[#003DE0] hover:scale-110 transition-all"><FaFacebookF size={22} /></a>
              <a href={user?.socials?.linkedin || "#"} target="_blank" rel="noreferrer" className="hover:text-[#003DE0] hover:scale-110 transition-all"><FaLinkedinIn size={22} /></a>
              <a href={user?.socials?.github || "#"} target="_blank" rel="noreferrer" className="hover:text-[#003DE0] hover:scale-110 transition-all"><FaGithub size={22} /></a>
              <a href={user?.socials?.instagram || "#"} target="_blank" rel="noreferrer" className="hover:text-[#003DE0] hover:scale-110 transition-all"><FaInstagram size={22} /></a>
            </div>
          </div>
        </div>

        {/* Right Side: Details */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-gray-900 dark:text-white tracking-tight">
            Welcome {initialFirstName || "User"}!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 font-medium mb-8 text-lg">
            Email : {user?.email || "user@example.com"}
          </p>
          
          <div className="mb-8">
            <h4 className="font-semibold text-xl mb-3 text-gray-800 dark:text-gray-200">About Me</h4>
            <div className="bg-gray-50 dark:bg-[#1a1a1a] p-5 md:p-6 rounded-2xl border border-gray-100 dark:border-gray-800 text-gray-600 dark:text-gray-400 text-base leading-relaxed shadow-inner min-h-[100px]">
              {user?.bio || "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."}
            </div>
          </div>

          <div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-white dark:bg-gray-100 text-gray-900 px-8 py-2.5 rounded-lg font-bold shadow-md hover:bg-gray-50 dark:hover:bg-white transition-all border border-gray-200 active:scale-95"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-[#121212] p-6 rounded-2xl shadow-md hover:shadow-lg border border-gray-100 dark:border-gray-800 transition-all duration-300 hover:-translate-y-1">
            <div className="flex justify-between items-start mb-6">
              <h4 className="text-sm font-semibold text-gray-500 dark:text-gray-400 tracking-wide">{stat.title}</h4>
              <div className="text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">{stat.icon}</div>
            </div>
            <h2 className="text-3xl font-extrabold mb-2 text-gray-900 dark:text-white">{stat.count}</h2>
            <p className="text-sm text-emerald-500 font-semibold">{stat.increase}</p>
          </div>
        ))}
      </div>

      {/* Edit Profile Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#121212] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200 relative">
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
            >
              <IoMdClose size={24} />
            </button>
            
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Edit Profile</h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm">Make changes to your profile here.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">First Name</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-[#003DE0] focus:ring-1 focus:ring-[#003DE0] transition-colors dark:text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Last Name</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-[#003DE0] focus:ring-1 focus:ring-[#003DE0] transition-colors dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Facebook</label>
                    <input 
                      type="url" 
                      name="facebook"
                      placeholder="Enter a URL"
                      value={formData.facebook}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-[#003DE0] focus:ring-1 focus:ring-[#003DE0] transition-colors dark:text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Instagram</label>
                    <input 
                      type="url" 
                      name="instagram"
                      placeholder="Enter a URL"
                      value={formData.instagram}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-[#003DE0] focus:ring-1 focus:ring-[#003DE0] transition-colors dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Linkedin</label>
                    <input 
                      type="url" 
                      name="linkedin"
                      placeholder="Enter a URL"
                      value={formData.linkedin}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-[#003DE0] focus:ring-1 focus:ring-[#003DE0] transition-colors dark:text-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Github</label>
                    <input 
                      type="url" 
                      name="github"
                      placeholder="Enter a URL"
                      value={formData.github}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-[#003DE0] focus:ring-1 focus:ring-[#003DE0] transition-colors dark:text-white"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Description</label>
                  <textarea 
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-[#003DE0] focus:ring-1 focus:ring-[#003DE0] transition-colors resize-none dark:text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-1">Picture</label>
                  <div className="flex items-center gap-4">
                    <input 
                      type="file" 
                      name="picture"
                      accept="image/*"
                      onChange={handleChange}
                      className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-gray-100 dark:file:bg-gray-800 file:text-gray-700 dark:file:text-gray-300 hover:file:bg-gray-200 dark:hover:file:bg-gray-700 cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button 
                    type="submit"
                    className="bg-[#0f172a] dark:bg-white text-white dark:text-black px-8 py-2.5 rounded-lg font-bold hover:opacity-90 transition-opacity shadow-md"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BloggerProfile;