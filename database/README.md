# RAKSHAK Database Subsystem

Welcome to the dedicated **RAKSHAK Database Subsystem**. This folder encapsulates all MongoDB schemas, Mongoose models, data relationships, real-time GPS telemetry collections, and automated seeding scripts.

---

## Directory Structure

```
database/
├── connection.js       # Centralized Mongoose connection with resilient auto-reconnect
├── initDb.js           # Database health & document count check
├── README.md           # Database documentation & schemas guide
├── models/             # Mongoose Models
│   ├── User.js         # User accounts (donor, volunteer, ngo, admin) with geolocations
│   ├── FoodDonation.js # Surplus food donations with pickup coordinates
│   ├── Disaster.js     # Disaster relief operations & volunteer requirements
│   ├── LiveMission.js  # Real-Time Tracking, route waypoints & vehicle telemetry
│   ├── Karma.js        # Volunteer score ledger
│   ├── Certificate.js  # Verified humanitarian certificates
│   └── Payment.js      # Monetary relief fund donations
└── seeds/
    ├── seedData.js     # Pan-India / Delhi-NCR mock data & realistic GPS routes
    └── seed.js         # Executable seeding script
```

---

## Quick Commands

### Seed the Database
Populates fresh demo accounts, live tracking routes, and disaster alerts:
```bash
node database/seeds/seed.js
```
Or from the root directory:
```bash
npm run db:seed
```

### Check Database Health & Counts
```bash
node database/initDb.js
```

---

## Default MongoDB Connection
- **URI**: `mongodb://127.0.0.1:27017/rakshak`
- **Database Name**: `rakshak`
