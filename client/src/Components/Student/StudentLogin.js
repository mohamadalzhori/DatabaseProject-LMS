import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import "../style.css";
import axios from "axios";

// Notice here we have the onLogin prop passed from the
function StudentLogin({ onLogin }) {
  // Creating varialbes to be used in the form
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    // In browsers the defaul submit reloads the page but we don't want this, we want to navigate to a certain page so we disable the default submit behaviour
    event.preventDefault();

    // Clear any existing sessionStorage
    sessionStorage.clear();

    const data = {
      username,
      password,
    };

    axios
      .post("http://localhost:8080/Student/login", data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          // if the request is successful we push accessToken, name and grade into the sessionStorage in order to use them in the Dashboard
          const { accessToken, username, grade_id, student_id } = response.data;
          sessionStorage.setItem("accessToken", accessToken);
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("grade_id", grade_id);
          sessionStorage.setItem("student_id", student_id);
          // sessionStorage.setItem('type', 'student');
          onLogin(); // Invoke the onLogin callback DAAAAAAAAAAAAAAAAAAAAAAAAAAMN
          navigate("/studentDash");
        }
      })
      .catch((error) => {
        alert("Not on my watch mannn");
      });
  };

  return (
    <div className="login template d-flex justify-content-center align-items-center vh-100 ">
      <div className="form-container p-5 rounded bg-white">
        <Form onSubmit={handleSubmit}>
          <h3>Students Log In</h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={handleUsernameChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>

          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default StudentLogin;
