The issue where the page scrolls to the bottom when you navigate could be happening due to **automatic scrolling behavior** in React Router or the browser retaining the previous scroll position. Here are a few ways to fix it:

### **Solution 1: Scroll to Top on Navigation**

React Router does not automatically scroll to the top when you navigate to a new page. You can fix this by using the `useEffect` hook to scroll to the top whenever the page changes.

#### **Option 1: Add Scroll to Top in `Phase5`**

Add this inside your `Phase5` component:

```jsx
import { useEffect } from "react";

useEffect(() => {
    window.scrollTo(0, 0);
}, []);
```

#### **Option 2: Create a Global `ScrollToTop` Component**

If you want this behavior across multiple pages, create a separate component:

1. **Create a `ScrollToTop.js` file**

    ```jsx
    import { useEffect } from "react";
    import { useLocation } from "react-router-dom";

    const ScrollToTop = () => {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);

        return null;
    };

    export default ScrollToTop;
    ```

2. **Use it in `App.js` (or your main Router file)**

    ```jsx
    import ScrollToTop from "./ScrollToTop";
    import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

    function App() {
        return (
            <Router>
                <ScrollToTop />
                <Routes>{/* Your routes go here */}</Routes>
            </Router>
        );
    }

    export default App;
    ```

---

### **Solution 2: Check if `Gsap` is Affecting Scroll Position**

If you're using **GSAP animations**, it might be affecting the scroll position. Try commenting out `Phase5_Gsap();` in your component and see if the issue persists.

If GSAP is causing the problem, ensure that you're not applying any `scrollTo` animation unintentionally.

---

### **Solution 3: Remove Default Scroll Retention in React Router**

If you're using **React Router 6+,** it might be retaining the scroll position when navigating back and forth. You can disable this using:

```jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollRestoration = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        window.history.scrollRestoration = "manual";
    }, [pathname]);

    return null;
};
```

Then include `<ScrollRestoration />` inside your router.

---

### **Final Thoughts**

Try **Solution 1 first (ScrollToTop)** since it's the most common fix. If GSAP is causing the issue, investigate **Solution 2**. Let me know if the problem still persists! 🚀
