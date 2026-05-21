# SportNest — Server

REST API for the SportNest sports facility booking platform. Handles facilities, bookings, and user authentication with JWT-based route protection.

---

## 🔗 Live API URL

[https://sportnest-server.vercel.app](https://sportnest-server.vercel.app)

---

## ✨ Features

- Full CRUD for sports facilities (create, read, update, delete)
- Booking management — create and cancel bookings per user
- Search by facility name (`$regex`) and filter by sport type (`$in`)
- JWT generated on login, stored in HTTPOnly cookie
- Middleware to verify JWT and protect private API routes
- BetterAuth integration for Google OAuth and credential-based auth
- Owner-only update and delete enforcement
- CORS configured for frontend domain
- No 404/504 errors on any route

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB Atlas + Mongoose |
| Auth | BetterAuth + JWT |
| Deployment | Vercel |

---

## 📦 NPM Packages

| Package | Purpose |
|---|---|
| `express` | Web server framework |
| `mongoose` | MongoDB ODM |
| `better-auth` | Auth engine (Google + credentials) |
| `jsonwebtoken` | JWT generation and verification |
| `cookie-parser` | HTTPOnly cookie handling |
| `cors` | Cross-origin request handling |
| `dotenv` | Environment variable loader |

---

## 🔌 API Endpoints

### Facilities

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/all-facilities` | ❌ | Get all facilities (search & filter supported) |
| `GET` | `/all-facilities/:id` | ❌ | Get single facility |
| `POST` | `/all-facilities` | ✅ | Add new facility |
| `PUT` | `/all-facilities/:id` | ✅ Owner only | Update facility |
| `DELETE` | `/all-facilities/:id` | ✅ Owner only | Delete facility |

### Bookings

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/booking/:userId` | ✅ | Get bookings for logged-in user |
| `POST` | `/booking` | ✅ | Create a new booking |
| `PATCH` | `/booking/:id` | ✅ | Cancel a booking |

### Auth (BetterAuth)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/sign-in/email` | Email login |
| `POST` | `/api/auth/sign-up/email` | Email registration |
| `GET` | `/api/auth/sign-in/google` | Google OAuth |
| `GET` | `/api/auth/session` | Get session |
| `POST` | `/api/auth/sign-out` | Logout |

---

## 🗄️ Database Schema

**facilities**
```
name, facility_type, location, price_per_hour,
capacity, available_slots, description, owner_email, booking_count
```

**bookings**
```
facility_id, user_email, booking_date, time_slot,
hours, total_price, status (default: "pending")
```

---



Create a `.env` file in the root:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=your_backend_url
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=your_jwt_secret
CLIENT_URL=your_frontend_url
```

---

## 🚀 Getting Started

```bash
git clone https://github.com/shawon2911/B13-A9-SportNest-server
cd SportNest-server
npm install
cp .env.example .env   # fill in your values
npm run dev
```