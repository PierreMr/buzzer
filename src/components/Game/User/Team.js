import React from "react";

const Team = ({ team, user, joinTeam }) => {
  let liClassName = "";
  const liStyle = {
    cursor: "pointer",
  };
  if (user.data().team) {
    if (user.data().team.name === team.data().name) {
      if (user.data().team.name === "Ketchup") {
        liClassName += " list-group-item-danger";
      } else if (user.data().team.name === "Mayo") {
        liClassName += " list-group-item-warning";
      }
    }
  }
  return (
    <li
      key={team.data().name}
      className={"list-group-item" + liClassName + " col-6 m-auto"}
      onClick={() => joinTeam(team)}
      style={liStyle}
    >
      {team.data().name}
    </li>
  );
};

export default Team;
