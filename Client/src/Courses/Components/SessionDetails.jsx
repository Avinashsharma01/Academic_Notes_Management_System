/* eslint-disable react/prop-types */
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const SessionDetails = ({ session }) => {
    const navigate = useNavigate();

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Session Details
                    </h2>
                    <p className="text-gray-600">
                        Viewing courses for the academic session{" "}
                        <span className="font-semibold text-blue-600">
                            {session}
                        </span>
                    </p>
                </div>
                <button
                    onClick={() => navigate("/dashboard")}
                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg flex items-center gap-2 transition-colors"
                >
                    Change Session
                    <FaArrowRight className="text-sm" />
                </button>
            </div>
        </div>
    );
};

export default SessionDetails;
