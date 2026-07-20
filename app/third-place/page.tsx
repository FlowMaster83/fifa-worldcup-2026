import { getAllTeams } from "@/services/api";
import { byStandings, formatGoalDifference, goalDifference } from "@/lib/standings";
import css from "@/components/GroupPage/GroupPage.module.css";

const ADVANCING_COUNT = 8;

export default async function ThirdPlacePage() {
  const teams = await getAllTeams();

  const groupIds = [...new Set(teams.map((team) => team.group_id))].sort();
  const thirdPlaced = groupIds
    .map((groupId) => {
      const groupStandings = teams
        .filter((team) => team.group_id === groupId)
        .sort(byStandings);
      return groupStandings[2];
    })
    .filter((team) => team !== undefined)
    .sort(byStandings);

  return (
    <div>
      <h1>Best Third-Placed Teams</h1>
      <table className={css.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Group</th>
            <th className={css.teamCell}>Team</th>
            <th>P</th>
            <th>W</th>
            <th>D</th>
            <th>L</th>
            <th>Goals</th>
            <th>+/-</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {thirdPlaced.map((team, index) => (
            <tr
              key={team.id}
              className={index < ADVANCING_COUNT ? css.qualifies : undefined}
            >
              <td>{index + 1}</td>
              <td>{team.group_id}</td>
              <td className={css.teamCell}>
                <span className={css.team}>
                  <span className={`fi fi-${team.iso}`} />
                  {team.name}
                </span>
              </td>
              <td>{team.played}</td>
              <td>{team.wins}</td>
              <td>{team.draws}</td>
              <td>{team.losses}</td>
              <td>
                {team.goals_for}-{team.goals_against}
              </td>
              <td>{formatGoalDifference(goalDifference(team))}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
