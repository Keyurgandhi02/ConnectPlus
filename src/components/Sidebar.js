import { EmojiFlags, LocalHospital, People } from "@material-ui/icons";
import HomeIcon from "@material-ui/icons/Home";
import HistoryIcon from "@material-ui/icons/History";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";
import SidebarRow from "./SidebarRow";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/home" activeClassName="sidebarRow_active">
        <SidebarRow title="Home" Icon={HomeIcon} />
      </NavLink>
      <NavLink to="/covid19" activeClassName="sidebarRow_active">
        <SidebarRow title="Covid 19 Center" Icon={LocalHospital} />
      </NavLink>
      <NavLink to="/allpages" activeClassName="sidebarRow_active">
        <SidebarRow title="Pages" Icon={EmojiFlags} />
      </NavLink>
      <NavLink to="/friends" activeClassName="sidebarRow_active">
        <SidebarRow title="Friends" Icon={People} />
      </NavLink>

      <NavLink to="/allposts" activeClassName="sidebarRow_active">
        <SidebarRow title="Your Posts" Icon={HistoryIcon} />
      </NavLink>

      <NavLink to="/Logout" activeClassName="sidebarRow_active">
        <SidebarRow title="Logout" Icon={ExitToAppIcon} />
      </NavLink>
    </div>
  );
};

export default Sidebar;
