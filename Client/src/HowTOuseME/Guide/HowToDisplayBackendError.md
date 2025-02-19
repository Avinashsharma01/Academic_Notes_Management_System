To display the error message on the frontend when a user is not found or their credentials are incorrect, you need to handle the API response properly in your frontend code.

### **Steps to Display the Error Message on Frontend:**

#### **1. Call the API in the Frontend**

If you're using **React**, you can use `fetch` or `axios` to call the login API. Here's an example using **axios**:

```jsx
import React, { useState } from "react";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // State to store error message

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Reset error message before new request

        try {
            const response = await axios.post(
                "http://localhost:5000/api/login",
                { email, password }
            );

            // Store token and user data in localStorage or context
            localStorage.setItem("token", response.data.token);
            console.log("Login Successful:", response.data);

            // Redirect or update UI upon successful login
        } catch (err) {
            // Handle errors and set error message
            if (err.response && err.response.data) {
                setError(err.response.data.message); // Display backend error message
            } else {
                setError("Something went wrong. Please try again.");
            }
        }
    };

    return (
        <div>
            <h2>Login</h2>
            {error && <p style={{ color: "red" }}>{error}</p>} {/* Display error message */}
            <form onSubmit={handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
```

---

### **How It Works:**

1. The user enters their email and password.
2. When they click "Login," the function `handleLogin` sends a request to your backend.
3. If the login fails, the backend sends a response with an error message (`"Invalid email or password"` or `"user not found !"`).
4. The frontend **catches the error** and updates the state (`setError(err.response.data.message)`).
5. The error message is displayed on the screen (`<p style={{ color: "red" }}>{error}</p>`).

---

### **Backend Response Example**

If the email or password is incorrect, the backend sends:

```json
{
    "message": "Invalid email or password"
}
```

If the user is not verified:

```json
{
    "message": "user not found !"
}
```

The frontend reads this and displays it to the user.

Let me know if you need any modifications! 🚀
