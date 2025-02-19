The `?.` (optional chaining) operator is used here to **safely access** properties of `error.response.data.message` without causing an error if any part of the chain is `undefined` or `null`.

### **Breaking it Down:**

```js
setMessage(error.response?.data?.message || "Error logging in.");
```

-   `error.response`: Checks if the error has a `response` object.
-   `error.response?.data`: If `response` exists, it tries to access `data`. If `response` is `undefined`, it avoids an error and returns `undefined`.
-   `error.response?.data?.message`: If `data` exists, it tries to access `message`. If `data` is `undefined`, it avoids an error and returns `undefined`.
-   `|| "Error logging in."`: If `message` is not found, it falls back to `"Error logging in."`.

### **Why is `?.` Important?**

If the server fails to respond (e.g., network error), `error.response` will be `undefined`. Without `?.`, trying to access `error.response.data.message` would cause an error like:

```
Uncaught TypeError: Cannot read properties of undefined (reading 'data')
```

### **Example Cases:**

#### **1. Backend Returns an Error with a Message**

```json
{
    "message": "Invalid email or password"
}
```

✔️ `error.response.data.message` → `"Invalid email or password"` (Displayed to user)

#### **2. Network Error (No Response)**

No `response` object is present in `error`.  
✔️ `error.response` is `undefined`, so `?.` prevents an error.  
✔️ Falls back to `"Error logging in."`

#### **3. Backend Error, but No Message**

```json
{
    "error": "Internal server error"
}
```

❌ `error.response.data.message` is `undefined`.  
✔️ Falls back to `"Error logging in."`

---

### **Alternative Without `?.` (Unsafe)**

```js
setMessage(error.response.data.message || "Error logging in.");
```

❌ If `error.response` is `undefined`, this will **crash the app**.

So, using `?.` makes the code **safer and prevents crashes** when handling API errors. 🚀
