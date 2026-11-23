import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../models/User.js";
import FoodDonation from "../models/FoodDonation.js";
import Disaster from "../models/Disaster.js";
import LiveMission from "../models/LiveMission.js";
import Certificate from "../models/Certificate.js";
import Karma from "../models/Karma.js";
import Payment from "../models/Payment.js";
import {
  DEMO_USERS_FALLBACK,
  INITIAL_FOOD_DONATIONS,
  INITIAL_DISASTERS,
  INITIAL_LIVE_MISSIONS,
  INITIAL_CERTIFICATES,
  INITIAL_KARMA_LOGS,
} from "./seedData.js";

dotenv.config();

export const seedDatabase = async () => {
  try {
    const mongoUri =
      process.env.MONGO_URI || "mongodb://127.0.0.1:27017/rakshak";

    console.log(`Connecting to MongoDB at: ${mongoUri}...`);
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });
    console.log("Connected to MongoDB for seeding...");

    // Clear existing collections
    await User.deleteMany({});
    await FoodDonation.deleteMany({});
    await Disaster.deleteMany({});
    await LiveMission.deleteMany({});
    await Certificate.deleteMany({});
    await Karma.deleteMany({});
    await Payment.deleteMany({});

    console.log("Cleared existing RAKSHAK database records.");

    // Seed Users
    const usersToCreate = [
      { ...DEMO_USERS_FALLBACK.donor, password: "password123" },
      { ...DEMO_USERS_FALLBACK.volunteer, password: "password123" },
      { ...DEMO_USERS_FALLBACK.ngo, password: "password123" },
      { ...DEMO_USERS_FALLBACK.admin, password: "password123" },
    ];

    const createdUsers = [];
    for (const u of usersToCreate) {
      const user = await User.create(u);
      createdUsers.push(user);
    }
    console.log(`Created ${createdUsers.length} RAKSHAK demo user accounts.`);

    const donorUser = createdUsers.find((u) => u.role === "donor");
    const volunteerUser = createdUsers.find((u) => u.role === "volunteer");

    // Seed Food Donations
    const foodWithDonors = INITIAL_FOOD_DONATIONS.map((f) => ({
      ...f,
      donor: donorUser?._id,
    }));
    await FoodDonation.insertMany(foodWithDonors);
    console.log(`Created ${foodWithDonors.length} initial food donations.`);

    // Seed Disasters
    await Disaster.insertMany(INITIAL_DISASTERS);
    console.log(`Created ${INITIAL_DISASTERS.length} active disaster operations.`);

    // Seed Live Tracking Missions
    await LiveMission.insertMany(INITIAL_LIVE_MISSIONS);
    console.log(`Created ${INITIAL_LIVE_MISSIONS.length} real-time tracking missions.`);

    // Seed Certificates
    const certsWithUser = INITIAL_CERTIFICATES.map((c) => ({
      ...c,
      user: volunteerUser?._id,
    }));
    await Certificate.insertMany(certsWithUser);
    console.log(`Created ${certsWithUser.length} certificates.`);

    // Seed Karma Logs
    const karmaWithUser = INITIAL_KARMA_LOGS.map((k) => ({
      ...k,
      user: volunteerUser?._id,
    }));
    await Karma.insertMany(karmaWithUser);
    console.log(`Created ${karmaWithUser.length} karma entries.`);

    console.log("====================================================");
    console.log("  RAKSHAK Database Seeded Successfully!");
    console.log("  Database:   rakshak");
    console.log("  Mongo URI:  " + mongoUri);
    console.log("====================================================");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seeding Error:", error.message);
    process.exit(1);
  }
};

seedDatabase();
