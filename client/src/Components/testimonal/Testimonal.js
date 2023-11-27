import React from "react";
import "./style.css";

const Testimonal = () => {
  const testimonal = [
    {
      id: 1,
      name: "ST1",
      post: "...",
      desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
      cover: "./images/testo/t1.webp",
    },
    {
      id: 2,
      name: "ST2",
      post: "...",
      desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
      cover: "./images/testo/t2.webp",
    },
    {
      id: 3,
      name: "ST3",
      post: "...",
      desc: "Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.",
      cover: "./images/testo/t3.webp",
    },
  ];
  return (
    <>
      <section className="testimonal padding">
        <div className="container">
          <div id="heading">
            <h3>TESTIMONIAL </h3>
            <h1>Our Successful Students </h1>
          </div>

          <div className="content grid2">
            {testimonal.map((val) => (
              <div className="items shadow">
                <div className="box flex">
                  <div className="img">
                    <img src={val.cover} alt="" />
                  </div>
                  <div className="name">
                    <h2>{val.name}</h2>
                    <span>{val.post}</span>
                  </div>
                </div>
                <p>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonal;
