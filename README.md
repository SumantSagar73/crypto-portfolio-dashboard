# Crypto Portfolio Dashboard

A modern, scalable, and secure web application for tracking crypto assets, built for the PrimeTrade Frontend Developer Intern Assignment.

## 1. Project Overview
This project is a comprehensive Crypto Portfolio Tracker that allows users to manage their digital asset holdings. It features a secure authentication system, a data-driven dashboard with real-time calculations, and a premium "Dark Crypto Pro" user interface.

## 2. Tech Stack
**Frontend:**
- **React (Vite)**
- **TailwindCSS v4** (with Glassmorphism)
- **React Hook Form + Zod** (Advanced validation)
- **React Router 7**
- **Axios** (for API integration)
- **Lucide React** (Icons)
- **React Hot Toast** (Notifications)

**Backend:**
- **Node.js & Express**
- **MongoDB (Mongoose)**
- **JWT** (JSON Web Tokens)
- **Bcrypt.js** (Password hashing)

## 3. Features Implemented
- **JWT Authentication**: Secure register/login/logout flow.
- **Protected Routes**: Dashboard and Profile access restricted to authenticated users.
- **CRUD Portfolio Management**: Complete Add, View, Edit, and Delete functionality for assets.
- **Search & Filter**: Find assets by name or symbol instantly.
- **Profile Management**: Update user display name and view account metadata.
- **Secure Security**: Industry-standard password hashing and error handling middleware.
- **Premium UI/UX**: State-of-the-art dark theme with glassmorphism effects.

## 4. How to Run Locally

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## 5. Environment Variables
Create a `.env` file in the `backend` folder:
```env
PORT=5000
MONGO_URI=mongodb+srv://6073sumant_db_user:k9VdIFYtf68A2WZH@cluster0.nqhtyev.mongodb.net/?appName=Cluster0
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
```

## 6. API Documentation

### Auth Routes
- `POST   /api/users/register` - Create a new user account.
- `POST   /api/users/login`    - Authenticate and receive JWT.
- `GET    /api/users/me`       - Fetch current user profile (Protected).
- `PUT    /api/users/profile`  - Update user profile details (Protected).

### Portfolio Routes (All Protected)
- `GET    /api/portfolio`      - Fetch all user assets.
- `POST   /api/portfolio`      - Add a new asset to portfolio.
- `PUT    /api/portfolio/:id`  - Update existing asset details.
- `DELETE /api/portfolio/:id`  - Remove asset from portfolio.

## 7. Scalability Plan (Production Ready)

To scale this application for a high-traffic production environment, I would implement the following:

- **Move JWT to httpOnly Cookies**: Mitigate XSS risks by storing tokens securely in cookies rather than localStorage.
- **Implement Refresh Tokens**: Add short-lived access tokens and long-lived refresh tokens for robust session management.
- **Rate Limiting**: Prevent API abuse and brute-force attacks using `express-rate-limit`.
- **Redis Caching**: Cache coin prices and user portfolio summaries to reduce DB load and improve latency.
- **Dockerization**: Containerize both frontend and backend for consistent deployment across any cloud provider.
- **Reverse Proxy (Nginx)**: Use Nginx as a reverse proxy for SSL termination and load balancing.
- **Microservices Architecture**: Separate the Auth and Portfolio logic as the user base grows.
- **CI/CD Pipeline**: Automate testing and deployment using GitHub Actions or GitLab CI.

---

Built for the PrimeTrade Internship Assignment.
