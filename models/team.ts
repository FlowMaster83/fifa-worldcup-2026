import mongoose, { Schema } from "mongoose";

const TeamSchema = new Schema({
  id: Number,
  name: String,
  code: String,
  flag: String,
  confederation: String,
  group_id: String,
  pot: Number,
  fifa_ranking_nov2025: Number,
  is_host: Boolean,
  is_debut: Boolean,
  world_cup_appearances: Number,
  world_cup_titles: Number,
  best_result: String,
  coach: String,
  qualified_via: String,
});

export default mongoose.models.Team || mongoose.model("Team", TeamSchema);