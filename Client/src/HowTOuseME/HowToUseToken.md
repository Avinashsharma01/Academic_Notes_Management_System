Once your API returns a token after a successful login, you need to use that token for authenticating subsequent requests. Here’s how you can use it:

### **1. Store the Token Securely**

After receiving the token from the API, store it securely in:

-   **Local Storage** (not recommended for highly sensitive data)
-   **Session Storage** (clears when the session ends)
-   **Cookies (HttpOnly, Secure, SameSite)** (more secure for sensitive data)

Example (storing in `localStorage`):

```javascript
localStorage.setItem("authToken", token);
```

### **2. Send the Token with API Requests**

For every request that requires authentication, send the token in the headers (usually in the `Authorization` header).

Example using **Fetch API**:

```javascript
const token = localStorage.getItem("authToken");

fetch("https://api.example.com/protected-route", {
    method: "GET",
    headers: {
        Authorization: `Bearer ${token}`, // Sending token in Authorization header
        "Content-Type": "application/json",
    },
})
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
```

Example using **Axios**:

```javascript
import axios from "axios";

const token = localStorage.getItem("authToken");

axios
    .get("https://api.example.com/protected-route", {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    .then((response) => console.log(response.data))
    .catch((error) => console.error(error));
```

### **3. Handle Token Expiry & Logout**

-   If the token expires, the API will likely return a `401 Unauthorized` response.
-   In that case, prompt the user to log in again or refresh the token if your API supports it.

Example:

```javascript
axios
    .get("https://api.example.com/protected-route", {
        headers: { Authorization: `Bearer ${token}` },
    })
    .catch((error) => {
        if (error.response.status === 401) {
            console.log("Token expired. Redirecting to login...");
            localStorage.removeItem("authToken"); // Clear token
            window.location.href = "/login"; // Redirect to login page
        }
    });
```

### **4. Optional: Use Interceptors in Axios**

If you’re using Axios, you can configure **interceptors** to automatically attach the token:

```javascript
axios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("authToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
```

---

This setup ensures that after logging in, the user stays authenticated, and the token is used for secure API requests. 🚀
