/* eslint-disable react/prop-types */
import {
    FaDownload,
    FaEye,
    FaUser,
    FaCalendarAlt,
    FaTag,
} from "react-icons/fa";

const NoteCard = ({ note }) => {
    return (
        <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 duration-300">
            <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-2 truncate">
                    {note.title}
                </h2>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {note.description}
                </p>

                <div className="space-y-2 mb-4">
                    <div className="flex items-start gap-3">
                        <FaTag className="text-blue-500 mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500">Subject</p>
                            <p className="text-sm font-medium text-gray-700">
                                {note.subject}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-start gap-3">
                        <FaCalendarAlt className="text-purple-500 mt-1 flex-shrink-0" />
                        <div>
                            <p className="text-xs text-gray-500">Semester</p>
                            <p className="text-sm font-medium text-gray-700">
                                {note.semester}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                        <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full">
                            {note.branch}
                        </span>
                        <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full">
                            {note.course}
                        </span>
                        <span className="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                            {note.session}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                        <FaUser className="text-gray-400" />
                        <span>{note.uploaderName || "Anonymous"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaEye className="text-gray-400" />
                        <span>{note.views || 0} views</span>
                    </div>
                </div>

                <a
                    href={note.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-medium rounded-lg shadow-md transition-colors flex items-center justify-center gap-2"
                >
                    <FaDownload />
                    Download Note
                </a>
            </div>
        </div>
    );
};

export default NoteCard;
