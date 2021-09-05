import React, { useState } from "react";
import useEmailInput from "../hooks/useEmail-input";
import usePasswordInput from "../hooks/usePassword-input";
import "./Auth.css";
import Loader from "../UI/Loader";
import { useAuth } from "../Store/AuthContext";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import db from "./Firbase";
import ErrorModal from "../UI/ErrorModal";
const regEx = (value) => value.includes(".christuniversity.in");
const private_key = process.env.REACT_APP_CHATENGINE_KEY;

const isNotEmpty = (value) => value.trim() !== "";
function Auth() {
  const history = useHistory();
  const { signup, login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isModal, setIsModal] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };
  const commentShowHandler = () => {
    setIsModal(true);
  };
  const commentHideHandler = () => {
    setIsModal(false);
  };
  const {
    value: enteredEmail,
    hasError: EmailInvalid,
    resetEmail: updateEmail,
    emailChangeHandler,
    emailBlurHandler,
    isValid: emailIsValid,
  } = useEmailInput(regEx);
  const {
    value: enteredPassword,
    hasError: passwordInvalid,
    resetPassword: updatePassword,
    passwordChangeHandler,
    passwordBlurHandler,
    isValid: passwordIsValid,
  } = usePasswordInput(isNotEmpty);
  let formIsValid = false;
  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    if (!emailIsValid && !passwordIsValid) {
      commentShowHandler();
    }
    if (isLogin) {
      try {
        setIsLoading(true);
        await login(enteredEmail, enteredPassword);
        db.collection("userRegister").add({
          email: enteredEmail,
        });
        const authObject = {
          "Project-ID": process.env.REACT_APP_CHATENGINE_ID,
          "User-Name": enteredEmail,
          "User-Secret": enteredPassword,
        };
        await axios.get("https://api.chatengine.io/chats", {
          headers: authObject,
        });
        localStorage.setItem("password", enteredPassword);
        history.replace("/home");
      } catch {
        commentShowHandler();
      }
    } else {
      try {
        setIsLoading(true);
        await signup(enteredEmail, enteredPassword);

        const data = {
          username: enteredEmail,
          first_name: enteredEmail,
          secret: enteredPassword,
        };
        const response = {
          method: "POST",
          url: "https://api.chatengine.io/users/",
          headers: {
            "PRIVATE-KEY": private_key,
          },
          data: data,
        };
        axios(response).then(function (response) {
          JSON.stringify(response.data);
        });

        localStorage.setItem("password", enteredPassword);
      } catch {
        commentShowHandler();
      }
    }

    setIsLoading(false);
    updateEmail();
    updatePassword();
  };

  return (
    <div className="main-container">
      <p className="sign" align="center">
        {isLogin ? "Sign in" : "Sign up"}
      </p>
      {isModal && (
        <ErrorModal errorName="Failed To Login!">
          <h3 style={{ color: "gray" }}>Oops Something Went Wrong!</h3>
          <lottie-player
            src="https://assets3.lottiefiles.com/packages/lf20_C7fkiN.json"
            background="transparent"
            speed="1"
            style={{ width: "300px", height: "300px" }}
            loop
            autoplay
          ></lottie-player>
          <center>
            <button
              style={{
                backgroundColor: "#5d55ff",
                width: "180px",
                height: "30px",
                border: "none",
                cursor: "pointer",
                margin: "20px",
                color: "white",
                borderRadius: "50px",
              }}
              onClick={commentHideHandler}
            >
              Ok
            </button>
          </center>
        </ErrorModal>
      )}
      <p className="note">Note : Use Only Christ University Email Address</p>
      <form className="form1" onSubmit={submitHandler}>
        <input
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
          className="un "
          type="text"
          align="center"
          placeholder="Email"
        />
        {EmailInvalid && (
          <p className="error-text1">Enter Valid Email Address</p>
        )}
        <input
          id="password"
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          value={enteredPassword}
          className="pass"
          type="password"
          align="center"
          placeholder="Password"
        />
        {passwordInvalid && <p className="error-text2">Enter Valid Password</p>}

        <button
          className="submit"
          align="center"
          type="submit"
          disabled={!formIsValid}
        >
          {isLogin ? "Sign in" : "Sign up"}
        </button>
        <button
          type="button"
          className="google"
          align="center"
          onClick={switchAuthModeHandler}
        >
          {isLogin ? "Create new account" : "Login with existing account"}
        </button>
        <p className="note" align="center">
          <Link to="/forgot">Forgot Password?</Link>
        </p>
      </form>
      {isLoading && <Loader />}
    </div>
  );
}

export default Auth;
