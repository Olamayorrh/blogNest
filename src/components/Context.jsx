import React, { createContext, useCallback, useEffect, useState } from "react";

export const userContext = createContext();

export const BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000'
  : 'https://blognest-backend-foyt.onrender.com';
export const API_URL = `${BASE_URL}/api`;

// Decode a JWT token's payload without a library
const isTokenExpired = (token) => {
  if (!token) return true;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    // `exp` is in seconds, Date.now() is in milliseconds
    return payload.exp * 1000 < Date.now();
  } catch {
    return true; // Malformed token → treat as expired
  }
};

const Context = ({ children }) => {
  const navItems = ["Home", "About", "Blog"];
  const [hovered, setHovered] = useState(null);

  // Theme defaults to 'light'; restored from MongoDB when user logs in
  const [theme, setTheme] = useState("light");
  const [user, setUser] = useState(null);

  // Controls which tab is shown on the LoginSignUp page (true = Login, false = Signup)
  const [isLogin, setIsLogin] = useState(true);

  // On initial load: restore session from localStorage token
  // and apply the user's saved theme from their MongoDB profile.
  // If the token has expired while the user was away, log them out immediately.
  useEffect(() => {
    const savedUser = localStorage.getItem("blogNestUser");
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      if (isTokenExpired(parsedUser.token)) {
        // Token expired while the user was away — clean up
        localStorage.removeItem("blogNestUser");
        setUser(null);
        return;
      }
      setUser(parsedUser);
      // Restore theme from the user object saved at login
      if (parsedUser.themePreference) {
        setTheme(parsedUser.themePreference);
      }
    }
  }, []);

  // Periodically check if the token has expired (every 60 seconds)
  // so that an idle user gets logged out automatically
  useEffect(() => {
    if (!user?.token) return;

    const interval = setInterval(() => {
      if (isTokenExpired(user.token)) {
        console.log("Session expired — logging out automatically.");
        setUser(null);
        setTheme("light");
        localStorage.removeItem("blogNestUser");
      }
    }, 60_000); // check every minute

    return () => clearInterval(interval);
  }, [user]);

  const toggleTheme = async () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme); // Update UI immediately

    // If user is logged in, persist the new theme to MongoDB
    if (user?.token) {
      try {
        await fetch(`${API_URL}/users/theme`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
          body: JSON.stringify({ themePreference: newTheme }),
        });
        // Keep the cached user object in localStorage in sync too
        const updatedUser = { ...user, themePreference: newTheme };
        setUser(updatedUser);
        localStorage.setItem("blogNestUser", JSON.stringify(updatedUser));
        console.log(`Theme saved to MongoDB: ${newTheme}`);
      } catch (error) {
        console.error("Failed to save theme preference:", error.message);
      }
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      setUser(data);
      // Restore the user's saved theme from their MongoDB record
      if (data.themePreference) {
        setTheme(data.themePreference);
      }
      localStorage.setItem("blogNestUser", JSON.stringify(data));
      return { success: true };
    } catch (error) {
      console.error("Login error:", error.message);
      return { success: false, message: error.message };
    }
  };

  const signup = async (userData) => {
    try {
      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: userData.name, // Map 'name' to 'username' for backend
          email: userData.email,
          password: userData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Signup failed");
      }

      setUser(data);
      if (data.themePreference) {
        setTheme(data.themePreference);
      }
      localStorage.setItem("blogNestUser", JSON.stringify(data));
      return { success: true };
    } catch (error) {
      console.error("Signup error:", error.message);
      return { success: false, message: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    setTheme("light"); // Reset to default on logout
    localStorage.removeItem("blogNestUser");
  };

  // Apply the theme class to the <html> element whenever theme changes
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <userContext.Provider
      value={{
        theme,
        setTheme,
        navItems,
        hovered,
        setHovered,
        toggleTheme,
        user,
        setUser,
        login,
        signup,
        logout,
        isLogin,
        setIsLogin,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default Context;
