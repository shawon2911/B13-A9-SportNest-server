# 🏟️ SportNest — Backend

> RESTful API server for the SportNest online sports learning platform. Handles course data, user authentication, and profile management.

---

## 🔗 Live API URL

👉 

---

## 📌 Project Purpose

This is the backend service for SportNest. It exposes a secure REST API consumed by the SportNest frontend. It manages sports course data, user records, and integrates with BetterAuth for authentication flows including Google OAuth.

---

## ✨ Key Features

- 📡 **REST API** — Clean endpoints for courses, users, and profiles
- 🔐 **BetterAuth Integration** — Secure session management, Google OAuth, and credential-based auth
- 🗄️ **MongoDB** — Persistent data storage via Mongoose
- 🌍 **CORS Configured** — Accepts requests from the frontend domain only
- 🔒 **Environment-based Config** — All secrets stored in environment variables
- 🚀 **Deployed on Vercel** — Serverless-ready Express API

---

## 📁 Project Structure

```
sportnest-server/
├── index.js               # Entry point
├── lib/
│   └── auth.js            # BetterAuth configuration
├── routes/
│   ├── courseRoutes.js    # Course CRUD routes
│   └── userRoutes.js      # User/profile routes
├── models/
│   ├── Course.js          # Course Mongoose model
│   └── User.js            # User Mongoose model
├── middleware/
│   └── verifyToken.js     # Auth middleware
├── data/
│   └── courses.json       # Seed data (6+ courses)
├── .env
└── package.json
```

---

## 🔌 API Endpoints

### Courses

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/all-facilities` | Get all courses | ❌ |
| `GET` | `/api/all-facilities/:id` | Get single course by ID | ✅ |
| `GET` | `/api/facilities?search=title` | Search courses by title | ❌ |

### Users / Profile

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/users/me` | Get logged-in user profile | ✅ |
| `PATCH` | `/api/users/me` | Update name & photo URL | ✅ |

### Auth (handled by BetterAuth)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/sign-in/email` | Email login |
| `POST` | `/api/auth/sign-up/email` | Email registration |
| `GET` | `/api/auth/sign-in/google` | Google OAuth redirect |
| `GET` | `/api/auth/session` | Get current session |
| `POST` | `/api/auth/sign-out` | Logout |

---

## 📦 NPM Packages Used

| Package | Purpose |
|---|---|
| `express` | Web server framework |
| `mongoose` | MongoDB ODM |
| `better-auth` | Authentication engine |
| `cors` | Cross-origin resource sharing |
| `dotenv` | Environment variable loader |
| `cookie-parser` | Parse cookies for session handling |

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
PORT=5000
MONGODB_URI=mongodb+srv://your_user:your_password@cluster.mongodb.net/sportnest
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=https://your-backend-url.com
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
CLIENT_URL=https://sportnest.vercel.app
```

> ⚠️ Never commit `.env` to version control.

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/your-username/sportnest-server.git
cd sportnest-server

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Fill in your values

# Seed the database (optional)
node data/seed.js

# Start development server
npm run dev
```

Server runs at [http://localhost:5000](http://localhost:5000)

---



## 🛠️ Tech Stack

| Technology | Role |
|---|---|
| **Node.js** | Runtime environment |
| **Express.js** | API framework |
| **MongoDB Atlas** | Cloud database |
| **Mongoose** | Schema modeling |
| **BetterAuth** | Auth engine |
| **Vercel** | Serverless deployment |

---

## 🔒 Auth Flow (BetterAuth)

1. User hits `/api/auth/sign-in/email` or `/api/auth/sign-in/google`
2. BetterAuth validates credentials / OAuth token
3. A secure session cookie is set
4. Protected routes check the session via `verifyToken` middleware
5. On logout, session is destroyed server-side

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first.

---

## 📄 License

This project is for educational purposes. All rights reserved © SportNest 2026.