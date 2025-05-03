import React from 'react'
import { NavLink } from 'react-router-dom'

const RenderAuthButtons = () => {
  return (
    <>
            {/* Desktop View */}
            <div className="desktop flex justify-center items-center gap-5 max-sm:hidden">
                <NavLink
                    to="/signup"
                    className="bg-yellow-500 px-3 rounded-2xl p-1"
                >
                    Signup
                </NavLink>
                <NavLink
                    to="/login"
                    className="bg-green-600 px-5 rounded-2xl p-1"
                >
                    Login
                </NavLink>
                <NavLink
                    to="/adminLogin"
                    className="bg-blue-600 px-5 rounded-2xl p-1"
                >
                    Admin Login
                </NavLink>
            </div>

            <div className="phone relative sm:hidden">
                <button
                    onClick={toggleAuthDropdown}
                    className="bg-blue-500 px-4 py-1 rounded-3xl flex items-center gap-2"
                >
                    Auth
                </button>
                {showAuthDropdown && (
                    <div className="absolute right-0 mt-2 bg-white text-black shadow-lg rounded-md p-3 flex flex-col gap-2">
                        <NavLink
                            to="/signup"
                            className="bg-yellow-500 px-3 rounded-2xl p-1 text-center text-white"
                            onClick={() => toggleAuthDropdown(false)}
                        >
                            Signup
                        </NavLink>
                        <NavLink
                            to="/login"
                            className="bg-green-600 px-5 rounded-2xl p-1 text-center text-white"
                            onClick={() => toggleAuthDropdown(false)}
                        >
                            Login
                        </NavLink>
                        <NavLink
                            to="/adminLogin"
                            className="bg-blue-600 px-5 rounded-2xl p-1 text-center text-white"
                            onClick={() => toggleAuthDropdown(false)}
                        >
                            Admin Login
                        </NavLink>
                    </div>
                )}
            </div>
        </>
  )
}

export default RenderAuthButtons