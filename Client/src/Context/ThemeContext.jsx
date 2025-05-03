/* eslint-disable react/prop-types */
import { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Check for user's preference in localStorage, default to light
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const savedTheme = localStorage.getItem("theme");
        // Also check system preference if no saved theme
        const prefersDark = window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches;
        return savedTheme === "dark" || (!savedTheme && prefersDark);
    });

    // Apply theme whenever isDarkMode changes
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("theme", "light");
        }
    }, [isDarkMode]);

    // Toggle theme function
    const toggleTheme = () => {
        setIsDarkMode((prev) => !prev);
    };

    return (
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Custom hook for using the theme context
export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};

export default ThemeContext;
