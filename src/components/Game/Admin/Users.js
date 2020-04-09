import React from "react";

const Users = ({ users }) => {
  return (
    <div>
      <ul>
        {users.map((user) => {
          return (
            <li key={user.id}>
              {user.data().name}
              {user.data().team ? " / " + user.data().team.name : ""}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
