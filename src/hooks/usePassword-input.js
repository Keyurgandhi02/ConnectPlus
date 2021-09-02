import { useState } from "react";

function usePasswordInput(passwordValue) {
  const [enteredPassword, setEnteredPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);

  const passwordIsValid = passwordValue(enteredPassword);
  const hasError = !passwordIsValid && passwordTouched;
  const passwordChangeHandler = (e) => {
    setEnteredPassword(e.target.value);
  };
  const passwordBlurHandler = (e) => {
    setPasswordTouched(true);
  };

  const resetPassword = () => {
    setEnteredPassword("");
    setPasswordTouched(false);
  };

  return {
    value: enteredPassword,
    hasError,
    resetPassword,
    passwordChangeHandler,
    passwordBlurHandler,
    isValid: passwordIsValid,
  };
}

export default usePasswordInput;
