import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div className="row">
            <div id="heading">
              <h3>WELCOME TO Eduscope </h3>
              <h1>Best Online Education Platform. </h1>
            </div>
            <p>
              Start, switch, or advance your career with more than 5,000
              courses, Professional Certificates, and degrees from world-class
              universities and companies.
            </p>
            <div className="button">
              <button className="primary-btn">
                GET STARTED NOW <i className="fa fa-long-arrow-alt-right"></i>
              </button>
              <button>
                VIEW COURSE <i className="fa fa-long-arrow-alt-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className="margin"></div>
    </>
  );
};

export default Hero;
