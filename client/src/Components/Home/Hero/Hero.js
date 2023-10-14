import React from "react";
import "./Hero.css";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <section className="hero">
        <div className="container">
          <div>
            <div id="heading">
              <h3>WELCOME TO YOUR SCHOOL BANNER </h3>
              <h1>Always Supporting You. </h1>
            </div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
              atque quas nulla voluptat
            </p>
            <div className="button">
              <Link to="/StudentLogin">
                <button className="primary-btn">STUDENT LOGIN</button>
              </Link>
              <Link to="/TeacherLogin">
                <button>TEACHER LOGIN</button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div className="margin"></div>
    </>
  );
};

export default Hero;
