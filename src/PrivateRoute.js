import { Redirect, Route } from "react-router";
import { useAuth } from "./Store/AuthContext";

const PrivateRoute = ({ children, ...rest }) => {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={() => {
        return currentUser ? children : <Redirect to="/auth" />;
      }}
    ></Route>
  );
};

export default PrivateRoute;
