import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function StudentProfile() {
  const [student, setStudent] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const username = sessionStorage.getItem("username");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/student/get/${username}`)
      .then((response) => {
        setStudent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching student:", error);
      });
  }, [username, newPassword]);

  const handlePasswordToggle = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = (event) => {
    // In browsers the defaul submit reloads the page but we don't want this, we want to navigate to a certain page so we disable the default submit behaviour
    event.preventDefault();

    const password = newPassword;
    const data = {
      password,
    };

    axios
      .patch(`http://localhost:8080/student/update/${username}`, data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
          console.log(response.data.error);
        } else {
          alert("Profile Updated Successfully");

          setNewPassword("");
        }
      });
  };

  return (
    <div>
      {student ? (
        <div>
          <div id="heading">
            <h3>Hello, {sessionStorage.getItem("username")} </h3>
          </div>
          <Table striped bordered hover className="w-75 mx-auto">
            <thead>
              <tr>
                <th className="col-4">Username</th>
                <th className="col-5">Password</th>
                <th className="col-3">Grade ID</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{student.username}</td>
                <td>
                  <Row>
                    <Col className="col-9">
                      {showPassword ? student.password : "********"}
                    </Col>
                    <Col className="col-3">
                      <Button
                        className="mt-0"
                        variant="outline-success"
                        size="sm"
                        onClick={handlePasswordToggle}
                      >
                        <FontAwesomeIcon
                          icon={showPassword ? faEyeSlash : faEye}
                        />
                      </Button>
                    </Col>
                  </Row>
                </td>
                <td>{student.grade_id}</td>
              </tr>
            </tbody>
          </Table>
          <hr />
          <div className="w-75 mx-auto">
            <h1>Update your info</h1>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <b> Username</b>
                    </Form.Label>
                    <td>{student.username}</td>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <b>New Password</b>
                    </Form.Label>
                    <Form.Control
                      required
                      placeholder="Enter your new password"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <b>Grade ID</b>
                    </Form.Label>
                    <td>{student.grade_id}</td>
                  </Form.Group>
                </Col>
              </Row>
              <div className="text-center">
                <Button variant="success" type="submit">
                  Update Password
                </Button>
              </div>
            </Form>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default StudentProfile;
