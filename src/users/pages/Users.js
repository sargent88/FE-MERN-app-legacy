import React, { useEffect, useState } from "react";

import UserList from "../components/UserList";
import { V1_USERS_ENDPOINT } from "../../shared/utils/constants";
import { ErrorModal, LoadingSpinner } from "../../shared/components/UIElements";
import { useHttpClient } from "../../shared/hooks/httpHook";

function Users() {
  const { isLoading, error, sendRequest, errorHandler } = useHttpClient();
  const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const getUsers = async () => {
      try {
        const responseData = await sendRequest(`${V1_USERS_ENDPOINT}`);

        setLoadedUsers(responseData.users);
      } catch (err) {
        console.error("GET USERS ERROR: ", err);
      }
    };

    getUsers();
  }, [sendRequest]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedUsers && <UserList items={loadedUsers} />}
    </React.Fragment>
  );
}

export default Users;
