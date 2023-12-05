import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import "./StudentDash.css";
import OnlineCourses from "./OnlineCourses";

function StudentDash() {
  const [selectedSubjectLessons, setselectedSubjectLessons] = useState("1"); // this tells which subject is active in order to fetch the corresponding lessons
  const [selectedSubjectHW, setselectedSubjectHW] = useState("1"); // this tells which subject is active in order to fetch the corresponding Homeworks
  const [selectedSubjectMarks, setselectedSubjectMarks] = useState("1"); // this tells which subject is active in order to fetch the corresponding Marks
  const [lessons, setLessons] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [HW, setHW] = useState([]);
  const [marks, setMarks] = useState([]);
  const [activeSection, setActiveSection] = useState("homeworks");
  const [activeSubject, setActiveSubject] = useState("1");

  // Function to handle section change
  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const handleSetActiveSubject = (subjectName) => {
    setActiveSubject(subjectName);
  };

  // when subject is changed, we fetch the lessons
  useEffect(() => {
    fetchLessons();
  }, [activeSubject]);

  // when lessons changed, we fetch new documents
  useEffect(() => {
    fetchDocuments();
  }, [lessons]);

  // When the subjects tabs in the Homework section is selected
  useEffect(() => {
    fetchHW();
  }, [activeSubject]);

  // When the subjects tabs in the Marks section is selected
  useEffect(() => {
    fetchMarks();
  }, [activeSubject]);

  // these two methods fetch the lessons and documents based on grade, later on we filter the lessons based on the subject and the documents based on the lessons and the subjects
  const fetchLessons = async () => {
    try {
      // note that here I added the activeSubject to the url so it matches the requests,
      // but it did not work yet, I will sleep on it until I finish the frontend
      const response = await fetch(
        `http://localhost:8080/lesson/${activeSubject}/${sessionStorage.getItem(
          "grade_id"
        )}`
      );

      const data = await response.json();
      setLessons(data);
    } catch (error) {
      console.log("Error fetching lessons:", error);
    }
  };

  const fetchDocuments = async () => {
    try {
      const response = await fetch(
        `http://localhost:3001/document/${activeSubject}/${sessionStorage.getItem(
          "grade_id"
        )}`
      );
      const data = await response.json();
      setDocuments(data);
      console.log(data);
    } catch (error) {
      console.log("Error fetching documents:", error);
    }
  };

  const fetchHW = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/homework/${activeSubject}/${sessionStorage.getItem(
          "grade_id"
        )}`
      );
      const data = await response.json();
      setHW(data);
    } catch (error) {
      console.log("Error fetching Hw:", error);
    }
  };

  const fetchMarks = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/mark/${activeSubject}/${sessionStorage.getItem(
          "grade_id"
        )}`
      );
      const data = await response.json();
      setMarks(data);
    } catch (error) {
      console.log("Error fetching marks:", error);
    }
  };

  // updates a variable to be used later in the filter of lessons based on the subject
  const handleTabSelectLessons = (subject) => {
    setselectedSubjectLessons(subject);
  };

  const handleTabSelectHW = (subject) => {
    setselectedSubjectHW(subject);
  };

  const handleTabSelectMarks = (subject) => {
    setselectedSubjectMarks(subject);
  };

  // create a new array of lessons that are only related to the active subject
  const filteredLessons = lessons.filter(
    (lesson) => lesson.subject_id == activeSubject
  );

  const filteredMarks = marks.filter(
    (mark) => mark.subject_id == activeSubject
  );

  // console.log(lessons);

  return (
    <div className="StudentDash">
      <OnlineCourses setActiveSubject={handleSetActiveSubject} />
      <br />
      {activeSubject === "1" && <h1>Arabic</h1>}
      {activeSubject === "2" && <h1>English</h1>}
      {activeSubject === "3" && <h1>Math</h1>}
      {activeSubject === "4" && <h1>Science</h1>}
      {activeSubject === "5" && <h1>Islamic Culture</h1>}
      {/* <h1>activeSubject: {activeSubject}</h1> */}
      <div className="text-center">
        <Button
          variant="outline-primary"
          onClick={() => handleSectionChange("lessons")}
        >
          Lessons
        </Button>
        <Button
          variant="outline-success"
          onClick={() => handleSectionChange("homeworks")}
        >
          Homeworks
        </Button>
        <Button
          variant="outline-danger"
          onClick={() => handleSectionChange("marks")}
        >
          Marks
        </Button>
      </div>
      <br />
      <br />

      {activeSection === "lessons" && (
        <div>
          <hr />
          <h1>Lessons</h1>
          <hr />
          <div>
            {lessons.map((lesson, index) => {
              // now in each lesson we are going to created a filtered array of documents that's related to this lesson then map over it to print them all
              const lessonDocuments = documents.filter(
                (document) => document.lesson_id === lesson.id
              );
              return (
                <div key={lesson.id} eventKey={index.toString()}>
                  <h1>{lesson.name}</h1>
                  <div>
                    {lessonDocuments.map((document) => (
                      <div key={document.id}>
                        <p>Document Name: {document.document_name}</p>
                        <p>Document URL: {document.document_link}</p>
                      </div>
                    ))}
                    <hr />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {activeSection === "homeworks" && (
        <div>
          <hr />
          <h1>Homeworks</h1>
          <hr />
          <div>
            {HW.map((homework) => (
              <div key={homework.id}>
                <h1>{homework.title}</h1>
                <div>
                  <p>Description: {homework.description}</p>
                  <p>
                    Due Date:
                    {new Date(homework.due_date).toLocaleDateString()} at{" "}
                    {new Date(homework.due_date).toLocaleTimeString()}
                  </p>
                </div>
                <hr />
              </div>
            ))}
          </div>
        </div>
      )}
      {activeSection === "marks" && (
        <div>
          {/* Marks content */}
          <h1>Marks</h1>
          <hr />
          <div>
            {filteredMarks.map((mark, index) => {
              return (
                <div key={mark.id} eventKey={index.toString()}>
                  <h1>{mark.mark_name}</h1>
                  <div>
                    <p>{mark.mark_value}</p>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDash;
