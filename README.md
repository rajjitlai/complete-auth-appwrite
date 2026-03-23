# Complete Auth Appwrite

A simple React application demonstrating a complete authentication flow using Appwrite, including registration, login, and email verification.

## Features

- **User Registration**: Create a new account with email and password.
- **Email Verification**: Automatically sends a verification email upon registration.
- **User Login**: Secure login with email and password (requires email verification).
- **Protected Routes**: Home page is only accessible to authenticated and verified users.
- **Logout**: Securely end the user session.

## Tech Stack

- **Frontend**: React (Vite)
- **Backend-as-a-Service**: Appwrite
- **Routing**: React Router DOM
- **Notifications**: React Hot Toast

## Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- An [Appwrite](https://appwrite.io/) account (Cloud or Self-hosted)

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
2. In the Appwrite dashboard, go to **Settings** and find your **Project ID** and **API Endpoint**.
3. Create a `.env` file in the root directory and add your Appwrite credentials:

   ```env
   VITE_LOGIN_APP_ID=your_appwrite_project_id
   VITE_LOGIN_APP_ENDPOINT=https://cloud.appwrite.io/v1
   ```

4. In the Appwrite console, go to **Auth** -> **Settings** and ensure **Email/Password** authentication is enabled.
5. Add a Web platform in your Appwrite project settings with the hostname of your development server (e.g., `localhost`).

### 4. Run the application

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## Folder Structure

- `src/auth`: Login and Registration components.
- `src/components`: Reusable components like `VerifyEmail`.
- `src/config`: Appwrite client initialization.
- `src/func`: Utility functions like logout logic.
- `src/pages`: Main application pages.

## License

MIT
