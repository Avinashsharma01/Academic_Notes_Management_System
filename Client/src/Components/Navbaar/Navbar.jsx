import { useContext, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Context/AuthContext";

// Import component parts
import NavbarBrand from "./Components/NavbarBrand";
import NavigationLinks from "./Components/NavigationLinks";
import AuthButtons from "./Components/AuthButtons";
import ProfileDropdown from "./Components/ProfileDropdown";

const Navbar = () => {
    const { user, logout, admin, Adminlogout, superAdmin, superAdminLogout } = useContext(AuthContext);
    const [showMenu, setShowMenu] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [showAuthDropdown, setShowAuthDropdown] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const profileRef = useRef(null);
    const authDropdownRef = useRef(null);
    const navigate = useNavigate();

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                profileRef.current &&
                !profileRef.current.contains(event.target)
            ) {
                setShowProfile(false);
            }
            if (
                authDropdownRef.current &&
                !authDropdownRef.current.contains(event.target)
            ) {
                setShowAuthDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        if (superAdmin) {
            superAdminLogout();
        } else if (admin) {
            Adminlogout();
        } else {
            logout();
        }
        setShowProfile(false);
    };

    const toggleMenu = () => {
        setShowMenu((prev) => !prev);
    };

    const toggleProfile = () => {
        setShowProfile((prev) => !prev);
    };

    const toggleAuthDropdown = () => {
        setShowAuthDropdown((prev) => !prev);
    };

    return (
        <nav
            className={`${scrolled
                ? "bg-linear-to-r from-gray-900 to-slate-900 shadow-lg"
                : "bg-linear-to-r from-gray-800 to-slate-800"
                } 
            w-full py-3 text-white flex justify-between items-center sticky top-0 left-0 z-40 px-4 sm:px-8 transition-all duration-300`}
        >
            <NavbarBrand toggleMenu={toggleMenu} />

            {/* Navigation Links */}
            <NavigationLinks
                showMenu={showMenu}
                setShowMenu={setShowMenu}
                user={user}
                admin={admin}
                superAdmin={superAdmin}
            />

            {/* Auth or Profile Section */}
            <div className="flex items-center">
                {user || admin || superAdmin ? (
                    <ProfileDropdown
                        toggleProfile={toggleProfile}
                        showProfile={showProfile}
                        profileRef={profileRef}
                        admin={admin}
                        user={user}
                        superAdmin={superAdmin}
                        handleLogout={handleLogout}
                        navigate={navigate}
                        setShowProfile={setShowProfile}
                    />
                ) : (
                    <AuthButtons
                        toggleAuthDropdown={toggleAuthDropdown}
                        showAuthDropdown={showAuthDropdown}
                        authDropdownRef={authDropdownRef}
                        setShowAuthDropdown={setShowAuthDropdown}
                    />
                )}
            </div>
        </nav>
    );
};

export default Navbar;
