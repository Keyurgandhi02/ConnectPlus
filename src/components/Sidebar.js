import {
  EmojiFlags,
  People,
  DeviceHub,
  KeyboardArrowDown,
} from "@material-ui/icons";
import HomeIcon from "@material-ui/icons/Home";
import AccessTime from "@material-ui/icons/AccessTime";
import LiveTv from "@material-ui/icons/LiveTv";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import React, { useState, useEffect } from "react";
import SidebarRow from "./SidebarRow";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 500) {
      setIsOpen(true);
    }
  }, []);
  return (
    <div className="sidebar">
      <div onClick={() => setIsOpen(!isOpen)} className="MenuIconContainer">
        <KeyboardArrowDown fontSize="medium" style={{ color: "#1768ac" }} />
      </div>

      {!isOpen && (
        <>
          <NavLink to="/home" activeClassName="sidebarRow_active">
            <SidebarRow title="Home" Icon={HomeIcon} />
          </NavLink>

          <NavLink to="/friends" activeClassName="sidebarRow_active">
            <SidebarRow title="Friends" Icon={People} />
          </NavLink>

          <NavLink to="/christhub" activeClassName="sidebarRow_active">
            <SidebarRow title="Christ Hub" Icon={DeviceHub} />
          </NavLink>

          <NavLink to="/livetv" activeClassName="sidebarRow_active">
            <SidebarRow title="Connect Streams" Icon={LiveTv} />
          </NavLink>

          <NavLink to="/activity" activeClassName="sidebarRow_active">
            <SidebarRow title="Your Activity" Icon={AccessTime} />
          </NavLink>

          <NavLink to="/allpages" activeClassName="sidebarRow_active">
            <SidebarRow title="Pages" Icon={EmojiFlags} />
          </NavLink>

          <NavLink to="/Logout" activeClassName="sidebarRow_active">
            <SidebarRow title="Logout" Icon={ExitToAppIcon} />
          </NavLink>
        </>
      )}
    </div>
  );
};

export default Sidebar;
