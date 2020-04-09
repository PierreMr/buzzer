import React from "react";

const Users = ({ users }) => (
  <ul>
    {users.map((user) => {
      return <li key={user.id}>{user.data().name}</li>;
    })}
  </ul>
);

export default Users;
