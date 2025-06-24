/* eslint-disable react/prop-types */

import { FaCloudUploadAlt, FaSpinner } from "react-icons/fa";

const SubmitButton = ({ isUploading }) => {
    return (
        <div className="pt-4">
            <button
                type="submit"
                className={`w-full p-3 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    isUploading
                        ? "bg-blue-700 cursor-not-allowed"
                        : "bg-blue-500 hover:bg-blue-600 shadow-lg hover:shadow-blue-500/20"
                }`}
                disabled={isUploading}
            >
                {isUploading ? (
                    <>
                        <FaSpinner className="animate-spin h-5 w-5 mr-2" />
                        Uploading...
                    </>
                ) : (
                    <>
                        <FaCloudUploadAlt className="h-5 w-5 mr-2" />
                        Upload Note
                    </>
                )}
            </button>
        </div>
    );
};

export default SubmitButton;
