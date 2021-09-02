import { useState } from "react";

function useEmailInput(EmailValue) {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);

  const emailIsValid = EmailValue(enteredEmail);
  const hasError = !emailIsValid && emailTouched;

  const emailChangeHandler = (e) => {
    setEnteredEmail(e.target.value);
  };
  const emailBlurHandler = (e) => {
    setEmailTouched(true);
  };

  const resetEmail = () => {
    setEnteredEmail("");
    setEmailTouched(false);
  };

  return {
    value: enteredEmail,
    hasError,
    emailChangeHandler,
    emailBlurHandler,
    resetEmail,
    isValid: emailIsValid,
  };
}

export default useEmailInput;
