import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { useForm } from "../../shared/hooks/formHook";
import { Button, Input } from "../../shared/components/FormElements";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";
import { Card } from "../../shared/components/UIElements";
import { AuthenticationContext } from "../../shared/context/authContext";
import "./Authentication.css";

function Login() {
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

  const loginSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState.inputs); // TODO: handle authentication with server
    authenticationContext.login();
  };

  const navigateToSignupPage = () => {
    navigate("/signup");
  };

  return (
    <Card className="authentication">
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
  );
}

export default Login;
