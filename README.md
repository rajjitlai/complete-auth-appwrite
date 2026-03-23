# Complete Auth Appwrite

A modern, production-ready React authentication boilerplate using Appwrite. This project provides a comprehensive user management flow, including registration, secure login, email verification, and password recovery.

## Features

-   **User Registration**: Create accounts with automatic login and verification email dispatch.
-   **Email Verification Flow**:
    -   **Verification Notice**: Unverified users are redirected to a dedicated notice page.
    -   **Resend Verification**: Users can request a new verification link if needed.
    -   **Real-time Refresh**: A "check status" feature to update verification state without re-logging.
-   **Secure Login**: Authenticate users and manage sessions securely.
-   **Password Recovery**:
    -   **Forgot Password**: Request a password reset link via email.
    -   **Reset Password**: Securely update passwords using a recovery token.
-   **Protected Routes**: Advanced route guarding that handles both authentication and verification status.
-   **Modern UI/UX**: Glassmorphism design with responsive layouts and real-time toast notifications.

## Tech Stack

-   **Frontend**: React 18 (Vite)
-   **Backend-as-a-Service**: Appwrite 14.x
-   **Routing**: React Router DOM 6.x
-   **Icons**: Lucide React
-   **Notifications**: React Hot Toast

## Prerequisites

-   [Node.js](https://nodejs.org/) (v16 or higher)
-   An [Appwrite](https://appwrite.io/) project (Cloud or Self-hosted)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/rajjitlai/complete-auth-appwrite.git
cd complete-auth-appwrite
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure Appwrite

1. Create a new project in your Appwrite console.
2. Under **Auth** -> **Settings**, enable **Email/Password** authentication.
3. In your project settings, add a **Web Platform**:
    -   **Hostname**: `localhost` (for development)
4. Create a `.env` file in the root directory:

   ```env
   VITE_LOGIN_APP_ID=your_appwrite_project_id
   VITE_LOGIN_APP_ENDPOINT=https://cloud.appwrite.io/v1
   ```

### 4. Run the application

```bash
npm run dev
```

## Folder Structure

-   `src/auth`: All authentication-related components (Login, Register, Password Recovery, Verification).
-   `src/components`: Route guarding components (`ProtectedRoute`, `GuestRoute`).
-   `src/config`: Appwrite client and account initialization with environment validation.
-   `src/context`: `AuthContext` managing global user state and authentication methods.
-   `src/pages`: Main application dashboard.

## License

MIT
