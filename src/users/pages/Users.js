import React from "react";

import UserList from "../components/UserList";
import { USERS } from "../../shared/utils/constants";

function Users() {
  return <UserList items={USERS} />;
}

export default Users;
