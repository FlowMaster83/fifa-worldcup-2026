import { getTeamsByGroup, Team } from "@/services/api";
import css from "./GroupPage.module.css";

interface Props {
  groupId: string;
}

function byStandings(a: Team, b: Team) {
  if (b.points !== a.points) return b.points - a.points;
  const goalDiffA = a.goals_for - a.goals_against;
  const goalDiffB = b.goals_for - b.goals_against;
  if (goalDiffB !== goalDiffA) return goalDiffB - goalDiffA;
  if (b.goals_for !== a.goals_for) return b.goals_for - a.goals_for;
  return a.pot - b.pot;
}

export default async function GroupPage({ groupId }: Props) {
  const teams: Team[] = await getTeamsByGroup(groupId);
  const standings = [...teams].sort(byStandings);

  return (
    <div>
      <h1>Group {groupId}</h1>
      <table className={css.table}>
        <thead>
          <tr>
            <th className={css.teamCell}>Команда</th>
            <th>І</th>
            <th>В</th>
            <th>Н</th>
            <th>П</th>
            <th>М&apos;ячі</th>
            <th>О</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team) => (
            <tr key={team.id}>
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
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
