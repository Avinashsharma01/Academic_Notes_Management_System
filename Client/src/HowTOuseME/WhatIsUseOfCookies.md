The `cookie-parser` middleware in **Node.js (Express.js)** is used to parse cookies from incoming HTTP requests. It allows you to access and manipulate cookies easily in your Express app.

---

### **Why Use `cookie-parser`?**

1. **Reads Cookies from Requests:** Parses the `Cookie` header and makes cookies accessible via `req.cookies`.
2. **Parses Signed Cookies:** Supports signed cookies for added security.
3. **Simplifies Cookie Management:** You can easily set, retrieve, and delete cookies.

---

### **Installation**

To use `cookie-parser`, install it via npm:

```sh
npm install cookie-parser
```

---

### **Usage in an Express App**

```javascript
const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

// Use cookie-parser middleware
app.use(cookieParser());

app.get("/", (req, res) => {
    console.log(req.cookies); // Access cookies
    res.send("Cookies: " + JSON.stringify(req.cookies));
});

// Set a cookie
app.get("/set-cookie", (req, res) => {
    res.cookie("user", "JohnDoe", { maxAge: 900000, httpOnly: true });
    res.send("Cookie has been set");
});

// Clear a cookie
app.get("/clear-cookie", (req, res) => {
    res.clearCookie("user");
    res.send("Cookie has been cleared");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
```

---

### **Key Features**

1. **Access Cookies**

    ```javascript
    console.log(req.cookies); // { user: 'JohnDoe' }
    ```

2. **Set Cookies**

    ```javascript
    res.cookie("token", "123abc", { httpOnly: true, secure: true });
    ```

3. **Clear Cookies**

    ```javascript
    res.clearCookie("token");
    ```

4. **Signed Cookies (More Secure)**

    ```javascript
    app.use(cookieParser("mySecretKey"));

    res.cookie("auth", "secureToken", { signed: true });
    console.log(req.signedCookies); // Access signed cookies
    ```

---

### **When to Use `cookie-parser`?**

✅ When handling authentication via **cookies**  
✅ When storing session-related data on the client-side  
✅ When needing **signed & secure** cookie handling

If you're using **JWT tokens** in the `Authorization` header, you might not need `cookie-parser`. But if you're storing authentication tokens in **cookies**, it’s useful for managing them efficiently. 🚀
