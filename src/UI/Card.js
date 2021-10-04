import React, { useState, useEffect } from "react";
import "./Card.css";
const Card = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then((res) => res.json())
      .then((data) => {
        let randomQuotes = Math.floor(Math.random() * data.length);
        setCards(data[randomQuotes]);
      });
  }, []);
  return (
    <div className="card">
      <h3
        style={{ textAlign: "center", fontFamily: "Snell Roundhand, cursive" }}
      >
        Today's Quote
      </h3>
      <div className="containerCard">
        <div className="blockquote-wrapper">
          <div className="blockquote">
            <h1>{cards.text}</h1>
            <h4 style={{ fontFamily: "Snell Roundhand, cursive" }}>
              {cards.author}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
