import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import { useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

function PointsDashboard() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [points, setPoints] = useState(0);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await fetch("http://localhost:8080/authstudents");
      const data = await response.json();
      setStudents(data);
    } catch (error) {
      console.log("Error retrieving students data: ", error);
    }
  };

  // sort the students in decreasing order of points
  students.sort((a, b) => b.points - a.points);

  const handleSubmit = (event) => {
    // In browsers the defaul submit reloads the page but we don't want this, we want to navigate to a certain page so we disable the default submit behaviour
    event.preventDefault();

    const data = {
      username: selectedStudent,
      points,
    };

    axios.put(`http://localhost:8080/authStudents`, data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        alert("Modifications Submitted Successfully");

        setSelectedStudent("");
        fetchStudents();
      }
    });
  };

  return (
    <div>
      <h3>Leaderboard</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{student.username}</td>
              <td>{student.points}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <br />
      <hr />
      <br />
      <h4>Modify Student Points</h4>

      <Form onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Label>Students</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={selectedStudent}
              onChange={(e) => {
                setSelectedStudent(e.target.value);
              }}
            >
              <option>Select a Student</option>
              {students.map((student) => (
                <option key={student.id}>{student.username}</option>
              ))}
            </Form.Select>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Point Modification</Form.Label>
              <Form.Control
                required
                placeholder="Enter a value to overwrite the current one"
                value={points}
                onChange={(e) => {
                  setPoints(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Submit Modifications
        </Button>
      </Form>
    </div>
  );
}

export default PointsDashboard;
