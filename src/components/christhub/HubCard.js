import React from "react";
import "./HubCard.css";
function HubCard({ name, email, rank, desc, count }) {
  return (
    <tr>
      <td>{count}</td>
      <td>{name}</td>
      <td>{email}</td>
      <td>{rank}</td>
      <td>
        <button className="viewBtn">View</button>
      </td>
    </tr>
  );
}

export default HubCard;
