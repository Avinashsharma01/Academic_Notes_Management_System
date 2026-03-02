import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import path from "path"
import cookieParser from "cookie-parser"
import ConnectTODB from './Database/db.js'
import authRoutes from "./Routes/authRoutes.js"
import noteRoutes from "./Routes/noteRoutes.js";
import feedbackRoutes from "./Routes/feedbackRoutes.js"
import ContactRoutes from "./Routes/ContactRoute.js"
import superAdminRoutes from "./Routes/SuperAdminRoute.js"
import subscribeRoutes from "./Routes/SubscribeRoute.js"
import academicRoutes from "./Routes/AcademicRoutes.js"


const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), 'public')));
app.set('view engine', 'ejs')

app.use(
    cors({
        origin: "http://localhost:5173", // Allow only frontend origin
        methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
        credentials: true, // Allow cookies & authentication headers
    })
);

// Auth Routes
app.use("/api/auth", authRoutes);

// Fetch User Route
app.use("/api/all", authRoutes)

// Notes Routes
app.use("/api/notes", noteRoutes);

// Feedback routes
app.use("/api/feedback", feedbackRoutes);

// Contact routes
app.use("/api/contact", ContactRoutes);

// SuperAdmin routes
app.use("/api/superadmin", superAdminRoutes);

// Subscribe routes
app.use("/api/subscribe", subscribeRoutes);

// Academic data routes (sessions, courses, branches, semesters, subjects)
app.use("/api/academic", academicRoutes);

app.get('/user', (req, res) => {
    res.render('UserEmailVerify')
})
app.get('/admin', (req, res) => {
    res.render('AdminEmailVerify')
})


app.get("/", (req, res) => {
    res.send("API is running...")
})

const port = process.env.PORT || 4000

app.listen(port, () => {
    ConnectTODB()
    console.log(`Server is listen on port ${port}`);
})
