import { IconButton } from "@material-ui/core";
import { ExpandLess } from "@material-ui/icons";
import { useEffect, useState } from "react";
import "./Scrolling.css";
const Scrolling = (showBelow) => {
  const [show, setShow] = useState(showBelow ? false : true);
  const handleScroll = () => {
    if (window.pageYOffset > showBelow) {
      if (!show) setShow(true);
    } else {
      if (show) setShow(false);
    }
  };

  useEffect(() => {
    if (showBelow) {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  });
  const handleClick = () => {
    window[`scrollTo`]({ top: 0, behavior: "smooth" });
  };
  return (
    <div>
      <IconButton onClick={handleClick} className="toTop">
        <ExpandLess />
      </IconButton>
    </div>
  );
};
export default Scrolling;
