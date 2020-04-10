import React from "react";
import Team from "./Team";

const Teams = ({ teams, user, joinTeam }) => (
  <ul className="list-group list-group-flush mt-5">
    {teams.map((team) => (
      <Team
        key={team.data().name}
        team={team}
        user={user}
        joinTeam={joinTeam}
      />
    ))}
  </ul>
);

export default Teams;
