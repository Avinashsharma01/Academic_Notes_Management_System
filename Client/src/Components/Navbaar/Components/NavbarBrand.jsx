/* eslint-disable react/prop-types */

import { NavLink } from "react-router-dom";
import { ImMenu } from "react-icons/im";

const NavbarBrand = ({ toggleMenu }) => {
    return (
        <div className="flex items-center">
            <button
                className="mr-3 p-2 rounded-lg text-2xl lg:hidden hover:bg-white/10 transition-colors"
                onClick={toggleMenu}
                aria-label="Toggle menu"
            >
                <ImMenu />
            </button>

            <NavLink to="/" className="flex items-center">
                <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-400">
                    Hellomates
                </div>
            </NavLink>
        </div>
    );
};

export default NavbarBrand;
