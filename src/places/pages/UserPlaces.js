import React from "react";
import { useParams } from "react-router-dom";

import { DUMMY_PLACES } from "../../shared/utils/constants";
import PlaceList from "../components/PlaceList";

function UserPlaces() {
  const { uid } = useParams();

  return (
    <PlaceList items={DUMMY_PLACES.filter((place) => place.creator === uid)} />
  );
}

export default UserPlaces;
