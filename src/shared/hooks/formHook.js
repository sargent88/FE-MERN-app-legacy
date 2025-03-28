import { useCallback, useReducer } from "react";

import { FORM_INPUT_CHANGE, FORM_SET_DATA } from "../utils/constants";

function formReducer(state, action) {
  switch (action.type) {
    case FORM_INPUT_CHANGE:
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case FORM_SET_DATA:
      return {
        inputs: action.inputs,
        isValid: action.isValid,
      };
    default:
      return state;
  }
}

export const useForm = (initialInputs, initialFormValidity) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({ type: FORM_INPUT_CHANGE, value, isValid, inputId: id });
  }, []);

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: FORM_SET_DATA,
      inputs: inputData,
      isValid: formValidity,
    });
  }, []);

  return [formState, inputHandler, setFormData];
};
