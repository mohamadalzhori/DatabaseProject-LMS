import React, { useState } from "react";
import arabic from "../img/arabic.jpg";
import english from "../img/english.png";
import math from "../img/math.jpg";
import sciences from "../img/sciences.jpg";
import islamic from "../img/islamic.jpg";

const Cards = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const handleCardClick = (title) => {
    setSelectedCard(title);
  };

  const cards = [
    {
      src: arabic,
      title: "Arabic",
      text: "test1",
    },
    {
      src: english,
      title: "English",
      text: "test1",
    },
    {
      src: math,
      title: "Math",
      text: "test1",
    },
    {
      src: sciences,
      title: "Sciences",
      text: "test1",
    },
    {
      src: islamic,
      title: "Islamic Culture",
      text: "test1",
    },
  ];

  return (
    <>
      {/* Required meta tags */}
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {/* Bootstrap CSS */}
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossOrigin="anonymous"
      />

      <div className="container">
        <div className="row g-3">
          {cards.map((card, i) => (
            <div className="col-12 col-md-6 col-lg-4" key={i}>
              <a
                href="#"
                className="card"
                onClick={() => handleCardClick(card.title)}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  src={card.src}
                  className="card-img-top"
                  alt={card.title}
                  style={{
                    width: "200px",
                    height: "150px",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text">{card.text}</p>
                </div>
              </a>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Cards;
