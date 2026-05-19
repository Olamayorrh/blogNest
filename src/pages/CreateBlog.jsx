import React, { useState, useRef, useMemo, useContext } from 'react';
import JoditEditor from 'jodit-react';
import { userContext } from '../components/Context';
import { useNavigate, useSearchParams } from 'react-router';
import { useEffect } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { FiUploadCloud } from 'react-icons/fi';

const API_URL = "http://localhost:5000/api";

const CreateBlog = () => {
  const { user, theme } = useContext(userContext);
  const [searchParams] = useSearchParams();
  const blogId = searchParams.get('id');
  const isEditMode = !!blogId;

  const navigate = useNavigate();
  const editor = useRef(null);

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [isPublished, setIsPublished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Fetch blog data for editing
  useEffect(() => {
    if (isEditMode) {
      const fetchBlogData = async () => {
        try {
          const response = await fetch(`${API_URL}/blogs/${blogId}`);
          const data = await response.json();
          
          if (response.ok) {
            setTitle(data.title || '');
            setSubtitle(data.subtitle || '');
            setDescription(data.content || '');
            setCategory(data.category?.name || data.category || '');
            setIsPublished(data.isPublished || false);
            if (data.thumbnail) {
              setPreview(`http://localhost:5000/${data.thumbnail}`);
            }
          }
        } catch (error) {
          console.error('Error fetching blog data:', error);
          setMessage({ text: 'Failed to load blog data for editing.', type: 'error' });
        }
      };
      fetchBlogData();
    }
  }, [blogId, isEditMode]);

  const categories = [
    'Technology',
    'Business',
    'Design',
    'Culture',
    'Blogging',
    'Lifestyle',
    'Health',
    'Travel',
  ];

  // Jodit editor configuration
  const config = useMemo(() => ({
    readonly: false,
    theme: theme === 'dark' ? 'dark' : 'default',
    height: 400,
    toolbarAdaptive: true,
    toolbarSticky: false,
    showCharsCounter: true,
    showWordsCounter: true,
    showXPathInStatusbar: true,
    askBeforePasteHTML: false,
    askBeforePasteFromWord: false,
    placeholder: 'Start writing your blog content...',
    buttons: [
      'bold', 'italic', 'underline', 'strikethrough', '|',
      'ul', 'ol', 'indent', 'outdent', '|',
      'font', 'fontsize', 'brush', 'paragraph', '|',
      'superscript', 'subscript', '|',
      'image', 'video', 'table', 'link', '|',
      'align', 'undo', 'redo', '|',
      'hr', 'eraser', 'copyformat', '|',
      'symbol', 'fullsize', 'print', 'about',
    ],
    style: {
      background: theme === 'dark' ? '#1a1a1a' : '#ffffff',
      color: theme === 'dark' ? '#e5e7eb' : '#111827',
    },
  }), [theme]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setThumbnail(file);
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const removeThumbnail = () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setThumbnail(null);
    setPreview(null);
  };

  const handleSubmit = async (e, publish = false) => {
    e.preventDefault();

    // Validation
    if (!title.trim()) {
      setMessage({ text: 'Please enter a title for your blog.', type: 'error' });
      return;
    }
    if (!description.trim()) {
      setMessage({ text: 'Please add some content to your blog.', type: 'error' });
      return;
    }
    if (!category) {
      setMessage({ text: 'Please select a category.', type: 'error' });
      return;
    }

    setIsSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('subtitle', subtitle.trim());
      formData.append('description', description);
      formData.append('category', category);
      formData.append('isPublished', publish);
      if (thumbnail) {
        formData.append('thumbnail', thumbnail);
      }

      const response = await fetch(`${API_URL}/blogs${isEditMode ? `/${blogId}` : ''}`, {
        method: isEditMode ? 'PUT' : 'POST',
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to create blog');
      }

      setMessage({
        text: publish ? 'Blog published successfully!' : 'Blog saved as draft!',
        type: 'success',
      });

      setIsPublished(publish);

      // If published, reset form and navigate. If just saved, keep data but clear message.
      setTimeout(() => {
        if (publish) {
          setTitle('');
          setSubtitle('');
          setDescription('');
          setCategory('');
          removeThumbnail();
          setIsPublished(false);
          navigate('/blogger/blog');
        }
        setMessage({ text: '', type: '' });
      }, 1500);
    } catch (error) {
      console.error('Blog creation error:', error.message);
      setMessage({ text: error.message, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemove = () => {
    setTitle('');
    setSubtitle('');
    setDescription('');
    setCategory('');
    removeThumbnail();
    setIsPublished(false);
    setMessage({ text: '', type: '' });
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 pb-12">
      {/* Page Header */}
      <div className="space-y-3">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          {isEditMode ? 'Edit your blog' : "Let's create a blog"}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg">
          Make changes to your blog here. Click publish when you're done.
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={(e) => handleSubmit(e, !isPublished)}
          disabled={isSubmitting}
          className={`px-5 py-2.5 rounded-lg font-semibold text-sm transition-all duration-300 border shadow-sm
            ${isPublished
              ? 'bg-white dark:bg-[#1a1a1a] text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'
              : 'bg-[#0f172a] dark:bg-white text-white dark:text-black border-transparent hover:opacity-90'
            } ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'}`}
        >
          {isPublished ? 'UnPublish' : 'Publish'}
        </button>
        <button
          onClick={handleRemove}
          className="px-5 py-2.5 rounded-lg font-semibold text-sm bg-red-700 hover:bg-red-800 text-white transition-all duration-300 shadow-sm active:scale-95"
        >
          Remove Blog
        </button>
      </div>

      {/* Status Message */}
      {message.text && (
        <div
          className={`px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
            message.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
              : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Form */}
      <form onSubmit={(e) => handleSubmit(e, false)} className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="How to Create a Good YouTube Thumbnail"
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-[#003DE0] focus:ring-2 focus:ring-[#003DE0]/20 transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm md:text-base"
          />
        </div>

        {/* Subtitle */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
            Subtitle
          </label>
          <input
            type="text"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            placeholder="This is the subtitle for how to make Ecommerce website"
            className="w-full px-4 py-3 rounded-xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-[#003DE0] focus:ring-2 focus:ring-[#003DE0]/20 transition-all text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 text-sm md:text-base"
          />
        </div>

        {/* Description (Rich Text Editor) */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
            Description
          </label>
          <div className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a1a1a]">
            <JoditEditor
              ref={editor}
              value={description}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => setDescription(newContent)}
            />
          </div>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
            Category
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full md:w-80 appearance-none px-4 py-3 rounded-xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-[#003DE0] focus:ring-2 focus:ring-[#003DE0]/20 transition-all text-gray-900 dark:text-white text-sm md:text-base cursor-pointer pr-10"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat} value={cat.toLowerCase()}>
                  {cat}
                </option>
              ))}
            </select>
            {/* Dropdown Arrow */}
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Thumbnail */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 dark:text-gray-200">
            Thumbnail
          </label>

          {!preview ? (
            <label className="flex flex-col items-center justify-center w-full md:w-96 h-44 rounded-xl border-2 border-dashed border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-[#1a1a1a] hover:bg-gray-100 dark:hover:bg-[#222] cursor-pointer transition-all duration-300 group">
              <FiUploadCloud className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-3 group-hover:text-[#003DE0] transition-colors" />
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-[#003DE0] transition-colors">
                Click to upload thumbnail
              </span>
              <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                PNG, JPG, GIF up to 2MB
              </span>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative w-full md:w-96 group">
              <img
                src={preview}
                alt="Thumbnail Preview"
                className="w-full h-52 object-cover rounded-xl border border-gray-200 dark:border-gray-700 shadow-md"
              />
              <button
                type="button"
                onClick={removeThumbnail}
                className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                ✕
              </button>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 truncate">
                {thumbnail?.name}
              </p>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm bg-[#0f172a] dark:bg-white text-white dark:text-black hover:opacity-90 transition-all duration-300 shadow-sm active:scale-95"
          >
            <IoArrowBack size={16} />
            Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-8 py-2.5 rounded-lg font-semibold text-sm bg-[#003DE0] hover:bg-blue-700 text-white transition-all duration-300 shadow-sm ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'active:scale-95'
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Saving...
              </span>
            ) : (
              'Save'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateBlog;