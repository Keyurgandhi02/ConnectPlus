import "./Header.css";
import React from "react";
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import AnnouncementIcon from "@material-ui/icons/Announcement";
import { Avatar } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import ForumIcon from "@material-ui/icons/Forum";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";
import { useAuth } from "../Store/AuthContext";
import { Link, NavLink } from "react-router-dom";
import connectplus from "../assets/images/mainlogo.png";
const Header = () => {
  const { currentUser, avatarMaker } = useAuth();
  const name = avatarMaker(currentUser.email);
  return (
    <div className="header">
      <div className="header_left">
        <img src={connectplus} alt="logo connect plus" />

        <div className="header_input">
          <SearchIcon />
          <input type="text" placeholder="Search" />
        </div>
      </div>
      <div className="header_center">
        <div className="header_option">
          <NavLink to="/home" activeClassName="header_option_active">
            <HomeIcon fontSize="large" />
          </NavLink>
        </div>
        <div className="header_option">
          <NavLink to="/announcement" activeClassName="header_option_active">
            <AnnouncementIcon fontSize="large" />
          </NavLink>
        </div>
        <div className="header_option">
          <NavLink to="/chat" activeClassName="header_option_active">
            <ForumIcon fontSize="large" />
          </NavLink>
        </div>
        <div className="header_option">
          <NavLink to="/notification" activeClassName="header_option_active">
            <NotificationsActiveIcon fontSize="large" />
          </NavLink>
        </div>
        <div className="header_option">
          <NavLink to="/userProfile" activeClassName="header_option_active">
            <AccountCircleIcon fontSize="large" />
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
