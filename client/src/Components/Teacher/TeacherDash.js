import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Marks from "./Marks";
import Form from "react-bootstrap/Form";
import axios from "axios";

import Homeworks from "./Homeworks";
import SuccessStories from "./SuccessStories";
import Attendance from "./Attendance";
import Lessons from "./Lessons";
function TeacherDash() {
  const [fetchedStudents, setFetchedStudents] = useState("");

  const [studentOptions, setStudentOptions] = useState([]);

  const [fetchedTeacherInfo, setFetchedTeacherInfo] = useState(null);
  const teacher_id = sessionStorage.getItem("teacher_id");

  const [outsideMatchingSubject, setOutsideMatchingSubject] = useState([]);
  const [grade_id, setGradeId] = useState("");

  useEffect(() => {
    if (teacher_id) {
      console.log("Fetching teacher info...");

      axios
        .get(`http://localhost:8080/teacherAssignment/${teacher_id}`)
        .then((response) => {
          setFetchedTeacherInfo(response.data);
        })
        .catch((error) => {
          console.error("Error fetching teacher info:", error);
        });
    }
  }, [teacher_id]);

  useEffect(() => {
    console.log("Fetched TeacherInfo:", fetchedTeacherInfo);
  }, [fetchedTeacherInfo]);

  const uniqueGrades = fetchedTeacherInfo
    ? [...new Set(fetchedTeacherInfo.map((info) => info.grade_id))]
    : [];

  const handleGradeSelection = (selectedGradeId) => {
    axios
      .get(`http://localhost:8080/student/get/grade/${selectedGradeId}`)
      .then((response) => {
        // Assuming response.data contains the students in the selected grade
        setFetchedStudents(response.data); // Store the students in state

        setStudentOptions(
          response.data.map((student) => ({
            sId: student.id,
            sName: student.username,
          }))
        );
        const matchingSubjects = fetchedTeacherInfo.filter(
          (info) => info.grade_id.toString() === selectedGradeId
        );

        setOutsideMatchingSubject(matchingSubjects);

        console.log("matching sub", matchingSubjects);
      })
      .catch((error) => {
        console.error("Error fetching students by grade:", error);
        // Handle error if needed
      });
  };

  useEffect(() => {
    console.log("fetched students:", fetchedStudents);
  }, [fetchedStudents]); // Log whenever fetchedStudents changes

  return (
    <div>
      <style>
        {`
          .list-group-item.active {
            background-color: #198754;
            border-color: #198754;
        `}
      </style>
      <div id="heading">
        <h3>Hello, {sessionStorage.getItem("username")}</h3>
      </div>
      <div className="d-flex justify-content-center">
        <Tab.Container defaultActiveKey="#link1">
          <Row>
            <Col sm={2}>
              <ListGroup>
                <ListGroup.Item action href="#link1">
                  Marks Form
                </ListGroup.Item>
                <ListGroup.Item action href="#link2">
                  Homeworks
                </ListGroup.Item>
                <ListGroup.Item action href="#link3">
                  Lessons
                </ListGroup.Item>
                <ListGroup.Item action href="#link5">
                  Success Stories
                </ListGroup.Item>
                <ListGroup.Item action href="#link4">
                  Attendance
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col style={{ marginLeft: "2%" }}>
              <Tab.Content>
                <Form>
                  <Row>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Label>
                          <b>Grade ID</b>
                        </Form.Label>
                        <Form.Select
                          required
                          aria-label="Default select example"
                          value={grade_id}
                          onChange={(e) => {
                            setGradeId(e.target.value);
                            handleGradeSelection(e.target.value);
                          }}
                        >
                          <option>Select a Grade</option>
                          {uniqueGrades.map((grade) => (
                            <option
                              key={grade}
                              value={grade}
                            >{`Grade ${grade}`}</option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col></Col>
                    <Col></Col>
                    <Col></Col>
                  </Row>
                </Form>
                <Tab.Pane eventKey="#link1">
                  <Marks
                    studentOptions={studentOptions}
                    outsideMatchingSubject={outsideMatchingSubject}
                  />
                </Tab.Pane>
                <Tab.Pane eventKey="#link2">
                  <div>
                    {outsideMatchingSubject && (
                      <Homeworks
                        outsideMatchingSubject={outsideMatchingSubject}
                        grade_id={grade_id}
                      />
                    )}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="#link3">
                  <div>
                    {outsideMatchingSubject && (
                      <Lessons
                        outsideMatchingSubject={outsideMatchingSubject}
                        grade_id={grade_id}
                      />
                    )}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="#link5">
                  <div>
                    {outsideMatchingSubject && (
                      <SuccessStories studentOptions={studentOptions} />
                    )}
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey="#link4">
                  <Attendance />
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </div>
  );
}

export default TeacherDash;
