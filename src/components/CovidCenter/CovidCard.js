import "./CovidCard.css";
const CovidCard = ({ name, imgcity }) => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <img
            src={imgcity}
            alt="Avatar"
            style={{ width: "250px", height: "250px" }}
          />
        </div>
        <div className="flip-card-back">
          <h1>{name}</h1>
          <p>Architect & Engineer</p>
          <p>We love that guy</p>
        </div>
      </div>
    </div>
  );
};

export default CovidCard;
