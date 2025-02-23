This issue occurs because the state or context of your application is not being preserved when the page is refreshed. In React, when you refresh the page, the entire application reloads, and any state or context that was not persisted (e.g., stored in `localStorage`, `sessionStorage`, or a backend server) is lost. This causes the application to reset to its initial state, which in your case is likely the **Dashboard**.

To solve this problem, you need to **persist the state** across page refreshes. Here's how you can handle it:

---

### **Solution 1: Persist State in `localStorage` or `sessionStorage`**

You can save the current navigation state (e.g., the selected `course`, `branch`, `semester`, etc.) in `localStorage` or `sessionStorage` whenever the user navigates. Then, when the page is refreshed, you can retrieve this state and restore the navigation.

#### Steps:

1. **Save State on Navigation**:
   Whenever the user navigates to a new page (e.g., `Dashboard > course > branch > semester`), save the current state (e.g., `course`, `branch`, `semester`) in `localStorage`.

    ```javascript
    // Example: Save state to localStorage
    localStorage.setItem(
        "navigationState",
        JSON.stringify({
            course: "B.Tech",
            branch: "CSE",
            semester: "6th",
        })
    );
    ```

2. **Retrieve State on Page Load**:
   When the page is refreshed, retrieve the state from `localStorage` and restore the navigation.

    ```javascript
    // Example: Retrieve state from localStorage
    const savedState = JSON.parse(localStorage.getItem("navigationState"));

    if (savedState) {
        // Use the saved state to restore navigation
        setCourse(savedState.course);
        setBranch(savedState.branch);
        setSemester(savedState.semester);
    }
    ```

3. **Clear State When Needed**:
   If the user logs out or navigates back to the Dashboard, clear the saved state from `localStorage`.

    ```javascript
    localStorage.removeItem("navigationState");
    ```

---

### **Solution 2: Use URL Parameters**

Instead of relying on state or context, you can encode the navigation path in the URL itself. For example:

-   Dashboard: `/dashboard`
-   Course: `/dashboard/course/B.Tech`
-   Branch: `/dashboard/course/B.Tech/branch/CSE`
-   Semester: `/dashboard/course/B.Tech/branch/CSE/semester/6th`

This way, when the page is refreshed, the URL will still contain the navigation path, and you can extract the parameters from the URL to restore the state.

#### Steps:

1. **Update Your Routes**:
   Define your routes to accept dynamic parameters.

    ```javascript
    <Route path="/dashboard/course/:course/branch/:branch/semester/:semester" element={<SemesterPage />} />
    <Route path="/dashboard/course/:course/branch/:branch" element={<BranchPage />} />
    <Route path="/dashboard/course/:course" element={<CoursePage />} />
    <Route path="/dashboard" element={<Dashboard />} />
    ```

2. **Extract Parameters from URL**:
   Use the `useParams` hook from `react-router-dom` to extract the parameters from the URL.

    ```javascript
    import { useParams } from "react-router-dom";

    const SemesterPage = () => {
        const { course, branch, semester } = useParams();
        // Use these parameters to fetch data or set state
        return <div>Semester: {semester}</div>;
    };
    ```

3. **Navigate with Parameters**:
   When navigating, include the parameters in the URL.

    ```javascript
    <Link
        to={`/dashboard/course/${course}/branch/${branch}/semester/${semester}`}
    >
        Go to Semester
    </Link>
    ```

---

### **Solution 3: Use a State Management Library (e.g., Redux, Zustand)**

If your application is complex, you can use a state management library like **Redux** or **Zustand** to manage the navigation state. These libraries allow you to persist state across page refreshes by integrating with `localStorage` or `sessionStorage`.

#### Example with Redux:

1. **Save State to Redux**:
   Save the navigation state to the Redux store whenever the user navigates.

    ```javascript
    dispatch({
        type: "SET_NAVIGATION_STATE",
        payload: { course: "B.Tech", branch: "CSE", semester: "6th" },
    });
    ```

2. **Persist Redux State**:
   Use a library like `redux-persist` to save the Redux state to `localStorage` or `sessionStorage`.

    ```javascript
    import { persistStore, persistReducer } from "redux-persist";
    import storage from "redux-persist/lib/storage";

    const persistConfig = {
        key: "root",
        storage,
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = createStore(persistedReducer);
    const persistor = persistStore(store);
    ```

3. **Retrieve State on Page Load**:
   When the page is refreshed, the persisted state will be automatically restored by `redux-persist`.

---

### **Which Solution Should You Use?**

-   **For Simple Apps**: Use **URL parameters** (Solution 2). It's the easiest and most reliable way to handle navigation state.
-   **For Medium Apps**: Use **`localStorage` or `sessionStorage`** (Solution 1). It's simple and doesn't require additional libraries.
-   **For Complex Apps**: Use a **state management library** like Redux or Zustand (Solution 3). It provides a scalable and maintainable solution.

---

### Example Implementation with URL Parameters (Solution 2):

Here’s how you can implement Solution 2 in your app:

#### 1. Define Routes:

```javascript
<Routes>
    <Route
        path="/dashboard/course/:course/branch/:branch/semester/:semester"
        element={<SemesterPage />}
    />
    <Route
        path="/dashboard/course/:course/branch/:branch"
        element={<BranchPage />}
    />
    <Route path="/dashboard/course/:course" element={<CoursePage />} />
    <Route path="/dashboard" element={<Dashboard />} />
</Routes>
```

#### 2. Extract Parameters in `SemesterPage`:

```javascript
import { useParams } from "react-router-dom";

const SemesterPage = () => {
    const { course, branch, semester } = useParams();

    return (
        <div>
            <h1>Course: {course}</h1>
            <h1>Branch: {branch}</h1>
            <h1>Semester: {semester}</h1>
        </div>
    );
};
```

#### 3. Navigate with Parameters:

```javascript
<Link to={`/dashboard/course/B.Tech/branch/CSE/semester/6th`}>
    Go to Semester
</Link>
```

---

With this approach, refreshing the page will not reset the navigation because the state is encoded in the URL. Let me know if you need further assistance! 😊
