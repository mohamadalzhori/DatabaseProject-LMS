import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

function Marks() {
  const [name, setmarkName] = useState("");
  const [value, setmarkValue] = useState("");
  const [student_id, setStudentId] = useState("");
  const [subject_id, setSubjectId] = useState("");
  const [grade_id, setGradeId] = useState("");
  const [fetchedStudents, setFetchedStudents] = useState("");

  const [studentOptions, setStudentOptions] = useState([]);

  const [fetchedTeacherInfo, setFetchedTeacherInfo] = useState(null);
  const teacher_id = sessionStorage.getItem("teacher_id");

  const [outsideMatchingSubject, setOutsideMatchingSubject] = useState([]);

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

  const handleSubmit = (event) => {
    // In browsers the defaul submit reloads the page but we don't want this, we want to navigate to a certain page so we disable the default submit behaviour
    event.preventDefault();

    const data = {
      name,
      value,
      student_id,
      subject_id,
    };

    console.log(data);

    axios.post("http://localhost:8080/mark", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        alert("Mark Submitted Successfully");

        setStudentId("");
        setSubjectId("");
        setmarkName("");
        setmarkValue("");
      }
    });
  };

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

  const subjectNames = {
    1: "Arabic",
    2: "English",
    3: "Math",
    4: "Sciences",
    5: "Culture",
  };

  return (
    <div>
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
                  <option key={grade} value={grade}>{`Grade ${grade}`}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col></Col>
          <Col></Col>
          <Col></Col>
        </Row>
      </Form>
      <h3>Kindly fill out the following form to submit the marks: </h3>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Label>
              <b>Student name</b>
            </Form.Label>
            <Form.Select
              required
              aria-label="Default select example"
              value={student_id}
              onChange={(e) => {
                setStudentId(e.target.value);
              }}
            >
              <option value="">Select a Student</option>
              {studentOptions.map((student) => (
                <option key={student.sId} value={student.sId}>
                  {student.sName}
                </option>
              ))}
            </Form.Select>
          </Col>
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
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Mark Name</b>
              </Form.Label>
              <Form.Control
                required
                placeholder="Enter the name of the mark"
                value={name}
                onChange={(e) => {
                  setmarkName(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>
                <b>Mark Value</b>
              </Form.Label>
              <Form.Control
                required
                placeholder="Enter the value of the mark"
                type="number"
                value={value}
                onChange={(e) => {
                  setmarkValue(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Marks;
