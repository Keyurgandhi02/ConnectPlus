import { useRef, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../Store/AuthContext";
import Loader from "../UI/Loader";
import "./Auth.css";
const ForgotPassword = () => {
  const history = useHistory();
  const { resetPassword } = useAuth();
  const emailRef = useRef();
  const [error, setError] = useState("");
  const [Loading, setLoading] = useState(false);

  async function submitHandler(e) {
    e.preventDefault();

    try {
      setLoading(true);
      await resetPassword(emailRef.current.value);
      alert("Check Your Inbox for Further Instructions");
      history.replace("/auth");
    } catch {
      setError("Something Wents wrong!!");
    }
  }
  const cancelHandler = () => {
    history.replace("/auth");
  };
  return (
    <div className="main-container" style={{ height: "350px" }}>
      <p className="sign" align="center">
        Forgot Password
      </p>

      <p
        style={{
          textAlign: "center",
          marginTop: "40px",
          color: "gray",
          fontSize: "12px",
        }}
      >
        Note : Use Only Christ University Email Address
      </p>
      <form className="form1" onSubmit={submitHandler}>
        <input
          id="email"
          ref={emailRef}
          className="un "
          type="text"
          align="center"
          required
          placeholder="Email"
        />
        {error && <p className="error-text1">Enter Valid Email Address</p>}
        <button
          className="submit"
          align="center"
          type="submit"
          disabled={error}
        >
          Submit
        </button>
        <button
          className="google"
          align="center"
          type="button"
          onClick={cancelHandler}
        >
          Cancel
        </button>
      </form>
      {Loading && <Loader />}
    </div>
  );
};
export default ForgotPassword;
