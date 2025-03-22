import React from "react";

import UserList from "../components/UserList";

function Users() {
  const USERS = [
    {
      id: "u1",
      name: "Max Schwarz",
      image: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
      places: 3,
    },
  ];

  return <UserList items={USERS} />;
}

export default Users;
