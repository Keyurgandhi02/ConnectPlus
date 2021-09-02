import "../Sidebar.css";
import SidebarRow from "../SidebarRow";
import ContactsIcon from "@material-ui/icons/Contacts";
import RateReviewIcon from "@material-ui/icons/RateReview";

import { Link } from "react-router-dom";
const SidebarAllPages = () => {
  return (
    <div className="sidebar">
      <Link to="/allpages">
        <SidebarRow title="Contact Page" Icon={ContactsIcon} />
      </Link>
      <Link to="/review">
        <SidebarRow title="Review Page" Icon={RateReviewIcon} />
      </Link>
    </div>
  );
};

export default SidebarAllPages;
