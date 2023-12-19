import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

import Alert from "react-bootstrap/Alert";

function Lessons(props) {
  const navigate = useNavigate();

  const [subject_id, setSubjectId] = useState("");
  const [name, setName] = useState("");

  const { outsideMatchingSubject, grade_id } = props;
  const subjectNames = {
    1: "Arabic",
    2: "English",
    3: "Math",
    4: "Sciences",
    5: "Culture",
  };
  const [correspondingLessons, setCorrespondingLesson] = useState([]);
  const [loadedLessons, setLoadedLessons] = useState([]);

  useEffect(() => {
    console.log("matching sub in lesson", outsideMatchingSubject);
    const subjectIdsArray = outsideMatchingSubject.map(
      (item) => item.subject_id
    );

    // Now subjectIdsArray contains the subject_ids that can be used in the SQL query
    console.log("Subject IDs Array + gradeId", subjectIdsArray, grade_id);

    fetchLessons(subjectIdsArray);
  }, [grade_id, outsideMatchingSubject]);

  const fetchLessons = (subjectIdsArray) => {
    axios
      .get(`http://localhost:8080/lesson/${grade_id}`, {
        params: {
          subjectIds: subjectIdsArray.join(","),
        },
      })
      .then((response) => {
        // Handle the response
        console.log("Corresponding Lessons", response.data);
        setCorrespondingLesson(response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error(error);
      });
  };

  useEffect(() => {
    // Set the fetched lessons to the state variable
    setLoadedLessons(correspondingLessons);
  }, [correspondingLessons]);

  const handleDeleteLesson = (lessonId) => {
    axios
      .delete(`http://localhost:8080/lesson/${lessonId}`)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Lesson Deleted Successfully");
          // Refetch the Lessons after deleting a lesson
          fetchLessons(outsideMatchingSubject.map((item) => item.subject_id));
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = {
      name,
      subject_id,
      grade_id,
    };
    console.log("Form data:", formData);

    axios
      .post("http://localhost:8080/lesson", formData)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Lesson Added Successfully");
          // Refetch the Lessons after adding a new lesson

          fetchLessons(outsideMatchingSubject.map((item) => item.subject_id));
        }
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });

    // Reset the form after submission
    setName("");
    setSubjectId("");
  };
  return (
    <div>
      <h2>Lessons</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Grade</th>
            <th>Subject</th>
            <th>Name</th>
            <th className="text-center">View Documents</th>
            <th className="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {loadedLessons
            .slice()
            .sort((a, b) => {
              if (a.grade_id !== b.grade_id) {
                return a.grade_id - b.grade_id;
              } else if (a.subject_id !== b.subject_id) {
                return a.subject_id - b.subject_id;
              }
            })
            .map((Lesson) => (
              <tr key={Lesson.id}>
                <td>{Lesson.grade_id}</td>
                <td>{subjectNames[Lesson.subject_id]}</td>
                <td>{Lesson.name}</td>
                <td className="text-center">
                  <Link
                    to={`/document`}
                    target="_blank"
                    onClick={() => {
                      //   Perform any necessary actions before navigation
                      //   For example, pass data to the new page using localStorage
                      localStorage.setItem("lesson_id", Lesson.id);
                      localStorage.setItem("lesson_name", Lesson.name);
                    }}
                  >
                    <Button className="mt-0 me-0" variant="outline-success">
                      View Documents
                    </Button>
                  </Link>
                </td>
                <td className="text-center">
                  <Button
                    className="mt-0 me-0"
                    variant="outline-danger"
                    onClick={() => handleDeleteLesson(Lesson.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <h3>Add A Lesson </h3>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Label>
              <b>Subject</b>
            </Form.Label>
            <Form.Select
              required
              aria-label="Default select example"
              value={subject_id}
              onChange={(e) => {
                setSubjectId(e.target.value);
              }}
            >
              <option value="">Select a Subject</option>
              {outsideMatchingSubject.map((subject, index) => (
                <option key={index} value={subject.subject_id}>
                  {subjectNames[subject.subject_id]}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Label>Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
        </Row>

        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Lessons;
