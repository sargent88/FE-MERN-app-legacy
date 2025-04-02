import React from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "../../shared/hooks/formHook";
import { useHttpClient } from "../../shared/hooks/httpHook";
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

function Signup() {
  const navigate = useNavigate();
  const { isLoading, error, sendRequest, errorHandler } = useHttpClient();
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

    try {
      await sendRequest(
        `${V1_USERS_ENDPOINT}/signup`,
        "POST",
        JSON.stringify({
          name: formState.inputs.name.value,
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
        {
          "Content-Type": "application/json",
        }
      );

      navigateToLoginPage();
    } catch (err) {
      console.error("SIGNUP ERROR", err);
    }
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
