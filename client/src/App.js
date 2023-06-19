import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import Home from './Components/Home';
import JobApplication from './Components/JobApplication';
import StudentLogin from './Components/StudentLogin';
import TeacherLogin from './Components/TeacherLogin';
import ManagerLogin from './Components/ManagerLogin';
import StudentDash from './Components/StudentDash';
import TeacherDash from './Components/TeacherDash';
import ManagerDash from './Components/ManagerDash';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem('accessToken'));
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform the login operation
    // sessionStorage.setItem('accessToken', 'your_access_token');
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // Perform the logout operation
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('grade');
    sessionStorage.removeItem('type');
    setIsLoggedIn(false);
    navigate('/'); // Navigate to the home page

  };

  return (
    <div className="App">
      
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/">Navbar</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/jobapplication">Job Application</Nav.Link>


                {isLoggedIn ? (
                  <>
                  <NavDropdown title={sessionStorage.getItem('username')} id="collasible-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/studentDash">Dashboard</NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                  </NavDropdown>

                  </>
                ) : (
                  <NavDropdown title="Login" id="collasible-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/StudentLogin">Students</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/TeacherLogin">Teachers</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item as={Link} to="/ManagerLogin">Managers</NavDropdown.Item>
                  </NavDropdown>
                )}

                
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/jobapplication" element={<JobApplication />} />

          <Route path="/studentLogin" element={<StudentLogin onLogin={handleLogin} />} />
          <Route path="/teacherLogin" element={<TeacherLogin onLogin={handleLogin} />} />
          <Route path="/managerLogin" element={<ManagerLogin onLogin={handleLogin} />} />

          <Route path="/studentDash" element={<StudentDash />} />
          <Route path="/teacherDash" element={<TeacherDash />} />
          <Route path="/managerDash" element={<ManagerDash />} />
        </Routes>
      
    </div>
  );
}

export default App;
