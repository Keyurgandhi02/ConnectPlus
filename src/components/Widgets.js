import React from "react";
import "./Widgets.css";
import WidgetsRow from "./WidgetsRow";
import {
  Chat,
  EmojiFlags,
  LocalHospital,
  People,
  Storefront,
  VideoLibrary,
} from "@material-ui/icons";

function Widgets() {
  return (
    <div className="widgets">
      <WidgetsRow
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCQilSxjdWB63OxZY2FXf5hQE63FWk1yiL3w&usqp=CAU"
        title="Keyur Gandhi"
      />
      <WidgetsRow title="Covid 19 Center" Icon={LocalHospital} />
      <WidgetsRow title="Pages" Icon={EmojiFlags} />
      <WidgetsRow title="Friends" Icon={People} />
      <WidgetsRow title="Messenger" Icon={Chat} />
      <WidgetsRow title="MarketPlace" Icon={Storefront} />
      <WidgetsRow title="Videos" Icon={VideoLibrary} />
      <WidgetsRow title="MarketPlace" Icon={Storefront} />
    </div>
  );
}

export default Widgets;
