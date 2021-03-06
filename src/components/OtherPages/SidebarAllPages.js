import "../Sidebar.css";
import SidebarRow from "../SidebarRow";
import ContactsIcon from "@material-ui/icons/Contacts";
import RateReviewIcon from "@material-ui/icons/RateReview";
import HomeIcon from "@material-ui/icons/Home";
import { Link } from "react-router-dom";
import "./SidebarAllPages.css";
const SidebarAllPages = () => {
  return (
    <div className="sidebar">
      <Link to="/allpages">
        <SidebarRow title="Contact Us" Icon={ContactsIcon} />
      </Link>
      <Link to="/review">
        <SidebarRow title="Review" Icon={RateReviewIcon} />
      </Link>
      <Link to="/home" className="floatButton">
        <HomeIcon className="my-float" fontSize="large" />
      </Link>
    </div>
  );
};

export default SidebarAllPages;
