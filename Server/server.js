import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { Pool } from "pg";
import ConnectTODB from "./Database/db.js";
import authRoutes from "./Routes/authRoutes.js";
import noteRoutes from "./Routes/noteRoutes.js";
import feedbackRoutes from "./Routes/feedbackRoutes.js";
import ContactRoutes from "./Routes/ContactRoute.js";
import superAdminRoutes from "./Routes/SuperAdminRoute.js";
import subscribeRoutes from "./Routes/SubscribeRoute.js";
import academicRoutes from "./Routes/AcademicRoutes.js";
import AppError from "./utils/AppError.js";
import catchAsync from "./utils/catchAsync.js";

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(path.resolve(), "public")));
app.set("view engine", "ejs");

app.use(
    cors({
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
        credentials: true,
    })
);

const pool = new Pool({
    connectionString: process.env.POSTGRES_URI,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT ? Number(process.env.POSTGRES_PORT) : undefined,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
    ssl: process.env.POSTGRES_SSL === "true" ? { rejectUnauthorized: false } : undefined,
});

app.post("/api/query", catchAsync(async (req, res) => {
    const { query } = req.body;

    if (!query || !query.trim()) {
        throw new AppError("Empty query", 400);
    }

    const rawResult = await pool.query(query);
    const result = Array.isArray(rawResult)
        ? rawResult[rawResult.length - 1]
        : rawResult;

    const rows = Array.isArray(result?.rows) ? result.rows : [];
    const fields = Array.isArray(result?.fields)
        ? result.fields.map((field) => field.name)
        : [];

    res.json({
        rows,
        rowCount: typeof result?.rowCount === "number" ? result.rowCount : rows.length,
        fields,
    });
}));


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

app.get("/user", (req, res) => {
  res.render("UserEmailVerify");
});
app.get("/admin", (req, res) => {
  res.render("AdminEmailVerify");
});


app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use((req, res, next) => {
  next(new AppError(`Cannot find ${req.originalUrl} on this server`, 404));
});

app.use((error, req, res, next) => {
  console.error(error.stack);

  const statusCode = error.statusCode || 500;
  const message = error.isOperational
    ? error.message
    : "Something went wrong. Please try again later.";

  res.status(statusCode).json({
    status: error.status || "error",
    message,
  });
});

const port = process.env.PORT;

if (!port) {
  throw new Error("PORT is required in environment variables");
}

app.listen(port, () => {
  ConnectTODB();
    console.log(`Server is listen on port ${port}`);
});
