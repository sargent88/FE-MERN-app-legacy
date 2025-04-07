import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import {
  ImageUpload,
  Input,
  Button,
} from "../../shared/components/FormElements";
import { ErrorModal, LoadingSpinner } from "../../shared/components/UIElements";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/formHook";
import { useHttpClient } from "../../shared/hooks/httpHook";
import { V1_PLACES_ENDPOINT } from "../../shared/utils/constants";
import { AuthenticationContext } from "../../shared/context/authenticationContext";
import "./PlaceForm.css";

function NewPlace() {
  const navigate = useNavigate();
  const authenticationContext = useContext(AuthenticationContext);
  const { isLoading, error, sendRequest, errorHandler } = useHttpClient();
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      address: {
        value: "",
        isValid: false,
      },
      image: {
        value: null,
        isValid: false,
      },
    },
    false
  );

  const placeSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);
      formData.append("creator", authenticationContext.userId);

      await sendRequest(`${V1_PLACES_ENDPOINT}`, "POST", formData, {
        Authorization: `Bearer ${authenticationContext.token}`,
      });

      navigate("/");
    } catch (err) {
      console.error("NEW PLACE ERROR: ", err);
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />

      <form className="place-form" onSubmit={placeSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Add New Place</h2>
        <hr />
        <Input
          id="title"
          element="input"
          type="text"
          label="Title"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid title"
          onInput={inputHandler}
        />
        <Input
          id="description"
          element="textarea"
          label="Description"
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid description."
          onInput={inputHandler}
        />
        <Input
          id="address"
          element="input"
          label="Address"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
        />
        <ImageUpload
          id="image"
          center
          onInput={inputHandler}
          errorText="Please provide an image."
        />
        <Button type="submit" disabled={!formState.isValid}>
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
}

export default NewPlace;
