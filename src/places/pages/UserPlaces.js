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

  const deletePlaceHandler = (deletedPlaceId) => {
    setLoadedPlacesForUser((prevPlaces) =>
      prevPlaces.filter((place) => place.id !== deletedPlaceId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
      {!isLoading && loadedPlacesForUser && (
        <PlaceList
          items={loadedPlacesForUser}
          onDeletePlace={deletePlaceHandler}
        />
      )}
    </React.Fragment>
  );
}

export default UserPlaces;
