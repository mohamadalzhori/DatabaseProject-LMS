import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import './style.css';
import axios from 'axios';

function StudentLogin({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      username: username,
      password: password
    };

    axios.post('http://localhost:3001/authStudents/login', data)
      .then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const { accessToken, name, grade } = response.data;
          sessionStorage.setItem('accessToken', accessToken);
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('grade', grade);
          sessionStorage.setItem('type', 'student');
          onLogin(); // Invoke the onLogin callback DAAAAAAAAAAAAAAAAAAAAAAAAAAMN
          navigate('/studentDash');
        }
      });
  };

  return (
    <div className='login template d-flex justify-content-center align-items-center vh-100 bg-primary'>
      <div className='form-container p-5 rounded bg-white'>
        <Form onSubmit={handleSubmit}>
          <h3>Students Log In</h3>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter username" value={username} onChange={handleUsernameChange} />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default StudentLogin;
