import "../Sidebar.css";
import SidebarRow from "../SidebarRow";
import ContactsIcon from "@material-ui/icons/Contacts";
import RateReviewIcon from "@material-ui/icons/RateReview";
import HomeIcon from "@material-ui/icons/Home";
import HistoryIcon from "@material-ui/icons/History";
import { Link } from "react-router-dom";
const SidebarAllPages = () => {
  return (
    <div className="sidebar">
      <Link to="/allposts">
        <SidebarRow title="Your Posts" Icon={HistoryIcon} />
      </Link>
      <Link to="/allcontact">
        <SidebarRow title="Your contact queries" Icon={ContactsIcon} />
      </Link>
      <Link to="/allreview">
        <SidebarRow title="Your reviews" Icon={RateReviewIcon} />
      </Link>

      <Link to="/home" className="floatButton">
        <HomeIcon className="my-float" fontSize="large" />
      </Link>
    </div>
  );
};

export default SidebarAllPages;
