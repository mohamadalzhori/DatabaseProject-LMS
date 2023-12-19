import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";

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
  const [activeSection, setActiveSection] = useState("lessons");
  const [activeSubject, setActiveSubject] = useState("1");
  const [lessonDocuments, setLessonDocuments] = useState({});

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

  useEffect(() => {
    const fetchDocumentsForLesson = async (lessonId) => {
      try {
        const response = await fetch(
          `http://localhost:8080/document/${lessonId}`
        );
        const data = await response.json();
        // Update the state using the lessonId as the key
        setLessonDocuments((prevDocuments) => ({
          ...prevDocuments,
          [lessonId]: data,
        }));
      } catch (error) {
        console.log(`Error fetching documents for lesson ${lessonId}:`, error);
      }
    };

    // Fetch documents for each lesson individually
    lessons.forEach((lesson) => {
      fetchDocumentsForLesson(lesson.id);
    });
  }, [lessons]);

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
        `http://localhost:8080/mark/${sessionStorage.getItem(
          "student_id"
        )}/${activeSubject}`
      );
      const data = await response.json();
      setMarks(data);
      console.log(data);
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
          {lessons.map((lesson) => {
            const documentsForLesson = lessonDocuments[lesson.id] || [];

            return (
              <div key={lesson.id} className="w-75 mx-auto">
                <h2 className="mb-3">{lesson.name}</h2>
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Document Title</th>
                      <th>Document URL</th>
                      <th>Document Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {documentsForLesson.map((document) => (
                      <tr key={document.id}>
                        <td>{document.title}</td>
                        <td>
                          <a href={document.url} target="_blank">
                            {document.url}
                          </a>
                        </td>
                        <td>{document.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
            );
          })}
        </div>
      )}

      {activeSection === "homeworks" && (
        <div>
          <hr />
          <h1>Homeworks</h1>
          <hr />
          <div className="w-75 mx-auto">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Due Date</th>
                </tr>
              </thead>
              <tbody>
                {HW.map((homework) => (
                  <tr key={homework.id}>
                    <td>{homework.title}</td>
                    <td>{homework.description}</td>
                    <td>{new Date(homework.due_date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}

      {activeSection === "marks" && (
        <div>
          {/* Marks content */}
          <hr />
          <h1>Marks</h1>
          <hr />
          <div className="w-75 mx-auto">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                {marks.map((mark) => (
                  <tr key={mark.id}>
                    <td>{mark.name}</td>
                    <td>{mark.value}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
}

export default StudentDash;
