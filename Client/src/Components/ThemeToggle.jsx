import { useTheme } from "../Context/ThemeContext";
import { SunIcon, MoonIcon } from "@heroicons/react/24/outline";

const ThemeToggle = () => {
    const { isDarkMode, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-900"
            aria-label={
                isDarkMode ? "Switch to light mode" : "Switch to dark mode"
            }
        >
            {isDarkMode ? (
                <SunIcon className="h-5 w-5 text-yellow-300" />
            ) : (
                <MoonIcon className="h-5 w-5 text-neutral-700" />
            )}
        </button>
    );
};

export default ThemeToggle;
