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
## Tech Stack
- Node.Js
- Express
- MongoDB
- mongoose
- JWT
- Bcrypt
- Express rate limit
- Express validators
- Nodemailer for Email notifications
- cors
- cookie-parser
## Folder Structure
project-root
├── backend
│   ├── src
│   │   ├── config
│   │   │   ├── db.js
│   │   │   └── env.js
│   │   │
│   │   ├── controllers
│   │   │   ├── auth.controller.js
│   │   │   ├── user.controller.js
│   │   │   └── book.controller.js
│   │   │
│   │   ├── models
│   │   │   ├── user.model.js
│   │   │   └── book.model.js
│   │   │
│   │   ├── routes
│   │   │   ├── auth.routes.js
│   │   │   ├── user.routes.js
│   │   │   └── book.routes.js
│   │   │
│   │   ├── middlewares
│   │   │   ├── auth.middleware.js
│   │   │   ├── error.middleware.js
│   │   │   └── rateLimit.middleware.js
│   │   │
│   │   ├── services
│   │   │   ├── auth.service.js
│   │   │   └── email.service.js
│   │   │
│   │   ├── utils
│   │   │   ├── logger.js
│   │   │   ├── apiResponse.js
│   │   │   └── token.js
│   │   │
│   │   ├── validations
│   │   │   └── auth.validation.js
│   │   │
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── package.json
│   └── .env
│
├── frontend
│   ├── public
│   │   ├── images
│   │   └── icons
│   │
│   ├── css
│   │   ├── style.css
│   │   └── responsive.css
│   │
│   ├── js
│   │   ├── api.js
│   │   ├── auth.js
│   │   ├── logout.js
│   │   └── main.js
│   │
│   ├── pages
│   │   ├── login.html
│   │   ├── register.html
│   │   ├── dashboard.html
│   │   └── books.html
│   │
│   └── index.html
│
├── README.md
└── .gitignore
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
Install Node.js
## Download and install from https://nodejs.org. Recommended LTS version.
## Verify Node.js and npm installation
  node -v
  npm -v

