import React from "react";

const Users = ({ users, teams, user }) => {
  return (
    <div className="row mb-3">
      {teams.map((team) => (
        <ul key={team.id} className="list-group col-6 m-auto">
          <li className="list-group-item list-group-item-secondary">
            {`${team.data().name} `}
            <b>{team.data().score}</b>
            {user.data().idTeam === team.id ? " (Ton équipe)" : ""}
          </li>
          {users
            .filter((user) => user.data().team)
            .filter((user) => user.data().idTeam === team.id)
            .map((user) => {
              let liClassName = "list-group-item";
              if (!user.data().disabled) {
                if (user.data().team) {
                  if (user.data().team.name === "Ketchup")
                    liClassName += " list-group-item-danger";
                  else if (user.data().team.name === "Mayo")
                    liClassName += " list-group-item-warning";
                }
              } else {
                liClassName += " list-group-item-light";
              }
              return (
                <li key={user.id} className={liClassName}>
                  {user.data().name}
                </li>
              );
            })}
        </ul>
      ))}

      {users.filter((user) => !user.data().team).length !== 0 ? (
        <div className="col-12 mt-3">
          <ul className="list-group col-6 m-auto">
            <li className="list-group-item list-group-item-secondary">
              En attente
            </li>
            {users
              .filter((user) => !user.data().team)
              .map((user) => {
                let liClassName = "list-group-item";
                if (user.data().team) {
                  if (user.data().team.name === "Ketchup")
                    liClassName += " list-group-item-danger";
                  else if (user.data().team.name === "Mayo")
                    liClassName += " list-group-item-warning";
                }
                return (
                  <li key={user.id} className={liClassName}>
                    {user.data().name}
                  </li>
                );
              })}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Users;
