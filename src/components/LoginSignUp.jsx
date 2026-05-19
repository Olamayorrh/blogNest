import React, { useState, useContext } from "react";
import NavBar from "./NavBar";
import { userContext } from "./Context";
import { useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const LoginSignUp = () => {
  // isLogin and setIsLogin now live in context so the Navbar
  // (and any other page) can drive which tab opens
  const { login, signup, isLogin, setIsLogin } = useContext(userContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  // Reset form fields whenever switching between Login / Signup tabs
  const switchToSignup = () => {
    setIsLogin(false);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setError("");
  };

  const switchToLogin = () => {
    setIsLogin(true);
    setFormData({ name: "", email: "", password: "", confirmPassword: "" });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // 1. Check required fields and specific signup validations
    if (isLogin) {
      if (!formData.email || !formData.password) {
        setError("Please fill in all fields");
        return;
      }
    } else {
      if (
        !formData.name ||
        !formData.email ||
        !formData.password ||
        !formData.confirmPassword
      ) {
        setError("Please fill in all fields");
        return;
      }
      const nameParts = formData.name.trim().split(/\s+/);
      if (nameParts.length < 2) {
        setError("Please enter your full name (first and last name)");
        return;
      }
      if (formData.name.trim().length < 3) {
        setError("Full name must be at least 3 characters long");
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }
    }

    // 2. Validate Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    // 3. Validate Password (Complex: 1 upper, 1 lower, 1 digit, 1 special char, min 8)
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setError("Password must be at least 8 characters and include uppercase, lowercase, number, and special character.");
      return;
    }

    // 4. Submit to API
    if (isLogin) {
      const result = await login(formData.email, formData.password);
      if (result.success) {
        alert("Login successful!");
        navigate("/blogger/profile");
      } else {
        setError(result.message);
      }
    } else {
      const result = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      if (result.success) {
        alert("Sign up successful!");
        navigate("/blogger/profile");
      } else {
        setError(result.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0a] text-black dark:text-white transition-colors duration-300">
      <NavBar />

      <main className="flex flex-col items-center justify-center md:py-20 p-6 mt-[5%]">
        <div className="w-full md:w-[90%] lg:w-[70%] xl:w-[50%] 2xl:w-[35%] bg-white dark:bg-[#121212] rounded-2xl shadow-2xl border-gray-100 dark:border-2 dark:border-gray-100 p-8 transition-all duration-300">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-3 md:text-3xl 2xl:text-6xl 2xl:mb-6">
              {isLogin ? "Welcome Back" : "Start Writing"}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 md:text-xl 2xl:text-4xl">
              {isLogin
                ? "Sign in to continue to your creative space"
                : "Create your account to join a community of curious minds"}
            </p>
          </div>

          {/* Social Login */}
          <button className="w-full flex items-center justify-center gap-3 py-3 px-4 2xl:text-3xl border text-[0.76rem] md:text-2xl border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors font-medium mb-6">
            <FcGoogle size={24} />
            Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-6">
            <div className="h-[1px] bg-gray-200 dark:bg-gray-700 flex-1"></div>
            <span className="text-xs md:text-xl text-gray-500 uppercase font-semibold">
              Or continue with email
            </span>
            <div className="h-[1px] bg-gray-200 dark:bg-gray-700 flex-1"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 text-sm rounded-lg text-center">
                {error}
              </div>
            )}

            {!isLogin && (
              <div className="space-y-1.5">
                <label
                  htmlFor="name"
                  className="text-sm md:text-2xl font-medium ml-1 2xl:text-3xl"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 md:text-2xl mt-2 2xl:text-3xl 2xl:mt-2.5 rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#003DE0] focus:border-transparent transition-all"
                />
              </div>
            )}

            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="text-sm md:text-2xl font-medium ml-1 2xl:text-3xl"
              >
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="w-full px-4 py-3 md:text-2xl mt-2 2xl:text-3xl 2xl:mt-2.5 cursor-pointer rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#003DE0] focus:border-transparent transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="text-sm md:text-2xl font-medium ml-1 2xl:text-3xl"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 md:text-2xl mt-2 2xl:text-3xl 2xl:mt-2.5 cursor-pointer rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#003DE0] focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 mt-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </button>
              </div>
              {!isLogin && (
                <p className="text-xs md:text-sm 2xl:text-xl text-gray-500 dark:text-gray-400 mt-1 ml-1 leading-tight">
                  Must be at least 8 characters long, include 1 uppercase, 1 lowercase, 1 number, and 1 special character.
                </p>
              )}
            </div>

            {!isLogin && (
              <div className="space-y-1.5">
                <label
                  htmlFor="cpassword"
                  className="text-sm md:text-2xl font-medium ml-1 2xl:text-3xl"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="cpassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 md:text-2xl mt-2 2xl:text-3xl 2xl:mt-2.5 cursor-pointer rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#003DE0] focus:border-transparent transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 mt-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#003DE0] md:text-2xl 2xl:text-4xl text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-all shadow-md shadow-blue-500/10 active:scale-[0.98] mt-2"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center md:text-2xl 2xl:text-4xl text-gray-600 dark:text-gray-400">
            {isLogin ? (
              <p>
                Don't have an account?{" "}
                <button
                  onClick={switchToSignup}
                  className="text-[#003DE0] font-bold hover:underline"
                >
                  Sign Up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{" "}
                <button
                  onClick={switchToLogin}
                  className="text-[#003DE0] font-bold hover:underline"
                >
                  Log In
                </button>
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginSignUp;
