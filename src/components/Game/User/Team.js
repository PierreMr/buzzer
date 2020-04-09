import React from "react";

const Team = ({ team, user, joinTeam }) => (
  <li key={team.data().name} onClick={() => joinTeam(team)}>
    {team.data().name}
    {user.data().team
      ? user.data().team.name === team.data().name
        ? " - YahMan"
        : ""
      : ""}
  </li>
);

export default Team;
