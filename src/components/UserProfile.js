import { useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { useAuth } from "../Store/AuthContext";
import Loader from "../UI/Loader";
import visibility from "../../src/assets/images/visibility.svg";
import "./UserProfile.css";
const UserProfile = () => {
  const history = useHistory();
  const { currentUser, updateEmail, updatePassword } = useAuth();
  const passwordRef = useRef();
  const [isRendered, setIsRendered] = useState(false);
  const [error, setError] = useState("");
  const [show, setShow] = useState(false);
  const [Loading, setIsLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRendered(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const showpasswordHandler = () => {
    setShow(!show);
  };

  function updatePasswordHandler(e) {
    e.preventDefault();
    setIsLoading(true);
    const promises = [];
    if (currentUser.email !== null) {
      promises.push(updateEmail(currentUser.email));
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Failed to Update account");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return !isRendered ? (
    <Loader />
  ) : (
    <div className="main_Container">
      <p className="user_profile" align="center">
        Your Profile
      </p>
      <p className="user_profile_p">Note : You can change the password only </p>

      <form className="User_Form" onSubmit={updatePasswordHandler}>
        <input
          id="email"
          value={currentUser.email}
          className="user_Email "
          disabled
          type="text"
          align="center"
          placeholder="Email"
        />

        <input
          id="password"
          ref={passwordRef}
          className="user_Password"
          type={show ? "string " : "password"}
          align="center"
          placeholder="Password"
        />
        <img
          src={visibility}
          alt=""
          className="showPass"
          style={{ marginLeft: "10px", cursor: "pointer" }}
          onClick={showpasswordHandler}
        />

        <button
          className="submit_UserProfile"
          align="center"
          type="submit"
          onSubmit={updatePasswordHandler}
        >
          Edit Profile
        </button>
      </form>
      {Loading && <Loader />}
      <h4 style={{ marginLeft: "14em", marginTop: "2em", color: "#cc3300" }}>
        {error}
      </h4>
    </div>
  );
};
export default UserProfile;
