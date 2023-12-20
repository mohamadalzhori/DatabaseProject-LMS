import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function TeacherProfile() {
  const [teacher, setTeacher] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const username = sessionStorage.getItem("username");
  const [newPassword, setNewPassword] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newPhoneNb, setNewPhoneNb] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/teacher/get/${username}`)
      .then((response) => {
        setTeacher(response.data);
      })
      .catch((error) => {
        console.error("Error fetching teacher:", error);
      });
  }, [username, newPassword]);

  const handlePasswordToggle = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handleSubmit = (event) => {
    // In browsers the defaul submit reloads the page but we don't want this, we want to navigate to a certain page so we disable the default submit behaviour
    event.preventDefault();

    const password = newPassword;
    const firstname = newFirstName;
    const lastname = newLastName;
    const phoneNb = newPhoneNb;
    const data = {
      password,
      firstname,
      lastname,
      phoneNb,
    };

    axios
      .patch(`http://localhost:8080/teacher/update/${username}`, data)
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
      {teacher ? (
        <div>
          <div id="heading">
            <h3>Hello, {sessionStorage.getItem("username")} </h3>
          </div>
          <Table striped bordered hover className="w-75 mx-auto">
            <thead>
              <tr>
                <th>Username</th>
                <th>Password</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Phone Nb</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{teacher.username}</td>
                <td>
                  <Row>
                    <Col className="col-9">
                      {showPassword ? teacher.password : "********"}
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
                <td>{teacher.firstname}</td>
                <td>{teacher.lastname}</td>
                <td>{teacher.phoneNb}</td>
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
                    <td>{teacher.username}</td>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <b>New Password</b>
                    </Form.Label>
                    <Form.Control
                      required
                      placeholder="Enter your password"
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
                      <b> First Name</b>
                    </Form.Label>
                    <Form.Control
                      required
                      placeholder="Enter your First Name"
                      value={newFirstName}
                      onChange={(e) => {
                        setNewFirstName(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <b> Last Name</b>
                    </Form.Label>
                    <Form.Control
                      required
                      placeholder="Enter your Last Name"
                      value={newLastName}
                      onChange={(e) => {
                        setNewLastName(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <b> Phone Nb</b>
                    </Form.Label>
                    <Form.Control
                      required
                      placeholder="Enter your Phone Nb"
                      value={newPhoneNb}
                      onChange={(e) => {
                        setNewPhoneNb(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <div className="text-center">
                <Button variant="success" type="submit">
                  Update
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

export default TeacherProfile;
