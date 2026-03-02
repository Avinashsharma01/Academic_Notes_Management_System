# NotesList Component: Complete Documentation

## Overview

The `NotesList` component is a comprehensive React component that handles displaying, filtering, and searching through academic notes. It's a critical part of the application's functionality, allowing users to browse notes based on various academic parameters like session, course, semester, branch, and subject.

## Component Workflow

### 1. Component Initialization & Data Loading

1. **Component Mount**

    - Scrolls to top of page
    - Extracts URL query parameters (session, course, branch, semester, subject)
    - Sets up state variables for notes, loading state, error handling, etc.

2. **Authentication Check**

    - Verifies user is authenticated either via token or cookie-based auth
    - Shows error if user is not properly authenticated

3. **Data Fetching**
    - Builds API request with filter parameters from URL
    - Handles special cases like admin-only views
    - Makes API call to retrieve notes from the server

### 2. Filtering System

The component implements a sophisticated filtering system with multiple levels:

1. **Server-Side Filtering**

    - Passes URL parameters to server API for initial filtering
    - Parameters include: session, course, branch, semester, subject, and uploader ID

2. **Client-Side Filtering**

    - Performs additional filtering on returned data to ensure accurate results
    - Addresses format mismatches between URL parameters and database values
    - Uses multiple matching strategies for each filter parameter

3. **Search Functionality**
    - Additional text-based filtering based on user search input
    - Searches through title, description, and subject fields

### 3. UI Rendering

1. **Conditional Rendering**

    - Shows loading state during data fetching
    - Shows error state if problems occur
    - Shows empty state if no notes found
    - Shows grid of notes when data is available

2. **Component Structure**
    - Header with subject/course information
    - Search and filter controls
    - Grid of note cards or empty state message

## Code Structure Breakdown

### Imports & Dependencies

```jsx
import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../Api/axiosInstance";
import AuthContext from "../Context/AuthContext";
import NoteCard from "./Components/NoteCard";
import NotesHeader from "./NotesHeader";
import NotesSearchFilter from "./Components/NotesSearchFilter";
import EmptyNotesList from "./Components/EmptyNotesList";
import { LoadingState, ErrorState } from "./Components/LoadingErrorStates";
```

### State Management

```jsx
const [notes, setNotes] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [searchQuery, setSearchQuery] = useState("");
const [filteredNotes, setFilteredNotes] = useState([]);
const [isAdminView, setIsAdminView] = useState(false);
const [showOnlyMyUploads, setShowOnlyMyUploads] = useState(false);
```

### URL Parameter Extraction

```jsx
const location = useLocation();
const queryParams = new URLSearchParams(location.search);

// Extract parameters from URL
const session = queryParams.get("session") || "";
const course = queryParams.get("course") || "";
const branch = queryParams.get("branch") || "";
const semester = queryParams.get("semester") || "";
const subject = queryParams.get("subject") || "";
```

### Data Fetching

The component uses an effect hook to fetch notes when filter parameters change:

```jsx
useEffect(
    () => {
        const fetchNotes = async () => {
            // Authentication check
            // API request configuration
            // API call
            // Client-side filtering
            // State updates
        };

        fetchNotes();
    },
    [
        /* dependencies */
    ]
);
```

### Advanced Filtering Logic

The component implements sophisticated filtering to handle format mismatches:

1. **Semester Filtering**

    ```jsx
    // Extract numeric part from semester strings for comparison
    const extractNumeric = (str) => {
        if (!str) return 0;
        return parseInt(String(str).match(/\d+/)?.[0] || "0", 10);
    };

    const semesterMatch =
        !semester ||
        note.semester.toLowerCase() === semester.toLowerCase() ||
        extractNumeric(note.semester) === extractNumeric(semester);
    ```

2. **Course Filtering**

    ```jsx
    const normalizedCourse = course.toLowerCase().replace(/[\s.]/g, "");
    const normalizedNoteCourse = note.course
        .toLowerCase()
        .replace(/[\s.]/g, "");

    const courseMatch =
        !course ||
        note.course.toLowerCase() === course.toLowerCase() ||
        note.course.toLowerCase().includes(course.toLowerCase()) ||
        course.toLowerCase().includes(note.course.toLowerCase()) ||
        normalizedNoteCourse === normalizedCourse ||
        normalizedNoteCourse.includes(normalizedCourse) ||
        normalizedCourse.includes(normalizedNoteCourse);
    ```

