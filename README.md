# RAKSHAK

A full-stack disaster relief & food rescue platform connecting donors, volunteers, and NGOs — with food/money donations, live disaster tracking, a volunteer leaderboard, karma points, and downloadable donation certificates.

**Stack:** React 19 + Vite + Tailwind (frontend) · Express 5 + MongoDB/Mongoose + JWT (backend)

## Features

- Role-based accounts: **Donor**, **Volunteer**, **NGO**, **Admin**
- Food and monetary donations
- Live disaster listings with detail pages
- Volunteer leaderboard and karma-points system
- PDF donation certificates
- Protected dashboards per role, gated behind auth

## Project structure

```
src/         React frontend (pages, components, context, services, routes)
backend/     Express REST API (controllers, routes, middleware)
database/    Mongoose models, DB connection, and seed data
```

## Getting started

### Prerequisites
- Node.js 18+
- A running MongoDB instance (local or Atlas)

### 1. Install dependencies
```bash
npm install
```

### 2. Configure environment variables
Copy the example env file and fill in your own values:
```bash
cp backend/.env.example backend/.env
```

| Variable | Description |
|---|---|
| `PORT` | Port the API server runs on (default `5000`) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Long random string used to sign auth tokens — generate one with `node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"` |
| `CLIENT_URL` | URL of the frontend, used for CORS |
| `DEMO_ACCOUNT_PASSWORD` | Password that unlocks the four seeded demo accounts (see below) — change before deploying anywhere public |

**Never commit `backend/.env`** — it's already covered by `.gitignore`.

### 3. Seed demo data (optional)
```bash
npm run db:seed
```

### 4. Run the app
In two terminals:
```bash
npm run server    # backend API on :5000
npm run dev        # frontend on :5173
```

## Demo accounts

Four seeded accounts (`donor@rakshak.org`, `volunteer@rakshak.org`, `ngo@rakshak.org`, `admin@rakshak.org`) can be used with the password set in `DEMO_ACCOUNT_PASSWORD`. This mechanism only ever applies to these four accounts — it does not grant access to real user accounts.

## Creating a real admin account

Public registration (`/register` in the UI, or `POST /api/auth/register`) can only create **donor / volunteer / ngo** accounts — it deliberately can't self-assign the admin role. To get a real admin account tied to your own email and password:

```bash
npm run admin:create -- "Your Name" you@example.com "yourPassword123"
```

This connects directly to your database and creates the account (or promotes an existing account with that email) as admin — it doesn't go through the public API. Once you have one admin, that admin can promote other existing users via:

```
PUT /api/auth/promote/:userId
Authorization: Bearer <admin's token>
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the frontend dev server |
| `npm run server` | Start the backend API |
| `npm run server:dev` | Start the backend with auto-reload |
| `npm run build` | Build the frontend for production |
| `npm run db:seed` | Seed the database with demo data |
| `npm run lint` | Lint the frontend |
