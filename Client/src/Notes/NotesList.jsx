import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../Api/axiosInstance";
import AuthContext from "../Context/AuthContext";

const NotesList = () => {
    const { AdminToken, UserToken } = useContext(AuthContext);
    const [notes, setNotes] = useState([]);
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    console.log(notes);

    // Extract parameters from URL
    const session = queryParams.get("session") || "";
    const course = queryParams.get("course") || "";
    const branch = queryParams.get("branch") || "";
    const semester = queryParams.get("semester") || "";
    const subject = queryParams.get("subject") || "";

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const token = UserToken || AdminToken; // Use either UserToken or AdminToken
                if (!token) {
                    console.error("No token available");
                    return;
                }

                const { data } = await API.get("/notes", {
                    headers: {
                        Authorization: token, // Include the token in the headers
                    },
                });

                console.log(data);
                // Filter notes based on the selected hierarchy (case-insensitive)
                const filteredNotes = data.filter(
                    (note) =>
                        (!session ||
                            note.session.toLowerCase() ===
                                session.toLowerCase()) &&
                        (!course ||
                            note.course
                                .toLowerCase()
                                .includes(course.toLowerCase())) &&
                        (!branch ||
                            note.branch.toLowerCase() ===
                                branch.toLowerCase()) &&
                        (!semester ||
                            note.semester
                                .toLowerCase()
                                .includes(semester.toLowerCase())) &&
                        (!subject ||
                            note.subject
                                .toLowerCase()
                                .includes(subject.toLowerCase()))
                );

                setNotes(filteredNotes);
            } catch (error) {
                console.error("Error fetching notes:", error);
            }
        };

        fetchNotes();
    }, [session, subject, semester, branch, course, UserToken, AdminToken]);

    return (
        <div className="p-5 bg-gray-800 text-white min-h-screen">
            <h1 className="text-3xl font-bold text-center mb-4">
                Notes for {subject} - {semester} ({branch.toUpperCase()},{" "}
                {course.toUpperCase()}, {session})
            </h1>

            {notes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {notes.map((note) => (
                        <div
                            key={note._id}
                            className="bg-gray-700 p-4 rounded-lg shadow-lg hover:scale-105 transform ease-in-out duration-300"
                        >
                            <h2 className="font-bold text-lg">{note.title}</h2>
                            <p className="text-sm text-gray-300">
                                {note.description}
                            </p>
                            <p className="text-xs text-gray-400">
                                Session: {note.session}
                            </p>
                            <p className="text-xs text-gray-400">
                                Course: {note.course}
                            </p>
                            <p className="text-xs text-gray-400">
                                Branch: {note.branch}
                            </p>
                            <p className="text-xs text-gray-400">
                                Semester: {note.semester}
                            </p>
                            <p className="text-xs text-gray-400">
                                Subject: {note.subject}
                            </p>
                            <a
                                href={note.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block mt-3 bg-blue-500 text-white text-center p-2 rounded hover:bg-blue-600 "
                            >
                                📄 Download Note
                            </a>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center text-gray-400">
                    No notes found for the selected criteria.
                </p>
            )}
        </div>
    );
};

export default NotesList;

// import { useContext, useEffect, useState } from "react";
// import { useLocation } from "react-router-dom";
// import API from "../Api/axiosInstance";
// import AuthContext from "../Context/AuthContext";

// const NotesList = () => {
//     const { AdminToken, UserToken } = useContext(AuthContext);

//     const [notes, setNotes] = useState([]);
//     const location = useLocation();
//     const queryParams = new URLSearchParams(location.search);

//     console.log(notes);

//     // Extract parameters from URL
//     const session = queryParams.get("session");
//     const course = queryParams.get("course");
//     const branch = queryParams.get("branch");
//     const semester = queryParams.get("semester");
//     const subject = queryParams.get("subject");

//     useEffect(() => {
//         const fetchNotes = async () => {
//             try {
//                 const token = UserToken || AdminToken; // Use either UserToken or AdminToken
//                 console.log(token);
//                 if (!token) {
//                     console.error("No token available");
//                     return;
//                 }

//                 const response = await API.get("/notes", {
//                     headers: {
//                         Authorization: token, // Include the token in the headers
//                     },
//                 });

//                 // Filter notes based on the selected hierarchy
//                 const filteredNotes = response.data.filter(
//                     (note) =>
//                         // note.subject.toLowerCase() === subject?.toLowerCase() &&
//                         // note.semester.toString() === semester &&
//                         // note.branch.toLowerCase() === branch?.toLowerCase() &&
//                         // note.course.toLowerCase() === course?.toLowerCase()
//                         (session
//                             ? note.session.toLowerCase() ===
//                               session.toLowerCase()
//                             : true) &&
//                         (course
//                             ? note.course.toLowerCase() === course.toLowerCase()
//                             : true) &&
//                         (branch
//                             ? note.branch.toLowerCase() === branch.toLowerCase()
//                             : true) &&
//                         (semester
//                             ? note.semester.toLowerCase() ===
//                               semester.toLowerCase()
//                             : true) &&
//                         (subject
//                             ? note.subject.toLowerCase() ===
//                               subject.toLowerCase()
//                             : true)
//                 );

//                 setNotes(filteredNotes);
//             } catch (error) {
//                 console.error("Error fetching notes:", error);
//             }
//         };

//         fetchNotes();
//     }, [session, subject, semester, branch, course, UserToken, AdminToken]);

//     return (
//         <div className="p-5 bg-gray-800 text-white min-h-screen">
//             <h1 className="text-3xl font-bold text-center mb-4">
//                 Notes for {subject} - {semester} ({branch}, {course}, {session})
//             </h1>

//             {notes.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//                     {notes.map((note) => (
//                         <div
//                             key={note._id}
//                             className="bg-gray-700 p-4 rounded-lg shadow-lg"
//                         >
//                             <h2 className="font-bold text-lg">{note.title}</h2>
//                             <p className="text-sm text-gray-300">
//                                 {note.description}
//                             </p>
//                             <p className="text-xs text-gray-400">
//                                 Session: {note.session}
//                             </p>
//                             <p className="text-xs text-gray-400">
//                                 Course: {note.course}
//                             </p>
//                             <p className="text-xs text-gray-400">
//                                 Branch: {note.branch}
//                             </p>
//                             <p className="text-xs text-gray-400">
//                                 Semester: {note.semester}
//                             </p>
//                             <p className="text-xs text-gray-400">
//                                 Subject: {note.subject}
//                             </p>
//                             <a
//                                 href={note.fileUrl}
//                                 target="_blank"
//                                 rel="noopener noreferrer"
//                                 className="block mt-3 bg-blue-500 text-white text-center p-2 rounded hover:bg-blue-600"
//                             >
//                                 📄 Download Note
//                             </a>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <p className="text-center text-gray-400">
//                     No notes found for the selected criteria.
//                 </p>
//             )}
//         </div>
//     );
// };

// export default NotesList;
