import axios from "axios";

const BASE_URL = "http://localhost:3001";

export interface Team {
  id: number;
  name: string;
  code: string;
  flag: string;
  confederation: string;
  group_id: string;
  pot: number;
  fifa_ranking_nov2025: number;
  is_host: boolean;
  is_debut: boolean;
  world_cup_appearances: number;
  world_cup_titles: number;
  best_result: string;
  coach: string;
  qualified_via: string;
}

export async function getTeamsByGroup(groupId: string) {
  const res = await axios.get(`${BASE_URL}/teams?group_id=${groupId}`);

  console.log(res.data);
  return res.data;
}
