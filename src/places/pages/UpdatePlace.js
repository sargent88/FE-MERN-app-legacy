import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Input, Button } from "../../shared/components/FormElements";
import {
  Card,
  ErrorModal,
  LoadingSpinner,
} from "../../shared/components/UIElements";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useHttpClient } from "../../shared/hooks/httpHook";
import { V1_PLACES_ENDPOINT } from "../../shared/utils/constants";
import { useForm } from "../../shared/hooks/formHook";
import "./PlaceForm.css";

function UpdatePlace() {
  const { isLoading, error, sendRequest, errorHandler } = useHttpClient();
  const [loadedPlace, setLoadedPlace] = useState();
  const placeId = useParams().pid;
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  useEffect(() => {
    const getPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${V1_PLACES_ENDPOINT}/${placeId}`
        );

        setLoadedPlace(responseData.place);

        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (err) {
        console.error("GET PLACE ERROR: ", err);
      }
    };

    getPlace();
  }, [sendRequest, placeId, setFormData]);

  const updatePlaceSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(
        `${V1_PLACES_ENDPOINT}/${placeId}`,
        "PATCH",
        JSON.stringify({
          title: formState.inputs.title.value,
          description: formState.inputs.description.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );
    } catch (err) {
      console.error("UPDATE PLACE ERROR: ", err);
    }
  };

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner />
      </div>
    );
  }

  if (!loadedPlace && !error) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <form className="place-form" onSubmit={updatePlaceSubmitHandler}>
        <h2>Update Place</h2>
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title."
          onInput={inputHandler}
          value={formState.inputs.title.value}
          isValid={formState.inputs.title.isValid}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description."
          onInput={inputHandler}
          value={formState.inputs.description.value}
          isValid={formState.inputs.description.isValid}
        />
        <Button type="submit" disabled={!formState.isValid}>
          UPDATE PLACE
        </Button>
      </form>
    </React.Fragment>
  );
}

export default UpdatePlace;
