import { getTeamsByGroup, Team } from "@/services/api";

interface Props {
  groupId: string;
}

export default async function GroupPage({ groupId }: Props) {
  const teams = await getTeamsByGroup(groupId);

  return (
    <div>
      <h1>Group {groupId}</h1>
      <ul>
        {teams.map((team: Team) => (
          <li key={team.id}>
            <span className={`fi fi-${team.iso}`} /> {team.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
