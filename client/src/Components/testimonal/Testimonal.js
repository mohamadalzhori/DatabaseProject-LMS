import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrophy } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

const Testimonal = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    // Fetch data from the server
    axios
      .get("http://localhost:8080/successStory/")
      .then((response) => {
        // Update state with fetched data
        setTestimonials(response.data);
      })
      .catch((error) => {
        console.error("Error fetching testimonials:", error);
      });
  }, []);

  const subjectNames = {
    1: "Arabic",
    2: "English",
    3: "Math",
    4: "Sciences",
    5: "Culture",
  };
  return (
    <>
      <section className="testimonal padding">
        <div className="container">
          <div id="heading">
            <h3>STORIES </h3>
            <h1>Our Stellar Students </h1>
          </div>

          <div className="content grid2">
            {testimonials
              .slice()
              .sort((a, b) => {
                const monthsOrder = {
                  January: 0,
                  February: 1,
                  March: 2,
                  April: 3,
                  May: 4,
                  June: 5,
                  July: 6,
                  August: 7,
                  September: 8,
                  October: 9,
                  November: 10,
                  December: 11,
                };

                return monthsOrder[a.month] - monthsOrder[b.month];
              })
              .map((val) => (
                <div className="items shadow " key={val.id}>
                  <div className="box flex">
                    <div className="name">
                      <h2>
                        {val.name} | {subjectNames[val.subject_id]}{" "}
                        <FontAwesomeIcon
                          icon={faTrophy}
                          className="trophy-icon"
                          style={{ color: "red" }}
                        />
                      </h2>
                      <span>
                        <b>Grade {val.grade}</b>
                      </span>
                      <br />
                      <span>{val.month}</span>
                    </div>
                  </div>
                  <p>{val.description}</p>
                </div>
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonal;
