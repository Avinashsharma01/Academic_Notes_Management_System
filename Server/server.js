import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import ConnectTODB from './Database/db.js'
import authRoutes from "./Routes/authRoutes.js"
import noteRoutes from "./Routes/noteRoutes.js";
import feedbackRoutes from "./Routes/feedbackRoutes.js"
dotenv.config()

const app = express()
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
    cors({
        origin: "http://localhost:5173", // Allow only frontend origin
        methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
        credentials: true, // Allow cookies & authentication headers
    })
);

// Auth Routes
app.use("/api/auth", authRoutes);

// Notes Routes
app.use("/api/notes", noteRoutes);

// Feedback routes
app.use("/api/feedback", feedbackRoutes);

app.get((req, res) => {
    res.send("Server is live")
})

const port = process.env.PORT || 4000

app.listen(port, () => {
    ConnectTODB()
    console.log(`Server is listen on port ${port}`);
})
