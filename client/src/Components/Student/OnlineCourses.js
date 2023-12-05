import React, { useEffect, useState } from "react";
import "./courses.css";
import Button from "react-bootstrap/Button";

const OnlineCourses = ({ setActiveSubject }) => {
  const [activeSubjectState, setActiveSubjectState] = useState("arabic");

  const subject = (subjectName) => {
    setActiveSubjectState(subjectName);
    setActiveSubject(subjectName);
  };

  const online = [
    {
      cover: "./images/courses/online/o1.png",
      hoverCover: "./images/courses/online/o1.1.png",
      courseName: "Arabic",
      course: "25 Courses",
      subject_id: "1",
    },
    {
      cover: "./images/courses/online/o2.png",
      hoverCover: "./images/courses/online/o2.1.png",
      courseName: "English",
      course: "25 Courses",
      subject_id: "2",
    },
    {
      cover: "./images/courses/online/o3.png",
      hoverCover: "./images/courses/online/o3.1.png",
      courseName: "Math",
      course: "10 Courses",
      subject_id: "3",
    },
    {
      cover: "./images/courses/online/o4.png",
      hoverCover: "./images/courses/online/o4.1.png",
      courseName: "Sciences",
      course: "15 Courses",
      subject_id: "4",
    },
    {
      cover: "./images/courses/online/o5.png",
      hoverCover: "./images/courses/online/o5.1.png",
      courseName: "Islamic Culture",
      course: "30 Courses",
      subject_id: "5",
    },
  ];
  return (
    <>
      <section className="online">
        <div className="container">
          <div id="heading">
            <h3>Hello, {sessionStorage.getItem("username")} </h3>
            <h1>Browse your courses </h1>
          </div>
          <div className="content grid3">
            {online.map((val) => (
              <div className="box" onClick={() => subject(val.subject_id)}>
                <div className="img">
                  <img src={val.cover} />
                  <img src={val.hoverCover} alt="" className="show" />
                </div>
                <h1>{val.courseName}</h1>
                <span>{val.course}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default OnlineCourses;