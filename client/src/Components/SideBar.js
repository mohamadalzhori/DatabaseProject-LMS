import React from "react";
import { Link } from "react-router-dom";
import "./SideBar.css"; // Create a separate CSS file for styling the sidebar

function SideBar() {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to="/Lessons">Lessons</Link>
        </li>
        <li>
          <Link to="/Homeworks">Homeworks</Link>
        </li>
        <li>
          <Link to="/Grades">Grades</Link>
        </li>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/jobapplication">Job Application</Link>
        </li>
        <li>
          <Link to="/studentLogin">Student Login</Link>
        </li>
        <li>
          <Link to="/teacherLogin">Teacher Login</Link>
        </li>
        <li>
          <Link to="/managerLogin">Manager Login</Link>
        </li>
        <li>
          <Link to="/studentDash">Student Dashboard</Link>
        </li>
        <li>
          <Link to="/teacherDash">Teacher Dashboard</Link>
        </li>
        <li>
          <Link to="/managerDash">Manager Dashboard</Link>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
