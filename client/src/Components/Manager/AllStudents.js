import React, { useEffect, useState } from "react";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import axios from "axios";

function AllStudents() {
  const [fetchedStudents, setFetchedStudents] = useState([]);

  const [grade_id, setGradeId] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNb, setPhoneNb] = useState("");

  const handleGradeSelection = (selectedGradeId) => {
    axios
      .get(`http://localhost:8080/student/get/grade/${selectedGradeId}`)
      .then((response) => {
        // Assuming response.data contains the students in the selected grade
        setFetchedStudents(response.data); // Store the students in state
      })
      .catch((error) => {
        console.error("Error fetching students by grade:", error);
        // Handle error if needed
      });
  };

  useEffect(() => {
    console.log("fetched students:", fetchedStudents);
  }, [fetchedStudents]); // Log whenever fetchedStudents changes

  const handleDeleteStudent = (studentName) => {
    console.log("bin clicked");
    axios
      .delete(`http://localhost:8080/student/delete/${studentName}`)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Student Deleted Successfully");
          handleGradeSelection(grade_id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const username = `${firstname.slice(0, 3)}${lastname.slice(
      0,
      3
    )}${phoneNb.slice(-3)}`;

    const formData = {
      username,
      password,
      grade_id,
      firstname,
      lastname,
      phoneNb,
    };
    console.log("Form data:", formData);

    axios
      .post("http://localhost:8080/student/addStudent", formData)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Student Added Successfully");
          // Refetch the students after adding a new lesson
          handleGradeSelection(grade_id);
        }
      })
      .catch((error) => {
        // Handle error
        console.error(error);
      });

    // Reset the form after submission
    setUsername("");
    setPassword("");
    setFirstname("");
    setLastname("");
    setPhoneNb("");
  };

  return (
    <div className="w-75 mx-auto ">
      <Row>
        <Col>
          <Form.Group className="mt-3 mb-3">
            <Form.Label>
              <h2>Grade ID</h2>
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
              <option value={1}>Grade 1</option>
              <option value={2}>Grade 2</option>
              <option value={3}>Grade 3</option>
              <option value={4}>Grade 4</option>
              <option value={5}>Grade 5</option>
              <option value={6}>Grade 6</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col></Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <h2 className="mb-3">All Students</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Grade</th>
            <th className="text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {fetchedStudents.map((Student) => (
            <tr key={Student.id}>
              <td>{Student.username}</td>
              <td>{Student.password}</td>
              <td>{Student.firstname}</td>
              <td>{Student.lastname}</td>
              <td>{Student.phoneNb}</td>
              <td>{Student.grade_id}</td>

              <td className="text-center">
                <Button
                  className="mt-0 me-0"
                  variant="outline-danger"
                  onClick={() => handleDeleteStudent(Student.username)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Add A Student </h3>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Col>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter FirstName"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Col>
          <Col>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter lastName"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="mb-3">
          <Col>
            <Form.Label>Password</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>

          <Col>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="Enter Phone Number"
              value={phoneNb}
              onChange={(e) => setPhoneNb(e.target.value)}
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

export default AllStudents;
