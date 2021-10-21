import React from "react";
import "./Hub.css";
import "./MostFilter.css";
function MostFilter({ name, clickHandler }) {
  return (
    <div className="btnDiv">
      <button className="btnFilter" onClick={clickHandler} value={name}>
        {name}
      </button>
    </div>
  );
}

export default MostFilter;
