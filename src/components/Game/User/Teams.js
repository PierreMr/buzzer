import React from "react";
import Team from "./Team";

const Teams = ({ teams }) => (
  <ul>
    {teams.map((team) => (
      <Team key={team.name} team={team} />
    ))}
  </ul>
);

export default Teams;
