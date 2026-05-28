/* eslint-disable react/prop-types */

import { FaBook } from "react-icons/fa";

const TextFields = ({ formData, handleChange }) => {
    return (
        <>
            <div className="col-span-1 lg:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                    Title
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaBook className="h-5 w-5 text-blue-400" />
                    </div>
                    <input
                        type="text"
                        name="title"
                        placeholder="Enter note title"
                        className="appearance-none block w-full pl-10 pr-3 py-3 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-gray-300"
                        onChange={handleChange}
                        value={formData.title}
                        required
                    />
                </div>
            </div>

            <div className="col-span-1 lg:col-span-2">
                <label className="block text-sm font-medium text-gray-300 mb-1">
                    Description
                </label>
                <textarea
                    name="description"
                    placeholder="Brief description about the note"
                    rows="3"
                    className="appearance-none block w-full p-3 bg-slate-600 border border-slate-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder:text-gray-300"
                    onChange={handleChange}
                    value={formData.description}
                ></textarea>
            </div>
        </>
    );
};

export default TextFields;
