import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "../../shared/hooks/formHook";
import { Button, Input } from "../../shared/components/FormElements";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import {
  Card,
  ErrorModal,
  LoadingSpinner,
} from "../../shared/components/UIElements";
import { V1_USERS_ENDPOINT } from "../../shared/utils/constants";
import "./Authentication.css";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Signup() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const navigate = useNavigate();
  const [formState, inputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const navigateToLoginPage = () => {
    navigate("/login");
  };

  const signupSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${backendUrl}${V1_USERS_ENDPOINT}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error);
      }
      setIsLoading(false);
      navigateToLoginPage();
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Sign Up</h2>
        <hr />
        <form onSubmit={signupSubmitHandler}>
          <Input
            id="name"
            element="input"
            type="text"
            label="Full Name"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Name is required."
            onInput={inputHandler}
          />
          <Input
            id="email"
            element="input"
            type="email"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email address."
            onInput={inputHandler}
          />
          <Input
            id="password"
            element="input"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(8)]}
            errorText="Please enter your password."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            SIGN UP
          </Button>
        </form>
        <Button inverse onClick={navigateToLoginPage}>
          LOG IN
        </Button>
      </Card>
    </React.Fragment>
  );
}

export default Signup;
