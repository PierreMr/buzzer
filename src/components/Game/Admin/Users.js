import React from "react";

const Users = ({
  users,
  teams,
  ptsByQuestion,
  updateScore,
  changeStatusUser,
}) => {
  return (
    <div className="row mb-5">
      {teams.map((team) => (
        <ul key={team.id} className="list-group col-6 m-auto">
          <li className="list-group-item list-group-item-secondary">
            {["-", "+"].map((op) => (
              <button
                key={op}
                className="btn btn-sm btn-primary mr-5 ml-5"
                onClick={() => updateScore(team.id, op)}
              >{`${op} ${ptsByQuestion}`}</button>
            ))}
          </li>
          <li className="list-group-item">
            {`${team.data().name} `}
            <b>{team.data().score}</b>
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
                  {[0, 1].map((status) => (
                    <button
                      key={status}
                      className="btn btn-sm btn-outline-secondary ml-1 float-right"
                      onClick={() => changeStatusUser(user.id, status)}
                    >
                      {status === 1 ? "X" : "O"}
                    </button>
                  ))}
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
                return (
                  <li key={user.id} className="list-group-item">
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
