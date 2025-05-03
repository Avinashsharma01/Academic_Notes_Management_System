# Authentication Context

This project uses React Context API for authentication management, providing both user and admin authentication workflows.

## Overview

`AuthContext` is a React context that manages authentication state, providing login/logout functionality for both regular users and administrators.

## Key Features

- Separate authentication flows for users and admins
- Persistent authentication using localStorage
- Token-based authentication
- Clean separation of user and admin states

## Implementation Details

### State Management

The context maintains two separate states:
- `user`: Stores the authenticated user information
- `admin`: Stores the authenticated admin information

### Authentication Methods

#### User Authentication
- `login(credentials)`: Authenticates a regular user
- `logout()`: Logs out a regular user

#### Admin Authentication
- `Adminlogin(credentials)`: Authenticates an administrator
- `Adminlogout()`: Logs out an administrator

### Token Management

Authentication tokens are stored in localStorage:
- User token: `authToken`
- Admin token: `authTokenAdmin`

### Persistence

User and admin data are persisted in localStorage:
- User data: stored as `user`
- Admin data: stored as `admin`

## Usage

```jsx
import { useContext } from 'react';
import AuthContext from './path/to/AuthContext';

function MyComponent() {
  const { user, admin, login, logout, Adminlogin, Adminlogout } = useContext(AuthContext);
  
  // Check if user is logged in
  if (user) {
    return <div>Welcome, {user.name}!</div>;
  }
  
  // Login form
  const handleLogin = (e) => {
    e.preventDefault();
    login({ email, password });
  };
  
  // etc.
}
```

## Security Note

This implementation uses localStorage for token storage. For production applications, consider:
- Using HTTP-only cookies for token storage to prevent XSS attacks
- Implementing token refresh mechanisms
- Adding proper error handling and user feedback