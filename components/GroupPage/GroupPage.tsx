import { getTeamsByGroup } from "@/services/api";
import { byStandings, formatGoalDifference, goalDifference } from "@/lib/standings";
import css from "./GroupPage.module.css";

interface Props {
  groupId: string;
}

export default async function GroupPage({ groupId }: Props) {
  const teams = await getTeamsByGroup(groupId);
  const standings = [...teams].sort(byStandings);

  return (
    <div>
      <h1>Group {groupId}</h1>
      <table className={css.table}>
        <thead>
          <tr>
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
          {standings.map((team, index) => (
            <tr
              key={team.id}
              className={
                index < 2 ? css.advances : index === 2 ? css.qualifies : undefined
              }
            >
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
