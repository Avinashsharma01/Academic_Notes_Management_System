import { FaCloudUploadAlt } from "react-icons/fa";

const UploadHeader = () => {
    return (
        <div className="text-center mb-8">
            <div className="mx-auto h-20 w-20 rounded-full bg-blue-500 flex items-center justify-center mb-4 shadow-lg shadow-blue-500/30">
                <FaCloudUploadAlt className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-blue-400 tracking-tight">
                Upload Notes
            </h1>
            <p className="mt-2 text-gray-300">
                Share educational resources with students
            </p>
        </div>
    );
};

export default UploadHeader;
