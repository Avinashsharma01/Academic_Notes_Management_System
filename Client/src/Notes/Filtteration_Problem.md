# Notes Filtering Issue: Solution Documentation

## Problem Overview

The `NotesList` component was not correctly filtering notes when accessing them through the navigation path:
`session > course > semester > subject > notes`.

Specifically, notes with properties like:

```json
{
    "semester": "6th",
    "subject": "Big Data Analytics",
    "course": "B.Tech",
    "branch": "IT"
}
```

Were not showing up when accessed via the URL:

```
http://localhost:5173/notes?subject=Big%20Data%20Analytics&semester=6th&branch=it&course=btech&session=2025
```

## Root Causes

1. **Format Mismatches**: Different formats were used between URL parameters and database values

    - URL: `course=btech` vs Database: `course: "B.Tech"`
    - URL: `branch=it` vs Database: `branch: "IT"`

2. **String Comparison Issues**: The original filtering logic used strict comparisons or simple includes() checks

    - This failed when formats differed (like "6" vs "6th")
    - Case sensitivity issues ("it" vs "IT")
    - Formatting differences ("btech" vs "B.Tech")

3. **Inflexible Matching**: The filtering didn't handle common abbreviations or format variations

## Solution Implemented

We updated the client-side filtering in `NotesList.jsx` with a more robust approach:

1. **Enhanced Semester Matching**

    - Added logic to extract numeric parts from semester strings (e.g., "6th" → 6)
    - Now compares numeric values to match semesters regardless of format

2. **Flexible Course Matching**

    - Implemented normalization to remove spaces/dots (e.g., "B.Tech" → "btech")
    - Added bidirectional includes() checks
    - Matches both ways (both "btech" contains "tech" and "tech" contains "btech")

3. **Case-Insensitive Branch Matching**

    - Improved to handle case differences ("it" vs "IT")
    - Added pattern normalization for common abbreviations

4. **Comprehensive Debug Logging**
    - Added detailed logs showing:
        - All notes being filtered
        - Which notes are filtered out and why
        - Which notes successfully match all filters
    - Logs include comparisons between filter values and note values

## Code Changes Made

1. **Numeric Semester Extraction**

    ```javascript
    const extractNumeric = (str) => {
        if (!str) return 0;
        return parseInt(String(str).match(/\d+/)?.[0] || "0", 10);
    };

    // Used in filtering
    extractNumeric(note.semester) === extractNumeric(semester);
    ```

2. **Normalized Course Matching**

    ```javascript
    const normalizedCourse = course.toLowerCase().replace(/[\s.]/g, "");
    const normalizedNoteCourse = note.course
        .toLowerCase()
        .replace(/[\s.]/g, "");

    // Multiple matching strategies
    normalizedNoteCourse === normalizedCourse ||
        normalizedNoteCourse.includes(normalizedCourse) ||
        normalizedCourse.includes(normalizedNoteCourse);
    ```

3. **Enhanced Branch Matching**

    ```javascript
    note.branch.toLowerCase() === branch.toLowerCase() ||
        note.branch.toLowerCase().replace(/[\s.]/g, "") ===
            branch.toLowerCase().replace(/[\s.]/g, "");
    ```

4. **Detailed Debug Logging**
    ```javascript
    console.debug("Filtering notes with params:", {
        filters: { session, course, branch, semester, subject },
        totalNotes: data.length,
        notes: data.map((n) => ({ title: n.title /* other properties */ })),
    });
    ```

## Results

The filtering now correctly handles:

-   Case differences ("IT" vs "it")
-   Format variations ("B.Tech" vs "btech" vs "b tech")
-   Ordinal numbers in semesters ("6" vs "6th")
-   Partial matches between subject names

Notes are now properly displayed when navigating through the hierarchical structure of the application, regardless of minor formatting differences between URL parameters and database values.
