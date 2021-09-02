import "./App.css";
import Auth from "./Auth/Auth";
import Feed from "./components/Feed";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import { Redirect, Route, Switch } from "react-router";
import { AuthProvider } from "./Store/AuthContext";
import UserProfile from "./components/UserProfile";
import Logout from "./Auth/Logout";
import PrivateRoute from "./PrivateRoute";
import ForgotPassword from "./Auth/ForgotPassword";
import AnnounceMent from "./components/AnnounceMent";
import UserPosts from "./components/UserPosts";
import Notification from "./components/Notification";
import CovidData from "./components/CovidCenter/CovidData";
import SidebarAllPages from "./components/OtherPages/SidebarAllPages";
import Home from "./components/Chat/Home";
import Contact from "./components/OtherPages/Contact";
function App() {
  return (
    <>
      <AuthProvider>
        <Switch>
          <Route path="/auth" component={Auth} />
          <Route path="/" exact>
            <Redirect to="/home" />
          </Route>

          <PrivateRoute path="/home">
            <div className="app" id="app">
              <>
                <Header />

                <div className="app_body">
                  <Sidebar />

                  <Feed />
                </div>
              </>
            </div>
          </PrivateRoute>

          <PrivateRoute path="/userProfile" exact>
            <>
              <Header />

              <div className="app_body">
                <Sidebar />
                <UserProfile />
              </div>
            </>
          </PrivateRoute>

          <PrivateRoute path="/chat" exact>
            <>
              <Header />

              <Home />
            </>
          </PrivateRoute>

          <PrivateRoute path="/allposts" exact>
            <div className="app" id="app">
              <>
                <Header />

                <div className="app_body">
                  <Sidebar />

                  <UserPosts />
                </div>
              </>
            </div>
          </PrivateRoute>

          <PrivateRoute path="/notification" exact>
            <>
              <Header />

              <div className="app_body">
                <Sidebar />

                <Notification />
              </div>
            </>
          </PrivateRoute>
          <PrivateRoute path="/allpages" exact>
            <>
              <Header />

              <div className="app_body">
                <SidebarAllPages />

                <Contact />
              </div>
            </>
          </PrivateRoute>

          <PrivateRoute path="/review" exact>
            <>
              <Header />

              <div className="app_body">
                <SidebarAllPages />

                <Contact />
              </div>
            </>
          </PrivateRoute>
          <Route path="/forgot" exact>
            <ForgotPassword />
          </Route>
          <PrivateRoute path="/announcement" exact>
            <>
              <Header />

              <div className="app_body">
                <AnnounceMent />
              </div>
            </>
          </PrivateRoute>

          <PrivateRoute path="/covid19">
            <>
              <Header />

              <CovidData />
            </>
          </PrivateRoute>
          <PrivateRoute path="/logout" exact>
            <Logout />
          </PrivateRoute>
        </Switch>
      </AuthProvider>
    </>
  );
}

export default App;
