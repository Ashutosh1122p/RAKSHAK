# RAKSHAK Disaster Relief Flow

Implemented:
- Admin-only disaster alert creation and closing.
- Active disaster alerts loaded from MongoDB.
- Volunteer "I Can Help" mission joining.
- Authenticated user "Request Help" form.
- Volunteer pending-help queue and accept action.
- Admin help-request monitoring.
- Auto-refresh: public disasters 30s, volunteer relief data 20s.
- Removed hardcoded disaster cards from `Disasters.jsx` and `VolunteerDashboard.jsx`.

## Run
Terminal 1:
```powershell
cd backend
npm run dev
```

Terminal 2:
```powershell
npm run dev
```

The backend uses `backend/.env` and MongoDB Atlas. The database connection no longer silently falls back to local MongoDB.

## Admin
Login as an admin, open Admin Dashboard -> Disaster Alerts -> Create Alert.

## Volunteer
Login as a volunteer, open Volunteer Dashboard. Active admin alerts and pending help requests are loaded from the API.

## Person needing help
Open an active disaster -> Request Help. Login is required. The request is stored in MongoDB and becomes visible to volunteers/admins.

## New API endpoints
- `POST /api/disasters` admin
- `GET /api/disasters` public
- `GET /api/disasters/:id` public
- `POST /api/disasters/:id/join` volunteer
- `PATCH /api/disasters/:id/close` admin
- `POST /api/help-requests` authenticated user
- `GET /api/help-requests/pending` volunteer/admin
- `GET /api/help-requests` admin
- `POST /api/help-requests/:id/accept` volunteer
- `PATCH /api/help-requests/:id/complete` volunteer/admin

## Important
The uploaded `.env` files are intentionally not included in the modified ZIP. Keep your existing local `.env` files in place.
