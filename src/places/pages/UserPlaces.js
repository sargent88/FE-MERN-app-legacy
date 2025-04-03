import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ErrorModal, LoadingSpinner } from "../../shared/components/UIElements";
import { useHttpClient } from "../../shared/hooks/httpHook";
import { V1_PLACES_ENDPOINT } from "../../shared/utils/constants";

import PlaceList from "../components/PlaceList";

function UserPlaces() {
  const { isLoading, error, sendRequest, errorHandler } = useHttpClient();
  const [loadedPlacesForUser, setLoadedPlacesForUser] = useState();
  const userId = useParams().uid;

  useEffect(() => {
    const getPlacesForUser = async () => {
      try {
        const responseData = await sendRequest(
          `${V1_PLACES_ENDPOINT}/user/${userId}`
        );

        setLoadedPlacesForUser(responseData.places);
      } catch (err) {
        console.error("GET USER PLACES ERROR: ", err);
      }
    };

    getPlacesForUser();
  }, [sendRequest, userId]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlacesForUser && (
        <PlaceList items={loadedPlacesForUser} />
      )}
    </React.Fragment>
  );
}

export default UserPlaces;
