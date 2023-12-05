import React from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Add this line to import Bootstrap CSS
import "./Cards.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardTeacher,
  faUserGraduate,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Cards() {
  return (
    <div className="container mt-4">
      <div className="row d-flex justify-content-center">
        <div className="col-md-6 col-xl-3">
          <Link
            to="/ManagerDash/Teachers"
            className="card bg-c-blue order-card"
          >
            <div className="card-block">
              <h6 className="m-b-20">Total Teachers</h6>
              <h2 className="d-flex justify-content-between align-items-center">
                <FontAwesomeIcon icon={faChalkboardTeacher} />
                <span className="ml-auto">1</span>
              </h2>
            </div>
          </Link>
        </div>
        <div className="col-md-6 col-xl-3">
          <Link
            to="/ManagerDash/Students"
            className="card bg-c-green order-card"
          >
            <div className="card-block">
              <h6 className="m-b-20">Total Students</h6>
              <h2 className="d-flex justify-content-between align-items-center">
                <FontAwesomeIcon icon={faUserGraduate} />
                <span className="ml-auto">1</span>
              </h2>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Cards;
