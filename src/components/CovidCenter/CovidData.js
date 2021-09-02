import "./CovidData.css";
import covidbg from "../../assets/images/covidbg1.jpg";
import ahmedabad from "../../assets/images/ahmedabad.png";
import delhi from "../../assets/images/delhi.png";
import HomeIcon from "@material-ui/icons/Home";
import mumbai from "../../assets/images/mumbai.png";
import { useEffect, useState } from "react";
import { Fab } from "@material-ui/core";
const CovidData = () => {
  // const [covidData, setCovidData] = useState([]);
  // const getCovidData = async () => {
  //   const res = await fetch("https://health-api.com/api/v1/covid-19/all");
  //   if (!res.ok) {
  //     throw new Error("Something went wrong!!");
  //   }
  //   const data = await res.json();
  //   console.log(data);
  // };

  // useEffect(() => {
  //   getCovidData();
  // }, []);
  return (
    <>
      <div className="bgcovid">
        <img src={covidbg} alt="Snow" className="covidimg" />

        <a href="abc.html" className="acovid">
          <span>Vaccination Program</span>
        </a>
      </div>

      {/* <center>
        <h1 style={{ color: "black", alignItems: "center", margin: "10px" }}>
          Covid19 Cases Updates
        </h1>
      </center>
      <div className="covid-wrapper">
        {covidData.map((id, current) => {
          return (
            <CovidCard name={current.state} imgcity={current.state} key={id} />
          );
        })}
      </div> */}
    </>
  );
};

export default CovidData;
