# The College — Full-Stack Notes Management Platform

> A comprehensive course-style guide that teaches you **exactly** how this project is built, from architecture decisions to individual lines of code.

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [Tech Stack Deep-Dive](#2-tech-stack-deep-dive)
3. [Project Structure](#3-project-structure)
4. [Getting Started — Installation & Setup](#4-getting-started--installation--setup)
5. [Environment Variables](#5-environment-variables)
6. [Backend Architecture (Server)](#6-backend-architecture-server)
    - 6.1 [Entry Point — server.js](#61-entry-point--serverjs)
    - 6.2 [Database Connection](#62-database-connection)
    - 6.3 [Models (Database Schemas)](#63-models-database-schemas)
    - 6.4 [Controllers (Business Logic)](#64-controllers-business-logic)
    - 6.5 [Routes (API Endpoints)](#65-routes-api-endpoints)
    - 6.6 [Middleware](#66-middleware)
    - 6.7 [Utilities](#67-utilities)
    - 6.8 [Config (Third-Party Services)](#68-config-third-party-services)
7. [Frontend Architecture (Client)](#7-frontend-architecture-client)
    - 7.1 [Entry Point — main.jsx](#71-entry-point--mainjsx)
    - 7.2 [App.jsx — The Router](#72-appjsx--the-router)
    - 7.3 [AuthContext — Global State](#73-authcontext--global-state)
    - 7.4 [Axios Instance — API Communication](#74-axios-instance--api-communication)
    - 7.5 [Protected Routes](#75-protected-routes)
    - 7.6 [Firebase Configuration](#76-firebase-configuration)
    - 7.7 [Page & Component Organization](#77-page--component-organization)
8. [Authentication System — The Complete Flow](#8-authentication-system--the-complete-flow)
    - 8.1 [Three-Role Architecture](#81-three-role-architecture)
    - 8.2 [Cookie Strategy](#82-cookie-strategy)
    - 8.3 [Registration → Email Verification → Login Flow](#83-registration--email-verification--login-flow)
    - 8.4 [Google Social Login Flow](#84-google-social-login-flow)
    - 8.5 [Auth State Rehydration on Page Reload](#85-auth-state-rehydration-on-page-reload)
9. [Academic Data Hierarchy — The Core Domain](#9-academic-data-hierarchy--the-core-domain)
    - 9.1 [The Chain: Session → Course → Branch → Semester → Subject → Note](#91-the-chain-session--course--branch--semester--subject--note)
    - 9.2 [Frontend Navigation Flow](#92-frontend-navigation-flow)
    - 9.3 [How Notes Are Filtered](#93-how-notes-are-filtered)
10. [File Upload System](#10-file-upload-system)
11. [API Reference — Every Endpoint](#11-api-reference--every-endpoint)
12. [Design Patterns & Key Concepts](#12-design-patterns--key-concepts)
13. [What You Learned](#13-what-you-learned)

---

## 1. Project Overview

**The College** is a full-stack web application that lets college students find and download notes organized by academic session, course, branch, semester, and subject. Administrators upload and manage notes, while a SuperAdmin controls the entire academic structure and manages all users.

### What the app does:

| Role       | Capabilities |
|------------|-------------|
| **Student (User)** | Sign up / login, browse academic tree, view & download notes, submit feedback, contact form |
| **Admin** | Everything a student can do + upload/edit/delete notes for their assigned course, view students in their course |
| **SuperAdmin** | Manage the entire academic structure (sessions, courses, branches, semesters, subjects), manage all users & admins, view all feedback |

---

## 2. Tech Stack Deep-Dive

### Backend

| Technology | Purpose | Why it's used |
|-----------|---------|---------------|
| **Node.js** | Runtime | JavaScript on the server — same language as frontend |
| **Express.js** v4 | Web framework | Minimal, unopinionated, huge ecosystem |
| **MongoDB** | Database | Document-based, flexible schema, perfect for nested academic data |
| **Mongoose** v8 | ODM | Object-Document Mapper — gives schemas, validation, refs to MongoDB |
| **JWT (jsonwebtoken)** | Authentication | Stateless auth tokens stored in cookies |
| **bcryptjs** | Password hashing | One-way hashing with salt — even if DB leaks, passwords stay safe |
| **cookie-parser** | Cookie reading | Parses `Cookie` header so `req.cookies.authToken` works |
| **Cloudinary** | File storage | Cloud-hosted media — no local file storage needed |
| **Multer** | File upload handling | Parses `multipart/form-data` (file uploads) |
| **multer-storage-cloudinary** | Upload bridge | Connects Multer directly to Cloudinary |
| **Nodemailer** | Email sending | Sends verification emails via Gmail SMTP |
| **Firebase Admin SDK** | Social auth verification | Verifies Google Sign-In tokens server-side |
| **EJS** | Template engine | Renders email verification success pages |
| **dotenv** | Environment config | Loads `.env` variables into `process.env` |
| **cors** | Cross-origin requests | Allows frontend (port 5173) to call backend (port 5000) |

### Frontend

| Technology | Purpose | Why it's used |
|-----------|---------|---------------|
| **React** v19 | UI library | Component-based, virtual DOM, massive ecosystem |
| **React Router** v7 | Routing | Client-side navigation, route protection |
| **Vite** v6 | Build tool | Lightning-fast HMR, ES modules, ~10x faster than Webpack |
| **Tailwind CSS** v4 | Styling | Utility-first CSS — style directly in JSX |
| **Axios** | HTTP client | Promise-based, interceptors, automatic cookie sending |
| **Firebase** (client) | Google Sign-In | Handles the popup-based OAuth flow in the browser |
| **React Toastify** | Notifications | Toast pop-ups for success/error messages |
| **Lucide React + Heroicons + React Icons** | Icons | SVG icon libraries |
| **GSAP + Motion** | Animations | Professional-grade animation libraries |

---

## 3. Project Structure

```
The College/
├── README.md                    ← You are here
├── Client/                      ← React frontend
│   ├── package.json
│   ├── vite.config.js           ← Vite config with proxy & COOP headers
│   ├── index.html               ← Single HTML entry point
│   ├── tailwind.config.js
│   ├── public/                  ← Static assets (favicon)
│   └── src/
│       ├── main.jsx             ← React entry — wraps App in AuthProvider
│       ├── App.jsx              ← All routes defined here
│       ├── index.css            ← Tailwind import + global styles
│       ├── Api/
│       │   └── axiosInstance.js  ← Axios config (baseURL, cookies, interceptors)
│       ├── Config/
│       │   ├── firebase.js       ← Firebase client setup
│       │   ├── ProtectedUserRoute.jsx
│       │   ├── ProtectedAdminRoute.jsx
│       │   └── ProtectedSuperAdminRoute.jsx
│       ├── Context/
│       │   └── AuthContext.jsx   ← Global auth state (user/admin/superAdmin)
│       ├── Components/
│       │   ├── Navbaar/          ← Navbar components
│       │   ├── Footer.jsx
│       │   └── NotFound.jsx
│       ├── Pages/
│       │   ├── Home.jsx, About.jsx, Contact.jsx, etc.
│       │   ├── SignUp.jsx, Login.jsx       ← User auth
│       │   ├── Feedback.jsx, Events.jsx
│       │   ├── UserProfile.jsx
│       │   ├── AdminPages/                  ← Admin-specific pages
│       │   │   ├── AdminLogin.jsx, AdminSignUp.jsx
│       │   │   ├── AdminDashboard.jsx
│       │   │   ├── AdminProfile.jsx
│       │   │   ├── ManageNotes.jsx
│       │   │   ├── AllFeedbacks.jsx
│       │   │   ├── AllUsers.jsx
│       │   │   └── NoteUpload/UploadNote.jsx
│       │   └── SuperAdminPages/             ← SuperAdmin-specific pages
│       │       ├── SuperAdminLogin.jsx
│       │       ├── SuperAdminDashboard.jsx
│       │       └── AcademicManagement.jsx
│       ├── Sessions/            ← Dashboard (session listing)
│       ├── Courses/             ← Course cards
│       ├── Branches/            ← Branch cards
│       ├── Semesters/           ← Semester cards
│       ├── Subject/             ← Subject cards
│       └── Notes/               ← Notes listing & filtering
│
├── Server/                      ← Express backend
│   ├── package.json
│   ├── server.js                ← Express app entry point
│   ├── Config/
│   │   ├── cloudinary.js        ← Cloudinary SDK setup
│   │   └── firebaseAdmin.js     ← Firebase Admin SDK setup
│   ├── Database/
│   │   └── db.js                ← MongoDB connection
│   ├── Models/                  ← Mongoose schemas (13 models)
│   │   ├── UserModel.js
│   │   ├── AdminModel.js
│   │   ├── SuperAdminModel.js
│   │   ├── Note.js
│   │   ├── SessionModel.js
│   │   ├── CourseModel.js
│   │   ├── BranchModel.js
│   │   ├── SemesterModel.js
│   │   ├── SubjectModel.js
│   │   ├── Feedback.js
│   │   ├── ContactUSmodel.js
│   │   ├── EventModel.js
│   │   └── SubscribedEmailModel.js
│   ├── Controllers/             ← Business logic (8 controllers)
│   │   ├── authController.js         ← User register/login/logout/verify
│   │   ├── AdminController.js        ← Admin register/login/logout/verify
│   │   ├── SuperAdminController.js   ← SuperAdmin CRUD + management
│   │   ├── socialAuthController.js   ← Google Sign-In handler
│   │   ├── noteController.js         ← Note CRUD + search
│   │   ├── AcademicController.js     ← Session/Course/Branch/Semester/Subject CRUD
│   │   ├── feedbackController.js     ← Feedback submit/fetch/delete
│   │   ├── ContactController.js      ← Contact form submit/fetch/delete
│   │   ├── SubscribeController.js    ← Newsletter subscribe/unsubscribe
│   │   └── EventPostController.js    ← (Placeholder — not yet implemented)
│   ├── Middleware/               ← Auth & upload middleware
│   │   ├── authMiddleware.js           ← JWT verify for Users/Admins
│   │   ├── SuperAdminMiddleware.js     ← JWT verify for SuperAdmin
│   │   ├── uploadMiddleware.js         ← Multer → Cloudinary (notes upload)
│   │   └── multerMiddlewareForProFilePic.js ← Multer → Cloudinary (profile pics)
│   ├── Routes/                   ← Express routers (7 route files)
│   │   ├── authRoutes.js              ← /api/auth
│   │   ├── noteRoutes.js             ← /api/notes
│   │   ├── feedbackRoutes.js          ← /api/feedback
│   │   ├── ContactRoute.js           ← /api/contact
│   │   ├── SuperAdminRoute.js         ← /api/superadmin
│   │   ├── SubscribeRoute.js          ← /api/subscribe
│   │   └── AcademicRoutes.js          ← /api/academic
│   ├── utils/                    ← Email verification senders
│   │   ├── UserEmailVerification.js
│   │   ├── AdminEmailVerification.js
│   │   └── SuperAdminEmailVerification.js
│   ├── views/                    ← EJS templates for verification pages
│   │   ├── UserEmailVerify.ejs
│   │   ├── AdminEmailVerify.ejs
│   │   └── SuperAdminEmailVerify.ejs
│   └── scripts/                  ← Seed scripts for academic data
│       ├── seedAcademicData.js
│       ├── freshSeed.js
│       └── dedupAcademicData.js
│
└── Testing/                      ← Test files and prototypes
```

---

## 4. Getting Started — Installation & Setup

### Prerequisites
- **Node.js** v18+ installed
- **MongoDB** running locally or a MongoDB Atlas connection string
- **Cloudinary** account (free tier works)
- **Gmail** account with App Password (for email verification)
- **Firebase** project (for Google Sign-In)

### Step 1: Clone & Install

```bash
# Clone the repository
git clone <your-repo-url>
cd "The College"

# Install server dependencies
cd Server
npm install

# Install client dependencies
cd ../Client
npm install
```

### Step 2: Configure Environment Variables

Create `Server/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/theCollege
JWT_SECRET=your_super_secret_jwt_key
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_gmail_app_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
FIREBASE_PROJECT_ID=your_firebase_project_id
```

Create `Client/.env`:

```env
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Step 3: Run the App

```bash
# Terminal 1 — Start the server
cd Server
npm start  # runs: nodemon server.js

# Terminal 2 — Start the client
cd Client
npm run dev  # runs: vite
```

- **Server**: http://localhost:5000
- **Client**: http://localhost:5173

---

## 5. Environment Variables

| Variable | Location | Purpose |
|----------|----------|---------|
| `PORT` | Server | Express server port (default: 5000, fallback: 4000) |
| `MONGO_URI` | Server | MongoDB connection string |
| `JWT_SECRET` | Server | Secret key for signing/verifying JWT tokens |
| `EMAIL_USER` | Server | Gmail address for sending verification emails |
| `EMAIL_PASS` | Server | Gmail App Password (not your regular password) |
| `CLOUDINARY_CLOUD_NAME` | Server | Cloudinary account cloud name |
| `CLOUDINARY_API_KEY` | Server | Cloudinary API key |
| `CLOUDINARY_API_SECRET` | Server | Cloudinary API secret |
| `FIREBASE_PROJECT_ID` | Server | Firebase project ID (for token verification) |
| `VITE_FIREBASE_*` | Client | Firebase client config (6 values) |

**Why `VITE_` prefix?** Vite only exposes variables prefixed with `VITE_` to frontend code via `import.meta.env`. This prevents accidentally leaking server secrets to the browser.

---

## 6. Backend Architecture (Server)

### 6.1 Entry Point — server.js

This is where everything starts. Here's what it does, line by line:

```javascript
// 1. Load environment variables FIRST (before any other import uses them)
import dotenv from "dotenv"
dotenv.config()

// 2. Import Express and middleware
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

// 3. Create the Express app
const app = express()

// 4. Register middleware (order matters!)
app.use(express.json());          // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(cookieParser());          // Parse cookies from headers
app.use(express.static('public')); // Serve static files
app.set('view engine', 'ejs')     // For email verification pages

// 5. CORS — Allow frontend to talk to backend
app.use(cors({
    origin: "http://localhost:5173",          // Only this origin
    methods: ["GET", "POST", "PUT", "DELETE"], // These HTTP methods
    credentials: true,                         // Allow cookies!
}));

// 6. Mount route handlers
app.use("/api/auth", authRoutes);       // User & Admin auth
app.use("/api/notes", noteRoutes);      // Note CRUD
app.use("/api/feedback", feedbackRoutes);
app.use("/api/contact", ContactRoutes);
app.use("/api/superadmin", superAdminRoutes);
app.use("/api/subscribe", subscribeRoutes);
app.use("/api/academic", academicRoutes); // Sessions/Courses/etc.

// 7. Start listening
app.listen(port, () => {
    ConnectTODB()  // Connect to MongoDB when server starts
});
```

**Key concept — CORS with credentials:**
When your frontend (port 5173) and backend (port 5000) run on different ports, the browser treats them as different origins. Without CORS, the browser blocks the request. With `credentials: true`, cookies are sent cross-origin.

### 6.2 Database Connection

```javascript
// Server/Database/db.js
import mongoose from "mongoose";

const ConnectTODB = async () => {
    const MONGO_URI = process.env.MONGO_URI;
    await mongoose.connect(MONGO_URI);
    console.log("Successfully Connected to the database");
};
```

**How Mongoose works:** You call `mongoose.connect()` once. After that, every `mongoose.model()` call automatically uses this connection. You never pass the connection around — Mongoose manages it globally.

### 6.3 Models (Database Schemas)

Models define the **shape** of your data. Each model maps to a MongoDB **collection**.

#### UserModel.js — Student accounts

```javascript
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    course: { type: String, default: "Not Specified" },
    branch: { type: String, default: "Not Specified" },
    enrollment: { type: Number, default: 0 },
    email: { type: String, required: true, unique: true },
    password: { type: String },  // Optional — social auth users don't have one
    profilePic: { type: String, default: "" },
    isVerified: { type: Boolean, default: false },
    role: { type: String, enum: ["student", "admin"], default: "student" },
    authProvider: { type: String, enum: ["local", "google", "github"], default: "local" },
    firebaseUid: { type: String, default: "" },
}, { timestamps: true });  // Auto-adds createdAt & updatedAt
```

**Key decisions:**
- `password` is optional because Google Sign-In users don't set one
- `isVerified` starts `false` — users must click the email link
- `authProvider` tracks how the user signed up
- `timestamps: true` — Mongoose auto-manages `createdAt` and `updatedAt`

#### AdminModel.js — Course administrators

```javascript
const AdminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: "admin" },
    isVerified: { type: Boolean, default: false },
    course: { type: String, required: true },       // "B.Tech", "BCA"
    department: { type: String, default: "" },       // "CSE", "IT"
    college: { type: String, default: "" },
    designation: { type: String, default: "" },      // "Professor", "HOD"
}, { timestamps: true });
```

**Why `course` is a String, not an ObjectId ref?** Simplicity. The admin's course is stored as the course name directly, which makes note uploads faster (no extra DB lookups for display).

#### SuperAdminModel.js — Platform owner

```javascript
const SuperAdminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'superadmin' },
    isVerified: { type: Boolean, default: false },
}, { timestamps: true });
```

Minimal model — SuperAdmin is about power, not profile details.

#### Note.js — The main content

```javascript
const noteSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String, required: true },  // Cloudinary URL
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'uploaderModel',  // Dynamic reference!
        required: true
    },
    uploaderModel: {
        type: String,
        required: true,
        enum: ['User', 'Admin']
    },
    session: { type: String, required: true },
    course: { type: String, required: true },
    branch: { type: String, required: true },
    semester: { type: String, required: true },
    subject: { type: String, required: true },
}, { timestamps: true });
```

**Key pattern — Dynamic Reference (`refPath`):**
The `uploadedBy` field can point to either a `User` or an `Admin` document. The `uploaderModel` field tells Mongoose which collection to look in. When you call `.populate("uploadedBy")`, Mongoose checks `uploaderModel` to know whether to look in the `users` or `admins` collection.

#### Academic Models (Session, Course, Branch, Semester, Subject)

These form a **hierarchy** with ObjectId references:

```
Session (standalone — year-based)
  └── Course (standalone — "B.Tech", "BCA")
       ├── Branch (belongs to Course — "CSE", "General")
       ├── Semester (belongs to Course — "Semester 1")
       └── Subject (belongs to Branch + Semester + Course)
```

**Compound unique indexes** prevent duplicates:
```javascript
// Same branch name can exist in different courses, but not twice in the same course
BranchSchema.index({ name: 1, course: 1 }, { unique: true });

// Same semester number can exist in different courses
SemesterSchema.index({ number: 1, course: 1 }, { unique: true });

// Same subject can exist in different branch/semester combos
SubjectSchema.index({ name: 1, branch: 1, semester: 1 }, { unique: true });
```

#### Supporting Models

| Model | Purpose | Key fields |
|-------|---------|------------|
| **Feedback** | User ratings/reviews | `user` (ref to User), `message`, `rating` (1-5) |
| **ContactUS** | Contact form submissions | `user`, `name`, `email`, `phone`, `message` |
| **Event** | College events | `title`, `type`, `date`, `location`, `organizer`, virtuals for `isPast`/`isUpcoming` |
| **Subscribe** | Newsletter emails | `email` |

### 6.4 Controllers (Business Logic)

Controllers contain the actual logic that runs when an API endpoint is hit.

#### authController.js — User authentication

| Function | What it does |
|----------|-------------|
| `registerUser` | Hash password with bcrypt → save user → send verification email |
| `loginUser` | Find user → check `isVerified` → compare password → sign JWT → set `authToken` cookie |
| `authUser` | Read `req.user.id` (set by middleware) → return user data (minus password) |
| `updateUserProfile` | Update name and/or profile pic (Cloudinary URL from multer) |
| `verifyUserEmail` | Verify JWT from email link → set `isVerified = true` → render EJS page |
| `logoutUser` | Clear the `authToken` cookie by setting `expires: new Date(0)` |
| `getAllUsers` | Admin-only: find users whose `course` matches the admin's `course` |

**Password hashing flow:**
```javascript
// Registration
const salt = await bcrypt.genSalt(10);          // Generate random salt
const hashedPassword = await bcrypt.hash(password, salt); // Hash: password + salt → irreversible hash

// Login
const isMatch = await bcrypt.compare(password, user.password); // Compare: plaintext vs stored hash
```

**JWT cookie flow:**
```javascript
// Create token containing user ID and role
const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
});

// Store in httpOnly cookie (JavaScript can't read it — XSS-safe)
res.cookie("authToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000, // 1 day
});
```

#### AdminController.js — Admin authentication

Same pattern as authController, but with extra validations:
- Admin must specify a valid `course` (checked against the Course model)
- `department` is validated against available branches for that course
- If a course has only a "General" branch, department auto-fills as "General"

#### SuperAdminController.js — Platform management

Two categories of functions:

**Auth functions:** `registerSuperAdmin`, `loginSuperAdmin`, `logoutSuperAdmin`, `verifySuperAdminEmail`, `getSuperAdminProfile`

**Management functions:**
- `getDashboardStats` — Aggregates: total/verified/unverified/recent users & admins
- `getAllUsers`, `deleteUser`, `toggleUserVerification`
- `getAllAdmins`, `deleteAdmin`, `toggleAdminVerification`

**Key difference:** SuperAdmin uses `SuperauthToken` cookie (not `authToken`).

#### noteController.js — Note CRUD

| Function | Logic |
|----------|-------|
| `uploadNote` | Validate admin's course matches → validate semester/branch/subject against DB → save Cloudinary URL |
| `getNotes` | Optional `uploaderId` filter → return all matching notes with uploader name populated |
| `deleteNote` | Extract Cloudinary public ID from URL → delete from Cloudinary → delete from DB |
| `updateNote` | Update title/description, optionally replace file (delete old from Cloudinary first) |
| `searchNotes` | Multi-field regex search + pagination (`skip`/`limit`) |

**The upload validation chain** (noteController's most complex logic):
```
1. Check required fields (title, description, course, semester, session, subject)
2. Find the Admin in DB → get their assigned course
3. Verify requested course matches admin's course
4. Find Course document → validate it's active
5. Find Semester document → try by name, fall back to number
6. Find Branch document → auto-set to "General" if course has only one branch
7. Find Subject document → must match course + semester + branch
8. Only then: save the note with canonical names from DB documents
```

#### AcademicController.js — Academic structure CRUD

Full CRUD for all 5 academic entities. Key behaviors:
- **Cascade deletes**: Deleting a Course also deletes its Branches, Semesters, and Subjects
- **GET routes** only return `isActive: true` documents
- **Query filters**: GET Branches/Semesters/Subjects accept `?course=`, `?branch=`, `?semester=` query params

### 6.5 Routes (API Endpoints)

#### Auth Routes (`/api/auth`)

| Method | Path | Auth | Handler |
|--------|------|------|---------|
| POST | `/signup` | Public | Register user |
| POST | `/login` | Public | Login user |
| POST | `/logout` | Public | Clear cookie |
| POST | `/google` | Public | Google Sign-In |
| GET | `/me` | `authenticateUser` | Get current user |
| GET | `/admin/me` | `authenticateUser` | Get current admin |
| PUT | `/update-profile` | `authenticateUser` | Update profile + pic |
| GET | `/verify/user/:token` | Public | Email verification |
| POST | `/signupAdmin` | Public | Register admin |
| POST | `/loginAdmin` | Public | Login admin |
| GET | `/verify/admin/:token` | Public | Admin email verification |
| GET | `/users` | `authenticateUser` + `authorizeAdmin` | List users (admin's course only) |

#### Note Routes (`/api/notes`)

| Method | Path | Auth | Handler |
|--------|------|------|---------|
| POST | `/upload` | Admin only | Upload note + file |
| GET | `/` | `authenticateUser` | List notes |
| GET | `/search` | `authenticateUser` | Search & filter notes |
| DELETE | `/:id` | Admin only | Delete note + Cloudinary file |
| PUT | `/:id` | Admin only | Update note (optionally replace file) |

#### SuperAdmin Routes (`/api/superadmin`)

| Method | Path | Auth | Handler |
|--------|------|------|---------|
| POST | `/register` | Public | Register SuperAdmin |
| POST | `/login` | Public | Login |
| GET | `/logout` | Public | Logout |
| GET | `/verify/:token` | Public | Email verify |
| GET | `/profile` | `authenticateSuperAdmin` | Get profile |
| PUT | `/profile` | `authenticateSuperAdmin` | Update profile |
| GET | `/stats` | `authenticateSuperAdmin` | Dashboard stats |
| GET | `/users` | `authenticateSuperAdmin` | All users |
| DELETE | `/users/:id` | `authenticateSuperAdmin` | Delete user |
| PUT | `/users/:id/verify` | `authenticateSuperAdmin` | Toggle verification |
| GET | `/admins` | `authenticateSuperAdmin` | All admins |
| DELETE | `/admins/:id` | `authenticateSuperAdmin` | Delete admin |
| PUT | `/admins/:id/verify` | `authenticateSuperAdmin` | Toggle verification |
| GET | `/feedback` | `authenticateSuperAdmin` | All feedbacks |
| DELETE | `/feedback/:id` | `authenticateSuperAdmin` | Delete feedback |

#### Academic Routes (`/api/academic`)

| Method | Path | Auth | Handler |
|--------|------|------|---------|
| GET | `/sessions` | **Public** | List sessions |
| GET | `/courses` | **Public** | List courses |
| GET | `/branches?course=ID` | **Public** | List branches |
| GET | `/semesters?course=ID` | **Public** | List semesters |
| GET | `/subjects?branch=ID&semester=ID&course=ID` | **Public** | List subjects |
| POST/PUT/DELETE | `/*` | `authenticateSuperAdmin` | Create/Update/Delete |

**Why are GET routes public?** Students need to browse the academic tree before viewing notes. The tree structure is not sensitive data.

#### Other Routes

| Mount | Purpose |
|-------|---------|
| `/api/feedback` | User submits (auth required) • Admin reads/deletes |
| `/api/contact` | User submits (auth required) • Admin reads/deletes |
| `/api/subscribe` | Public subscribe • Admin reads/deletes |

### 6.6 Middleware

#### authenticateUser (authMiddleware.js)

This is the core auth middleware. Here's the complete flow:

```javascript
export const authenticateUser = (req, res, next) => {
    // Step 1: Try to get token from cookies
    let token = req.cookies.authToken || req.cookies.SuperauthToken;

    // Step 2: Fall back to Authorization header
    if (!token) {
        const authHeader = req.header("Authorization");
        if (authHeader) {
            token = authHeader.startsWith("Bearer ")
                ? authHeader.slice(7)
                : authHeader;
        }
    }

    // Step 3: No token at all → reject
    if (!token) return res.status(401).json({ message: "Access denied!" });

    // Step 4: Verify the JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;  // { id: "...", role: "student"|"admin"|"superadmin" }
    next();
};
```

**Why does it check `SuperauthToken` too?** SuperAdmins need to access user-facing routes (like `/api/notes`). Without this, SuperAdmin would get "Access denied" on the dashboard.

#### authorizeAdmin

A simple role check that runs **after** `authenticateUser`:

```javascript
export const authorizeAdmin = (req, res, next) => {
    if (req.user.role !== "admin") {
        return res.status(403).json({ message: "Access denied! Admins only" });
    }
    next();
};
```

#### authenticateSuperAdmin (SuperAdminMiddleware.js)

Similar to `authenticateUser` but **only** accepts `SuperauthToken` and **requires** `role === "superadmin"`:

```javascript
export const authenticateSuperAdmin = (req, res, next) => {
    const token = req.cookies.SuperauthToken || req.header("Authorization");
    // ... verify + check role === "superadmin"
    req.superAdmin = decoded;  // Note: uses req.superAdmin, not req.user
    next();
};
```

#### Upload Middleware (uploadMiddleware.js)

Connects Multer (file parser) to Cloudinary (cloud storage):

```javascript
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => ({
        folder: "collage",              // Cloudinary folder name
        format: file.mimetype.split("/")[1], // "pdf", "png", etc.
        resource_type: "auto",          // Auto-detect: image/video/raw
    }),
});
const upload = multer({ storage });
```

**How it works in a route:**
```javascript
router.post("/upload", authenticateUser, authorizeAdmin, upload.single("file"), uploadNote);
//                      ↑ check JWT       ↑ check role    ↑ parse file → upload to Cloudinary
//                                                          req.file.path = Cloudinary URL
```

### 6.7 Utilities

#### Email Verification (UserEmailVerification.js)

```javascript
// 1. Create a short-lived JWT containing the user's ID
const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "1h" });

// 2. Build a verification link
const verificationLink = `http://localhost:5000/api/auth/verify/user/${token}`;

// 3. Send via Gmail SMTP
const transporter = nodemailer.createTransport({
    service: "gmail",
    port: 465,
    secure: true,
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Email Verification",
    html: `<a href="${verificationLink}">Verify your email</a>`,
});
```

There are separate files for User, Admin, and SuperAdmin verification — each generates a link pointing to a different route.

### 6.8 Config (Third-Party Services)

#### Cloudinary (Config/cloudinary.js)

```javascript
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
```

Used by: `uploadMiddleware.js`, `multerMiddlewareForProFilePic.js`, `noteController.js` (for deletion).

#### Firebase Admin (Config/firebaseAdmin.js)

Two initialization modes:
1. **Production**: Reads `serviceAccountKey.json` file
2. **Development**: Uses `FIREBASE_PROJECT_ID` only (verifies tokens via Google's public keys)

Used by: `socialAuthController.js` to verify Google Sign-In tokens.

---

## 7. Frontend Architecture (Client)

### 7.1 Entry Point — main.jsx

```jsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./Context/AuthContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <AuthProvider>
            <App />
        </AuthProvider>
    </React.StrictMode>
);
```

**What's happening:**
1. `React.StrictMode` — Enables extra development warnings (double-renders in dev to catch bugs)
2. `AuthProvider` wraps `App` — Every component inside can access auth state via `useContext(AuthContext)`
3. `index.css` imports Tailwind CSS and sets the Inter font

### 7.2 App.jsx — The Router

All routes are defined here using React Router v7:

```jsx
function App() {
    return (
        <Router>
            <Navbar />
            <Suspense fallback={<Loading />}>
                <Routes>
                    {/* Public routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/superadmin/login" element={<SuperAdminLogin />} />
                    {/* ... more public routes */}

                    {/* Protected User Routes (user OR admin OR superadmin) */}
                    <Route element={<ProtectedUserRoute />}>
                        <Route path="/dashboard" element={<Dashboard />} />
                    </Route>
                    <Route element={<ProtectedUserRoute />}>
                        <Route path="/courses" element={<Courses />} />
                    </Route>
                    {/* ... /branch, /semester, /subjects, /notes */}

                    {/* Protected Admin Routes (admin only) */}
                    <Route element={<ProtectedAdminRoute />}>
                        <Route path="/admin/admindashboard" element={<AdminDashboard />} />
                    </Route>
                    {/* ... /admin/uploadnotes, /admin/managenotes, /admin/allUser */}

                    {/* Protected SuperAdmin Routes */}
                    <Route element={<ProtectedSuperAdminRoute />}>
                        <Route path="/superadmin/dashboard" element={<SuperAdminDashboard />} />
                        <Route path="/superadmin/academic" element={<AcademicManagement />} />
                        <Route path="/superadmin/feedback" element={<AllFeedbacks />} />
                    </Route>

                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Suspense>
            <Footer />
        </Router>
    );
}
```

**Key patterns:**

1. **Lazy loading** — Every page component is loaded with `lazy()`:
   ```jsx
   const Dashboard = lazy(() => import("./Sessions/Dashboard"));
   ```
   This means the JavaScript for each page is only downloaded when the user navigates to it, making the initial bundle smaller.

2. **Suspense** — Wraps all routes and shows a spinner while lazy components load.

3. **Layout routes** — `ProtectedUserRoute` is a wrapper that renders `<Outlet />` if authenticated:
   ```jsx
   <Route element={<ProtectedUserRoute />}>
       <Route path="/dashboard" element={<Dashboard />} />
   </Route>
   ```

### 7.3 AuthContext — Global State

This is the **heart** of the frontend auth system. It provides:

| Value | Type | Purpose |
|-------|------|---------|
| `user` | Object or null | Currently logged-in student |
| `admin` | Object or null | Currently logged-in admin |
| `superAdmin` | Object or null | Currently logged-in SuperAdmin |
| `loading` | Boolean | True while checking auth on page load |
| `login(credentials)` | Function | Login as student |
| `Adminlogin(credentials)` | Function | Login as admin |
| `superAdminLogin(credentials)` | Function | Login as SuperAdmin |
| `googleLogin()` | Function | Google Sign-In popup |
| `logout()` | Function | Logout student |
| `Adminlogout()` | Function | Logout admin |
| `superAdminLogout()` | Function | Logout SuperAdmin |

**Auth check on mount (page reload):**

```javascript
useEffect(() => {
    const checkAuthStatus = async () => {
        // Try SuperAdmin first
        try {
            const saResponse = await API.get("/superadmin/profile");
            if (saResponse.data.superAdmin) {
                setSuperAdmin(saResponse.data.superAdmin);
                return;  // Found SuperAdmin — stop checking
            }
        } catch (e) { /* Not SuperAdmin */ }

        // Try Admin
        try {
            const adminResponse = await API.get("/auth/admin/me");
            if (adminResponse.data.admin) {
                setAdmin(adminResponse.data.admin);
                return;
            }
        } catch (e) { /* Not Admin */ }

        // Try User
        try {
            const userResponse = await API.get("/auth/me");
            if (userResponse.data.user) {
                setUser(userResponse.data.user);
                return;
            }
        } catch (e) { /* Not logged in */ }

        // Fall back to localStorage
        const stored = localStorage.getItem("superAdmin")
                    || localStorage.getItem("admin")
                    || localStorage.getItem("user");
        if (stored) { /* restore from localStorage */ }
    };
    checkAuthStatus();
}, []);
```

**Why check SuperAdmin → Admin → User in that order?** Because a SuperAdmin's `SuperauthToken` cookie would fail the `/auth/me` check (which expects `authToken`). By checking SuperAdmin first, we avoid false negatives.

**Why localStorage as fallback?** If all API calls fail (server offline), we still show the user as "logged in" based on cached data. This gives a better UX — the app looks correct until the next API call fails.

### 7.4 Axios Instance — API Communication

```javascript
const API = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,  // ← THIS IS CRITICAL
});
```

`withCredentials: true` tells the browser to send cookies with every request, even cross-origin. Without this, the `authToken` cookie would never reach the server.

**Response interceptor:**
```javascript
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            console.log("Authentication expired.");
        }
        return Promise.reject(error);
    }
);
```

### 7.5 Protected Routes

Three route guard components, each following the same pattern:

#### ProtectedUserRoute

```jsx
const ProtectedUserRoute = () => {
    const { user, admin, superAdmin, loading } = useContext(AuthContext);

    if (loading) return <Spinner />;

    // Check context AND localStorage
    return user || admin || superAdmin || localStorage.getItem("user") || 
           localStorage.getItem("admin") || localStorage.getItem("superAdmin")
        ? <Outlet />          // Render the child route
        : <Navigate to="/login" replace />;
};
```

**Allows:** Users, Admins, AND SuperAdmins (everyone who's logged in).

#### ProtectedAdminRoute

Only allows `admin` (context or localStorage). Redirects to `/adminLogin`.

#### ProtectedSuperAdminRoute

Only allows `superAdmin`. Redirects to `/superadmin/login`.

### 7.6 Firebase Configuration

```javascript
// Client-side Firebase setup
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    // ... other config from .env
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
```

**Used for:** Google Sign-In popup. Firebase handles the OAuth flow, then gives us an `idToken` that we send to our backend for verification.

### 7.7 Page & Component Organization

| Directory | Contents |
|-----------|----------|
| `Pages/` | Top-level pages: Home, About, Contact, Login, SignUp, Events, Feedback, UserProfile |
| `Pages/AdminPages/` | Admin dashboard, note upload, note management, user list, profile |
| `Pages/SuperAdminPages/` | SuperAdmin login, dashboard, academic management, feedback |
| `Sessions/` | Dashboard showing session cards with stats |
| `Courses/` | Course card grid |
| `Branches/` | Branch card grid |
| `Semesters/` | Semester card grid |
| `Subject/` | Subject card grid |
| `Notes/` | Notes list with filtering |
| `Components/` | Shared UI: Navbar, Footer, NotFound |
| `HomePage/` | Home page sub-components (hero, features, etc.) |

---

## 8. Authentication System — The Complete Flow

### 8.1 Three-Role Architecture

```
┌──────────────────────────────────────────────────────────────────┐
│                     AUTHENTICATION LAYER                          │
├─────────────────┬─────────────────┬──────────────────────────────┤
│     STUDENT     │      ADMIN      │         SUPER ADMIN          │
├─────────────────┼─────────────────┼──────────────────────────────┤
│ Model: User     │ Model: Admin    │ Model: SuperAdmin            │
│ Cookie:authToken│ Cookie:authToken│ Cookie: SuperauthToken       │
│ Login: /login   │ Login:          │ Login:                       │
│                 │   /adminLogin   │   /superadmin/login          │
│ Middleware:     │ Middleware:     │ Middleware:                    │
│  authenticateUser│  authenticateUser│  authenticateSuperAdmin     │
│                 │  + authorizeAdmin│                              │
├─────────────────┼─────────────────┼──────────────────────────────┤
│ Can: Browse     │ Can: Upload     │ Can: Manage all              │
│  notes, submit  │  notes for own  │  academic data,              │
│  feedback,      │  course, view   │  users, admins,              │
│  contact form   │  own students   │  feedback, everything        │
└─────────────────┴─────────────────┴──────────────────────────────┘
```

### 8.2 Cookie Strategy

| Cookie Name | Set by | Contains | Used by |
|------------|--------|----------|---------|
| `authToken` | User login, Admin login, Social login | `{ id, role: "student" \| "admin" }` | `authenticateUser` middleware |
| `SuperauthToken` | SuperAdmin login | `{ id, role: "superadmin" }` | `authenticateSuperAdmin` middleware + fallback in `authenticateUser` |

**Cookie options explained:**
```javascript
{
    httpOnly: true,    // JavaScript (document.cookie) CANNOT read it — prevents XSS
    secure: true,      // Only sent over HTTPS (in production)
    sameSite: 'strict', // Only sent to same-site requests — prevents CSRF
    maxAge: 86400000,  // 1 day in milliseconds
}
```

### 8.3 Registration → Email Verification → Login Flow

```
Frontend                          Backend                         Email
────────                          ───────                         ─────
POST /api/auth/signup ──────────→ Hash password                   
    { name, email, password }     Save user (isVerified=false)    
                                  Sign verification JWT (1hr)     
                                  ──────────────────────────────→ Send email with link
                                                                  
USER CLICKS LINK ─────────────────────────────────────────────────
                                                                  
GET /api/auth/verify/user/:token → Verify JWT                    
                                   Set isVerified = true          
                                   Render EJS success page        
                                                                  
POST /api/auth/login ───────────→ Find user by email             
    { email, password }           Check isVerified === true       
                                  bcrypt.compare(password, hash)  
                                  Sign auth JWT (1 day)           
                                  Set httpOnly cookie             
←─────────────────────────────── Return user data (no password)  
```

### 8.4 Google Social Login Flow

```
Frontend (React)                 Firebase                    Backend
────────────────                 ────────                    ───────
Click "Sign in with Google"
        │
        ▼
signInWithPopup(auth, googleProvider)
        │
        ▼
Google OAuth popup opens ────→ User enters Google credentials
        │
        ▼
Firebase returns idToken ←── Google validates & returns token
        │
        ▼
POST /api/auth/google ───────────────────────────────────→
    { idToken }                                           firebaseAdmin.auth()
                                                              .verifyIdToken(idToken)
                                                          │
                                                          ▼
                                                          Extract: uid, email, name, picture
                                                          │
                                                          ▼
                                                          Find or create User in MongoDB
                                                          Set isVerified = true (pre-verified)
                                                          Sign JWT → set authToken cookie
                                                          │
←─────────────────────────────────────────────────────────
Return user data
```

**Key detail:** Social auth users are automatically `isVerified: true` because Google already verified their email.

### 8.5 Auth State Rehydration on Page Reload

When the user refreshes the page, React state is lost. The `AuthContext` immediately runs `checkAuthStatus()`:

```
Page loads → AuthContext useEffect fires → loading = true
    │
    ├──→ GET /api/superadmin/profile (uses SuperauthToken cookie)
    │    ├── 200 → setSuperAdmin(data) → done
    │    └── 401 → continue
    │
    ├──→ GET /api/auth/admin/me (uses authToken cookie)
    │    ├── 200 → setAdmin(data) → done
    │    └── 401 → continue
    │
    ├──→ GET /api/auth/me (uses authToken cookie)
    │    ├── 200 → setUser(data) → done
    │    └── 401 → continue
    │
    └──→ Check localStorage fallback
         └── loading = false
```

**While `loading` is true**, protected routes show a spinner. This prevents a flash of the login page before auth is confirmed.

---

## 9. Academic Data Hierarchy — The Core Domain

### 9.1 The Chain: Session → Course → Branch → Semester → Subject → Note

```
Session (2024-2025)
  └── Course (B.Tech)
       ├── Branch (CSE — Computer Science & Engineering)
       │    ├── Semester 1
       │    │    ├── Subject: Mathematics
       │    │    │    └── Notes: [note1.pdf, note2.pdf]
       │    │    └── Subject: Physics
       │    └── Semester 2
       │         └── Subject: Data Structures
       │              └── Notes: [dsa-notes.pdf]
       └── Branch (IT — Information Technology)
            └── ...

  └── Course (BCA)
       └── Branch (General)  ← BCA has only one branch
            ├── Semester 1
            │    └── Subject: Programming in C
            └── Semester 2
```

### 9.2 Frontend Navigation Flow

Users browse through a **card-based drill-down**:

```
/dashboard               → SessionCards (shows sessions like "2024-2025")
    │ click
    ▼
/courses?session=2024-2025  → CourseCards (shows "B.Tech", "BCA")
    │ click
    ▼
/branch?course=btech&session=2024-2025&courseId=xxx  → BranchCards ("CSE", "IT")
    │ click
    ▼
/semester?branch=cse&course=btech&session=2024-2025&branchId=xxx  → SemesterCards
    │ click
    ▼
/subjects?semester=sem1&branch=cse&course=btech&session=2024-2025&semesterId=xxx
    │ click
    ▼
/notes?subject=Mathematics&semester=Semester 1&branch=General&course=BCA&session=2024-2025
```

**URL parameters carry the context** through each level. This means:
- Deep links work (you can share a URL to specific notes)
- The back button works naturally
- Each page only needs to fetch its own data + read URL params for context

### 9.3 How Notes Are Filtered

Notes are stored with **text names** (not ObjectId references):
```javascript
// Note document in MongoDB
{
    title: "DSA Complete Notes",
    session: "2024-2025",
    course: "B.Tech",
    branch: "CSE",           // Stored as NAME, not ObjectId
    semester: "Semester 1",   // Stored as NAME, not ObjectId
    subject: "Data Structures"
}
```

**Why text instead of ObjectIds?** Simpler queries, no joins needed, and the note remains readable even if the academic structure changes.

**The NotesList component** fetches ALL notes and filters client-side:
```javascript
// 1. Read filter values from URL
const params = new URLSearchParams(location.search);
const subject = params.get("subject");
const semester = params.get("semester");
const branch = params.get("branch");
const course = params.get("course");
const session = params.get("session");

// 2. Fetch all notes
const response = await API.get("/notes");

// 3. Filter client-side with normalization
const filtered = allNotes.filter(note => {
    const match = (noteVal, filterVal) => {
        if (!filterVal) return true;
        return normalizeText(noteVal) === normalizeText(filterVal);
    };
    return match(note.session, session)
        && match(note.course, course)
        && match(note.branch, resolveBranch(branch))  // handles aliases like "gen" → "General"
        && match(note.semester, semester)
        && match(note.subject, subject);
});
```

**Branch alias resolution:** URLs use branch `code` ("gen") but notes store branch `name` ("General"). A `branchAliases` map handles this translation.

---

## 10. File Upload System

### Architecture

```
Browser                    Multer              Cloudinary         MongoDB
───────                    ──────              ──────────         ───────
FormData with file ──→ multer parses ──→ CloudinaryStorage ──→ Returns URL
                         multipart           uploads file        
                         /form-data                              
                                                                 
                    req.file = {                                 
                        path: "https://res.cloudinary.com/...",  
                        ...                                      
                    }                                            
                                                                 
noteController saves ─────────────────────────────────────────→ Note {
    note.fileUrl = req.file.path                                   fileUrl: "https://..."
                                                                 }
```

### Two upload configs

| File | Cloudinary Folder | Allowed Formats | Used For |
|------|------------------|-----------------|----------|
| `uploadMiddleware.js` | `collage` | Auto-detect (PDF, images, etc.) | Note files |
| `multerMiddlewareForProFilePic.js` | `profile_pics` | JPG, PNG, JPEG only | Profile pictures |

### Deletion from Cloudinary

When a note is deleted, the controller extracts the Cloudinary `public_id` from the URL and calls `cloudinary.uploader.destroy()`:

```javascript
// URL: https://res.cloudinary.com/mycloud/image/upload/v1234/collage/abcdef.pdf
// public_id: collage/abcdef
const urlParts = note.fileUrl.split('/');
const uploadIndex = urlParts.findIndex(part => part === 'upload');
publicId = urlParts.slice(uploadIndex + 2).join('/').split('.')[0];
await cloudinary.uploader.destroy(publicId);
```

---

## 11. API Reference — Every Endpoint

### Authentication (`/api/auth`)

```
POST   /api/auth/signup               → Register user
POST   /api/auth/login                → Login user  
POST   /api/auth/logout               → Logout user (clear cookie)
POST   /api/auth/google               → Google Sign-In
GET    /api/auth/me                   → Get current user (requires auth)
GET    /api/auth/admin/me             → Get current admin (requires auth)
PUT    /api/auth/update-profile       → Update user profile (requires auth)
GET    /api/auth/verify/user/:token   → Verify user email
POST   /api/auth/signupAdmin          → Register admin
POST   /api/auth/loginAdmin           → Login admin
GET    /api/auth/verify/admin/:token  → Verify admin email
GET    /api/auth/users                → List users (admin only)
```

### Notes (`/api/notes`)

```
POST   /api/notes/upload              → Upload note (admin only, multipart)
GET    /api/notes                     → Get all notes
GET    /api/notes/search?query=...    → Search notes
PUT    /api/notes/:id                 → Update note (admin only)
DELETE /api/notes/:id                 → Delete note (admin only)
```

### SuperAdmin (`/api/superadmin`)

```
POST   /api/superadmin/register       → Register SuperAdmin
POST   /api/superadmin/login          → Login SuperAdmin
GET    /api/superadmin/logout         → Logout SuperAdmin
GET    /api/superadmin/verify/:token  → Verify email
POST   /api/superadmin/resend-verification → Resend verification email

GET    /api/superadmin/profile        → Get profile
PUT    /api/superadmin/profile        → Update profile
GET    /api/superadmin/stats          → Dashboard statistics

GET    /api/superadmin/users          → All users
DELETE /api/superadmin/users/:id      → Delete user
PUT    /api/superadmin/users/:id/verify → Toggle user verification

GET    /api/superadmin/admins         → All admins
DELETE /api/superadmin/admins/:id     → Delete admin
PUT    /api/superadmin/admins/:id/verify → Toggle admin verification

GET    /api/superadmin/feedback       → All feedback
DELETE /api/superadmin/feedback/:id   → Delete feedback
```

### Academic Data (`/api/academic`)

```
GET    /api/academic/sessions         → List sessions (PUBLIC)
POST   /api/academic/sessions         → Create session (SuperAdmin)
PUT    /api/academic/sessions/:id     → Update session (SuperAdmin)
DELETE /api/academic/sessions/:id     → Delete session (SuperAdmin)

GET    /api/academic/courses          → List courses (PUBLIC)
POST   /api/academic/courses          → Create course (SuperAdmin)
PUT    /api/academic/courses/:id      → Update course (SuperAdmin)
DELETE /api/academic/courses/:id      → Delete course + related data (SuperAdmin)

GET    /api/academic/branches?course=ID     → List branches (PUBLIC)
POST   /api/academic/branches               → Create branch (SuperAdmin)
PUT    /api/academic/branches/:id           → Update branch (SuperAdmin)
DELETE /api/academic/branches/:id           → Delete branch + subjects (SuperAdmin)

GET    /api/academic/semesters?course=ID    → List semesters (PUBLIC)
POST   /api/academic/semesters             → Create semester (SuperAdmin)
PUT    /api/academic/semesters/:id         → Update semester (SuperAdmin)
DELETE /api/academic/semesters/:id         → Delete semester + subjects (SuperAdmin)

GET    /api/academic/subjects?branch=ID&semester=ID&course=ID → List subjects (PUBLIC)
POST   /api/academic/subjects              → Create subject (SuperAdmin)
PUT    /api/academic/subjects/:id          → Update subject (SuperAdmin)
DELETE /api/academic/subjects/:id          → Delete subject (SuperAdmin)
```

### Other

```
POST   /api/feedback                  → Submit feedback (auth required)
GET    /api/feedback                  → Get feedbacks (admin only)
DELETE /api/feedback/:id              → Delete feedback (admin only)

POST   /api/contact                   → Submit contact form (auth required)
GET    /api/contact                   → Get contacts (admin only)
DELETE /api/contact/:id               → Delete contact (admin only)

POST   /api/subscribe                 → Subscribe to newsletter (public)
POST   /api/subscribe/unsubscribe     → Unsubscribe (public)
GET    /api/subscribe/all             → List subscribers (admin only)
DELETE /api/subscribe/:id             → Delete subscriber (admin only)
```

---

## 12. Design Patterns & Key Concepts

### 1. MVC Architecture (Model-View-Controller)

```
Request → Route → Middleware → Controller → Model → Database
                                   ↓
                              Response (JSON)
```

- **Model** = Mongoose schema (data shape + validation)
- **View** = React components (frontend) or EJS templates (email verification pages)
- **Controller** = Express handler functions (business logic)

### 2. Middleware Chain

Express processes middleware in **order**. Each middleware calls `next()` to pass control:

```javascript
router.post("/upload",
    authenticateUser,    // 1. Verify JWT → set req.user
    authorizeAdmin,      // 2. Check req.user.role === "admin"
    upload.single("file"), // 3. Parse file → upload to Cloudinary → set req.file
    uploadNote           // 4. Controller: validate + save to DB
);
```

If any middleware calls `res.status().json()` instead of `next()`, the chain stops.

### 3. Context API for Global State

React's Context API replaces prop-drilling:

```
Without Context:             With Context:
App                          AuthProvider (wraps App)
 └── Navbar(user=...)         └── App
      └── Button(user=...)         ├── Navbar → useContext(AuthContext)
                                   ├── Dashboard → useContext(AuthContext)
                                   └── Profile → useContext(AuthContext)
```

### 4. Protected Route Pattern

Using React Router's `<Outlet />`:

```jsx
// The guard component
const ProtectedAdminRoute = () => {
    const { admin } = useContext(AuthContext);
    return admin ? <Outlet /> : <Navigate to="/adminLogin" />;
};

// Usage in App.jsx
<Route element={<ProtectedAdminRoute />}>     {/* Parent = guard */}
    <Route path="/admin/dashboard" element={<AdminDashboard />} /> {/* Child = actual page */}
</Route>
```

### 5. Dynamic References (refPath)

Mongoose's `refPath` allows one field to reference different collections:

```javascript
// Note model
uploadedBy: { type: ObjectId, refPath: 'uploaderModel' }
uploaderModel: { type: String, enum: ['User', 'Admin'] }

// When populated:
await Note.find().populate("uploadedBy", "name email");
// Mongoose checks uploaderModel to know which collection to join
```

### 6. Lazy Loading with Suspense

```jsx
const Dashboard = lazy(() => import("./Sessions/Dashboard"));

// In JSX:
<Suspense fallback={<Spinner />}>
    <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
</Suspense>
```

The `Dashboard` component's JavaScript bundle is only downloaded when the user navigates to `/dashboard`. Until then, the browser doesn't even know about it.

### 7. Vite Proxy for Development

```javascript
// vite.config.js
server: {
    proxy: {
        "/api": "http://localhost:5000",
    },
}
```

In development, any request from the frontend starting with `/api` is proxied to the backend. However, this project also uses a direct `baseURL` in the Axios instance, so the proxy is a secondary fallback.

### 8. COOP Headers for Firebase Popup

```javascript
// vite.config.js
headers: {
    "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
    "Cross-Origin-Embedder-Policy": "unsafe-none",
}
```

Firebase Google Sign-In opens a popup window. Modern browsers block popup ↔ parent communication with strict COOP policies. These headers relax the policy to allow it.

### 9. httpOnly Cookie Security

```
┌─────────────────────────────────────────────┐
│              Browser                         │
│                                              │
│  JavaScript (React): ❌ Cannot read cookie   │
│  Browser itself:     ✅ Sends cookie auto    │
│                                              │
│  XSS attack:        ❌ Cannot steal token    │
│  CSRF attack:       ❌ Blocked by sameSite   │
└─────────────────────────────────────────────┘
```

### 10. Cascade Deletes

When deleting a Course, all related data is cleaned up:

```javascript
export const deleteCourse = async (req, res) => {
    await Branch.deleteMany({ course: id });
    await Semester.deleteMany({ course: id });
    await Subject.deleteMany({ course: id });
    await Course.findByIdAndDelete(id);
};
```

---

## 13. What You Learned

By studying this project, you now understand:

| Topic | What you learned |
|-------|-----------------|
| **Express.js** | App setup, middleware chain, router mounting, CORS configuration |
| **MongoDB + Mongoose** | Schema design, refs, refPath, compound indexes, population |
| **JWT Authentication** | Token creation, verification, httpOnly cookie storage, expiration |
| **bcrypt** | Password hashing with salt, comparison during login |
| **Role-Based Access Control** | Three-tier roles, middleware guards, separate cookie strategies |
| **File Uploads** | Multer for parsing, Cloudinary for storage, URL tracking in DB |
| **Email Verification** | JWT-based verification links, Nodemailer SMTP sending |
| **Social Authentication** | Firebase client → popup → idToken → backend verification → account creation |
| **React Architecture** | Component hierarchy, lazy loading, Suspense |
| **Context API** | Global state management without Redux, auth state across components |
| **React Router v7** | Layout routes, protected routes with Outlet, Navigate for redirects |
| **Vite** | ES module dev server, proxy configuration, COOP headers |
| **Tailwind CSS** | Utility-first styling approach |
| **Axios** | Instance creation, interceptors, credential handling |
| **API Design** | RESTful endpoints, query parameters, pagination, search |
| **Security** | CORS, httpOnly cookies, sameSite, input validation, password hashing |
| **Cloudinary** | Cloud file upload/delete, public ID extraction from URLs |
| **Error Handling** | Try-catch in every controller, meaningful error messages |
| **Data Normalization** | Handling mismatches between URL codes and stored names |

---

## License

This project is for educational purposes.

---

> Built with Node.js, Express, MongoDB, React, Vite, and Tailwind CSS.
