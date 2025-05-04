import jwt from "jsonwebtoken";

// Middleware to protect routes
export const authenticateUser = (req, res, next) => {
    // Try to get token from cookie first, then fall back to header
    const token = req.cookies.authToken || req.header("Authorization");

    if (!token) return res.status(401).json({ message: "Access denied! No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        next();
    } catch (error) {
        // Clear invalid cookie if present
        if (req.cookies.authToken) {
            res.cookie('authToken', '', {
                httpOnly: true,
                expires: new Date(0)
            });
        }
        res.status(401).json({ message: "Invalid token" });
    }
};

// Middleware for Admin-Only Access
export const authorizeAdmin = (req, res, next) => {
    console.log(req.user);
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied! Admins only" });
    }
    next();
};


