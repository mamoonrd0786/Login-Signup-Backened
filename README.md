# Login & Signup Authentication API
Production-ready authentication backend built with Node.js, Express, JWT, and MongoDB. Includes secure password hashing, access & refresh tokens, rate limiting, and email verification.
## FEATURES
- User Signup & Login
- Password Hashing (bcrypt)
- Rate limiting (Brute force protection)
- Password Reset
- Secure HTTP - Only cookies
- JWT Authentication (Access + Refresh Token)
- Centralized Error Handling
## Folder Structure
project-name/
│
├── src/
│   ├── controllers/
│   │   ├── auth.controller.js
│   │
│   ├── models/
│   │   ├── user.model.js
│   │
│   ├── routes/
│   │   ├── auth.routes.js
│   │
│   ├── middlewares/
│   │   ├── auth.middleware.js
│   │
│   ├── utils/
│   │   ├── ApiError.js
│   │   ├── ApiResponse.js
│   │   ├── asyncHandler.js
│   │
│   ├── config/
│   │   ├── db.js
│   │
│   └── index.js
│
├── public/
├── .env.example
├── .gitignore
├── package.json
└── README.md
## How to set up for the project
Don't upload these files to GitHub (Due to security reasons)
 1. node_modules
 2. secret keys
 3. .env (For sample, we can create another file .env.sample)
 4. Example: In .env.sample
    i. PORT=8000
    ii. MONGO_URI=your_mongodb_connection
    iii. JWT_SECRET_KEY=your_access_token_secret
    iv. JWT_REFRESH_KEY=your_refresh_token_secret
# Node.js Setup
## Install Node.js
   Download and install from https://nodejs.org. Recommended LTS version.
## Verify Node.js and npm installation
  i. node -v
      or
  ii. npm -v

# Node.js Authentication API

A production-ready authentication backend built with **Node.js, Express, MongoDB, JWT, and HTTP-only cookies**.

This project implements secure authentication using:

* Access Token
* Refresh Token
* HTTPOnly Cookies
* JWT Verification Middleware

---
# Tech Stack

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (jsonwebtoken)
* Cookie Parser
* CORS

---

# Installation

Clone the repository

```
git clone https://github.com/yourusername/node-auth-api.git
```

Go into the project folder

```
cd node-auth-api
```

Install dependencies

```
npm install
```

---

# Environment Variables

Create a `.env` file in the root folder.

Example `.env`:

```
PORT=8000

MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_access_token_secret
JWT_REFRESH_KEY=your_refresh_token_secret
# Run the Server
Development mode
npm run dev
Production mode
npm start
The server will run on
http://localhost:8000

# API Endpoints

## Register
POST /api/register
Request Body
```
{
 "email": "user@gmail.com",
 "password": "123456"
}
```
## Login
POST /api/login
Request Body
```
{
 "email": "user@gmail.com",
 "password": "123456"
}
```
Response
* Sets **accessToken cookie**
* Sets **refreshToken cookie**
---

## Logout

POST /api/logout
Requires an authentication cookie.
Clears
* accessToken
* refreshToken
---

## Refresh Token

POST /api/refresh-token
Generates a new access token using a refresh token.
---

# Authentication Flow

```
User Login
     │
     ▼
Server Generates Tokens
     │
     ▼
Access Token (Short Life)
Refresh Token (Long Life)
     │
     ▼
Stored in HTTPOnly Cookies
     │
     ▼
Protected Routes use JWT Middleware
     │
     ▼
Logout clears cookies
```
---

# Security Features
* HTTPOnly cookies prevent XSS attacks
* JWT verification middleware
* Refresh token rotation
* Secure logout mechanism

# JSON Web Token (JWT)

  * JSON Web Token (JWT) is a compact, URL-safe token used for securely transmitting information between parties as a JSON object. It is widely used for authentication and authorization      in modern web applications.

# How JWT Works

  * JWT consists of three parts separated by dots (.):
    like this: xxxxx.yyyyy.zzzzz
1. Header – Contains the token type and signing algorithm.
2. Payload – Contains the claims or data about the user (e.g., user ID, role).
3. Signature – Verifies that the token is not tampered with. It is created by: ( HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret) )

# JWT Authentication Flow

 1. User Login
   i. User sends email/password to the backend.
   ii. Backend verifies credentials.
   iii. Backend generates a JWT token (access token) and optionally a refresh token.
   iv. Backend sends the JWT to the client, usually in HTTP-only cookies or in the response body.

# Access protected routes
  1. Client sends requests with JWT in the Authorization header or cookie. ( Authorization: Bearer <JWT> )

# Why use JWT?
 * Stateless Authentication: No need to store sessions in DB.
 * Secure: Can be signed and optionally encrypted.
 * Compact: Easy to send in headers or cookies.
 * Cross-platform: Works with web, mobile, and microservices.

Tip: JWT is not a session. It does not store data server-side. Always treat it as a stateless authentication mechanism.
# Author
Your Name

GitHub: https://github.com/yourusername


