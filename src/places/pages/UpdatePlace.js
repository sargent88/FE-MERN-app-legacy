import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Input, Button } from "../../shared/components/FormElements";
import { Card } from "../../shared/components/UIElements";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { DUMMY_PLACES } from "../../shared/utils/constants";
import { useForm } from "../../shared/hooks/formHook";
import "./PlaceForm.css";

function UpdatePlace() {
  const [isLoading, setIsLoading] = useState(true);
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

  const identifiedPlace = DUMMY_PLACES.find((place) => place.id === placeId);

  useEffect(() => {
    if (identifiedPlace) {
      setFormData(
        {
          title: {
            value: identifiedPlace.title,
            isValid: true,
          },
          description: {
            value: identifiedPlace.description,
            isValid: true,
          },
        },
        true
      );
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const updatePlaceSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // TODO: connect to the BE
  };

  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
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
  );
}

export default UpdatePlace;
