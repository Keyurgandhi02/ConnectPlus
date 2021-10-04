import "./App.css";
import Auth from "./Auth/Auth";
import Card from "../src/UI/Card";
import ScrollTop from "../src/UI/ScrollTop";
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
import SidebarAllPages from "./components/OtherPages/SidebarAllPages";
import SidebarAllPages1 from "./components/activity/SidebarAllPages";
import Home from "./components/Chat/Home";
import Contact from "./components/OtherPages/Contact";
import Friend from "./components/Friend";
import Hub from "./components/christhub/Hub";
// import Poll from "./components/Poll";
import Notfoundpage from "./components/OtherPages/Notfoundpage";
import Review from "./components/OtherPages/Review";
import Activity from "./components/activity/Activity";
import Allreview from "./components/activity/Allreview";
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

                  <Card />
                  {/* <Poll /> */}
                  <ScrollTop />
                </div>
              </>
            </div>
          </PrivateRoute>

          <PrivateRoute path="/userProfile" exact>
            <div className="app" id="app">
              <>
                <Header />

                <div className="app_body">
                  <Sidebar />
                  <UserProfile />
                </div>
              </>
            </div>
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
                  <SidebarAllPages1 />

                  <UserPosts />
                </div>
              </>
            </div>
          </PrivateRoute>

          <PrivateRoute path="/activity" exact>
            <div className="app" id="app">
              <>
                <Header />

                <div className="app_body">
                  <SidebarAllPages1 />

                  <UserPosts />
                </div>
              </>
            </div>
          </PrivateRoute>

          <PrivateRoute path="/allcontact" exact>
            <div className="app" id="app">
              <>
                <Header />

                <div className="app_body">
                  <SidebarAllPages1 />

                  <Activity />
                </div>
              </>
            </div>
          </PrivateRoute>

          <PrivateRoute path="/allreview" exact>
            <div className="app" id="app">
              <>
                <Header />

                <div className="app_body">
                  <SidebarAllPages1 />

                  <Allreview />
                </div>
              </>
            </div>
          </PrivateRoute>

          <PrivateRoute path="/notification" exact>
            <div className="app" id="app">
              <>
                <Header />

                <div className="app_body">
                  <Sidebar />

                  <Notification />
                </div>
              </>
            </div>
          </PrivateRoute>
          <PrivateRoute path="/allpages" exact>
            <div className="app" id="app">
              <>
                <Header />

                <div className="app_body">
                  <SidebarAllPages />

                  <Contact />
                </div>
              </>
            </div>
          </PrivateRoute>

          <PrivateRoute path="/review" exact>
            <div className="app" id="app">
              <>
                <Header />

                <div className="app_body">
                  <SidebarAllPages />

                  <Review />
                </div>
              </>
            </div>
          </PrivateRoute>
          <Route path="/forgot" exact>
            <ForgotPassword />
          </Route>
          <PrivateRoute path="/announcement" exact>
            <div className="app" id="app">
              <>
                <Header />

                <div className="app_body">
                  <Sidebar />
                  <AnnounceMent />
                </div>
              </>
            </div>
          </PrivateRoute>

          <PrivateRoute path="/friends" exact>
            <div className="app" id="app">
              <>
                <Header />
                <div className="app_body">
                  <Sidebar />

                  <Friend />
                </div>
              </>
            </div>
          </PrivateRoute>

          <PrivateRoute path="/christhub" exact>
            <div className="app" id="app">
              <>
                <Header />
                <div className="app_body">
                  <Sidebar />

                  <Hub />
                </div>
              </>
            </div>
          </PrivateRoute>
          <PrivateRoute path="/logout" exact>
            <Logout />
          </PrivateRoute>
          <Route path="*">
            <Notfoundpage />
          </Route>
        </Switch>
      </AuthProvider>
    </>
  );
}

export default App;
