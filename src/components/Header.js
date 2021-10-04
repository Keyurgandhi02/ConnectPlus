import "./Header.css";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import { Avatar } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ForumIcon from "@material-ui/icons/Forum";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import { useAuth } from "../Store/AuthContext";
import { Link, NavLink, useHistory } from "react-router-dom";
import connectplus from "../assets/images/mainlogo.png";

const Header = () => {
  const { currentUser, avatarMaker } = useAuth();
  const name = avatarMaker(currentUser.email);
  const history = useHistory();
  return (
    <div className="header">
      <div className="header_left">
        <img
          src={connectplus}
          style={{ cursor: "pointer" }}
          alt="logo connect plus"
          onClick={() => history.push("/home")}
        />

        <div className="searchInputWrapper">
          <input
            className="searchInput"
            type="text"
            placeholder="Search Here"
          />
          <SearchIcon className="searchInputIcon" />
        </div>
      </div>
      <div className="header_center">
        <div className="header_option">
          <NavLink to="/home" activeClassName="header_option_active">
            <HomeIcon fontSize="large" style={{ color: "#1768ac" }} />
          </NavLink>
        </div>
        <div className="header_option">
          <NavLink to="/announcement" activeClassName="header_option_active">
            <AnnouncementIcon fontSize="large" style={{ color: "#1768ac" }} />
          </NavLink>
        </div>
        <div className="header_option">
          <NavLink to="/chat" activeClassName="header_option_active">
            <ForumIcon fontSize="large" style={{ color: "#1768ac" }} />
          </NavLink>
        </div>
        <div className="header_option">
          <NavLink to="/notification" activeClassName="header_option_active">
            <NotificationsActiveIcon
              fontSize="large"
              style={{ color: "#1768ac" }}
            />
          </NavLink>
        </div>
        <div className="header_option">
          <NavLink to="/userProfile" activeClassName="header_option_active">
            <AccountCircleIcon fontSize="large" style={{ color: "#1768ac" }} />
          </NavLink>
        </div>
      </div>
      <div className="header_right">
        <div className="header_info">
          <Link to="/userProfile">
            <Avatar style={{ backgroundColor: "lightskyblue" }}>{name}</Avatar>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
