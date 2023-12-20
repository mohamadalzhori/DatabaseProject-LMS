import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useNavigate } from "react-router-dom";
import Home from "./Components/Home/Home";
import JobApplication from "./Components/JobApplication/JobApplication";
import StudentLogin from "./Components/Student/StudentLogin";
import TeacherLogin from "./Components/Teacher/TeacherLogin";
import ManagerLogin from "./Components/Manager/ManagerLogin";
import StudentDash from "./Components/Student/StudentDash";
import TeacherDash from "./Components/Teacher/TeacherDash";
import ManagerDash from "./Components/Manager/ManagerDash";
import OnlineCourses from "./Components/Student/OnlineCourses";
import AllStudents from "./Components/Manager/AllStudents";
import StudentProfile from "./Components/Student/StudentProfile";
import Documents from "./Components/Teacher/Documents";
import Testimonal from "./Components/testimonal/Testimonal";
import AllTeachers from "./Components/Manager/AllTeachers";

function App() {
  // the !! converts the value to boolean if accessToken= value then true, if null then false
  // we need this initial value in case we are visiting the page after we logged in during a previous time
  const [isLoggedInTeacher, setIsLoggedInTeacher] = useState(
    !!sessionStorage.getItem("accessToken")
  );
  const [isLoggedInManager, setIsLoggedInManager] = useState(
    !!sessionStorage.getItem("accessToken")
  );
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!sessionStorage.getItem("accessToken")
  );

  // Creating a fuction of the useNavigate hook in order to be used later
  const navigate = useNavigate();

  // when the used is logged in, this function fires, therefore updating the isLoggedIn variable
  const handleLogin = () => {
    // Perform the login operation
    setIsLoggedIn(true);
  };

  // this function fires when the logout button is pressed, we delete all user data and navigate to Home
  const handleLogout = () => {
    // Perform the logout operation
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("grade_id");
    sessionStorage.removeItem("student_id");
    // sessionStorage.removeItem('type');
    setIsLoggedIn(false);
    navigate("/"); // Navigate to the home page
  };
  const handleLoginTeacher = () => {
    // Perform the login operation
    setIsLoggedInTeacher(true);
  };

  // this function fires when the logout button is pressed, we delete all user data and navigate to Home
  const handleLogoutTeacher = () => {
    // Perform the logout operation
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("teacher_id");
    // sessionStorage.removeItem('type');
    setIsLoggedInTeacher(false);
    navigate("/"); // Navigate to the home page
  };

  const handleLoginManager = () => {
    // Perform the login operation
    setIsLoggedInManager(true);
  };

  // this function fires when the logout button is pressed, we delete all user data and navigate to Home
  const handleLogoutManager = () => {
    // Perform the logout operation
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("username");
    sessionStorage.removeItem("grade");
    // sessionStorage.removeItem('type');
    setIsLoggedInManager(false);
    navigate("/"); // Navigate to the home page
  };

  return (
    <div className="App">
      {/* "lg": The navbar will expand on screens that are large or larger (992px and above). */}
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          {/* Brand is like the Logo */}
          <Navbar.Brand as={Link} to="/">
            {" "}
            LMS{" "}
          </Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          {/* everything inside the collape will be put inside the menu on smaller screens */}
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/jobapplication">
                Job Application
              </Nav.Link>

              {/* Based on the isLoggedIn variable we either show Dashboard and logout (if true), or login if false */}
              {isLoggedIn ? (
                <>
                  <NavDropdown
                    title={sessionStorage.getItem("username")}
                    id="collasible-nav-dropdown"
                  >
                    <NavDropdown.Item as={Link} to="/studentDash">
                      Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/studentProfile">
                      Profile
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
                  {isLoggedInTeacher ? (
                    <NavDropdown
                      title={sessionStorage.getItem("username")}
                      id="collasible-nav-dropdown"
                    >
                      <NavDropdown.Item onClick={handleLogoutTeacher}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : isLoggedInManager ? (
                    <NavDropdown
                      title={sessionStorage.getItem("username")}
                      id="collasible-nav-dropdown"
                    >
                      <NavDropdown.Item as={Link} to="/ManagerDash">
                        Dashboard
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={handleLogoutManager}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  ) : (
                    <NavDropdown title="Login" id="collasible-nav-dropdown">
                      <NavDropdown.Item as={Link} to="/StudentLogin">
                        Students
                      </NavDropdown.Item>
                      <NavDropdown.Item as={Link} to="/TeacherLogin">
                        Teachers
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item as={Link} to="/ManagerLogin">
                        Managers
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="content">
        <Routes>
          {/* This is how we connect the url to the components */}
          <Route path="/" element={<Home />} />
          <Route path="/jobapplication" element={<JobApplication />} />

          {/* In order to actually know when a login is happening we have to send the handleLogin function 
          to the studentLogin component to fire it when a login happens */}
          <Route
            path="/studentLogin"
            element={<StudentLogin onLogin={handleLogin} />}
          />
          <Route
            path="/teacherLogin"
            element={<TeacherLogin onLogin={handleLoginTeacher} />}
          />
          <Route
            path="/managerLogin"
            element={<ManagerLogin onLogin={handleLoginManager} />}
          />

          <Route path="/studentDash" element={<StudentDash />} />
          <Route path="/studentProfile" element={<StudentProfile />} />
          <Route path="/teacherDash" element={<TeacherDash />} />
          <Route path="/document" element={<Documents />} />
          <Route path="/success" element={<Testimonal />} />
          <Route path="/managerDash" element={<ManagerDash />} />
          <Route path="/OnlineCourses" element={<OnlineCourses />} />
          <Route path="/ManagerDash/Students" element={<AllStudents />} />
          <Route path="/ManagerDash/Teachers" element={<AllTeachers />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
