import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "../../shared/hooks/formHook";
import { Button, Input } from "../../shared/components/FormElements";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";
import {
  Card,
  ErrorModal,
  LoadingSpinner,
} from "../../shared/components/UIElements";
import { AuthenticationContext } from "../../shared/context/authContext";
import { V1_USERS_ENDPOINT } from "../../shared/utils/constants";
import "./Authentication.css";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const authenticationContext = useContext(AuthenticationContext);
  const navigate = useNavigate();
  const [formState, inputHandler] = useForm(
    {
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

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${backendUrl}${V1_USERS_ENDPOINT}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formState.inputs.email.value,
          password: formState.inputs.password.value,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error);
      }
      setIsLoading(false);
      authenticationContext.login();
    } catch (err) {
      setIsLoading(false);
      setError(err.message);
    }
  };

  const navigateToSignupPage = () => {
    navigate("/signup");
  };

  const errorHandler = () => {
    setError(null);
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={errorHandler} />

      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Log In</h2>
        <hr />
        <form onSubmit={loginSubmitHandler}>
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
            LOG IN
          </Button>
        </form>
        <Button inverse onClick={navigateToSignupPage}>
          SIGN UP
        </Button>
      </Card>
    </React.Fragment>
  );
}

export default Login;
