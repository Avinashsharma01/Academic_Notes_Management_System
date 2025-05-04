# The College - Client Application

A modern React application for managing college notes and resources. Built with React, Vite, and Tailwind CSS.

## Features

-   User and admin authentication
-   Notes upload, download, and management
-   Course and branch organization
-   User profiles and feedback
-   Responsive design for all devices

## Authentication System

### Cookie-Based Authentication Implementation

The application has been enhanced with a secure cookie-based authentication system:

#### Key Features

-   **HTTP-Only Cookies**: Authentication tokens stored in secure, HTTP-only cookies
-   **Cross-Site Request Protection**: Configured with appropriate sameSite settings
-   **Hybrid Authentication**: Supports both modern cookie-based auth and legacy localStorage auth for backward compatibility

#### Frontend Implementation

-   **AuthContext Component**: Updated to handle cookie-based authentication state
-   **API Configuration**: Axios instance configured with `withCredentials: true` to support cookies
-   **Protected Routes**: Enhanced to support secure cookie-based access control
-   **Login/Logout Flow**: Streamlined to work seamlessly with server-side cookie management

#### Security Benefits

-   **XSS Protection**: HTTP-only cookies cannot be accessed by JavaScript
-   **CSRF Protection**: Proper cookie configuration prevents cross-site request forgery
-   **Simplified Token Management**: No need to manually attach tokens to requests
-   **Improved User Experience**: Authentication persists across sessions securely

#### Files Changed

-   `src/Context/AuthContext.jsx`: Updated to support cookie-based authentication
-   `src/Config/ProtectedUserRoute.jsx` & `ProtectedAdminRoute.jsx`: Modified to handle cookie auth
-   `src/Pages/UserProfile.jsx`: Updated to work without explicit token passing
-   `src/Api/axiosInstance.js`: Configured to support credentials

## Development

### Installation

```bash
npm install
```

### Running Development Server

```bash
npm run dev
```

### Building for Production

```bash
npm run build
```

## Technologies Used

-   React.js
-   Vite
-   Tailwind CSS
-   React Router
-   Axios
