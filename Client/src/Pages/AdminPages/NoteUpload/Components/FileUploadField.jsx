/* eslint-disable react/prop-types */
import { FaFile } from "react-icons/fa";

const FileUploadField = ({ handleFileChange, fileInputRef, selectedFile }) => {
    return (
        <div className="col-span-1 lg:col-span-2">
            <label className="block text-sm font-medium text-gray-300 mb-1">
                Upload File
            </label>
            <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer border-slate-500 bg-slate-600/50 hover:bg-slate-600 transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <FaFile className="w-8 h-8 mb-3 text-blue-400" />
                        <p className="mb-2 text-sm text-gray-300">
                            <span className="font-semibold">
                                Click to upload
                            </span>{" "}
                            or drag and drop
                        </p>
                        <p className="text-xs text-gray-400">
                            PDF, DOCX, PPTX (MAX. 10MB)
                        </p>
                    </div>
                    <input
                        type="file"
                        name="file"
                        className="hidden"
                        onChange={handleFileChange}
                        ref={fileInputRef}
                        required
                    />
                </label>
            </div>
            {selectedFile && (
                <p className="text-sm text-green-300 mt-2">
                    File selected: {selectedFile.name}
                </p>
            )}
        </div>
    );
};

export default FileUploadField;