3. **Branch Filtering**
    ```jsx
    const branchMatch =
        !branch ||
        note.branch.toLowerCase() === branch.toLowerCase() ||
        note.branch.toLowerCase().replace(/[\s.]/g, "") ===
            branch.toLowerCase().replace(/[\s.]/g, "");
    ```

### Search Implementation

```jsx
useEffect(() => {
    if (searchQuery.trim() === "") {
        setFilteredNotes(notes);
        return;
    }

    const query = searchQuery.toLowerCase();
    const results = notes.filter(
        (note) =>
            note.title.toLowerCase().includes(query) ||
            note.description.toLowerCase().includes(query) ||
            note.subject.toLowerCase().includes(query)
    );

    setFilteredNotes(results);
}, [searchQuery, notes]);
```

### Debugging Tools

The component includes comprehensive debugging to aid in troubleshooting:

```jsx
console.debug("Filtering notes with params:", {
    filters: { session, course, branch, semester, subject },
    totalNotes: data.length,
    notes: data.map((n) => ({
        title: n.title,
        session: n.session,
        course: n.course,
        branch: n.branch,
        semester: n.semester,
        subject: n.subject,
    })),
});

// For each note, detailed logging about why it was filtered out
if (
    !sessionMatch ||
    !courseMatch ||
    !branchMatch ||
    !semesterMatch ||
    !subjectMatch
) {
    const mismatchReason = [];
    // Build detailed reasons...
    console.debug(`Note "${note.title}" filtered out due to:`, mismatchReason);
} else {
    // Log notes that match all filters
    console.debug(`Note "${note.title}" MATCHES ALL FILTERS:`, {
        note,
        filters,
    });
}
```

## Special Features

### 1. Admin-Only Views

-   Support for admin-specific views of notes
-   Option to filter notes by uploader (for admin users)

### 2. Flexible Authentication

-   Supports both token-based and cookie-based authentication
-   Works with both user and admin authentication

### 3. Error Handling

-   Specific error messages for authentication failures
-   General error handling for API failures
-   Loading states to improve user experience during data fetching

## UI Composition

```jsx
// Conditional rendering based on loading/error state
if (loading) return <LoadingState />;
if (error) return <ErrorState error={error} />;

// Main UI when data is loaded
return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-16">
        <NotesHeader
            subject={subject}
            branch={branch}
            course={course}
            semester={semester}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-20">
            <NotesSearchFilter
                searchQuery={searchQuery}
                handleSearchChange={handleSearchChange}
                // ...other props
            />

            {filteredNotes.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredNotes.map((note) => (
                        <NoteCard key={note._id} note={note} />
                    ))}
                </div>
            ) : (
                <EmptyNotesList
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    // ...other props
                />
            )}
        </div>
    </div>
);
```

## Data Flow Diagram

```
URL Parameters → API Request → Server Response → Client-side Filtering → Search Filtering → UI Rendering

    ┌─────────────┐       ┌───────────────┐       ┌────────────────┐
    │ URL Params  │──────▶│ API Request   │──────▶│ Server Response│
    └─────────────┘       └───────────────┘       └────────────────┘
                                                          │
                                                          ▼
    ┌─────────────┐       ┌───────────────┐       ┌────────────────┐
    │ UI Rendering│◀──────│Search Filtering│◀──────│Client Filtering│
    └─────────────┘       └───────────────┘       └────────────────┘
```

## Common Issues and Solutions

1. **Format Mismatches** - Solved with flexible matching strategies:

    - Extracting numeric values for semester comparison
    - Case-insensitive matching for all fields
    - Normalization of strings (removing spaces, dots)

2. **Search Efficiency** - Implemented efficient search across multiple note fields:

    - Title, description, and subject

3. **Authentication** - Robust auth handling with:

    - Support for both token and cookie-based authentication
    - Different authentication types (user vs admin)

4. **Debugging** - Comprehensive debug logging for troubleshooting:
    - Logs all filter parameters
    - Shows which notes match and don't match filters
    - Provides detailed reasons for filtering decisions

import { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import API from "../Api/axiosInstance";
import AuthContext from "../Context/AuthContext";
// Import components with proper error handling in case they don't load
import NoteCard from "./Components/NoteCard";
import NotesHeader from "./NotesHeader";
import NotesSearchFilter from "./Components/NotesSearchFilter";
import EmptyNotesList from "./Components/EmptyNotesList";
import { LoadingState, ErrorState } from "./Components/LoadingErrorStates";

const NotesList = () => {
// Scroll to top on component mount
useEffect(() => {
window.scrollTo(0, 0);
}, []);

    const { AdminToken, UserToken, user, admin } = useContext(AuthContext);
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredNotes, setFilteredNotes] = useState([]);
    const [isAdminView, setIsAdminView] = useState(false);
    const [showOnlyMyUploads, setShowOnlyMyUploads] = useState(false);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);

    // Extract parameters from URL
    const session = queryParams.get("session") || "";
    const course = queryParams.get("course") || "";
    const branch = queryParams.get("branch") || "";
    const semester = queryParams.get("semester") || "";
    const subject = queryParams.get("subject") || "";

    // Check if we're in the admin dashboard view and get uploaderId directly from URL
    const adminDashboard = queryParams.get("adminDashboard") === "true";
    const urlUploaderId = queryParams.get("uploaderId");

    useEffect(() => {
        // If this is the admin dashboard view, set appropriate flags
        if (adminDashboard && admin) {
            setIsAdminView(true);
            setShowOnlyMyUploads(true);
        }
    }, [adminDashboard, admin]);

    useEffect(() => {
        const fetchNotes = async () => {
            setLoading(true);
            try {
                // Check if we're authenticated either through token or cookie-based auth
                const isAuthenticated =
                    UserToken || AdminToken || user || admin;

                if (!isAuthenticated) {
                    console.error("No authentication detected");
                    setError("You must be logged in to view notes");
                    setLoading(false);
                    return;
                }

                // Use different approach depending on if we're showing only admin's uploads
                let url = "/notes";
                const params = {};

                // Add filter parameters for notes search
                if (session) params.session = session;
                if (course) params.course = course;
                if (branch) params.branch = branch;
                if (semester) params.semester = semester;
                if (subject) params.subject = subject;

                // Add admin ID filter if we're showing only their uploads
                // First priority: Use uploaderId from URL if available
                if (urlUploaderId) {
                    params.uploaderId = urlUploaderId;
                }
                // Second priority: Use admin ID if in admin view with filter enabled
                else if (isAdminView && showOnlyMyUploads && admin) {
                    params.uploaderId = admin._id;
                }

                // Configure request options
                const requestConfig = {
                    params,
                    withCredentials: true, // Ensure cookies are sent with the request
                };

                // Add token authorization header if available (for backward compatibility)
                const token = UserToken || AdminToken;
                if (token) {
                    requestConfig.headers = {
                        Authorization: token,
                    };
                }

                const { data } = await API.get(url, requestConfig); // Still perform client-side filtering for any parameters not handled by the API
                // More robust filtering to handle format mismatches (especially for semester like "6" vs "6th")                // Log all notes and filters for debugging
                console.debug("Filtering notes with params:", {
                    filters: { session, course, branch, semester, subject },
                    totalNotes: data.length,
                    notes: data.map((n) => ({
                        title: n.title,
                        session: n.session,
                        course: n.course,
                        branch: n.branch,
                        semester: n.semester,
                        subject: n.subject,
                    })),
                });

                const filtered = data.filter((note) => {
                    // Extract numeric part from semester strings for comparison
                    const extractNumeric = (str) => {
                        if (!str) return 0;
                        return parseInt(
                            String(str).match(/\d+/)?.[0] || "0",
                            10
                        );
                    };

                    // Session filtering - exact match
                    const sessionMatch =
                        !session ||
                        note.session.toLowerCase() === session.toLowerCase(); // Course filtering - more flexible matching
                    // Handle abbreviations like "btech" vs "B.Tech"
                    const normalizedCourse = course
                        .toLowerCase()
                        .replace(/[\s.]/g, "");
                    const normalizedNoteCourse = note.course
                        .toLowerCase()
                        .replace(/[\s.]/g, "");

                    const courseMatch =
                        !course ||
                        note.course.toLowerCase() === course.toLowerCase() ||
                        note.course
                            .toLowerCase()
                            .includes(course.toLowerCase()) ||
                        course
                            .toLowerCase()
                            .includes(note.course.toLowerCase()) ||
                        // Match without spaces and dots (btech = b.tech = b tech)
                        normalizedNoteCourse === normalizedCourse ||
                        normalizedNoteCourse.includes(normalizedCourse) ||
                        normalizedCourse.includes(normalizedNoteCourse); // Branch filtering - exact match with case insensitivity
                    // Also handle common abbreviations like "it" vs "IT" or "CSE" vs "Computer Science Engineering"
                    const branchMatch =
                        !branch ||
                        note.branch.toLowerCase() === branch.toLowerCase() ||
                        // Remove spaces and dots for more flexible matching
                        note.branch.toLowerCase().replace(/[\s.]/g, "") ===
                            branch.toLowerCase().replace(/[\s.]/g, "");

                    // Semester filtering - numeric comparison to handle "6th" vs "6" etc.
                    const semesterMatch =
                        !semester ||
                        note.semester.toLowerCase() ===
                            semester.toLowerCase() ||
                        extractNumeric(note.semester) ===
                            extractNumeric(semester);

                    // Subject filtering - more flexible matching
                    const subjectMatch =
                        !subject ||
                        note.subject.toLowerCase() === subject.toLowerCase() ||
                        note.subject
                            .toLowerCase()
                            .includes(subject.toLowerCase()) ||
                        subject
                            .toLowerCase()
                            .includes(note.subject.toLowerCase());
                    // For debugging filtering issues - shows detailed info for mismatched notes
                    if (session || course || branch || semester || subject) {
                        if (
                            !sessionMatch ||
                            !courseMatch ||
                            !branchMatch ||
                            !semesterMatch ||
                            !subjectMatch
                        ) {
                            const mismatchReason = [];
                            if (!sessionMatch)
                                mismatchReason.push(
                                    `session: "${note.session}" vs filter "${session}"`
                                );
                            if (!courseMatch)
                                mismatchReason.push(
                                    `course: "${note.course}" vs filter "${course}"`
                                );
                            if (!branchMatch)
                                mismatchReason.push(
                                    `branch: "${note.branch}" vs filter "${branch}"`
                                );
                            if (!semesterMatch)
                                mismatchReason.push(
                                    `semester: "${
                                        note.semester
                                    }" vs filter "${semester}" (numeric: ${extractNumeric(
                                        note.semester
                                    )} vs ${extractNumeric(semester)})`
                                );
                            if (!subjectMatch)
                                mismatchReason.push(
                                    `subject: "${note.subject}" vs filter "${subject}"`
                                );
                            console.debug(
                                `Note "${note.title}" filtered out due to:`,
                                mismatchReason
                            );
                        } else {
                            // Log notes that match all filters to help with debugging
                            console.debug(
                                `Note "${note.title}" MATCHES ALL FILTERS:`,
                                {
                                    note: {
                                        session: note.session,
                                        course: note.course,
                                        branch: note.branch,
                                        semester: note.semester,
                                        subject: note.subject,
                                    },
                                    filters: {
                                        session,
                                        course,
                                        branch,
                                        semester,
                                        subject,
                                    },
                                }
                            );
                        }
                    }

                    return (
                        sessionMatch &&
                        courseMatch &&
                        branchMatch &&
                        semesterMatch &&
                        subjectMatch
                    );
                });

                setNotes(filtered);
                setFilteredNotes(filtered);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching notes:", error);

                // Show a more specific error if it's an authentication issue
                if (error.response && error.response.status === 401) {
                    setError("Your session has expired. Please log in again.");
                } else {
                    setError("Failed to load notes. Please try again later.");
                }
                setLoading(false);
            }
        };

        fetchNotes();
    }, [
        session,
        subject,
        semester,
        branch,
        course,
        UserToken,
        AdminToken,
        user,
        admin,
        isAdminView,
        showOnlyMyUploads,
        urlUploaderId,
    ]);

    // Handle search
    useEffect(() => {
        if (searchQuery.trim() === "") {
            setFilteredNotes(notes);
            return;
        }

        const query = searchQuery.toLowerCase();
        const results = notes.filter(
            (note) =>
                note.title.toLowerCase().includes(query) ||
                note.description.toLowerCase().includes(query) ||
                note.subject.toLowerCase().includes(query)
        );

        setFilteredNotes(results);
    }, [searchQuery, notes]);

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    if (loading) {
        return <LoadingState />;
    }

    if (error) {
        return <ErrorState error={error} />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white pb-16">
            <NotesHeader
                subject={subject}
                branch={branch}
                course={course}
                semester={semester}
            />

            {/* Main content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 -mt-16 relative z-20">
                <NotesSearchFilter
                    searchQuery={searchQuery}
                    handleSearchChange={handleSearchChange}
                    isAdminView={isAdminView}
                    admin={admin}
                    showOnlyMyUploads={showOnlyMyUploads}
                    setShowOnlyMyUploads={setShowOnlyMyUploads}
                    branch={branch}
                    course={course}
                    session={session}
                />

                {filteredNotes.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredNotes.map((note) => (
                            <NoteCard key={note._id} note={note} />
                        ))}
                    </div>
                ) : (
                    <EmptyNotesList
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        branch={branch}
                        course={course}
                        session={session}
                    />
                )}
            </div>
        </div>
    );

};

export default NotesList;
