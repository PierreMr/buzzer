import React from "react";

const Users = ({ users }) => {
  return (
    <div className="row mb-3">
      <div className="col-12 mb-3">
        <ul className="list-group col-6 m-auto">
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

      <ul className="list-group col-6 m-auto">
        {users
          .filter((user) => user.data().team)
          .filter((user) => user.data().team.name === "Mayo")
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
      <ul className="list-group col-6 m-auto">
        {users
          .filter((user) => user.data().team)
          .filter((user) => user.data().team.name === "Ketchup")
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
  );
};

export default Users;
