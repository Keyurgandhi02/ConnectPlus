import { useHistory } from "react-router";
import { useAuth } from "../Store/AuthContext";

const Logout = () => {
  const { logout } = useAuth();
  const history = useHistory();
  async function logoutHandler() {
    try {
      await logout();
      history.replace("/auth");
    } catch {
      const alertLogout = alert("Something Went Wrong!!");
      if (alertLogout === true) {
        history.replace("/home");
      }
    }
  }
  logoutHandler();
  return <></>;
};

export default Logout;
