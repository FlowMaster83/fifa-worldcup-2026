import { connectDB } from "../lib/mongodb";
import Team from "../models/team";
import db from "../db.json";

async function seed() {
  await connectDB();
  await Team.deleteMany({});
  await Team.insertMany(db.teams);
  console.log(`Inserted ${db.teams.length} teams`);
  process.exit(0);
}

seed();