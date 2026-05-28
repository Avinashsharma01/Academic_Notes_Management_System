import { NavLink } from "react-router-dom";
import AuthContext from "../Context/AuthContext";
import { useContext } from "react";

const CallToAction = () => {
    const { user } = useContext(AuthContext);
    const { admin } = useContext(AuthContext);
    return (
        <div className="bg-gradient-to-r from-blue-600/20 to-indigo-600/20 p-8 rounded-lg shadow-xl border border-blue-500/30 text-center mt-8 mb-8">
            <h2 className="text-2xl font-bold text-blue-300 mb-4">
                Ready to Enhance Your Learning Experience?
            </h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Join thousands of students already using our platform to access
                quality educational materials and improve their academic
                performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {user || admin ? null : (
                    <NavLink
                        to="/signup"
                        className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center"
                    >
                        Register Now
                    </NavLink>
                )}

                <NavLink
                    to="/notes"
                    className="bg-slate-700 hover:bg-slate-600 text-white font-medium px-6 py-3 rounded-lg transition-colors duration-300 flex items-center justify-center"
                >
                    Browse Notes
                </NavLink>
            </div>
        </div>
    );
};

export default CallToAction;
