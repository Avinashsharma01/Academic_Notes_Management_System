import jwt from "jsonwebtoken";

// Middleware to protect routes
export const authenticateUser = (req, res, next) => {
    const token = req.header("Authorization");
    // console.log("authenticateUser", req);

    if (!token) return res.status(401).json({ message: "Access denied! No token provided" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to request
        next();
    } catch (error) {
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


