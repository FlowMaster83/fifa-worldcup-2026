import type { Team } from "@/services/api";

// FIFA World Cup group-stage ranking criteria (in order):
// 1. Points  2. Goal difference  3. Goals scored
// Head-to-head and fair-play criteria are not applied since this app
// does not store individual match results.
export function byStandings(a: Team, b: Team) {
  if (b.points !== a.points) return b.points - a.points;
  const diffA = goalDifference(a);
  const diffB = goalDifference(b);
  if (diffB !== diffA) return diffB - diffA;
  if (b.goals_for !== a.goals_for) return b.goals_for - a.goals_for;
  return a.pot - b.pot;
}

export function goalDifference(team: Team) {
  return team.goals_for - team.goals_against;
}

export function formatGoalDifference(diff: number) {
  return diff > 0 ? `+${diff}` : `${diff}`;
}
